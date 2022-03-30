import { Formik, Form, FormikValues } from "formik";
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
  function handleLogin(values: LoginValues) {
    console.log(values);
  }
  return (
    <div className='form'>
      <h3>Login</h3>
      <Formik
        initialValues={{
          email: '',
          password: ''}}
        onSubmit={handleLogin}
        validationSchema={treatmentSchema}>
        {({ errors, values }) => (
          <Form>
            <TextField label='Email' name='email' filled={Boolean(values.email)} />
            <TextField label='Password' name='password' type='password' filled={Boolean(values.password)} />
            <div className='button'>
              <button type='submit'>Login</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};