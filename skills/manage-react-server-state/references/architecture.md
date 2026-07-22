# Architecture

## Ownership

```text
src/
|-- features/<feature>/
|   `-- server-state/
|       |-- api.ts
|       |-- cache.ts
|       |-- constants.ts
|       |-- names.ts
|       |-- schemas.ts
|       |-- types.ts
|       |-- utils.ts
|       |-- queries/
|       |   |-- keys.ts
|       |   |-- options.ts
|       |   `-- use-<operation>-query.ts
|       `-- mutations/
|           `-- use-<operation>-mutation.ts
`-- server-state/
    |-- api.ts
    |-- constants.ts
    |-- names.ts
    |-- schemas.ts
    |-- types.ts
    `-- utils.ts
```

- Put third-party SDK integrations in `src/lib`; do not put the project API/query architecture there.
- Put backend-only application modules in `features/<feature>/server`, separate from React server-state hooks.
- Keep a flat file while one responsibility is cohesive. Create `queries/` and `mutations/` because they contain multiple operation files; do not split every shared file into a folder prematurely.
- Keep one named export file per query or mutation hook. Do not add hook barrels or feature barrels.

## Dependency direction

```text
schemas/types/names/constants
            |
            v
        api + keys
            |
            v
         options
            |
            v
          hooks

keys + schemas/types ---> cache <--- mutation hooks
```

- API functions do not import React Query.
- Query keys do not import API functions or option factories.
- Cache actions depend on keys and data types, not query option factories or API functions.
- Components consume hooks and never call feature API functions directly for ordinary server state.

## File responsibilities

- `api.ts`: routes, transport calls, request serialization, response parsing.
- `cache.ts`: reusable cache writes, patches, invalidation, and removal.
- `constants.ts`: feature defaults, limits, timing, and policy values. No repeated magic values.
- `names.ts`: the single vocabulary for operations, scopes, and cache actions.
- `schemas.ts`: Zod schemas for serialized external data and types inferred from them.
- `types.ts`: filters, hook/API inputs, `AbortSignal`, cache action inputs, and other orchestration types.
- `utils.ts`: pure normalization, parsing, and query-key predicate helpers that genuinely exist.
- `queries/keys.ts`: query-key hierarchy only.
- `queries/options.ts`: `queryOptions`, `infiniteQueryOptions`, and streaming query factories.

Do not create an adapter or frontend/backend model mapping unless the actual models differ or the user requests it.
