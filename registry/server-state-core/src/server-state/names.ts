export const resourceQueryNames = {
  list: "list",
  infiniteList: "infiniteList",
  detail: "detail",
} as const;

export const resourceMutationNames = {
  create: "create",
  update: "update",
  delete: "delete",
} as const;

export const resourceOperationNames = {
  ...resourceQueryNames,
  ...resourceMutationNames,
} as const;

export const resourceCacheWriteNames = {
  setDetail: "setDetail",
  patchDetail: "patchDetail",
} as const;

export const resourceCacheInvalidationNames = {
  invalidateDetail: "invalidateDetail",
  invalidateLists: "invalidateLists",
  invalidateAll: "invalidateAll",
} as const;

export const resourceCacheRemovalNames = {
  removeDetail: "removeDetail",
  removeLists: "removeLists",
  removeAll: "removeAll",
} as const;

export const resourceCacheActionNames = {
  ...resourceCacheWriteNames,
  ...resourceCacheInvalidationNames,
  ...resourceCacheRemovalNames,
} as const;

export type ResourceQueryName =
  (typeof resourceQueryNames)[keyof typeof resourceQueryNames];
export type ResourceMutationName =
  (typeof resourceMutationNames)[keyof typeof resourceMutationNames];
export type ResourceOperationName =
  (typeof resourceOperationNames)[keyof typeof resourceOperationNames];
export type ResourceCacheActionName =
  (typeof resourceCacheActionNames)[keyof typeof resourceCacheActionNames];
