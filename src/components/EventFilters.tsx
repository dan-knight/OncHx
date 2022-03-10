import { useMemo } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import TreatmentType from "../types/DB/Config/TreatmentType";
import DropdownOption from "../types/Form/Dropdown/DropdownOption";
import { GlobalValues } from "../types/Global";
import DropdownFilter from "./Filter/DropdownFilter";

interface EventFiltersProps {
  treatmentTypeFilterValue: number | undefined,
  onTreatmentTypeToggle: (value: number) => void
}

export default function EventFilters(props: EventFiltersProps) {
  const { config, treatmentTypeIndex }: GlobalValues = useGlobalContext();
  
  const treatmentTypeOptions: DropdownOption<number>[] = useMemo(() => (
    config.treatmentTypes.map((treatmentType: TreatmentType) => (
      new DropdownOption<number>(treatmentType.id, treatmentType.treatmentName)
    ))
  ), [config.treatmentTypes]);

  return (
    <div className='filters'>
      <div className="header">
        Filters
      </div>
      <div className="content">
        <DropdownFilter 
          label='Treatment Type' 
          options={treatmentTypeOptions} 
          displayValue={props.treatmentTypeFilterValue !== undefined ? treatmentTypeIndex(props.treatmentTypeFilterValue)?.treatmentName : ''}
        />
      </div>
    </div>
  );
}