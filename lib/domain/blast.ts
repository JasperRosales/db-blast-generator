import type { FrameId } from "@/lib/dp/types"

export type BlastId = "ssc" | "cics" | "cet"

export type Year = "1" | "2" | "3" | "4"

export type Program = {
  name: string
  abbr: string
}

export type YearlyCaption = {
  header: string
  body: string
  hashtags: string[]
  campus?: string
  event?: string
}

export interface Blast {
  id: BlastId
  label: string
  name: string
  title: string
  description: string
  gradient: readonly [string, string, string]
  glow: string
  frames: readonly FrameId[]
  department: string
  campus?: string
  event?: string
  programs: readonly Program[]
  programsByYear?: Readonly<Partial<Record<Year, readonly Program[]>>>
  body: string
  hashtags: readonly string[]
  yearly?: Readonly<Partial<Record<Year, YearlyCaption>>>
}
