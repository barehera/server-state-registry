---
name: manage-react-server-state
description: Create, extend, refactor, or audit type-safe React server-state features built with TanStack Query, Query Key Factory, Zod, and an Axios or fetch transport. Use when a user asks to add a backend feature or endpoint, create query keys/options/hooks or mutations, implement cache synchronization, pagination, authentication-aware queries, streaming responses, or align existing remote-state code with the shared server-state architecture.
---

# Manage React Server State

Build backend-specific features from verified contracts while preserving one project-wide architecture.

## Required workflow

1. Read repository instructions and inspect the existing transport, authentication, aliases, dependencies, server-state files, and neighboring features.
2. Classify the task as `create feature`, `add endpoint`, `refactor`, or `audit`.
3. Derive the backend contract from code or user-provided documentation. Ask only for contract details that remain unresolved and would materially change the implementation. Never invent routes, payload fields, pagination fields, error envelopes, or authentication requirements.
4. Read the relevant references before editing:
   - Always read [architecture.md](references/architecture.md) and [naming.md](references/naming.md).
   - Read [backend-contracts.md](references/backend-contracts.md) for schemas, API functions, errors, pagination, or streams.
   - Read [queries.md](references/queries.md) for keys, options, hooks, authentication, or query overrides.
   - Read [mutations-cache.md](references/mutations-cache.md) for mutations, optimistic updates, invalidation, cache writes, or removal.
   - Read [workflows.md](references/workflows.md) for the selected task workflow and completion audit.
5. Reuse the project conventions when they already satisfy these rules. Make the smallest coherent change; do not force an unrelated migration into an endpoint task.
6. Keep serialized backend data runtime-validated, return the validated backend shape unchanged, and let TypeScript infer types from schemas where possible.
7. Run the repository's existing formatting, lint, typecheck, and build commands in proportion to the change. Do not add a test framework or create tests unless the user requests them.
8. Report changed files, verified commands, backend assumptions, and any contract information still missing.

## Non-negotiable decisions

- Keep shared infrastructure in `src/server-state` and feature-owned remote state in `features/<feature>/server-state`.
- Do not create barrels. Import descriptive files directly.
- Use object inputs for public APIs, factories, hooks, cache actions, and helpers, even when only one field exists.
- Use `detail` as the only canonical single-resource operation. Do not introduce `byId`, `single`, or `item` aliases.
- Use plural feature namespaces (`memoriesApi`, `memoriesQueries`, `memoriesQueryKeys`, `memoriesCache`) and singular entity/input names (`Memory`, `MemoryDetailInput`).
- Keep one hook per operation. Protected operations call the shared authenticated query hook; do not add public and authenticated versions of the same feature hook.
- Keep `queryKey` and `queryFn` owned by option factories. Consumer overrides may change presentation behavior and `select`, but not backend identity or pagination contracts.
- Centralize names in `names.ts`, defaults and constraints in `constants.ts`, serialized values in `schemas.ts`, orchestration inputs in `types.ts`, and pure helpers in `utils.ts`.
- Keep query-key predicates and normalization helpers out of `queries/keys.ts`.
- Use cache vocabulary `set`, `patch`, `invalidate`, and `remove`. Reserve `delete` for backend mutations.
- Do not reshape frontend and backend models when they are intentionally the same.

Use the memory resource only as a pattern. Replace every schema, route, parameter, cache rule, and capability with the actual feature contract.
