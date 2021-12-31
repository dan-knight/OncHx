import React, { useMemo } from "react";
import { Field, FormikValues, useFormikContext } from "formik";

import { FilterSelect, Select } from "./form/FilterSelect";

import { cancerTypes } from "../defaultData";
import { range } from "../utility";
import { Month } from "../types/Date";
import { Option, Options } from "../types/Options";
import { GlobalValues } from "../types/Global";
import { useGlobalContext } from "../contexts/GlobalContext";

export default function NewTreatment() {
  const { values, errors }: FormikValues = useFormikContext();
  const { treatmentTypes }: GlobalValues = useGlobalContext();
  console.log(treatmentTypes)

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

  const monthOptions: Options = useMemo(() => ({
    label: 'Month',
    options: months.reduce((o: { [key: string]: Option }, m: Month, i: number) => ({ ...o, [i]: { label: m.name } }), {})
  }), []);

  const days: Options = useMemo(() => {
    const dayValues = range(1, months[values.month].days + Number(values.month === '1' && values.year % 4 === 0));
    return {
      label: 'Days',
      options: dayValues.reduce((o: { [key: string]: Option }, d: number) => ({ ...o, [d]: { label: undefined } }), {})
    };
  }, [values.month]);

  const cancerTypeOptions: Options = useMemo(() => ({
    label: 'Cancer Type',
    options: cancerTypes().reduce((acc: { [key: string]: Option }, cancerType: string) => ({ ...acc, [cancerType]: { label: undefined } }), {})
  }), []);

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