"use client";

import { useQuery } from "@tanstack/react-query";

import type {
  QueryHookInput,
  QueryOptionsData,
} from "@/server-state/types";
import { mergeQueryOptions } from "@/server-state/utils";

import type { MemoryListQueryInput } from "../types";
import { memoriesQueries } from "./options";

type MemoriesStreamQueryOptions = ReturnType<typeof memoriesQueries.stream>;

type UseMemoriesStreamQueryInput<TData> = QueryHookInput<
  MemoryListQueryInput,
  MemoriesStreamQueryOptions,
  TData
>;

export function useMemoriesStreamQuery<
  TData = QueryOptionsData<MemoriesStreamQueryOptions>,
>({
  queryOptions,
  ...input
}: UseMemoriesStreamQueryInput<TData> = {}) {
  return useQuery(
    mergeQueryOptions<MemoriesStreamQueryOptions, TData>({
      baseOptions: memoriesQueries.stream(input),
      queryOptions,
    }),
  );
}
