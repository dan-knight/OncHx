import { format } from 'date-fns';

interface DateFilterProps {
  label: string,
  onChange: (value: Date) => void,
  value?: Date
}

export default function DateFilter(props: DateFilterProps) {
  return <span>{props.label}{props.value !== undefined ? `: ${format(props.value, 'M-dd-yyyy')}` : ''}</span>;
}