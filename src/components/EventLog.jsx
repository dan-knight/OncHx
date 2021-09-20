import { Link } from "react-router-dom";

export default function EventLog({ events }) {
  return (
    <div>
      <Link to='/add'>
        <button>Add Event</button>
      </Link>
      <ul>
        {events.map(e => (
          <Event date={e.date} cancer={e.cancerType} treatment={e.treatmentType} details={e.details}/>))}
      </ul>
    </div>
  );
};

function Event({cancer, date, treatment, details}) {
  return (
    <div>
      <h5>{treatment}<span>{cancer}</span></h5>  
      <h4>{date.toDateString()}</h4>
      <p>{details}</p>
    </div>
  );
};