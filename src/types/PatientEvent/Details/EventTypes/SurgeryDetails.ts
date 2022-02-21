
import DropdownField from "../../../Form/Dropdown/DropdownField";
import Field from "../../../Form/Field";
import DropdownOption from "../../../Form/Dropdown/DropdownOption";
import { IEventDetailValues } from "../EventDetailValues";

import TreatmentLocations from '../../../../config/treatmentLocations.json';

export class SurgeryDetailFields {
  location: DropdownField;
  surgeryType: Field;
  complications: Field;

  constructor() {
    this.location = {
      label: 'Location',
      filter: false,
      options: Object.freeze(TreatmentLocations.map((location: Record<string, string>) => (
        new DropdownOption(location.id, location.locationName)
      )))
    };

    this.surgeryType = { label: 'Surgery Type' };
    this.complications = { label: 'Complications' };
  }
}

export class SurgeryDetailValues implements IEventDetailValues<SurgeryDetailFields> {
  location: string;
  surgeryType: string;
  complications: string;

  constructor(location?: string, surgeryType?: string, complications?: string) {
    this.location = location ?? '';
    this.surgeryType = surgeryType ?? '';
    this.complications = complications ?? '';
  }
}