import { Option } from "../../../Options";
import { IEventDetailValues } from "../EventDetailValues";

export class SurgeryDetailFields {
  location: Option;
  surgeryType: Option;
  complications: Option;

  constructor(location: Option, surgeryType: Option, complications: Option) {
    this.location = location;
    this.surgeryType = surgeryType,
    this.complications = complications
  }
}

export class SurgeryDetailValues implements IEventDetailValues<SurgeryDetailFields> {
  location: string;
  surgeryType: string;
  complications: string;

  constructor() {
    this.location = '';
    this.surgeryType = '';
    this.complications = '';
  }
}