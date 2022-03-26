import { useMemo } from "react";
import Indexer from "../types/Indexer/Indexer";

export default function useIndexer<T>(values: T[], indexFunc: (x: T) => string): IndexFunc<T> {
  const indexer: Indexer<T> = useMemo(() => new Indexer(values, indexFunc), [values]);

  const getValue: IndexFunc<T> = (key: string | undefined) => {
    if (key !== undefined) {
      const i: number | undefined = indexer.getIndex(key);
      return i !== undefined ? values[i] : undefined;
    } else return undefined;
  }

  return getValue;
}

export type IndexFunc<T> = (key: string | undefined) => T | undefined;