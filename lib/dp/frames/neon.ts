import { drawPhotoInto, fillDot, roundedRectPath, strokeFrame } from "@/lib/dp/canvas"
import type { FrameDrawer } from "@/lib/dp/types"

const ACCENT = "oklch(0.985 0.001 106.423)"

export const neon: FrameDrawer = {
  id: "neon",
  draw(ctx, size, image, palette, transform) {
    const inset = size * 0.13
    const bbox = {
      x: inset,
      y: inset,
      w: size - inset * 2,
      h: size - inset * 2,
    }
    const radius = bbox.w * 0.14
    const path = (
      c: CanvasRenderingContext2D,
      x: number,
      y: number,
      w: number,
      h: number
    ) => roundedRectPath(c, x, y, w, h, radius)

    drawPhotoInto(ctx, bbox, image, transform, path)
    strokeFrame(ctx, bbox, palette, path, size * 0.05, size * 0.045)

    const corners: Array<[number, number]> = [
      [bbox.x + radius, bbox.y + radius],
      [bbox.x + bbox.w - radius, bbox.y + radius],
      [bbox.x + radius, bbox.y + bbox.h - radius],
      [bbox.x + bbox.w - radius, bbox.y + bbox.h - radius],
    ]
    for (const [cx, cy] of corners) {
      fillDot(ctx, cx, cy, size * 0.022, ACCENT)
    }
  },
}
