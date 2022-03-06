import { Field } from "formik";
import FieldLabel from "./FieldLabel";
import FieldProps from "./FieldProps";

export default function DateField(props: FieldProps) {
  return (
    <div>
      <Field type='date' name={props.name} id={props.name} autoComplete="off" />
      <FieldLabel {...props} filled={true} />
    </div>
  )
}