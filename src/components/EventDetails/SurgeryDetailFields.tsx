import React, { useMemo } from "react";
import { FormikValues, useFormikContext } from "formik";

import { useGlobalContext } from "../../contexts/GlobalContext";
import { GlobalValues } from "../../types/Global";

import DetailFieldsFactory from "../../types/PatientEvent/Details/DetailFieldsFactory";
import { Select } from "../form/FilterSelect";
import { SurgeryDetailFields as SurgeryDetailFieldConfig } from "../../types/PatientEvent/Details/EventTypes/SurgeryDetails";
import TextField from "../form/TextField";
import { safelyParseInt } from "../../utility/parseNumber";

export default function SurgeryDetailFields() {
  const { config, treatmentLocationIndex }: GlobalValues = useGlobalContext();
  const { values }: FormikValues = useFormikContext();

  const fields: SurgeryDetailFieldConfig = useMemo(() => (
    DetailFieldsFactory.createFields(2) as SurgeryDetailFieldConfig
  ), [config]);

  return (
    <React.Fragment>
      <TextField name='surgeryType' label={fields.surgeryType.label} filled={values.surgeryType} /> 
      <Select name='location' label={fields.location.label} options={fields.location.options} 
        displayValue={treatmentLocationIndex(safelyParseInt(values.location))?.locationName ?? ''}
        filter={fields.location.filter} />
      <TextField name='complications' label={fields.complications.label} filled={values.complications} />
    </React.Fragment>
  );
}