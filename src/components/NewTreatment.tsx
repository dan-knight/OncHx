import React, { useMemo } from "react";
import { FormikValues, useFormikContext } from "formik";

import { FilterSelect, Select } from "./form/FilterSelect";

import { range } from "../utility";
import { Month } from "../types/Date";
import { GlobalValues } from "../types/Global";
import { useGlobalContext } from "../contexts/GlobalContext";
import TextField from "./form/TextField";
import DetailFields from "./DetailFields";
import CancerType from "../types/DB/Config/CancerType";
import DropdownOption from "../types/Form/Dropdown/DropdownOption";
import TreatmentType from "../types/DB/Config/TreatmentType";
import { EventDetailFields } from "../types/PatientEvent/Details/EventDetailFields";
import DetailFieldsFactory from "../types/PatientEvent/Details/DetailFieldsFactory";
import safelyParseInt from "../utility/safelyParseInt";

export default function NewTreatment() {
  const { values }: FormikValues = useFormikContext();
  const { config, cancerTypeIndex, treatmentTypeIndex }: GlobalValues = useGlobalContext();

  const months = useMemo((): Month[] => ([
    { name: 'January', days: 31 },
    { name: 'February', days: 28 },
    { name: 'March', days: 31 },
    { name: 'April', days: 30 },
    { name: 'May', days: 31 },
    { name: 'June', days: 30 },
    { name: 'July', days: 31 },
    { name: 'August', days: 31 },
    { name: 'September', days: 30 },
    { name: 'October', days: 31 },
    { name: 'November', days: 30 },
    { name: 'December', days: 31 }
  ]), []);

  const monthOptions: DropdownOption[] = useMemo(() => (
    months.map((month: Month, index: number) => new DropdownOption(index.toString(), month.name))
  ), [months]);

  const dayOptions: DropdownOption[] = useMemo(() => (
    range(1, months[values.month].days).map((d: number) => new DropdownOption(d.toString()))
  ), [values.month]);
  
  const cancerTypeOptions: DropdownOption[] = useMemo(() => (
    config.cancerTypes.map((c: CancerType) => new DropdownOption(c.id.toString(), c.cancerName))
  ), [config.cancerTypes]);

  const treatmentTypeOptions: DropdownOption[] = useMemo(() => (
    config.treatmentTypes.map((t: TreatmentType) => new DropdownOption(t.id.toString(), t.treatmentName))
  ), [config.treatmentTypes]);

  const detailFields: EventDetailFields = useMemo(() => {
    let treatmentTypeID: number | undefined;
    
    try {
      treatmentTypeID = safelyParseInt(values.treatmentType);
    } catch (error) {
      treatmentTypeID = undefined;
    }

    return DetailFieldsFactory.createFields(safelyParseInt(values.treatmentType));
  }, [values.treatmentType]);

  return (
    <React.Fragment>
      <FilterSelect name='cancerType' label='Cancer Type' options={cancerTypeOptions} 
        displayValue={cancerTypeIndex(values.cancerType)?.cancerName ?? ''} />
      <Select name='month' options={monthOptions} label='Month' displayValue={values.month} />
      <Select name='day' label='Day' options={dayOptions} displayValue={values.day} />
      <TextField name='year' filled={Boolean(values.year)} label='Year' />
      <Select name='treatmentType' label='Treatment Type' options={treatmentTypeOptions} 
        displayValue={treatmentTypeIndex(values.treatmentType)?.treatmentName ?? ''} />
      {values.treatmentType ? <DetailFields fields={detailFields} /> : undefined}
      <TextField name='notes' filled={Boolean(values.notes)} label='Notes' />
      <div className='button'>
        <button type='submit'>Add Treatment</button>
      </div>
    </React.Fragment>
  );
}