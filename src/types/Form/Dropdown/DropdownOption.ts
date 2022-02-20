export default class DropdownOption {
  readonly value: string;
  private label?: string;

  constructor(value: string, label?: string) {
    this.value = value;
    this.label = label;
  }

  getLabel(): string {
    return this.label ?? this.value;
  }
}