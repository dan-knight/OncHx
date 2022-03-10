import Avatar from "./Avatar";

import Patient from "../../types/Patient/Patient";

interface PatientInfoProps {
  patient: Patient
}

export default function PatientInfo(props: PatientInfoProps) {

  return (
    <div className='patient'>
      <Avatar firstName={props.patient.firstName} lastName={props.patient.lastName} />
      <h3>{`${props.patient.lastName}, ${props.patient.firstName}`}</h3>
    </div>
  );
}