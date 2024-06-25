import { FILTERS } from "../columns.data";
import { useUpdateTask } from "./useUpdateTask";
import { DropResult } from "@hello-pangea/dnd";

export function useTaskDnd() {
  const { updateTasks } = useUpdateTask();

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const destinationColumnId = result.destination.droppableId;
    if (destinationColumnId === result.source.droppableId) return;

    if (destinationColumnId === "complited") {
      updateTasks({
        id: result.draggableId,
        data: {
          isComplited: true,
        },
      });
      return;
    }

    const newCreatedAt = FILTERS[destinationColumnId].format();
    updateTasks({
      id: result.draggableId,
      data: {
        createdAt: newCreatedAt,
        isComplited: false,
      },
    });
  };

  return { onDragEnd };
}
