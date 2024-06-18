import { IBase } from "./root.types";

export interface IPomodoroRoundResponse extends IBase {
  isComplited: boolean;
  totalSeconds: number;
}

export interface IPomodoroSessionResponse extends IBase {
  isComplited?: boolean;
  rounds: IPomodoroRoundResponse[];
}

export type TypePomodoroRoundState = Partial<
  Omit<IPomodoroRoundResponse, "id" | "updatedAt" | "createAt">
>;

export type TypePomodoroSessionState = Partial<
  Omit<IPomodoroSessionResponse, "id" | "updatedAt" | "createAt">
>;
