import React, { useMemo } from "react";
import { FormikValues, useFormikContext } from "formik";

import { useGlobalContext } from "../../contexts/GlobalContext"
import { GlobalValues } from "../../types/Global"
import { RadiationDetailFields as RadiationDetailFieldConfig } from "../../types/PatientEvent/Details/EventTypes/RadiationDetails";
import DetailFieldsFactory from "../../types/PatientEvent/Details/DetailFieldsFactory";
import TextField from "../form/TextField";

export default function RadiationDetailFields() {
  const { config }: GlobalValues = useGlobalContext();
  const { values }: FormikValues = useFormikContext();

  const fields: RadiationDetailFieldConfig = useMemo(() => (
    DetailFieldsFactory.createFields(1) as RadiationDetailFieldConfig
  ), [config]);

  return (
    <React.Fragment>
      <TextField name='grays' label={fields.grays.label} filled={values.grays} />
      <TextField name='fractions' label={fields.fractions.label} filled={values.fractions} />
    </React.Fragment>
  );
}