import React, { useMemo } from "react";
import { FormikValues, useFormikContext } from "formik";

import { Select } from "../form/FilterSelect";
import { GlobalValues } from "../../types/Global";
import { useGlobalContext } from "../../contexts/GlobalContext";

import { ChemotherapyDetailFields as ChemotherapyDetailFieldConfig } from "../../types/PatientEvent/Details/EventTypes/ChemotherapyDetails";
import DetailFieldsFactory from "../../types/PatientEvent/Details/DetailFieldsFactory";

import { safelyParseInt } from "../../utility/parseNumber";
import prependDetailFieldName from "./prependDetailFieldName";

export default function ChemotherapyDetailFields() {
  const { config, chemotherapyRegimenIndex, treatmentLocationIndex }: GlobalValues = useGlobalContext();
  const { values }: FormikValues = useFormikContext();

  const fields: ChemotherapyDetailFieldConfig = useMemo(() => (
    DetailFieldsFactory.createFields(0) as ChemotherapyDetailFieldConfig
  ), [config]);

  return (
    <React.Fragment>
      <Select name={prependDetailFieldName('regimen')} label={fields.regimen.label} 
        displayValue={chemotherapyRegimenIndex(safelyParseInt(values.details?.regimen))?.regimenName ?? ''} 
        options={fields.regimen.options} filter={fields.regimen.filter} />
      <Select name={prependDetailFieldName('location')} label={fields.location.label} 
        displayValue={treatmentLocationIndex(safelyParseInt(values.details?.location))?.locationName ?? ''} 
        options={fields.location.options} filter={fields.location.filter} />
    </React.Fragment>
  );
}