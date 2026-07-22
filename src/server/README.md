# server

Server-only code, kept out of `src/app/` so business logic stays separate from routing. Nothing in this tree should be imported from a Client Component.

- `db/` — database client and schema, added once a persistence layer is chosen (Phase 2, see `ROADMAP.md`).
- `actions/` — shared Server Action helpers (`"use server"`), used by forms and mutations across features.
- `services/` — domain/business-logic services callable from route handlers, Server Actions, and Server Components. This is where cross-feature business rules live, rather than in `app/` route files.
