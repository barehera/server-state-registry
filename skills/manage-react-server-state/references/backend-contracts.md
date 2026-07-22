# Backend contracts

## Contract intake

Resolve these values from existing code, API documentation, generated types, or the user before implementation:

- HTTP method and exact route
- path, query, header, and body parameters
- success payload and status behavior
- error payload
- authentication requirement
- list and pagination envelope fields
- nullable and optional fields
- date/string formats
- streaming protocol and event shape
- cache effects after mutations

Do not make the frontend define a supposedly universal backend envelope. Shared response builders belong to the project and must match that backend.

## Zod and TypeScript

- Use Zod at serialized trust boundaries: HTTP responses, persisted external data, route input, and stream events.
- Infer application data types from schemas with `z.infer`, request inputs with `z.input` when transforms make that distinction useful.
- Use TypeScript interfaces/types for orchestration values such as filters, `AbortSignal`, query inputs, and cache action inputs.
- Existing generated backend types may remain the source of truth when the project already trusts and maintains them. Do not add duplicate Zod schemas merely for ceremony; record that runtime validation is absent.

Zod object schemas accept additive unknown response keys under the default object policy and return the declared shape. A backend adding an unrelated key should not break parsing. Missing required fields or incompatible changes must fail with a normalized invalid-response error.

## API functions

Keep a flat typed namespace unless the backend truly exposes a nested child-resource service. Use computed canonical operation names where applicable.

```ts
export const memoriesApi = {
  async [memoriesOperationNames.detail]({
    memoryId,
    signal,
  }: MemoryDetailInput) {
    const response = await api.get<unknown>(
      memoriesRoutes.detail(memoryId),
      { signal },
    );

    return parseApiPayload(memoryDetailResponseSchema, response.data);
  },
} as const;
```

- Use `<unknown>` for untrusted responses when runtime parsing establishes the type.
- Do not add a redundant explicit Promise return type when parsing already infers it accurately.
- Return the validated backend response unchanged. Let query options select `response.data` only when the hook intentionally exposes the envelope's data field.
- Encode route identifiers with `encodeURIComponent`.
- Forward query cancellation through `signal`.
- Normalize filters only when it creates a stable key/request representation, trims optional text, applies centralized defaults, or enforces backend constraints. Do not normalize ritualistically.

## Pagination

Treat pagination as backend-owned:

- Parse the backend page envelope exactly.
- Type the real page parameter (`string`, number, nullable cursor, offset object, etc.).
- Keep `initialPageParam` and `getNextPageParam` in the infinite query option factory.
- Return the backend page unchanged; do not reshape it into a generic frontend page.

## Streaming

Match the actual transport: NDJSON, SSE, WebSocket, or chunked text. Parse each serialized event through its schema. Give streams a context key under the collection when they represent a live form of that collection. Do not pretend all streaming protocols use the same helper.
