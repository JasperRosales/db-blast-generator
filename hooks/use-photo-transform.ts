"use client"

import * as React from "react"

import { clampPan } from "@/lib/dp/geometry"
import type { PhotoTransform } from "@/lib/dp/types"

const MIN_ZOOM = 1
const MAX_ZOOM = 2.5

export type PointerHandlers = {
  onPointerDown: (event: React.PointerEvent<HTMLCanvasElement>) => void
  onPointerMove: (event: React.PointerEvent<HTMLCanvasElement>) => void
  onPointerUp: (event: React.PointerEvent<HTMLCanvasElement>) => void
  onPointerCancel: (event: React.PointerEvent<HTMLCanvasElement>) => void
}

type PinchStart = {
  zoom: number
  offset: { x: number; y: number }
  dist: number
  mid: { x: number; y: number }
}

export function usePhotoTransform(size: number) {
  const [rotation, setRotation] = React.useState(0)
  const [zoom, setZoom] = React.useState(1)
  const [offset, setOffset] = React.useState({ x: 0, y: 0 })
  const previewRef = React.useRef<HTMLCanvasElement | null>(null)
  const pointersRef = React.useRef<Map<number, { x: number; y: number }>>(new Map())
  const dragStartRef = React.useRef<{ x: number; y: number } | null>(null)
  const zoomRef = React.useRef(1)
  const pinchStartRef = React.useRef<PinchStart | null>(null)

  React.useEffect(() => {
    zoomRef.current = zoom
  }, [zoom])

  const transform = React.useMemo<PhotoTransform>(
    () => ({ rotation, zoom, x: offset.x, y: offset.y }),
    [rotation, zoom, offset]
  )

  function handlePointerDown(event: React.PointerEvent<HTMLCanvasElement>) {
    const canvas = previewRef.current
    if (!canvas) return
    canvas.setPointerCapture(event.pointerId)
    pointersRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY })

    if (pointersRef.current.size === 1) {
      dragStartRef.current = { x: event.clientX, y: event.clientY }
      pinchStartRef.current = null
    } else if (pointersRef.current.size === 2) {
      const [a, b] = [...pointersRef.current.values()]
      dragStartRef.current = null
      pinchStartRef.current = {
        zoom,
        offset: { ...offset },
        dist: Math.hypot(b.x - a.x, b.y - a.y),
        mid: { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 },
      }
    }
  }

  function handlePointerMove(event: React.PointerEvent<HTMLCanvasElement>) {
    if (!pointersRef.current.has(event.pointerId)) return
    const canvas = previewRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const scale = size / rect.width
    pointersRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY })

    if (pointersRef.current.size === 1 && dragStartRef.current) {
      const dx = (event.clientX - dragStartRef.current.x) * scale
      const dy = (event.clientY - dragStartRef.current.y) * scale
      dragStartRef.current = { x: event.clientX, y: event.clientY }
      setOffset((o) => clampPan({ x: o.x + dx, y: o.y + dy }, size, zoom))
      return
    }

    if (pointersRef.current.size === 2 && pinchStartRef.current) {
      const start = pinchStartRef.current
      const [a, b] = [...pointersRef.current.values()]
      const dist = Math.hypot(b.x - a.x, b.y - a.y)
      const mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }
      const nextZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, start.zoom * (dist / start.dist)))
      const ratio = nextZoom / start.zoom
      const centerCss = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
      const startMid = {
        x: (start.mid.x - centerCss.x) * scale,
        y: (start.mid.y - centerCss.y) * scale,
      }
      const midCanvas = {
        x: (mid.x - centerCss.x) * scale,
        y: (mid.y - centerCss.y) * scale,
      }
      setZoom(nextZoom)
      setOffset(
        clampPan(
          {
            x: start.offset.x * ratio + (midCanvas.x - startMid.x * ratio),
            y: start.offset.y * ratio + (midCanvas.y - startMid.y * ratio),
          },
          size,
          nextZoom
        )
      )
    }
  }

  function handlePointerEnd(event: React.PointerEvent<HTMLCanvasElement>) {
    pointersRef.current.delete(event.pointerId)
    if (pointersRef.current.size === 1) {
      const [remaining] = [...pointersRef.current.values()]
      dragStartRef.current = { x: remaining.x, y: remaining.y }
      pinchStartRef.current = null
    } else if (pointersRef.current.size === 0) {
      dragStartRef.current = null
      pinchStartRef.current = null
    }
  }

  function handlePointerCancel() {
    pointersRef.current.clear()
    dragStartRef.current = null
    pinchStartRef.current = null
  }

  function rotate() {
    setRotation((r) => (r + 90) % 360)
  }

  function zoomBy(delta: number) {
    const next = Math.min(
      MAX_ZOOM,
      Math.max(MIN_ZOOM, Math.round((zoomRef.current + delta) * 10) / 10)
    )
    const ratio = next / zoomRef.current
    setZoom(next)
    setOffset((o) => clampPan({ x: o.x * ratio, y: o.y * ratio }, size, next))
  }

  function reset() {
    setRotation(0)
    setZoom(1)
    setOffset({ x: 0, y: 0 })
  }

  const hasAdjustments = rotation !== 0 || zoom !== 1 || offset.x !== 0 || offset.y !== 0

  return {
    rotation,
    zoom,
    offset,
    transform,
    previewRef,
    handlers: {
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: handlePointerEnd,
      onPointerCancel: handlePointerCancel,
    },
    rotate,
    zoomBy,
    reset,
    hasAdjustments,
  }
}
