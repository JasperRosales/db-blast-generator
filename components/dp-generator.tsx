"use client"

import * as React from "react"

import {
  clampPan,
  frameNames,
  renderDp,
  type FrameId,
  type FramePalette,
  type PhotoTransform,
} from "@/lib/dp"
import { buildCaption } from "@/lib/caption"
import { linearGradient } from "@/lib/gradient"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { years, type Blast, type Year } from "@/data/blasts"
import {
  RiArrowUpLine,
  RiCheckLine,
  RiDownload2Line,
  RiFileCopyLine,
  RiImageAddLine,
  RiRefreshLine,
  RiRestartLine,
  RiZoomInLine,
  RiZoomOutLine,
} from "@remixicon/react"

const PREVIEW_SIZE = 1024
const DOWNLOAD_SIZE = 2048

function paletteOf(blast: Blast): FramePalette {
  return { gradient: blast.gradient, glow: blast.glow }
}

const DEFAULT_TRANSFORM: PhotoTransform = { rotation: 0, zoom: 1, x: 0, y: 0 }

function TemplateThumb({
  frame,
  blast,
  selected,
  onSelect,
}: {
  frame: { id: FrameId; name: string }
  blast: Blast
  selected: boolean
  onSelect: (id: FrameId) => void
}) {
  const ref = React.useRef<HTMLCanvasElement>(null)

  React.useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const size = 128
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    renderDp(ctx, size, frame.id, null, paletteOf(blast), DEFAULT_TRANSFORM)
  }, [frame, blast])

  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={() => onSelect(frame.id)}
      className={cn(
        "group/tpl flex flex-col items-center gap-1.5 rounded-2xl bg-background p-2 ring-1 ring-border/60 transition-all hover:ring-primary-2/40",
        selected && "ring-2 ring-primary shadow-[0_0_24px_-8px] shadow-primary/60"
      )}
    >
      <canvas
        ref={ref}
        className="aspect-square w-full rounded-2xl bg-[oklch(0.147_0.004_49.25)]"
      />
      <span className="flex items-center gap-1 text-[11px] font-medium text-muted-foreground group-hover/tpl:text-foreground">
        {selected && <RiCheckLine className="size-3 text-primary" />}
        {frame.name}
      </span>
    </button>
  )
}

export function DpGenerator({ blast }: { blast: Blast }) {
  const [selectedId, setSelectedId] = React.useState(blast.frames[0])
  const [photoUrl, setPhotoUrl] = React.useState<string | null>(null)
  const [photoName, setPhotoName] = React.useState<string | null>(null)
  const [photoImage, setPhotoImage] = React.useState<HTMLImageElement | null>(null)
  const [dragging, setDragging] = React.useState(false)
  const [rotation, setRotation] = React.useState(0)
  const [zoom, setZoom] = React.useState(1)
  const [offset, setOffset] = React.useState({ x: 0, y: 0 })
  const [name, setName] = React.useState("")
  const [year, setYear] = React.useState<Year>("1")
  const [program, setProgram] = React.useState<string>(blast.programs[0]?.abbr ?? "")
  const previewRef = React.useRef<HTMLCanvasElement>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const pointersRef = React.useRef<Map<number, { x: number; y: number }>>(new Map())
  const dragStartRef = React.useRef<{ x: number; y: number } | null>(null)
  const zoomRef = React.useRef(1)
  const pinchStartRef = React.useRef<{
    zoom: number
    offset: { x: number; y: number }
    dist: number
    mid: { x: number; y: number }
  } | null>(null)
  const palette = React.useMemo(() => paletteOf(blast), [blast])

  const frames = blast.frames.map((id) => ({ id, name: frameNames[id] }))
  const activeFrame = blast.frames.includes(selectedId) ? selectedId : blast.frames[0]
  const activeProgram = blast.programs.some((p) => p.abbr === program)
    ? program
    : blast.programs[0]?.abbr ?? ""
  const transform = React.useMemo<PhotoTransform>(
    () => ({ rotation, zoom, x: offset.x, y: offset.y }),
    [rotation, zoom, offset]
  )
  const caption = React.useMemo(() => buildCaption(blast, name, year, activeProgram), [
    blast,
    name,
    year,
    activeProgram,
  ])

  React.useEffect(() => {
    if (!photoUrl) return
    const image = new Image()
    image.onload = () => setPhotoImage(image)
    image.src = photoUrl
    return () => {
      image.onload = null
    }
  }, [photoUrl])

  React.useEffect(() => {
    zoomRef.current = zoom
  }, [zoom])

  React.useEffect(() => {
    const canvas = previewRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    renderDp(ctx, PREVIEW_SIZE, activeFrame, photoImage, palette, transform)
  }, [activeFrame, photoImage, palette, transform])

  function handleFile(file: File | undefined | null) {
    if (!file || !file.type.startsWith("image/")) return
    setPhotoUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev)
      return URL.createObjectURL(file)
    })
    setPhotoName(file.name)
  }

  function handleDownload() {
    if (!photoImage) return
    const out = document.createElement("canvas")
    out.width = DOWNLOAD_SIZE
    out.height = DOWNLOAD_SIZE
    const ctx = out.getContext("2d")
    if (!ctx) return
    renderDp(ctx, DOWNLOAD_SIZE, activeFrame, photoImage, palette, transform)
    out.toBlob((blob) => {
      if (!blob) return
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `dp-blast-${blast.id}-${activeFrame}.png`
      link.click()
      URL.revokeObjectURL(url)
    }, "image/png")
  }

  function handleCopy() {
    navigator.clipboard.writeText(caption.text)
  }

  function handlePointerDown(event: React.PointerEvent<HTMLCanvasElement>) {
    const canvas = previewRef.current
    if (!canvas) return
    canvas.setPointerCapture(event.pointerId)
    pointersRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY })

    if (pointersRef.current.size === 1) {
      dragStartRef.current = { x: event.clientX, y: event.clientY }
      pinchStartRef.current = null
    } else if (pointersRef.current.size === 2) {
      const [a, b] = [...pointersRef.current.values()]
      dragStartRef.current = null
      pinchStartRef.current = {
        zoom,
        offset: { ...offset },
        dist: Math.hypot(b.x - a.x, b.y - a.y),
        mid: { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 },
      }
    }
  }

  function handlePointerMove(event: React.PointerEvent<HTMLCanvasElement>) {
    if (!pointersRef.current.has(event.pointerId)) return
    const canvas = previewRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const scale = PREVIEW_SIZE / rect.width
    pointersRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY })

    if (pointersRef.current.size === 1 && dragStartRef.current) {
      const dx = (event.clientX - dragStartRef.current.x) * scale
      const dy = (event.clientY - dragStartRef.current.y) * scale
      setOffset((o) => clampPan({ x: o.x + dx, y: o.y + dy }, PREVIEW_SIZE, zoom))
      return
    }

    if (pointersRef.current.size === 2 && pinchStartRef.current) {
      const start = pinchStartRef.current
      const [a, b] = [...pointersRef.current.values()]
      const dist = Math.hypot(b.x - a.x, b.y - a.y)
      const mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }
      const nextZoom = Math.min(2.5, Math.max(1, start.zoom * (dist / start.dist)))
      const ratio = nextZoom / start.zoom
      const centerCss = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
      const startMid = {
        x: (start.mid.x - centerCss.x) * scale,
        y: (start.mid.y - centerCss.y) * scale,
      }
      const midCanvas = {
        x: (mid.x - centerCss.x) * scale,
        y: (mid.y - centerCss.y) * scale,
      }
      setZoom(nextZoom)
      setOffset(
        clampPan(
          {
            x: start.offset.x * ratio + (midCanvas.x - startMid.x * ratio),
            y: start.offset.y * ratio + (midCanvas.y - startMid.y * ratio),
          },
          PREVIEW_SIZE,
          nextZoom
        )
      )
    }
  }

  function handlePointerEnd(event: React.PointerEvent<HTMLCanvasElement>) {
    pointersRef.current.delete(event.pointerId)
    if (pointersRef.current.size === 1) {
      const [remaining] = [...pointersRef.current.values()]
      dragStartRef.current = { x: remaining.x, y: remaining.y }
      pinchStartRef.current = null
    } else if (pointersRef.current.size === 0) {
      dragStartRef.current = null
      pinchStartRef.current = null
    }
  }

  function handlePointerCancel() {
    pointersRef.current.clear()
    dragStartRef.current = null
    pinchStartRef.current = null
  }

  function rotate() {
    setRotation((r) => (r + 90) % 360)
  }

  function zoomBy(delta: number) {
    const next = Math.min(2.5, Math.max(1, Math.round((zoomRef.current + delta) * 10) / 10))
    const ratio = next / zoomRef.current
    setZoom(next)
    setOffset((o) => clampPan({ x: o.x * ratio, y: o.y * ratio }, PREVIEW_SIZE, next))
  }

  function resetAdjustments() {
    setRotation(0)
    setZoom(1)
    setOffset({ x: 0, y: 0 })
  }

  const actionStyle = {
    backgroundImage: linearGradient(blast.gradient),
    boxShadow: `0 8px 24px -8px ${blast.glow}`,
  }

  return (
    <section className="mx-auto max-w-5xl px-4 pb-16 sm:px-6">
      <div className="grid items-start gap-4 lg:grid-cols-2">
        <div className="order-2 flex flex-col gap-4 lg:order-1">
          <Card>
            <CardHeader>
              <CardTitle>Choose a frame</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2.5">
                {frames.map((frame) => (
                  <TemplateThumb
                    key={frame.id}
                    frame={frame}
                    blast={blast}
                    selected={frame.id === activeFrame}
                    onSelect={setSelectedId}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upload your photo</CardTitle>
            </CardHeader>
            <CardContent>
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(event) => {
                  handleFile(event.target.files?.[0])
                  event.target.value = ""
                }}
              />
              <div
                role="button"
                tabIndex={0}
                aria-label="Upload a photo"
                onClick={() => inputRef.current?.click()}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault()
                    inputRef.current?.click()
                  }
                }}
                onDragOver={(event) => {
                  event.preventDefault()
                  setDragging(true)
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={(event) => {
                  event.preventDefault()
                  setDragging(false)
                  handleFile(event.dataTransfer.files?.[0])
                }}
                className={cn(
                  "flex cursor-pointer flex-col items-center justify-center gap-2.5 rounded-2xl border border-dashed border-border/70 px-6 py-6 text-center transition-colors outline-none hover:border-primary-2/60 hover:bg-primary-2/5 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 sm:py-7",
                  dragging && "border-primary-2/70 bg-primary-2/5"
                )}
              >
                {photoUrl ? (
                  <div className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={photoUrl}
                      alt="Selected photo preview"
                      className="size-14 rounded-2xl object-cover ring-1 ring-border/60"
                    />
                    <div className="text-left">
                      <p className="text-sm font-medium text-foreground">{photoName}</p>
                      <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                        <RiArrowUpLine className="size-3.5" />
                        Click or drop another photo to replace it
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    <span
                      className="flex size-10 items-center justify-center rounded-2xl text-primary-foreground"
                      style={actionStyle}
                    >
                      <RiImageAddLine className="size-5" />
                    </span>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Drag & drop your photo here
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        or click to browse your files
                      </p>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Caption</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <label className="block">
                <span className="text-sm font-medium">Full name</span>
                <input
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Juan Dela Cruz"
                  className="mt-1.5 h-9 w-full rounded-xl border border-border/70 bg-background px-3 text-sm text-foreground outline-none [color-scheme:dark] placeholder:text-muted-foreground/60 focus:border-ring focus:ring-3 focus:ring-ring/30"
                />
              </label>

              <div>
                <span className="text-sm font-medium">Program</span>
                <div className="mt-1.5 grid grid-cols-2 gap-2">
                  {blast.programs.map((item) => {
                    const isActive = item.abbr === activeProgram
                    return (
                      <button
                        key={item.abbr}
                        type="button"
                        aria-pressed={isActive}
                        onClick={() => setProgram(item.abbr)}
                        className={cn(
                          "rounded-xl px-3 py-2 text-left transition-all",
                          isActive
                            ? "text-primary-foreground"
                            : "bg-background text-muted-foreground ring-1 ring-border/60 hover:text-foreground"
                        )}
                        style={
                          isActive
                            ? {
                                backgroundImage: linearGradient(blast.gradient),
                                boxShadow: `0 4px 14px -6px ${blast.glow}`,
                              }
                            : undefined
                        }
                      >
                        <span className="block text-[13px] font-semibold">{item.abbr}</span>
                        <span className="mt-0.5 block text-[11px] opacity-75">
                          {item.name}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>

              <div>
                <span className="text-sm font-medium">Year level</span>
                <div className="mt-1.5 grid grid-cols-4 gap-2">
                  {years.map((item) => {
                    const isActive = item.value === year
                    return (
                      <button
                        key={item.value}
                        type="button"
                        aria-pressed={isActive}
                        onClick={() => setYear(item.value)}
                        className={cn(
                          "rounded-full py-1.5 text-sm font-medium transition-all",
                          isActive
                            ? "text-primary-foreground"
                            : "bg-background text-muted-foreground ring-1 ring-border/60 hover:text-foreground"
                        )}
                        style={
                          isActive
                            ? {
                                backgroundImage: linearGradient(blast.gradient),
                                boxShadow: `0 4px 14px -6px ${blast.glow}`,
                              }
                            : undefined
                        }
                      >
                        {item.label}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="flex flex-col gap-3 rounded-2xl bg-background p-3.5 ring-1 ring-border/60">
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm font-semibold text-foreground">{caption.header}</p>
                    <Button variant="outline" size="sm" onClick={handleCopy}>
                      <RiFileCopyLine data-icon="inline-start" />
                      Copy
                    </Button>
                  </div>
                  <p className="mt-1 text-sm leading-snug text-muted-foreground">
                    {caption.body}
                  </p>
                  <p className="mt-1.5 text-xs text-primary/90">{caption.hashtags}</p>
                </div>
                <p className="text-[11px] text-muted-foreground/70">
                  Paste this caption under your DP post on Facebook.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="order-1 lg:order-2 lg:sticky lg:top-20">
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mx-auto aspect-square w-full max-w-md overflow-hidden rounded-3xl bg-[oklch(0.147_0.004_49.25)] ring-1 ring-border/60">
                <canvas
                  ref={previewRef}
                  width={PREVIEW_SIZE}
                  height={PREVIEW_SIZE}
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerEnd}
                  onPointerCancel={handlePointerCancel}
                  onLostPointerCapture={handlePointerCancel}
                  className="size-full touch-none cursor-grab select-none active:cursor-grabbing"
                  aria-label="Preview. Drag to move the photo, pinch to zoom."
                />
              </div>

              <p className="mt-2 text-center text-[11px] text-muted-foreground/70">
                Drag to move your photo · pinch or use the buttons to zoom
              </p>

              <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Rotate photo"
                  onClick={rotate}
                >
                  <RiRefreshLine />
                </Button>
                <div className="flex items-center gap-1 rounded-full border border-border/60 bg-background p-1">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    aria-label="Zoom out"
                    onClick={() => zoomBy(-0.1)}
                  >
                    <RiZoomOutLine />
                  </Button>
                  <span className="w-12 text-center text-xs tabular-nums text-muted-foreground">
                    {Math.round(zoom * 100)}%
                  </span>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    aria-label="Zoom in"
                    onClick={() => zoomBy(0.1)}
                  >
                    <RiZoomInLine />
                  </Button>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Reset adjustments"
                  onClick={resetAdjustments}
                  disabled={rotation === 0 && zoom === 1 && offset.x === 0 && offset.y === 0}
                >
                  <RiRestartLine />
                </Button>
              </div>

              <div className="mt-3 flex flex-col items-center justify-between gap-2 sm:flex-row">
                <p className="text-xs text-muted-foreground">
                  Square output · {DOWNLOAD_SIZE}×{DOWNLOAD_SIZE} PNG
                </p>
                <Button onClick={handleDownload} disabled={!photoImage} style={actionStyle}>
                  <RiDownload2Line data-icon="inline-start" />
                  Download DP
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
