import { IBase } from "./root.types";

export interface ITimeBlockResponse extends IBase {
  name: string;
  color?: string;
  duration: string;
  order: string;
}

export type TimeBlockFormState = Partial<
  Omit<ITimeBlockResponse, "createdAt" | "updatedAt">
>;
