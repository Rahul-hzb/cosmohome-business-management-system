"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { getSettings, updateSettings } from "@/lib/services/settings.service";

export function useSettings() {
  return useQuery({
    queryKey: ["website-settings"],
    queryFn: getSettings,
    staleTime: 1000 * 60 * 10,
  });
}

export function useUpdateSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSettings,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["website-settings"],
      });

      toast.success("Settings updated successfully.");
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to update settings.",
      );
    },
  });
}
