import { FormikValues, useFormikContext } from "formik";
import { useState, useMemo, MouseEvent, ReactNode, ChangeEvent } from "react";
import { Option, Options } from "../../types/Options";


interface SelectProps {
  name: string,
  options: Options,
  label: string
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
        {(props.options[values[props.name]]?.label ?? values[props.name]) || '\u00a0'}
      </div>
      <ul className={open ? 'open' : undefined}>
        {props.children}
        {Object.entries(props.options).map(([value, option]: [string, Option]) => (
          <li key={value} onClick={(e: MouseEvent) => { handleClickOption(e, value); }}>
            {option.label ?? value}
          </li>
        ))}
      </ul>
      <label htmlFor={props.name} className={values[props.name] !== '' ? 'filled' : undefined} onClick={handleOpen}>
        {props.label}
        <span className="error">{errors[props.name]}</span>
      </label>
    </div>
  );
}

export function Select(props: SelectProps) {
  return <SelectWrapper name={props.name} options={props.options} label={props.label} />
}

export function FilterSelect(props: SelectProps) {
  const [filterValue, setFilterValue] = useState('');
  const filteredOptions = useMemo(() => (
    Object.keys(props.options).reduce((a: Options, value: string) => {
      const label = props.options[value].label ?? value;
      return (new RegExp(filterValue, 'i').test(label) ?
        { ...a, [value]: props.options[value] } : a)
    }, {})
  ), [props.options, filterValue]);

  function handleChangeFilter(event: ChangeEvent) {
    setFilterValue((event.target as HTMLInputElement).value);
  }

  return (
    <SelectWrapper name={props.name} options={filteredOptions} label={props.label}>
      <li>
        <input value={filterValue} onChange={handleChangeFilter} />
      </li>
    </SelectWrapper>
  );
}