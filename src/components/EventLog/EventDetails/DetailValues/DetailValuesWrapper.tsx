import { ReactNode } from "react";

interface DetailValuesWrapperProps {
  show: boolean,
  children?: ReactNode | ReactNode[];
}

export default function DetailValuesWrapper(props: DetailValuesWrapperProps) {
  return (
    <div className={!props.show ? 'hidden' : undefined}>
        {props.children}
    </div>
  );
}