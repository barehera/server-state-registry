# Queries

## Cache identity

Use the project's existing key strategy. Query Key Factory is a good option when installed, but typed key functions or another consistent factory are valid. Every value that changes the result must appear in a serializable, stable key.

Keep finite and infinite variants distinct because their cached data shapes differ. Normalize equivalent inputs before key construction. Parent/child context keys are useful for real ownership such as a post detail with related posts; do not add nesting only to make the key look structured.

Keep query-key predicates next to pure key utilities, not mixed into a key declaration file when the project separates those responsibilities.

## Option factories and hooks

For a new architecture, prefer option factories to own `queryKey`, `queryFn`, pagination, and shared policy. Add thin feature hooks when they provide a stable component API, auth composition, typed overrides, or repeated behavior.

If the project consistently consumes option factories directly and needs no hook-specific behavior, preserve that convention. Do not create wrapper hooks solely to satisfy the reference layout.

Typed consumer overrides may control presentation and lifecycle behavior such as `enabled`, `select`, placeholder data, and refetch policy. Do not allow them to replace cache identity, backend execution, or infinite-pagination rules accidentally.

## Authentication

Use the project's real authentication source. Centralize auth gating once when multiple protected queries need it. Combine authentication with consumer conditions:

```ts
enabled: isAuthenticated && (options.enabled ?? true)
```

For TanStack Query, use `skipToken` or another mechanism that also prevents an imperative refetch from calling the protected function while unauthenticated. Frontend gating only avoids unnecessary calls; backend authorization remains required.

Expose one hook per operation with the correct policy. Do not create public and authenticated aliases for an endpoint that is always protected.

## Selection and server shape

Transport functions should normally return parsed backend responses unchanged. Query options may select the part exposed to components, such as `response.data`, when that is an intentional project API. Keep infinite pages intact unless a selector explicitly derives a view.
