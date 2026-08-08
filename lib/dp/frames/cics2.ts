import { drawPhoto, drawPlaceholderFace, drawVignette } from "@/lib/dp/canvas"
import type { FrameDrawer } from "@/lib/dp/types"

const CICS2_WINDOW = {
  x: 248 / 1080,
  y: 217 / 1080,
  w: 580 / 1080,
  h: 578 / 1080,
}

const CICS2_COVER = {
  w: 606 / 1080,
  h: 606 / 1080,
}

export const cics2: FrameDrawer = {
  id: "cics2",
  draw(ctx, size, image, _palette, transform, frameImage) {
    const cx = (CICS2_WINDOW.x + CICS2_WINDOW.w / 2) * size
    const cy = (CICS2_WINDOW.y + CICS2_WINDOW.h / 2) * size

    ctx.save()
    if (image) {
      drawPhoto(ctx, image, cx, cy, CICS2_COVER.w * size, CICS2_COVER.h * size, transform)
    } else {
      drawPlaceholderFace(ctx, 0, 0, size, size)
    }
    drawVignette(
      ctx,
      CICS2_WINDOW.x * size,
      CICS2_WINDOW.y * size,
      CICS2_WINDOW.w * size,
      CICS2_WINDOW.h * size
    )
    ctx.restore()

    if (frameImage) {
      ctx.drawImage(frameImage, 0, 0, size, size)
    }
  },
}
