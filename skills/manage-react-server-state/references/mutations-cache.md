# Mutations and cache

## Mutation hooks

Create one named hook per mutation file. The hook owns `useMutation`, obtains `QueryClient`, calls the feature API namespace, and delegates reusable cache behavior to the feature cache namespace.

```ts
export function useUpdateMemoryMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: MemoryUpdateInput) =>
      (await memoriesApi.update(input)).data,
    onSuccess: (updatedMemory) => {
      memoriesCache.setDetail({ queryClient, memory: updatedMemory });
      return memoriesCache.invalidateLists({ queryClient });
    },
  });
}
```

Use the actual backend result and mutation variables. Do not create broad invalidation by habit; synchronize only affected caches.

## Cache namespace

Keep cache mechanics in `cache.ts`:

- `setDetail` accepts the complete entity returned by the backend.
- `patchDetail` accepts partial data and updates only an existing cached entity unless the contract provides enough data to seed one safely.
- `invalidateLists` invalidates finite and infinite collection roots.
- Context invalidation uses a typed key predicate from `utils.ts` when no direct factory root represents all matching contexts.
- `removeDetail` removes a cache entry after successful backend deletion.

Cache actions accept object inputs containing `queryClient` and required values. Build keys through the query-key factory; never recreate key arrays manually.

## Optimistic updates

Use an optimistic update only when the interaction benefits materially and rollback semantics are clear:

1. Cancel affected queries.
2. Snapshot the exact cached data.
3. Apply the optimistic write through a cache action or a tightly scoped updater.
4. Restore the snapshot on error, including valid falsy/empty snapshots.
5. Reconcile with invalidation or the server response on settlement.

Do not copy a single optimistic-list recipe across paginated, infinite, filtered, and detail caches. Their shapes and affected key sets differ.

## Error behavior

Prefer project-wide mutation error handling when it exists. Add feature-specific messages or reporting only when the operation needs different behavior. Do not bake a vendor logger, translation library, or toast library into the reusable architecture.
