"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { memoriesApi } from "../api";
import { memoriesCache } from "../cache";
import type { MemoryCreateInput } from "../types";

export function useCreateMemoryMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: MemoryCreateInput) =>
      (await memoriesApi.create(input)).data,
    onSuccess: (createdMemory) => {
      memoriesCache.setDetail({ queryClient, memory: createdMemory });
      return Promise.all([
        memoriesCache.invalidateLists({ queryClient }),
        memoriesCache.invalidateRelated({ queryClient }),
      ]);
    },
  });
}
