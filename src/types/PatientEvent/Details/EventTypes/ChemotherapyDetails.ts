import { DetailField } from "../DetailField";
import { Options } from "../../../Options";
import { IEventDetailValues } from "../EventDetailValues";

export class ChemotherapyDetailFields {
  regimen: DetailField;
  location: DetailField;

  constructor(regimen: Options, location: Options) {
    this.regimen = regimen;
    this.location = location;
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