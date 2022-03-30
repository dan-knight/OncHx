import React, { useMemo } from "react";
import { FormikValues, useFormikContext } from "formik";

import { Select } from "../form/FilterSelect";
import TextField from "../form/TextField";
import { useGlobalContext } from "../../contexts/GlobalContext";
import { GlobalValues } from "../../types/Global";

import DetailFieldsFactory from "../../types/PatientEvent/Details/DetailFieldsFactory";
import { SurgeryDetailFields as SurgeryDetailFieldConfig } from "../../types/PatientEvent/Details/EventTypes/SurgeryDetails";

import { safelyParseInt } from "../../utility/parseNumber";
import prependDetailFieldName from "./prependDetailFieldName";

export default function SurgeryDetailFields() {
  const { config, getTreatmentLocation }: GlobalValues = useGlobalContext();
  const { values }: FormikValues = useFormikContext();

  const fields: SurgeryDetailFieldConfig = useMemo(() => (
    DetailFieldsFactory.createFields(2) as SurgeryDetailFieldConfig
  ), [config]);

  return (
    <React.Fragment>
      <TextField name={prependDetailFieldName('surgeryType')} label={fields.surgeryType.label} filled={values.details?.surgeryType} /> 
      <Select name={prependDetailFieldName('location')} label={fields.location.label} options={fields.location.options} 
        displayValue={getTreatmentLocation(safelyParseInt(values.details?.location)?.toString())?.locationName ?? ''}
        filter={fields.location.filter} />
      <TextField name={prependDetailFieldName('surgeon')} label={fields.surgeon.label} filled={values.details?.surgeon} />
      <TextField name={prependDetailFieldName('complications')} label={fields.complications.label} filled={values.details?.complications} />
    </React.Fragment>
  );
}