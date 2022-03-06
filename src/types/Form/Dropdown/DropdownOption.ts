export default class DropdownOption<ValueType = string | number> {
  readonly value: ValueType;
  private label?: string;

  constructor(value: ValueType, label?: string) {
    this.value = value;
    this.label = label;
  }

  getLabel(): ValueType | string {
    return this.label ?? this.value;
  }
}