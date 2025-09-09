const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  login: (username, password) => ipcRenderer.invoke('login', username, password),
  runAgents: () => ipcRenderer.invoke('run-agents'),
  onLogMessage: (callback) => ipcRenderer.on('log-message', callback)
});
