"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { memoriesApi } from "../api";
import { memoriesCache } from "../cache";

export function useDeleteMemoryMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: memoriesApi.delete,
    onSuccess: (_, { memoryId }) => {
      memoriesCache.removeDetail({ queryClient, memoryId });
      return Promise.all([
        memoriesCache.invalidateLists({ queryClient }),
        memoriesCache.invalidateRelated({ queryClient }),
      ]);
    },
  });
}
