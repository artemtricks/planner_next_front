import React from "react";
import { useCreateTask } from "./useCreateTask";
import { useUpdateTask } from "./useUpdateTask";
import debounce from "lodash.debounce";
import { TypeTaskFormState } from "@/types/task.types";
import { UseFormWatch } from "react-hook-form";

interface IUseTaskDebonce {
  watch: UseFormWatch<TypeTaskFormState>;
  itemId: string;
}

export function useTaskDebounce({ itemId, watch }: IUseTaskDebonce) {
  const { createTask } = useCreateTask();
  const { updateTasks } = useUpdateTask();

  const debounceCreateTask = React.useCallback(
    debounce((formData: TypeTaskFormState) => {
      createTask(formData);
    }, 2000),
    []
  );

  const debounceUpdateTask = React.useCallback(
    debounce((formData: TypeTaskFormState) => {
      updateTasks({ id: itemId, data: formData });
    }, 2000),
    []
  );

  React.useEffect(() => {
    const { unsubscribe } = watch((formData) => {
      if (itemId) {
        debounceUpdateTask({
          ...formData,
          priority: formData.priority || undefined,
        });
      } else {
        debounceCreateTask(formData);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [debounceCreateTask, debounceUpdateTask, watch()]);
}
