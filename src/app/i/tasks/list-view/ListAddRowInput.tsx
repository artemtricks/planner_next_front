import { ITaskResponse } from "@/types/task.types";
import React, { Dispatch, SetStateAction } from "react";
import styles from "./ListRow.module.scss";

interface IListRowAddInput {
  filterDate?: string;
  setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>;
}

export const ListAddRowInput = ({ filterDate, setItems }: IListRowAddInput) => {
  const addRow = () => {
    //@ts-ignore
    setItems((prev) => {
      if (!prev) return;

      return [
        ...prev,
        {
          id: "",
          isComplited: false,
          name: "",
          createdAt: filterDate,
        },
      ];
    });
  };

  return (
    <div className={styles.addRow}>
      <button className="italic opacity-40 text-sm" onClick={addRow}>
        Add task...
      </button>
    </div>
  );
};
