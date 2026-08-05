import { drawPhotoInto, fillDot, roundedRectPath, strokeFrame } from "@/lib/dp/canvas"
import type { FrameDrawer } from "@/lib/dp/types"

export const halo: FrameDrawer = {
  id: "halo",
  draw(ctx, size, image, palette, transform) {
    const inset = size * 0.14
    const bbox = {
      x: inset,
      y: inset,
      w: size - inset * 2,
      h: size - inset * 2,
    }
    const radius = bbox.w * 0.2
    const path = (
      c: CanvasRenderingContext2D,
      x: number,
      y: number,
      w: number,
      h: number
    ) => roundedRectPath(c, x, y, w, h, radius)

    drawPhotoInto(ctx, bbox, image, transform, path)

    ctx.save()
    ctx.lineWidth = size * 0.018
    ctx.strokeStyle = "oklch(1 0 0 / 0.18)"
    path(ctx, bbox.x - size * 0.035, bbox.y - size * 0.035, bbox.w + size * 0.07, bbox.h + size * 0.07)
    ctx.stroke()
    ctx.restore()

    strokeFrame(ctx, bbox, palette, path, size * 0.05, size * 0.05)

    fillDot(ctx, bbox.x + bbox.w / 2, bbox.y - size * 0.035, size * 0.024, palette.gradient[1])
  },
}
