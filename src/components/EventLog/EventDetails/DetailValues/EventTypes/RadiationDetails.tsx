import React from "react";

import DetailValue from "../DetailValue";
import DetailValuesProps from "../DetailValuesProps";
import { useGlobalContext } from "../../../../../contexts/GlobalContext";
import { GlobalValues } from "../../../../../types/Global";

import { RadiationDetailValues } from "../../../../../types/PatientEvent/Details/EventTypes/RadiationDetails";

export default function RadiationDetails(props: DetailValuesProps<RadiationDetailValues>) {
  const { getTreatmentLocation }: GlobalValues = useGlobalContext();

  const locationName: string | undefined = getTreatmentLocation(props.details.location?.toString())?.locationName;

  return (
    <React.Fragment>
      <DetailValue name='Fractions' value={props.details.fractions} />
      <DetailValue name='Grays' value={props.details.grays} />
      {locationName !== undefined ? <DetailValue name='Location' value={locationName} /> : undefined}
    </React.Fragment>
  );
}