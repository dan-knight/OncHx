import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

import useExpand from "../hooks/useExpand";
import FilterMenu from "./FilterMenu";

import { FilterOption, FilterOptions, FilterSelected } from "../types/Filter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { GlobalValues } from "../types/Global";
import { useGlobalContext } from "../contexts/GlobalContext";
import { TreatmentTypes } from "../types/Treatment";
import { CancerTypes } from "../types/Cancer";
import { Options } from "../types/Options";
import DBPatientEvent from "../types/PatientEvent/DBPatientEvent";
import PatientEvent from "../types/PatientEvent/PatientEvent";
import CancerType from "../types/DB/Config/CancerType";
import TreatmentType from "../types/DB/Config/TreatmentType";
import { EventDetailValues } from "../types/PatientEvent/Details/EventDetailValues";
import Avatar from "./PatientInfo/Avatar";
import Patient from "../types/Patient/Patient";
import PatientInfo from "./PatientInfo/PatientInfo";

interface EventLogProps {
  allEvents: DBPatientEvent[],
  user: number
}

export default function EventLog(props: EventLogProps) {
  const [events, setEvents] = useState<{ [key: number]: DBPatientEvent[] }>({});

  const { config, patients, user }: GlobalValues = useGlobalContext();

  const defaultFilters: { [key: string]: FilterOptions } = {
    cancerType: config.cancerTypes.map((cancer: CancerType) => cancer.id),
    treatmentType: config.treatmentTypes.map((treatment: TreatmentType) => treatment.id)
  };

  const [filters, setFilters] = useState<{ [key: string]: FilterSelected }>(Object.keys(defaultFilters).reduce(
    (a: { [key: string]: FilterSelected }, b: FilterOption): { [key: string]: FilterSelected } => (
      { ...a, [b]: new Set<FilterOption>(defaultFilters[b])}
    ), {}));


  const patient: Patient | undefined = user !== undefined ? patients[user] : undefined;

  // const eventInFilters = (event: DBPatientEvent) => {
  //   let inFilters = true;
  //   const filterCategories: string[] = Object.keys(defaultFilters);
    
  //   for (let i = 0; i < filterCategories.length; i++) {
  //     const category: string = filterCategories[i];

  //     if (!filters[category].has(event[category])) {
  //       inFilters = false;
  //       break;
  //     }
  //   };

  //   return inFilters;
  // };

  // TODO Reimplement eventInFilters() with command pattern
  const eventInFilters = (event: PatientEvent): boolean => true;

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
  }, [props.allEvents, props.user, filters]);

  function handleCheck(filter: FilterOption, value: FilterOption) {
    const newSelected = new Set(filters[filter]);

    if (newSelected.has(value)) {
      newSelected.delete(value);
    } else {
      newSelected.add(value);
    }

    setFilters({...filters, [filter]: newSelected});
  };

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