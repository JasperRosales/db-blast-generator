export function linearGradient(colors: readonly string[], angle = 135) {
  return `linear-gradient(${angle}deg, ${colors.join(", ")})`
}

export function translucent(colors: readonly string[], alpha: string) {
  return colors.map((color) => color.replace(")", ` / ${alpha})`))
}
