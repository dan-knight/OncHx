import Field from "../../../Form/Field";
import DropdownField from "../../../Form/Dropdown/DropdownField";
import DropdownOption from "../../../Form/Dropdown/DropdownOption";
import { IEventDetailValues } from "../EventDetailValues";

import ChemotherapyRegimen from "../../../DB/Config/ChemotherapyRegimen";
import JSONChemotherapyRegimenImporter from "../../../DB/JSON/Importer/JSONChemotherapyRegimenImporter";

import ChemotherapyRegimens from '../../../../config/chemotherapyRegimens.json';

export class ChemotherapyDetailFields {
  readonly regimen: Readonly<DropdownField>;
  readonly cycle: Readonly<Field>

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

    this.cycle = {
      label: 'Cycle'
    };
  }
}

export class ChemotherapyDetailValues implements IEventDetailValues<ChemotherapyDetailFields> {
  regimen: number | undefined;
  cycle: string | undefined;

  constructor(regimen?: number, cycle?: string) {
    this.regimen = regimen;
    this.cycle = cycle;
  }
}