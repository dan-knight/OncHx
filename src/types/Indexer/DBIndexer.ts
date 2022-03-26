import DBElement from "../DB/DBElement";
import Indexer from "./Indexer";

export default class DBIndexer<T extends DBElement> extends Indexer<T> {
  constructor(elements: T[]) {
    super(elements, (x: T) => x.id.toString());
  }
}