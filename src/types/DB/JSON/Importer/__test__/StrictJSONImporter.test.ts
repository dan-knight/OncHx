import '@testing-library/jest-dom/extend-expect';
import StrictJSONImporter from '../StrictJSONImporter';

describe('StrictJSONImporter', () => {
  it('imports a valid string', () => {
    const value: string = 'valid string';
    expect(StrictJSONImporter.importString(value)).toBe(value);
  });

  it('raises an error on an invalid string', () => {
    const value: number = 100;
    expect(() => StrictJSONImporter.importString(value)).toThrowError();
  });

  it('imports a valid number', () => {
    const value: number = 101;
    expect(StrictJSONImporter.importNumber(value)).toBe(value);
  });

  it('imports a valid number string', () => {
    const value: number = 10;
    expect(StrictJSONImporter.importNumber(value.toString())).toBe(value);
  });

  it('raises an error on an invalid number', () => {
    const value: string = 'invalid';
    expect(() => StrictJSONImporter.importNumber(value)).toThrowError();
  });

  it('imports a valid object', () => {
    const value: Record<string, string> = { itemID: 'test' };
    expect(StrictJSONImporter.importObject(value)).toStrictEqual(value);
  });

  it('raises an error on an invalid object', () => {
    const value: string[] = ['test', 'values'];
    expect(() => StrictJSONImporter.importObject(value)).toThrowError();
  });

  it('imports a valid array', () => {
    const value: string[] = ['test', 'array'];
    expect(StrictJSONImporter.importArray(value)).toStrictEqual(value);
  });

  it('raises an error on an invalid array', () => {
    const value: Record<string, string> = { testID: 'id' };
    expect(() => StrictJSONImporter.importArray(value)).toThrowError();
  });
});