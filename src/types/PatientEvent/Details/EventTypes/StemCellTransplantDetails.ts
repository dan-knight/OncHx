import Field from "../../../Form/Field";
import { IEventDetailValues } from "../EventDetailValues";

export class StemCellTransplantDetailFields {
  physician: Field;

  constructor() {
    this.physician = { label: 'Physician' };
  }
}

export class StemCellTransplantDetailValues implements IEventDetailValues<StemCellTransplantDetailFields> {
  physician: string;

  constructor(physician?: string) {
    this.physician = physician ?? '';
  }
}