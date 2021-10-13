import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function EventLog({ allEvents, user }) {
  const [events, setEvents] = useState({});
  const [expanded, setExpanded] = useState(new Set());

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

  function showHide(eventID) {
    const newExpanded = new Set(expanded);

    if (newExpanded.has(eventID)) {
      newExpanded.delete(eventID);
    } else {
      newExpanded.add(eventID);
    }

    setExpanded(newExpanded);
  };

  return (
    <div className='event-log'>
      <Link to='/add'>
        <button>Add Event</button>
      </Link>
      <ul>
        {Object.entries(events).sort((a, b) => b[0] - a[0]).map(e => (
          <EventYear year={e[0]} events={e[1]} key={e[0]} expanded={expanded} onShow={showHide} />))}
      </ul>
    </div>
  );
};

function EventYear({year, events, expanded, onShow}) {
  return (
    <div>
      <h1>{year}</h1>
      <ul>
        {events.map((e, i) => (
          <Event date={e.date} cancer={e.cancerType} treatment={e.treatmentType} details={e.details} 
            eventID={i} show={expanded.has(i)} onShow={onShow} />))}
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