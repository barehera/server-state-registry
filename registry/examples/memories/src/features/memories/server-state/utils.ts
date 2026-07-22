import type { QueryKey } from "@tanstack/react-query";

import {
  memoriesQueryConstraints,
  memoriesQueryDefaults,
} from "./constants";
import { memoriesOperationNames, memoriesQueryScope } from "./names";
import type {
  NormalizedMemoryFilters,
  NormalizeMemoryFiltersInput,
  NormalizeMemoryRelatedLimitInput,
  ParseOptionalIntegerInput,
} from "./types";

export function parseOptionalInteger({
  value,
}: ParseOptionalIntegerInput) {
  const parsed = Number.parseInt(value ?? "", 10);
  return Number.isFinite(parsed) ? parsed : undefined;
}

export function normalizeMemoryFilters({
  filters = {},
  defaultLimit = memoriesQueryDefaults.infiniteList.limit,
}: NormalizeMemoryFiltersInput = {}): NormalizedMemoryFilters {
  const search = filters.search?.trim();
  const requestedLimit = Math.trunc(filters.limit ?? defaultLimit);

  return {
    search: search || undefined,
    limit: Math.min(
      Math.max(requestedLimit, memoriesQueryConstraints.minimumLimit),
      memoriesQueryConstraints.maximumListLimit,
    ),
  };
}

export function normalizeMemoryRelatedLimit({
  limit = memoriesQueryDefaults.related.limit,
}: NormalizeMemoryRelatedLimitInput = {}) {
  return Math.min(
    Math.max(Math.trunc(limit), memoriesQueryConstraints.minimumLimit),
    memoriesQueryConstraints.maximumRelatedLimit,
  );
}

export function isMemoriesRelatedQueryKey(queryKey: QueryKey) {
  const [scope, operation, memoryId, contextOperation] = queryKey;

  return (
    scope === memoriesQueryScope &&
    operation === memoriesOperationNames.detail &&
    typeof memoryId === "string" &&
    contextOperation === memoriesOperationNames.related
  );
}
