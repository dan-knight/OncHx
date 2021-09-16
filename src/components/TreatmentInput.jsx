import { useState } from "react";

import { Formik, Form, Field } from "formik";
import * as Yup from 'yup';

const treatmentSchema = Yup.object().shape({
  cancerType: Yup.string().required('Required'),
  treatmentType: Yup.string().required('Required')
});

export default function TreatmentInput({ onSubmit }) {  
  const [today, setToday] = useState(new Date());

  const [months, setMonths] = useState([
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
  ]);

  return (
    <div className='form'>
      <h3>Add Treatment</h3>
      <Formik
        initialValues={{
          cancerType: '',
          month: today.getMonth(),
          day: today.getDay(),
          year: today.getFullYear(),
          treatmentType: '',
          details: ''
        }}

        onSubmit={onSubmit}
        validationSchema={treatmentSchema}>
        {({ values, errors }) => (
          <Form>
            <div>
              <label>
                Cancer Type
                {<span className="error">{errors.cancerType}</span>}
              </label>
              <Field name='cancerType' />
            </div>
            <div>
              <label>Month</label>
              <Field name='month' as='select'>
                {Object.keys(months).map(m => <option value={m} label={months[m].name} key={m} />)}
              </Field>
            </div>
            <div>
              <label>Day</label>
              <Field name='day' as='select'>
                {[...Array((months[values.month].days + 1) + (values.month === '1' && values.year % 4 === 0)).keys()].slice(1).map(d => (
                  <option value={d} label={d} key={d} />
                ))}
              </Field>
            </div>
            <div>
              <label>Year</label>
              <Field name='year' as='select'>
                {[...Array(today.getFullYear() + 1 - 1960).keys()].slice(1).map(y =>{
                  const year = y + 1960;
                  return <option value={year} label={year} key={year} />
                })}
              </Field>
            </div>
            <div>
              <label>
                Treatment Type
                {<span className="error">{errors.treatmentType}</span>}</label>
              <Field name='treatmentType' />
            </div>
            <div>
              <label>
                Details
                {<span className="error">{errors.details}</span>}</label>
              <Field name='details' />
            </div>
            <div className='button'>
              <button type='submit'>Add Treatment</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}