import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import useExpand from "../hooks/useExpand";
import FilterMenu from "./FilterMenu";

import { FilterOption, FilterOptions, FilterSelected } from "../types/Filter";
import { PatientEvent } from "../types/Event";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { GlobalValues } from "../types/Global";
import { useGlobalContext } from "../contexts/GlobalContext";

interface EventLogProps {
  allEvents: PatientEvent[],
  user: string
}

export default function EventLog(props: EventLogProps) {
  const [events, setEvents] = useState<{ [key: number]: PatientEvent[] }>({});
  const [expandedEvents, showHideEvent] = useExpand();
  const [expandedYears, showHideYear] = useExpand();

  const { treatmentTypes, cancerTypes }: GlobalValues = useGlobalContext();

  const defaultFilters: { [key: string]: FilterOptions } = {
    cancerType: Object.keys(cancerTypes.options).map((k: string) => parseInt(k)),
    treatmentType: Object.keys(treatmentTypes.options).map((k: string) => parseInt(k))
  };
  const [filters, setFilters] = useState<{ [key: string]: FilterSelected }>(Object.keys(defaultFilters).reduce(
    (a: { [key: string]: FilterSelected }, b: FilterOption): { [key: string]: FilterSelected } => (
      { ...a, [b]: new Set<FilterOption>(defaultFilters[b])}
    ), {}));

  const eventInFilters = (event: PatientEvent) => {
    let inFilters = true;
    const filterCategories: string[] = Object.keys(defaultFilters);
    
    for (let i = 0; i < filterCategories.length; i++) {
      const category: string = filterCategories[i];

      if (!filters[category].has(event[category])) {
        inFilters = false;
        break;
      }
    };

    return inFilters;
  };

  function prepareEvents() {
    const newEvents: { [key: number]: PatientEvent[] } = {};
    
    props.allEvents.forEach((e: PatientEvent) => {
      if (e.user === props.user && eventInFilters(e)) {
        const year: number = e.date.getFullYear();

        if (newEvents[year] === undefined) {
          newEvents[year] = [e];
        } else {
          newEvents[year].push(e);
        }
      }
    });

    Object.keys(newEvents).forEach((k: string) => { 
      newEvents[parseInt(k)].sort((a: PatientEvent, b: PatientEvent) => b.date.getUTCDate() - a.date.getUTCDate());
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
      <FilterMenu selected={filters} filters={defaultFilters} onChange={handleCheck} />
      <div className='event-log'>
        <Link to='/add'>
          <button>Add Event</button>
        </Link>
        <div>
          {Object.entries(events).sort((a: [string, PatientEvent[]], b: [string, PatientEvent[]]) => parseInt(b[0]) - parseInt(a[0])).map(e => (
            <EventYear year={parseInt(e[0])} events={e[1]} key={e[0]} 
              expandedEvents={expandedEvents} onShowEvent={showHideEvent} 
              show={expandedYears.has(parseInt(e[0]))} onShowYear={showHideYear} />))}
        </div>
      </div>
    </React.Fragment>
  );
};

interface EventYearProps {
  year: number,
  events: PatientEvent[],
  onShowEvent: (eventID: number) => void,
  show: boolean,
  onShowYear: (year: number) => void,
  expandedEvents: Set<number>
}

function EventYear(props: EventYearProps) {
  function handleShow() {
    props.onShowYear(props.year);
  };

  return (
    <div>
      <h3 onClick={handleShow}>{props.year}</h3>
      <ul className={props.show ? 'expanded' : undefined}>
        {props.events.map((e: PatientEvent, i: number) => (
          <LogEvent event={e} show={props.expandedEvents.has(i)} onShow={props.onShowEvent} key={i} />))}
      </ul>
    </div>
  );
};

interface LogEventProps {
  event: PatientEvent,
  show: boolean,
  onShow: (eventID: number) => void
}

function LogEvent(props: LogEventProps) {
  function handleShow() {
    props.onShow(props.event.id);
  };

  return (
    <li>
      <h5>{props.event.treatmentType}<span>{props.event.cancerType}</span></h5>  
      <h4>{props.event.date.toDateString()}</h4>
      <h6>Details <span onClick={handleShow}>{`(${props.show ? 'Hide' : 'Show'})`}</span></h6>
      <p className={props.show ? 'expanded' : undefined}>{JSON.stringify(props.event.details)}</p>
    </li>
  );
};