"use client";

import { useQuery } from "@tanstack/react-query";

import type {
  QueryHookInput,
  QueryOptionsData,
} from "@/server-state/types";
import { mergeQueryOptions } from "@/server-state/utils";

import type { MemoryDetailQueryInput } from "../types";
import { memoriesQueries } from "./options";

type MemoryDetailQueryOptions = ReturnType<typeof memoriesQueries.detail>;

type UseMemoryDetailQueryInput<TData> = QueryHookInput<
  MemoryDetailQueryInput,
  MemoryDetailQueryOptions,
  TData
>;

export function useMemoryDetailQuery<
  TData = QueryOptionsData<MemoryDetailQueryOptions>,
>({
  queryOptions,
  ...input
}: UseMemoryDetailQueryInput<TData>) {
  return useQuery(
    mergeQueryOptions<MemoryDetailQueryOptions, TData>({
      baseOptions: memoriesQueries.detail(input),
      queryOptions,
    }),
  );
}
