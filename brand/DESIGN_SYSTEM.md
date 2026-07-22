# HelmOS Design System

The technical companion to `BRAND_GUIDELINES.md` (philosophy) and `LOGO_USAGE.md` (the mark). This documents the actual tokens and patterns in the codebase — it's a reference to hold the app to, not aspirational. Source of truth for every token below is `src/app/globals.css`.

## Color

All colors are OKLCH, defined once per theme (`:root` for light, `[data-theme="dark"]` for dark) and mapped into Tailwind utilities via `@theme inline`. Never hardcode a hex/rgb color in a component — use the semantic token (`bg-card`, `text-muted-foreground`, etc.) so both themes stay correct automatically.

| Token | Role |
|---|---|
| `background` / `foreground` | Page base |
| `card` / `card-foreground` | Elevated surfaces (cards, dialogs, dropdowns, the auth shell) |
| `border` | All borders — a low-opacity foreground, not a separate gray scale |
| `muted` / `muted-foreground` | Passive/subtle backgrounds and secondary text |
| `accent` / `accent-foreground` | Hover and highlighted states (nav items, menu items) |
| `secondary` / `secondary-foreground` | Secondary buttons/surfaces — a distinct semantic slot from `accent` (hover) and `muted` (passive background), even though visually close in this monochrome-leaning palette |
| `primary` / `primary-foreground` | Brand violet — CTAs, active states, the logo |
| `destructive` / `-foreground` | Errors, danger actions |
| `success` / `-foreground` | Positive status (new — added this sprint) |
| `warning` / `-foreground` | Caution status (new — added this sprint) |
| `info` / `-foreground` | Neutral/informational status (new — added this sprint) |
| `ring` | Focus rings |
| `sidebar` / `-foreground` / `-border` | The app shell's sidebar gets its own slightly-distinct surface tone from the main canvas |

**Hue map** (so new colors stay distinguishable from each other): primary ~275 (violet), destructive ~25 (red), success ~150 (green), warning ~80 (amber), info ~235 (blue). Any new status color should pick a hue at least ~40° away from its neighbors.

**Why no separate "surface hierarchy" token beyond `background`/`card`/`sidebar`/`muted`:** three elevation levels covers everything the app currently needs (base canvas, elevated card, passive fill). Add a fourth only when a real surface needs it — don't pre-build an elevation scale nothing uses yet.

## Typography

Font: Geist Sans (`--font-geist-sans`, via `next/font/google` in `src/app/layout.tsx`), Geist Mono for anything code/kbd-like. No other typefaces — one type family, used consistently, is part of what keeps the product feeling engineered rather than assembled.

Canonical scale (Tailwind class recipes — apply these combinations directly, there's no `<H1>` component layer):

| Role | Classes | Used for |
|---|---|---|
| Display (hero) | `text-4xl sm:text-6xl font-semibold tracking-tight leading-[1.05]` | The one headline per page that needs to dominate |
| H1 | `text-3xl sm:text-4xl font-semibold tracking-tight` | Page-level headings |
| H2 | `text-2xl sm:text-3xl font-semibold tracking-tight` | Section headings |
| H3 | `text-lg font-semibold` | Card/subsection headings |
| Body large | `text-base sm:text-lg text-muted-foreground leading-relaxed` | Section subheads/intros |
| Body | `text-sm text-foreground` | Default UI text |
| Caption | `text-xs text-muted-foreground` | Metadata, timestamps, helper text |
| Eyebrow/kicker | `text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground` | Small label above a headline |

Letter-spacing: `tracking-tight` on every heading (never on body text). Line-height: `leading-relaxed` for anything more than one sentence of body copy; headings use their default tight line-height or an explicit override for very large display text.

## Component system

Primitives live in `src/components/ui/`; each is a small, composable piece — no monolithic "Form" or "Table" component. Current inventory and the standard each follows:

- **Button** (`button.tsx`) — `cva`-based variants (`default`/`outline`/`ghost`) × sizes (`sm`/`md`/`lg`). `buttonVariants` is exported so links can be styled identically to buttons without nesting an `<a>` inside a `<button>`.
- **Input** (`input.tsx`) + **Label** (`label.tsx`) + **FormField** (`form-field.tsx`) — FormField composes the other two plus error display; use it for every form field rather than hand-assembling label+input+error each time.
- **Badge** (`badge.tsx`, new this sprint) — `subtle` (default — border + muted text, for captions like "Private"/"Shared") and semantic variants (`success`/`warning`/`info`/`destructive`/`secondary`/`default`) for actual status.
- **Card pattern** — no dedicated component; the standard is `rounded-xl border border-border bg-card p-5 shadow-sm` (or `rounded-2xl` / more padding for larger feature cards). Applied directly since cards vary enough in content that a wrapper component would just be a className alias.
- **Dialog** (`dialog.tsx`), **DropdownMenu** (`dropdown-menu.tsx`), **Tooltip** (`tooltip.tsx`) — thin styled wrappers around Radix primitives. Radix owns behavior/accessibility; these own visual styling only.
- **Reveal** (`reveal.tsx`, new this sprint) — scroll-triggered entrance animation, `motion-safe`-gated. Wrap any homepage section or card that should animate in on scroll.
- **Icons** — Lucide React exclusively, `size-4` (16px) as the default in-UI size, `size-5` for slightly more prominent standalone icons. Icon badges use the rounded-square pattern (`flex size-8..10 items-center justify-center rounded-md border border-border bg-card text-primary`) — see `LOGO_USAGE.md` for why the brand mark itself never uses this pattern.
- **Loading states** — the standard is a skeleton matching the real layout's shape (`bg-muted` blocks with `animate-pulse`), not a spinner, except inline in buttons mid-submit (`Loader2` + `animate-spin`, see the auth forms). Reference: `src/app/(app)/[workspace]/[section]/loading.tsx`.
- **Empty states** — icon badge + short heading + one line of muted-foreground copy, centered. Reference: `src/features/shell/components/placeholder-page.tsx`.
- **Forms** — `useActionState` + Server Actions, `FormField` per input, a `FormBanner` for form-level errors. Reference: `src/features/auth/components/*-form.tsx`.
- **Tables** — no instance in the app yet; when one is needed, follow the same border/spacing tokens as cards (`border-border`, `text-sm`, row height matching the `h-10` input/button scale) rather than introducing a new visual language.

## Layout

- **Spacing scale**: Tailwind's default 4px base (`gap-1`=4px … `gap-6`=24px, etc.) — no custom scale on top of it.
- **Max content width**: `max-w-4xl` for homepage sections (matches the app shell's information density), `max-w-2xl` for a single column of prose/headline, `max-w-sm` for auth forms.
- **Breakpoints**: Tailwind defaults (`sm` 640 / `md` 768 / `lg` 1024 / `xl` 1280) — `md` is the app shell's sidebar collapse point; `sm` is where homepage grids go from 1 to 2+ columns.
- **Sidebar widths**: 256px expanded, 72px collapsed (icon rail) — `src/features/shell/components/sidebar/sidebar.tsx`.
- **Header height**: 56px (`h-14`) across both the app shell and (implicitly, via consistent padding) the welcome header.
- **Card padding**: `p-5` standard, `p-6`/`p-8` for larger feature/auth cards.
- **Radius scale**: `--radius: 0.625rem` (10px) as the base, with `sm`/`md`/`lg`/`xl` derived from it in `globals.css` — never pick an arbitrary radius value, use one of the four.

## Motion

All keyframes live in `globals.css`; nothing here needs a new dependency.

| Token | Use |
|---|---|
| `animate-fade-in` / `animate-fade-out` | Simple opacity transitions (tooltips, overlays) |
| `animate-scale-in` / `animate-scale-out` | Dialogs, dropdowns (paired with Radix's `data-[state=]` attributes) |
| `animate-slide-in-from-top` / `-left` | Entrance for content that should feel like it's dropping/sliding into place |
| `animate-reveal` (new) | Scroll-triggered entrance — used by the `Reveal` component |
| `animate-drift` (new) | The hero's slow (22s) ambient background glow |

**Timing**: hover/active transitions are 150ms (`icon-button.tsx`, `button.tsx`); entrance animations are 150–250ms; the scroll-reveal is 600ms with a `cubic-bezier(0.16, 1, 0.3, 1)` "ease-out-expo"-style curve (the same curve Linear/Apple-style interfaces lean on — decisive start, soft landing). Nothing in the product should animate for longer than ~600ms except the intentionally slow, intentionally ambient hero drift.

**Reduced motion**: two mechanisms, used for different cases —
1. A global `@media (prefers-reduced-motion: reduce)` block that collapses all `animation-duration`/`transition-duration` to near-zero — the default safety net for everything.
2. `motion-safe:` Tailwind variants for anything that *hides* content pending an animation (`Reveal`, the hero drift) — under reduced motion, that content is simply never hidden in the first place, rather than relying on a near-instant animation to reveal it. Prefer this pattern whenever an animation gates visibility, not just style.

## What's intentionally not here yet

Page-transition animation (between routes) and a generic Table component are not built — there's no real multi-page navigation flow or tabular data in the product yet to design them against. Add them when a real use case exists, following the timing/easing conventions above, rather than speculatively now.
