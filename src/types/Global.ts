import CancerType from "./DB/Config/CancerType";
import ChemotherapyRegimen from "./DB/Config/ChemotherapyRegimen";
import TreatmentLocation from "./DB/Config/TreatmentLocation";
import TreatmentType from "./DB/Config/TreatmentType";

export interface GlobalValues {
  treatmentTypes: TreatmentType[],
  cancerTypes: CancerType[],
  treatmentLocations: TreatmentLocation[],
  chemotherapyRegimens: ChemotherapyRegimen[]
}