import DropdownField from "../../../Form/Dropdown/DropdownField";
import DropdownOption from "../../../Form/Dropdown/DropdownOption";
import { IEventDetailValues } from "../EventDetailValues";

import ChemotherapyRegimens from '../../../../config/chemotherapyRegimens.json';
import TreatmentLocations from '../../../../config/treatmentLocations.json';
import StrictJSONImporter from "../../../JSON/StrictJSONImporter";

export class ChemotherapyDetailFields {
  readonly regimen: Readonly<DropdownField>;
  readonly location: Readonly<DropdownField>;

  constructor() {
    const importer = new StrictJSONImporter();

    this.regimen = {
        label: 'Regimen',
        filter: true,
        options: Object.freeze(ChemotherapyRegimens.map((jsonRegimen: any): DropdownOption => {
          const regimen: Record<any, any> = importer.importObject(jsonRegimen);
          
          return new DropdownOption(
            importer.importString(regimen.id), 
            importer.importString(regimen.regimenName
          ));
        }))
      };

    this.location = {
      label: 'Location',
      filter: false,
      options: Object.freeze(TreatmentLocations.map((jsonLocation: any): DropdownOption => {
        const location: Record<any, any> = importer.importObject(jsonLocation);

        return new DropdownOption(
          importer.importString(location.id),
          importer.importString(location.locationName)
        );
      }))
    };
  }
}

export class ChemotherapyDetailValues implements IEventDetailValues<ChemotherapyDetailFields> {
  regimen: string;
  location: string;

  constructor(regimen?: string, location?: string) {
    this.regimen = regimen ?? '';
    this.location = location ?? '';
  }
}