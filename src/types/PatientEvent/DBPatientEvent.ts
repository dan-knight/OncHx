import PatientEvent from "./PatientEvent";
import { EventDetailValues } from "./Details/EventDetailValues";

export default class DBPatientEvent extends PatientEvent {
  eventID: number;

  constructor(eventID: number, patient: number, details: EventDetailValues, date?: Date, treatmentType?: number, cancerType?: number, institution?: string)
  constructor(eventID: number, patient: number, details: EventDetailValues, date?: string, treatmentType?: number, cancerType?: number, institution?: string);
  constructor(eventID: number, patient: number, details: EventDetailValues, date?: Date | string, treatmentType?: number, cancerType?: number, institution?: string);
  constructor(eventID: number, patient: number, details: EventDetailValues, date?: Date | string, treatmentType?: number, cancerType?: number, institution?: string) {
    super(patient, details, date, treatmentType, cancerType, institution);

    this.eventID = eventID;
  }
}