import { useState } from "react";

import EventLogEvent from "./EventLogEvent";
import { useGlobalContext } from "../../contexts/GlobalContext";
import { GlobalValues } from "../../types/Global";

import DBPatientEvent from "../../types/PatientEvent/DBPatientEvent";

interface EventYearProps {
  year: number,
  events: DBPatientEvent[]
}

export default function EventYear(props: EventYearProps) {
  const { treatmentTypeIndex, cancerTypeIndex }: GlobalValues = useGlobalContext();
  const [show, setShow] = useState<boolean>(false);

  function toggleShow() {
    setShow(!show);
  }

  return (
    <div>
      <h3 onClick={toggleShow}>{props.year}</h3>
      <ul className={show ? 'expanded' : undefined}>
        {show ? props.events.map((e: DBPatientEvent, i: number) => (
          <EventLogEvent key={i} date={e.date} details={e.details} 
            treatmentTypeName={treatmentTypeIndex(e.treatmentType)?.treatmentName ?? ''}
            cancerType={cancerTypeIndex(e.cancerType)?.cancerName ?? ''} />)) : undefined}
      </ul>
    </div>
  );
};