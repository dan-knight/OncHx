import { Formik, Form, Field } from "formik";
import { useState } from "react";

export default function TreatmentInput() {
  function handleSubmit(values) {
    alert(JSON.stringify(values, null, 2));
  };
  
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
          treatmentType: ''
        }}

        onSubmit={handleSubmit}>
        {({ values }) => (
          <Form>
            <span>
              <label>Cancer Type</label>
              <Field name='cancerType'>
                {}
              </Field>
            </span>
            <span>
              <label>Month</label>
              <Field name='month' as='select'>
                {Object.keys(months).map(m => <option value={m} label={months[m].name} key={m} />)}
              </Field>
            </span>
            <span>
              <label>Day</label>
              <Field name='day' as='select'>
                {[...Array((months[values.month].days + 1) + (values.month == 1 && values.year % 4 == 0)).keys()].slice(1).map(d => (
                  <option value={d} label={d} key={d} />
                ))}
              </Field>
            </span>
            <span>
              <label>Year</label>
              <Field name='year' as='select'>
                {[...Array(today.getFullYear() + 1 - 1960).keys()].slice(1).map(y =>{
                  const year = y + 1960;
                  return <option value={year} label={year} />
                })}
              </Field>
            </span>
            <span>
              <label>Treatment Type</label>
              <Field name='treatmentType' />
            </span>
            <span className='button'>
              <button type='submit'>Add Treatment</button>
            </span>
          </Form>
        )}
      </Formik>
    </div>
  );
}