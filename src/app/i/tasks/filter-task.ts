import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

import type { ITaskResponse } from "@/types/task.types";

import { FILTERS } from "./columns.data";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export const filterTasks = (
  tasks: ITaskResponse[] | undefined,
  value: string
) => {
  switch (value) {
    case "today":
      return tasks?.filter(
        (item) =>
          dayjs(item.createdAt).isSame(FILTERS.today, "day") &&
          !item.isComplited
      );

    case "tomorrow":
      return tasks?.filter(
        (item) =>
          dayjs(item.createdAt).isSame(FILTERS.tomorrow, "day") &&
          !item.isComplited
      );

    case "on-this-week":
      return tasks?.filter(
        (item) =>
          !dayjs(item.createdAt).isSame(FILTERS.today) &&
          !dayjs(item.createdAt).isSame(FILTERS.tomorrow) &&
          dayjs(item.createdAt).isSameOrBefore(FILTERS["on-this-week"]) &&
          !item.isComplited
      );

    case "on-next-week":
      return tasks?.filter(
        (item) =>
          dayjs(item.createdAt).isAfter(FILTERS["on-this-week"]) &&
          dayjs(item.createdAt).isSameOrBefore(FILTERS["on-next-week"]) &&
          !item.isComplited
      );

    case "later":
      return tasks?.filter(
        (item) =>
          (dayjs(item.createdAt).isAfter(FILTERS["on-next-week"]) ||
            !item.createdAt) &&
          !item.isComplited
      );

    case "completed":
      return tasks?.filter((item) => item.isComplited);

    default:
      return [];
  }
};
