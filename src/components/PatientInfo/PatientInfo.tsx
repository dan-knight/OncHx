import { GlobalValues } from "../../types/Global"
import { useGlobalContext } from "../../contexts/GlobalContext"

export default function PatientInfo() {
  const { patients, user }: GlobalValues = useGlobalContext();

  return <h1>{JSON.stringify(user !== undefined ? patients[user] : undefined)}</h1>
}