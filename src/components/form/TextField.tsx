import { Field } from "formik";
import FieldLabel from "./FieldLabel";
import FieldProps from "./FieldProps";

interface TextFieldProps extends FieldProps {
  filled?: boolean;
  type?: 'password';
}

export default function TextField(props: TextFieldProps) {
  return (
    <div>
      <Field name={props.name} id={props.name} type={props.type} autoComplete="off" />
      <FieldLabel {...props} />
    </div>
  )
}