import FieldProps from "./FieldProps";

interface FieldLabelProps extends FieldProps {
  filled?: boolean;
  onClick?: () => void;
}

export default function FieldLabel(props: FieldLabelProps) {
  return (
    <label htmlFor={props.name} className={props.filled ? 'filled' : undefined} onClick={props.onClick}>
      {props.label}
      {props.touched && Boolean(props.errors) ? <span className="error">{props.errors}</span> : undefined}
    </label>
  );
}