import { format } from 'date-fns';

interface DateFilterProps {
  label: string,
  onChange: (value: Date) => void,
  value?: Date
}

export default function DateFilter(props: DateFilterProps) {
  return (
    <span>
      <div>{props.label}</div>
      {props.value !== undefined ? `${format(props.value, 'M-dd-yyyy')}` : 'None'}
    </span>
  );
}