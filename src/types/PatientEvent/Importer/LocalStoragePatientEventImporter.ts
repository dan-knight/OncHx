import LocalStoragePatientEvent from "../LocalStoragePatientEvent";
import DetailValuesFactory from "../Details/DetailValuesFactory";
import DBPatientEvent from "../DBPatientEvent";

import { TreatmentTypeNameIndex } from "../../../config/TreatmentTypeName";
import { strictlyParseInt } from "../../../utility/parseNumber";

export default class LocalStoragePatientEventImporter {
  static createDBEvent(localStorage: LocalStoragePatientEvent, eventID: number): DBPatientEvent {
    if (typeof localStorage.details !== 'object') {
      throw new Error('Invalid event details');
    }

    const treatmentType: number = strictlyParseInt(localStorage.treatmentType);

    return new DBPatientEvent(
      eventID,
      localStorage.patient,
      DetailValuesFactory.createDetails(TreatmentTypeNameIndex[treatmentType], localStorage.details),
      localStorage.date,
      treatmentType,
      strictlyParseInt(localStorage.cancerType)
    );
  }
}