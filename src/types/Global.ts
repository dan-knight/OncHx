import { DBIndexFunc } from "../hooks/useDBIndex";
import Config from "./Config";

import CancerType from "./DB/Config/CancerType";
import ChemotherapyRegimen from "./DB/Config/ChemotherapyRegimen";
import TreatmentLocation from "./DB/Config/TreatmentLocation";
import TreatmentType from "./DB/Config/TreatmentType";
import Patient from "./Patient/Patient";

export interface GlobalValues {
  config: Config,
  treatmentTypeIndex: DBIndexFunc<TreatmentType>
  cancerTypeIndex: DBIndexFunc<CancerType>,
  chemotherapyRegimenIndex: DBIndexFunc<ChemotherapyRegimen>,
  treatmentLocationIndex: DBIndexFunc<TreatmentLocation>,
  user: number | undefined,
  login: (value: number | undefined) => void,
  patients: Patient[]
}