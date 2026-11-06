# Lucas Soares — Code. Design. Intelligence.

Cinematic portfolio. React + Vite + TypeScript, GSAP/ScrollTrigger + Lenis, a lazy-loaded Three.js scene, and an Express server for the "Ask my portfolio" assistant.

## Run

```bash
npm install
npm run dev          # site on :5173 (Vite) + API on :8787, proxied at /api
npm run build        # typecheck + production build into dist/
npm start            # one Node process: serves dist/ and /api on :8787
```

Without `ANTHROPIC_API_KEY` the assistant runs in **demo mode**: answers are assembled only from the site's content. Copy `.env.example` to `.env` to enable the LLM.

## Creative direction

- **A black-walled gallery.** The shell is strictly monochrome (`#000`, bone `#EDEDE8`, two greys). The work brings the colour; each case study gets its own field tone (`tone` in `projects.ts`).
- **The selection.** The single graphic device is an inverted block, like an editor's visual-mode selection. It sweeps the intro, travels through CODE / DESIGN / INTELLIGENCE, and is the hover state of links.
- **One typeface, one axis.** Archivo variable. Its width axis (62–125) is the kinetic typography: names open and close on scroll, rows widen on hover. `--w` is a registered custom property, so CSS and GSAP both animate it.
- **Motion with a job.** Intro (once per session, skippable with Esc/Enter, never shown with reduced motion) → name splits on scroll → pinned thesis → Workscape camera → AcessaNet horizontal walk → Kollect field colour and parallax → point cloud that reorganises per discipline → the closing line opens like the hero.

## Page map

| Route | What |
|---|---|
| `/` | Intro, hero, manifesto, work index, Workscape (pinned camera), AcessaNet (horizontal), Creative Lab (gallery + viewer), Image manipulation (before/after slider + Kollect series), Kollect, Expertise (Three.js), Ask, About + timeline, Contact |
| `/work/:slug` | Case study: problem, solution, role, tech, features, gallery, interactive Workscape schematic |
| `/cv` | Traditional résumé generated from the same data; "Save as PDF" prints an A4 page |

Mobile is its own layout rather than a scaled-down desktop: pinned sequences become docked or stacked layouts, the horizontal walk becomes a native swipe carousel, previews autoplay in view instead of on hover, and the menu is a full-screen type list. `prefers-reduced-motion` gets the same static layouts.

## Editing content

Everything visible lives in `src/content/` — components never hold copy.

| File | Holds |
|---|---|
| `profile.ts` | **Links (configure here)**, bio, education, languages |
| `experience.ts` | Timeline entries (add `period` once confirmed) |
| `projects.ts` | Case studies + `workscapeModules` |
| `lab.ts` | Creative Lab pieces |
| `manipulation.ts` | Image manipulation: before/after pairs and Kollect series (images from Behance, in `public/media/manipulation/`) |
| `expertise.ts` | The three universes |
| `ui.ts` | Interface copy (PT/EN) |

Every string is `{ pt, en }`. The AI knowledge base (`src/ai/knowledge.ts`) is **derived from these files**, so the assistant can't drift from the page.

### Adding video

```bash
npm run media -- "path/to/render.mp4" my-slug [--poster 12.5] [--from 2] [--len 6]
```

Writes `public/media/my-slug/{preview.mp4, full.mp4, poster.webp}` (6 s silent 720p preview, 1280p full with audio, WebP poster). Then reference it:

```ts
{ kind: "video", slug: "my-slug", aspect: "16/9", alt: { pt: "…", en: "…" } }
```

**Workscape recordings:** encode as `workscape-chat`, `workscape-ai`, … and set `media` on the matching entry in `workscapeModules`. The recording replaces the schematic for that region in the home camera sequence and the case-study demo. Set `hero` on the Workscape project to a real video and the case page shows it instead of the schematic.

### Placeholders still to replace

Placeholders render as hatched panels labelled "Material a adicionar". In `npm run dev` they also show what's needed.

- Workscape: hero recording + 6 gallery screenshots (`projects.ts`)
- AcessaNet: desktop and mobile site screenshots
- Kollect: brand applications
- Creative Lab: logos, social posts, vector work (`lab.ts`)

### To confirm (marked `TODO` in code)

- `links.linkedin` — not provided, hidden until set
- `links.email` — taken from the 2025 résumé PDF; confirm it's the address to publish
- Design Graphic course institution (`profile.ts`)
- Workscape role wording (`projects.ts`)
- TypeScript is intentionally **not** listed in skills until there's a project to point to (`expertise.ts`)

## Ask my portfolio

- `POST /api/ask` → `{ answer, sources, mode }`. The key stays server-side (never `VITE_`-prefixed).
- Grounding: the whole knowledge base goes into a cached system prompt (`KNOWLEDGE_MODE=full`, the default at this size). Set `KNOWLEDGE_MODE=rag` to send only the top BM25 chunks once the content grows.
- The model is told to answer only from the knowledge base and to say when something isn't covered. Retrieval also returns `sources`, which the panel shows as links into the site.
- Model: `claude-opus-5-5` at `LLM_EFFORT=low`, with server-side refusal fallbacks enabled (`fallbacks: "default"`).
- Abuse protection: per-IP rate limit (`RATE_LIMIT_PER_10MIN`, default 20), a global daily cap on LLM calls (`DAILY_LLM_CAP`, default 500 — beyond it, demo answers), an 8 KB body limit, 500-character questions, the last 8 turns only, and strict turn validation. Behind Nginx, set `TRUST_PROXY=1`.
- Failure modes: an upstream error or a missing server falls back to demo answers, so the feature never breaks — including on static hosting.
- Check demo retrieval: `npm run ask:demo -- "Ele trabalha com backend?"`

## Deploy

**Node (recommended, full assistant):** `npm ci && npm run build && npm start` behind Nginx; set `PORT`, `TRUST_PROXY=1`, `ANTHROPIC_API_KEY`. Hashed assets are served `immutable`; media has a 7-day cache.

**Static only** (Vercel/Netlify/Pages): deploy `dist/` with an SPA fallback to `index.html`. The assistant runs in demo mode in the browser.

Before publishing: set the real domain in `og:image` / canonical tags in `index.html`.

## Performance notes

- Initial JS: React + GSAP/Lenis + app ≈ 155 KB gzip. three.js (130 KB gzip) loads only when Expertise approaches; the assistant panel and retrieval load on first open; case pages and `/cv` are separate chunks.
- Videos: `preload="none"`, the source is attached only near the viewport, and playback runs only while visible. All 10 previews total ≈ 2.4 MB.
- Point cloud: DPR capped at 1.75, 1,400 points on small screens, the render loop stops off-screen.

## Skills report (Claude Code)

Checked in `~/.claude/skills` before building.

| Skill | Status | Used for |
|---|---|---|
| frontend-design | installed, **used** | Direction, token plan, review against generic defaults (it led to dropping the accent colour) |
| gsap-scrolltrigger | installed, **used** | Pinning, scrub, `containerAnimation`, `matchMedia`, `useGSAP` cleanup |
| claude-api | built-in, **used** | Current model id, SDK usage, error classes, refusal fallbacks |
| ui-ux-pro-max, impeccable, web-design-guidelines, threejs-webgl | installed, not loaded | Kept to 1–3 skills per phase to avoid conflicting instructions; review was done with real screenshots instead |
| greensock/gsap-skills, vercel-labs agent-skills (react-best-practices, composition-patterns), obra/superpowers, zanwei/design-dna, LottieFiles motion-design-skill | **not installed** | Not installed automatically. If wanted: `git clone <repo> ~/.claude/skills/<name>` after reviewing its scripts |

Validation: every layout was screenshot-tested in Chromium at 1440×900 and 390×844 (touch), plus reduced-motion, English, the Ask flow, the Lab viewer and case pages, with no console errors. Lighthouse was not run.
