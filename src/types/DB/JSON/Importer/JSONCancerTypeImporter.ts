import CancerType from "../../Config/CancerType";
import JSONImporter from "./JSONImporter";
import StrictJSONImporter from "./StrictJSONImporter";

export default class JSONCancerTypeImporter implements JSONImporter<CancerType> {
  import(value: any): CancerType {
      const imported: Record<any, any> = StrictJSONImporter.importObject(value);

      return {
        id: StrictJSONImporter.importNumber(imported.id),
        cancerName: StrictJSONImporter.importString(imported.cancerName)
      };
  }
}