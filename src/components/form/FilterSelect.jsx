import { Field, useFormikContext } from "formik";
import React, { useState } from "react";
import { useMemo } from "react/cjs/react.development";

export default function FilterSelect({ name, options, label }) {
  const { values, errors, setFieldValue } = useFormikContext();
  const [open, setOpen] = useState(false);
  const [filterValue, setFilterValue] = useState('');

  const filteredOptions = useMemo(() => options.filter(o => new RegExp(filterValue, 'i').test(o)), [options, filterValue]);

  function handleOpen() {
    setOpen(!open);
  }

  function handleClickOption(event, value) {
    event.stopPropagation();

    setFieldValue(name, value);
    setOpen(false);
  }

  function handleChangeFilter(event) {
    setFilterValue(event.target.value);
  }

  return (
    <div className='select'>
      <div name={name} onClick={handleOpen} id={name}>
        {values[name] || '\u00a0'}
      </div>
      <ul className={open ? 'open' : null}>
        <li>
          <input value={filterValue} onChange={handleChangeFilter} />
        </li>
        {filteredOptions.map(o => <li key={o} onClick={e => { handleClickOption(e, o); }}>{o}</li>)}
      </ul>
      <label htmlFor={name} className={values[name] !== '' ? 'filled' : null} onClick={handleOpen}>
        {label}
        <span className="error">{errors[name]}</span>
      </label>
    </div>
  );
}