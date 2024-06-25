import {
  CalendarRange,
  KanbanSquare,
  LayoutDashboard,
  Settings,
  Timer,
} from "lucide-react";
import { IMenuItem } from "./menu.interface";
import { DASHBOARD_PAGES } from "@/config/pages-url.config";

export const MENU: IMenuItem[] = [
  {
    link: DASHBOARD_PAGES.HOME,
    name: "Dashboard",
    incon: LayoutDashboard,
  },
  {
    link: DASHBOARD_PAGES.TASKS,
    name: "Tasks",
    incon: KanbanSquare,
  },
  {
    link: DASHBOARD_PAGES.TIMER,
    name: "Pomodoro",
    incon: Timer,
  },
  {
    link: DASHBOARD_PAGES.TIME_BLOCKING,
    name: "Time blocking",
    incon: CalendarRange,
  },
  {
    link: DASHBOARD_PAGES.SETTINGS,
    name: "Settings",
    incon: Settings,
  },
];
