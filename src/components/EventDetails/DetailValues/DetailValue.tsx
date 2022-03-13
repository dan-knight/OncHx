interface DetailValueProps {
  name: string,
  value: string
}

export default function DetailValue(props: DetailValueProps) {
  return (
    <span className='detail-value'>
      <span>{props.name}</span>
      {props.value}
    </span>
  );
}