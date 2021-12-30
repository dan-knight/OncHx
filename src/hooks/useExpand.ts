import { useState } from "react";

export default function useExpand():
[Set<number>, (eventID: number) => void] {
  const [expanded, setExpanded] = useState(new Set<number>());
  
  function showHide(eventID: number) {
    const newExpanded = new Set(expanded);

    if (newExpanded.has(eventID)) {
      newExpanded.delete(eventID);
    } else {
      newExpanded.add(eventID);
    }

    setExpanded(newExpanded);
  };

  return [expanded, showHide]
}