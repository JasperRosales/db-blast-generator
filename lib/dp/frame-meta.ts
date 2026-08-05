import type { FrameId } from "@/lib/dp/types"

export const frameNames: Record<FrameId, string> = {
  cics: "CICS Frame",
  neon: "Neon Frame",
  orbit: "Orbit Circle",
  halo: "Halo Frame",
  shield: "Shield Crest",
  hex: "Hex Cutout",
  seal: "Engineer Seal",
}

export function frameImageSrc(frameId: FrameId): string | null {
  switch (frameId) {
    case "cics":
      return "/CICS-Frame.png"
    default:
      return null
  }
}
