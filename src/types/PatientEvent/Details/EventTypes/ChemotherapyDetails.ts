import DropdownField from "../../../Form/Dropdown/DropdownField";
import DropdownOption from "../../../Form/Dropdown/DropdownOption";
import { IEventDetailValues } from "../EventDetailValues";

import ChemotherapyRegimens from '../../../../config/chemotherapyRegimens.json';
import TreatmentLocations from '../../../../config/treatmentLocations.json';

export class ChemotherapyDetailFields {
  readonly regimen: Readonly<DropdownField>;
  readonly location: Readonly<DropdownField>;

  constructor() {
    this.regimen = {
        label: 'Regimen',
        filter: true,
        options: Object.freeze(ChemotherapyRegimens.map((regimen: Record<string, string>): DropdownOption => (
          new DropdownOption(regimen.id, regimen.regimenName)
        )))
      };

    this.location = {
      label: 'Location',
      filter: false,
      options: Object.freeze(TreatmentLocations.map((location: Record<string, string>): DropdownOption => (
        new DropdownOption(location.id, location.locationName)
      )))
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