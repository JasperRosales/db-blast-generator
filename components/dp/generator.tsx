"use client"

import * as React from "react"

import { CaptionForm } from "@/components/dp/caption-form"
import { PhotoUploader } from "@/components/dp/photo-uploader"
import { PreviewPanel } from "@/components/dp/preview-panel"
import { TemplatePicker } from "@/components/dp/template-picker"
import { useFrameImage } from "@/hooks/use-frame-image"
import { usePhotoTransform } from "@/hooks/use-photo-transform"
import { usePhotoUpload } from "@/hooks/use-photo-upload"
import { defaultCaptionBuilder } from "@/lib/caption"
import { type Blast, type Year } from "@/data/blasts"
import type { CaptionBuilder } from "@/lib/domain/caption"
import { DOWNLOAD_SIZE, PREVIEW_SIZE } from "@/lib/dp/config"
import { frameNames } from "@/lib/dp/frame-meta"
import { drawFrame, loadDrawer } from "@/lib/dp/renderer"
import type { FrameId, FramePalette } from "@/lib/dp/types"

export function DpGenerator({
  blast,
  captionBuilder = defaultCaptionBuilder,
}: {
  blast: Blast
  captionBuilder?: CaptionBuilder
}) {
  const [selectedId, setSelectedId] = React.useState<FrameId>(blast.frames[0])
  const [name, setName] = React.useState("")
  const [year, setYear] = React.useState<Year>("1")
  const [program, setProgram] = React.useState<string>(blast.programs[0]?.abbr ?? "")

  const activeFrame = blast.frames.includes(selectedId) ? selectedId : blast.frames[0]
  const activeProgram = blast.programs.some((p) => p.abbr === program)
    ? program
    : blast.programs[0]?.abbr ?? ""

  const photo = usePhotoUpload()
  const transform = usePhotoTransform(PREVIEW_SIZE)
  const frameImage = useFrameImage(activeFrame)

  const palette = React.useMemo<FramePalette>(
    () => ({ gradient: blast.gradient, glow: blast.glow }),
    [blast]
  )
  const frames = React.useMemo(
    () => blast.frames.map((id) => ({ id, name: frameNames[id] })),
    [blast]
  )
  const caption = React.useMemo(
    () => captionBuilder.build(blast, name, year, activeProgram),
    [captionBuilder, blast, name, year, activeProgram]
  )

  const renderToken = React.useRef(0)

  React.useEffect(() => {
    const token = ++renderToken.current
    const canvas = transform.previewRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    loadDrawer(activeFrame)
      .then((drawer) => {
        if (token !== renderToken.current) return
        drawFrame(ctx, PREVIEW_SIZE, drawer, photo.image, palette, transform.transform, frameImage)
      })
      .catch(() => {})
  }, [activeFrame, photo.image, palette, transform.transform, transform.previewRef, frameImage])

  async function handleDownload() {
    if (!photo.image) return
    const drawer = await loadDrawer(activeFrame)
    const out = document.createElement("canvas")
    out.width = DOWNLOAD_SIZE
    out.height = DOWNLOAD_SIZE
    const ctx = out.getContext("2d")
    if (!ctx) return
    drawFrame(ctx, DOWNLOAD_SIZE, drawer, photo.image, palette, transform.transform, frameImage)
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

  return (
    <section className="mx-auto max-w-5xl px-4 pb-16 sm:px-6">
      <div className="grid items-start gap-4 lg:grid-cols-2">
        <div className="order-2 flex flex-col gap-4 lg:order-1">
          <TemplatePicker
            frames={frames}
            palette={palette}
            selectedId={activeFrame}
            onSelect={setSelectedId}
          />
          <PhotoUploader
            palette={palette}
            photoUrl={photo.url}
            photoName={photo.name}
            onFile={photo.handleFile}
          />
          <CaptionForm
            palette={palette}
            programs={blast.programs}
            name={name}
            year={year}
            program={activeProgram}
            caption={caption}
            onNameChange={setName}
            onYearChange={setYear}
            onProgramChange={setProgram}
          />
        </div>

        <div className="order-1 lg:order-2 lg:sticky lg:top-20">
          <PreviewPanel
            palette={palette}
            previewRef={transform.previewRef}
            zoom={transform.zoom}
            hasAdjustments={transform.hasAdjustments}
            canDownload={!!photo.image}
            handlers={transform.handlers}
            onRotate={transform.rotate}
            onZoomBy={transform.zoomBy}
            onReset={transform.reset}
            onDownload={handleDownload}
          />
        </div>
      </div>
    </section>
  )
}
