import { taskService } from "@/services/task.service";
import { TypeTaskFormState } from "@/types/task.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateTask() {
  const queryClient = useQueryClient();

  const { mutate: updateTasks } = useMutation({
    mutationKey: ["update task"],
    mutationFn: ({ id, data }: { id: string; data: TypeTaskFormState }) =>
      taskService.updateTasks(id, data),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  return { updateTasks };
}
