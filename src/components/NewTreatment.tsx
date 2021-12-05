import React, { useMemo } from "react";
import { Field, FormikValues, useFormikContext } from "formik";

import { FilterSelect, Select } from "./form/FilterSelect";

import { cancerTypes } from "../defaultData";
import { range } from "../utility";
import { Month } from "../types/Date";
import { NumberOptions, Options } from "../types/Options";

export default function NewTreatment() {
  const { values, errors }: FormikValues = useFormikContext();

  const months = useMemo((): Month[] => ([
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

  const monthOptions: NumberOptions = useMemo(() => (
    months.reduce((o: NumberOptions, m: Month, i: number) => ({ ...o, [i]: m.name}), {})
  ), []);

  const days = useMemo((): { [key: number]: string | undefined } => {
    const dayValues = range(1, months[values.month].days + Number(values.month === '1' && values.year % 4 === 0));
    return dayValues.reduce((o: object, d: number) => ({ ...o, [d]: undefined }), {});
  }, [values.month]);

  const cancerTypeOptions: Options = useMemo(() => (
    cancerTypes().reduce((o: Options, c: string) => ({ ...o, [c]: undefined }), {})
  ), []);

  return (
    <React.Fragment>
      <FilterSelect name='cancerType' options={cancerTypeOptions} label='Cancer Type' />
      <Select name='month' options={monthOptions} label='Month' />
      <Select name='day' options={days} label='Day' />
      <div>
        <Field name='year' id='year' />
        <label htmlFor='year' className={values.year ? 'filled' : undefined}>
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
        <label htmlFor='details' className={values.details ? 'filled' : undefined}>
          Details
          {<span className="error">{errors.details}</span>}</label>
        
      </div>
      <div className='button'>
        <button type='submit'>Add Treatment</button>
      </div>
    </React.Fragment>
  );
}