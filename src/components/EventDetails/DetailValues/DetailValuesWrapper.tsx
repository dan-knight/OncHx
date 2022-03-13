import { ReactNode, useState } from "react";

interface DetailValuesWrapperProps {
  children?: ReactNode | ReactNode[];
}

export default function DetailValuesWrapper(props: DetailValuesWrapperProps) { 
  const [show, setShow] = useState<boolean>(false);
  
  function toggleShow() {
    setShow(!show);
  }

  return (
    <div>
      <h6>Details <span onClick={toggleShow}>{`(${show ? 'Hide' : 'Show'})`}</span></h6>
      <div className={!show ? 'hidden' : undefined }>
        {props.children}
      </div>
    </div>
  );
}