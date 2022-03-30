import React, { useMemo } from "react";
import { FormikValues, useFormikContext } from "formik";

import { Select } from "../form/FilterSelect";
import { GlobalValues } from "../../types/Global";
import { useGlobalContext } from "../../contexts/GlobalContext";

import { ChemotherapyDetailFields as ChemotherapyDetailFieldConfig } from "../../types/PatientEvent/Details/EventTypes/ChemotherapyDetails";
import DetailFieldsFactory from "../../types/PatientEvent/Details/DetailFieldsFactory";

import { safelyParseInt } from "../../utility/parseNumber";
import prependDetailFieldName from "./prependDetailFieldName";
import TextField from "../form/TextField";

export default function ChemotherapyDetailFields() {
  const { config, getChemotherapyRegimen }: GlobalValues = useGlobalContext();
  const { values }: FormikValues = useFormikContext();

  const fields: ChemotherapyDetailFieldConfig = useMemo(() => (
    DetailFieldsFactory.createFields(0) as ChemotherapyDetailFieldConfig
  ), [config]);

  return (
    <React.Fragment>
      <Select name={prependDetailFieldName('regimen')} label={fields.regimen.label} 
        displayValue={getChemotherapyRegimen(safelyParseInt(values.details?.regimen)?.toString())?.regimenName ?? ''} 
        options={fields.regimen.options} filter={fields.regimen.filter} />
      <TextField name={prependDetailFieldName('cycle')} label={fields.cycle.label} filled={Boolean(values.details.cycle)} />
    </React.Fragment>
  );
}