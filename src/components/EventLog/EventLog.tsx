import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import EventYear from "./EventLogYear";
import PatientInfo from "../PatientInfo/PatientInfo";
import { GlobalValues } from "../../types/Global";
import { useGlobalContext } from "../../contexts/GlobalContext";

import DBPatientEvent from "../../types/PatientEvent/DBPatientEvent";
import PatientEvent from "../../types/PatientEvent/PatientEvent";
import PatientEventFilter from "../../types/utility/Filter/PatientEventFilter/PatientEventFilter";
import Patient from "../../types/Patient/Patient";
import EventFilters from "../EventFilters";

interface EventLogProps {
  allEvents: DBPatientEvent[],
  user: number
}

export default function EventLog(props: EventLogProps) {
  const [events, setEvents] = useState<{ [key: number]: DBPatientEvent[] }>({});

  const { config, patients }: GlobalValues = useGlobalContext();
  // const [
  //   treatmentTypeFilters, 
  //   toggleTreatmentTypeFilters, 
  //   setTreatmentTypeFilters
  // ] = useSetToggle<number>();
  const [treatmentTypeFilter, setTreatmentTypeFilter] = useState<number | undefined>(undefined);

  const patient: Patient | undefined = patients[props.user];

  const [startDateFilter, setStartDateFilter] = useState<Date | undefined>(undefined);
  const [endDateFilter, setEndDateFilter] = useState<Date | undefined>(undefined);

  // useEffect(() => {
  //   setTreatmentTypeFilters(
  //     new Set(config.treatmentTypes.map((treatmentType: TreatmentType) => treatmentType.id))
  //   );
  // }, [config.treatmentTypes]);

  const eventInFilters = (event: PatientEvent): boolean => (
    new PatientEventFilter({
      treatmentTypeID: treatmentTypeFilter,
      startDate: startDateFilter,
      endDate: endDateFilter 
    }).isInFilters(event)
  );

  function prepareEvents() {
    const newEvents: { [key: number]: DBPatientEvent[] } = {};
    
    props.allEvents.forEach((e: DBPatientEvent) => {
      if (e.patient === props.user && eventInFilters(e)) {
        const year: number = e.date.getFullYear();

        if (newEvents[year] === undefined) {
          newEvents[year] = [e];
        } else {
          newEvents[year].push(e);
        }
      }
    });

    Object.keys(newEvents).forEach((k: string) => { 
      newEvents[parseInt(k)].sort((a: DBPatientEvent, b: DBPatientEvent) => b.date.getUTCDate() - a.date.getUTCDate());
    });

    return newEvents;
  };

  useEffect(() => {    
    setEvents(prepareEvents());
  // }, [treatmentTypeFilters, startDateFilter, endDateFilter, props.allEvents, props.user]);
  }, [treatmentTypeFilter, startDateFilter, endDateFilter, props.allEvents, props.user]);

  return (
    <React.Fragment>
      <EventFilters 
        treatmentTypeFilterValue={treatmentTypeFilter}
        onTreatmentTypeToggle={setTreatmentTypeFilter} 
      />
      {patient !== undefined ? <PatientInfo patient={patient} /> : undefined}
      <div className='event-log'>
        <Link to='/add'>
          <button>Add Event</button>
        </Link>
        <div>
          {Object.entries(events).sort((a: [string, DBPatientEvent[]], b: [string, DBPatientEvent[]]) => parseInt(b[0]) - parseInt(a[0])).map(([year, yearEvents]: [string, DBPatientEvent[]]) => (
            <EventYear year={parseInt(year)} events={yearEvents} key={year}
               />))}
        </div>
      </div>
    </React.Fragment>
  );
};
