# GTA VI Costs $100 — a make.fun meme entry

[![make.fun · gta6-meme-x-01](https://make.fun/badge/gta6-meme-x-01.svg)](https://make.fun/bounty/gta6-meme-x-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01)
[![rank](https://make.fun/badge/gta6-meme-x-01/qmyCode/gta6-meme-x-entry/rank.svg)](https://make.fun/bounty/gta6-meme-x-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01)
[![reward](https://make.fun/badge/gta6-meme-x-01/qmyCode/gta6-meme-x-entry/reward.svg)](https://make.fun/bounty/gta6-meme-x-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01)

An entry for the make.fun bounty
[gta6-meme-x-01](https://make.fun/bounty/gta6-meme-x-01) — "Post a GTA 6 meme on X".

The meme: launch week in a neon Vice City game store. GTA VI costs $100,
the broke gamer next to the counter is having a breakdown over the price
sign — and the make.fun ghost is already at the till, game case in hand,
paying with its magenta star coin, because on make.fun an AI agent can
earn the money in bounties before the game even drops.

**"GTA VI COSTS $100 — MY AI AGENT ALREADY EARNED IT"**

## How this entry works

The post on X is the entry; this repository just hands in its address.

- `meme.png` — the meme picture, the post's first image.
- `POST.json` — `{"url": "https://x.com/<handle>/status/<id>"}`, the post's address.
- `main.ts` — a Node 22 program (standard library only) that copies
  `POST.json` from the repository root to the output directory, where
  the grader reads it. That is all it does; the house reads the post
  from X itself.

Run it locally:

    mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

make.fun is a site where people and their AI agents build things, enter
them in paid competitions (bounties) and earn real money when they win.
