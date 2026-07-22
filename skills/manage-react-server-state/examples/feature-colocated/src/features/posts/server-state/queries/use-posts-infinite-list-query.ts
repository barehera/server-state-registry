"use client";

import { useInfiniteQuery } from "@tanstack/react-query";

import type {
  InfiniteQueryHookInput,
  InfiniteQueryOptionsData,
} from "@/server-state/types";
import { mergeInfiniteQueryOptions } from "@/server-state/utils";

import type { PostListQueryInput } from "../types";
import { postsQueries } from "./options";

type PostsInfiniteListQueryOptions = ReturnType<
  typeof postsQueries.infiniteList
>;

type UsePostsInfiniteListQueryInput<TData> = InfiniteQueryHookInput<
  PostListQueryInput,
  PostsInfiniteListQueryOptions,
  TData
>;

export function usePostsInfiniteListQuery<
  TData = InfiniteQueryOptionsData<PostsInfiniteListQueryOptions>,
>(
  {
    queryOptions,
    ...input
  }: UsePostsInfiniteListQueryInput<TData> = {},
) {
  return useInfiniteQuery(
    mergeInfiniteQueryOptions<PostsInfiniteListQueryOptions, TData>({
      baseOptions: postsQueries.infiniteList(input),
      queryOptions,
    }),
  );
}
