import { Option, Options } from "./Options";

export interface TreatmentType extends Option {
  detailFields: { [key: string]: Options | Option }
}