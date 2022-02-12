import { DetailField } from "./DetailField";
import { EventDetailFields } from "./EventDetailFields";

export default class DetailFieldsFactory {
  static createFields(treatmentTypeDetailFields: ConfigDetailFields): EventDetailFields {
    return treatmentTypeDetailFields as EventDetailFields;
  }
}

type ConfigDetailFields = Record<string, DetailField>