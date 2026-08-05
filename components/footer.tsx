"use client"

import { site } from "@/data/site"
import { linearGradient } from "@/lib/gradient"
import type { Blast } from "@/data/blasts"

export function Footer({ blast }: { blast: Blast }) {
  return (
    <footer className="relative">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px"
      />
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <p className="text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()}{" "}
          <span
            className="font-medium"
            style={{
              backgroundImage: linearGradient(blast.gradient),
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {site.brand.name}
          </span>
          . {site.footer.rights}
        </p>
      </div>
    </footer>
  )
}
