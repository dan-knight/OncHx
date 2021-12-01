import React, { useMemo } from "react";
import { Field, useFormikContext } from "formik";

import { FilterSelect, Select } from "./form/FilterSelect";
import { cancerTypes } from "../defaultData";

export default function NewTreatment() {
  const { values, errors } = useFormikContext();

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

  const monthOptions = useMemo(() => (
    months.reduce((o, m, i) => ({ ...o, [i]: m.name}), {})
  ), []);

  const days = useMemo(() => {
    const dayValues = [...Array((months[values.month].days + 1) + (values.month === '1' && values.year % 4 === 0)).keys()];
    return dayValues.reduce((o, d) => ({ ...o, [d]: undefined }));
  }, [values.month]);

  const cancerTypeOptions = useMemo(() => cancerTypes().reduce(
    (o, c) => ({ ...o, [c]: undefined }), {}
  ), []);

  return (
    <React.Fragment>
      <FilterSelect name='cancerType' options={cancerTypeOptions} label='Cancer Type' />
      <Select name='month' options={monthOptions} label='Month' />
      <Select name='day' options={days} label='Day' />
      <div>
        <Field name='year' id='year' />
        <label htmlFor='year' className={values.year ? 'filled' : null}>
          Year
          {<span className="error">{errors.year}</span>}</label>
        
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