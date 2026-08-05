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
