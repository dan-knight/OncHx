import { useMemo } from "react";

import { Formik, Form, FormikValues } from "formik";
import * as Yup from 'yup';
import { Link, useHistory } from "react-router-dom";

import NewTreatment from "./NewTreatment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const treatmentSchema = Yup.object().shape({
  cancerType: Yup.string().required('Required'),
  treatmentType: Yup.string().required('Required')
});

interface TreatmentInputProps {
  onSubmit: (values: FormikValues) => void
}

export default function TreatmentInput(props: TreatmentInputProps) {
  const today = useMemo(() => new Date(), []);
    
  const routerHistory = useHistory();

  function handleSubmit(values: FormikValues) {
    routerHistory.push('/');
    props.onSubmit(values);
  };

  return (
    <div className='form'>
      <div className='exit'>
        <Link to='/'>
          <FontAwesomeIcon icon={faTimes} />
        </Link>
      </div>
      <h3>Add Treatment</h3>
      <Formik
        initialValues={{
          cancerType: '',
          month: today.getMonth(),
          day: today.getDay(),
          year: today.getFullYear(),
          treatmentType: '',
          details: {},
          notes: ''
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