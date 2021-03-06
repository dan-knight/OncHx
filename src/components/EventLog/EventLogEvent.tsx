import EventDetails from "./EventDetails/EventDetails";

import DBPatientEvent from "../../types/PatientEvent/DBPatientEvent";
import { GlobalValues } from "../../types/Global";
import { useGlobalContext } from "../../contexts/GlobalContext";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

interface EventLogEventProps {
  event: DBPatientEvent
}

export default function EventLogEvent(props: EventLogEventProps) {
  const { getTreatmentType, getCancerType }: GlobalValues = useGlobalContext();

  const [showDetails, setShowDetails] = useState<boolean>(false);

  function toggleShowDetails() {
    setShowDetails(!showDetails);
  }

  return (
    <li>
      <div className='event-header' onClick={toggleShowDetails}>
        <span>
          <h5>
            {getTreatmentType(props.event.treatmentType?.toString())?.treatmentName ?? ''}
            <span>{getCancerType(props.event.cancerType?.toString())?.cancerName ?? ''}</span>
          </h5>  
          <h4>{props.event.date.toDateString()}</h4>
        </span>
        <FontAwesomeIcon icon={showDetails ? faChevronUp : faChevronDown} />
      </div>
      <EventDetails event={props.event} show={showDetails} />
    </li>
  );
};