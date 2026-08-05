"use client"

import * as React from "react"
import dynamic from "next/dynamic"

import { SiteHeader } from "@/components/site-header"
import { Footer } from "@/components/footer"
import { DpApp } from "@/components/dp-app"
import { blasts } from "@/data/blasts"

const FloatingParticles = dynamic(
  () =>
    import("@/components/floating-particles").then((mod) => mod.FloatingParticles),
  { ssr: false }
)

export function DpShell() {
  const [activeId, setActiveId] = React.useState(blasts[0].id)
  const active = blasts.find((blast) => blast.id === activeId) ?? blasts[0]

  return (
    <div className="relative isolate min-h-svh overflow-x-clip">
      <FloatingParticles colors={active.gradient} glow={active.glow} />
      <SiteHeader blast={active} />
      <main>
        <DpApp activeId={activeId} onActiveChange={setActiveId} />
      </main>
      <Footer blast={active} />
    </div>
  )
}
