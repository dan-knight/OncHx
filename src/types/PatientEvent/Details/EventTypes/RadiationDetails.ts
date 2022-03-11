import DropdownField from "../../../Form/Dropdown/DropdownField";
import DropdownOption from "../../../Form/Dropdown/DropdownOption";
import Field from "../../../Form/Field";
import { IEventDetailValues } from "../EventDetailValues";

import JSONTreatmentLocationImporter from "../../../DB/JSON/Importer/JSONTreatmentLocationImporter";
import TreatmentLocations from '../../../../config/treatmentLocations.json';
import TreatmentLocation from "../../../DB/Config/TreatmentLocation";

export class RadiationDetailFields {
  location: DropdownField;
  grays: Field;
  fractions: Field;

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

    this.grays = { label: 'Grays' };
    this.fractions = { label: 'Fractions' };
  }
}

export class RadiationDetailValues implements IEventDetailValues<RadiationDetailFields> {
  grays: string;
  fractions: string;
  location: number | undefined;

  constructor(location?: number, grays?: string, fractions?: string) {
    this.location = location;
    this.grays = grays ?? '';
    this.fractions = fractions ?? '';
  }
}