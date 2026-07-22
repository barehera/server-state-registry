import { z } from "zod";

import {
  createApiDataResponseSchema,
  createApiPageResponseSchema,
} from "@/server-state/schemas";

export const postSchema = z.object({
  id: z.string().min(1),
  title: z.string(),
  body: z.string(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

export const postPageParamSchema = z.number().int().nonnegative().nullable();

export const postDetailResponseSchema =
  createApiDataResponseSchema({ dataSchema: postSchema });

export const postRelatedResponseSchema = createApiDataResponseSchema({
  dataSchema: z.array(postSchema),
});

export const postListResponseSchema = createApiPageResponseSchema({
  itemSchema: postSchema,
  pageParamSchema: postPageParamSchema,
});

export const postCreateRequestSchema = z.object({
  title: z.string().trim().min(1),
  body: z.string().trim().min(1),
});

export const postUpdateRequestSchema = postCreateRequestSchema.partial();

export type Post = z.infer<typeof postSchema>;
export type PostPageParam = z.infer<typeof postPageParamSchema>;
export type PostDetailResponse = z.infer<typeof postDetailResponseSchema>;
export type PostRelatedResponse = z.infer<typeof postRelatedResponseSchema>;
export type PostListResponse = z.infer<typeof postListResponseSchema>;
export type PostCreateRequest = z.input<typeof postCreateRequestSchema>;
export type PostUpdateRequest = z.input<typeof postUpdateRequestSchema>;
