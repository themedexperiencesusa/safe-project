import React from 'react';

export default function UpcomingEvents({ events = [] }) {
  if (events.length === 0) {
    events = [
      { id: 'e1', when: 'Fri 2:00 PM', who: 'Alan / Client A', what: 'Status Check-in' },
      { id: 'e2', when: 'Fri 4:30 PM', who: 'Zeus / Team', what: 'Backlog Grooming' },
      { id: 'e3', when: 'Mon 9:00 AM', who: 'MasterCEO / Ops', what: 'Weekly Standup' },
    ];
  }
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <div className="font-semibold text-gray-800 mb-2">Upcoming Events</div>
      <ul className="space-y-2">
        {events.map(ev => (
          <li key={ev.id} className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-gray-900">{ev.what}</div>
              <div className="text-xs text-gray-500">{ev.who}</div>
            </div>
            <div className="text-sm text-gray-700">{ev.when}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
