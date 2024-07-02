import { taskService } from "@/services/task.service";
import { timeBlockService } from "@/services/time-block.service";
import { TimeBlockFormState } from "@/types/time-block.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateTimeBlock() {
  const queryClient = useQueryClient();

  const { mutate: createTimeBlock, isPending } = useMutation({
    mutationKey: ["create time-block"],
    mutationFn: (data: TimeBlockFormState) =>
      timeBlockService.createTimeBlock(data),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["time-blocks"] });
    },
  });

  return { createTimeBlock, isPending };
}
