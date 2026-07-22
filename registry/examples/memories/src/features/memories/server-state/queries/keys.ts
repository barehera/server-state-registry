import { createQueryKeys } from "@lukemorales/query-key-factory";

import { memoriesOperationNames, memoriesQueryScope } from "../names";
import type {
  MemoryDetailQueryInput,
  MemoryRelatedContextQueryInput,
  NormalizedMemoryListQueryInput,
} from "../types";

export const memoriesQueryKeys = createQueryKeys(memoriesQueryScope, {
  [memoriesOperationNames.list]: ({
    filters,
  }: NormalizedMemoryListQueryInput) => ({
    queryKey: [{ filters }] as const,
    contextQueries: {
      [memoriesOperationNames.stream]: null,
    },
  }),
  [memoriesOperationNames.infiniteList]: (
    { filters }: NormalizedMemoryListQueryInput,
  ) =>
    [{ filters }] as const,
  [memoriesOperationNames.detail]: ({
    memoryId,
  }: MemoryDetailQueryInput) => ({
    queryKey: [memoryId] as const,
    contextQueries: {
      [memoriesOperationNames.related]: ({
        limit,
      }: MemoryRelatedContextQueryInput) => [{ limit }] as const,
    },
  }),
});
