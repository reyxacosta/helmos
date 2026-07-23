# HelmOS Logo Usage

## The mark

**This is the official, locked HelmOS logo**, supplied as reference artwork and reproduced here as SVG/CSS rather than a rasterized image. A hexagon frame with an "H" monogram inside — both rendered as matching-weight strokes — paired with a wordmark where "Helm" is a light weight and "OS" is bold with a fixed violet-to-blue gradient.

- **Hexagon + H** — stability, structure, engineering, and a literal initial, all at once. Chosen over a filled badge shape specifically so it reads as *the logo*, not another icon badge (see "What the mark is not," below).
- **"Helm" / "OS"** — the weight contrast (light vs. bold) plus the fixed gradient on "OS" is part of the locked artwork; don't unify the two into a single weight or color.

This shape is a **permanent brand decision**, not a component to redesign per-use. If a surface seems to need a different logo treatment, the answer is almost always "use it smaller / with more clear space / in the mono variant" — not "draw a new version."

**One documented adaptation**: the reference artwork was produced for display on a dark surface (the hexagon/H/"Helm" are pale strokes, invisible against a white canvas). Since HelmOS supports both dark and light theme, the icon and "Helm" render on `currentColor` so they stay legible in both — this is a standard, necessary technical adaptation for a two-theme product, not a redesign. "OS" keeps its fixed gradient in both themes, exactly as supplied.

Source of truth: `src/components/brand/helm-mark.tsx` (icon only) and `src/components/brand-mark.tsx` (icon + wordmark lockup) — the React components every in-app usage renders from — plus `public/brand/helmos-mark*.svg` (static icon-only exports for anything outside the app — docs, decks, social).

## What the mark is not

The rounded-square badge treatment used throughout the app for workspace icons and feature icons (`bg-primary` rounded-md/lg square containing a Lucide icon — see `DESIGN_SYSTEM.md`) is a **general UI convention**, not the brand mark. Never present a workspace/feature icon badge as if it were the HelmOS logo, and never put the hexagon mark inside one of those square badges — the two need to stay visually distinct so the mark keeps its meaning as *the* logo.

## Color

| Context | Color |
|---|---|
| In-app (any theme) | `currentColor`, set via `text-primary` (the standard usage — header, footer, auth shell) |
| Static export, primary | `#5B4FE0` — `public/brand/helmos-mark.svg` |
| Static export, monochrome on light backgrounds | `#0A0A0F` (near-black) — `public/brand/helmos-mark-mono-black.svg` |
| Static export, monochrome on dark backgrounds | `#FFFFFF` — `public/brand/helmos-mark-mono-white.svg` |

Never recolor the mark to anything outside this table (no secondary-brand-color version, no rainbow/gradient fill) — one color, chosen for contrast against the background it sits on.

## Safe spacing

Keep clear space of at least **25% of the mark's width** on all sides, free of text, edges, or other UI — e.g. at 32px, at least 8px of breathing room on every side. When paired with the wordmark, the gap between mark and text (`gap-2` in `BrandMark`) already satisfies this; don't tighten it.

## Minimum size

- Mark alone: **16px** (favicon context — this is why the artwork is two shapes, not five).
- Mark + wordmark: **24px** mark height — below that the wordmark stops being legible before the mark does.

Never scale the mark below these sizes. If a surface needs something smaller, use the mark alone rather than shrinking the full lockup.

## Dark mode (current default) and light mode (supported today)

The app is dark-by-default but fully supports light mode via the existing theme system (`data-theme` attribute, see `DESIGN_SYSTEM.md`). Because the mark uses `currentColor` + `text-primary`, it already adapts automatically — `--primary` is tuned per-theme in `globals.css` (a slightly brighter violet in dark mode for contrast against the near-black background, a slightly deeper violet in light mode). No separate light/dark artwork is needed for in-app usage; only the static monochrome exports need an explicit choice (pick black-on-light or white-on-dark based on the background, per the color table above).

## App icon & favicon

- **Favicon**: `src/app/icon.svg` — Next's static icon file convention, no code required, transparent background, primary-color mark. Covers every current browser (this is why there's no hand-authored `.ico`; see `DESIGN_SYSTEM.md` for why that trade-off was made).
- **App icon (iOS home screen)**: `src/app/apple-icon.tsx` — generated via `next/og`'s `ImageResponse` at build time, solid dark background (`#0A0A0F`) with the mark in `#7C6FF0` (a slightly brighter violet than the in-app primary, for contrast against a small solid-color square). Regenerate this file (not a static asset) if the mark's geometry ever changes, so it never drifts out of sync with `helm-mark.tsx`.

## SVG usage

- In-app: always render `<HelmMark />` (`src/components/brand/helm-mark.tsx`), never a rasterized PNG/JPG of the logo — it must stay crisp at every size and inherit theme color.
- Outside the app (docs, decks, README badges, social profiles): use the appropriate static file from `public/brand/`. Don't screenshot the in-app header to get a "logo image" — export from the SVG.

## Placement

Current usages, all via the shared `BrandMark` component (`src/components/brand-mark.tsx`) so placement stays consistent as the app grows:

- **Welcome header** — top-left, mark + wordmark, links to `/`.
- **Welcome footer** — centered, mark only.
- **Auth shell** — centered above the sign-in/sign-up card, mark + wordmark, links to `/`.

Any new surface that needs the logo should use `BrandMark`, not a one-off `<HelmMark>` render, so lockup spacing and the home link stay consistent everywhere.
