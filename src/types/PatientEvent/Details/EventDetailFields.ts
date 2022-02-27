import { ChemotherapyDetailFields } from "./EventTypes/ChemotherapyDetails";
import { RadiationDetailFields } from "./EventTypes/RadiationDetails";
import { SurgeryDetailFields } from "./EventTypes/SurgeryDetails";
import { BlankDetailFields } from "./EventTypes/BlankDetails";

export type EventDetailFields = ChemotherapyDetailFields | RadiationDetailFields | SurgeryDetailFields | BlankDetailFields;