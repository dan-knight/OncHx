import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import PatientInfo from "./PatientInfo/PatientInfo";
import { GlobalValues } from "../types/Global";
import { useGlobalContext } from "../contexts/GlobalContext";

import DBPatientEvent from "../types/PatientEvent/DBPatientEvent";
import PatientEvent from "../types/PatientEvent/PatientEvent";
import TreatmentType from "../types/DB/Config/TreatmentType";
import { EventDetailValues } from "../types/PatientEvent/Details/EventDetailValues";
import PatientEventFilter from "../types/utility/Filter/PatientEventFilter/PatientEventFilter";
import Patient from "../types/Patient/Patient";
import useSetToggle from "../hooks/useSetToggle";

interface EventLogProps {
  allEvents: DBPatientEvent[],
  user: number
}

export default function EventLog(props: EventLogProps) {
  const [events, setEvents] = useState<{ [key: number]: DBPatientEvent[] }>({});

  const { config, patients, user }: GlobalValues = useGlobalContext();

  const [
    treatmentTypeFilters, 
    toggleTreatmentTypeFilters, 
    setTreatmentTypeFilters
  ] = useSetToggle<number>();

  const patient: Patient | undefined = user !== undefined ? patients[user] : undefined;

  const [startDateFilter, setStartDateFilter] = useState<Date | undefined>(undefined);
  const [endDateFilter, setEndDateFilter] = useState<Date | undefined>(undefined);

  useEffect(() => {
    setTreatmentTypeFilters(
      new Set(config.treatmentTypes.map((treatmentType: TreatmentType) => treatmentType.id))
    );
  }, [config.treatmentTypes]);

  const eventInFilters = (event: PatientEvent): boolean => (
    new PatientEventFilter({
      treatmentTypeIDs: treatmentTypeFilters,
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
  }, [treatmentTypeFilters, startDateFilter, endDateFilter, props.allEvents, props.user]);

  return (
    <React.Fragment>
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

interface EventYearProps {
  year: number,
  events: DBPatientEvent[]
}

function EventYear(props: EventYearProps) {
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
          <LogEvent key={i} date={e.date} details={e.details} 
            treatmentType={treatmentTypeIndex(e.treatmentType)?.treatmentName ?? ''} 
            cancerType={cancerTypeIndex(e.cancerType)?.cancerName ?? ''} />)) : undefined}
      </ul>
    </div>
  );
};

interface LogEventProps {
  treatmentType: string,
  cancerType: string,
  date: Date,
  details: EventDetailValues
}

function LogEvent(props: LogEventProps) {
  const [show, setShow] = useState<boolean>(false);

  function toggleShow() {
    setShow(!show);
  }

  return (
    <li>
      <h5>
        {props.treatmentType}
        <span>{props.cancerType}</span>
      </h5>  
      <h4>{props.date.toDateString()}</h4>
      <h6>Details <span onClick={toggleShow}>{`(${show ? 'Hide' : 'Show'})`}</span></h6>
      <p className={show ? 'expanded' : undefined}>{JSON.stringify(props.details)}</p>
    </li>
  );
};