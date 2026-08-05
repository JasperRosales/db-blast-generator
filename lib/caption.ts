import { years, type Year } from "@/data/blasts"
import type {
  CaptionBuilder,
  CaptionSource,
  GeneratedCaption,
} from "@/lib/domain/caption"

const YEAR_LABELS: Record<Year, string> = {
  "1": "1st",
  "2": "2nd",
  "3": "3rd",
  "4": "4th",
}

export function buildCaption(
  source: CaptionSource,
  name: string,
  year: Year,
  programAbbr: string
): GeneratedCaption {
  const program = source.programs.find((p) => p.abbr === programAbbr) ?? source.programs[0]
  const displayName = name.trim() || "[Full Name]"

  const yearly = source.yearly?.[year]
  const title = yearly?.header ?? source.title

  const body = (yearly?.body ?? source.body)
    .replaceAll("{name}", displayName)
    .replaceAll("[Full Name]", displayName)
    .replaceAll("{year}", `${YEAR_LABELS[year]} Year`)
    .replaceAll("{department}", source.department)
    .replaceAll("{program}", program.name)

  const hashtags = yearly?.hashtags ?? [...source.hashtags, `#${program.abbr}`]
  const text = `${title}\n\n${body}\n\n${hashtags.join(" ")}`

  return {
    header: title,
    body,
    hashtags: hashtags.join(" "),
    text,
  }
}

export const defaultCaptionBuilder: CaptionBuilder = {
  build: buildCaption,
}

export const yearLabel = (year: Year) => years.find((y) => y.value === year)?.label ?? year
