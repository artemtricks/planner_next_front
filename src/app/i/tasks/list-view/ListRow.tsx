import { ITaskResponse, TypeTaskFormState } from "@/types/task.types";
import { Dispatch, SetStateAction } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTaskDebounce } from "../hook/useTaskDebounce";
import cn from "clsx";
import styles from "./ListRow.module.scss";
import { GripVertical, Trash, Loader } from "lucide-react";
import Checkbox from "@/components/ui/checkbox";
import { TransparentField } from "@/components/ui/fields/TransparentField";
import { DatePicker } from "@/components/ui/task-edit/date-picker/DataPicker";
import { SingleSelect } from "@/components/ui/SingleSelect";

import { useDeleteTask } from "../hook/useDeleteTask";

interface IListRow {
  setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>;
  item: ITaskResponse;
}

export function ListRow({ item, setItems }: IListRow) {
  const { register, control, watch } = useForm<TypeTaskFormState>({
    defaultValues: {
      name: item.name,
      isComplited: item.isComplited,
      createdAt: item.createdAt,
      priority: item.priority,
    },
  });

  useTaskDebounce({ itemId: item.id, watch });

  const { deleteTask, isDeletePending } = useDeleteTask();

  return (
    <div
      className={cn(
        styles.row,
        watch("isComplited") ? styles.completed : "",
        "animation-opacity"
      )}
    >
      <div>
        <span className="inline-flex w-full gap-2.5 items-center">
          <button aria-describedby="todo-item">
            <GripVertical className={styles.grip} />
          </button>
          <Controller
            control={control}
            name="isComplited"
            render={({ field: { value, onChange } }) => (
              <Checkbox checked={value} onChange={onChange} />
            )}
          />
          <TransparentField {...register("name")} />
        </span>
      </div>
      <div>
        <Controller
          control={control}
          name="createdAt"
          render={({ field: { value, onChange } }) => (
            <DatePicker value={value || ""} onChange={onChange} />
          )}
        />
      </div>
      <div className="capitalize">
        <Controller
          control={control}
          name="priority"
          render={({ field: { value, onChange } }) => (
            <SingleSelect
              value={value || ""}
              onChange={onChange}
              data={["high", "medium", "low"].map((item) => ({
                value: item,
                label: item,
              }))}
            />
          )}
        />
      </div>
      <div>
        <button
          onClick={() =>
            item.id
              ? deleteTask(item.id)
              : setItems((prev) => prev?.slice(0, 1))
          }
          className="opacity-50 transition-opacity hover:opacity-100"
        >
          {isDeletePending ? <Loader size={15} /> : <Trash size={15} />}
        </button>
      </div>
    </div>
  );
}
