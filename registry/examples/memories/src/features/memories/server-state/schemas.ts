import { z } from "zod";

import {
  createApiDataResponseSchema,
  createApiPageResponseSchema,
} from "@/server-state/schemas";

export const memorySchema = z.object({
  id: z.string().min(1),
  memory: z.string(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

export const memoryPageParamSchema = z.number().int().nonnegative().nullable();

export const memoryDetailResponseSchema =
  createApiDataResponseSchema({ dataSchema: memorySchema });

export const memoryRelatedResponseSchema = createApiDataResponseSchema(
  { dataSchema: z.array(memorySchema) },
);

export const memoryListResponseSchema = createApiPageResponseSchema({
  itemSchema: memorySchema,
  pageParamSchema: memoryPageParamSchema,
});

export const memoryCreateRequestSchema = z.object({
  memory: z.string().trim().min(1),
});

export const memoryUpdateRequestSchema = z.object({
  memory: z.string().trim().min(1),
});

export type Memory = z.infer<typeof memorySchema>;
export type MemoryPageParam = z.infer<typeof memoryPageParamSchema>;
export type MemoryDetailResponse = z.infer<
  typeof memoryDetailResponseSchema
>;
export type MemoryRelatedResponse = z.infer<
  typeof memoryRelatedResponseSchema
>;
export type MemoryListResponse = z.infer<typeof memoryListResponseSchema>;
export type MemoryCreateRequest = z.input<typeof memoryCreateRequestSchema>;
export type MemoryUpdateRequest = z.input<typeof memoryUpdateRequestSchema>;
