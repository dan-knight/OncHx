import DBPatientEvent from "./types/PatientEvent/DBPatientEvent";
import Patient from "./types/Patient/Patient";
import { ChemotherapyDetailValues } from "./types/PatientEvent/Details/EventTypes/ChemotherapyDetails";
import { RadiationDetailValues } from "./types/PatientEvent/Details/EventTypes/RadiationDetails";
import { SurgeryDetailValues } from "./types/PatientEvent/Details/EventTypes/SurgeryDetails";
import { StemCellTransplantDetailValues } from "./types/PatientEvent/Details/EventTypes/StemCellTransplantDetails";

export const defaultEvents = (): DBPatientEvent[] => {
  const chemotherapyDetails = new ChemotherapyDetailValues(
    0,
    '1'
  );

  const radiationDetails = new RadiationDetailValues(
    0,
    '9',
    '10'
  );

  const surgeryDetails = new SurgeryDetailValues(
    0,
    'Example Surgeon',
    'Surgery Type',
    'Example Complications'
  );

  const stemCellTransplantDetails = new StemCellTransplantDetailValues(
    'Example Physician'
  );

  return [
    new DBPatientEvent(0, 0, chemotherapyDetails, new Date(2020, 10, 15), 0, 0),
    new DBPatientEvent(1, 0, radiationDetails, new Date(2020, 10, 18), 1, 15),
    new DBPatientEvent(2, 0, chemotherapyDetails, new Date(2020, 10, 18), 0, 13),
    new DBPatientEvent(3, 0, chemotherapyDetails, new Date(2021, 1, 18), 0, 20),
    new DBPatientEvent(4, 0, radiationDetails, new Date(2021, 1, 8), 1, 1),
    new DBPatientEvent(5, 1, surgeryDetails, new Date(2021, 1, 18), 2, 20),
    new DBPatientEvent(6, 1, stemCellTransplantDetails, new Date(2021, 1, 8), 3, 1)
  ];
};

export const defaultPatients = (): Patient[] => [
  {
    id: 0,
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
  },
  {
    id: 1,
    firstName: 'Example',
    lastName: 'Patient',
    address: {
      street: '5678 Something Rd.',
      city: 'Los Angeles',
      state: 'CA',
      zip: '90001'
    },
    email: 'example@test.com',
    phone: '818-456-7890',
    birthday: new Date(1976, 3, 3)
  }
];