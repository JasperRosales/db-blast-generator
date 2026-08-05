import { drawPhotoInto, fillDot, frameGradient } from "@/lib/dp/canvas"
import type { FrameDrawer } from "@/lib/dp/types"

const ACCENT = "oklch(0.985 0.001 106.423)"

export const seal: FrameDrawer = {
  id: "seal",
  draw(ctx, size, image, palette, transform) {
    const cx = size / 2
    const cy = size / 2
    const radius = size * 0.4
    const bbox = {
      x: cx - radius,
      y: cy - radius,
      w: radius * 2,
      h: radius * 2,
    }

    drawPhotoInto(ctx, bbox, image, transform, (c, x, y, w, h) => {
      c.beginPath()
      c.arc(x + w / 2, y + h / 2, w / 2, 0, Math.PI * 2)
    })

    ctx.save()
    ctx.lineWidth = size * 0.016
    ctx.strokeStyle = "oklch(1 0 0 / 0.18)"
    ctx.beginPath()
    ctx.arc(cx, cy, radius + size * 0.04, 0, Math.PI * 2)
    ctx.stroke()
    ctx.restore()

    ctx.save()
    ctx.lineWidth = size * 0.06
    ctx.strokeStyle = frameGradient(ctx, palette.gradient, bbox.x, bbox.y, bbox.x + bbox.w, bbox.y + bbox.h)
    ctx.shadowColor = palette.glow
    ctx.shadowBlur = size * 0.05
    ctx.beginPath()
    ctx.arc(cx, cy, radius, 0, Math.PI * 2)
    ctx.stroke()
    ctx.restore()

    const rivetRadius = radius + size * 0.04
    for (let i = 0; i < 4; i++) {
      const angle = (Math.PI / 2) * i - Math.PI / 2
      fillDot(
        ctx,
        cx + Math.cos(angle) * rivetRadius,
        cy + Math.sin(angle) * rivetRadius,
        size * 0.02,
        ACCENT
      )
    }
  },
}
