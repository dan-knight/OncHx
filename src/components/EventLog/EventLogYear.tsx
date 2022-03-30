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
  const [show, setShow] = useState<boolean>(false);

  function toggleShow() {
    setShow(!show);
  }

  return (
    <div>
      <h3 onClick={toggleShow}>{props.year}</h3>
      <ul className={show ? 'expanded' : undefined}>
        {show ? props.events.map((e: DBPatientEvent) => (
          <EventLogEvent event={e} key={e.eventID} />
        )) : undefined}
      </ul>
    </div>
  );
};