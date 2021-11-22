import { useState } from "react";

import { Formik, Form, Field } from "formik";
import * as Yup from 'yup';
import { Link, useHistory } from "react-router-dom";

const treatmentSchema = Yup.object().shape({
  cancerType: Yup.string().required('Required'),
  treatmentType: Yup.string().required('Required')
});

export default function TreatmentInput({ onSubmit }) {
  const [today] = useState(new Date());

  const [months] = useState([
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
    
  const routerHistory = useHistory();

  function handleSubmit(event) {
    routerHistory.push('/');
    onSubmit(event);
  };

  return (
    <div className='form'>
      <div className='exit'>
        <Link to='/'>X</Link>
      </div>
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

        onSubmit={handleSubmit}
        validationSchema={treatmentSchema}>
        {({ values, errors }) => (
          <Form>
            <div>
              <Field name='cancerType' id='cancerType' />
              <label htmlFor='cancerType' className={values.cancerType ? 'filled' : null}>
                Cancer Type
                <span className="error">{errors.cancerType}</span>
              </label>
            </div>
            <div>
              <Field name='month' as='select' id='month'>
                {Object.keys(months).map(m => <option value={m} label={months[m].name} key={m} />)}
              </Field>
              <label htmlFor='month'>Month</label>
            </div>
            <div>
              <Field name='day' as='select' id='day'>
                {[...Array((months[values.month].days + 1) + (values.month === '1' && values.year % 4 === 0)).keys()].slice(1).map(d => (
                  <option value={d} label={d} key={d} />
                ))}
              </Field>
              <label htmlFor='day'>Day</label>
            </div>
            <div>
              <Field name='year' as='select' id='year'>
                {[...Array(today.getFullYear() + 1 - 1960).keys()].slice(1).map(y =>{
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
          </Form>
        )}
      </Formik>
    </div>
  );
}