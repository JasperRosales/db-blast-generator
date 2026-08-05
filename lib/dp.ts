export type FrameId = "neon" | "orbit" | "halo" | "shield" | "hex" | "seal"

export const frameNames: Record<FrameId, string> = {
  neon: "Neon Frame",
  orbit: "Orbit Circle",
  halo: "Halo Frame",
  shield: "Shield Crest",
  hex: "Hex Cutout",
  seal: "Engineer Seal",
}

export type FramePalette = {
  gradient: readonly [string, string, string]
  glow: string
}

export type PhotoTransform = {
  rotation: number
  zoom: number
  x: number
  y: number
}

export function clampPan(
  offset: { x: number; y: number },
  size: number,
  zoom: number
): { x: number; y: number } {
  const max = Math.hypot(size, size) * zoom * 0.3
  return {
    x: Math.max(-max, Math.min(max, offset.x)),
    y: Math.max(-max, Math.min(max, offset.y)),
  }
}

type BBox = { x: number; y: number; w: number; h: number }
type PathFn = (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) => void

function roundedRectPath(
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

function shieldPath(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
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

function hexPath(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
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

function frameGradient(
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

function drawPhoto(
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

function drawPlaceholderFace(
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

function drawVignette(
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

function drawPhotoInto(
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

function strokeFrame(
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

function fillDot(
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

function drawNeon(
  ctx: CanvasRenderingContext2D,
  size: number,
  image: HTMLImageElement | null,
  palette: FramePalette,
  transform: PhotoTransform
) {
  const inset = size * 0.13
  const bbox: BBox = { x: inset, y: inset, w: size - inset * 2, h: size - inset * 2 }
  const radius = bbox.w * 0.14
  const path = (c: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) =>
    roundedRectPath(c, x, y, w, h, radius)

  drawPhotoInto(ctx, bbox, image, transform, path)
  strokeFrame(ctx, bbox, palette, path, size * 0.05, size * 0.045)

  const corners: Array<[number, number]> = [
    [bbox.x + radius, bbox.y + radius],
    [bbox.x + bbox.w - radius, bbox.y + radius],
    [bbox.x + radius, bbox.y + bbox.h - radius],
    [bbox.x + bbox.w - radius, bbox.y + bbox.h - radius],
  ]
  for (const [cx, cy] of corners) {
    fillDot(ctx, cx, cy, size * 0.022, "oklch(0.985 0.001 106.423)")
  }
}

function drawOrbit(
  ctx: CanvasRenderingContext2D,
  size: number,
  image: HTMLImageElement | null,
  palette: FramePalette,
  transform: PhotoTransform
) {
  const cx = size / 2
  const cy = size / 2
  const radius = size * 0.42
  const bbox: BBox = { x: cx - radius, y: cy - radius, w: radius * 2, h: radius * 2 }

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
      "oklch(0.985 0.001 106.423)"
    )
  }
}

function drawHalo(
  ctx: CanvasRenderingContext2D,
  size: number,
  image: HTMLImageElement | null,
  palette: FramePalette,
  transform: PhotoTransform
) {
  const inset = size * 0.14
  const bbox: BBox = { x: inset, y: inset, w: size - inset * 2, h: size - inset * 2 }
  const radius = bbox.w * 0.2
  const path = (c: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) =>
    roundedRectPath(c, x, y, w, h, radius)

  drawPhotoInto(ctx, bbox, image, transform, path)

  ctx.save()
  ctx.lineWidth = size * 0.018
  ctx.strokeStyle = "oklch(1 0 0 / 0.18)"
  path(ctx, bbox.x - size * 0.035, bbox.y - size * 0.035, bbox.w + size * 0.07, bbox.h + size * 0.07)
  ctx.stroke()
  ctx.restore()

  strokeFrame(ctx, bbox, palette, path, size * 0.05, size * 0.05)

  fillDot(ctx, bbox.x + bbox.w / 2, bbox.y - size * 0.035, size * 0.024, palette.gradient[1])
}

function drawShield(
  ctx: CanvasRenderingContext2D,
  size: number,
  image: HTMLImageElement | null,
  palette: FramePalette,
  transform: PhotoTransform
) {
  const bbox: BBox = {
    x: size * 0.13,
    y: size * 0.1,
    w: size * 0.74,
    h: size * 0.8,
  }

  drawPhotoInto(ctx, bbox, image, transform, shieldPath)
  strokeFrame(ctx, bbox, palette, shieldPath, size * 0.05, size * 0.05)

  fillDot(ctx, bbox.x + bbox.w / 2, bbox.y + size * 0.012, size * 0.026, "oklch(0.985 0.001 106.423)")
  fillDot(ctx, bbox.x + bbox.w * 0.78, bbox.y + size * 0.09, size * 0.014, palette.gradient[1])
  fillDot(ctx, bbox.x + bbox.w * 0.22, bbox.y + size * 0.09, size * 0.014, palette.gradient[1])
}

function drawHex(
  ctx: CanvasRenderingContext2D,
  size: number,
  image: HTMLImageElement | null,
  palette: FramePalette,
  transform: PhotoTransform
) {
  const side = size * 0.44
  const bbox: BBox = {
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
      "oklch(0.985 0.001 106.423)"
    )
  }
}

function drawSeal(
  ctx: CanvasRenderingContext2D,
  size: number,
  image: HTMLImageElement | null,
  palette: FramePalette,
  transform: PhotoTransform
) {
  const cx = size / 2
  const cy = size / 2
  const radius = size * 0.4
  const bbox: BBox = { x: cx - radius, y: cy - radius, w: radius * 2, h: radius * 2 }

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
      "oklch(0.985 0.001 106.423)"
    )
  }
}

const FRAME_DRAWERS: Record<
  FrameId,
  (
    ctx: CanvasRenderingContext2D,
    size: number,
    image: HTMLImageElement | null,
    palette: FramePalette,
    transform: PhotoTransform
  ) => void
> = {
  neon: drawNeon,
  orbit: drawOrbit,
  halo: drawHalo,
  shield: drawShield,
  hex: drawHex,
  seal: drawSeal,
}

export function renderDp(
  ctx: CanvasRenderingContext2D,
  size: number,
  frameId: string,
  image: HTMLImageElement | null,
  palette: FramePalette,
  transform: PhotoTransform
) {
  ctx.clearRect(0, 0, size, size)
  const draw = FRAME_DRAWERS[frameId as FrameId] ?? drawNeon
  draw(ctx, size, image, palette, transform)
}
