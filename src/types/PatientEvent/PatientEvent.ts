import { EventDetailValues } from "./Details/EventDetailValues";
import Event from "./Event";

export default class PatientEvent extends Event {
  patient: string;
  details: EventDetailValues;
  treatmentType?: number;
  cancerType?: number;

  constructor(patient: string, details: EventDetailValues, date?: Date, treatmentType?: number, cancerType?: number) {
    super(date);

    this.patient = patient;
    this.details = details;
    this.treatmentType = treatmentType;
    this.cancerType = cancerType;
  }
}
