import React from "react";

import DetailValue from "../DetailValue";
import DetailValuesProps from "../DetailValuesProps";

import { StemCellTransplantDetailValues } from "../../../../types/PatientEvent/Details/EventTypes/StemCellTransplantDetails";

export default function StemCellTransplantDetails(props: DetailValuesProps<StemCellTransplantDetailValues>) {
  return (
    <React.Fragment>
      <DetailValue name='Physician' value={props.details.physician} />
    </React.Fragment>
  );
}