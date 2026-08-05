const frameImageCache = new Map<string, HTMLImageElement>()

export function loadFrameImage(src: string): Promise<HTMLImageElement> {
  const cached = frameImageCache.get(src)
  if (cached) return Promise.resolve(cached)
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => {
      frameImageCache.set(src, img)
      resolve(img)
    }
    img.onerror = reject
    img.src = src
  })
}
