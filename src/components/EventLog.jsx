import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import useExpand from "../hooks/useExpand";

export default function EventLog({ allEvents, user }) {
  const [events, setEvents] = useState({});
  const [expandedEvents, showHideEvent] = useExpand();
  const [expandedYears, showHideYear] = useExpand();

  function prepareEvents() {
    const newEvents = {};
    
    allEvents.forEach(e => {
      if (e.user == user) {
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

  return (
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