import { EventDetailValues } from "../../../types/PatientEvent/Details/EventDetailValues";

export default interface DetailValuesProps<DetailsType extends EventDetailValues> {
  details: DetailsType
}