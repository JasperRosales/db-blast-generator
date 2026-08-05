This is the **DP Blast Generator** — a Next.js app with the same setup and color scheme as the CICS main page.

Three display-picture blasts, one for each organization, each with its own gradient, titles, and frames:

- **SSC** — golden gradient · *Big Elevation Energy*
- **CICS** — indigo gradient · *git commit -m "hello, world"*
- **CET** — purple gradient · *Concrete plans, bold builds*

Upload a photo, adjust it (rotate, zoom in/out), pick a frame, add your name and year level for a generated caption, and download a styled display picture. Everything runs client-side in the browser using the canvas API.

## Customizing content

- Blast titles, descriptions, gradients, frame assignments, and per-year captions live in `data/blasts.ts`.
- Frame designs are drawn in `lib/dp.ts` (the `FRAME_DRAWERS` registry and `drawNeon` / `drawOrbit` / `drawHalo` / `drawShield` / `drawHex` / `drawSeal` functions). Future real frames can be added as PNG templates in `public/templates`.

## Getting started

```bash
npm install
npm run dev
```

## Scripts

- `npm run dev` — start the development server
- `npm run build` — build for production
- `npm run start` — start the production server
- `npm run lint` — run ESLint
- `npm run typecheck` — run the TypeScript type checker
- `npm run format` — format with Prettier

## Adding components

To add shadcn/ui components to your app, run the following command:

```bash
npx shadcn@latest add button
```

This will place the ui components in the `components` directory.

To use the components in your app, import them as follows:

```tsx
import { Button } from "@/components/ui/button";
```
