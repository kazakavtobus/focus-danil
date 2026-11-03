'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { EventEmitter } = require('node:events');
const { createUpdateController } = require('../updater');

function harness({ packaged = true, platform = 'win32', portable = false } = {}) {
  const methods = {};
  const sent = [];
  const ipcMain = { handle(name, fn) { methods[name] = fn; } };
  const autoUpdater = new EventEmitter();
  autoUpdater.checkForUpdates = async () => { autoUpdater.emit('checking-for-update'); };
  autoUpdater.downloadUpdate = async () => { autoUpdater.emit('update-downloaded', {version: '1.2.0'}); };
  let installed = false;
  autoUpdater.quitAndInstall = () => { installed = true; };
  const controller = createUpdateController({
    app: { isPackaged: packaged, getVersion: () => '1.1.0' }, ipcMain,
    webContents: () => ({ isDestroyed: () => false, send: (event, data) => sent.push({event,data}) }),
    autoUpdater, platform, portable
  });
  return { methods, sent, autoUpdater, controller, didInstall: () => installed };
}

test('development mode keeps update controls unavailable', async () => {
  const h = harness({packaged:false});
  assert.equal((await h.methods['updates:status']()).phase,'unsupported');
  assert.equal((await h.methods['updates:check']()).phase,'unsupported');
});
test('update check, download, and install follow guarded states', async () => {
  const h = harness();
  assert.equal((await h.methods['updates:check']()).phase, 'checking');
  h.autoUpdater.emit('update-available',{version:'1.2.0'});
  assert.equal((await h.methods['updates:status']()).phase,'available');
  assert.equal((await h.methods['updates:download']()).phase,'ready');
  assert.equal(h.methods['updates:install']().ok,true);
  assert.equal(h.didInstall(),true);
  assert.ok(h.sent.some(x => x.data.phase === 'ready'));
});
test('no update and network errors are shown without silent success', async () => {
  const h = harness();
  h.autoUpdater.emit('update-not-available');
  assert.equal((await h.methods['updates:status']()).phase, 'up-to-date');
  h.autoUpdater.emit('error',new Error('network offline'));
  assert.equal((await h.methods['updates:status']()).phase, 'error');
  assert.match((await h.methods['updates:status']()).message,/network offline/);
});
test('portable and unsupported platforms never install updates', () => {
  for (const options of [{portable:true},{platform:'linux'}]) {
    const h = harness(options);
    h.autoUpdater.emit('update-downloaded',{version:'1.2.0'});
    assert.equal(h.methods['updates:install']().ok,false);
  }
});
