const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const read = n => fs.readFileSync(require('node:path').join(__dirname, '..', n), 'utf8');
test('frameless window supports IPC actions', () => {
 const main=read('main.js'), preload=read('preload.js');
 assert.match(main,/frame: false/);
 for(const n of ['window:minimize','window:toggle-maximize','window:close','window:is-maximized']) assert.ok(main.includes(n));
 for(const n of ['minimizeWindow','toggleMaximizeWindow','closeWindow','onWindowState']) assert.ok(preload.includes(n));
});
test('custom chrome has accessible buttons',()=>{
 const html=read('index.html');
 for(const n of ['window-minimize','window-maximize','window-close']) assert.ok(html.includes('data-action="'+n+'"'));
 assert.ok(html.includes('aria-label="Управление окном"'));
});
test('fluid window and scrollbar styling',()=>{
 const css=read('styles.css');
 assert.match(css,/grid-template-columns:clamp\(210px,17vw,246px\) minmax\(0,1fr\)/);
 assert.match(css,/::-webkit-scrollbar-thumb/);
 assert.match(css,/--chrome-height:48px/);
});
