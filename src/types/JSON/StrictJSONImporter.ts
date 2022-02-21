import SafeJSONImporter from "./SafeJSONImporter";

export default class StrictJSONImporter extends SafeJSONImporter {
  importString(value: any): string {
    const imported: string | undefined = super.importString(value);

    if (imported === undefined) {
      throw new Error('Invalid JSON string import');
    }

    return imported;
  }

  importObject(value: any): Record<any, any> {
    const imported: Record<any, any> | undefined = super.importObject(value);

    if (imported === undefined) {
      throw new Error('Invalid JSON object import');
    }

    return imported;
  }
}