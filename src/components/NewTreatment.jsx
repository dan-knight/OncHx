import React, { useMemo } from "react";
import { Field, useFormikContext } from "formik";

import FilterSelect from "./form/FilterSelect";
import { cancerTypes } from "../defaultData";

export default function NewTreatment() {
  const { values, errors } = useFormikContext();

  const years = useMemo(() => {
    const today = new Date();
    return [...Array(today.getFullYear() + 1 - 1960).keys()].slice(1);
  }, []);

  const months = useMemo(() => ([
    { name: 'January', days: 31 },
    { name: 'February', days: 28 },
    { name: 'March', days: 31 },
    { name: 'April', days: 30 },
    { name: 'May', days: 31 },
    { name: 'June', days: 30 },
    { name: 'July', days: 31 },
    { name: 'August', days: 31 },
    { name: 'September', days: 30 },
    { name: 'October', days: 31 },
    { name: 'November', days: 30 },
    { name: 'December', days: 31 }
  ]), []);

  const days = useMemo(() => (
    [...Array((months[values.month].days + 1) + (values.month === '1' && values.year % 4 === 0)).keys()].slice(1)
  ), [values.month]);

  const cancerTypeOptions = useMemo(() => cancerTypes(), []);

  return (
    <React.Fragment>
      <FilterSelect name='cancerType' options={cancerTypeOptions} label='Cancer Type' />
      <div>
        <Field name='month' as='select' id='month'>
          {Object.keys(months).map(m => <option value={m} label={months[m].name} key={m} />)}
        </Field>
        <label htmlFor='month'>Month</label>
      </div>
      <div>
        <Field name='day' as='select' id='day'>
          {days.map(d => <option value={d} label={d} key={d} />)}
        </Field>
        <label htmlFor='day'>Day</label>
      </div>
      <div>
        <Field name='year' as='select' id='year'>
          {years.map(y =>{
            const year = y + 1960;
            return <option value={year} label={year} key={year} />
          })}
        </Field>
        <label htmlFor='year'>Year</label>
      </div>
      <div>
        <Field name='treatmentType' id='treatmentType' />
        <label htmlFor='treatmentType'>
          Treatment Type
          {<span className="error">{errors.treatmentType}</span>}</label>
      </div>
      <div>
        <Field name='details' id='details' />
        <label htmlFor='details' className={values.details ? 'filled' : null}>
          Details
          {<span className="error">{errors.details}</span>}</label>
        
      </div>
      <div className='button'>
        <button type='submit'>Add Treatment</button>
      </div>
    </React.Fragment>
  );
}