import { useProfile } from "@/hook/useProfile";
import { IUserForm } from "@/types/auth.types";
import React from "react";
import type { UseFormReset } from "react-hook-form";

export function useInitialData(reset: UseFormReset<IUserForm>) {
  const { data, isSuccess } = useProfile();

  React.useEffect(() => {
    if (isSuccess && data) {
      reset({
        email: data.user.email,
        name: data.user.name,
        breakInterval: data.user.breakInterval,
        intervalCount: data.user.intervalCount,
        workInterval: data.user.workInterval,
      });
    }
  }, [isSuccess]);
}
