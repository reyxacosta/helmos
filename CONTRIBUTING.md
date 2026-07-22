# Contributing to HelmOS

## Requirements

- Node.js **20.9.0+** (required by Next.js 16)
- npm (this repo uses `package-lock.json`)

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in values as needed
npm run dev
```

The dev server runs on Turbopack by default (no flag needed) at `http://localhost:3000`.

## Scripts

| Command         | Description                          |
| --------------- | ------------------------------------ |
| `npm run dev`   | Start the dev server (Turbopack)     |
| `npm run build` | Production build (Turbopack)         |
| `npm run start` | Run the production build             |
| `npm run lint`  | Run ESLint                           |

## Project structure

```
src/
  app/          # App Router — routing only (pages, layouts, route handlers, proxy.ts)
  components/   # Shared presentational UI components (ui/ = design-system primitives)
  features/     # Self-contained domain modules, added as each feature ships
  server/       # Server-only code: db/, actions/, services/ — never imported by Client Components
  lib/          # Framework-agnostic utilities
  config/       # Typed app configuration & env validation
  types/        # Shared TypeScript types
  styles/       # Design tokens / theme
```

Each folder above has a `README.md` explaining what belongs in it. When in doubt about where new code goes, read that file first.

## Branching & commits

- Branch off `main`: `type/short-description` (e.g. `feat/workspace-switcher`, `fix/session-expiry`)
- Commit messages: imperative mood, explain *why* over *what* (e.g. `fix: prevent duplicate webhook processing`)
- Keep PRs scoped to one concern; avoid bundling unrelated refactors with feature work

## Code style

- TypeScript strict mode is on (`tsconfig.json`) — don't weaken it
- ESLint (flat config, `eslint.config.mjs`) is the source of truth for lint rules; run `npm run lint` before opening a PR
- Prefer Server Components by default; only add `"use client"` where interactivity requires it
- Read `CLAUDE.md` for Next.js 16-specific conventions (e.g. `proxy.ts` not `middleware.ts`, async Request APIs) before writing routing or caching code

## Environment variables

- Copy `.env.example` to `.env.local` for local development; never commit `.env.local`
- Prefix any variable that must be readable in the browser with `NEXT_PUBLIC_`
- Adding a new variable? Add it to `.env.example` (with a comment, no real value) in the same PR

## Pull request checklist

- [ ] `npm run lint` passes
- [ ] `npm run build` succeeds
- [ ] New env vars (if any) are documented in `.env.example`
- [ ] New top-level folders (if any) have a `README.md` explaining their purpose
- [ ] PR description explains *why*, not just *what*
