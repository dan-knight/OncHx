import { useState } from "react";

export default function useExpand() {
  const [expanded, setExpanded] = useState(new Set())
  function showHide(eventID) {
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