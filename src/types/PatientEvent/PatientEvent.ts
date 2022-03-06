import { EventDetailValues } from "./Details/EventDetailValues";
import Event from "./Event";

export default class PatientEvent extends Event {
  patient: string;
  details: EventDetailValues;
  treatmentType?: number;
  cancerType?: number;

  constructor(patient: string, details: EventDetailValues, date?: Date, treatmentType?: number, cancerType?: number);
  constructor(patient: string, details: EventDetailValues, date?: string, treatmentType?: number, cancerType?: number);
  constructor(patient: string, details: EventDetailValues, date?: Date | string, treatmentType?: number, cancerType?: number);
  constructor(patient: string, details: EventDetailValues, date?: Date | string, treatmentType?: number, cancerType?: number) {
    
    try {
      (super(typeof date === 'string' ? new Date(Date.parse(date)) : date)); 
    } catch (error) {
      throw new Error('Invalid string date');
    }

    this.patient = patient;
    this.details = details;
    this.treatmentType = treatmentType;
    this.cancerType = cancerType;
  }
}
