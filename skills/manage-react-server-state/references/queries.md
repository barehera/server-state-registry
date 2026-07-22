# Queries

## Query-key hierarchy

Define key functions directly inside `createQueryKeys`. Use context queries for child reads that belong to a parent cache identity.

```ts
export const memoriesQueryKeys = createQueryKeys(memoriesQueryScope, {
  [memoriesOperationNames.list]: ({ filters }) => ({
    queryKey: [{ filters }] as const,
    contextQueries: {
      [memoriesOperationNames.stream]: null,
    },
  }),
  [memoriesOperationNames.infiniteList]: ({ filters }) =>
    [{ filters }] as const,
  [memoriesOperationNames.detail]: ({ memoryId }) => ({
    queryKey: [memoryId] as const,
    contextQueries: {
      [memoriesOperationNames.related]: ({ limit }) =>
        [{ limit }] as const,
    },
  }),
});
```

- Include every value that changes the result in the key.
- Normalize filters before building the key so equivalent requests share cache identity.
- Do not place key predicate utilities in `keys.ts`; put them in the feature `utils.ts`.
- Keep list and infinite-list roots distinct because their cached data shapes differ.

## Option factories

Export one plural namespace such as `memoriesQueries`. Build keys from the key factory and calls from the API namespace.

- Use `queryOptions` for finite reads.
- Use `infiniteQueryOptions` for pagination.
- Keep stale time and shared query policy in the option factory.
- Keep `queryKey` and `queryFn` protected from consumer overrides.
- Keep `initialPageParam` and `getNextPageParam` protected for infinite queries.

## Hooks and overrides

Provide one feature hook for every operation even when components could call option factories directly. Hooks preserve a stable component API and hold project-specific behavior without duplication.

```ts
export function useMemoryDetailQuery<
  TData = QueryOptionsData<MemoryDetailQueryOptions>,
>({ queryOptions, ...input }: UseMemoryDetailQueryInput<TData>) {
  return useQuery(
    mergeQueryOptions<MemoryDetailQueryOptions, TData>({
      baseOptions: memoriesQueries.detail(input),
      queryOptions,
    }),
  );
}
```

Typed overrides must preserve type-changing `select` inference. Consumer options may control presentation and lifecycle behavior such as `enabled`, `select`, refetch policy, or placeholder data. They may not replace `queryKey` or `queryFn`.

## Authentication

Connect the project's real auth hook once in a shared integration file. Protected feature hooks call `useAuthenticatedQuery` or `useAuthenticatedInfiniteQuery`; public hooks call TanStack directly.

```ts
const authenticatedQueries = createAuthenticatedQueryHooks({
  useAuthentication() {
    const { user } = useAuth();
    return { isAuthenticated: Boolean(user) };
  },
});

export const useAuthenticatedQuery =
  authenticatedQueries.useAuthenticatedQuery;
export const useAuthenticatedInfiniteQuery =
  authenticatedQueries.useAuthenticatedInfiniteQuery;
```

The authenticated wrapper must combine auth state with the consumer's condition:

```ts
enabled: isAuthenticated && (options.enabled ?? true)
```

It must also replace `queryFn` with TanStack Query's `skipToken` while logged out. This blocks automatic requests and prevents manual refetch from executing the protected backend function. Backend authorization remains mandatory.

Do not export both `useMemoryRelatedQuery` and `useAuthenticatedMemoryRelatedQuery`. Choose the correct policy inside the single feature hook.
