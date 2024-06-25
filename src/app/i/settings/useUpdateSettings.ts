import { userService } from "@/services/user.service";
import { IUserForm } from "@/types/auth.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useUpdateSettings() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ["update profile"],
    mutationFn: (data: IUserForm) => userService.update(data),
    onSuccess() {
      toast.success("Successfully update profile!");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
  return { mutate, isPending };
}
