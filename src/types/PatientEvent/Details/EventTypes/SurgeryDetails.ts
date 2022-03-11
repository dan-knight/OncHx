
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
  surgeon: Field;
  complications: Field;

  constructor() {
    this.location = {
      label: 'Location',
      filter: false,
      options: function() {
        const importer = new JSONTreatmentLocationImporter();
  
        return TreatmentLocations.map((jsonLocation: any) => {
          const location: TreatmentLocation = importer.import(jsonLocation);
          return new DropdownOption<number>(location.id, location.locationName);
        });
      }()
    };

    this.surgeryType = { label: 'Surgery Type' };
    this.surgeon = { label: 'Surgeon Name' };
    this.complications = { label: 'Complications' };
  }
}

export class SurgeryDetailValues implements IEventDetailValues<SurgeryDetailFields> {
  location: number | undefined;
  surgeryType: string;
  surgeon: string;
  complications: string;

  constructor(location?: number, surgeryType?: string, surgeon?: string, complications?: string) {
    this.location = location;
    this.surgeryType = surgeryType ?? '';
    this.surgeon = surgeon ?? '';
    this.complications = complications ?? '';
  }
}