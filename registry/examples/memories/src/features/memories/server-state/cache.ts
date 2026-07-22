import { memoriesCacheActionNames } from "./names";
import { memoriesQueryKeys } from "./queries/keys";
import type { Memory } from "./schemas";
import type {
  MemoriesCacheInput,
  MemoryCacheDetailInput,
  MemoryCachePatchDetailInput,
  MemoryCacheSetDetailInput,
} from "./types";
import { isMemoriesRelatedQueryKey } from "./utils";

export const memoriesCache = {
  [memoriesCacheActionNames.invalidateLists]({
    queryClient,
  }: MemoriesCacheInput) {
    return Promise.all([
      queryClient.invalidateQueries({
        queryKey: memoriesQueryKeys.list._def,
      }),
      queryClient.invalidateQueries({
        queryKey: memoriesQueryKeys.infiniteList._def,
      }),
    ]);
  },

  [memoriesCacheActionNames.invalidateRelated]({
    queryClient,
  }: MemoriesCacheInput) {
    return queryClient.invalidateQueries({
      predicate: ({ queryKey }) => isMemoriesRelatedQueryKey(queryKey),
    });
  },

  [memoriesCacheActionNames.setDetail]({
    queryClient,
    memory,
  }: MemoryCacheSetDetailInput) {
    queryClient.setQueryData<Memory>(
      memoriesQueryKeys.detail({ memoryId: memory.id }).queryKey,
      memory,
    );
  },

  [memoriesCacheActionNames.patchDetail]({
    queryClient,
    memoryId,
    patch,
  }: MemoryCachePatchDetailInput) {
    queryClient.setQueryData<Memory>(
      memoriesQueryKeys.detail({ memoryId }).queryKey,
      (current) => (current ? { ...current, ...patch } : current),
    );
  },

  [memoriesCacheActionNames.removeDetail]({
    queryClient,
    memoryId,
  }: MemoryCacheDetailInput) {
    queryClient.removeQueries({
      queryKey: memoriesQueryKeys.detail({ memoryId }).queryKey,
    });
  },
} as const;
