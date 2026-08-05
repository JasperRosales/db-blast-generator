import type {
  FrameDrawer,
  FrameId,
  FramePalette,
  PhotoTransform,
} from "@/lib/dp/types"

const loaders: Record<FrameId, () => Promise<FrameDrawer>> = {
  cics: () => import("@/lib/dp/frames/cics").then((mod) => mod.cics),
  neon: () => import("@/lib/dp/frames/neon").then((mod) => mod.neon),
  orbit: () => import("@/lib/dp/frames/orbit").then((mod) => mod.orbit),
  halo: () => import("@/lib/dp/frames/halo").then((mod) => mod.halo),
  shield: () => import("@/lib/dp/frames/shield").then((mod) => mod.shield),
  hex: () => import("@/lib/dp/frames/hex").then((mod) => mod.hex),
  seal: () => import("@/lib/dp/frames/seal").then((mod) => mod.seal),
}

const drawerCache = new Map<FrameId, Promise<FrameDrawer>>()

export function loadDrawer(frameId: FrameId): Promise<FrameDrawer> {
  let promise = drawerCache.get(frameId)
  if (!promise) {
    promise = loaders[frameId]()
    drawerCache.set(frameId, promise)
  }
  return promise
}

export function drawFrame(
  ctx: CanvasRenderingContext2D,
  size: number,
  drawer: FrameDrawer,
  image: HTMLImageElement | null,
  palette: FramePalette,
  transform: PhotoTransform,
  frameImage?: HTMLImageElement | null
) {
  ctx.clearRect(0, 0, size, size)
  drawer.draw(ctx, size, image, palette, transform, frameImage)
}

export async function renderDp(
  ctx: CanvasRenderingContext2D,
  size: number,
  frameId: FrameId,
  image: HTMLImageElement | null,
  palette: FramePalette,
  transform: PhotoTransform,
  frameImage?: HTMLImageElement | null
) {
  const drawer = await loadDrawer(frameId)
  drawFrame(ctx, size, drawer, image, palette, transform, frameImage)
}
