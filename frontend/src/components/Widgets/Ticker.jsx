import React from 'react';

export default function Ticker({ items = [] }) {
  return (
    <div className="w-full bg-gray-900 text-gray-100 text-sm">
      <div className="overflow-hidden whitespace-nowrap py-1">
        <div className="inline-flex animate-[scroll_40s_linear_infinite] gap-8 px-4">
          {items.concat(items).map((it, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="text-gray-400">{it.label}:</span>
              <span className="font-medium">{it.value}</span>
            </div>
          ))}
        </div>
      </div>
      <style>{`@keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-50%);} }`}</style>
    </div>
  );
}
