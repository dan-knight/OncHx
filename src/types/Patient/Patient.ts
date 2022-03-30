import Address from "./Address";

export default interface Patient {
  id: number,
  firstName: string,
  lastName: string,
  address: Address,
  email: string,
  password: string,
  phone: string,
  birthday: Date
}