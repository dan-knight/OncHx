// TypeScript does not support static interfaces.
// This base class is only a guide to imply subclass methods.
// It does not provide any real type protection.
export default abstract class BaseJSONImporter {
  abstract importString(value: any): string | undefined;
  abstract importNumber(value: any): number | undefined;
  abstract importObject(value: any): Record<any, any> | undefined;
  abstract importArray(value: any): any[] | undefined;
}