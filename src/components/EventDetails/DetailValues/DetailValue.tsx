interface DetailValueProps {
  name: string,
  value: string
}

export default function DetailValue(props: DetailValueProps) {
  return (
    <div className='detail'>
      <div>{props.name}</div>
      {props.value}
    </div>
  );
}