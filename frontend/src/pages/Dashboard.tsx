import React, { useState, useEffect } from 'react';
import { deadlineAPI, Deadline } from '../services/api';
import { format, isPast, isToday, isTomorrow, differenceInDays } from 'date-fns';

export default function Dashboard() {
  const [deadlines, setDeadlines] = useState<Deadline[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('active');

  useEffect(() => {
    loadDeadlines();
  }, [filter]);

  const loadDeadlines = async () => {
    try {
      const status = filter === 'all' ? undefined : filter;
      const { deadlines } = await deadlineAPI.getAll(status);
      setDeadlines(deadlines);
    } catch (error) {
      console.error('Failed to load deadlines:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async (id: string) => {
    if (window.confirm('Mark this deadline as completed?')) {
      try {
        await deadlineAPI.complete(id);
        loadDeadlines();
      } catch (error) {
        alert('Failed to complete deadline');
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this deadline?')) {
      try {
        await deadlineAPI.delete(id);
        loadDeadlines();
      } catch (error) {
        alert('Failed to delete deadline');
      }
    }
  };

  const getUrgencyColor = (deadline: Deadline) => {
    const deadlineDate = new Date(deadline.deadline_date);
    const daysUntil = differenceInDays(deadlineDate, new Date());

    if (isPast(deadlineDate)) return 'bg-red-100 border-red-300';
    if (isToday(deadlineDate)) return 'bg-red-50 border-red-200';
    if (isTomorrow(deadlineDate)) return 'bg-orange-50 border-orange-200';
    if (daysUntil <= 7) return 'bg-yellow-50 border-yellow-200';
    return 'bg-green-50 border-green-200';
  };

  const getUrgencyLabel = (deadline: Deadline) => {
    const deadlineDate = new Date(deadline.deadline_date);
    const daysUntil = differenceInDays(deadlineDate, new Date());

    if (isPast(deadlineDate)) return 'OVERDUE';
    if (isToday(deadlineDate)) return 'DUE TODAY';
    if (isTomorrow(deadlineDate)) return 'DUE TOMORROW';
    if (daysUntil <= 7) return `${daysUntil} days left`;
    return `${daysUntil} days left`;
  };

  const activeDeadlines = deadlines.filter(d => d.status === 'active');
  const overdueCount = activeDeadlines.filter(d => isPast(new Date(d.deadline_date))).length;
  const todayCount = activeDeadlines.filter(d => isToday(new Date(d.deadline_date))).length;
  const thisWeekCount = activeDeadlines.filter(d => {
    const daysUntil = differenceInDays(new Date(d.deadline_date), new Date());
    return daysUntil >= 0 && daysUntil <= 7;
  }).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-4 mb-8">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="text-3xl font-bold text-gray-900">{activeDeadlines.length}</div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Active Deadlines</dt>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-red-50 overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="text-3xl font-bold text-red-600">{overdueCount}</div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-red-700 truncate">Overdue</dt>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-orange-50 overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="text-3xl font-bold text-orange-600">{todayCount}</div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-orange-700 truncate">Due Today</dt>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="text-3xl font-bold text-yellow-600">{thisWeekCount}</div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-yellow-700 truncate">This Week</dt>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {['active', 'all', 'completed'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab as any)}
              className={`${
                filter === tab
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Deadline List */}
      <div className="space-y-4">
        {deadlines.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No deadlines found</p>
            <a href="/calculator" className="mt-4 inline-block text-primary-600 hover:text-primary-500">
              Calculate a new deadline
            </a>
          </div>
        ) : (
          deadlines.map((deadline) => (
            <div
              key={deadline.id}
              className={`border rounded-lg p-6 ${getUrgencyColor(deadline)}`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center">
                    <h3 className="text-lg font-semibold text-gray-900">{deadline.case_name}</h3>
                    {deadline.deadline_type === 'Notfrist' && (
                      <span className="ml-2 px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded">
                        NOTFRIST
                      </span>
                    )}
                  </div>
                  {deadline.case_number && (
                    <p className="text-sm text-gray-600 mt-1">Case: {deadline.case_number}</p>
                  )}
                  {deadline.court && (
                    <p className="text-sm text-gray-600">Court: {deadline.court}</p>
                  )}
                  <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                    <span>{deadline.procedural_code}</span>
                    <span>•</span>
                    <span>{deadline.bundesland}</span>
                  </div>
                </div>

                <div className="ml-6 text-right">
                  <div className="text-sm font-medium text-gray-700">Deadline</div>
                  <div className="text-2xl font-bold text-gray-900">
                    {format(new Date(deadline.deadline_date), 'dd.MM.yyyy')}
                  </div>
                  {deadline.status === 'active' && (
                    <div className="mt-1 text-sm font-medium text-orange-600">
                      {getUrgencyLabel(deadline)}
                    </div>
                  )}
                  {deadline.status === 'completed' && (
                    <div className="mt-1 text-sm font-medium text-green-600">✓ Completed</div>
                  )}
                </div>
              </div>

              {deadline.notes && (
                <div className="mt-4 text-sm text-gray-600 border-t pt-4">
                  <strong>Notes:</strong> {deadline.notes}
                </div>
              )}

              {deadline.status === 'active' && (
                <div className="mt-4 flex space-x-2">
                  <button
                    onClick={() => handleComplete(deadline.id)}
                    className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded hover:bg-green-700"
                  >
                    Mark Complete
                  </button>
                  <button
                    onClick={() => handleDelete(deadline.id)}
                    className="px-4 py-2 text-sm font-medium text-red-700 bg-red-100 rounded hover:bg-red-200"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
