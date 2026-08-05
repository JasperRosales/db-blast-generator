"use client"

import * as React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { FramePalette } from "@/lib/dp/types"
import { linearGradient } from "@/lib/gradient"
import { cn } from "@/lib/utils"
import { RiArrowUpLine, RiImageAddLine } from "@remixicon/react"

export function PhotoUploader({
  palette,
  photoUrl,
  photoName,
  onFile,
}: {
  palette: FramePalette
  photoUrl: string | null
  photoName: string | null
  onFile: (file: File | undefined | null) => void
}) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = React.useState(false)

  const actionStyle = {
    backgroundImage: linearGradient(palette.gradient),
    boxShadow: `0 8px 24px -8px ${palette.glow}`,
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload your photo</CardTitle>
      </CardHeader>
      <CardContent>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(event) => {
            onFile(event.target.files?.[0])
            event.target.value = ""
          }}
        />
        <div
          role="button"
          tabIndex={0}
          aria-label="Upload a photo"
          onClick={() => inputRef.current?.click()}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault()
              inputRef.current?.click()
            }
          }}
          onDragOver={(event) => {
            event.preventDefault()
            setDragging(true)
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(event) => {
            event.preventDefault()
            setDragging(false)
            onFile(event.dataTransfer.files?.[0])
          }}
          className={cn(
            "flex cursor-pointer flex-col items-center justify-center gap-2.5 rounded-2xl border border-dashed border-border/70 px-6 py-6 text-center transition-colors outline-none hover:border-primary-2/60 hover:bg-primary-2/5 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 sm:py-7",
            dragging && "border-primary-2/70 bg-primary-2/5"
          )}
        >
          {photoUrl ? (
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photoUrl}
                alt="Selected photo preview"
                className="size-14 rounded-2xl object-cover ring-1 ring-border/60"
              />
              <div className="text-left">
                <p className="text-sm font-medium text-foreground">{photoName}</p>
                <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <RiArrowUpLine className="size-3.5" />
                  Click or drop another photo to replace it
                </p>
              </div>
            </div>
          ) : (
            <>
              <span
                className="flex size-10 items-center justify-center rounded-2xl text-primary-foreground"
                style={actionStyle}
              >
                <RiImageAddLine className="size-5" />
              </span>
              <div>
                <p className="text-sm font-medium text-foreground">
                  Drag & drop your photo here
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  or click to browse your files
                </p>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
