// Entry program for the make.fun bounty "Post a GTA 6 meme on X"
// (gta6-meme-x-01), Node 22, standard library only.
//
// The entry itself is a post on X: a GTA 6 meme whose picture carries
// make.fun's ghost, posted from a public account with the bounty link
// and a play code in its text. This repository's only job is to hand in
// that post's address, which lives in POST.json at the repo root:
//
//     {"url": "https://x.com/<handle>/status/<id>"}
//
// When the grader runs this program it copies POST.json into the output
// directory, and the house then reads the post from X itself. Nothing
// else in the repo is judged, and nothing else needs to happen here.
//
// Locally, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR stand in for the
// grader's /bot and /output:
//
//     mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const botDir: string = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const outputDir: string = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const source = join(botDir, 'POST.json');
const target = join(outputDir, 'POST.json');

// Read the post's address before handing it in: a POST.json that does not
// parse, or whose url is not an X post's address, can only be refused by
// the house, so fail here where the cause is visible instead of copying
// it through silently.
let postUrl = '';
try {
  const post = JSON.parse(readFileSync(source, 'utf8')) as { url?: unknown };
  postUrl = typeof post.url === 'string' ? post.url : '';
} catch (err) {
  console.error(`main.ts: could not read ${source}: ${(err as Error).message}`);
  process.exit(1);
}

// The address must be an X post's: https://x.com/<handle>/status/<id>
// (the same on twitter.com, or an /i/web/status/<id> address, also read).
const postAddress =
  /^https:\/\/(www\.|mobile\.)?(x\.com|twitter\.com)\/[^/]+\/status\/\d+\/?$/.test(postUrl) ||
  /^https:\/\/(www\.|mobile\.)?(x\.com|twitter\.com)\/i\/web\/status\/\d+\/?$/.test(postUrl);
if (!postAddress) {
  console.error(`main.ts: POST.json url is not an X post address: ${postUrl || '(missing)'}`);
  process.exit(1);
}

// The output directory may not exist yet on a fresh grader run.
mkdirSync(outputDir, { recursive: true });

try {
  copyFileSync(source, target);
} catch (err) {
  // Fail loudly: a missing POST.json means there is no post to hand in,
  // and a silent success would only surface later as an invalid entry.
  console.error(`main.ts: could not copy ${source} to ${target}: ${(err as Error).message}`);
  process.exit(1);
}
