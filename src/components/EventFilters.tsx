import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMemo } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import TreatmentType from "../types/DB/Config/TreatmentType";
import DropdownOption from "../types/Form/Dropdown/DropdownOption";
import { GlobalValues } from "../types/Global";
import DateFilter from "./Filter/DateFilter";
import DropdownFilter from "./Filter/DropdownFilter";

interface EventFiltersProps {
  treatmentTypeFilterValue: number | undefined,
  onTreatmentTypeToggle: (value: number) => void
}

export default function EventFilters(props: EventFiltersProps) {
  const { config, getTreatmentType }: GlobalValues = useGlobalContext();
  
  const treatmentTypeOptions: DropdownOption<number>[] = useMemo(() => (
    config.treatmentTypes.map((treatmentType: TreatmentType) => (
      new DropdownOption<number>(treatmentType.id, treatmentType.treatmentName)
    ))
  ), [config.treatmentTypes]);

  return (
    <div className='filters'>
      <div className="header">
        Filters
        <FontAwesomeIcon icon={faChevronDown} />
      </div>
      <div className="content">
        <DropdownFilter 
          label='Treatment Type' 
          options={treatmentTypeOptions} 
          displayValue={props.treatmentTypeFilterValue !== undefined ? getTreatmentType(props.treatmentTypeFilterValue.toFixed())?.treatmentName : ''}
        />
        <DateFilter 
          label='Start Date' 
          onChange={(value: Date) => { console.log(value); }} 
          value={new Date(2021, 3, 10)}
        />
        <DateFilter 
          label='End Date' 
          onChange={(value: Date) => { console.log(value); }} 
          value={undefined}
        />
      </div>
    </div>
  );
}