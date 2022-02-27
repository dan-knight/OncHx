import React, { ReactNode } from "react";

import { TreatmentTypeName } from "../config/TreatmentTypeName";
import { EventDetailValues } from "../types/PatientEvent/Details/EventDetailValues";

export default function EventDetails(treatmentType: TreatmentTypeName, details: EventDetailValues) {
  const components: Record<TreatmentTypeName, JSX.Element> = {
    chemotherapy: <React.Fragment />,
    radiation: <React.Fragment />,
    surgery: <React.Fragment />
  };

  return components[treatmentType] ?? null;
}