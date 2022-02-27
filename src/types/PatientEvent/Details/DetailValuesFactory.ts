import { ChemotherapyDetailValues } from "./EventTypes/ChemotherapyDetails";
import { RadiationDetailValues } from "./EventTypes/RadiationDetails";
import { SurgeryDetailValues } from "./EventTypes/SurgeryDetails";

import { TreatmentTypeName } from "../../../config/TreatmentTypeName";
import { EventDetailValues } from "./EventDetailValues";

export default class DetailValuesFactory {
  static createDetails(treatmentType: TreatmentTypeName, values?: Record<string, any>): EventDetailValues {
      const factoryMethod: (values?: Record<string, any>) => EventDetailValues = {
        chemotherapy: DetailValuesFactory.createChemotherapyDetails,
        radiation: DetailValuesFactory.createRadiationDetails,
        surgery: DetailValuesFactory.createSurgeryDetails
      }[treatmentType];

      return factoryMethod !== undefined ? factoryMethod(values) : {};
  }

  private static createChemotherapyDetails(values?: Record<string, any>): ChemotherapyDetailValues {
    return new ChemotherapyDetailValues(
      DetailValuesFactory.assertString(values?.['regimen']),
      DetailValuesFactory.assertString(values?.['location'])
    );
  }

  private static createRadiationDetails(values?: Record<string, any>): RadiationDetailValues {
    return new RadiationDetailValues(
      DetailValuesFactory.assertString(values?.['grays']),
      DetailValuesFactory.assertString(values?.['fractions'])
    );
  }

  private static createSurgeryDetails(values?: Record<string, any>): SurgeryDetailValues {
    return new SurgeryDetailValues(
      DetailValuesFactory.assertString(values?.['location']),
      DetailValuesFactory.assertString(values?.['surgeryType']),
      DetailValuesFactory.assertString(values?.['complications']),
    );
  }

  private static assertString(value?: any) {
    return typeof value === 'string' ? value : undefined;
  }
}