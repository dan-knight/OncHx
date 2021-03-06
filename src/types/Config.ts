import CancerType from "./DB/Config/CancerType";
import ChemotherapyRegimen from "./DB/Config/ChemotherapyRegimen";
import TreatmentLocation from "./DB/Config/TreatmentLocation";
import TreatmentType from "./DB/Config/TreatmentType";

export default interface Config {
  treatmentTypes: TreatmentType[],
  cancerTypes: CancerType[],
  treatmentLocations: TreatmentLocation[],
  chemotherapyRegimens: ChemotherapyRegimen[]
}