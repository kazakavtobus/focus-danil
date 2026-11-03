'use strict';
const fs = require('node:fs');
const path = require('node:path');
const zlib = require('node:zlib');
const raw = fs.readFileSync(path.resolve('bootstrap/source.b64'), 'utf8').replace(/\s+/g,'');
if (!/^[A-Za-z0-9+/]+={0,2}$/.test(raw)) throw new Error('Invalid bootstrap payload');
const pack = JSON.parse(zlib.brotliDecompressSync(Buffer.from(raw,'base64')).toString('utf8'));
if (pack.version !== 1 || !pack.files || typeof pack.files !== 'object') throw new Error('Unsupported package');
let imported = 0;
for (const [name, b64] of Object.entries(pack.files)) {
  if (name.startsWith('.github/workflows/')) continue; // workflows installed separately
  if (!/^[a-zA-Z0-9._/\-]+$/.test(name) || name.split('/').some(x => !x || x==='.' || x==='..')) throw new Error('Unsafe path: '+name);
  const dest = path.resolve(name);
  if (!dest.startsWith(process.cwd() + path.sep)) throw new Error('Path escapes repository: ' + name);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, Buffer.from(b64, 'base64'));
  imported++;
}
console.log('Restored ' + imported + ' FOCUS source files');
