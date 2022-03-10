import { Formik, Form, Field, FormikValues } from "formik";
import * as Yup from 'yup';
import { useGlobalContext } from "../contexts/GlobalContext";
import { GlobalValues } from "../types/Global";
import { safelyParseInt } from "../utility/parseNumber";

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
        {({ errors }) => (
          <Form>
            <div>
              <label>
                Username
                {<span className="error">{errors.username}</span>}
              </label>
              <Field name='username' />
            </div>
            <div>
              <label>
                Password
                {<span className="error">{errors.password}</span>}
              </label>
              <Field name='password' type='password' />
            </div>
            <div className='button'>
              <button type='submit'>Add Treatment</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};