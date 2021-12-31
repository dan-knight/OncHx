import { FormikValues, useFormikContext } from "formik";
import React from "react";
import { Field, Fields } from "../types/Field";
import { Options } from "../types/Options";
import AnyField from "./form/AnyField";

interface DetailFieldsProps {
  fields: Fields
}

export default function DetailFields(props: DetailFieldsProps) {
  const { values, errors }: FormikValues = useFormikContext();

  return (
    <React.Fragment>
      {Object.entries(props.fields).map(([name, field]: [string, Field]) => (
        <AnyField name={name} label={field.label ?? ''} options={(field as Options).options ? (field as Options) : undefined} 
          filled={Boolean(values[name])} errors={errors[name]} key={name} />
      ))}
    </React.Fragment>
  )
}