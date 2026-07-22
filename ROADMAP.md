# HelmOS Roadmap

High-level phases for building HelmOS into a production SaaS application. This is a living document — update it as scope and priorities evolve.

## Phase 0 — Foundation ✅

- Project structure and conventions established (`src/components`, `src/features`, `src/lib`, `src/server`, `src/config`, `src/types`, `src/styles`)
- `CONTRIBUTING.md`, `.env.example`, and `CLAUDE.md` development guidelines in place
- Application shell: responsive layout, sidebar, header, workspace switcher, command palette, theming

## Phase 1 — Authentication & Authorization (current)

- ✅ Provider chosen: Supabase Auth (`@supabase/ssr`, cookie-based sessions, `getClaims()` for server-side verification)
- ✅ Welcome page, sign up, sign in, sign out, forgot/reset password, email verification
- ✅ Route protection: `proxy.ts` (optimistic) + `(app)/layout.tsx`'s `requireUser()` (authoritative)
- ✅ `profiles` table + RLS (see `supabase/migrations/0001_profiles.sql`)
- ⬜ Full role-based authorization (see the data model below — schema is designed for it, not yet built)

### Data model — identity, session, profile (built), workspace/membership/role (designed, not yet built)

Per-concept separation, so multi-user/multi-workspace access can be added without touching auth code:

| Concept | Storage | Status |
|---|---|---|
| User identity | Supabase's `auth.users` (managed entirely by Supabase Auth) | Built |
| Auth session | Signed JWT in HttpOnly cookies, refreshed by `proxy.ts` | Built |
| User profile | `public.profiles` (1:1 with `auth.users`: name, avatar) | Built |
| Workspace | `public.workspaces` (id, slug, name, description, icon, `is_shared`) | **Designed, not built** |
| Workspace membership | `public.workspace_memberships` (user × workspace × role, unique per pair) | **Designed, not built** |
| Workspace role | `role` column on membership (`owner` / `admin` / `member`) now; promotable to a dedicated `roles`/`permissions` join table once real per-action authorization is needed | **Designed, not built** |

This is what lets a family actually work the way it's meant to: each person gets their own account and their own private `personal` workspace, and separately gets a `workspace_memberships` row for `family-business` with whatever role fits (`owner` for one parent, `admin` for another, `member` for a sibling) — without personal data ever being visible across accounts. RLS on `workspaces`/`workspace_memberships` will mirror the `profiles` pattern (`auth.uid()` scoping) once those tables exist.

`getPostAuthRedirectPath()` (`src/server/auth/get-post-auth-redirect.ts`) is the single seam Phase 2 hooks into: today it hardcodes `/personal/dashboard`; once `workspace_memberships` exists, its body becomes a real lookup (last-used workspace, or a workspace-selection screen if there's more than one) — every caller (sign-in, sign-up, the callback route, proxy, the root page) stays unchanged.

## Phase 2 — Core Data Model & Dashboard Shell

- ✅ Persistence layer chosen: Supabase Postgres, accessed via `src/lib/supabase` (no separate ORM)
- Core domain entities
- Dashboard shell layout and navigation (application shell itself is done — Phase 0; this is the per-workspace dashboard content)

## Phase 3 — Billing / Subscriptions

- Payment provider integration
- Plan/subscription data model
- Usage limits and upgrade/downgrade flows

## Phase 4 — Multi-Tenancy & Workspace Management

- Build `workspaces` and `workspace_memberships` (schema designed in Phase 1's data model above) + matching RLS policies
- Replace `getPostAuthRedirectPath()`'s hardcoded path with a real membership lookup
- Workspace-selection screen ("Welcome back. Where would you like to begin?") for users with more than one workspace
- Workspace switching, member/role management, invitations
- Per-workspace configuration

## Phase 5 — Observability, Scale & Hardening

- Logging, tracing, and error monitoring
- Performance budgets and caching strategy (`cacheComponents`, `revalidateTag`/`updateTag`)
- Security review, rate limiting, and load testing
