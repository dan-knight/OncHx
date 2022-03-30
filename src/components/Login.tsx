import { Formik, Form, FormikValues } from "formik";
import { useState } from "react";
import * as Yup from 'yup';
import { useGlobalContext } from "../contexts/GlobalContext";
import { GlobalValues } from "../types/Global";
import LoginValues from "../types/Login";
import TextField from "./form/TextField";

const treatmentSchema = Yup.object().shape({
  email: Yup.string().required('Required').email(),
  password: Yup.string().required('Required')
});

export default function Login() {
  const { getPatientIndex, patients, login }: GlobalValues = useGlobalContext();

  function handleLogin(values: LoginValues, { setErrors, resetForm }: FormikValues) {
    resetForm();

    const userIndex: number | undefined = getPatientIndex(values.email);

    if (userIndex !== undefined && values.password === patients?.[userIndex].password) {
      login(userIndex);
    } else {
      setErrors({ email: 'Invalid email/password combination' });
    }
  }

  return (
    <div className='form'>
      <h3>Login</h3>
      <Formik
        initialValues={{
          email: '',
          password: ''}}
        onSubmit={handleLogin}
        validationSchema={treatmentSchema}
        validateOnBlur={false}
      >
        {({ values, errors, touched, dirty }) => (
          <Form>
            <TextField label='Email' name='email' filled={Boolean(values.email)} 
              errors={errors.email} touched={!dirty || touched.email} />
            <TextField label='Password' name='password' type='password' filled={Boolean(values.password)} 
              errors={errors.password} touched={touched.password} />
            <div className='button'>
              <button type='submit'>Login</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};