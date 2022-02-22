import BaseJSONImporter from "./BaseJSONImporter";
import StrictJSONImporter from "./StrictJSONImporter";

export default abstract class SafeJSONImporter extends BaseJSONImporter {
  static importString(value: any): string | undefined {
    return typeof value === 'string' ? value : undefined;
  }

  static importNumber(value: any): number | undefined {
    try {
      return StrictJSONImporter.importNumber(value);
    } catch (error) {
      return undefined;
    }
  }

  static importObject(value: any): Record<any, any> | undefined {
    return (typeof value === 'object' && !Array.isArray(value)) ? value : undefined;
  }

  static importArray(value: any): any[] | undefined {
    return Array.isArray(value) ? value : undefined;
  }
}