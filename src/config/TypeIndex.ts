export interface TypeIndex<NamesType extends string> {
  [key: number]: Readonly<NamesType>;
}