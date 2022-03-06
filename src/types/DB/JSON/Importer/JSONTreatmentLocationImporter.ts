import TreatmentLocation from "../../Config/TreatmentLocation";
import JSONImporter from "./JSONImporter";
import StrictJSONImporter from "./StrictJSONImporter";

export default class JSONTreatmentLocationImporter implements JSONImporter<TreatmentLocation> {
  import(value: any): TreatmentLocation {
    const imported: Record<any, any> = StrictJSONImporter.importObject(value);

    return {
      id: StrictJSONImporter.importNumber(imported.id),
      locationName: StrictJSONImporter.importString(imported.locationName)
    };
  }
}