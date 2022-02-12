import { Field } from "../../../Field";
import { Option } from "../../../Options";
import { EventDetailFields } from "../EventDetailFields";
import EventDetailValues from "../EventDetailValues";

export class ChemotherapyDetailFields implements EventDetailFields {
  [key: string]: Field;
  regimen: Field;

  constructor() {
    const r: Option = { label: 'Regimen' };
    this.regimen = r;
  }
}

export class ChemotherapyDetailValues implements EventDetailValues {
  [key: string]: any;
  regimen: string;

  constructor() {
    this.regimen = '';
  }
}