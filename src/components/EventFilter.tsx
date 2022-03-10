interface EventFilterProps {
  onTreatmentTypeToggle: (value: number) => void
}

export default function EventFilter(props: EventFilterProps) {
  return (
    <div className='filters'>
      <div className="header">
        Filters
      </div>
      <div className="content">
        <span>Treatment Type</span>
      </div>
    </div>
  );
}