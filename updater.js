'use strict';

/**
 * FOCUS updater. Only installer builds can self-update. The update provider is
 * baked into app-update.yml by electron-builder at build time (GitHub Releases).
 * This module is dependency-injected so state transitions can be tested offline.
 */
function createUpdateController({ app, ipcMain, webContents, autoUpdater, platform = process.platform, portable = Boolean(process.env.PORTABLE_EXECUTABLE_FILE) }) {
  const supported = platform === 'win32' && app.isPackaged && !portable;
  let status = {
    phase: supported ? 'idle' : 'unsupported',
    currentVersion: app.getVersion(), latestVersion: null, percent: 0,
    message: supported ? 'Нажми «Проверить обновления», чтобы узнать о новой версии.'
      : 'Обновления доступны в установленной версии Windows (не в демо, режиме разработки или portable).'
  };
  const snapshot = () => ({ ...status });
  const emit = (change) => {
    status = { ...status, ...change };
    const wc = webContents();
    if (wc && !wc.isDestroyed()) wc.send('updates:status', snapshot());
    return snapshot();
  };
  const fail = (err) => emit({ phase: 'error', message: `Не удалось обновить: ${err?.message || String(err)}` });

  ipcMain.handle('updates:status', () => snapshot());
  ipcMain.handle('updates:check', async () => {
    if (!supported) return snapshot();
    if (['checking', 'downloading', 'ready'].includes(status.phase)) return snapshot();
    emit({ phase: 'checking', message: 'Проверяем GitHub Releases…', percent: 0 });
    try { await autoUpdater.checkForUpdates(); }
    catch (err) { fail(err); }
    return snapshot();
  });
  ipcMain.handle('updates:download', async () => {
    if (!supported || status.phase !== 'available') return snapshot();
    emit({ phase: 'downloading', message: 'Загружаем обновление…', percent: 0 });
    try { await autoUpdater.downloadUpdate(); }
    catch (err) { fail(err); }
    return snapshot();
  });
  ipcMain.handle('updates:install', () => {
    if (!supported || status.phase !== 'ready') return { ok: false, ...snapshot() };
    // Quit happens within Electron Updater. Do not run a second installer or
    // delete appData; per-user records remain in app.getPath('userData').
    autoUpdater.quitAndInstall(false, true);
    return { ok: true };
  });

  if (supported) {
    autoUpdater.autoDownload = false;
    autoUpdater.autoInstallOnAppQuit = false;
    autoUpdater.allowPrerelease = false;
    autoUpdater.on('checking-for-update', () => emit({ phase: 'checking', message: 'Проверяем GitHub Releases…' }));
    autoUpdater.on('update-available', info => emit({ phase: 'available', latestVersion: info.version, message: `Доступна версия ${info.version}. Можешь скачать и установить её.` }));
    autoUpdater.on('update-not-available', () => emit({ phase: 'up-to-date', latestVersion: app.getVersion(), message: 'У тебя уже установлена последняя версия FOCUS.' }));
    autoUpdater.on('download-progress', progress => emit({ phase: 'downloading', percent: Math.max(0, Math.min(100, Number(progress.percent) || 0)), message: `Загружено ${Math.round(progress.percent || 0)}%.` }));
    autoUpdater.on('update-downloaded', info => emit({ phase: 'ready', latestVersion: info.version, percent: 100, message: `Версия ${info.version} загружена. Установить и перезапустить FOCUS?` }));
    autoUpdater.on('error', fail);
  }
  return { snapshot, supported };
}
module.exports = { createUpdateController };
