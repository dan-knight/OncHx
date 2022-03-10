interface AvatarProps {
  firstName: string,
  lastName: string
}

export default function Avatar(props: AvatarProps) {
  return (
    <div className='user-avatar'>
      <span>{props.firstName.charAt(0).toUpperCase() + props.lastName.charAt(0).toUpperCase()}</span>
    </div>
  );
}