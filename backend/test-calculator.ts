/**
 * Quick test to verify the deadline calculator works correctly
 * Run with: npx ts-node test-calculator.ts
 */

import { DeadlineCalculator } from './src/services/deadline-calculator';
import { DeadlineCalculationInput } from './src/services/deadline-calculator';

console.log('🧪 Testing German Lawyer Deadline Calculator\n');

const calculator = new DeadlineCalculator();

// Test 1: Simple 1-month deadline (Ereignisfrist)
console.log('Test 1: 1 month Ereignisfrist from 2025-01-15');
const test1: DeadlineCalculationInput = {
  eventDate: '2025-01-15',
  durationValue: 1,
  durationUnit: 'months',
  bundesland: 'BW',
  deadlineType: 'Ereignisfrist',
  proceduralCode: 'ZPO'
};

const result1 = calculator.calculate(test1);
console.log('  Event Date:', test1.eventDate);
console.log('  Start Date (§ 187):', result1.startDate);
console.log('  End Date:', result1.endDateAfterExtension);
console.log('  Extended?', result1.wasExtended);
console.log('  Steps:');
result1.calculation.steps.forEach((step, i) => console.log(`    ${i + 1}. ${step}`));
console.log();

// Test 2: Deadline falling on Sunday (should extend to Monday)
console.log('Test 2: 2 weeks from 2025-01-05 (ends on Sunday 2025-01-19)');
const test2: DeadlineCalculationInput = {
  eventDate: '2025-01-05',
  durationValue: 2,
  durationUnit: 'weeks',
  bundesland: 'BW',
  deadlineType: 'Ereignisfrist',
  proceduralCode: 'ZPO'
};

const result2 = calculator.calculate(test2);
console.log('  Event Date:', test2.eventDate);
console.log('  End Date:', result2.endDateAfterExtension);
console.log('  Extended? (should be true):', result2.wasExtended);
console.log('  Extended from:', result2.extendedFromDate);
console.log();

// Test 3: Notfrist (should have warning)
console.log('Test 3: Notfrist 1 month from 2025-02-01');
const test3: DeadlineCalculationInput = {
  eventDate: '2025-02-01',
  durationValue: 1,
  durationUnit: 'months',
  bundesland: 'BY',
  deadlineType: 'Notfrist',
  proceduralCode: 'ZPO'
};

const result3 = calculator.calculate(test3);
console.log('  Event Date:', test3.eventDate);
console.log('  End Date:', result3.endDateAfterExtension);
console.log('  Warnings:', result3.warnings);
console.log();

// Test 4: Holiday extension (January 6 is Heilige Drei Könige in BW)
console.log('Test 4: 3 weeks from 2024-12-16 (ends on Monday Jan 6 - holiday in BW)');
const test4: DeadlineCalculationInput = {
  eventDate: '2024-12-16',
  durationValue: 3,
  durationUnit: 'weeks',
  bundesland: 'BW',
  deadlineType: 'Ereignisfrist',
  proceduralCode: 'ZPO'
};

const result4 = calculator.calculate(test4);
console.log('  Event Date:', test4.eventDate);
console.log('  End Date:', result4.endDateAfterExtension);
console.log('  Extended? (should be true for holiday):', result4.wasExtended);
console.log('  Extended from:', result4.extendedFromDate);
console.log();

console.log('✅ All tests completed!');
console.log('\nNote: Verify the results match German civil law (BGB §§ 187-193)');
