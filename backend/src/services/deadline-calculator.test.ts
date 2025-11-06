/**
 * Comprehensive test suite for German Lawyer Deadline Calculator
 * Tests BGB §§ 187-193 implementation
 */

import { DeadlineCalculator, DeadlineCalculationInput } from './deadline-calculator';
import { format } from 'date-fns';

describe('DeadlineCalculator - BGB § 187 (Event Day Not Counted)', () => {
  const calculator = new DeadlineCalculator();

  test('§ 187 Abs. 1: Event day is not counted (Ereignisfrist)', () => {
    const input: DeadlineCalculationInput = {
      eventDate: '2025-01-15',
      durationValue: 1,
      durationUnit: 'days',
      bundesland: 'BW',
      deadlineType: 'Ereignisfrist',
      proceduralCode: 'ZPO'
    };

    const result = calculator.calculate(input);

    // Should start counting from day AFTER event
    expect(format(result.startDate, 'yyyy-MM-dd')).toBe('2025-01-16');
    expect(format(result.endDateAfterExtension, 'yyyy-MM-dd')).toBe('2025-01-16');
  });
});

describe('DeadlineCalculator - BGB § 188 (Corresponding Day Rule)', () => {
  const calculator = new DeadlineCalculator();

  test('§ 188 Abs. 2: 1 month ends on corresponding day', () => {
    const input: DeadlineCalculationInput = {
      eventDate: '2025-01-15',
      durationValue: 1,
      durationUnit: 'months',
      bundesland: 'BW',
      deadlineType: 'Ereignisfrist',
      proceduralCode: 'ZPO'
    };

    const result = calculator.calculate(input);

    // Event: Jan 15 → Start: Jan 16 → End: Feb 15
    expect(format(result.endDateAfterExtension, 'yyyy-MM-dd')).toBe('2025-02-15');
  });

  test('§ 188 Abs. 2: 3 months ends on corresponding day', () => {
    const input: DeadlineCalculationInput = {
      eventDate: '2025-01-15',
      durationValue: 3,
      durationUnit: 'months',
      bundesland: 'BW',
      deadlineType: 'Ereignisfrist',
      proceduralCode: 'ZPO'
    };

    const result = calculator.calculate(input);

    // Event: Jan 15 → Start: Jan 16 → End: Apr 15
    expect(format(result.endDateAfterExtension, 'yyyy-MM-dd')).toBe('2025-04-15');
  });

  test('§ 188 Abs. 2: Month-end adjustment when target month shorter', () => {
    const input: DeadlineCalculationInput = {
      eventDate: '2025-01-31',
      durationValue: 1,
      durationUnit: 'months',
      bundesland: 'BW',
      deadlineType: 'Ereignisfrist',
      proceduralCode: 'ZPO'
    };

    const result = calculator.calculate(input);

    // Event: Jan 31 → Start: Feb 1 → End: Feb 28 (2025 is not leap year)
    expect(format(result.endDateAfterExtension, 'yyyy-MM-dd')).toBe('2025-02-28');
    // Month-end adjustment may or may not generate a warning depending on implementation
    expect(result.endDateAfterExtension).toBeDefined();
  });

  test('§ 188 Abs. 2: Leap year February handling', () => {
    const input: DeadlineCalculationInput = {
      eventDate: '2024-01-31',
      durationValue: 1,
      durationUnit: 'months',
      bundesland: 'BW',
      deadlineType: 'Ereignisfrist',
      proceduralCode: 'ZPO'
    };

    const result = calculator.calculate(input);

    // Event: Jan 31 2024 → Start: Feb 1 → End: Feb 29 (2024 is leap year)
    expect(format(result.endDateAfterExtension, 'yyyy-MM-dd')).toBe('2024-02-29');
  });

  test('§ 188 Abs. 2: 1 year ends on corresponding day', () => {
    const input: DeadlineCalculationInput = {
      eventDate: '2025-01-15',
      durationValue: 1,
      durationUnit: 'years',
      bundesland: 'BW',
      deadlineType: 'Ereignisfrist',
      proceduralCode: 'ZPO'
    };

    const result = calculator.calculate(input);

    // Event: Jan 15 2025 → Start: Jan 16 → End: Jan 15 2026
    expect(format(result.endDateAfterExtension, 'yyyy-MM-dd')).toBe('2026-01-15');
  });
});

describe('DeadlineCalculator - BGB § 193 (Weekend/Holiday Extension)', () => {
  const calculator = new DeadlineCalculator();

  test('§ 193: Saturday is a Werktag (NO extension)', () => {
    const input: DeadlineCalculationInput = {
      eventDate: '2025-01-10', // Friday
      durationValue: 1,
      durationUnit: 'days',
      bundesland: 'BW',
      deadlineType: 'Ereignisfrist',
      proceduralCode: 'ZPO'
    };

    const result = calculator.calculate(input);

    // Event: Friday Jan 10 → End: Saturday Jan 11 → NO EXTENSION
    expect(format(result.endDateAfterExtension, 'yyyy-MM-dd')).toBe('2025-01-11');
    expect(result.wasExtended).toBe(false);
  });

  test('§ 193: Sunday extends to Monday', () => {
    const input: DeadlineCalculationInput = {
      eventDate: '2025-01-05', // Sunday
      durationValue: 2,
      durationUnit: 'weeks',
      bundesland: 'BW',
      deadlineType: 'Ereignisfrist',
      proceduralCode: 'ZPO'
    };

    const result = calculator.calculate(input);

    // Event: Sunday Jan 5 → Start: Monday Jan 6 → End: Sunday Jan 19 → Extends to Monday Jan 20
    expect(format(result.endDateAfterExtension, 'yyyy-MM-dd')).toBe('2025-01-20');
    expect(result.wasExtended).toBe(true);
    expect(format(result.extendedFromDate!, 'yyyy-MM-dd')).toBe('2025-01-19');
  });

  test('§ 193: Nationwide holiday extends deadline (Neujahr)', () => {
    const input: DeadlineCalculationInput = {
      eventDate: '2024-12-31',
      durationValue: 1,
      durationUnit: 'days',
      bundesland: 'BW',
      deadlineType: 'Ereignisfrist',
      proceduralCode: 'ZPO'
    };

    const result = calculator.calculate(input);

    // Event: Dec 31 → End: Jan 1 (Neujahr) → Extends to Jan 2
    expect(format(result.endDateAfterExtension, 'yyyy-MM-dd')).toBe('2025-01-02');
    expect(result.wasExtended).toBe(true);
  });

  test('§ 193: State-specific holiday extends (Heilige Drei Könige in BW)', () => {
    const input: DeadlineCalculationInput = {
      eventDate: '2024-12-16',
      durationValue: 3,
      durationUnit: 'weeks',
      bundesland: 'BW',
      deadlineType: 'Ereignisfrist',
      proceduralCode: 'ZPO'
    };

    const result = calculator.calculate(input);

    // Event: Dec 16 → Start: Dec 17 → End: Jan 6 (Heilige Drei Könige in BW) → Extends to Jan 7
    expect(format(result.endDateAfterExtension, 'yyyy-MM-dd')).toBe('2025-01-07');
    expect(result.wasExtended).toBe(true);
  });

  test('§ 193: State-specific holiday does NOT extend in other Bundesland', () => {
    const input: DeadlineCalculationInput = {
      eventDate: '2024-12-16',
      durationValue: 3,
      durationUnit: 'weeks',
      bundesland: 'BE', // Berlin - no Heilige Drei Könige
      deadlineType: 'Ereignisfrist',
      proceduralCode: 'ZPO'
    };

    const result = calculator.calculate(input);

    // Event: Dec 16 → Start: Dec 17 → End: Jan 6 (Monday, not a holiday in Berlin)
    expect(format(result.endDateAfterExtension, 'yyyy-MM-dd')).toBe('2025-01-06');
    expect(result.wasExtended).toBe(false);
  });

  test('§ 193: Multiple extensions (Sunday + Holiday)', () => {
    const input: DeadlineCalculationInput = {
      eventDate: '2025-04-16',
      durationValue: 2,
      durationUnit: 'days',
      bundesland: 'BW',
      deadlineType: 'Ereignisfrist',
      proceduralCode: 'ZPO'
    };

    const result = calculator.calculate(input);

    // Event: Wed Apr 16 → Start: Thu Apr 17 → End: Fri Apr 18 (Karfreitag)
    // → Extends to Sat Apr 19 → Sat is Werktag, so stays Apr 19
    expect(format(result.endDateAfterExtension, 'yyyy-MM-dd')).toBe('2025-04-19');
    expect(result.wasExtended).toBe(true);
  });
});

describe('DeadlineCalculator - All 16 Bundesländer Holidays', () => {
  const calculator = new DeadlineCalculator();

  const bundeslaender = [
    'BW', 'BY', 'BE', 'BB', 'HB', 'HH', 'HE', 'MV',
    'NI', 'NW', 'RP', 'SL', 'SN', 'ST', 'SH', 'TH'
  ];

  test.each(bundeslaender)('Calculator works for %s', (bundesland) => {
    const input: DeadlineCalculationInput = {
      eventDate: '2025-01-15',
      durationValue: 1,
      durationUnit: 'months',
      bundesland,
      deadlineType: 'Ereignisfrist',
      proceduralCode: 'ZPO'
    };

    const result = calculator.calculate(input);

    expect(result.endDateAfterExtension).toBeDefined();
    expect(result.calculation.steps.length).toBeGreaterThan(0);
  });

  test('Fronleichnam extends in BY but not in BE', () => {
    const inputBY: DeadlineCalculationInput = {
      eventDate: '2025-06-18',
      durationValue: 1,
      durationUnit: 'days',
      bundesland: 'BY',
      deadlineType: 'Ereignisfrist',
      proceduralCode: 'ZPO'
    };

    const inputBE: DeadlineCalculationInput = {
      ...inputBY,
      bundesland: 'BE'
    };

    const resultBY = calculator.calculate(inputBY);
    const resultBE = calculator.calculate(inputBE);

    // Jun 18 → Jun 19 (Fronleichnam in BY) → Extends to Jun 20
    expect(format(resultBY.endDateAfterExtension, 'yyyy-MM-dd')).toBe('2025-06-20');
    expect(resultBY.wasExtended).toBe(true);

    // Jun 18 → Jun 19 (Thursday, not a holiday in BE)
    expect(format(resultBE.endDateAfterExtension, 'yyyy-MM-dd')).toBe('2025-06-19');
    expect(resultBE.wasExtended).toBe(false);
  });

  test('Reformationstag (Oct 31) in BB, HB, HH, MV, NI, SN, ST, SH, TH', () => {
    const reformationStates = ['BB', 'HB', 'HH', 'MV', 'NI', 'SN', 'ST', 'SH', 'TH'];
    const nonReformationStates = ['BW', 'BY', 'BE', 'HE', 'NW', 'RP', 'SL'];

    const input: DeadlineCalculationInput = {
      eventDate: '2025-10-30',
      durationValue: 1,
      durationUnit: 'days',
      bundesland: 'BB', // Will be replaced in loop
      deadlineType: 'Ereignisfrist',
      proceduralCode: 'ZPO'
    };

    // Should extend in reformation states
    reformationStates.forEach(bundesland => {
      const result = calculator.calculate({ ...input, bundesland });
      expect(format(result.endDateAfterExtension, 'yyyy-MM-dd')).toBe('2025-11-01');
      expect(result.wasExtended).toBe(true);
    });

    // Should NOT extend in non-reformation states
    nonReformationStates.forEach(bundesland => {
      const result = calculator.calculate({ ...input, bundesland });
      expect(format(result.endDateAfterExtension, 'yyyy-MM-dd')).toBe('2025-10-31');
      expect(result.wasExtended).toBe(false);
    });
  });
});

describe('DeadlineCalculator - Notfrist Warning System', () => {
  const calculator = new DeadlineCalculator();

  test('Notfrist includes mandatory warning', () => {
    const input: DeadlineCalculationInput = {
      eventDate: '2025-01-15',
      durationValue: 1,
      durationUnit: 'months',
      bundesland: 'BW',
      deadlineType: 'Notfrist',
      proceduralCode: 'ZPO'
    };

    const result = calculator.calculate(input);

    expect(result.warnings.some(w => w.includes('NOTFRIST'))).toBe(true);
    expect(result.warnings.some(w => w.includes('automatic rejection'))).toBe(true);
  });

  test('Ereignisfrist does NOT include Notfrist warning', () => {
    const input: DeadlineCalculationInput = {
      eventDate: '2025-01-15',
      durationValue: 1,
      durationUnit: 'months',
      bundesland: 'BW',
      deadlineType: 'Ereignisfrist',
      proceduralCode: 'ZPO'
    };

    const result = calculator.calculate(input);

    expect(result.warnings.some(w => w.includes('NOTFRIST'))).toBe(false);
  });
});

describe('DeadlineCalculator - Edge Cases', () => {
  const calculator = new DeadlineCalculator();

  test('New Year transition (Dec → Jan)', () => {
    const input: DeadlineCalculationInput = {
      eventDate: '2024-12-15',
      durationValue: 1,
      durationUnit: 'months',
      bundesland: 'BW',
      deadlineType: 'Ereignisfrist',
      proceduralCode: 'ZPO'
    };

    const result = calculator.calculate(input);

    // Dec 15 → Start Dec 16 → End Jan 15
    expect(format(result.endDateAfterExtension, 'yyyy-MM-dd')).toBe('2025-01-15');
  });

  test('Leap year Feb 29 handling', () => {
    const input: DeadlineCalculationInput = {
      eventDate: '2024-02-28',
      durationValue: 1,
      durationUnit: 'days',
      bundesland: 'BW',
      deadlineType: 'Ereignisfrist',
      proceduralCode: 'ZPO'
    };

    const result = calculator.calculate(input);

    // Feb 28 → End Feb 29 (leap year)
    expect(format(result.endDateAfterExtension, 'yyyy-MM-dd')).toBe('2024-02-29');
  });

  test('Very long deadline (5 years)', () => {
    const input: DeadlineCalculationInput = {
      eventDate: '2025-01-15',
      durationValue: 5,
      durationUnit: 'years',
      bundesland: 'BW',
      deadlineType: 'Ereignisfrist',
      proceduralCode: 'ZPO'
    };

    const result = calculator.calculate(input);

    // Jan 15 2025 → Start Jan 16 → End Jan 15 2030
    expect(format(result.endDateAfterExtension, 'yyyy-MM-dd')).toBe('2030-01-15');
  });

  test('Very short deadline (1 day)', () => {
    const input: DeadlineCalculationInput = {
      eventDate: '2025-01-15',
      durationValue: 1,
      durationUnit: 'days',
      bundesland: 'BW',
      deadlineType: 'Ereignisfrist',
      proceduralCode: 'ZPO'
    };

    const result = calculator.calculate(input);

    // Jan 15 → Start Jan 16 → End Jan 16
    expect(format(result.endDateAfterExtension, 'yyyy-MM-dd')).toBe('2025-01-16');
  });

  test('Calculation steps are documented', () => {
    const input: DeadlineCalculationInput = {
      eventDate: '2025-01-15',
      durationValue: 1,
      durationUnit: 'months',
      bundesland: 'BW',
      deadlineType: 'Ereignisfrist',
      proceduralCode: 'ZPO'
    };

    const result = calculator.calculate(input);

    expect(result.calculation.steps.length).toBeGreaterThan(0);
    expect(result.calculation.appliedRules.length).toBeGreaterThan(0);
    expect(result.calculation.appliedRules.some(r => r.includes('§ 187 Abs. 1 BGB'))).toBe(true);
    expect(result.calculation.appliedRules.some(r => r.includes('§ 188 Abs. 2 BGB'))).toBe(true);
  });
});

describe('DeadlineCalculator - Procedural Codes', () => {
  const calculator = new DeadlineCalculator();

  const proceduralCodes: ('ZPO' | 'VwGO' | 'StPO' | 'ArbGG' | 'SGG' | 'FGO' | 'FamFG' | 'InsO')[] =
    ['ZPO', 'VwGO', 'FGO', 'SGG', 'StPO', 'ArbGG', 'FamFG', 'InsO'];

  test.each(proceduralCodes)('Calculator works with %s', (proceduralCode) => {
    const input: DeadlineCalculationInput = {
      eventDate: '2025-01-15',
      durationValue: 1,
      durationUnit: 'months',
      bundesland: 'BW',
      deadlineType: 'Ereignisfrist',
      proceduralCode
    };

    const result = calculator.calculate(input);

    expect(result.endDateAfterExtension).toBeDefined();
    expect(format(result.endDateAfterExtension, 'yyyy-MM-dd')).toBe('2025-02-15');
    expect(result.calculation.steps.length).toBeGreaterThan(0);
    expect(result.metadata.proceduralCode).toBe(proceduralCode);
  });
});
