"use client";

import { useQuery } from "@tanstack/react-query";

import type {
  QueryHookInput,
  QueryOptionsData,
} from "@/server-state/types";
import { mergeQueryOptions } from "@/server-state/utils";

import type { PostListQueryInput } from "../types";
import { postsQueries } from "./options";

type PostsListQueryOptions = ReturnType<typeof postsQueries.list>;

type UsePostsListQueryInput<TData> = QueryHookInput<
  PostListQueryInput,
  PostsListQueryOptions,
  TData
>;

export function usePostsListQuery<
  TData = QueryOptionsData<PostsListQueryOptions>,
>({ queryOptions, ...input }: UsePostsListQueryInput<TData> = {}) {
  return useQuery(
    mergeQueryOptions<PostsListQueryOptions, TData>({
      baseOptions: postsQueries.list(input),
      queryOptions,
    }),
  );
}
