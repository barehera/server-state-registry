"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { memoriesApi } from "../api";
import { memoriesCache } from "../cache";
import type { MemoryUpdateInput } from "../types";

export function useUpdateMemoryMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: MemoryUpdateInput) =>
      (await memoriesApi.update(input)).data,
    onSuccess: (updatedMemory) => {
      memoriesCache.setDetail({ queryClient, memory: updatedMemory });
      return Promise.all([
        memoriesCache.invalidateLists({ queryClient }),
        memoriesCache.invalidateRelated({ queryClient }),
      ]);
    },
  });
}
