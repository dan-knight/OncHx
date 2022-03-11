import React, { ReactNode } from "react";

import { TreatmentTypeName } from "../config/TreatmentTypeName";
import { EventDetailValues } from "../types/PatientEvent/Details/EventDetailValues";

export default function EventDetails(treatmentType: number, details: EventDetailValues) {
  const components: Record<number, JSX.Element> = {
    0: <React.Fragment />,
    1: <React.Fragment />,
    2: <React.Fragment />,
    3: <React.Fragment />
  };

  return components[treatmentType] ?? null;
}