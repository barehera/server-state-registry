import type { QueryClient } from "@tanstack/react-query";

import type {
  Memory,
  MemoryCreateRequest,
  MemoryPageParam,
  MemoryUpdateRequest,
} from "./schemas";

export interface MemoryFilters {
  search?: string;
  limit?: number;
}

export interface NormalizedMemoryFilters {
  search?: string;
  limit: number;
}

export interface NormalizeMemoryFiltersInput {
  filters?: MemoryFilters;
  defaultLimit?: number;
}

export interface NormalizeMemoryRelatedLimitInput {
  limit?: number;
}

export interface ParseOptionalIntegerInput {
  value: string | null;
}

export interface MemoryListQueryInput {
  filters?: MemoryFilters;
}

export interface NormalizedMemoryListQueryInput {
  filters: NormalizedMemoryFilters;
}

export interface MemoryDetailQueryInput {
  memoryId: string;
}

export interface MemoryRelatedQueryInput extends MemoryDetailQueryInput {
  limit?: number;
}

export interface MemoryRelatedContextQueryInput {
  limit: number;
}

export interface MemoriesCacheInput {
  queryClient: QueryClient;
}

export interface MemoryCacheDetailInput extends MemoriesCacheInput {
  memoryId: string;
}

export interface MemoryCacheSetDetailInput extends MemoriesCacheInput {
  memory: Memory;
}

export interface MemoryCachePatchDetailInput
  extends MemoryCacheDetailInput {
  patch: Partial<Omit<Memory, "id">>;
}

export type MemoryCreateInput = MemoryCreateRequest;

export interface MemoryUpdateInput extends MemoryUpdateRequest {
  memoryId: string;
}

export interface MemoryListInput extends MemoryListQueryInput {
  pageParam?: MemoryPageParam;
  signal?: AbortSignal;
}

export interface MemoryDetailInput extends MemoryDetailQueryInput {
  signal?: AbortSignal;
}

export interface MemoryRelatedInput extends MemoryRelatedQueryInput {
  signal?: AbortSignal;
}

export interface MemoryStreamInput extends MemoryListQueryInput {
  signal?: AbortSignal;
}

export interface MemoryDeleteInput {
  memoryId: string;
}
