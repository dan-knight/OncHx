import LocalStoragePatientEvent from "../LocalStoragePatientEvent";
import DetailValuesFactory from "../Details/DetailValuesFactory";
import DBPatientEvent from "../DBPatientEvent";

import { strictlyParseInt } from "../../../utility/parseNumber";
import StrictJSONImporter from "../../DB/JSON/Importer/StrictJSONImporter";

export default class LocalStoragePatientEventImporter {
  static createDBEvent(localStorage: LocalStoragePatientEvent, eventID: number): DBPatientEvent {
    if (typeof localStorage.details !== 'object') {
      throw new Error('Invalid event details');
    }

    const treatmentType: number = strictlyParseInt(localStorage.treatmentType);

    return new DBPatientEvent(
      eventID,
      StrictJSONImporter.importNumber(localStorage.patient),
      DetailValuesFactory.createDetails(treatmentType, localStorage.details),
      localStorage.date,
      treatmentType,
      strictlyParseInt(localStorage.cancerType),
      localStorage.institution
    );
  }
}