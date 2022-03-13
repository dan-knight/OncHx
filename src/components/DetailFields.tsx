import { FunctionComponent, useMemo } from "react";
import { FormikValues, useFormikContext } from "formik";

import ChemotherapyDetailFields from "./EventDetails/DetailFields/ChemotherapyDetailFields";
import RadiationDetailFields from "./EventDetails/DetailFields/RadiationDetailFields";
import SurgeryDetailFields from "./EventDetails/DetailFields/SurgeryDetailFields";
import StemCellTransplantDetailFields from "./EventDetails/DetailFields/StemCellTransplantDetailFields";

import { safelyParseInt } from "../utility/parseNumber";

export default function DetailFields() {
  const { values }: FormikValues = useFormikContext();

  const DetailFieldComponent: FunctionComponent | undefined = useMemo(() => {
    const treatmentType: number | undefined = safelyParseInt(values.treatmentType);

    if (treatmentType !== undefined) {
      const DetailComponentTypes: Record<number, FunctionComponent> = {
        0: ChemotherapyDetailFields,
        1: RadiationDetailFields,
        2: SurgeryDetailFields,
        3: StemCellTransplantDetailFields
      };

      return DetailComponentTypes[treatmentType];
    } else return undefined;
  }, [values.treatmentType]);

  return DetailFieldComponent !== undefined ? <DetailFieldComponent /> : null;
}