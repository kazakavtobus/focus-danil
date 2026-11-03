import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// The workflow calls this with GITHUB_REPOSITORY from GitHub Actions; you can
// run `npm run github:configure -- username/FOCUS` for a local Windows build.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const slug = process.argv[2] || process.env.GITHUB_REPOSITORY || '';
const match = /^([a-zA-Z0-9-]{1,39})\/([a-zA-Z0-9._-]{1,100})$/.exec(slug);
if (!match || match[1].startsWith('-') || match[2] === '.' || match[2] === '..') {
  console.error('Укажи GitHub-репозиторий в виде username/FOCUS (или GITHUB_REPOSITORY).');
  process.exit(1);
}
const [, owner, repo] = match;
const p = path.join(root, 'package.json');
const pkg = JSON.parse(fs.readFileSync(p, 'utf8'));
pkg.repository = { type: 'git', url: `https://github.com/${owner}/${repo}.git` };
pkg.build.publish = [{ provider: 'github', owner, repo }];
fs.writeFileSync(p, JSON.stringify(pkg, null, 2) + '\n');
console.log(`GitHub Releases настроен: https://github.com/${owner}/${repo}/releases`);
