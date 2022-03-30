import { GetValueFunc } from "../hooks/useIndexer";
import Config from "./Config";

import CancerType from "./DB/Config/CancerType";
import ChemotherapyRegimen from "./DB/Config/ChemotherapyRegimen";
import TreatmentLocation from "./DB/Config/TreatmentLocation";
import TreatmentType from "./DB/Config/TreatmentType";
import Patient from "./Patient/Patient";

export interface GlobalValues {
  config: Config,
  getTreatmentType: GetValueFunc<TreatmentType>
  getCancerType: GetValueFunc<CancerType>,
  getChemotherapyRegimen: GetValueFunc<ChemotherapyRegimen>,
  getTreatmentLocation: GetValueFunc<TreatmentLocation>,
  user: number | undefined,
  login: (value: number | undefined) => void,
  patients: Patient[]
}