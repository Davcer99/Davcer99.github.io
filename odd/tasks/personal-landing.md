# Feature: personal-landing

Objective: bilingual (ES/EN) personal landing for David Balaguer Cervera, built with Astro, designed with impeccable, animated with GSAP, illustrated with anatomy-asset.
Branch: `feat/personal-landing` · Delivery strategy: `ask-on-risk` → `chain_strategy=feature-branch-chain` (chosen 2026-10-29) · Test runner: `node --test` over the static build + `astro check`.

## Specs

- S1. Request: "Quiero hacer una landing con astro, usando odd y usando las skills de diseño que tengo instaladas la de impecable, gsap y anatomy-asset"
  - Check: Astro project; design flow follows the impeccable skill (PRODUCT.md, direction contract, detector, finish review, DESIGN.md); motion uses GSAP per the gsap-* skills; at least one illustration produced with the anatomy-asset skill.
- S2. Purpose: "Marca personal / freelance". Primary audience: "Recruiters / empleo".
- S3. Primary action: "Contactar / pedir reunión", delivered as "Email (mailto)".
- S4. Content on hand: "Nada aún". No invented testimonials, clients, metrics or employers; authored demo material is labelled as such.
- S5. Deploy: "Estático (Netlify/Vercel/Pages)" → Astro `output: 'static'`, no adapter.
- S6. Profile: "full stack e IA e automatización".
- S7. Language: "Bilingüe ES/EN" → two locales with equivalent content.
  - Check: both locale pages exist in the build, each with the correct `<html lang>`, a language switch, and the same section set.
- S8. Message a recruiter must take away: "Full-stack que integra IA en producto".
- S9. Must not feel like: "Plantilla de portfolio dev", "Animaciones excesivas", "Demasiado corporativo", "Humo de IA".
  - Check: motion respects `prefers-reduced-motion` and never hides content when JS is unavailable.
- S10. Personal data (verbatim): "David Balaguer Cervera, full stack developer especializado en ia, davidbalaguercervera@gmail.com, https://www.linkedin.com/in/david-balaguer-cervera/ , remoto"
  - Check: mailto uses `davidbalaguercervera@gmail.com`; LinkedIn link uses the given URL.
- S11. Build path: "Code-first (recomendado)".

## Tasks

- T1 [S2-S8,S10] Product context in `PRODUCT.md` (impeccable init) — inline — done (PRODUCT.md written from confirmed answers)
- T2 [S1,S8,S9,S11] Visual direction: concept-seed round + surface brief direction contract — inline — done (direction "Manual de montaje"; contract in `.impeccable/surfaces/src-pages-index-astro.md`, 6 blocks + seed verified)
- T3 [S1,S5,S7,S10] Scaffold Astro static site with ES/EN routes, content module and build tests — inline — done (RED 11/11 fail → GREEN 11/11 pass; astro check 0 errors)
- T4 [S2-S4,S6-S8,S10] Build landing sections per the direction contract — delegated (gentle-ai-worker) — done (RED 4 fail → GREEN 19/19; astro check 0; SVG inline path untested until T5)
- T5 [S1,S9] Isometric SVG illustration(s) with anatomy-asset — delegated (gentle-ai-worker) — done (6 SVGs, xmllint clean, hooks present, parent visual check of hero + steps renders)
- T6 [S1,S9] GSAP motion with reduced-motion fallback — delegated (gentle-ai-worker) + parent fix — done (RED 23/2 → GREEN 25/25; astro check 0; CDP captures verified)
- T7 [S1,S9] Finish: detector, desktop/mobile captures, finish review, DESIGN.md — inline + fresh reviewer (gentle-ai-verify with impeccable degraded/finish-reviewer.md) — in progress
- T7a [S1,S9] Finish fix round, drawings: crop step viewBoxes to art, trim hero viewBox bottom, redraw step-5 at steps 1-4 footprint and detail — delegated (T5 worker continuation) — done (hero viewBox 0 0 637.3 548.8; steps 0 0 307 191; step-5 redrawn; parent viewed steps render)
- T7b [S1,S7,S9] Finish fix round, page: step row size cap, hero ratio, bilingual HTML part labels over the hero (C label moves with C), beforeprint revert — inline (worker failed with no edits) — done (RED 4 → GREEN 30/30; astro check 0; browser-measured)

## Log

- L1 (2026-10-29) User request: "Quiero hacer una landing con astro, usando odd y usando las skills de diseño que tengo instaladas la de impecable, gsap y anatomy-asset"
- L2 (2026-10-29) Interview answers recorded verbatim in S2-S11. Empty folder, no prior visual authority; impeccable context reported NO_PRODUCT_MD and no image converter.
- L3 (2026-10-29) Direction round served (seed:d5630982dacc629a): assigned "Tablero de sombras" (shadow board), pick "Manual de montaje", six challengers declined, canon card; sketches in `.impeccable/mocks/decision/`. Awaiting user choice.
- L4 (2026-10-29) T3 RED observed: `node --test "tests/**/*.test.mjs"` → 11/11 fail (no dist). `astro build` refused: "Node.js v22.20.0 is not supported by Astro! Please upgrade Node.js to a supported version: \">=22.23.4\"". User chose "Actualizar Node con nvm (recomendado)". Pi harness lives in the v22.20.0 global modules, so 22.23.4 is installed with nvm without `nvm use`; project commands run with that binary explicitly (`.nvmrc` + `engines`).
- L5 (2026-10-29) User chose "Manual de montaje" (kind pick, code-led). Node 22.23.4 installed into the nvm folder from the official zip (SHA-256 verified), active Node untouched. T3 GREEN: `npm test` 11/11 pass, `astro check` 0 errors.
- L6 (2026-10-29) Commit b286f5e (T1+T3): native assess unavailable (root commit has no base; "the review assess candidate has no pending changes"); deferred to the PR slice. T2 closed. Context backstop reached: T4 and T5 run as two parallel background workers with disjoint edit surfaces. Illustration contract: `src/assets/illustrations/hero-assembly.svg` + `step-1.svg`..`step-5.svg`, inlined via `import.meta.glob` so the page builds without them; GSAP hooks by element id (`part-a`, `part-b`, `part-c`, `part-d`, `arrow-c`, `socket-b`).
- L7 (2026-10-29) T4 worker: RED 4 new tests fail as expected; @fontsource/atkinson-hyperlegible 5.3.0 installed. Hero said "Fig. 4" while AI is process step 3; decided: hero uses circle "3" / "Fig. 3" to match the steps (the sketch number was a placeholder).
- L8 (2026-10-29) T4 done; parent re-ran `npm test`: 19/19 pass. "Integraciones" merged into part A. Worker killed every chrome.exe with taskkill (reported to the user) and left /tmp/t.cjs, /tmp/t2.cjs (deleted by parent).
- L9 (2026-10-29) Running count past ~400 authored lines; user chose "Cadena sobre rama de feature (recomendado)" → chain_strategy=feature-branch-chain. Slices (one PR each, chained on a feature/tracker branch): P1 b286f5e scaffold + tests (T1, T3); P2 5e4060a landing sections (T2 brief, T4); P3 illustrations (T5); P4 motion (T6); P5 finish (T7). Native assess of 5e4060a deferred: blocked by T5's untracked files.
- L10 (2026-10-29) User: "puedes seguir?". T6 launched in parallel with T5 polishing (disjoint surfaces; SVG hooks already present). Handoff forbids name-wide process kills and /tmp scratch.
- L11 (2026-10-29) T6 RED: npm test 23 pass / 2 fail (bundled module script, es+en); hero hooks already inline. Decision: hero timeline ends with C seated in #socket-b (descent computed at runtime from geometry, arrow fades); no-JS and reduced motion show the authored exploded figure. Contract line "reduced motion shows the assembled state" reads as "the authored figure" for the hero; step drawings are authored assembled.
- L12 (2026-10-29) T5 done. Parent viewed shots/hero.png and shots/steps.png: blue only on C, painter order correct. Accepted deviations: 2px strokes on steps, dark neutral ramp derived from ink. Weight: 6 SVGs ≈ 340 KB raw / ≈ 48 KB gzip (inlined; revisit in T7 optimize). Generator `.impeccable/assets-preview/build.mjs` imports the anatomy-asset kit by absolute path (dev-only); preview.html and shots/ are gitignored.
- L13 (2026-10-30) T6 worker: GREEN 25/25, browser-measured C offset 110.5 = arrow vector, reduced motion and no-JS static, console clean except favicon 404. Parent fix: hero no longer hides/offsets A, B, D before playing (worker reported a ~57 ms flash of the authored figure); only the arrow flows and C seats. Parent re-ran `npm test` 25/25 and `astro check` 0, and captured with anatomy-asset `capture.mjs` (CDP): 1440 hero shows C seated, 390 "scrolls sideways: no", console clean. An earlier `--window-size=390` headless shot looked clipped: Chrome's Windows minimum window width, not a layout bug. Parent mistakes: relative `--user-data-dir` triggered a Chrome error dialog for the user. Stopped leftover T4 `astro preview` (PID 36432) and parent preview by PID; deleted worker scratch files.
- L14 (2026-10-30) Native assess base b286f5e..febf235: high (signal: `.impeccable/assets-preview/shot.sh` shell_process). shot.sh was a machine-specific worker helper with no project use → removed in 72ac3b1 (told the user it was cleanup, not review avoidance). Re-assess: medium, reviewDue false (under_budget) → deferred to PR slice close.
- L15 (2026-10-30) T7: favicon test RED (25/1) → GREEN 26/26. `impeccable detect --json src/` → []. First full-page captures invalid (capture.mjs scrollIntoView offset with --select body: started mid-page, blank tail) → recaptured with viewport height 6000 (no vh units in CSS): desktop.png 1440x5762, mobile.png 390x5737, valid from top. Harness has no `impeccable-finish-reviewer` agent → fresh gentle-ai-verify subagent running degraded/finish-reviewer.md (substitution disclosed).
- L16 (2026-10-30) Finish reviewer (substituted) disposition: fix. Material fixes: (1) step rows ~640px, process ≈45% of page → crop step viewBoxes, cap .step__figure ~30rem; (2) hero caption ~150px below art → trim viewBox, update ratio; (3) step-5 carton oversized and under-detailed → redraw at steps 1-4 footprint; (4) hero names nothing → HTML word labels from content.ts next to circled letters; (5) step parts at opacity 0 until scrolled breaks print → beforeprint revert + fix comment. Capture size note: +12px is capture.mjs 6px clip padding; emulated widths 1440/390 confirmed by its clip output.
- L17 (2026-10-30) T7a done: ink-measured crops (measure.mjs + bounds.json), callouts A(26.4,443.2) B(93.6,176.3) C(422.8,26.4) D(425.9,444.0), C seated callout (422.8,136.9), arrow-c (298,100)→(298,210.5) in `.impeccable/assets-preview/hero-meta.json`. Parent viewed shots/steps.png: step 5 now same scale and detail.
- L18 (2026-10-30) T7b worker failed ("assistant reported an error", no edits). Parent did it inline: RED 4 fail → GREEN 30/30; astro check 0; detect []. Measured at 1440: step rows 363-396px (was ~640), hero caption gap 12px (was ~150), no callout overlaps, C label mid-Y = seated bubble mid-Y (343), step parts opacity 0 → 1 after beforeprint. Callouts hidden below 36rem (they clipped at 390; parts list sits right above the drawing). C label animates `top` in % (survives resize; one-element reflow accepted). Open note: #process is still ~49% of page height because the whole page shrank (5762→4467px).
