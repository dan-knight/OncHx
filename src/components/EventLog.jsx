export default function EventLog({ events }) {
  return (
    <ul>
      {events.map(e => (
        <Event date={e.date} cancer={e.cancerType} treatment={e.treatmentType} details={e.details}/>))}
    </ul>
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