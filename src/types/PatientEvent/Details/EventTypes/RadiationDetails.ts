import Field from "../../../Form/Field";
import { IEventDetailValues } from "../EventDetailValues";

export class RadiationDetailFields {
  grays: Field;
  fractions: Field;

  constructor() {
    this.grays = { label: 'Grays' };
    this.fractions = { label: 'Fractions' };
  }
}

export class RadiationDetailValues implements IEventDetailValues<RadiationDetailFields> {
  grays: string;
  fractions: string;

  constructor(grays?: string, fractions?: string) {
    this.grays = grays ?? '';
    this.fractions = fractions ?? '';
  }
}