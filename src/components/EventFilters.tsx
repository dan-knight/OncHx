interface EventFiltersProps {
  onTreatmentTypeToggle: (value: number) => void
}

export default function EventFilters(props: EventFiltersProps) {
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