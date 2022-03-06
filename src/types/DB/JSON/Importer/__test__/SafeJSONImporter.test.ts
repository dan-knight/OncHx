import '@testing-library/jest-dom/extend-expect';
import SafeJSONImporter from '../SafeJSONImporter';

describe('SafeJSONImporter', () => {
  it('imports a valid string', () => {
    const value: string = 'valid string';
    expect(SafeJSONImporter.importString(value)).toBe(value);
  });

  it('imports an invalid string', () => {
    const value: number = 100;
    expect(SafeJSONImporter.importString(value)).toBeUndefined();
  });

  it('imports a valid number', () => {
    const value: number = 101;
    expect(SafeJSONImporter.importNumber(value)).toBe(value);
  });

  it('imports a valid number string', () => {
    const value: number = 10;
    expect(SafeJSONImporter.importNumber(value.toString())).toBe(value);
  });

  it('imports an invalid number', () => {
    const value: string = 'invalid';
    expect(SafeJSONImporter.importNumber(value)).toBeUndefined();
  });

  it('imports a valid object', () => {
    const value: Record<string, string> = { itemID: 'test' };
    expect(SafeJSONImporter.importObject(value)).toStrictEqual(value);
  });

  it('imports an invalid object', () => {
    const value: string[] = ['test', 'values'];
    expect(SafeJSONImporter.importObject(value)).toBeUndefined();
  });

  it('imports a valid array', () => {
    const value: string[] = ['test', 'array'];
    expect(SafeJSONImporter.importArray(value)).toStrictEqual(value);
  });

  it('imports an invalid array', () => {
    const value: Record<string, string> = { testID: 'id' };
    expect(SafeJSONImporter.importArray(value)).toBeUndefined();
  });
});