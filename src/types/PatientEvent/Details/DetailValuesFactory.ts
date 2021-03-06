import { ChemotherapyDetailValues } from "./EventTypes/ChemotherapyDetails";
import { RadiationDetailValues } from "./EventTypes/RadiationDetails";
import { SurgeryDetailValues } from "./EventTypes/SurgeryDetails";

import { EventDetailValues } from "./EventDetailValues";
import { StemCellTransplantDetailValues } from "./EventTypes/StemCellTransplantDetails";

type DetailValuesFactoryMethod = (values?: Record<number, any>) => EventDetailValues;

export default class DetailValuesFactory {
  static createDetails(treatmentTypeID: number | undefined, values?: Record<string, any>): EventDetailValues {
    let details: EventDetailValues = {};

    if (treatmentTypeID !== undefined) {
  
      const factoryMethod: DetailValuesFactoryMethod | undefined = {
        0: DetailValuesFactory.createChemotherapyDetails,
        1: DetailValuesFactory.createRadiationDetails,
        2: DetailValuesFactory.createSurgeryDetails,
        3: DetailValuesFactory.createStemCellTransplantDetails,
      }[treatmentTypeID];

      if (factoryMethod !== undefined) details = factoryMethod(values);
    }

    return details;
  }

  private static createChemotherapyDetails(values?: Record<string, any>): ChemotherapyDetailValues {
    return new ChemotherapyDetailValues(
      DetailValuesFactory.assertNumber(values?.['regimen']),
      DetailValuesFactory.assertString(values?.['cycle'])
    );
  }

  private static createRadiationDetails(values?: Record<string, any>): RadiationDetailValues {
    return new RadiationDetailValues(
      DetailValuesFactory.assertNumber(values?.['location']),
      DetailValuesFactory.assertString(values?.['grays']),
      DetailValuesFactory.assertString(values?.['fractions'])
    );
  }

  private static createSurgeryDetails(values?: Record<string, any>): SurgeryDetailValues {
    return new SurgeryDetailValues(
      DetailValuesFactory.assertNumber(values?.['location']),
      DetailValuesFactory.assertString(values?.['surgeryType']),
      DetailValuesFactory.assertString(values?.['surgeon']),
      DetailValuesFactory.assertString(values?.['complications']),
    );
  }

  private static createStemCellTransplantDetails(values?: Record<string, any>): StemCellTransplantDetailValues {
    return new StemCellTransplantDetailValues(
      DetailValuesFactory.assertString(values?.['physician'])
    );
  }

  private static assertString(value?: any): string | undefined {
    return typeof value === 'string' ? value : undefined;
  }

  private static assertNumber(value?: any): number | undefined {
    return typeof value === 'number' ? value : undefined;
  }
}