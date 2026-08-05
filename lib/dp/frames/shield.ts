import { drawPhotoInto, fillDot, shieldPath, strokeFrame } from "@/lib/dp/canvas"
import type { FrameDrawer } from "@/lib/dp/types"

const ACCENT = "oklch(0.985 0.001 106.423)"

export const shield: FrameDrawer = {
  id: "shield",
  draw(ctx, size, image, palette, transform) {
    const bbox = {
      x: size * 0.13,
      y: size * 0.1,
      w: size * 0.74,
      h: size * 0.8,
    }

    drawPhotoInto(ctx, bbox, image, transform, shieldPath)
    strokeFrame(ctx, bbox, palette, shieldPath, size * 0.05, size * 0.05)

    fillDot(ctx, bbox.x + bbox.w / 2, bbox.y + size * 0.012, size * 0.026, ACCENT)
    fillDot(ctx, bbox.x + bbox.w * 0.78, bbox.y + size * 0.09, size * 0.014, palette.gradient[1])
    fillDot(ctx, bbox.x + bbox.w * 0.22, bbox.y + size * 0.09, size * 0.014, palette.gradient[1])
  },
}
