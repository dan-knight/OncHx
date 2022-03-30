import { useMemo } from "react";
import Indexer from "../types/Indexer/Indexer";

export default function useIndexer<T>(values: T[], indexFunc: (x: T) => string): [
  (key: string | undefined) => T | undefined,
  (key: string | undefined) => number | undefined
] {
  const indexer: Indexer<T> = useMemo(() => new Indexer(values, indexFunc), [values]);

  const getIndex: GetIndexFunc = (key: string | undefined) => (
    key !== undefined ? indexer.getIndex(key) : undefined
  );

  const getValue: GetValueFunc<T> = (key: string | undefined) => {
    const i: number | undefined = getIndex(key);
    return i !== undefined ? values[i] : undefined;
  }

  return [getValue, getIndex];
}

export type GetIndexFunc = (key: string | undefined) => number | undefined;
export type GetValueFunc<T> = (key: string | undefined) => T | undefined;