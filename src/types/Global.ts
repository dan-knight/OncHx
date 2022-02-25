import { DBIndexFunc } from "../hooks/useDBIndex";
import Config from "./Config";

import CancerType from "./DB/Config/CancerType";
import TreatmentType from "./DB/Config/TreatmentType";

export interface GlobalValues {
  config: Config,
  treatmentTypeIndex: DBIndexFunc<TreatmentType>
  cancerTypeIndex: DBIndexFunc<CancerType>
}