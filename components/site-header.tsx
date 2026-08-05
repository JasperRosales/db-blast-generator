"use client"

import { site } from "@/data/site"
import { linearGradient, translucent } from "@/lib/gradient"
import type { Blast } from "@/data/blasts"

export function SiteHeader({ blast }: { blast: Blast }) {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/60 backdrop-blur-xl">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
      />
      <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#" className="flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/icon.ico"
            alt=""
            className="size-9 rounded-xl ring-1 ring-border/60"
          />
          <span className="flex flex-col leading-tight">
            <span className="font-heading text-sm font-semibold">
              {site.brand.name}
            </span>
            <span className="text-[11px] text-muted-foreground">
              {site.brand.tagline}
            </span>
          </span>
        </a>
      </div>
      <div
        aria-hidden
        className="h-px w-full"
      />
    </header>
  )
}
