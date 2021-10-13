import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function EventLog({ allEvents, user }) {
  const [events, setEvents] = useState(allEvents);
  const [expanded, setExpanded] = useState(new Set());

  useEffect(() => {
    setEvents(allEvents.filter(e => e.user == user));
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
        {events.map((e, i) => (
          <Event date={e.date} cancer={e.cancerType} treatment={e.treatmentType} details={e.details} 
            eventID={i} show={expanded.has(i)} onShow={showHide} />))}
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