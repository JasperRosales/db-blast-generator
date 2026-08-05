"use client"

import * as React from "react"

export function usePhotoUpload() {
  const [url, setUrl] = React.useState<string | null>(null)
  const [name, setName] = React.useState<string | null>(null)
  const [image, setImage] = React.useState<HTMLImageElement | null>(null)
  const urlRef = React.useRef<string | null>(null)

  React.useEffect(() => {
    if (!url) return
    const image = new Image()
    image.onload = () => setImage(image)
    image.src = url
    return () => {
      image.onload = null
    }
  }, [url])

  React.useEffect(() => {
    return () => {
      if (urlRef.current) URL.revokeObjectURL(urlRef.current)
    }
  }, [])

  const handleFile = React.useCallback((file: File | undefined | null) => {
    if (!file || !file.type.startsWith("image/")) return
    if (urlRef.current) URL.revokeObjectURL(urlRef.current)
    const nextUrl = URL.createObjectURL(file)
    urlRef.current = nextUrl
    setUrl(nextUrl)
    setName(file.name)
  }, [])

  return {
    url,
    name,
    image,
    handleFile,
  }
}
