interface BaseEvent {
  user: string,
  cancerType: number
  treatmentType: number,
  details?: object
}

export class PatientEvent implements BaseEvent {
  [key: string]: any;
  user: string;
  cancerType: number;
  date: Date;
  treatmentType: number;
  details: object

  constructor(user: string, cancerType: number, date: string, treatmentType: number, details?: object);
  constructor(user: string, cancerType: number, date: Date, treatmentType: number, details?: object);
  constructor(user: string, cancerType: number, date: Date | string, treatmentType: number, details?: object) {
    this.user = user;
    this.cancerType = cancerType;
    this.date = typeof date === 'string' ? new Date(Date.parse(date)) : date;
    this.treatmentType = treatmentType;
    this.details = details ?? {};
  }
}

export interface StoredPatientEvent extends BaseEvent {
  date: string
}