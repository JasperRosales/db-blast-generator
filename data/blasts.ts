import type { Blast, Program, Year } from "@/lib/domain/blast"

export type {
  Blast,
  BlastId,
  Program,
  Year,
  YearlyCaption,
} from "@/lib/domain/blast"

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
  { name: "Bachelor of Automotive Engineering Technology", abbr: "BAET" },
  {
    name: "Bachelor of Instrumentation and Control Engineering Technology",
    abbr: "BIECT",
  },
  { name: "Bachelor of Mechanical Engineering Technology", abbr: "BMET" },
  { name: "Bachelor of Architectural Engineering Technology", abbr: "BARET" },
  { name: "Bachelor of Construction Engineering Technology", abbr: "BCET" },
  { name: "Bachelor of Civil Engineering Technology", abbr: "BCVET" },
  { name: "Bachelor of Electrical Engineering Technology", abbr: "BEET" },
  { name: "Bachelor of Computer Engineering Technology", abbr: "BCPET" },
  { name: "Bachelor of Drafting Engineering Technology", abbr: "BDET" },
  { name: "Bachelor of Electronics Engineering Technology", abbr: "BECET" },
]

export const cetProgramsByYear: Readonly<Record<Year, readonly Program[]>> = {
  "1": [
    { name: "Bachelor of Automotive Engineering Technology", abbr: "BAET" },
    {
      name: "Bachelor of Instrumentation and Control Engineering Technology",
      abbr: "BICET",
    },
    { name: "Bachelor of Mechanical Engineering Technology", abbr: "BMET" },
    {
      name: "Bachelor of Architectural Engineering Technology",
      abbr: "BARET",
    },
    {
      name: "Bachelor of Construction Engineering Technology",
      abbr: "BCET",
    },
  ],
  "2": [
    { name: "Bachelor of Automotive Engineering Technology", abbr: "BAET" },
    { name: "Bachelor of Mechanical Engineering Technology", abbr: "BMET" },
    { name: "Bachelor of Civil Engineering Technology", abbr: "BCVET" },
    { name: "Bachelor of Electrical Engineering Technology", abbr: "BEET" },
    { name: "Bachelor of Computer Engineering Technology", abbr: "BCPET" },
  ],
  "3": [
    { name: "Bachelor of Automotive Engineering Technology", abbr: "BAET" },
    {
      name: "Bachelor of Instrumentation and Control Engineering Technology",
      abbr: "BICET",
    },
    { name: "Bachelor of Mechanical Engineering Technology", abbr: "BMET" },
    { name: "Bachelor of Drafting Engineering Technology", abbr: "BDET" },
    { name: "Bachelor of Computer Engineering Technology", abbr: "BCPET" },
    { name: "Bachelor of Electrical Engineering Technology", abbr: "BEET" },
    { name: "Bachelor of Electronics Engineering Technology", abbr: "BECET" },
  ],
  "4": [
    { name: "Bachelor of Automotive Engineering Technology", abbr: "BAET" },
    {
      name: "Bachelor of Instrumentation and Control Engineering Technology",
      abbr: "BICET",
    },
    { name: "Bachelor of Computer Engineering Technology", abbr: "BCPET" },
    { name: "Bachelor of Electrical Engineering Technology", abbr: "BEET" },
  ],
}

export const blasts: Blast[] = [
  {
    id: "ssc",
    label: "SSC",
    name: "Supreme Student Council",
    title: "Big Elevation Energy",
    description:
      "The Supreme Student Council welcomes you to a new academic year — shine on your socials with the official SSC display picture.",
    gradient: [
      "oklch(0.88 0.15 95)",
      "oklch(0.75 0.19 80)",
      "oklch(0.62 0.17 60)",
    ],
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
    campus: "Batangas State University - TNEU Balayan Campus",
    event:
      "ElevatED 3.0: Freshmen Orientation & Old Student Reorientation 2026",
    programs: cicsPrograms,
    body: "Hello, I am {name}, a {year} {program} student at the {department}. Excited to keep building, keep learning, and keep shipping — here's to another year of turning ideas into reality. Let's make it a great one!",
    hashtags: ["#CICS", "#BSUBalayan", "#CodeLife", "#TechProud"],
    yearly: {
      "1": {
        header: "Git Started: Initializing Future Innovators",
        body: "Hello, I am [Full Name], a 1st Year {program} student of the {department} at {campus}.\n\nPart of {event} - This is where my journey as a future innovator begins. I am here to be nurtured, learn the fundamentals of technology, and develop the skills to design, build, and manage digital solutions. Excited to grow with my fellow technologists, embrace every lesson, and take my first confident steps toward shaping the future.",
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
        header: "Git Started: Building Foundation",
        body: "Hello, I am [Full Name], a 2nd Year {program} student of the {department} at {campus}.\n\nPart of {event} - Now that I have settled into our community, I am building on what I have learned, turning fundamentals into practical skills, and ideas into meaningful purpose. This year is about leveling up, refining my ability to design, build, and manage digital solutions. Ready to take on more projects, embrace new challenges, and grow not just as a student, but as a future innovator and technologist.",
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
        header: "Git Started: Innovating With Purpose",
        body: "Hello, I am [Full Name], a 3rd Year {program} student of the {department} at {campus}.\n\nPart of {event} -\nFrom learning the fundamentals to creating solutions that matter. This year is about deepening my craft and serving the community through technology. I am proud to be part of this journey, turning knowledge into action and ideas into impact. Committed to building tech that serves and makes a difference!",
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
        header: "Git Started: Launching Into Impact",
        body: "Hello, I am [Full Name], a 4th Year {program} student of the {department} at {campus}.\n\nPart of {event} -\nThis program has welcomed me, guided me, and equipped me to turn potential into reality. Now standing at the edge of the industry, ready to apply everything I’ve learned and keep creating, keep innovating, and keep moving forward. Ready to deliver sustainable digital services and shape the future I was initialized to build, and serve our community and beyond.",
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
    title: "⚙️ ELEVATION 3.0 ⚙️",
    description:
      "The College of Engineering and Technology is proud to welcome its new students — claim your spot with the CET display picture.",
    gradient: [
      "oklch(0.74 0.18 310)",
      "oklch(0.6 0.22 302)",
      "oklch(0.48 0.24 290)",
    ],
    glow: "oklch(0.6 0.22 302 / 0.5)",
    frames: ["cet"],
    department: "College of Engineering and Technology",
    programs: cetPrograms,
    programsByYear: cetProgramsByYear,
    body: "Every new beginning is another chance to rise, innovate, and lead. With great pride, we usher in another academic year as members of the College of Engineering Technology of Batangas State University The National Engineering University, Balayan Campus, BatStateU, where dreams take shape and ideas lead to innovation. BatStateU's \"Leading Innovations, Transforming Lives, Building the Nation\" continues to inspire members of the university community to be at the vanguard of change and nation-building.\n\nI am {name}, a proud {year} student taking up {program}.\n\nTogether let us make this another year of overcoming challenges, celebrating victories, and soaring to new heights. This is more than a new chapter, this is our Elevation 3.0.\n\nRise with purpose. Engineer the future. Elevate beyond limits.💜🤍",
    hashtags: [
      "#CET",
      "#BSUBalayan",
      "#EngineeringLife",
      "#EngineersOfTomorrow",
    ],
  },
]
