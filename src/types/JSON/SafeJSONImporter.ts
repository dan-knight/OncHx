import { object } from "yup/lib/locale";

export default class SafeJSONImporter {
  importString(value: any): string | undefined {
    return typeof value === 'string' ? value : undefined;
  }

  importObject(value: any): Record<any, any> | undefined {
    return (typeof value === 'object' && Array.isArray(value) ? object : undefined)
  }
}