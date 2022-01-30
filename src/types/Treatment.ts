import { Fields } from "./Field";
import { Option, Options } from "./Options";

export interface TreatmentTypes extends Options {
  options: { [key: string]: TreatmentType }
}

export interface TreatmentType extends Option {
  detailFields: Fields
}