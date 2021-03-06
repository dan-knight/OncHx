import '@testing-library/jest-dom/extend-expect';

import PatientEventFilter from '../PatientEventFilter';
import FilterRule from '../../FilterRule';
import PatientEvent from '../../../../PatientEvent/PatientEvent';

describe('PatientEventFilter', () => {
  it('initializes required rules', () => {
    const filterValues = { 
      treatmentTypeID: 9
    };

    const filter = new PatientEventFilter(filterValues);

    const expectedLength: number = Object.keys(filterValues).length;
    expect(filter.rules).toHaveLength(expectedLength);
  });

  it('initializes optional rules', () => {
    const filterValues = { 
      treatmentTypeID: 0,
      startDate: new Date(),
      endDate: new Date()
    };

    const filter = new PatientEventFilter(filterValues);

    const expectedLength: number = Object.keys(filterValues).length;
    expect(filter.rules).toHaveLength(expectedLength);
  });

  it('filters an invalid treatment type', () => {
    const treatmentType: number = 1;

    // @ts-ignore: Testing private method
    const rule: FilterRule<PatientEvent> = PatientEventFilter.treatmentTypeRule(treatmentType + 1);

    const patientEvent = new PatientEvent(0, {}, new Date(), undefined, treatmentType);

    expect(rule.isValid(patientEvent)).toBeFalsy();
  });

  it('handles a valid treatment type', () => {
    const treatmentType: number = 2;

    // @ts-ignore: Testing private method
    const rule: FilterRule<PatientEvent> = PatientEventFilter.treatmentTypeRule(treatmentType);

    const patientEvent = new PatientEvent(0, {}, new Date(), treatmentType);

    expect(rule.isValid(patientEvent)).toBeTruthy();
  });

  it('filters an invalid start date', () => {
    const startYear: number = 2022;

    const startDate = new Date(startYear, 1, 1);

    // @ts-ignore: Testing private method
    const rule: FilterRule<PatientEvent> = PatientEventFilter.startDateRule(startDate);

    const earlierDate = new Date(startYear - 1, 1, 1);
    const patientEvent = new PatientEvent(0, {}, earlierDate);

    expect(rule.isValid(patientEvent)).toBeFalsy();
  });

  it('handles a valid start date', () => {
    const startYear: number = 2021;

    const startDate = new Date(startYear, 1, 1);

    // @ts-ignore: Testing private method
    const rule: FilterRule<PatientEvent> = PatientEventFilter.startDateRule(startDate);

    const laterDate = new Date(startYear + 1, 1, 1);
    const patientEvent = new PatientEvent(0, {}, laterDate);

    expect(rule.isValid(patientEvent)).toBeTruthy();
  });

  it('filters an invalid end date', () => {
    const endYear: number = 2022;

    const endDate = new Date(endYear, 1, 1);

    // @ts-ignore: Testing private method
    const rule: FilterRule<PatientEvent> = PatientEventFilter.endDateRule(endDate);

    const laterDate = new Date(endYear + 1, 1, 1);
    const patientEvent = new PatientEvent(0, {}, laterDate);

    expect(rule.isValid(patientEvent)).toBeFalsy();
  });

  it('handles a valid end date', () => {
    const endYear: number = 2022;

    const endDate = new Date(endYear, 1, 1);

    // @ts-ignore: Testing private method
    const rule: FilterRule<PatientEvent> = PatientEventFilter.endDateRule(endDate);

    const earlierDate = new Date(endYear - 1, 1, 1);
    const patientEvent = new PatientEvent(0, {}, earlierDate);

    expect(rule.isValid(patientEvent)).toBeTruthy();
  });
});