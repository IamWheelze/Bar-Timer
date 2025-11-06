/**
 * GERMAN LAWYER DEADLINE CALCULATION ENGINE
 *
 * Implements German civil law deadline calculation rules:
 * - § 187 BGB: Beginning of deadline (event day not counted)
 * - § 188 BGB: End of deadline (corresponding day rule)
 * - § 193 BGB: Weekend/holiday extension
 *
 * This is the CORE of the entire system. Accuracy is CRITICAL.
 */

import { addDays, addWeeks, addMonths, addYears, format, parse, isWeekend, isSunday, isSaturday } from 'date-fns';
import { germanHolidays } from '../data/holidays';

export interface DeadlineCalculationInput {
  eventDate: Date | string; // Triggering event date
  durationValue: number; // 1, 2, 3, etc.
  durationUnit: 'days' | 'weeks' | 'months' | 'years';
  bundesland: string; // DE, BY, BE, BW, etc.
  court?: string; // Optional court name
  deadlineType: 'Notfrist' | 'Ereignisfrist' | 'Richterliche Frist' | 'Gesetzliche Frist';
  proceduralCode: 'ZPO' | 'VwGO' | 'StPO' | 'ArbGG' | 'SGG' | 'FGO' | 'FamFG' | 'InsO';
}

export interface DeadlineCalculationResult {
  startDate: Date; // Day after event (§ 187 BGB)
  endDateBeforeExtension: Date; // Calculated end per § 188 BGB
  endDateAfterExtension: Date; // Final deadline after § 193 BGB extension
  wasExtended: boolean;
  extendedFromDate?: Date;
  calculation: {
    steps: string[]; // Human-readable calculation steps
    appliedRules: string[]; // Legal rules applied
  };
  warnings: string[]; // Any warnings or edge cases
  metadata: {
    eventDate: Date;
    durationValue: number;
    durationUnit: string;
    bundesland: string;
    deadlineType: string;
    proceduralCode: string;
  };
}

export class DeadlineCalculator {
  private holidays: Map<string, Set<string>>; // bundesland -> Set of date strings

  constructor() {
    this.holidays = new Map();
    this.loadHolidays();
  }

  /**
   * Load German holidays for all Bundesländer
   */
  private loadHolidays(): void {
    germanHolidays.forEach(holiday => {
      const dateStr = format(new Date(holiday.date), 'yyyy-MM-dd');

      if (holiday.nationwide) {
        // Add to all Bundesländer
        ['DE', 'BW', 'BY', 'BE', 'BB', 'HB', 'HH', 'HE', 'MV', 'NI', 'NW', 'RP', 'SL', 'SN', 'ST', 'SH', 'TH'].forEach(state => {
          if (!this.holidays.has(state)) {
            this.holidays.set(state, new Set());
          }
          this.holidays.get(state)!.add(dateStr);
        });
      } else if (holiday.bundesland) {
        // Add to specific Bundesland
        if (!this.holidays.has(holiday.bundesland)) {
          this.holidays.set(holiday.bundesland, new Set());
        }
        this.holidays.get(holiday.bundesland)!.add(dateStr);
      }
    });
  }

  /**
   * Main calculation method
   */
  public calculate(input: DeadlineCalculationInput): DeadlineCalculationResult {
    const eventDate = typeof input.eventDate === 'string'
      ? parse(input.eventDate, 'yyyy-MM-dd', new Date())
      : input.eventDate;

    const steps: string[] = [];
    const appliedRules: string[] = [];
    const warnings: string[] = [];

    // STEP 1: § 187 Abs. 1 BGB - Start counting the day AFTER the event
    const startDate = addDays(eventDate, 1);
    steps.push(`Event occurred on ${format(eventDate, 'dd.MM.yyyy')}`);
    steps.push(`Per § 187 Abs. 1 BGB: Start counting from ${format(startDate, 'dd.MM.yyyy')} (day after event)`);
    appliedRules.push('§ 187 Abs. 1 BGB - Beginning of deadline');

    // STEP 2: § 188 BGB - Calculate end date based on duration unit
    let endDate: Date;

    switch (input.durationUnit) {
      case 'days':
        // For days: Simply add the number of days
        endDate = addDays(startDate, input.durationValue - 1); // -1 because start date is day 1
        steps.push(`Adding ${input.durationValue} days: ${format(endDate, 'dd.MM.yyyy')}`);
        appliedRules.push('§ 188 Abs. 1 BGB - Deadline in days');
        break;

      case 'weeks':
        // For weeks: End on the corresponding weekday
        endDate = addWeeks(startDate, input.durationValue);
        endDate = addDays(endDate, -1); // Adjust to include start date in count
        steps.push(`Adding ${input.durationValue} week(s): Ends ${format(endDate, 'dd.MM.yyyy')}`);
        appliedRules.push('§ 188 Abs. 2 BGB - Deadline in weeks');
        break;

      case 'months':
        // For months: End on the corresponding day of the final month (§ 188 Abs. 2 BGB)
        // Special case: If start date is e.g. Jan 31 and we add 1 month, should be Feb 28/29
        endDate = addMonths(startDate, input.durationValue);
        endDate = addDays(endDate, -1); // Corresponding day rule

        const startDay = startDate.getDate();
        const endDay = endDate.getDate();

        if (startDay !== endDay && endDay < startDay) {
          // Month doesn't have enough days (e.g., Jan 31 + 1 month = Feb 28)
          warnings.push(`Monthend adjustment: Start date was day ${startDay}, but target month only has ${endDay} days`);
        }

        steps.push(`Adding ${input.durationValue} month(s): Ends ${format(endDate, 'dd.MM.yyyy')}`);
        appliedRules.push('§ 188 Abs. 2 BGB - Deadline in months (corresponding day rule)');
        break;

      case 'years':
        // For years: Same as months, corresponding day rule
        endDate = addYears(startDate, input.durationValue);
        endDate = addDays(endDate, -1);
        steps.push(`Adding ${input.durationValue} year(s): Ends ${format(endDate, 'dd.MM.yyyy')}`);
        appliedRules.push('§ 188 Abs. 2 BGB - Deadline in years');
        break;

      default:
        throw new Error(`Unsupported duration unit: ${input.durationUnit}`);
    }

    const endDateBeforeExtension = new Date(endDate);

    // STEP 3: § 193 BGB - Extend if deadline falls on Sunday or public holiday
    const { extendedDate, wasExtended, extendedFrom } = this.applySection193Extension(
      endDate,
      input.bundesland,
      steps,
      appliedRules,
      warnings
    );

    endDate = extendedDate;

    // Additional warnings based on deadline type
    if (input.deadlineType === 'Notfrist') {
      warnings.push('⚠️ NOTFRIST: This is a peremptory deadline. Missing it results in automatic rejection!');
    }

    return {
      startDate,
      endDateBeforeExtension,
      endDateAfterExtension: endDate,
      wasExtended,
      extendedFromDate: extendedFrom,
      calculation: {
        steps,
        appliedRules
      },
      warnings,
      metadata: {
        eventDate,
        durationValue: input.durationValue,
        durationUnit: input.durationUnit,
        bundesland: input.bundesland,
        deadlineType: input.deadlineType,
        proceduralCode: input.proceduralCode
      }
    };
  }

  /**
   * § 193 BGB - Weekend and Holiday Extension
   * If deadline falls on Sunday or public holiday, extend to next Werktag (working day)
   *
   * NOTE: Saturday IS a Werktag (working day) under German civil law!
   */
  private applySection193Extension(
    date: Date,
    bundesland: string,
    steps: string[],
    appliedRules: string[],
    warnings: string[]
  ): { extendedDate: Date; wasExtended: boolean; extendedFrom?: Date } {
    const originalDate = new Date(date);
    let currentDate = new Date(date);
    let wasExtended = false;

    // Check if date falls on Sunday or holiday
    while (this.isNonWorkingDay(currentDate, bundesland)) {
      const reason = this.getNonWorkingDayReason(currentDate, bundesland);
      steps.push(`${format(currentDate, 'dd.MM.yyyy')} is ${reason}`);
      currentDate = addDays(currentDate, 1);
      wasExtended = true;
    }

    if (wasExtended) {
      steps.push(`Per § 193 BGB: Deadline extended to ${format(currentDate, 'dd.MM.yyyy')} (next Werktag)`);
      appliedRules.push('§ 193 BGB - Weekend/holiday extension');

      // Special warning if Saturday would have been the original deadline
      if (isSaturday(originalDate)) {
        warnings.push('Note: Saturday is a Werktag (working day) under German law, but this deadline was extended from a holiday');
      }

      return {
        extendedDate: currentDate,
        wasExtended: true,
        extendedFrom: originalDate
      };
    }

    return {
      extendedDate: currentDate,
      wasExtended: false
    };
  }

  /**
   * Check if a date is a non-working day (Sunday or public holiday)
   * NOTE: Saturday is NOT a non-working day under § 193 BGB!
   */
  private isNonWorkingDay(date: Date, bundesland: string): boolean {
    // Sunday is always a non-working day
    if (isSunday(date)) {
      return true;
    }

    // Check if it's a public holiday in this Bundesland
    const dateStr = format(date, 'yyyy-MM-dd');
    const holidays = this.holidays.get(bundesland);

    return holidays ? holidays.has(dateStr) : false;
  }

  /**
   * Get human-readable reason why a date is a non-working day
   */
  private getNonWorkingDayReason(date: Date, bundesland: string): string {
    if (isSunday(date)) {
      return 'a Sunday';
    }

    const dateStr = format(date, 'yyyy-MM-dd');
    const holiday = germanHolidays.find(h => {
      const holidayDateStr = format(new Date(h.date), 'yyyy-MM-dd');
      return holidayDateStr === dateStr && (h.nationwide || h.bundesland === bundesland);
    });

    return holiday ? `a public holiday (${holiday.name})` : 'a non-working day';
  }

  /**
   * Validate a calculated deadline (for sanity checks)
   */
  public validateDeadline(result: DeadlineCalculationResult): string[] {
    const errors: string[] = [];

    // Sanity checks
    if (result.endDateAfterExtension < result.startDate) {
      errors.push('ERROR: End date is before start date!');
    }

    if (result.wasExtended && !result.extendedFromDate) {
      errors.push('WARNING: Deadline was extended but no original date recorded');
    }

    // Check if final deadline is on a non-working day (should never happen!)
    if (this.isNonWorkingDay(result.endDateAfterExtension, result.metadata.bundesland)) {
      errors.push('CRITICAL ERROR: Final deadline is on a non-working day! This should never happen.');
    }

    return errors;
  }
}

// Export singleton instance
export const deadlineCalculator = new DeadlineCalculator();
