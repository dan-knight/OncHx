import TreatmentType from "../../DB/Config/TreatmentType";
import { DetailField } from "./DetailField";
import { EventDetailFields } from "./EventDetailFields";
import { ChemotherapyDetailFields } from "./EventTypes/ChemotherapyDetails";
import { RadiationDetailFields } from "./EventTypes/RadiationDetails";

type GConstructor<T extends {}> = new (...args: any[]) => T;

export default class DetailFieldsFactory {
  private static readonly treatmentTypes: Record<number, GConstructor<EventDetailFields>> = {
    0: ChemotherapyDetailFields,
    1: RadiationDetailFields,
    2: ChemotherapyDetailFields
  };

  static createFields(treatmentTypeID?: number): EventDetailFields {
    const DetailFieldType: GConstructor<EventDetailFields> | undefined = treatmentTypeID !== undefined ? 
      DetailFieldsFactory.treatmentTypes[treatmentTypeID] : undefined;
    
    return DetailFieldType !== undefined ? new DetailFieldType() : {};
  }
}