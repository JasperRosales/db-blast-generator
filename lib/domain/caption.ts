import type { Program, Year, YearlyCaption } from "@/lib/domain/blast"

export type GeneratedCaption = {
  header: string
  body: string
  bodyHtml: string
  hashtags: string
  text: string
  html: string
}

export interface CaptionSource {
  title: string
  body: string
  department: string
  campus?: string
  event?: string
  hashtags: readonly string[]
  programs: readonly Program[]
  yearly?: Readonly<Partial<Record<Year, YearlyCaption>>>
}

export interface CaptionBuilder {
  build(
    source: CaptionSource,
    name: string,
    year: Year,
    programAbbr: string
  ): GeneratedCaption
}
