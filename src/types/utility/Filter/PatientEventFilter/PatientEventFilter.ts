import Filter from "../Filter";
import PatientEvent from "../../../PatientEvent/PatientEvent";
import FilterRule from "../FilterRule";

interface PatientEventFilterValues {
  cancerTypeIDs: Set<number>,
  startDate?: Date,
  endDate?: Date
}

export default class PatientEventFilter extends Filter<PatientEvent> {
  constructor(filterValues: PatientEventFilterValues) {
    const rules: FilterRule<PatientEvent>[] = [
      PatientEventFilter.cancerTypeRule(filterValues.cancerTypeIDs)
    ];

    if (filterValues.startDate !== undefined) {
      rules.push(PatientEventFilter.startDateRule(filterValues.startDate));
    }

    if (filterValues.endDate !== undefined) {
      rules.push(PatientEventFilter.endDateRule(filterValues.endDate));
    }

    super(...rules);
  }

  private static startDateRule = (startDate: Date): FilterRule<PatientEvent> => ({
    isValid: (value: PatientEvent) => value.date > startDate
  });

  private static endDateRule = (endDate: Date): FilterRule<PatientEvent> => ({
    isValid: (value: PatientEvent) => value.date < endDate
  });

  private static cancerTypeRule = (cancerTypeIDs: Set<number>): FilterRule<PatientEvent> => ({
    isValid: (value: PatientEvent) => value.cancerType !== undefined && cancerTypeIDs.has(value.cancerType)
  });
}