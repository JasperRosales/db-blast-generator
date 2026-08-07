export type FrameId =
  | "cics"
  | "cet"
  | "neon"
  | "orbit"
  | "halo"
  | "shield"
  | "hex"
  | "seal"

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

export interface FrameDrawer {
  readonly id: FrameId
  draw(
    ctx: CanvasRenderingContext2D,
    size: number,
    image: HTMLImageElement | null,
    palette: FramePalette,
    transform: PhotoTransform,
    frameImage?: HTMLImageElement | null
  ): void
}
