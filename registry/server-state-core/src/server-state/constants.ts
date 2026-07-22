export const serverStateDefaults = {
  requestTimeoutMs: 10_000,
  queryStaleTimeMs: 60_000,
  queryRetryCount: 1,
  mutationRetryCount: 0,
} as const;
