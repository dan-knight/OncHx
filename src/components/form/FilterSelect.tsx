import { useState, useMemo, MouseEvent, ReactNode, ChangeEvent } from "react";
import { FormikValues, useFormikContext } from "formik";

import DropdownOption from "../../types/Form/Dropdown/DropdownOption";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FieldLabel from "./FieldLabel";


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

  function close() {
    setOpen(false);
  }

  function handleClickOption(event: MouseEvent, value: string | number) {
    event.stopPropagation();

    setFieldValue(props.name, value);
    setOpen(false);
  }

  return (
    <div className='select' onBlur={close} tabIndex={0}>
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
      <FieldLabel {...props} 
        filled={![undefined, ''].includes(props.displayValue)} 
        onClick={handleOpen} />
    </div>
  );
}

export function Select({ filter, ...props }: SelectProps & { filter?: boolean }) {
  return filter ? <FilterSelect {...props} /> : <BaseSelect {...props} />;
}

function BaseSelect(props: SelectProps) {
  return <SelectWrapper {...props} />;
}

export function FilterSelect(props: SelectProps) {
  const [filterValue, setFilterValue] = useState('');
  const filteredOptions: DropdownOption[] = useMemo(() => {
    const filterRegExp = new RegExp(filterValue, 'i');
    
    return props.options.filter((option: DropdownOption) => {
      const label: string | number = option.getLabel();
      return filterRegExp.test(typeof(label) === 'string' ? label : label.toString());
    })
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