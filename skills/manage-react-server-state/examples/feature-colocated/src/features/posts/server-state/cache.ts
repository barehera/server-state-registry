import { postsCacheActionNames } from "./names";
import { postsQueryKeys } from "./queries/keys";
import type { Post } from "./schemas";
import type {
  PostCacheDetailInput,
  PostCachePatchDetailInput,
  PostCacheSetDetailInput,
  PostsCacheInput,
} from "./types";
import { isPostsRelatedQueryKey } from "./utils";

export const postsCache = {
  [postsCacheActionNames.invalidateLists]({ queryClient }: PostsCacheInput) {
    return Promise.all([
      queryClient.invalidateQueries({
        queryKey: postsQueryKeys.list._def,
      }),
      queryClient.invalidateQueries({
        queryKey: postsQueryKeys.infiniteList._def,
      }),
    ]);
  },

  [postsCacheActionNames.invalidateRelated]({
    queryClient,
  }: PostsCacheInput) {
    return queryClient.invalidateQueries({
      predicate: ({ queryKey }) => isPostsRelatedQueryKey(queryKey),
    });
  },

  [postsCacheActionNames.setDetail]({
    queryClient,
    post,
  }: PostCacheSetDetailInput) {
    queryClient.setQueryData<Post>(
      postsQueryKeys.detail({ postId: post.id }).queryKey,
      post,
    );
  },

  [postsCacheActionNames.patchDetail]({
    queryClient,
    postId,
    patch,
  }: PostCachePatchDetailInput) {
    queryClient.setQueryData<Post>(
      postsQueryKeys.detail({ postId }).queryKey,
      (current) => (current ? { ...current, ...patch } : current),
    );
  },

  [postsCacheActionNames.removeDetail]({
    queryClient,
    postId,
  }: PostCacheDetailInput) {
    queryClient.removeQueries({
      queryKey: postsQueryKeys.detail({ postId }).queryKey,
    });
  },
} as const;
