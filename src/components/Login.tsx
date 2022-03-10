import { Formik, Form, Field, FormikValues } from "formik";
import * as Yup from 'yup';
import { useGlobalContext } from "../contexts/GlobalContext";
import { GlobalValues } from "../types/Global";
import { safelyParseInt } from "../utility/parseNumber";
import TextField from "./form/TextField";

const treatmentSchema = Yup.object().shape({
  username: Yup.string().required('Required'),
  password: Yup.string().required('Required')
});

interface LoginProps {
  onLogin: (value: number | undefined) => void
}

export default function Login(props: LoginProps) {

  function handleLogin(values: { username: string, password: string }) {
    props.onLogin(safelyParseInt(values.username));
  }
  return (
    <div className='form'>
      <h3>Login</h3>
      <Formik
        initialValues={{
          username: '',
          password: ''}}
        onSubmit={handleLogin}
        validationSchema={treatmentSchema}>
        {({ errors, values }) => (
          <Form>
            <TextField label='Username' name='username' filled={Boolean(values.username)} />
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