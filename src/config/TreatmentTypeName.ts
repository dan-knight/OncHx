import { TypeIndex } from "./TypeIndex";

export type TreatmentTypeName = 'chemotherapy' | 'radiation' | 'surgery';

export const TreatmentTypeNameIndex: TypeIndex<TreatmentTypeName> = {
  0: 'chemotherapy',
  1: 'radiation',
  2: 'surgery'
}