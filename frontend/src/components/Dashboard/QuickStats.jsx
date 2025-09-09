import React from 'react';

const Stat = ({ label, value, sub }) => (
  <div className="rounded-lg border border-gray-200 bg-white p-4">
    <div className="text-xs uppercase text-gray-500">{label}</div>
    <div className="text-2xl font-semibold text-gray-900">{value}</div>
    {sub && <div className="text-xs text-gray-400">{sub}</div>}
  </div>
);

export default function QuickStats({ data = {} }) {
  const { activeRooms = 3, participants = 7, sttLatency = '85ms', ttsLatency = '120ms', errors1h = 0 } = data;
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
      <Stat label="Active Rooms" value={activeRooms} />
      <Stat label="Participants" value={participants} />
      <Stat label="STT p50" value={sttLatency} sub="last 5m" />
      <Stat label="TTS p50" value={ttsLatency} sub="last 5m" />
      <Stat label="Errors (1h)" value={errors1h} />
    </div>
  );
}
