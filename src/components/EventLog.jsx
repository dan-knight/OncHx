import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import useExpand from "../hooks/useExpand";
import FilterMenu from "./FilterMenu";

export default function EventLog({ allEvents, user }) {
  const [events, setEvents] = useState({});
  const [expandedEvents, showHideEvent] = useExpand();
  const [expandedYears, showHideYear] = useExpand();

  const defaultFilters = {
    cancerType: new Set(['Prostate', 'Lung'])
  };
  const [filters, setFilters] = useState(defaultFilters);

  const eventInFilters = event => {
    Object.entries(filters).forEach(f => {
      if (!f[1].has(event[f[0]])) {
        return false;
      }
    });

    return true;
  };

  function prepareEvents() {
    const newEvents = {};
    
    allEvents.forEach(e => {
      if (e.user == user && eventInFilters(e)) {
        const year = e.date.getFullYear();

        if (newEvents[year] === undefined) {
          newEvents[year] = [e];
        } else {
          newEvents[year].push(e);
        }
      }
    });

    Object.keys(newEvents).forEach(k => { 
      newEvents[k].sort((a, b) => b.date - a.date);
    });

    return newEvents;
  };

  useEffect(() => {    
    setEvents(prepareEvents());
  }, [allEvents, user]);

  function handleCheck(filter, value) {
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
      <FilterMenu selected={filters} options={defaultFilters} onChange={handleCheck} />
      <div className='event-log'>
        <Link to='/add'>
          <button>Add Event</button>
        </Link>
        <div>
          {Object.entries(events).sort((a, b) => b[0] - a[0]).map(e => (
            <EventYear year={e[0]} events={e[1]} key={e[0]} 
              expandedEvents={expandedEvents} onShowEvent={showHideEvent} 
              show={expandedYears.has(e[0])} onShowYear={showHideYear} />))}
        </div>
      </div>
    </React.Fragment>
  );
};

function EventYear({year, events, expandedEvents, onShowEvent, show, onShowYear}) {
  function handleShow() {
    onShowYear(year);
  };

  return (
    <div>
      <h3 onClick={handleShow}>{year}</h3>
      <ul className={show ? 'expanded' : null}>
        {events.map((e, i) => (
          <Event date={e.date} cancer={e.cancerType} treatment={e.treatmentType} details={e.details} 
            eventID={i} show={expandedEvents.has(i)} onShow={onShowEvent} />))}
      </ul>
    </div>
  );
};

function Event({cancer, date, treatment, details, show, eventID, onShow}) {
  function handleShow() {
    onShow(eventID);
  };

  return (
    <li>
      <h5>{treatment}<span>{cancer}</span></h5>  
      <h4>{date.toDateString()}</h4>
      <h6>Details <span onClick={handleShow}>{`(${show ? 'Hide' : 'Show'})`}</span></h6>
      <p className={show ? 'expanded' : null}>{details}</p>
    </li>
  );
};