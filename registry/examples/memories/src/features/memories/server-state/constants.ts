import { memoriesOperationNames } from "./names";

export const memoriesQueryDefaults = {
  [memoriesOperationNames.list]: {
    limit: 50,
  },
  [memoriesOperationNames.infiniteList]: {
    limit: 4,
  },
  [memoriesOperationNames.related]: {
    limit: 3,
  },
} as const;

export const memoriesQueryConstraints = {
  minimumLimit: 1,
  minimumPageParam: 0,
  maximumListLimit: 50,
  maximumRelatedLimit: 10,
} as const;
