import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Loader from "@/components/Loader";

import { TimeBlock } from "./TimeBlock";
import styles from "./TimeBlocking.module.scss";
import { calcLeftTime } from "./calc-left-time";
import { useTimeBlockDnd } from "./hooks/useTimeBlockDnd";
import { useTimeBlocks } from "./hooks/useTimeBlocks";

export function TimeBlockingList() {
  const { items, setItems, isLoading } = useTimeBlocks();
  const { handleDragEnd, sensor } = useTimeBlockDnd(items, setItems);

  if (isLoading) return <Loader />;

  const { hoursLeft } = calcLeftTime(items);

  return (
    <div>
      <DndContext
        sensors={sensor}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className={styles.list}>
          <SortableContext
            items={items || []}
            strategy={verticalListSortingStrategy}
          >
            {items?.length ? (
              items?.map((item) => <TimeBlock key={item.id} item={item} />)
            ) : (
              <div>Add the first time-block on the right form</div>
            )}
          </SortableContext>
        </div>
      </DndContext>
      <div>
        {hoursLeft > 0
          ? `${hoursLeft} hours out of 24 left for sleep`
          : "No hours left for sleep"}
      </div>
    </div>
  );
}
