import { useFormikContext } from "formik";
import React, { useState } from "react";
import { useMemo } from "react/cjs/react.development";

function SelectWrapper({ name, options, label, ...props }) {
  const { values, errors, setFieldValue } = useFormikContext();
  const [open, setOpen] = useState(false);


  function handleOpen() {
    setOpen(!open);
  }

  function handleClickOption(event, value) {
    event.stopPropagation();

    setFieldValue(name, value);
    setOpen(false);
  }

  return (
    <div className='select'>
      <div name={name} onClick={handleOpen} id={name}>
        {(options[values[name]] ?? values[name]) || '\u00a0'}
      </div>
      <ul className={open ? 'open' : null}>
        {props.children}
        {Object.keys(options).map(o => (
          <li key={o.value} onClick={e => { handleClickOption(e, o); }}>
            {options[o] ?? o}
          </li>
        ))}
      </ul>
      <label htmlFor={name} className={values[name] !== '' ? 'filled' : null} onClick={handleOpen}>
        {label}
        <span className="error">{errors[name]}</span>
      </label>
    </div>
  );
}

export function Select({ name, options, label }) {
  return <SelectWrapper name={name} options={options} label={label} />
}

export function FilterSelect({ name, options, label }) {
  const [filterValue, setFilterValue] = useState('');
  const filteredOptions = useMemo(() => (
    Object.keys(options).reduce((a, o) => {
      const label = options[o] ?? o;
      return (new RegExp(filterValue, 'i').test(label) ?
        { ...a, [o]: options[o] } : a)
    }, {})
  ), [options, filterValue]);

  function handleChangeFilter(event) {
    setFilterValue(event.target.value);
  }

  return (
    <SelectWrapper name={name} options={filteredOptions} label={label}>
      <li>
        <input value={filterValue} onChange={handleChangeFilter} />
      </li>
    </SelectWrapper>
  );
}