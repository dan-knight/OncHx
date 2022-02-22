
import DropdownField from "../../../Form/Dropdown/DropdownField";
import Field from "../../../Form/Field";
import DropdownOption from "../../../Form/Dropdown/DropdownOption";
import { IEventDetailValues } from "../EventDetailValues";

import TreatmentLocation from "../../../DB/Config/TreatmentLocation";
import JSONTreatmentLocationImporter from "../../../DB/JSON/Importer/JSONTreatmentLocationImporter";

import TreatmentLocations from '../../../../config/treatmentLocations.json';

export class SurgeryDetailFields {
  location: DropdownField;
  surgeryType: Field;
  complications: Field;

  constructor() {
    this.location = {
      label: 'Location',
      filter: false,
      options: Object.freeze(function() {
        const importer = new JSONTreatmentLocationImporter();
  
        return TreatmentLocations.map((jsonLocation: any) => {
          const location: TreatmentLocation = importer.import(jsonLocation);
          return new DropdownOption(location.id.toString(), location.locationName);
        });
      }())
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