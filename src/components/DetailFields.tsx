import { FormikValues, useFormikContext } from "formik";
import React from "react";
import { Options } from "../types/Options";
import AnyField from "./form/AnyField";

import Field from '../types/Form/Field';
import DropdownField from "../types/Form/Dropdown/DropdownField";
import { EventDetailFields } from "../types/PatientEvent/Details/EventDetailFields";

interface DetailFieldsProps {
  fields: EventDetailFields
}

export default function DetailFields(props: DetailFieldsProps) {
  const { values, errors }: FormikValues = useFormikContext();

  return (
    <React.Fragment>
      {Object.entries(props.fields).map(([name, field]: [string, Field]) => (
        <AnyField name={name} label={field.label ?? ''} options={(field as DropdownField).options} 
          filled={Boolean(values[name])} errors={errors[name]} key={name} filter={(field as DropdownField).filter} />
      ))}
    </React.Fragment>
  )
}