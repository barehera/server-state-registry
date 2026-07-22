# Workflows

## Create feature

1. Inspect one neighboring feature and shared `src/server-state` primitives.
2. Confirm the feature's singular/plural names and backend contract.
3. Create `names.ts`, `schemas.ts`, and `types.ts` first.
4. Add centralized defaults/constraints only when the feature needs them.
5. Implement `api.ts` with runtime parsing and object inputs.
6. Implement query keys, then query options, then one hook per read.
7. Implement `cache.ts` from actual mutation effects.
8. Implement one mutation hook per write.
9. Add `utils.ts` only for real pure helpers.
10. Validate names, dependency direction, types, lint, and build.

## Add endpoint

1. Inspect the feature's existing vocabulary and key hierarchy.
2. Confirm the new endpoint contract and whether it is a root or context operation.
3. Extend schemas/types and the feature operation names if this is a new capability.
4. Add the API operation.
5. Add or extend the key and option factory for reads; add a mutation hook and cache effects for writes.
6. Add exactly one feature hook for a new read operation.
7. Run targeted validation and ensure existing public names did not drift.

## Refactor feature

1. Inventory current public imports and component call sites.
2. Identify concrete violations instead of replacing the entire feature automatically.
3. Establish canonical names and ownership boundaries.
4. Migrate schemas/types, API, keys/options, hooks, and cache in dependency order.
5. Update call sites and remove obsolete aliases only after usage is migrated.
6. Preserve backend behavior; do not combine a structural refactor with an invented contract change.

## Audit

Report findings with file and line evidence. Check:

- `detail` is the only single-resource operation alias.
- Namespace plurality and hook/result naming are consistent.
- No barrel exports exist.
- Public operations accept object inputs.
- Routes and response envelopes match the backend.
- Serialized responses are validated or an intentional generated-type trust decision is documented.
- API functions return parsed backend shapes without unnecessary mapping.
- Keys contain all discriminating normalized inputs.
- Key predicates live in `utils.ts`.
- Option factories own query functions and cache policy.
- Hooks support typed overrides without exposing key/query function replacement.
- Authentication is composed once and uses `skipToken` for protected requests.
- Pagination remains backend-shaped.
- Cache operations use `set`, `patch`, `invalidate`, and `remove` precisely.
- Defaults and constraints contain no unexplained duplicates.
- Lint, typecheck, and build pass.

For a requested audit, do not implement fixes unless the user also authorizes changes.
