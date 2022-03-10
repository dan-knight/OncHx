export default interface FilterRule<T> {
  isValid: (value: T) => boolean;
}