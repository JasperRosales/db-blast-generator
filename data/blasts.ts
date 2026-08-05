import type { FrameId } from "@/lib/dp"

export type Year = "1" | "2" | "3" | "4"

export const years: Array<{ value: Year; label: string }> = [
  { value: "1", label: "1st" },
  { value: "2", label: "2nd" },
  { value: "3", label: "3rd" },
  { value: "4", label: "4th" },
]

export type Program = {
  name: string
  abbr: string
}

export const cicsPrograms: Program[] = [
  { name: "BS in Information Technology", abbr: "BSIT" },
]

export const cetPrograms: Program[] = [
  { name: "BS in Civil Engineering", abbr: "BSCE" },
  { name: "BS in Mechanical Engineering", abbr: "BSME" },
  { name: "BS in Electrical Engineering", abbr: "BSEE" },
  { name: "BS in Electronics Engineering", abbr: "BSECE" },
  { name: "BS in Computer Engineering", abbr: "BSCpE" },
  { name: "BS in Industrial Engineering", abbr: "BSIE" },
  { name: "BS in Chemical Engineering", abbr: "BSChE" },
  { name: "BS in Sanitary Engineering", abbr: "BSSE" },
]

export type Blast = {
  id: "ssc" | "cics" | "cet"
  label: string
  name: string
  title: string
  description: string
  gradient: readonly [string, string, string]
  glow: string
  frames: FrameId[]
  department: string
  programs: Program[]
  body: string
  hashtags: string[]
}

export const blasts: Blast[] = [
  {
    id: "ssc",
    label: "SSC",
    name: "Supreme Student Council",
    title: "Big Elevation Energy",
    description:
      "The Supreme Student Council welcomes you to a new academic year — shine on your socials with the official SSC display picture.",
    gradient: ["oklch(0.88 0.15 95)", "oklch(0.75 0.19 80)", "oklch(0.62 0.17 60)"],
    glow: "oklch(0.75 0.19 80 / 0.5)",
    frames: ["halo", "shield"],
    department: "Supreme Student Council",
    programs: [...cicsPrograms, ...cetPrograms],
    body: "Hello, I am {name}, a {year} {program} student proudly serving the student body through the {department}. Ready to be elevated, to lead, and to make this school year unforgettable. Let's go, SSC!",
    hashtags: ["#SSC", "#SupremeStudentCouncil", "#BSUBalayan", "#Elevated"],
  },
  {
    id: "cics",
    label: "CICS",
    name: "College of Informatics and Computing Sciences",
    title: "Git Started Together",
    description:
      "The College of Informatics and Computing Sciences invites you into the tech community — commit to a brand-new display picture.",
    gradient: [
      "oklch(0.75 0.15 225)",
      "oklch(0.424 0.199 265.638)",
      "oklch(0.62 0.22 285)",
    ],
    glow: "oklch(0.424 0.199 265.638 / 0.55)",
    frames: ["neon", "orbit"],
    department: "College of Informatics and Computing Sciences",
    programs: cicsPrograms,
    body: "Hello, I am {name}, a {year} {program} student at the {department}. Excited to keep building, keep learning, and keep shipping — here's to another year of turning ideas into reality. Let's make it a great one!",
    hashtags: ["#CICS", "#BSUBalayan", "#CodeLife", "#TechProud"],
  },
  {
    id: "cet",
    label: "CET",
    name: "College of Engineering and Technology",
    title: "Concrete plans, bold builds",
    description:
      "The College of Engineering and Technology is proud to welcome its new students — claim your spot with the CET display picture.",
    gradient: ["oklch(0.74 0.18 310)", "oklch(0.6 0.22 302)", "oklch(0.48 0.24 290)"],
    glow: "oklch(0.6 0.22 302 / 0.5)",
    frames: ["hex", "seal"],
    department: "College of Engineering and Technology",
    programs: cetPrograms,
    body: "Hello, I am {name}, a {year} {program} student at the {department}. Forged by late-night problem sets and fueled by ambition, I'm ready to build, design, and make this year count. Let's go!",
    hashtags: ["#CET", "#BSUBalayan", "#EngineeringLife", "#EngineersOfTomorrow"],
  },
]
