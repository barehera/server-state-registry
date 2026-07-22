# Naming

## Canonical shared vocabulary

```ts
export const resourceQueryNames = {
  list: "list",
  infiniteList: "infiniteList",
  detail: "detail",
} as const;

export const resourceMutationNames = {
  create: "create",
  update: "update",
  delete: "delete",
} as const;
```

Extend this vocabulary only for real feature capabilities such as `related`, `comments`, `preferences`, or `stream`. Do not create aliases for the shared operations.

## Namespace and entity rules

For a `Memory` entity in the `memories` feature:

| Concern | Name |
| --- | --- |
| Scope | `memoriesQueryScope` |
| Feature operations | `memoriesOperationNames` |
| API namespace | `memoriesApi` |
| Query keys | `memoriesQueryKeys` |
| Query options | `memoriesQueries` |
| Cache namespace | `memoriesCache` |
| List hook | `useMemoriesListQuery` |
| Infinite hook | `useMemoriesInfiniteListQuery` |
| Detail hook | `useMemoryDetailQuery` |
| Create mutation | `useCreateMemoryMutation` |
| Detail input | `MemoryDetailInput` or `MemoryDetailQueryInput` |

Use the plural feature name for namespace objects and collection hooks. Use the singular entity name for data, one-resource hooks, and operation inputs.

## Inputs and local results

- Accept one object input: `detail({ memoryId })`, never `detail(memoryId)`.
- Use `Input`, not `Props`, for non-component operations.
- Include the operation in input names: `MemoryRelatedQueryInput`, `MemoryUpdateInput`.
- Mirror hook names at call sites after removing only `use`:

```ts
const memoriesListQuery = useMemoriesListQuery({ filters });
const memoryDetailQuery = useMemoryDetailQuery({ memoryId });
const createMemoryMutation = useCreateMemoryMutation();
```

## Cache verbs

- `setDetail`: write a complete value.
- `patchDetail`: merge partial data into an existing value.
- `invalidateDetail`, `invalidateLists`, `invalidateAll`: mark cached data stale.
- `removeDetail`, `removeLists`, `removeAll`: remove cached entries.
- `delete`: call the backend deletion endpoint only.

Do not use `evict` or cache `delete` aliases.
