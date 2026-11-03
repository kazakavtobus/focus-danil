'use strict';
const { app, BrowserWindow, ipcMain, dialog, Tray, Menu, Notification, nativeImage, protocol, net } = require('electron');
const path = require('node:path');
const fs = require('node:fs/promises');
const crypto = require('node:crypto');
const { pathToFileURL } = require('node:url');
const { createUpdateController } = require('./updater');

protocol.registerSchemesAsPrivileged([
  { scheme: 'focus-photo', privileges: { secure: true, standard: true, supportFetchAPI: true } }
]);

if (process.platform === 'win32') app.setAppUserModelId('com.tvoykazak.focus');
const single = app.requestSingleInstanceLock();
if (!single) app.quit();

let win, tray, quitting = false;
let cache = null, lastSignals = new Set();
const STORE = () => path.join(app.getPath('userData'), 'focus-state.json');
const PHOTOS = () => path.join(app.getPath('userData'), 'photos');
function today() {
  const d = new Date();
  return [d.getFullYear(), String(d.getMonth()+1).padStart(2,'0'), String(d.getDate()).padStart(2,'0')].join('-');
}
function initialState() {
  return {
    version: 1,
    start: { date: '2026-11-02', weight: 89.1 },
    settings: { name: 'Данил', targetWeight: 80, calorieGoal: 1800, treadmillGoal: 60,
      autoLaunch: false, notifications: true, sound: true, reminderTime: '20:30',
      weeklyReminderDay: 0, weeklyReminderTime: '18:00' },
    daily: {},
    weekly: [{ date: '2026-11-02', weight: 89.1, waist: null, notes: '', photos: [] }]
  };
}
function normalize(raw) {
  const defaults = initialState();
  const input = raw && typeof raw === 'object' ? raw : {};
  return { version: 1,
    start: { ...defaults.start, ...(input.start || {}) },
    settings: { ...defaults.settings, ...(input.settings || {}) },
    daily: input.daily && typeof input.daily === 'object' && !Array.isArray(input.daily) ? input.daily : {},
    weekly: Array.isArray(input.weekly) ? input.weekly : defaults.weekly
  };
}
async function load() {
  if (cache) return cache;
  try { cache = normalize(JSON.parse(await fs.readFile(STORE(), 'utf8'))); }
  catch { cache = initialState(); }
  return cache;
}
async function persist(obj) {
  cache = normalize(obj);
  await fs.mkdir(app.getPath('userData'), { recursive: true });
  const p = STORE(), tmp = p + '.tmp';
  await fs.writeFile(tmp, JSON.stringify(cache, null, 2), 'utf8');
  try { await fs.rename(tmp,p); }
  catch (e) { await fs.copyFile(tmp,p); await fs.unlink(tmp).catch(()=>{}); }
  configureAutoStart(cache.settings.autoLaunch);
  return cache;
}
function configureAutoStart(enabled) {
  if (!app.isPackaged) return;
  try { app.setLoginItemSettings({ openAtLogin: !!enabled, path: process.execPath }); }
  catch(e) { console.warn('Autostart failed:',e.message); }
}
function showWindow() { if (!win || win.isDestroyed()) return; win.show(); win.focus(); }
function makeWindow() {
  win = new BrowserWindow({
    width: 1400, height: 880, minWidth: 1000, minHeight: 670,
    backgroundColor: '#061e19', show: false, autoHideMenuBar: true,
    icon: path.join(__dirname,'assets','icon.png'),
    webPreferences: { preload: path.join(__dirname,'preload.js'), contextIsolation: true,
      nodeIntegration: false, sandbox: false, webSecurity: true }
  });
  win.loadFile(path.join(__dirname,'index.html'));
  win.once('ready-to-show', () => win.show());
  win.on('close', event => { if (!quitting) {event.preventDefault(); win.hide();} });
  win.on('closed', () => { win = null; });
  win.webContents.setWindowOpenHandler(() => ({ action:'deny' }));
}
function makeTray() {
  tray = new Tray(path.join(__dirname,'assets','tray.png'));
  tray.setToolTip('FOCUS — Stay Focused');
  tray.setContextMenu(Menu.buildFromTemplate([
    { label:'Открыть FOCUS', click:showWindow },
    { type:'separator' },
    { label:'Выход', click:()=>{ quitting = true; app.quit(); } }
  ]));
  tray.on('double-click',showWindow);
}
function notify(key, title, body) {
  const k = `${today()}:${key}`;
  if (lastSignals.has(k) || !Notification.isSupported()) return;
  lastSignals.add(k);
  const n = new Notification({ title, body, silent: true, icon: path.join(__dirname,'assets','icon.png') });
  n.on('click',showWindow);
  n.show();
  if (cache?.settings?.sound && win && !win.isDestroyed()) win.webContents.send('play-chime');
}
function reminders() {
  const s = cache?.settings;
  if (!s || !s.notifications) return;
  const now = new Date();
  const hour = String(now.getHours()).padStart(2,'0');
  const minute = String(now.getMinutes()).padStart(2,'0');
  const hm = `${hour}:${minute}`;
  const name = (s.name||'Данил').slice(0,60);
  if (hm === '09:00') notify('morning', `Доброе утро, ${name}`, 'Новый день. Не идеальный — просто твой.');
  if (hm === s.reminderTime) notify('evening', `${name}, как прошёл день?`, 'Отметь привычки и сохрани маленькие победы.');
  if (now.getDay() === Number(s.weeklyReminderDay) && hm === s.weeklyReminderTime)
    notify('weekly', `${name}, время для еженедельной записи`, 'Вес, заметки и фото — только если хочется.');
  if (lastSignals.size > 100) lastSignals = new Set([...lastSignals].slice(-30));
}
function safeFilename(name) {
  return typeof name === 'string' && /^[a-f0-9-]{36}\.(png|jpe?g|webp)$/i.test(name) ? name : null;
}

app.on('second-instance', showWindow);
app.whenReady().then(async () => {
  await fs.mkdir(PHOTOS(), {recursive:true});
  protocol.handle('focus-photo', async req => {
    try {
      const url = new URL(req.url);
      const filename = safeFilename(decodeURIComponent(url.pathname.slice(1)));
      if (!filename || url.hostname !== 'local') return new Response('Invalid image', {status:400});
      return net.fetch(pathToFileURL(path.join(PHOTOS(), filename)).toString());
    } catch {return new Response('Not found', {status:404});}
  });
  await load(); configureAutoStart(cache.settings.autoLaunch);
  makeWindow(); makeTray();
  // GitHub Releases are checked only when the user presses the update button.
  // Electron Builder configures the provider in app-update.yml for installed builds.
  const { autoUpdater } = require('electron-updater');
  createUpdateController({ app, ipcMain, webContents: () => win?.webContents, autoUpdater });
  ipcMain.handle('state:load', () => load());
  ipcMain.handle('state:save', (_e, data) => persist(data));
  ipcMain.handle('photos:add', async () => {
    const choose = await dialog.showOpenDialog(win, {
      title:'Добавить фотографию', properties:['openFile'],
      filters:[{ name:'Фотографии', extensions:['jpg','jpeg','png','webp'] }]
    });
    if (choose.canceled || !choose.filePaths.length) return null;
    const src = choose.filePaths[0];
    const ext = path.extname(src).toLowerCase();
    if (!['.png','.jpg','.jpeg','.webp'].includes(ext)) throw new Error('Неподдерживаемый формат');
    const info = await fs.stat(src);
    if (info.size > 30*1024*1024) throw new Error('Фотография больше 30 МБ');
    const filename = `${crypto.randomUUID()}${ext}`;
    await fs.copyFile(src, path.join(PHOTOS(),filename));
    return { id: crypto.randomUUID(), filename, dateAdded: new Date().toISOString() };
  });
  ipcMain.handle('photos:delete', async (_e, filename) => {
    const n = safeFilename(filename);
    if (!n) return false;
    await fs.unlink(path.join(PHOTOS(),n)).catch(()=>{});
    return true;
  });
  ipcMain.handle('backup:export', async () => {
    const result = await dialog.showSaveDialog(win, { title:'Резервная копия FOCUS',
      defaultPath:`FOCUS-backup-${today()}.json`, filters:[{name:'FOCUS backup',extensions:['json']}] });
    if (result.canceled || !result.filePath) return false;
    const used = new Set();
    for (const item of cache.weekly) for (const pic of (item.photos||[])) if (safeFilename(pic.filename)) used.add(pic.filename);
    const photos = {};
    for (const fn of used) {
      try { photos[fn] = (await fs.readFile(path.join(PHOTOS(),fn))).toString('base64'); }
      catch { /* deleted photo */ }
    }
    await fs.writeFile(result.filePath, JSON.stringify({ format:'FOCUS-backup-1', exportedAt:new Date().toISOString(), state:cache, photos }), 'utf8');
    return true;
  });
  ipcMain.handle('backup:import', async () => {
    const choose = await dialog.showOpenDialog(win, { title:'Импорт резервной копии FOCUS',
      properties:['openFile'], filters:[{ name:'FOCUS backup',extensions:['json'] }] });
    if (choose.canceled || !choose.filePaths.length) return false;
    const filepath = choose.filePaths[0];
    if ((await fs.stat(filepath)).size > 300*1024*1024) throw new Error('Слишком большой файл');
    const backup = JSON.parse(await fs.readFile(filepath,'utf8'));
    if (backup.format !== 'FOCUS-backup-1' || !backup.state || !Array.isArray(backup.state.weekly))
      throw new Error('Неверный формат резервной копии');
    for (const [filename, base64] of Object.entries(backup.photos || {})) {
      if (!safeFilename(filename) || typeof base64 !== 'string') continue;
      await fs.writeFile(path.join(PHOTOS(),filename), Buffer.from(base64,'base64'));
    }
    await persist(backup.state);
    win.webContents.send('state:imported',cache);
    return true;
  });
  ipcMain.handle('data:location', () => app.getPath('userData'));
  ipcMain.handle('data:reset', async () => {
    await fs.rm(PHOTOS(), {recursive:true,force:true});
    await fs.mkdir(PHOTOS(), {recursive:true});
    return persist(initialState());
  });
  ipcMain.handle('app:show',showWindow);
  setInterval(reminders, 30000);
});
app.on('before-quit',()=>{quitting=true;});
app.on('window-all-closed', () => { /* keep running in tray */ });
