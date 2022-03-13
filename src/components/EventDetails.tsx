import React from "react";

import { EventDetailValues } from "../types/PatientEvent/Details/EventDetailValues";
import { ChemotherapyDetailValues } from "../types/PatientEvent/Details/EventTypes/ChemotherapyDetails";
import DetailValuesWrapper from "./EventDetails/DetailValues/DetailValuesWrapper";
import ChemotherapyDetails from "./EventDetails/DetailValues/EventTypes/ChemotherapyDetails";

interface EventDetailsProps {
  details: EventDetailValues
}

export default function EventDetails(props: EventDetailsProps) {
  let DetailComponent: JSX.Element | undefined = undefined;

  return (
    <DetailValuesWrapper>
      {DetailComponent}
    </DetailValuesWrapper>
  );
}