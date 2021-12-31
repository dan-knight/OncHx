import { TreatmentType } from "./Treatment";

export interface GlobalValues {
  treatmentTypes: { [key: string]: TreatmentType }
}