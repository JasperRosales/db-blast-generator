"use client"

import * as React from "react"

import { frameImageSrc } from "@/lib/dp/frame-meta"
import { loadFrameImage } from "@/lib/dp/image"
import type { FrameId } from "@/lib/dp/types"

export function useFrameImage(frameId: FrameId) {
  const [frameImage, setFrameImage] = React.useState<HTMLImageElement | null>(null)

  React.useEffect(() => {
    let cancelled = false
    const src = frameImageSrc(frameId)
    if (!src) return
    loadFrameImage(src)
      .then((img) => {
        if (!cancelled) setFrameImage(img)
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [frameId])

  return frameImage
}
