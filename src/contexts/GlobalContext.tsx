import { createContext, ReactNode, useContext, useMemo } from "react";

import TreatmentType from "../types/DB/Config/TreatmentType";
import CancerType from "../types/DB/Config/CancerType";
import TreatmentLocation from "../types/DB/Config/TreatmentLocation";
import ChemotherapyRegimen from "../types/DB/Config/ChemotherapyRegimen";

import JSONTreatmentTypeImporter from "../types/DB/JSON/Importer/JSONTreatmentTypeImporter";
import JSONCancerTypeImporter from "../types/DB/JSON/Importer/JSONCancerTypeImporter";
import JSONTreatmentLocationImporter from "../types/DB/JSON/Importer/JSONTreatmentLocationImporter";
import JSONChemotherapyRegimenImporter from "../types/DB/JSON/Importer/JSONChemotherapyRegimenImporter";
import { GlobalValues } from "../types/Global";

import TreatmentTypes from '../config/treatmentTypes.json';
import CancerTypes from '../config/cancerTypes.json';
import TreatmentLocations from '../config/treatmentLocations.json';
import ChemotherapyRegimens from '../config/chemotherapyRegimens.json';

const GlobalContext = createContext<GlobalValues | null>(null);

export function GlobalContextProvider(props: { children?: ReactNode | ReactNode[] }) {
  const treatmentTypes: TreatmentType[] = useMemo(() => {
    const importer = new JSONTreatmentTypeImporter();
    return TreatmentTypes.map((treatment: any) => importer.import(treatment));
  }, []);

  const cancerTypes: CancerType[] = useMemo(() => {
    const importer = new JSONCancerTypeImporter();
    return CancerTypes.map((cancer: any) => importer.import(cancer));
  }, []);

  const treatmentLocations: TreatmentLocation[] = useMemo(() => {
    const importer = new JSONTreatmentLocationImporter();
    return TreatmentLocations.map((location: any) => importer.import(location));
  }, []);

  const chemotherapyRegimens: ChemotherapyRegimen[] = useMemo(() => {
    const importer = new JSONChemotherapyRegimenImporter();
    return ChemotherapyRegimens.map((regimen: any) => importer.import(regimen));
  }, []);

  return (
    <GlobalContext.Provider value={{
      treatmentTypes: treatmentTypes,
      cancerTypes: cancerTypes,
      treatmentLocations: treatmentLocations,
      chemotherapyRegimens: chemotherapyRegimens
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