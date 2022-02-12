import { Field } from "../../../Field";
import { Option } from "../../../Options";
import { EventDetailFields } from "../EventDetailFields";
import EventDetailValues from "../EventDetailValues";

export class SurgeryDetailFields implements EventDetailFields {
  [key: string]: Field;
  regimen: Field;

  constructor() {
    const r: Option = { label: 'Regimen' };
    this.regimen = r;
  }
}

export class SurgeryDetailValues implements EventDetailValues {
  [key: string]: any;
  regimen: string;

  constructor() {
    this.regimen = '';
  }
}