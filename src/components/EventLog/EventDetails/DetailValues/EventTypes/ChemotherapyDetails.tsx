import DetailValue from "../DetailValue";
import DetailValuesProps from "../DetailValuesProps";

import { ChemotherapyDetailValues } from "../../../../../types/PatientEvent/Details/EventTypes/ChemotherapyDetails";
import React from "react";

export default function ChemotherapyDetails(props: DetailValuesProps<ChemotherapyDetailValues>) {
  return (
    <React.Fragment>
      {props.details.regimen ? <DetailValue name='Regimen' value={props.details.regimen.toString()} /> : undefined} 
      {props.details.cycle ? <DetailValue name='Cycle' value={props.details.cycle.toString()} /> : undefined}
    </React.Fragment>
  );
}