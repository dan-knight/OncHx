import { createContext, ReactNode, useContext, useMemo } from "react";
import { GlobalValues } from "../types/Global";

import TreatmentTypes from '../config/treatmentTypes.json';
import CancerTypes from "../config/cancerTypes.json";

const GlobalContext = createContext<GlobalValues | null>(null);

export function GlobalContextProvider(props: { children?: ReactNode | ReactNode[] }) {
  return (
    <GlobalContext.Provider value={{
      treatmentTypes: TreatmentTypes,
      cancerTypes: CancerTypes
    }}>
      {props.children}
    </GlobalContext.Provider>
  )
}

export function useGlobalContext(): GlobalValues {
  const values: GlobalValues | null = useContext(GlobalContext);

  if (values !== null) {
    return values;
  } else {
    throw 'Invalid global context'
  }
} 