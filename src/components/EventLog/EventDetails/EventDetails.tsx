
import DetailValuesWrapper from "./DetailValues/DetailValuesWrapper";
import ChemotherapyDetails from "./DetailValues/EventTypes/ChemotherapyDetails";
import RadiationDetails from "./DetailValues/EventTypes/RadiationDetails";
import SurgeryDetails from "./DetailValues/EventTypes/SurgeryDetails";
import StemCellTransplantDetails from "./DetailValues/EventTypes/StemCellTransplantDetails";

import DBPatientEvent from "../../../types/PatientEvent/DBPatientEvent";
import { ChemotherapyDetailValues } from "../../../types/PatientEvent/Details/EventTypes/ChemotherapyDetails";
import { RadiationDetailValues } from "../../../types/PatientEvent/Details/EventTypes/RadiationDetails";
import { StemCellTransplantDetailValues } from "../../../types/PatientEvent/Details/EventTypes/StemCellTransplantDetails";
import { SurgeryDetailValues } from "../../../types/PatientEvent/Details/EventTypes/SurgeryDetails";

interface EventDetailsProps {
  event: DBPatientEvent,
  show: boolean
}

export default function EventDetails(props: EventDetailsProps) {
  let DetailComponent: JSX.Element = <></>;
  
  if (props.event.details instanceof ChemotherapyDetailValues) {
    DetailComponent = <ChemotherapyDetails details={props.event.details} />;
  } else if (props.event.details instanceof RadiationDetailValues) {
    DetailComponent = <RadiationDetails details={props.event.details} />;
  } else if (props.event.details instanceof SurgeryDetailValues) {
    DetailComponent = <SurgeryDetails details={props.event.details} />;
  } else if (props.event.details instanceof StemCellTransplantDetailValues) {
    DetailComponent = <StemCellTransplantDetails details={props.event.details} />;
  }

  return (
    <DetailValuesWrapper show={props.show}>
      {DetailComponent}
    </DetailValuesWrapper>
  );
}