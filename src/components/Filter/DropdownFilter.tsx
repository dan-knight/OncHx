import DropdownOption from "../../types/Form/Dropdown/DropdownOption";

interface DropdownFilterProps<T extends number | string> {
  label: string,
  options: DropdownOption<T>[],
  displayValue?: string
}

export default function DropdownFilter<T extends number | string>(props: DropdownFilterProps<T>) {
  return (
    <span>{props.label}{props.displayValue ? `: ${props.displayValue}` : ''}</span>
  );
}