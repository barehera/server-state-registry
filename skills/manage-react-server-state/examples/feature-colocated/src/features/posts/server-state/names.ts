import {
  resourceCacheInvalidationNames,
  resourceCacheRemovalNames,
  resourceCacheWriteNames,
  resourceOperationNames,
} from "@/server-state/names";

export const postsQueryScope = "posts";

export const postsOperationNames = {
  ...resourceOperationNames,
  related: "related",
} as const;

export const postsCacheActionNames = {
  setDetail: resourceCacheWriteNames.setDetail,
  patchDetail: resourceCacheWriteNames.patchDetail,
  invalidateLists: resourceCacheInvalidationNames.invalidateLists,
  removeDetail: resourceCacheRemovalNames.removeDetail,
  invalidateRelated: "invalidateRelated",
} as const;
