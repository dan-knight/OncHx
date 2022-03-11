import { ChemotherapyDetailFields } from "./EventTypes/ChemotherapyDetails";
import { RadiationDetailFields } from "./EventTypes/RadiationDetails";
import { SurgeryDetailFields } from "./EventTypes/SurgeryDetails";
import { BlankDetailFields } from "./EventTypes/BlankDetails";
import { StemCellTransplantDetailFields } from "./EventTypes/StemCellTransplantDetails";

export type EventDetailFields = ChemotherapyDetailFields | RadiationDetailFields | SurgeryDetailFields | StemCellTransplantDetailFields | BlankDetailFields;