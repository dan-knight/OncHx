import PatientEvent from "./PatientEvent";

type PatientEventMap = {
  [Key in keyof Omit<PatientEvent, 'details'>]: string;
}

export default interface LocalStoragePatientEvent extends PatientEventMap {
  details: Record<string, any>;
}