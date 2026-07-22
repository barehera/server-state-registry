import { api } from "@/server-state/api";
import {
  ApiRequestError,
  parseApiPayload,
  parseNdjsonStream,
} from "@/server-state/utils";

import {
  memoryDetailResponseSchema,
  memoryListResponseSchema,
  memoryRelatedResponseSchema,
  memorySchema,
} from "./schemas";
import { memoriesOperationNames } from "./names";
import type {
  MemoryCreateInput,
  MemoryDeleteInput,
  MemoryDetailInput,
  MemoryListInput,
  MemoryRelatedInput,
  MemoryStreamInput,
  MemoryUpdateInput,
} from "./types";
import {
  normalizeMemoryFilters,
  normalizeMemoryRelatedLimit,
} from "./utils";

const memoriesRoutes = {
  collection: "/memories",
  stream: "/memories/stream",
  detail: (memoryId: string) =>
    `/memories/${encodeURIComponent(memoryId)}`,
  related: (memoryId: string) =>
    `/memories/${encodeURIComponent(memoryId)}/related`,
} as const;

export const memoriesApi = {
  async [memoriesOperationNames.list]({
    filters,
    pageParam,
    signal,
  }: MemoryListInput = {}) {
    const response = await api.get<unknown>(memoriesRoutes.collection, {
      params: {
        ...normalizeMemoryFilters({ filters }),
        cursor: pageParam ?? undefined,
      },
      signal,
    });
    return parseApiPayload(memoryListResponseSchema, response.data);
  },

  async [memoriesOperationNames.detail]({
    memoryId,
    signal,
  }: MemoryDetailInput) {
    const response = await api.get<unknown>(
      memoriesRoutes.detail(memoryId),
      {
        signal,
      },
    );
    return parseApiPayload(memoryDetailResponseSchema, response.data);
  },

  async [memoriesOperationNames.related]({
    memoryId,
    limit,
    signal,
  }: MemoryRelatedInput) {
    const normalizedLimit = normalizeMemoryRelatedLimit({ limit });
    const response = await api.get<unknown>(memoriesRoutes.related(memoryId), {
      params: { limit: normalizedLimit },
      signal,
    });
    return parseApiPayload(memoryRelatedResponseSchema, response.data);
  },

  async [memoriesOperationNames.stream]({
    filters,
    signal,
  }: MemoryStreamInput = {}) {
    const normalizedFilters = normalizeMemoryFilters({ filters });
    const searchParams = new URLSearchParams();

    searchParams.set("limit", String(normalizedFilters.limit));
    if (normalizedFilters.search) {
      searchParams.set("search", normalizedFilters.search);
    }

    const response = await fetch(
      `/api${memoriesRoutes.stream}?${searchParams.toString()}`,
      {
        headers: { Accept: "application/x-ndjson" },
        signal,
      },
    );

    if (!response.ok) {
      throw new ApiRequestError({
        message: `Stream request failed with status ${response.status}`,
        code: "stream_request_failed",
        status: response.status,
      });
    }

    return parseNdjsonStream(response, (value) =>
      parseApiPayload(memorySchema, value),
    );
  },

  async [memoriesOperationNames.create](input: MemoryCreateInput) {
    const response = await api.post<unknown>(memoriesRoutes.collection, input);
    return parseApiPayload(memoryDetailResponseSchema, response.data);
  },

  async [memoriesOperationNames.update]({
    memoryId,
    memory,
  }: MemoryUpdateInput) {
    const response = await api.patch<unknown>(
      memoriesRoutes.detail(memoryId),
      { memory },
    );
    return parseApiPayload(memoryDetailResponseSchema, response.data);
  },

  async [memoriesOperationNames.delete]({
    memoryId,
  }: MemoryDeleteInput) {
    await api.delete(memoriesRoutes.detail(memoryId));
  },
} as const;
