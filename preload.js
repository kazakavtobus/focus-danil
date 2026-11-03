const {contextBridge, ipcRenderer} = require('electron');
contextBridge.exposeInMainWorld('focusDesktop', {
  load: () => ipcRenderer.invoke('state:load'),
  save: data => ipcRenderer.invoke('state:save',data),
  addPhoto: () => ipcRenderer.invoke('photos:add'),
  deletePhoto: filename => ipcRenderer.invoke('photos:delete',filename),
  exportBackup: () => ipcRenderer.invoke('backup:export'),
  importBackup: () => ipcRenderer.invoke('backup:import'),
  dataLocation: () => ipcRenderer.invoke('data:location'),
  resetData: () => ipcRenderer.invoke('data:reset'),
  updateStatus: () => ipcRenderer.invoke('updates:status'),
  checkUpdate: () => ipcRenderer.invoke('updates:check'),
  downloadUpdate: () => ipcRenderer.invoke('updates:download'),
  installUpdate: () => ipcRenderer.invoke('updates:install'),
  onUpdateStatus: callback => ipcRenderer.on('updates:status', (_event,status) => callback(status)),
  onChime: callback => ipcRenderer.on('play-chime',()=>callback()),
  onImport: callback => ipcRenderer.on('state:imported',(_event,state)=>callback(state)),
});
