import '@testing-library/jest-dom/extend-expect';
import Indexer from '../Indexer';

interface TestObject {
  id: number
}

describe('Indexer', () => {
  const indexFunc = (x: TestObject) => x.id.toString();

  it('gets values correctly', () => {
    const values: TestObject[] = [
      { id: 1 },
      { id: 2 }
    ];

    const indexer = new Indexer<TestObject>(values, indexFunc);

    const valueIndex: number = 0;
    const valueID: number = values[valueIndex].id;

    expect(indexer.getIndex(valueID.toString())).toBe(valueIndex);
  });

  it('indexes all values', () => {
    const values: TestObject[] = [
      { id: 6 },
      { id: 10 },
      { id: 13 }
    ];

    const indexer = new Indexer<TestObject>(values, indexFunc);

    const indexedValues: (number | undefined)[] = Object.values(values).map((x: TestObject) => (
      indexer.getIndex(x.id.toString())
    ));

    const expectedLength: number = Object.keys(values).length;

    expect(indexedValues).toHaveLength(expectedLength);
  });
});