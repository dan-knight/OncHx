import React, { useMemo } from "react";
import { FormikValues, useFormikContext } from "formik";

import TextField from "../../form/TextField";
import { useGlobalContext } from "../../../contexts/GlobalContext"
import { GlobalValues } from "../../../types/Global"

import { StemCellTransplantDetailFields as StemCellTransplantDetailFieldConfig } from "../../../types/PatientEvent/Details/EventTypes/StemCellTransplantDetails";
import DetailFieldsFactory from "../../../types/PatientEvent/Details/DetailFieldsFactory";

import prependDetailFieldName from "./prependDetailFieldName";

export default function StemCellTransplantDetailFields() {
  const { config }: GlobalValues = useGlobalContext();
  const { values }: FormikValues = useFormikContext();

  const fields: StemCellTransplantDetailFieldConfig = useMemo(() => (
    DetailFieldsFactory.createFields(3) as StemCellTransplantDetailFieldConfig
  ), [config]);

  return (
    <React.Fragment>
      <TextField name={prependDetailFieldName('physician')} label={fields.physician.label} filled={values.details?.physician} />
    </React.Fragment>
  );
}