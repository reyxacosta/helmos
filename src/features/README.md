# features

Self-contained, feature-sliced domain modules (e.g. `billing/`, `workspace/`, `notifications/`). Each feature folder owns its own components, hooks, and client-side logic for that domain, and depends on `src/server/` for data access rather than reaching into another feature's internals.

Empty for now — populated as each domain from `ROADMAP.md` is built.
