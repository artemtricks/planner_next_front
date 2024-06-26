import React from "react";
import { taskService } from "@/services/task.service";
import { TypeTaskFormState } from "@/types/task.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteTask() {
  const queryClient = useQueryClient();

  const { mutate: deleteTask, isPending: isDeletePending } = useMutation({
    mutationKey: ["delete task"],
    mutationFn: (id: string) => taskService.deleteTasks(id),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  return { deleteTask, isDeletePending };
}
