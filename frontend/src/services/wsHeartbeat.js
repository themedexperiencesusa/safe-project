// Lightweight WS heartbeat helper: auto-ACK ctrl.ping to keep server watchdog happy
// Usage:
//   const ws = new WebSocket(url);
//   attachHeartbeatAck(ws);
//   ws.onmessage = (e) => { /* your existing handlers in addition to ACKs */ };

export function attachHeartbeatAck(ws) {
  if (!ws) return;
  const listener = (event) => {
    try {
      const msg = JSON.parse(event.data);
      if (msg && msg.type === 'ctrl.ping') {
        ws.send(JSON.stringify({ type: 'ctrl.ack', ts: Date.now() }));
      }
    } catch (_) {
      // ignore non-JSON frames
    }
  };
  ws.addEventListener('message', listener);
  return () => ws.removeEventListener('message', listener);
}
