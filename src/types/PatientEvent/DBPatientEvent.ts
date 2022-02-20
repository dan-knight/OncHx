import PatientEvent from "./PatientEvent";
import { EventDetailValues } from "./Details/EventDetailValues";

export default class DBPatientEvent extends PatientEvent {
  eventID: number;

  constructor(eventID: number, patient: string, details: EventDetailValues, date?: Date, treatmentType?: number, cancerType?: number)
  constructor(eventID: number, patient: string, details: EventDetailValues, date?: string, treatmentType?: number, cancerType?: number);
  constructor(eventID: number, patient: string, details: EventDetailValues, date?: Date | string, treatmentType?: number, cancerType?: number);
  constructor(eventID: number, patient: string, details: EventDetailValues, date?: Date | string, treatmentType?: number, cancerType?: number) {
    super(patient, details, date, treatmentType, cancerType);

    this.eventID = eventID;
  }
}