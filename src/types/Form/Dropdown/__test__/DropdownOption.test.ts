import '@testing-library/jest-dom/extend-expect';
import DropdownOption from '../DropdownOption';

describe('DropdownOption', () => {
  it('provides a label when specified', () => {
    const label: string = 'test label';
    const option = new DropdownOption('test key', label);

    expect(option.getLabel()).toBe(label);
  });
  
  it('provides a label with no label specified', () => {
    const value: string = 'test';
    const option = new DropdownOption(value);

    expect(option.getLabel()).toBe(value);
  });
})