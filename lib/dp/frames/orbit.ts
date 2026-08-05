import { drawPhotoInto, fillDot, frameGradient } from "@/lib/dp/canvas"
import type { FrameDrawer } from "@/lib/dp/types"

const ACCENT = "oklch(0.985 0.001 106.423)"

export const orbit: FrameDrawer = {
  id: "orbit",
  draw(ctx, size, image, palette, transform) {
    const cx = size / 2
    const cy = size / 2
    const radius = size * 0.42
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
    ctx.lineWidth = size * 0.05
    ctx.strokeStyle = frameGradient(ctx, palette.gradient, bbox.x, bbox.y, bbox.x + bbox.w, bbox.y + bbox.h)
    ctx.shadowColor = palette.glow
    ctx.shadowBlur = size * 0.05
    ctx.beginPath()
    ctx.arc(cx, cy, radius, 0, Math.PI * 2)
    ctx.stroke()
    ctx.restore()

    const orbitRadius = radius + size * 0.025
    for (let i = 0; i < 4; i++) {
      const angle = (Math.PI / 2) * i - Math.PI / 2
      fillDot(
        ctx,
        cx + Math.cos(angle) * orbitRadius,
        cy + Math.sin(angle) * orbitRadius,
        size * 0.028,
        ACCENT
      )
    }
  },
}
