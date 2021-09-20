import { Formik, Form, Field } from "formik";
import * as Yup from 'yup';

const treatmentSchema = Yup.object().shape({
  username: Yup.string().required('Required'),
  password: Yup.string().required('Required')
});

export default function Login({ onSubmit }) {
  return (
    <div className='form'>
      <h3>Login</h3>
      <Formik
        initialValues={{
          username: '',
          password: ''}}
        onSubmit={onSubmit}
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