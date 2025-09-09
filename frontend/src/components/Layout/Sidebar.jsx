import React from 'react';
import { NavLink } from 'react-router-dom';

const linkCls = ({ isActive }) => `block px-3 py-2 rounded text-sm ${isActive ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`;

export default function Sidebar({ open }) {
  return (
    <aside className={`transition-all border-r border-gray-200 bg-white ${open ? 'w-64' : 'w-0'} overflow-hidden`}> 
      <nav className="p-3 space-y-1">
        <div className="text-xs uppercase tracking-wide text-gray-400 px-3">Overview</div>
        <NavLink to="/dashboard" className={linkCls}>Dashboard</NavLink>
        <div className="text-xs uppercase tracking-wide text-gray-400 px-3 mt-3">Rooms</div>
        <NavLink to="/concierge/leads" className={linkCls}>Lobby</NavLink>
        <NavLink to="/concierge/clients" className={linkCls}>Offices</NavLink>
        <div className="text-xs uppercase tracking-wide text-gray-400 px-3 mt-3">Admin</div>
        <NavLink to="/admin/users" className={linkCls}>Users</NavLink>
        <NavLink to="/admin/reports" className={linkCls}>Reports</NavLink>
        <div className="text-xs uppercase tracking-wide text-gray-400 px-3 mt-3">Account</div>
        <NavLink to="/profile" className={linkCls}>Profile</NavLink>
      </nav>
    </aside>
  );
}
