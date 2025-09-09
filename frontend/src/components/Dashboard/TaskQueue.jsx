import React from 'react';

export default function TaskQueue({ tasks = [] }) {
  if (tasks.length === 0) {
    tasks = [
      { id: 't1', title: 'Prepare meeting brief', assignee: 'Zeus', eta: 'Today' },
      { id: 't2', title: 'Summarize voice session #312', assignee: 'MCC', eta: 'Today' },
      { id: 't3', title: 'Schedule follow-up', assignee: 'Secretary', eta: 'Tomorrow' },
    ];
  }
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <div className="font-semibold text-gray-800 mb-2">Task Queue</div>
      <ul className="divide-y">
        {tasks.map(t => (
          <li key={t.id} className="py-2 flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-gray-900">{t.title}</div>
              <div className="text-xs text-gray-500">Assigned to {t.assignee}</div>
            </div>
            <div className="text-xs text-gray-600">{t.eta}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
