import {
  resourceCacheInvalidationNames,
  resourceCacheRemovalNames,
  resourceCacheWriteNames,
  resourceOperationNames,
} from "@/server-state/names";

export const memoriesQueryScope = "memories";

export const memoriesOperationNames = {
  ...resourceOperationNames,
  related: "related",
  stream: "stream",
} as const;

export const memoriesCacheActionNames = {
  setDetail: resourceCacheWriteNames.setDetail,
  patchDetail: resourceCacheWriteNames.patchDetail,
  invalidateLists: resourceCacheInvalidationNames.invalidateLists,
  removeDetail: resourceCacheRemovalNames.removeDetail,
  invalidateRelated: "invalidateRelated",
} as const;
