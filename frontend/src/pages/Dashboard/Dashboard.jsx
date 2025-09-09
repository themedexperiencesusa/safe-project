import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import QuickStats from '../../components/Dashboard/QuickStats';
import UpcomingEvents from '../../components/Dashboard/UpcomingEvents';
import TaskQueue from '../../components/Dashboard/TaskQueue';
import api from '../../services/api';

export default function Dashboard() {
  const { search } = useOutletContext() || { search: '' };
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    let mounted = true;
    let timerId;

    const fetchMetrics = async () => {
      try {
        const { data } = await api.get('/metrics/quick');
        if (!mounted) return;
        // Map backend keys to QuickStats props
        setMetrics({
          activeRooms: data.active_rooms ?? 0,
          participants: data.participants ?? 0,
          sttLatency: (data.stt_p50_ms ?? 0) + 'ms',
          ttsLatency: (data.tts_p50_ms ?? 0) + 'ms',
          errors1h: data.errors_1h ?? 0,
        });
      } catch (e) {
        // keep silent to avoid noisy re-renders; optionally log later
      }
    };

    // initial fetch, then poll every 10s to keep CPU low
    fetchMetrics();
    timerId = setInterval(fetchMetrics, 10000);

    return () => {
      mounted = false;
      if (timerId) clearInterval(timerId);
    };
  }, []);

  // In future, use `search` to filter content across widgets.
  return (
    <div className="space-y-4">
      <QuickStats data={metrics || {}} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <UpcomingEvents />
        <TaskQueue />
      </div>
    </div>
  );
}
