import { ChemotherapyDetailValues } from "./EventTypes/ChemotherapyDetails";
import { RadiationDetailValues } from "./EventTypes/RadiationDetails";
import { SurgeryDetailValues } from "./EventTypes/SurgeryDetails";

import { TreatmentTypeName } from "../../../config/TreatmentTypeName";
import { EventDetailValues } from "./EventDetailValues";

export default class DetailValuesFactory {
  static createDetails(treatmentType: TreatmentTypeName): EventDetailValues {
    try {
      return {
        chemotherapy: new ChemotherapyDetailValues(),
        radiation: new RadiationDetailValues(),
        surgery: new SurgeryDetailValues()
      }[treatmentType];
    } catch (error) {
      throw new Error('Invalid treatment type');
    }
  }
}