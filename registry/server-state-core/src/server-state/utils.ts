import axios from "axios";
import type { z } from "zod";

import { apiErrorResponseSchema } from "./schemas";
import type { ApiErrorResponse } from "./schemas";
import type {
  ApiErrorResponseInput,
  ApiRequestErrorOptions,
  InfiniteQueryOptionsSource,
  InfiniteQueryOptionsWithData,
  MergeInfiniteQueryOptionsInput,
  MergeQueryOptionsInput,
  QueryOptionsWithData,
  QueryOptionsSource,
} from "./types";

export class ApiRequestError extends Error {
  readonly status?: number;
  readonly code: string;
  readonly reason?: string;
  readonly details?: unknown;

  constructor({
    message,
    code,
    status,
    reason,
    details,
    cause,
  }: ApiRequestErrorOptions) {
    super(message, { cause });
    this.name = "ApiRequestError";
    this.status = status;
    this.code = code;
    this.reason = reason;
    this.details = details;
  }
}

export function normalizeApiError(error: unknown): ApiRequestError {
  if (error instanceof ApiRequestError) {
    return error;
  }

  if (axios.isAxiosError(error)) {
    const result = apiErrorResponseSchema.safeParse(error.response?.data);
    const payload = result.success ? result.data.error : undefined;

    return new ApiRequestError({
      message: payload?.message ?? error.message ?? "Request failed",
      code: payload?.code ?? "request_failed",
      status: error.response?.status,
      reason: payload?.reason,
      details: payload?.details,
      cause: error,
    });
  }

  return new ApiRequestError({
    message: error instanceof Error ? error.message : "Unknown request error",
    code: "unknown_error",
    cause: error,
  });
}

export function parseApiPayload<TOutput>(
  schema: z.ZodType<TOutput>,
  value: unknown,
): TOutput {
  const result = schema.safeParse(value);

  if (!result.success) {
    throw new ApiRequestError({
      message: "Server response did not match the expected schema",
      code: "invalid_response",
      details: result.error.issues,
      cause: result.error,
    });
  }

  return result.data;
}

export function mergeQueryOptions<
  TOptions extends QueryOptionsSource,
  TData,
>({
  baseOptions,
  queryOptions,
}: MergeQueryOptionsInput<TOptions, TData>) {
  return {
    ...baseOptions,
    ...queryOptions,
  } as QueryOptionsWithData<TOptions, TData>;
}

export function mergeInfiniteQueryOptions<
  TOptions extends InfiniteQueryOptionsSource,
  TData,
>({
  baseOptions,
  queryOptions,
}: MergeInfiniteQueryOptionsInput<TOptions, TData>) {
  return {
    ...baseOptions,
    ...queryOptions,
  } as InfiniteQueryOptionsWithData<TOptions, TData>;
}

function parseJsonLine(line: string): unknown {
  try {
    return JSON.parse(line) as unknown;
  } catch (cause) {
    throw new ApiRequestError({
      message: "Server stream contained malformed JSON",
      code: "invalid_stream_response",
      details: { line },
      cause,
    });
  }
}

export async function* parseNdjsonStream<TData>(
  response: Response,
  parse: (value: unknown) => TData,
): AsyncGenerator<TData> {
  if (!response.body) {
    throw new ApiRequestError({
      message: "Streaming response has no body",
      code: "missing_stream_body",
    });
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  try {
    while (true) {
      const { done, value } = await reader.read();
      buffer += decoder.decode(value, { stream: !done });
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";

      for (const line of lines) {
        if (line.trim()) {
          yield parse(parseJsonLine(line));
        }
      }

      if (done) break;
    }

    if (buffer.trim()) {
      yield parse(parseJsonLine(buffer));
    }
  } finally {
    reader.releaseLock();
  }
}

export function errorResponse({
  status,
  code,
  message,
  details,
}: ApiErrorResponseInput) {
  return Response.json(
    {
      error: {
        code,
        message,
        ...(details === undefined ? {} : { details }),
      },
    } satisfies ApiErrorResponse,
    { status },
  );
}
