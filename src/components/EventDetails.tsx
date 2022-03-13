
import DetailValuesWrapper from "./EventDetails/DetailValues/DetailValuesWrapper";
import ChemotherapyDetails from "./EventDetails/DetailValues/EventTypes/ChemotherapyDetails";
import RadiationDetails from "./EventDetails/DetailValues/EventTypes/RadiationDetails";
import SurgeryDetails from "./EventDetails/DetailValues/EventTypes/SurgeryDetails";
import StemCellTransplantDetails from "./EventDetails/DetailValues/EventTypes/StemCellTransplantDetails";

import { EventDetailValues } from "../types/PatientEvent/Details/EventDetailValues";
import { ChemotherapyDetailValues } from "../types/PatientEvent/Details/EventTypes/ChemotherapyDetails";
import { RadiationDetailValues } from "../types/PatientEvent/Details/EventTypes/RadiationDetails";
import { StemCellTransplantDetailValues } from "../types/PatientEvent/Details/EventTypes/StemCellTransplantDetails";
import { SurgeryDetailValues } from "../types/PatientEvent/Details/EventTypes/SurgeryDetails";

interface EventDetailsProps {
  details: EventDetailValues
}

export default function EventDetails(props: EventDetailsProps) {
  let DetailComponent: JSX.Element = <></>;
  
  if (props.details instanceof ChemotherapyDetailValues) {
    DetailComponent = <ChemotherapyDetails details={props.details} />;
  } else if (props.details instanceof RadiationDetailValues) {
    DetailComponent = <RadiationDetails details={props.details} />;
  } else if (props.details instanceof SurgeryDetailValues) {
    DetailComponent = <SurgeryDetails details={props.details} />;
  } else if (props.details instanceof StemCellTransplantDetailValues) {
    DetailComponent = <StemCellTransplantDetails details={props.details} />;
  }

  return (
    <DetailValuesWrapper>
      {DetailComponent}
    </DetailValuesWrapper>
  );
}