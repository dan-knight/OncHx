import { Option, Options } from "./Options";

export interface Fields {
  [key: string]: Field
}

export type Field = SelectField | Option;

export interface SelectField extends Options { 
  filter: boolean
}