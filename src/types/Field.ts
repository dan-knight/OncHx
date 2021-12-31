import { Option, Options } from "./Options";

export interface Fields {
  [key: string]: Field
}

export type Field = Options | Option;