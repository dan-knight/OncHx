export default interface JSONImporter<OutputType> {
  import(value: any): OutputType;
}