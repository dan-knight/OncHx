import TreatmentType from "../../Config/TreatmentType";
import JSONImporter from "./JSONImporter";
import StrictJSONImporter from "./StrictJSONImporter";

export default class JSONTreatmentTypeImporter implements JSONImporter<TreatmentType> {
  import(value: any): TreatmentType {
    const imported: Record<any, any> = StrictJSONImporter.importObject(value);

    return {
      id: StrictJSONImporter.importNumber(imported.id),
      treatmentName: StrictJSONImporter.importString(imported.treatmentName)
    };
  }
}