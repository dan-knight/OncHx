import EventDetails from "./EventDetails/EventDetails";

import DBPatientEvent from "../../types/PatientEvent/DBPatientEvent";
import { GlobalValues } from "../../types/Global";
import { useGlobalContext } from "../../contexts/GlobalContext";

interface EventLogEventProps {
  event: DBPatientEvent
}

export default function EventLogEvent(props: EventLogEventProps) {
  const { treatmentTypeIndex, cancerTypeIndex }: GlobalValues = useGlobalContext();
  return (
    <li>
      <h5>
        {treatmentTypeIndex(props.event.treatmentType)?.treatmentName ?? ''}
        <span>{cancerTypeIndex(props.event.cancerType)?.cancerName ?? ''}</span>
      </h5>  
      <h4>{props.event.date.toDateString()}</h4>
      <EventDetails details={props.event.details} />
    </li>
  );
};