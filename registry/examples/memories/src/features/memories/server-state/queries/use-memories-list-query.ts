"use client";

import { useQuery } from "@tanstack/react-query";

import type {
  QueryHookInput,
  QueryOptionsData,
} from "@/server-state/types";
import { mergeQueryOptions } from "@/server-state/utils";

import type { MemoryListQueryInput } from "../types";
import { memoriesQueries } from "./options";

type MemoriesListQueryOptions = ReturnType<typeof memoriesQueries.list>;

type UseMemoriesListQueryInput<TData> = QueryHookInput<
  MemoryListQueryInput,
  MemoriesListQueryOptions,
  TData
>;

export function useMemoriesListQuery<
  TData = QueryOptionsData<MemoriesListQueryOptions>,
>({
  queryOptions,
  ...input
}: UseMemoriesListQueryInput<TData> = {}) {
  return useQuery(
    mergeQueryOptions<MemoriesListQueryOptions, TData>({
      baseOptions: memoriesQueries.list(input),
      queryOptions,
    }),
  );
}
