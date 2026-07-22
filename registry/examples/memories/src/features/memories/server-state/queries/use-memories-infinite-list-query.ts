"use client";

import { useInfiniteQuery } from "@tanstack/react-query";

import type {
  InfiniteQueryHookInput,
  InfiniteQueryOptionsData,
} from "@/server-state/types";
import { mergeInfiniteQueryOptions } from "@/server-state/utils";

import type { MemoryListQueryInput } from "../types";
import { memoriesQueries } from "./options";

type MemoriesInfiniteListQueryOptions = ReturnType<
  typeof memoriesQueries.infiniteList
>;

type UseMemoriesInfiniteListQueryInput<TData> = InfiniteQueryHookInput<
  MemoryListQueryInput,
  MemoriesInfiniteListQueryOptions,
  TData
>;

export function useMemoriesInfiniteListQuery<
  TData = InfiniteQueryOptionsData<MemoriesInfiniteListQueryOptions>,
>(
  {
    queryOptions,
    ...input
  }: UseMemoriesInfiniteListQueryInput<TData> = {},
) {
  return useInfiniteQuery(
    mergeInfiniteQueryOptions<MemoriesInfiniteListQueryOptions, TData>({
      baseOptions: memoriesQueries.infiniteList(input),
      queryOptions,
    }),
  );
}
