import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from "react";

import TreatmentType from "../types/DB/Config/TreatmentType";
import CancerType from "../types/DB/Config/CancerType";
import TreatmentLocation from "../types/DB/Config/TreatmentLocation";
import ChemotherapyRegimen from "../types/DB/Config/ChemotherapyRegimen";

import JSONTreatmentTypeImporter from "../types/DB/JSON/Importer/JSONTreatmentTypeImporter";
import JSONCancerTypeImporter from "../types/DB/JSON/Importer/JSONCancerTypeImporter";
import JSONTreatmentLocationImporter from "../types/DB/JSON/Importer/JSONTreatmentLocationImporter";
import JSONChemotherapyRegimenImporter from "../types/DB/JSON/Importer/JSONChemotherapyRegimenImporter";
import Patient from "../types/Patient/Patient";
import { GlobalValues } from "../types/Global";

import TreatmentTypes from '../config/treatmentTypes.json';
import CancerTypes from '../config/cancerTypes.json';
import TreatmentLocations from '../config/treatmentLocations.json';
import ChemotherapyRegimens from '../config/chemotherapyRegimens.json';
import Config from "../types/Config";
import useIndexer from "../hooks/useIndexer";
import StrictJSONImporter from "../types/DB/JSON/Importer/StrictJSONImporter";
import { defaultPatients } from "../defaultData";
import DBElement from "../types/DB/DBElement";

const GlobalContext = createContext<GlobalValues | null>(null);

export function GlobalContextProvider(props: { children?: ReactNode | ReactNode[] }) {
  const treatmentTypes: TreatmentType[] = useMemo(() => {
    const importer = new JSONTreatmentTypeImporter();

    return StrictJSONImporter.importArray(TreatmentTypes).map((treatment: any) => importer.import(treatment));
  }, []);

  const cancerTypes: CancerType[] = useMemo(() => {
    const importer = new JSONCancerTypeImporter();

    return StrictJSONImporter.importArray(CancerTypes).map((cancer: any) => importer.import(cancer));
  }, []);

  const treatmentLocations: TreatmentLocation[] = useMemo(() => {
    const importer = new JSONTreatmentLocationImporter();
    return StrictJSONImporter.importArray(TreatmentLocations).map((location: any) => importer.import(location));
  }, []);

  const chemotherapyRegimens: ChemotherapyRegimen[] = useMemo(() => {
    const importer = new JSONChemotherapyRegimenImporter();
    return StrictJSONImporter.importArray(ChemotherapyRegimens).map((regimen: any) => importer.import(regimen));
  }, []);

  const config: Config = {
    treatmentTypes: treatmentTypes,
    cancerTypes: cancerTypes,
    treatmentLocations: treatmentLocations,
    chemotherapyRegimens: chemotherapyRegimens
  }

  const dbIndexFunc: (x: DBElement) => string = useCallback((x: DBElement) => x.id.toString(), []);
  
  const [getTreatmentType] = useIndexer<TreatmentType>(treatmentTypes, dbIndexFunc);
  const [getCancerType] = useIndexer<CancerType>(cancerTypes, dbIndexFunc);
  const [getChemotherapyRegimen] = useIndexer<ChemotherapyRegimen>(chemotherapyRegimens, dbIndexFunc);
  const [getTreatmentLocation] = useIndexer<TreatmentLocation>(treatmentLocations, dbIndexFunc);

  const patients: Patient[] = useMemo(() => defaultPatients(), []);
  const [getPatient, getPatientIndex] = useIndexer<Patient>(patients, (x: Patient) => x.email);
  
  const [user, setUser] = useState<number | undefined>(undefined);
  const login: (value: number | undefined) => void = setUser;

  return (
    <GlobalContext.Provider value={{
      config,
      getTreatmentType,
      getCancerType,
      getChemotherapyRegimen,
      getTreatmentLocation,
      patients,
      getPatient,
      getPatientIndex,
      user,
      login
    }}>
      {props.children}
    </GlobalContext.Provider>
  )
}

export function useGlobalContext(): GlobalValues {
  const values: GlobalValues | null = useContext(GlobalContext);

  if (values !== null) {
    return values;
  } else {
    throw 'Invalid global context'
  }
} 