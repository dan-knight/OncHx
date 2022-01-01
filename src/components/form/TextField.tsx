import { Field } from "formik";

interface TextFieldProps {
  name: string,
  label: string
  filled: boolean,
  errors?: string
}

export default function TextField(props: TextFieldProps) {
  return (
    <div>
      <Field name={props.name} id={props.name} autoComplete="off" />
      <label htmlFor={props.name} className={props.filled ? 'filled' : undefined}>
        {props.label}
        {<span className="error">{props.errors}</span>}</label>
    </div>
  )
}