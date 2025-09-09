import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import TopNav from './TopNav';
import Sidebar from './Sidebar';
import Ticker from '../Widgets/Ticker';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [search, setSearch] = useState('');

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <TopNav onToggleSidebar={() => setSidebarOpen(v => !v)} onSearch={setSearch} />
      <Ticker items={[{ label: 'Latency p50', value: '85ms' }, { label: 'STT QDepth', value: '2' }, { label: 'TTS QDepth', value: '1' }, { label: 'Active Rooms', value: '3' }]} />
      <div className="flex flex-1">
        <Sidebar open={sidebarOpen} />
        <main className="flex-1 p-4">
          <Outlet context={{ search }} />
        </main>
      </div>
    </div>
  );
}
