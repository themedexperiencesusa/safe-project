import React, { useRef, useCallback } from 'react';

export default function TopNav({ onToggleSidebar, onSearch }) {
  const debounceRef = useRef(null);
  const handleSearchChange = useCallback((e) => {
    const val = e.target.value;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      onSearch && onSearch(val);
    }, 200);
  }, [onSearch]);
  return (
    <header className="sticky top-0 z-20 w-full bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-2">
          <button
            aria-label="Toggle menu"
            className="p-2 rounded hover:bg-gray-100"
            onClick={onToggleSidebar}
          >
            <span className="material-icons">menu</span>
          </button>
          <div className="font-semibold text-gray-800">MCC Offices</div>
        </div>
        <div className="flex-1 max-w-xl mx-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search rooms, agents, transcripts, tasks..."
              className="w-full rounded-md border border-gray-300 pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={handleSearchChange}
            />
            <span className="material-icons absolute left-2 top-1/2 -translate-y-1/2 text-gray-400">search</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 text-sm rounded bg-indigo-600 text-white hover:bg-indigo-700">Summon Agent</button>
          <button className="px-3 py-1.5 text-sm rounded border border-gray-300 hover:bg-gray-50">New Room</button>
        </div>
      </div>
    </header>
  );
}
