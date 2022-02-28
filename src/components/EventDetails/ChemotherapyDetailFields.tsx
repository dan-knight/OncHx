import React, { useMemo } from "react";
import { FormikValues, useFormikContext } from "formik";

import { Select } from "../form/FilterSelect";
import { GlobalValues } from "../../types/Global";
import { useGlobalContext } from "../../contexts/GlobalContext";

import { ChemotherapyDetailFields as ChemotherapyDetailFieldConfig } from "../../types/PatientEvent/Details/EventTypes/ChemotherapyDetails";
import DetailFieldsFactory from "../../types/PatientEvent/Details/DetailFieldsFactory";

export default function ChemotherapyDetailFields() {
  const { config }: GlobalValues = useGlobalContext();
  const { values }: FormikValues = useFormikContext();

  const fields: ChemotherapyDetailFieldConfig = useMemo(() => (
    DetailFieldsFactory.createFields(0) as ChemotherapyDetailFieldConfig
  ), [config]);

  return (
    <React.Fragment>
      <Select name='regimen' label={fields.regimen.label} displayValue={values.regimen ?? ''} 
        options={fields.regimen.options} filter={fields.regimen.filter} />
      <Select name='location' label={fields.location.label} displayValue={values.location ?? ''} 
        options={fields.location.options} filter={fields.location.filter} />
    </React.Fragment>
  );
}