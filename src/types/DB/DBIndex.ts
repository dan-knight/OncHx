import DBElement from "./DBElement";

export default class DBIndex<T extends DBElement> {
  [key: number]: number;

  constructor(elements: T[]) {
    elements.forEach((e: T, i: number) => {
      this[e.id] = i;
    });
  }
}