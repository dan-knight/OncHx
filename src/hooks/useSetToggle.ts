import { useState } from "react";

export default function useSetToggle<T>(): [
  Set<T>,
  (value: T) => void,
  (value: Set<T>) => void
] {
  const [values, setValues] = useState<Set<T>>(new Set<T>());

  function toggleValue(value: T) {
    const newValues = new Set<T>(values);

    if (newValues.has(value)) {
      newValues.delete(value);
    } else {
      newValues.add(value);
    }

    setValues(newValues);
  }

  return [values, toggleValue, setValues];
}