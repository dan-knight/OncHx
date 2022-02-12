import { Option } from "../../../Options";
import { IEventDetailValues } from "../EventDetailValues";

export class RadiationDetailFields {
  grays: Option;
  fractions: Option;

  constructor(grays: Option, fractions: Option) {
    this.grays = grays;
    this.fractions = fractions;
  }
}

export class RadiationDetailValues implements IEventDetailValues<RadiationDetailFields> {
  grays: string;
  fractions: string;

  constructor() {
    this.grays = '';
    this.fractions = '';
  }
}