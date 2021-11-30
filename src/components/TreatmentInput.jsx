import { useMemo } from "react";

import { Formik, Form } from "formik";
import * as Yup from 'yup';
import { Link, useHistory } from "react-router-dom";

import NewTreatment from "./NewTreatment";

const treatmentSchema = Yup.object().shape({
  cancerType: Yup.string().required('Required'),
  treatmentType: Yup.string().required('Required')
});

export default function TreatmentInput({ onSubmit }) {
  const today = useMemo(() => new Date(), []);
    
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
          <Form>
            <NewTreatment />
          </Form>
      </Formik>
    </div>
  );
}