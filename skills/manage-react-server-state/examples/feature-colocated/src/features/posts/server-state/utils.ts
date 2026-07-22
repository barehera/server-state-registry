import type { QueryKey } from "@tanstack/react-query";

import {
  postsQueryConstraints,
  postsQueryDefaults,
} from "./constants";
import { postsOperationNames, postsQueryScope } from "./names";
import type {
  NormalizedPostFilters,
  NormalizePostFiltersInput,
  NormalizePostRelatedLimitInput,
} from "./types";

export function normalizePostFilters({
  filters = {},
  defaultLimit = postsQueryDefaults.infiniteList.limit,
}: NormalizePostFiltersInput = {}): NormalizedPostFilters {
  const search = filters.search?.trim();
  const requestedLimit = Math.trunc(filters.limit ?? defaultLimit);

  return {
    search: search || undefined,
    limit: Math.min(
      Math.max(requestedLimit, postsQueryConstraints.minimumLimit),
      postsQueryConstraints.maximumListLimit,
    ),
  };
}

export function normalizePostRelatedLimit({
  limit = postsQueryDefaults.related.limit,
}: NormalizePostRelatedLimitInput = {}) {
  return Math.min(
    Math.max(Math.trunc(limit), postsQueryConstraints.minimumLimit),
    postsQueryConstraints.maximumRelatedLimit,
  );
}

export function isPostsRelatedQueryKey(queryKey: QueryKey) {
  const [scope, operation, postId, contextOperation] = queryKey;

  return (
    scope === postsQueryScope &&
    operation === postsOperationNames.detail &&
    typeof postId === "string" &&
    contextOperation === postsOperationNames.related
  );
}
