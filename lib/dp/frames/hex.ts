import { drawPhotoInto, fillDot, hexPath, strokeFrame } from "@/lib/dp/canvas"
import type { FrameDrawer } from "@/lib/dp/types"

const ACCENT = "oklch(0.985 0.001 106.423)"

export const hex: FrameDrawer = {
  id: "hex",
  draw(ctx, size, image, palette, transform) {
    const side = size * 0.44
    const bbox = {
      x: size / 2 - side / 2,
      y: size / 2 - side / 2,
      w: side,
      h: side,
    }

    drawPhotoInto(ctx, bbox, image, transform, hexPath)
    strokeFrame(ctx, bbox, palette, hexPath, size * 0.05, size * 0.05)

    const cx = bbox.x + bbox.w / 2
    const cy = bbox.y + bbox.h / 2
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i - Math.PI / 2
      fillDot(
        ctx,
        cx + (side / 2) * Math.cos(angle),
        cy + (side / 2) * Math.sin(angle),
        size * 0.018,
        ACCENT
      )
    }
  },
}
