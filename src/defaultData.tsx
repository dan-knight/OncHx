import DBPatientEvent from "./types/PatientEvent/DBPatientEvent";
import { EventDetailValues } from "./types/PatientEvent/Details/EventDetailValues";
import Patient from "./types/Patient/Patient";

export const defaultEvents = (): DBPatientEvent[] => {
  const details: EventDetailValues = {};

  return [
    new DBPatientEvent(0, 0, details, new Date(2020, 10, 15), 0, 0),
    new DBPatientEvent(1, 0, details, new Date(2020, 10, 18), 1, 15),
    new DBPatientEvent(2, 0, details, new Date(2020, 10, 18), 0, 13),
    new DBPatientEvent(3, 0, details, new Date(2021, 1, 18), 0, 20),
    new DBPatientEvent(4, 0, details, new Date(2021, 1, 8), 1, 1)
  ];
};

export const defaultPatients = (): Patient[] => [
  {
    id: 1,
    firstName: 'Sample',
    lastName: 'Patient',
    address: {
      street: '1234 Example Rd.',
      city: 'Los Angeles',
      state: 'CA',
      zip: '90001'
    },
    email: 'patient@example.com',
    phone: '818-123-4567',
    birthday: new Date(1980, 10, 2)
  }
];