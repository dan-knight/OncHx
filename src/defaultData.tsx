import { PatientEvent } from "./types/Event";

export const defaultEvents = (): PatientEvent[] => ([
  new PatientEvent('patient', 0, new Date(2020, 10, 15), 0),
  new PatientEvent('patient', 15, new Date(2020, 10, 18), 1),
  new PatientEvent('patient', 13, new Date(2020, 10, 18), 0),
  new PatientEvent('patient', 20, new Date(2021, 1, 18), 0),
  new PatientEvent('patient', 1, new Date(2021, 1, 8), 1, { notes: 'Note' })
]);