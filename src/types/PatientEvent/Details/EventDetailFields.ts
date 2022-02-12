import { Option, Options } from "../../Options";
import { ChemotherapyDetailFields } from "./EventTypes/ChemotherapyDetails";
import { RadiationDetailFields } from "./EventTypes/RadiationDetails";
import { SurgeryDetailFields } from "./EventTypes/SurgeryDetails";

export type EventDetailFields = ChemotherapyDetailFields | RadiationDetailFields | SurgeryDetailFields;