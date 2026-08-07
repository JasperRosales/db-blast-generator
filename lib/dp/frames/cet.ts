import { drawPhoto, drawPlaceholderFace, drawVignette } from "@/lib/dp/canvas"
import type { FrameDrawer } from "@/lib/dp/types"

const CET_WINDOW = {
  x: 249 / 1080,
  y: 250 / 1080,
  w: 576 / 1080,
  h: 573 / 1080,
}

const CET_COVER = {
  w: 576 / 1080,
  h: 573 / 1080,
}

export const cet: FrameDrawer = {
  id: "cet",
  draw(ctx, size, image, _palette, transform, frameImage) {
    const cx = (CET_WINDOW.x + CET_WINDOW.w / 2) * size
    const cy = (CET_WINDOW.y + CET_WINDOW.h / 2) * size

    ctx.save()
    if (image) {
      drawPhoto(ctx, image, cx, cy, CET_COVER.w * size, CET_COVER.h * size, transform)
    } else {
      drawPlaceholderFace(ctx, 0, 0, size, size)
    }
    drawVignette(
      ctx,
      CET_WINDOW.x * size,
      CET_WINDOW.y * size,
      CET_WINDOW.w * size,
      CET_WINDOW.h * size
    )
    ctx.restore()

    if (frameImage) {
      ctx.drawImage(frameImage, 0, 0, size, size)
    }
  },
}
