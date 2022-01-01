import { Options } from "../../types/Options";
import { FilterSelect, Select } from "./FilterSelect";
import TextField from "./TextField";

interface AnyFieldProps {
  name: string,
  label: string,
  filled: boolean,
  filter?: boolean,
  options?: Options,
  errors?: string
}

export default function AnyField(props: AnyFieldProps) {
  if (props.options) {
    return props.filter ? <FilterSelect name={props.name} options={props.options} label={props.label} /> :
    <Select name={props.name} options={props.options} label={props.label} />
  } else {
    return <TextField name={props.name} filled={props.filled} label={props.label} errors={props.errors} />
  }
}