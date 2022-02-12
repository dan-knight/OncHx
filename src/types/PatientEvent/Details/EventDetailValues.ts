import { EventDetailFields } from "./EventDetailFields";
import { ChemotherapyDetailValues } from "./EventTypes/ChemotherapyDetails";
import { RadiationDetailValues } from "./EventTypes/RadiationDetails";
import { SurgeryDetailValues } from "./EventTypes/SurgeryDetails";

export type EventDetailValues = ChemotherapyDetailValues | RadiationDetailValues | SurgeryDetailValues;

export type IEventDetailValues<FieldType extends EventDetailFields> = {
  [Key in keyof FieldType]: any;
}