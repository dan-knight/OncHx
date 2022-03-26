export default class Indexer<T> {
  values: Record<string, number>;

  constructor(elements: T[], indexFunc: (x: T) => string) {
    this.values = {};

    elements.forEach((x: T, i: number) => {
      const key: string = indexFunc(x);
      this.values[key] = i;
    });
  }

  getIndex(key: string): number | undefined {
    return this.values[key];
  }
}