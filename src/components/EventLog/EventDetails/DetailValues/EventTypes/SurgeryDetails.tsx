import React from "react";

import DetailValue from "../DetailValue";
import DetailValuesProps from "../DetailValuesProps";
import { useGlobalContext } from "../../../../../contexts/GlobalContext";
import { GlobalValues } from "../../../../../types/Global";

import { SurgeryDetailValues } from "../../../../../types/PatientEvent/Details/EventTypes/SurgeryDetails";

export default function SurgeryDetails(props: DetailValuesProps<SurgeryDetailValues>) {
  const { treatmentLocationIndex }: GlobalValues = useGlobalContext();

  const location: string | undefined = treatmentLocationIndex(props.details.location)?.locationName;

  return (
    <React.Fragment>
      <DetailValue name='Surgery Type' value={props.details.surgeryType} />
      {location !== undefined ? <DetailValue name='Location' value={location} /> : undefined}
      <DetailValue name='Surgeon' value={props.details.surgeon} />
      <DetailValue name='Complications' value={props.details.complications} />
    </React.Fragment>
  );
}