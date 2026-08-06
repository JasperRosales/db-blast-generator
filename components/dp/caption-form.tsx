"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { years, type Program, type Year } from "@/data/blasts"
import type { FramePalette } from "@/lib/dp/types"
import type { GeneratedCaption } from "@/lib/domain/caption"
import { linearGradient } from "@/lib/gradient"
import { cn } from "@/lib/utils"
import { RiFileCopyLine } from "@remixicon/react"

export function CaptionForm({
  palette,
  programs,
  name,
  year,
  program,
  caption,
  onNameChange,
  onYearChange,
  onProgramChange,
}: {
  palette: FramePalette
  programs: readonly Program[]
  name: string
  year: Year
  program: string
  caption: GeneratedCaption
  onNameChange: (value: string) => void
  onYearChange: (value: Year) => void
  onProgramChange: (value: string) => void
}) {
  function handleCopy() {
    const item = new ClipboardItem({
      "text/plain": new Blob([caption.text], { type: "text/plain" }),
      "text/html": new Blob([caption.html], { type: "text/html" }),
    })
    navigator.clipboard.write([item])
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Caption</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <label className="block">
          <span className="text-sm font-medium">Full name</span>
          <input
            type="text"
            value={name}
            onChange={(event) => onNameChange(event.target.value)}
            placeholder="Juan Dela Cruz"
            className="mt-1.5 h-9 w-full rounded-xl border border-border/70 bg-background px-3 text-sm text-foreground [color-scheme:dark] outline-none placeholder:text-muted-foreground/60 focus:border-ring focus:ring-3 focus:ring-ring/30"
          />
        </label>

        <div>
          <span className="text-sm font-medium">Program</span>
          <div className="mt-1.5 grid grid-cols-2 gap-2">
            {programs.map((item) => {
              const isActive = item.abbr === program
              return (
                <button
                  key={item.abbr}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => onProgramChange(item.abbr)}
                  className={cn(
                    "rounded-xl px-3 py-2 text-left transition-all",
                    isActive
                      ? "text-primary-foreground"
                      : "bg-background text-muted-foreground ring-1 ring-border/60 hover:text-foreground"
                  )}
                  style={
                    isActive
                      ? {
                          backgroundImage: linearGradient(palette.gradient),
                          boxShadow: `0 4px 14px -6px ${palette.glow}`,
                        }
                      : undefined
                  }
                >
                  <span className="block text-[13px] font-semibold">
                    {item.abbr}
                  </span>
                  <span className="mt-0.5 block text-[11px] opacity-75">
                    {item.name}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        <div>
          <span className="text-sm font-medium">Year level</span>
          <div className="mt-1.5 grid grid-cols-4 gap-2">
            {years.map((item) => {
              const isActive = item.value === year
              return (
                <button
                  key={item.value}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => onYearChange(item.value)}
                  className={cn(
                    "rounded-full py-1.5 text-sm font-medium transition-all",
                    isActive
                      ? "text-primary-foreground"
                      : "bg-background text-muted-foreground ring-1 ring-border/60 hover:text-foreground"
                  )}
                  style={
                    isActive
                      ? {
                          backgroundImage: linearGradient(palette.gradient),
                          boxShadow: `0 4px 14px -6px ${palette.glow}`,
                        }
                      : undefined
                  }
                >
                  {item.label}
                </button>
              )
            })}
          </div>
        </div>

        <div className="flex flex-col gap-3 rounded-2xl bg-background p-3.5 ring-1 ring-border/60">
          <div>
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm font-semibold text-foreground">
                {caption.header}
              </p>
              <Button variant="outline" size="sm" onClick={handleCopy}>
                <RiFileCopyLine data-icon="inline-start" />
                Copy
              </Button>
            </div>
            <p className="mt-1 text-sm leading-snug text-muted-foreground">
              <span dangerouslySetInnerHTML={{ __html: caption.bodyHtml }} />
            </p>
            <p className="mt-1.5 text-xs text-primary/90">{caption.hashtags}</p>
          </div>
          <p className="text-[11px] text-muted-foreground/70">
            Paste this caption under your DP post on Facebook.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
