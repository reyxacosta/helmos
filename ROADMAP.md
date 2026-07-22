# HelmOS Roadmap

High-level phases for building HelmOS into a production SaaS application. This is a living document — update it as scope and priorities evolve.

## Phase 0 — Foundation (current)

- Project structure and conventions established (`src/components`, `src/features`, `src/lib`, `src/server`, `src/config`, `src/types`, `src/styles`)
- `CONTRIBUTING.md`, `.env.example`, and `CLAUDE.md` development guidelines in place
- No application code yet — this phase is scaffolding only

## Phase 1 — Authentication & Authorization

- Choose an auth strategy (session-based vs. token-based) and provider
- User/session data model
- Sign in / sign up / sign out flows
- Route protection via `proxy.ts` and/or per-Server-Function checks

## Phase 2 — Core Data Model & Dashboard Shell

- Choose persistence layer (ORM + database) and wire up `src/server/db`
- Core domain entities
- Dashboard shell layout and navigation

## Phase 3 — Billing / Subscriptions

- Payment provider integration
- Plan/subscription data model
- Usage limits and upgrade/downgrade flows

## Phase 4 — Multi-Tenancy & Workspace Management

- Tenant/workspace data model and isolation strategy
- Workspace switching and member/role management
- Per-tenant configuration

## Phase 5 — Observability, Scale & Hardening

- Logging, tracing, and error monitoring
- Performance budgets and caching strategy (`cacheComponents`, `revalidateTag`/`updateTag`)
- Security review, rate limiting, and load testing
