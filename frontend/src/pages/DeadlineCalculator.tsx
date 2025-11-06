import React, { useState } from 'react';
import { deadlineAPI, DeadlineCalculationInput } from '../services/api';
import { useAuth } from '../App';
import { format } from 'date-fns';

const BUNDESLAENDER = [
  { code: 'BW', name: 'Baden-Württemberg' },
  { code: 'BY', name: 'Bayern' },
  { code: 'BE', name: 'Berlin' },
  // Add all 16 states...
];

const DEADLINE_TYPES = [
  'Notfrist',
  'Ereignisfrist',
  'Richterliche Frist',
  'Gesetzliche Frist',
];

const PROCEDURAL_CODES = [
  'ZPO',
  'VwGO',
  'StPO',
  'ArbGG',
  'SGG',
  'FGO',
  'FamFG',
  'InsO',
];

export default function DeadlineCalculator() {
  const { user } = useAuth();
  const [formData, setFormData] = useState<DeadlineCalculationInput>({
    event_date: format(new Date(), 'yyyy-MM-dd'),
    duration_value: 1,
    duration_unit: 'months',
    bundesland: user?.bundesland || 'BW',
    deadline_type: 'Ereignisfrist',
    procedural_code: 'ZPO',
  });
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [savingMode, setSavingMode] = useState(false);
  const [saveData, setSaveData] = useState({
    case_name: '',
    case_number: '',
    court: '',
    notes: '',
  });

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setResult(null);

    try {
      const response = await deadlineAPI.calculate(formData);
      setResult(response.result);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Calculation failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!result) return;

    try {
      await deadlineAPI.create({
        ...formData,
        ...saveData,
      });
      alert('Deadline saved successfully!');
      setSavingMode(false);
      setSaveData({ case_name: '', case_number: '', court: '', notes: '' });
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to save deadline');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Deadline Calculator</h1>

      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <form onSubmit={handleCalculate} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Event Date (Triggering Event)
              </label>
              <input
                type="date"
                required
                value={formData.event_date}
                onChange={(e) => setFormData({ ...formData, event_date: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Bundesland</label>
              <select
                value={formData.bundesland}
                onChange={(e) => setFormData({ ...formData, bundesland: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              >
                {BUNDESLAENDER.map((land) => (
                  <option key={land.code} value={land.code}>
                    {land.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Duration</label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="number"
                  required
                  min="1"
                  value={formData.duration_value}
                  onChange={(e) =>
                    setFormData({ ...formData, duration_value: parseInt(e.target.value) })
                  }
                  className="flex-1 min-w-0 block w-full border border-gray-300 rounded-l-md py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
                <select
                  value={formData.duration_unit}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      duration_unit: e.target.value as any,
                    })
                  }
                  className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm"
                >
                  <option value="days">Days</option>
                  <option value="weeks">Weeks</option>
                  <option value="months">Months</option>
                  <option value="years">Years</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Deadline Type</label>
              <select
                value={formData.deadline_type}
                onChange={(e) => setFormData({ ...formData, deadline_type: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              >
                {DEADLINE_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Procedural Code</label>
              <select
                value={formData.procedural_code}
                onChange={(e) => setFormData({ ...formData, procedural_code: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              >
                {PROCEDURAL_CODES.map((code) => (
                  <option key={code} value={code}>
                    {code}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
            >
              {loading ? 'Calculating...' : 'Calculate Deadline'}
            </button>
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}
        </form>
      </div>

      {result && (
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Calculation Result</h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-700">Final Deadline</p>
                <p className="text-3xl font-bold text-green-700">
                  {format(new Date(result.endDateAfterExtension), 'dd.MM.yyyy')}
                </p>
              </div>
              {result.wasExtended && (
                <div className="text-sm text-green-600">
                  ✓ Extended per § 193 BGB
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium text-gray-700">Start Date (§ 187 BGB)</p>
                <p className="text-xl font-semibold text-gray-900">
                  {format(new Date(result.startDate), 'dd.MM.yyyy')}
                </p>
              </div>

              {result.wasExtended && (
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-700">Extended From</p>
                  <p className="text-xl font-semibold text-blue-900">
                    {format(new Date(result.extendedFromDate), 'dd.MM.yyyy')}
                  </p>
                </div>
              )}
            </div>

            <div className="border-t pt-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Calculation Steps:</h3>
              <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600">
                {result.calculation.steps.map((step: string, i: number) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            </div>

            <div className="border-t pt-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Applied Rules:</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                {result.calculation.appliedRules.map((rule: string, i: number) => (
                  <li key={i}>{rule}</li>
                ))}
              </ul>
            </div>

            {result.warnings && result.warnings.length > 0 && (
              <div className="border-t pt-4">
                <h3 className="text-sm font-medium text-yellow-700 mb-2">Warnings:</h3>
                <ul className="space-y-1">
                  {result.warnings.map((warning: string, i: number) => (
                    <li key={i} className="text-sm text-yellow-600">
                      {warning}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {!savingMode ? (
              <button
                onClick={() => setSavingMode(true)}
                className="w-full mt-4 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
              >
                Save This Deadline
              </button>
            ) : (
              <div className="mt-4 space-y-4 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-medium text-gray-700">Save Deadline</h3>
                <input
                  type="text"
                  placeholder="Case Name *"
                  required
                  value={saveData.case_name}
                  onChange={(e) => setSaveData({ ...saveData, case_name: e.target.value })}
                  className="block w-full border border-gray-300 rounded-md py-2 px-3"
                />
                <input
                  type="text"
                  placeholder="Case Number"
                  value={saveData.case_number}
                  onChange={(e) => setSaveData({ ...saveData, case_number: e.target.value })}
                  className="block w-full border border-gray-300 rounded-md py-2 px-3"
                />
                <input
                  type="text"
                  placeholder="Court"
                  value={saveData.court}
                  onChange={(e) => setSaveData({ ...saveData, court: e.target.value })}
                  className="block w-full border border-gray-300 rounded-md py-2 px-3"
                />
                <textarea
                  placeholder="Notes"
                  value={saveData.notes}
                  onChange={(e) => setSaveData({ ...saveData, notes: e.target.value })}
                  className="block w-full border border-gray-300 rounded-md py-2 px-3"
                  rows={3}
                />
                <div className="flex space-x-2">
                  <button
                    onClick={handleSave}
                    disabled={!saveData.case_name}
                    className="flex-1 py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-green-600 hover:bg-green-700 disabled:opacity-50"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setSavingMode(false)}
                    className="flex-1 py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
