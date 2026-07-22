"use client";

import { useQuery } from "@tanstack/react-query";
import type {
  QueryHookInput,
  QueryOptionsData,
} from "@/server-state/types";
import { mergeQueryOptions } from "@/server-state/utils";

import type { PostRelatedQueryInput } from "../types";
import { postsQueries } from "./options";

type PostRelatedQueryOptions = ReturnType<typeof postsQueries.related>;

type UsePostRelatedQueryInput<TData> = QueryHookInput<
  PostRelatedQueryInput,
  PostRelatedQueryOptions,
  TData
>;

export function usePostRelatedQuery<
  TData = QueryOptionsData<PostRelatedQueryOptions>,
>({ queryOptions, ...input }: UsePostRelatedQueryInput<TData>) {
  return useQuery(
    mergeQueryOptions<PostRelatedQueryOptions, TData>({
      baseOptions: postsQueries.related(input),
      queryOptions,
    }),
  );
}
