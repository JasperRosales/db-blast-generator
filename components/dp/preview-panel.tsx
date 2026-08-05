"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { PointerHandlers } from "@/hooks/use-photo-transform"
import { DOWNLOAD_SIZE, PREVIEW_SIZE } from "@/lib/dp/config"
import type { FramePalette } from "@/lib/dp/types"
import { linearGradient } from "@/lib/gradient"
import {
  RiDownload2Line,
  RiRefreshLine,
  RiRestartLine,
  RiZoomInLine,
  RiZoomOutLine,
} from "@remixicon/react"

export function PreviewPanel({
  palette,
  previewRef,
  zoom,
  hasAdjustments,
  canDownload,
  handlers,
  onRotate,
  onZoomBy,
  onReset,
  onDownload,
}: {
  palette: FramePalette
  previewRef: React.RefObject<HTMLCanvasElement | null>
  zoom: number
  hasAdjustments: boolean
  canDownload: boolean
  handlers: PointerHandlers
  onRotate: () => void
  onZoomBy: (delta: number) => void
  onReset: () => void
  onDownload: () => void
}) {
  const actionStyle = {
    backgroundImage: linearGradient(palette.gradient),
    boxShadow: `0 8px 24px -8px ${palette.glow}`,
  }

  return (
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
            onPointerDown={handlers.onPointerDown}
            onPointerMove={handlers.onPointerMove}
            onPointerUp={handlers.onPointerUp}
            onPointerCancel={handlers.onPointerCancel}
            onLostPointerCapture={handlers.onPointerCancel}
            className="size-full touch-none cursor-grab select-none active:cursor-grabbing"
            aria-label="Preview. Drag to move the photo, pinch to zoom."
          />
        </div>

        <p className="mt-2 text-center text-[11px] text-muted-foreground/70">
          Drag to move your photo · pinch or use the buttons to zoom
        </p>

        <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
          <Button variant="outline" size="icon" aria-label="Rotate photo" onClick={onRotate}>
            <RiRefreshLine />
          </Button>
          <div className="flex items-center gap-1 rounded-full border border-border/60 bg-background p-1">
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="Zoom out"
              onClick={() => onZoomBy(-0.1)}
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
              onClick={() => onZoomBy(0.1)}
            >
              <RiZoomInLine />
            </Button>
          </div>
          <Button
            variant="outline"
            size="icon"
            aria-label="Reset adjustments"
            onClick={onReset}
            disabled={!hasAdjustments}
          >
            <RiRestartLine />
          </Button>
        </div>

        <div className="mt-3 flex flex-col items-center justify-between gap-2 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            Square output · {DOWNLOAD_SIZE}×{DOWNLOAD_SIZE} PNG
          </p>
          <Button onClick={onDownload} disabled={!canDownload} style={actionStyle}>
            <RiDownload2Line data-icon="inline-start" />
            Download DP
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
