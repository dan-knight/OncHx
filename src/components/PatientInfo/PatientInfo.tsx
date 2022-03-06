import Avatar from "./Avatar";

import Patient from "../../types/Patient/Patient";

interface PatientInfoProps {
  patient: Patient
}

export default function PatientInfo(props: PatientInfoProps) {

  return <Avatar firstName={props.patient.firstName} lastName={props.patient.lastName} />;
}