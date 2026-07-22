"use client";

import { useAuthenticatedQuery } from "@/features/auth/hooks/use-authenticated-query";
import type { QueryHookInput, QueryOptionsData } from "@/server-state/types";
import { mergeQueryOptions } from "@/server-state/utils";

import type { MemoryRelatedQueryInput } from "../types";
import { memoriesQueries } from "./options";

type MemoryRelatedQueryOptions = ReturnType<
  typeof memoriesQueries.related
>;

type MemoryRelatedQueryData = QueryOptionsData<
  MemoryRelatedQueryOptions
>;

type UseMemoryRelatedQueryInput<TData> = QueryHookInput<
  MemoryRelatedQueryInput,
  MemoryRelatedQueryOptions,
  TData
>;

export function useMemoryRelatedQuery<
  TData = MemoryRelatedQueryData,
>({
  queryOptions,
  ...input
}: UseMemoryRelatedQueryInput<TData>) {
  return useAuthenticatedQuery(
    mergeQueryOptions<MemoryRelatedQueryOptions, TData>({
      baseOptions: memoriesQueries.related(input),
      queryOptions,
    }),
  );
}
