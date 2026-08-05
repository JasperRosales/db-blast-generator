import type { Blast, Program, Year } from "@/lib/domain/blast"

export type { Blast, BlastId, Program, Year, YearlyCaption } from "@/lib/domain/blast"

export const years: Array<{ value: Year; label: string }> = [
  { value: "1", label: "1st" },
  { value: "2", label: "2nd" },
  { value: "3", label: "3rd" },
  { value: "4", label: "4th" },
]

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
    frames: ["cics"],
    department: "College of Informatics and Computing Sciences",
    programs: cicsPrograms,
    body: "Hello, I am {name}, a {year} {program} student at the {department}. Excited to keep building, keep learning, and keep shipping — here's to another year of turning ideas into reality. Let's make it a great one!",
    hashtags: ["#CICS", "#BSUBalayan", "#CodeLife", "#TechProud"],
    yearly: {
      "1": {
        header: "𝙶𝚒𝚝 𝚂𝚝𝚊𝚛𝚝𝚎𝚍: 𝙸𝚗𝚒𝚝𝚒𝚊𝚕𝚒𝚣𝚒𝚗𝚐 𝙵𝚞𝚝𝚞𝚛𝚎 𝙸𝚗𝚗𝚘𝚟𝚊𝚝𝚘𝚛𝚜",
        body: "Hello, I am [Full Name], a 1st Year 𝘽𝚂 in 𝙸𝚗𝚏𝚘𝚛𝚖𝚊𝚝𝚒𝚘𝚗 𝚃𝚎𝚌𝚑𝚗𝚘𝚕𝚘𝚐𝚢 student of the 𝘾𝚘𝚕𝚕𝚎𝚐𝚎 𝚘𝚏 𝙸𝚗𝚏𝚘𝚛𝚖𝚊𝚝𝚒𝚌𝚜 𝚊𝚗𝚍 𝘾𝚘𝚖𝚙𝚞𝚝𝚒𝚗𝚐 𝚂𝚌𝚒𝚎𝚗𝚌𝚎𝚜 at 𝘽𝚊𝚝𝚊𝚗𝚐𝚊𝚜 𝚂𝚝𝚊𝚝𝚎 𝚄𝚗𝚒𝚟𝚎𝚛𝚜𝚒𝚝𝚢 - 𝚃𝙽𝙴𝚄 𝘽𝚊𝚕𝚊𝚢𝚊𝚗 𝘾𝚊𝚖𝚙𝚞𝚜.\n\nPart of 𝙴𝚕𝚎𝚟𝚊𝚝𝙴𝘿 3.0: 𝙵𝚛𝚎𝚜𝚑𝚖𝚎𝚗 𝙾𝚛𝚒𝚎𝚗𝚝𝚊𝚝𝚒𝚘𝚗 & 𝙾𝚕𝚍 𝚂𝚝𝚞𝚍𝚎𝚗𝚝 𝚁𝚎𝚘𝚛𝚒𝚎𝚗𝚝𝚊𝚝𝚒𝚘𝚗 2026 - This is where my journey as a future innovator begins. I am here to be nurtured, learn the fundamentals of technology, and develop the skills to design, build, and manage digital solutions. Excited to grow with my fellow technologists, embrace every lesson, and take my first confident steps toward shaping the future.",
        hashtags: [
          "#GitStarted",
          "#cicsbalayan",
          "#BatStateUTNEUBalayan",
          "#BSIT",
          "#ElevatED3.0",
          "#FutureInnovators",
        ],
      },
      "2": {
        header: "𝙶𝚒𝚝 𝚂𝚝𝚊𝚛𝚝𝚎𝚍: 𝘽𝚞𝚒𝚕𝚍𝚒𝚗𝚐 𝙵𝚘𝚞𝚗𝚍𝚊𝚝𝚒𝚘𝚗",
        body: "Hello, I am [Full Name], a 2nd Year 𝘽𝚂 in 𝙸𝚗𝚏𝚘𝚛𝚖𝚊𝚝𝚒𝚘𝚗 𝚃𝚎𝚌𝚑𝚗𝚘𝚕𝚘𝚐𝚢 student of the 𝘾𝚘𝚕𝚕𝚎𝚐𝚎 𝚘𝚏 𝙸𝚗𝚏𝚘𝚛𝚖𝚊𝚝𝚒𝚌𝚜 𝚊𝚗𝚍 𝘾𝚘𝚖𝚙𝚞𝚝𝚒𝚗𝚐 𝚂𝚌𝚒𝚎𝚗𝚌𝚎𝚜 at 𝘽𝚊𝚝𝚊𝚗𝚐𝚊𝚜 𝚂𝚝𝚊𝚝𝚎 𝚄𝚗𝚒𝚟𝚎𝚛𝚜𝚒𝚝𝚢 - 𝚃𝙽𝙴𝚄 𝘽𝚊𝚕𝚊𝚢𝚊𝚗 𝘾𝚊𝚖𝚙𝚞𝚜.\n\nPart of 𝙴𝚕𝚎𝚟𝚊𝚝𝙴𝘿 3.0: 𝙵𝚛𝚎𝚜𝚑𝚖𝚎𝚗 𝙾𝚛𝚒𝚎𝚗𝚝𝚊𝚝𝚒𝚘𝚗 & 𝙾𝚕𝚍 𝚂𝚝𝚞𝚍𝚎𝚗𝚝 𝚁𝚎𝚘𝚛𝚒𝚎𝚗𝚝𝚊𝚝𝚒𝚘𝚗 2026 - Now that I have settled into our community, I am building on what I have learned, turning fundamentals into practical skills, and ideas into meaningful purpose. This year is about leveling up, refining my ability to design, build, and manage digital solutions. Ready to take on more projects, embrace new challenges, and grow not just as a student, but as a future innovator and technologist.",
        hashtags: [
          "#GitStarted",
          "#cicsbalayan",
          "#BatStateUTNEUBalayan",
          "#BSIT",
          "#ElevatED3.0",
          "#FutureInnovators",
          "#BuildingTheFuture",
        ],
      },
      "3": {
        header: "𝙶𝚒𝚝 𝚂𝚝𝚊𝚛𝚝𝚎𝚍: 𝙸𝚗𝚗𝚘𝚟𝚊𝚝𝚒𝚗𝚐 𝚆𝚒𝚝𝚑 𝙿𝚞𝚛𝚙𝚘𝚜𝚎",
        body: "Hello, I am [Full Name], a 3rd Year 𝘽𝚂 in 𝙸𝚗𝚏𝚘𝚛𝚖𝚊𝚝𝚒𝚘𝚗 𝚃𝚎𝚌𝚑𝚗𝚘𝚕𝚘𝚐𝚢 student of the 𝘾𝚘𝚕𝚕𝚎𝚐𝚎 𝚘𝚏 𝙸𝚗𝚏𝚘𝚛𝚖𝚊𝚝𝚒𝚌𝚜 𝚊𝚗𝚍 𝘾𝚘𝚖𝚙𝚞𝚝𝚒𝚗𝚐 𝚂𝚌𝚒𝚎𝚗𝚌𝚎𝚜 at 𝘽𝚊𝚝𝚊𝚗𝚐𝚊𝚜 𝚂𝚝𝚊𝚝𝚎 𝚄𝚗𝚒𝚟𝚎𝚛𝚜𝚒𝚝𝚢 - 𝚃𝙽𝙴𝚄 𝘽𝚊𝚕𝚊𝚢𝚊𝚗 𝘾𝚊𝚖𝚙𝚞𝚜.\n\nPart of 𝙴𝚕𝚎𝚟𝚊𝚝𝙴𝘿 3.0: 𝙵𝚛𝚎𝚜𝚑𝚖𝚎𝚗 𝙾𝚛𝚒𝚎𝚗𝚝𝚊𝚝𝚒𝚘𝚗 & 𝙾𝚕𝚍 𝚂𝚝𝚞𝚍𝚎𝚗𝚝 𝚁𝚎𝚘𝚛𝚒𝚎𝚗𝚝𝚊𝚝𝚒𝚘𝚗 2026 -\nFrom learning the fundamentals to creating solutions that matter. This year is about deepening my craft and serving the community through technology. I am proud to be part of this journey, turning knowledge into action and ideas into impact. Committed to building tech that serves and makes a difference!",
        hashtags: [
          "#GitStarted",
          "#cicsbalayan",
          "#BatStateUTNEUBalayan",
          "#BSIT",
          "#ElevatED3.0",
          "#FutureInnovators",
          "#BuildingTheFuture",
        ],
      },
      "4": {
        header: "𝙶𝚒𝚝 𝚂𝚝𝚊𝚛𝚝𝚎𝚍: 𝙻𝚊𝚞𝚗𝚌𝚑𝚒𝚗𝚐 𝙸𝚗𝚝𝚘 𝙸𝚖𝚙𝚊𝚌𝚝",
        body: "Hello, I am [Full Name], a 4th  Year 𝘽𝚂 in 𝙸𝚗𝚏𝚘𝚛𝚖𝚊𝚝𝚒𝚘𝚗 𝚃𝚎𝚌𝚑𝚗𝚘𝚕𝚘𝚐𝚢 student of the 𝘾𝚘𝚕𝚕𝚎𝚐𝚎 𝚘𝚏 𝙸𝚗𝚏𝚘𝚛𝚖𝚊𝚝𝚒𝚌𝚜 𝚊𝚗𝚍 𝘾𝚘𝚖𝚙𝚞𝚝𝚒𝚗𝚐 𝚂𝚌𝚒𝚎𝚗𝚌𝚎𝚜 at 𝘽𝚊𝚝𝚊𝚗𝚐𝚊𝚜 𝚂𝚝𝚊𝚝𝚎 𝚄𝚗𝚒𝚟𝚎𝚛𝚜𝚒𝚝𝚢 - 𝚃𝙽𝙴𝚄 𝘽𝚊𝚕𝚊𝚢𝚊𝚗 𝘾𝚊𝚖𝚙𝚞𝚜.\n\nPart of 𝙴𝚕𝚎𝚟𝚊𝚝𝙴𝘿 3.0: 𝙵𝚛𝚎𝚜𝚑𝚖𝚎𝚗 𝙾𝚛𝚒𝚎𝚗𝚝𝚊𝚝𝚒𝚘𝚗 & 𝙾𝚕𝚍 𝚂𝚝𝚞𝚍𝚎𝚗𝚝 𝚁𝚎𝚘𝚛𝚒𝚎𝚗𝚝𝚊𝚝𝚒𝚘𝚗 2026 -\nThis program has welcomed me, guided me, and equipped me to turn potential into reality. Now standing at the edge of the industry, ready to apply everything I’ve learned and keep creating, keep innovating, and keep moving forward. Ready to deliver sustainable digital services and shape the future I was initialized to build, and serve our community and beyond.",
        hashtags: [
          "#GitStarted",
          "#cicsbalayan",
          "#BatStateUTNEUBalayan",
          "#BSIT",
          "#ElevatED3.0",
          "#FutureReady",
        ],
      },
    },
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
