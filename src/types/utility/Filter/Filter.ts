import FilterRule from "./FilterRule";

export default class Filter<T> {
  rules: FilterRule<T>[];

  constructor(...rules: FilterRule<T>[]) {
    this.rules = rules;
  }

  isInFilters(value: T): boolean {
    return this.rules.every((rule: FilterRule<T>) => rule.isValid(value));
  }
}