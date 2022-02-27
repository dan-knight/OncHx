import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormikValues, useFormikContext } from "formik";
import { useState, useMemo, MouseEvent, ReactNode, ChangeEvent } from "react";
import DropdownOption from "../../types/Form/Dropdown/DropdownOption";
import { Option } from "../../types/Options";


interface SelectProps {
  name: string,
  options: DropdownOption[],
  label: string,
  displayValue: string
}

interface SelectWrapperProps extends SelectProps {
  children?: ReactNode | ReactNode[]
}

function SelectWrapper(props: SelectWrapperProps) {
  const { values, errors, setFieldValue }: FormikValues = useFormikContext();
  const [open, setOpen] = useState<boolean>(false);


  function handleOpen() {
    setOpen(!open);
  }

  function handleClickOption(event: MouseEvent, value: string) {
    event.stopPropagation();

    setFieldValue(props.name, value);
    setOpen(false);
  }

  return (
    <div className='select'>
      <div onClick={handleOpen} id={props.name}>
        {(props.displayValue) || '\u00a0'}
      </div>
      <ul className={open ? 'open' : undefined}>
        {props.children}
        {props.options.map((option: DropdownOption) => (
          <li key={option.value} onClick={(e: MouseEvent) => { handleClickOption(e, option.value); }}>
            {option.getLabel()}
          </li>
        ))}
      </ul>
      <label 
        htmlFor={props.name} 
        className={values[props.name] !== undefined && values[props.name] !== '' ? 'filled' : undefined} 
        onClick={handleOpen}
      >
        {props.label}
        <span className="error">{errors[props.name]}</span>
      </label>
    </div>
  );
}

export function Select(props: SelectProps) {
  return <SelectWrapper name={props.name} options={props.options} displayValue={props.displayValue} label={props.label} />
}

export function FilterSelect(props: SelectProps) {
  const [filterValue, setFilterValue] = useState('');
  const filteredOptions: DropdownOption[] = useMemo(() => {
    const filterRegExp = new RegExp(filterValue, 'i');
    
    return props.options.filter((option: DropdownOption) => filterRegExp.test(option.getLabel()));
  }, [props.options, filterValue]);

  function handleChangeFilter(event: ChangeEvent) {
    setFilterValue((event.target as HTMLInputElement).value);
  }

  return (
    <SelectWrapper name={props.name} options={filteredOptions} displayValue={props.displayValue} label={props.label}>
      <li className='filter'>
        <FontAwesomeIcon icon={faSearch} />
        <input value={filterValue} onChange={handleChangeFilter} />
      </li>
    </SelectWrapper>
  );
}