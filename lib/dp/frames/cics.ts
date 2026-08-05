import { drawPhoto, drawPlaceholderFace, drawVignette } from "@/lib/dp/canvas"
import type { FrameDrawer } from "@/lib/dp/types"

const CICS_WINDOW = {
  x: 185 / 1080,
  y: 200 / 1080,
  w: 707 / 1080,
  h: 474 / 1080,
}

const CICS_COVER = {
  w: 738 / 1080,
  h: 708 / 1080,
}

export const cics: FrameDrawer = {
  id: "cics",
  draw(ctx, size, image, _palette, transform, frameImage) {
    const cx = (CICS_WINDOW.x + CICS_WINDOW.w / 2) * size
    const cy = (CICS_WINDOW.y + CICS_WINDOW.h / 2) * size

    ctx.save()
    if (image) {
      drawPhoto(ctx, image, cx, cy, CICS_COVER.w * size, CICS_COVER.h * size, transform)
    } else {
      drawPlaceholderFace(ctx, 0, 0, size, size)
    }
    drawVignette(
      ctx,
      CICS_WINDOW.x * size,
      CICS_WINDOW.y * size,
      CICS_WINDOW.w * size,
      CICS_WINDOW.h * size
    )
    ctx.restore()

    if (frameImage) {
      ctx.drawImage(frameImage, 0, 0, size, size)
    }
  },
}
