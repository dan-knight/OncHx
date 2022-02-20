import DBPatientEvent from "./types/PatientEvent/DBPatientEvent";
import DetailValuesFactory from "./types/PatientEvent/Details/DetailValuesFactory";
import { TreatmentTypeName, TreatmentTypeNameIndex } from "./config/TreatmentTypeName";
import { EventDetailValues } from "./types/PatientEvent/Details/EventDetailValues";

export const defaultEvents = (): DBPatientEvent[] => {
  const treatmentType: TreatmentTypeName = TreatmentTypeNameIndex[0];
  const details: EventDetailValues = DetailValuesFactory.createDetails(treatmentType);

  return [
    new DBPatientEvent(0, 'patient', details, new Date(2020, 10, 15), 0, 0),
    new DBPatientEvent(1, 'patient', details, new Date(2020, 10, 18), 1, 15),
    new DBPatientEvent(2, 'patient', details, new Date(2020, 10, 18), 0, 13),
    new DBPatientEvent(3, 'patient', details, new Date(2021, 1, 18), 0, 20),
    new DBPatientEvent(4, 'patient', details, new Date(2021, 1, 8), 1, 1)
  ];
};