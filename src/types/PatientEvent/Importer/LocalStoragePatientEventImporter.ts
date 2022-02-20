import LocalStoragePatientEvent from "../LocalStoragePatientEvent";
import DetailValuesFactory from "../Details/DetailValuesFactory";
import DBPatientEvent from "../DBPatientEvent";

import { TreatmentTypeNameIndex } from "../../../config/TreatmentTypeName";
import safelyParseInt from "../../../utility/safelyParseInt";

export default class LocalStoragePatientEventImporter {
  static createDBEvent(localStorage: LocalStoragePatientEvent, eventID: number): DBPatientEvent {
    if (typeof localStorage.details !== 'object') {
      throw new Error('Invalid event details');
    }

    const treatmentType: number = safelyParseInt(localStorage.treatmentType);

    return new DBPatientEvent(
      eventID,
      localStorage.patient,
      DetailValuesFactory.createDetails(TreatmentTypeNameIndex[treatmentType], localStorage.details),
      localStorage.date,
      treatmentType,
      safelyParseInt(localStorage.cancerType)
    );
  }
}