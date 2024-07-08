import { timeBlockService } from "@/services/time-block.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteTimeBlock(itemId: string) {
  const queryClient = useQueryClient();

  const { mutate: deleteTimeBlock, isPending: isPendingDelete } = useMutation({
    mutationKey: ["delete time-blocks", itemId],
    mutationFn: () => timeBlockService.deleteTimeBlock(itemId),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["time-blocks"] });
    },
  });

  return { deleteTimeBlock, isPendingDelete };
}
