import {
  experimental_streamedQuery as streamedQuery,
  infiniteQueryOptions,
  queryOptions,
} from "@tanstack/react-query";

import { serverStateDefaults } from "@/server-state/constants";

import { memoriesApi } from "../api";
import { memoriesQueryDefaults } from "../constants";
import { memoriesOperationNames } from "../names";
import type { MemoryPageParam } from "../schemas";
import type {
  MemoryDetailQueryInput,
  MemoryListQueryInput,
  MemoryRelatedQueryInput,
} from "../types";
import {
  normalizeMemoryFilters,
  normalizeMemoryRelatedLimit,
} from "../utils";
import { memoriesQueryKeys } from "./keys";

export const memoriesQueries = {
  [memoriesOperationNames.list]: ({
    filters = {},
  }: MemoryListQueryInput = {}) => {
    const normalizedFilters = normalizeMemoryFilters({
      filters,
      defaultLimit: memoriesQueryDefaults.list.limit,
    });

    return queryOptions({
      queryKey: memoriesQueryKeys.list({ filters: normalizedFilters }).queryKey,
      queryFn: async ({ signal }) => {
        const response = await memoriesApi.list({
          filters: normalizedFilters,
          signal,
        });
        return response.data;
      },
      staleTime: serverStateDefaults.queryStaleTimeMs,
    });
  },

  [memoriesOperationNames.infiniteList]: (
    { filters = {} }: MemoryListQueryInput = {},
  ) => {
    const normalizedFilters = normalizeMemoryFilters({
      filters,
      defaultLimit: memoriesQueryDefaults.infiniteList.limit,
    });

    return infiniteQueryOptions({
      queryKey: memoriesQueryKeys.infiniteList({
        filters: normalizedFilters,
      }).queryKey,
      queryFn: ({ pageParam, signal }) =>
        memoriesApi.list({
          filters: normalizedFilters,
          pageParam,
          signal,
        }),
      initialPageParam: null as MemoryPageParam,
      getNextPageParam: (lastPage) => lastPage.meta.nextCursor ?? undefined,
      staleTime: serverStateDefaults.queryStaleTimeMs,
    });
  },

  [memoriesOperationNames.detail]: ({
    memoryId,
  }: MemoryDetailQueryInput) =>
    queryOptions({
      queryKey: memoriesQueryKeys.detail({ memoryId }).queryKey,
      queryFn: async ({ signal }) => {
        const response = await memoriesApi.detail({ memoryId, signal });
        return response.data;
      },
      staleTime: serverStateDefaults.queryStaleTimeMs,
    }),

  [memoriesOperationNames.related]: ({
    memoryId,
    limit,
  }: MemoryRelatedQueryInput) => {
    const normalizedLimit = normalizeMemoryRelatedLimit({ limit });

    return queryOptions({
      queryKey: memoriesQueryKeys
        .detail({ memoryId })
        ._ctx.related({ limit: normalizedLimit }).queryKey,
      queryFn: async ({ signal }) => {
        const response = await memoriesApi.related({
          memoryId,
          limit: normalizedLimit,
          signal,
        });
        return response.data;
      },
      staleTime: serverStateDefaults.queryStaleTimeMs,
    });
  },

  [memoriesOperationNames.stream]: ({
    filters = {},
  }: MemoryListQueryInput = {}) => {
    const normalizedFilters = normalizeMemoryFilters({
      filters,
      defaultLimit: memoriesQueryDefaults.infiniteList.limit,
    });

    return queryOptions({
      queryKey:
        memoriesQueryKeys.list({ filters: normalizedFilters })._ctx.stream
          .queryKey,
      queryFn: streamedQuery({
        streamFn: ({ signal }) =>
          memoriesApi.stream({ filters: normalizedFilters, signal }),
        refetchMode: "replace",
      }),
      staleTime: serverStateDefaults.queryStaleTimeMs,
    });
  },
} as const;
