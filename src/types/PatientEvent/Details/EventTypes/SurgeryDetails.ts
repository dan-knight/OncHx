
import DropdownField from "../../../Form/Dropdown/DropdownField";
import Field from "../../../Form/Field";
import DropdownOption from "../../../Form/Dropdown/DropdownOption";
import { IEventDetailValues } from "../EventDetailValues";

import TreatmentLocations from '../../../../config/treatmentLocations.json';
import StrictJSONImporter from "../../../DB/JSON/Importer/StrictJSONImporter";

export class SurgeryDetailFields {
  location: DropdownField;
  surgeryType: Field;
  complications: Field;

  constructor() {
    this.location = {
      label: 'Location',
      filter: false,
      options: Object.freeze(TreatmentLocations.map((jsonLocation: any): DropdownOption => {
        const location: Record<any, any> = StrictJSONImporter.importObject(jsonLocation);

        return new DropdownOption(
          StrictJSONImporter.importString(location.id), 
          StrictJSONImporter.importString(location.locationName)
        );
      }))
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