import ChemotherapyRegimen from "../../Config/ChemotherapyRegimen";
import JSONImporter from "./JSONImporter";
import StrictJSONImporter from "./StrictJSONImporter";

export default class JSONChemotherapyRegimenImporter implements JSONImporter<ChemotherapyRegimen> {
  import(value: any): ChemotherapyRegimen {
      const imported: Record<any, any> = StrictJSONImporter.importObject(value);

      return {
        id: StrictJSONImporter.importNumber(imported.id),
        regimenName: StrictJSONImporter.importString(imported.regimenName)
      };
  }
}