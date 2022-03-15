import EventDetails from "./EventDetails/EventDetails";

import { EventDetailValues } from "../../types/PatientEvent/Details/EventDetailValues";

interface EventLogEventProps {
  treatmentTypeName: string,
  cancerType: string,
  date: Date,
  details: EventDetailValues
}

export default function EventLogEvent(props: EventLogEventProps) {
  return (
    <li>
      <h5>
        {props.treatmentTypeName}
        <span>{props.cancerType}</span>
      </h5>  
      <h4>{props.date.toDateString()}</h4>
      <EventDetails details={props.details} />
    </li>
  );
};