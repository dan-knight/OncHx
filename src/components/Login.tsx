import { Formik, Form, FormikValues } from "formik";
import * as Yup from 'yup';
import { useGlobalContext } from "../contexts/GlobalContext";
import { GlobalValues } from "../types/Global";
import LoginValues from "../types/Login";
import Patient from "../types/Patient/Patient";
import TextField from "./form/TextField";

const treatmentSchema = Yup.object().shape({
  email: Yup.string().required('Required').email(),
  password: Yup.string().required('Required')
});

export default function Login() {
  const { getPatientIndex, patients, login }: GlobalValues = useGlobalContext();

  function handleLogin(values: LoginValues, { setFieldError, setValues }: FormikValues) {
    const userIndex: number | undefined = getPatientIndex(values.email);

    if (userIndex !== undefined && values.password === patients?.[userIndex].password) {
      login(userIndex);
    } else {
      setFieldError('email', 'Invalid email/password combination');
    }

    setValues({ email: '', password: '' })
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