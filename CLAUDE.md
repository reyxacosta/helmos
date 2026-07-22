@AGENTS.md

# Development Guidelines

## Next.js 16 — things that differ from older training data

- **`proxy.ts`, not `middleware.ts`.** The `middleware` file convention is deprecated. Use `proxy.ts` at the project root (or inside `src/`), export a `proxy` function. It always runs on the Node.js runtime — the Edge runtime option is gone.
- **Request-time APIs are async-only.** `cookies()`, `headers()`, `draftMode()`, `params`, and `searchParams` must all be `await`ed. There is no synchronous fallback in v16.
- **Turbopack is the default** for both `next dev` and `next build`. Do not add `--turbopack` — it's already the default and the flag is a no-op. Do not add webpack config unless intentionally opting out with `--webpack`.
- **`next lint` is removed.** Lint with `npm run lint` (calls `eslint` directly via the flat config in `eslint.config.mjs`).
- **`revalidateTag` requires a second argument** — a `cacheLife` profile, e.g. `revalidateTag('posts', 'max')`. For read-your-writes semantics after a mutation, use `updateTag` instead.
- **PPR is superseded by `cacheComponents`.** The `experimental_ppr` segment config and `experimental.ppr` flag are gone; use the `cacheComponents` top-level config option if/when partial prerendering is adopted.
- Prefer Server Components by default; add `"use client"` only where interactivity requires it.

## Project structure

```
src/
  app/          # App Router — routing only (pages, layouts, route handlers)
  proxy.ts      # session refresh + route guard (project root would also work, but
                # lives beside app/ since app/ is under src/ — see Next's proxy.ts docs)
  components/   # Shared presentational UI components (ui/ = design-system primitives)
  features/     # Self-contained domain modules: shell/, auth/, welcome/, ...
  server/       # Server-only code: auth/ (DAL), db/, actions/, services/ — never imported by Client Components
  lib/          # Framework-agnostic utilities, incl. lib/supabase/ (browser + server clients)
  config/       # Typed app configuration & env validation (config/env.ts)
  types/        # Shared TypeScript types
  styles/       # Design tokens / theme
```

Each folder has a `README.md` explaining what belongs in it — check it before adding new code. See `ROADMAP.md` for what each phase of the project will add, and `CONTRIBUTING.md` for the full contributor workflow.

## Conventions

- Path alias `@/*` resolves to `src/*` (see `tsconfig.json`).
- Env vars: only variables prefixed `NEXT_PUBLIC_` are exposed to the browser; everything else is server-only. `.env.example` is the source of truth for what variables exist — add to it whenever you add a new variable. Read them through `@/config/env`, never `process.env` directly, so a missing var fails fast at startup.
- Node.js 20.9+ is required (Next.js 16 minimum).
- Scripts: `npm run dev` / `npm run build` / `npm run start` / `npm run lint`.

## Auth & Supabase

- Session verification server-side always goes through `supabase.auth.getClaims()` — never `getSession()` (not guaranteed to revalidate) and never `getUser()` (slower, no local JWT verification). See `src/server/auth/dal.ts`.
- Route protection is two layers: `src/proxy.ts` → `src/lib/supabase/update-session.ts` (optimistic, every request) and `(app)/layout.tsx`'s `requireUser()` (authoritative). Don't rely on proxy alone for anything sensitive.
- Cookie handling in `@supabase/ssr` is `getAll`/`setAll` only — the `get`/`set`/`remove` trio is deprecated and will be removed upstream. Don't reintroduce it.
- `src/lib/supabase/client.ts` is browser-only, `src/lib/supabase/server.ts` is server-only (creates a **new** client per request — never cache/share one). Never import `server.ts` from a Client Component.
- The service-role/secret key is not used anywhere in this project yet. If a future feature needs it (e.g. admin-only operations), it's server-only and must never get a `NEXT_PUBLIC_` prefix.
- `getPostAuthRedirectPath()` (`src/server/auth/get-post-auth-redirect.ts`) is the one seam for "where does a signed-in user go" — route new logic through it rather than hardcoding redirect targets elsewhere.

