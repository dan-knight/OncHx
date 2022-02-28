import { GenericConstructor } from "../../utility/Constructor";
import { EventDetailFields } from "./EventDetailFields";
import { ChemotherapyDetailFields } from "./EventTypes/ChemotherapyDetails";
import { RadiationDetailFields } from "./EventTypes/RadiationDetails";

export default class DetailFieldsFactory {
  private static readonly treatmentTypes: Record<number, GenericConstructor<EventDetailFields>> = {
    0: ChemotherapyDetailFields,
    1: RadiationDetailFields,
    2: ChemotherapyDetailFields
  };

  static createFields(treatmentTypeID?: number): EventDetailFields {
    const DetailFieldType: GenericConstructor<EventDetailFields> | undefined = treatmentTypeID !== undefined ? 
      DetailFieldsFactory.treatmentTypes[treatmentTypeID] : undefined;
    
    return DetailFieldType !== undefined ? new DetailFieldType() : {};
  }
}