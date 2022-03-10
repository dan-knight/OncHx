import Filter from "../Filter";
import PatientEvent from "../../../PatientEvent/PatientEvent";
import FilterRule from "../FilterRule";

interface PatientEventFilterValues {
  treatmentTypeIDs: Set<number>,
  startDate?: Date,
  endDate?: Date
}

export default class PatientEventFilter extends Filter<PatientEvent> {
  constructor(filterValues: PatientEventFilterValues) {
    const rules: FilterRule<PatientEvent>[] = [
      PatientEventFilter.treatmentTypeRule(filterValues.treatmentTypeIDs)
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

  private static treatmentTypeRule = (treatmentTypeIDs: Set<number>): FilterRule<PatientEvent> => ({
    isValid: (value: PatientEvent) => value.treatmentType !== undefined && treatmentTypeIDs.has(value.treatmentType)
  });
}