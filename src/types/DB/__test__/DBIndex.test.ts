import '@testing-library/jest-dom/extend-expect';

import DBElement from '../DBElement';
import DBIndex from '../DBIndex';

interface TestElement extends DBElement {
  name: string
}

describe('DBIndex', () => {
  it('initializes the correct number of elements', () => {
    const elements: TestElement[] = [
      { id: 0, name: 'one' },
      { id: 1, name: 'two' }
    ];

    const index = new DBIndex<TestElement>(elements);

    expect(Object.keys(index)).toHaveLength(elements.length);
  });

  it('sets the correct index value for an element', () => {
    const elements: TestElement[] = [
      { id: 9, name: 'nine' },
      { id: 3, name: 'three' }
    ];

    const index = new DBIndex<TestElement>(elements);

    const testIndex: number = 1;
    const testID: number = elements[testIndex].id;

    expect(index[testID]).toBe(testIndex);
  });
});