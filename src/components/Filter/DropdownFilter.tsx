import DropdownOption from "../../types/Form/Dropdown/DropdownOption";

interface DropdownFilterProps<T extends number | string> {
  label: string,
  options: DropdownOption<T>[],
  displayValue?: string
}

export default function DropdownFilter<T extends number | string>(props: DropdownFilterProps<T>) {
  return (
    <span>
      <div>{props.label}</div>
      {props.displayValue ? props.displayValue : 'All'}
    </span>
  );
}