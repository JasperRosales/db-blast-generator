"use client"

import dynamic from "next/dynamic"

import { Badge } from "@/components/ui/badge"
import { blasts, type Blast } from "@/data/blasts"
import { linearGradient, translucent } from "@/lib/gradient"
import { cn } from "@/lib/utils"
import { RiSparkling2Line } from "@remixicon/react"

const DpGenerator = dynamic(
  () => import("@/components/dp-generator").then((mod) => mod.DpGenerator),
  {
    loading: () => (
      <div className="mx-auto grid max-w-5xl animate-pulse gap-4 px-4 pb-16 sm:px-6 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <div className="h-56 rounded-3xl bg-card ring-1 ring-foreground/5" />
          <div className="h-40 rounded-3xl bg-card ring-1 ring-foreground/5" />
          <div className="h-80 rounded-3xl bg-card ring-1 ring-foreground/5" />
        </div>
        <div className="h-[28rem] rounded-3xl bg-card ring-1 ring-foreground/5" />
      </div>
    ),
  }
)

export function DpApp({
  activeId,
  onActiveChange,
}: {
  activeId: Blast["id"]
  onActiveChange: (id: Blast["id"]) => void
}) {
  const active = blasts.find((blast) => blast.id === activeId) ?? blasts[0]

  return (
    <div className="relative">
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div
          className="absolute top-1/4 -left-40 h-96 w-96 rounded-full blur-3xl"
          style={{ background: linearGradient(translucent(active.gradient, "0.16")) }}
        />
        <div
          className="absolute right-0 bottom-1/4 h-80 w-80 rounded-full blur-3xl"
          style={{ background: linearGradient(translucent(active.gradient, "0.14")) }}
        />
        <div
          className="absolute top-2/3 left-1/3 h-72 w-72 rounded-full blur-3xl"
          style={{ background: linearGradient(translucent(active.gradient, "0.12")) }}
        />
      </div>

      <section className="relative">
        <div className="mx-auto max-w-5xl px-4 pt-14 pb-8 text-center sm:px-6 sm:pt-16">
          <Badge
            className="mb-4 h-auto max-w-full gap-1.5 px-3 py-1.5 text-xs whitespace-normal"
            variant="secondary"
            style={{
              backgroundImage: linearGradient(translucent(active.gradient, "0.3")),
              borderColor: translucent([active.gradient[1]], "0.5").join(""),
              boxShadow: `0 0 24px -8px ${active.glow}`,
            }}
          >
            <RiSparkling2Line />
            {active.name}
          </Badge>

          <h1
            className="mx-auto max-w-3xl bg-clip-text font-heading text-4xl leading-[1.15] font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl"
            style={{ backgroundImage: linearGradient(active.gradient, 110) }}
          >
            {active.title}
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base text-pretty text-muted-foreground sm:text-lg">
            {active.description}
          </p>

          <div className="mx-auto mt-7 grid w-full max-w-xs grid-cols-3 gap-1 rounded-full border border-border/60 bg-card p-1 shadow-md ring-1 ring-foreground/5 sm:inline-flex sm:w-auto">
            {blasts.map((blast) => {
              const isActive = blast.id === activeId
              return (
                <button
                  key={blast.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => onActiveChange(blast.id)}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-all sm:px-5",
                    isActive
                      ? "text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  style={
                    isActive
                      ? {
                          backgroundImage: linearGradient(blast.gradient),
                          boxShadow: `0 4px 16px -6px ${blast.glow}`,
                        }
                      : undefined
                  }
                >
                  {blast.label}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      <DpGenerator blast={active} />
    </div>
  )
}
