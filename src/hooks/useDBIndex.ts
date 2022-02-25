import { useMemo } from "react";

import DBIndex from "../types/DB/DBIndex";
import DBElement from "../types/DB/DBElement";

export default function useDBIndex<T extends DBElement>(elements: T[]): DBIndexFunc<T> {
  const index: DBIndex<T> = useMemo(() => new DBIndex<T>(elements), [elements]);

  const getElement = (elementID?: number) => elementID !== undefined ? elements[index[elementID]] : undefined;

  return getElement;
}

export type DBIndexFunc<T extends DBElement> = (elementID?: number) => T | undefined;