import { Options } from "../../types/Options";
import { Select } from "./FilterSelect";
import TextField from "./TextField";

interface AnyFieldProps {
  name: string,
  label: string,
  filled: boolean,
  options?: Options,
  errors?: string
}

export default function AnyField(props: AnyFieldProps) {
  return (props.options ? 
    <Select name={props.name} options={props.options} label={props.label} /> :
    <TextField name={props.name} filled={props.filled} label={props.label} errors={props.errors} />
  );
}