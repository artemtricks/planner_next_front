import { ITaskResponse } from "@/types/task.types";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { Dispatch, SetStateAction } from "react";
import styles from "./ListRow.module.scss";
import { filterTasks } from "../filter-task";
import { ListRow } from "./ListRow";
import { FILTERS } from "../columns.data";
import { ListAddRowInput } from "./ListAddRowInput";

interface IListRowParent {
  setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>;
  items: ITaskResponse[];
  value: string;
  label: string;
}

export function ListRowParent({
  items,
  label,
  setItems,
  value,
}: IListRowParent) {
  return (
    <Droppable droppableId={value}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          <div className={styles.colHeading}>
            <div className="w-full">{label}</div>
          </div>
          {filterTasks(items, value)?.map((item, index) => (
            <Draggable key={item.id} draggableId={item.id} index={index}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <ListRow item={item} setItems={setItems} key={item.id} />
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
          {value !== "сompleted" && !items.some((item) => !item.id) && (
            <ListAddRowInput
              setItems={setItems}
              filterDate={FILTERS[value] ? FILTERS[value].format() : undefined}
            />
          )}
        </div>
      )}
    </Droppable>
  );
}
