import { Field } from "formik";
import FieldProps from "./FieldProps";

export default function DateField(props: FieldProps) {
  return (
    <div>
      <Field type='date' name={props.name} id={props.name} autoComplete="off" />
      <label htmlFor={props.name} className='filled'>
        {props.label}
        {<span className="error">{props.errors}</span>}
      </label>
    </div>
  )
}