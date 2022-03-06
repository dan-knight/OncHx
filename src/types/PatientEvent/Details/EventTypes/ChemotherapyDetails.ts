import DropdownField from "../../../Form/Dropdown/DropdownField";
import DropdownOption from "../../../Form/Dropdown/DropdownOption";
import { IEventDetailValues } from "../EventDetailValues";

import ChemotherapyRegimen from "../../../DB/Config/ChemotherapyRegimen";
import TreatmentLocation from "../../../DB/Config/TreatmentLocation";
import JSONChemotherapyRegimenImporter from "../../../DB/JSON/Importer/JSONChemotherapyRegimenImporter";
import JSONTreatmentLocationImporter from "../../../DB/JSON/Importer/JSONTreatmentLocationImporter";

import ChemotherapyRegimens from '../../../../config/chemotherapyRegimens.json';
import TreatmentLocations from '../../../../config/treatmentLocations.json';


export class ChemotherapyDetailFields {
  readonly regimen: Readonly<DropdownField>;
  readonly location: Readonly<DropdownField>;

  constructor() {
    this.regimen = {
        label: 'Regimen',
        filter: true,
        options: function() {
          const importer = new JSONChemotherapyRegimenImporter();
    
          return ChemotherapyRegimens.map((jsonRegimen: any) => {
            const regimen: ChemotherapyRegimen = importer.import(jsonRegimen);
            return new DropdownOption<number>(regimen.id, regimen.regimenName);
          });
        }()
      };

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
  }
}

export class ChemotherapyDetailValues implements IEventDetailValues<ChemotherapyDetailFields> {
  regimen: number | undefined;
  location: number | undefined;

  constructor(regimen?: number, location?: number) {
    this.regimen = regimen;
    this.location = location;
  }
}