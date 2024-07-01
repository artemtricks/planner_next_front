"use client";

import { useLocalStorag } from "@/hook/useLocalStorag";
import { ListView } from "./list-view/ListView";
import Loader from "@/components/Loader";
import { SwitcherView } from "./SwitcherView";
import { KanbanView } from "./kanban-view/KanbanView";
export type TypeView = "list" | "kanban";

export function TasksView() {
  const [isLoading, setType, type] = useLocalStorag<TypeView>({
    key: "view-type",
    defaultValue: "list",
  });

  if (isLoading) return <Loader />;
  return (
    <div>
      <SwitcherView setType={setType} type={type} />
      {type === "list" ? <ListView /> : <KanbanView />}
    </div>
  );
}
