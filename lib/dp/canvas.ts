import type { FramePalette, PhotoTransform } from "@/lib/dp/types"

export type BBox = { x: number; y: number; w: number; h: number }
export type PathFn = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number
) => void

export function roundedRectPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}

export function shieldPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number
) {
  const cx = x + w / 2
  ctx.beginPath()
  ctx.moveTo(cx, y)
  ctx.lineTo(x + w * 0.72, y + h * 0.1)
  ctx.lineTo(x + w, y + h * 0.42)
  ctx.lineTo(x + w * 0.85, y + h * 0.55)
  ctx.lineTo(cx, y + h)
  ctx.lineTo(x + w * 0.15, y + h * 0.55)
  ctx.lineTo(x, y + h * 0.42)
  ctx.lineTo(x + w * 0.28, y + h * 0.1)
  ctx.closePath()
}

export function hexPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number
) {
  const cx = x + w / 2
  const cy = y + h / 2
  ctx.beginPath()
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i - Math.PI / 2
    const px = cx + (w / 2) * Math.cos(angle)
    const py = cy + (h / 2) * Math.sin(angle)
    if (i === 0) ctx.moveTo(px, py)
    else ctx.lineTo(px, py)
  }
  ctx.closePath()
}

export function frameGradient(
  ctx: CanvasRenderingContext2D,
  colors: readonly string[],
  x0: number,
  y0: number,
  x1: number,
  y1: number
) {
  const gradient = ctx.createLinearGradient(x0, y0, x1, y1)
  colors.forEach((color, i) => gradient.addColorStop(i / (colors.length - 1), color))
  return gradient
}

export function drawPhoto(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  cx: number,
  cy: number,
  w: number,
  h: number,
  transform: PhotoTransform
) {
  const diagonal = Math.hypot(w, h) * transform.zoom
  ctx.save()
  ctx.translate(cx + transform.x, cy + transform.y)
  ctx.rotate((transform.rotation * Math.PI) / 180)
  const ratio = image.naturalWidth / image.naturalHeight
  let dw: number
  let dh: number
  if (ratio >= 1) {
    dh = diagonal
    dw = diagonal * ratio
  } else {
    dw = diagonal
    dh = diagonal / ratio
  }
  ctx.drawImage(image, -dw / 2, -dh / 2, dw, dh)
  ctx.restore()
}

export function drawPlaceholderFace(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number
) {
  ctx.fillStyle = "oklch(0.268 0.007 34.298)"
  ctx.fillRect(x, y, w, h)

  const cx = x + w / 2
  const headRadius = w * 0.16
  ctx.fillStyle = "oklch(0.42 0.008 49.25)"
  ctx.beginPath()
  ctx.arc(cx, y + h * 0.38, headRadius, 0, Math.PI * 2)
  ctx.fill()

  ctx.beginPath()
  ctx.ellipse(cx, y + h * 0.9, w * 0.28, h * 0.26, 0, 0, Math.PI * 2)
  ctx.fill()
}

export function drawVignette(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number
) {
  const centerX = x + w / 2
  const centerY = y + h / 2
  const gradient = ctx.createRadialGradient(
    centerX,
    centerY,
    Math.min(w, h) * 0.3,
    centerX,
    centerY,
    Math.max(w, h) * 0.75
  )
  gradient.addColorStop(0, "rgba(0, 0, 0, 0)")
  gradient.addColorStop(1, "rgba(0, 0, 0, 0.45)")
  ctx.fillStyle = gradient
  ctx.fill()
}

export function drawPhotoInto(
  ctx: CanvasRenderingContext2D,
  bbox: BBox,
  image: HTMLImageElement | null,
  transform: PhotoTransform,
  pathFn: PathFn
) {
  const { x, y, w, h } = bbox
  ctx.save()
  pathFn(ctx, x, y, w, h)
  ctx.clip()
  if (image) {
    drawPhoto(ctx, image, x + w / 2, y + h / 2, w, h, transform)
  } else {
    drawPlaceholderFace(ctx, x, y, w, h)
  }
  drawVignette(ctx, x, y, w, h)
  ctx.restore()
}

export function strokeFrame(
  ctx: CanvasRenderingContext2D,
  bbox: BBox,
  palette: FramePalette,
  pathFn: PathFn,
  lineWidth: number,
  blur: number
) {
  const { x, y, w, h } = bbox
  ctx.save()
  ctx.lineWidth = lineWidth
  ctx.lineJoin = "round"
  ctx.strokeStyle = frameGradient(ctx, palette.gradient, x, y, x + w, y + h)
  ctx.shadowColor = palette.glow
  ctx.shadowBlur = blur
  pathFn(ctx, x, y, w, h)
  ctx.stroke()
  ctx.restore()
}

export function fillDot(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  color: string
) {
  ctx.save()
  ctx.fillStyle = color
  ctx.beginPath()
  ctx.arc(cx, cy, radius, 0, Math.PI * 2)
  ctx.fill()
  ctx.restore()
}
