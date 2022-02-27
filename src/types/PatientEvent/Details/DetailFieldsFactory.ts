import { DetailField } from "./DetailField";
import { EventDetailFields } from "./EventDetailFields";

export default class DetailFieldsFactory {
  static createFields(treatmentTypeDetailFields: ConfigDetailFields): EventDetailFields {
    // TODO Temporary implementation. This should check values and instantiate specific subclass implementations.
    return treatmentTypeDetailFields as unknown as EventDetailFields;
  }
}

// Utility type only used for cleaning JSON input
type ConfigDetailFields = Record<string, DetailField>;