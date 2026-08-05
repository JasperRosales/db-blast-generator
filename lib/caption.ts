import { years, type Blast, type Year } from "@/data/blasts"

const YEAR_LABELS: Record<Year, string> = {
  "1": "1st",
  "2": "2nd",
  "3": "3rd",
  "4": "4th",
}

export type GeneratedCaption = {
  header: string
  body: string
  hashtags: string
  text: string
}

export function buildCaption(
  blast: Blast,
  name: string,
  year: Year,
  programAbbr: string
): GeneratedCaption {
  const program = blast.programs.find((p) => p.abbr === programAbbr) ?? blast.programs[0]
  const displayName = name.trim() || "[Full Name]"

  const body = blast.body
    .replaceAll("{name}", displayName)
    .replaceAll("{year}", `${YEAR_LABELS[year]} Year`)
    .replaceAll("{department}", blast.department)
    .replaceAll("{program}", program.name)

  const hashtags = [...blast.hashtags, `#${program.abbr}`]
  const text = `${blast.title}\n\n${body}\n\n${hashtags.join(" ")}`

  return {
    header: blast.title,
    body,
    hashtags: hashtags.join(" "),
    text,
  }
}

export const yearLabel = (year: Year) => years.find((y) => y.value === year)?.label ?? year
