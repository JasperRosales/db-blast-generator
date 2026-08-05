"use client"

import * as React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useFrameImage } from "@/hooks/use-frame-image"
import { THUMB_SIZE } from "@/lib/dp/config"
import { drawFrame, loadDrawer } from "@/lib/dp/renderer"
import type { FrameId, FramePalette, PhotoTransform } from "@/lib/dp/types"
import { cn } from "@/lib/utils"
import { RiCheckLine } from "@remixicon/react"

const DEFAULT_TRANSFORM: PhotoTransform = { rotation: 0, zoom: 1, x: 0, y: 0 }

function TemplateThumb({
  frame,
  palette,
  selected,
  onSelect,
}: {
  frame: { id: FrameId; name: string }
  palette: FramePalette
  selected: boolean
  onSelect: (id: FrameId) => void
}) {
  const ref = React.useRef<HTMLCanvasElement>(null)
  const frameImage = useFrameImage(frame.id)
  const renderToken = React.useRef(0)

  React.useEffect(() => {
    const token = ++renderToken.current
    const canvas = ref.current
    if (!canvas) return
    canvas.width = THUMB_SIZE
    canvas.height = THUMB_SIZE
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    loadDrawer(frame.id)
      .then((drawer) => {
        if (token !== renderToken.current) return
        drawFrame(ctx, THUMB_SIZE, drawer, null, palette, DEFAULT_TRANSFORM, frameImage)
      })
      .catch(() => {})
  }, [frame.id, palette, frameImage])

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

export function TemplatePicker({
  frames,
  palette,
  selectedId,
  onSelect,
}: {
  frames: ReadonlyArray<{ id: FrameId; name: string }>
  palette: FramePalette
  selectedId: FrameId
  onSelect: (id: FrameId) => void
}) {
  return (
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
              palette={palette}
              selected={frame.id === selectedId}
              onSelect={onSelect}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
