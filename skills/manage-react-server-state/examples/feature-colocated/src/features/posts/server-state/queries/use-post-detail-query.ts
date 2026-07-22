"use client";

import { useQuery } from "@tanstack/react-query";

import type {
  QueryHookInput,
  QueryOptionsData,
} from "@/server-state/types";
import { mergeQueryOptions } from "@/server-state/utils";

import type { PostDetailQueryInput } from "../types";
import { postsQueries } from "./options";

type PostDetailQueryOptions = ReturnType<typeof postsQueries.detail>;

type UsePostDetailQueryInput<TData> = QueryHookInput<
  PostDetailQueryInput,
  PostDetailQueryOptions,
  TData
>;

export function usePostDetailQuery<
  TData = QueryOptionsData<PostDetailQueryOptions>,
>({ queryOptions, ...input }: UsePostDetailQueryInput<TData>) {
  return useQuery(
    mergeQueryOptions<PostDetailQueryOptions, TData>({
      baseOptions: postsQueries.detail(input),
      queryOptions,
    }),
  );
}
