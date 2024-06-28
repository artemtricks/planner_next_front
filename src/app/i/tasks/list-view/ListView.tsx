import React from "react";
import { useTasks } from "../hook/useTasks";
import { DragDropContext } from "@hello-pangea/dnd";
import styles from "./ListRow.module.scss";
import { useTaskDnd } from "../hook/useTaskDnd";
import { COLUMNS } from "../columns.data";
import { ListRowParent } from "./ListRowParent";

export function ListView() {
  const { items, setItems } = useTasks();
  const { onDragEnd } = useTaskDnd();

  const emptyItems = !!items && items.length > 0 ? items : [];

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={styles.table}>
        <div className={styles.header}>
          <div>Task name</div>
          <div>Due date</div>
          <div>Priority</div>
          <div></div>
        </div>
        <div className={styles.parentsWrapper}>
          {COLUMNS.map((col) => (
            <ListRowParent
              items={emptyItems}
              label={col.label}
              value={col.value}
              setItems={setItems}
              key={col.value}
            />
          ))}
        </div>
      </div>
    </DragDropContext>
  );
}
