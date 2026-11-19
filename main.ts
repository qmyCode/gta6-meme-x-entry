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

import { copyFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const botDir: string = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const outputDir: string = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const source = join(botDir, 'POST.json');
const target = join(outputDir, 'POST.json');

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
