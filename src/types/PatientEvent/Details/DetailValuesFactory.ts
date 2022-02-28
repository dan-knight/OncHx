import { ChemotherapyDetailValues } from "./EventTypes/ChemotherapyDetails";
import { RadiationDetailValues } from "./EventTypes/RadiationDetails";
import { SurgeryDetailValues } from "./EventTypes/SurgeryDetails";

import { EventDetailValues } from "./EventDetailValues";

type DetailValuesFactoryMethod = (values?: Record<number, any>) => EventDetailValues;

export default class DetailValuesFactory {
  static createDetails(treatmentTypeID: number | undefined, values?: Record<string, any>): EventDetailValues {
    let details: EventDetailValues = {};

    if (treatmentTypeID !== undefined) {
  
      const factoryMethod: DetailValuesFactoryMethod | undefined = {
        0: DetailValuesFactory.createChemotherapyDetails,
        1: DetailValuesFactory.createRadiationDetails,
        2: DetailValuesFactory.createSurgeryDetails
      }[treatmentTypeID];

      if (factoryMethod !== undefined) details = factoryMethod(values);
    }

    return details;
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