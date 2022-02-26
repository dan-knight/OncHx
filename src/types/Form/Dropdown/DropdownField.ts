import Field from "../Field";
import DropdownOption from "./DropdownOption";

export default interface DropdownField extends Field {
  readonly options: DropdownOption[];
  readonly filter: boolean;
}