import React, { useMemo } from "react";
import { FormikValues, useFormikContext } from "formik";

import TextField from "../form/TextField";
import { useGlobalContext } from "../../contexts/GlobalContext"
import { GlobalValues } from "../../types/Global"

import { RadiationDetailFields as RadiationDetailFieldConfig } from "../../types/PatientEvent/Details/EventTypes/RadiationDetails";
import DetailFieldsFactory from "../../types/PatientEvent/Details/DetailFieldsFactory";

import prependDetailFieldName from "./prependDetailFieldName";
import { Select } from "../form/FilterSelect";

export default function RadiationDetailFields() {
  const { config }: GlobalValues = useGlobalContext();
  const { values }: FormikValues = useFormikContext();

  const fields: RadiationDetailFieldConfig = useMemo(() => (
    DetailFieldsFactory.createFields(1) as RadiationDetailFieldConfig
  ), [config]);

  return (
    <React.Fragment>
      <Select 
        name={prependDetailFieldName('location')}
        label={fields.location.label}
        options={fields.location.options}
        displayValue={values.details.location ?? ''}
        filter={fields.location.filter} />
      <TextField name={prependDetailFieldName('grays')} label={fields.grays.label} filled={values.details?.grays} />
      <TextField name={prependDetailFieldName('fractions')} label={fields.fractions.label} filled={values.details?.fractions} />
    </React.Fragment>
  );
}