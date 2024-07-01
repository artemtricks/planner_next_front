"use client";

import { DragDropContext } from "@hello-pangea/dnd";

import { COLUMNS } from "../columns.data";
import { useTaskDnd } from "../hook/useTaskDnd";
import { useTasks } from "../hook/useTasks";

import { KanbanColumn } from "./KanbanColumn";
import styles from "./KanbanCard.module.scss";

export function KanbanView() {
  const { items, setItems } = useTasks();
  const { onDragEnd } = useTaskDnd();

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={styles.board}>
        {COLUMNS.map((column) => (
          <KanbanColumn
            key={column.value}
            value={column.value}
            label={column.label}
            items={items}
            setItems={setItems}
          />
        ))}
      </div>
    </DragDropContext>
  );
}
