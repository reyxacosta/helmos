# components

Shared, presentational UI components used across multiple routes or features. Nothing here should contain business logic or data-fetching — that belongs in `src/server/` or `src/features/`.

- `ui/` — low-level design-system primitives (buttons, inputs, dialogs, etc.), typically the base layer other components compose.

Route- or feature-specific components should stay colocated with the feature that owns them (see `src/features/`), not here.
