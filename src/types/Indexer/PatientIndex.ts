import Patient from "../Patient/Patient";
import Indexer from "./Indexer";

export default class PatientIndex extends Indexer<Patient> {
  constructor(elements: Patient[]) {
    super(elements, (x: Patient) => x.email);
  }
}