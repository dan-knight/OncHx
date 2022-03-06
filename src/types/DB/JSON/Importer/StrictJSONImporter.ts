import BaseJSONImporter from "./BaseJSONImporter";
import SafeJSONImporter from "./SafeJSONImporter";

export default abstract class StrictJSONImporter extends BaseJSONImporter  {
  static importString(value: any): string {
    const imported: string | undefined = SafeJSONImporter.importString(value);

    if (imported === undefined) {
      throw new Error('Invalid JSON string import');
    }

    return imported;
  }

  static importNumber(value: any): number {
      if (typeof value === 'number') {
        return value;
      } else if (typeof value === 'string') {
        const parsed: number = parseFloat(value);

        if (!isNaN(parsed)) {
          return parsed;
        }
      }
      
      throw new Error('Invalid JSON number import');
   }

  static importObject(value: any): Record<any, any> {
    const imported: Record<any, any> | undefined = SafeJSONImporter.importObject(value);

    if (imported === undefined) {
      throw new Error('Invalid JSON object import');
    }

    return imported;
  }

  static importArray(value: any): any[] {
      const imported: any[] | undefined = SafeJSONImporter.importArray(value);

      if (imported === undefined) {
        throw new Error('Invalid JSON array import');
      }

      return imported;
  }
}