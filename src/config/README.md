# config

Typed application configuration and environment-variable validation. This is the single entry point that reads `process.env` and exposes a validated, typed config object — application code should import from here rather than reading `process.env` directly, so missing/invalid env vars fail fast at startup instead of at the point of use.

See `.env.example` for the current set of expected variables.
