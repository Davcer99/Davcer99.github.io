# Feature: personal-landing

Objective: bilingual (ES/EN) personal landing for David Balaguer Cervera, built with Astro, designed with impeccable, animated with GSAP, illustrated with anatomy-asset.
Branch: `feat/personal-landing` · Delivery strategy: `ask-on-risk` (forecast ~1200 authored lines, chain decision pending at first oversized commit) · Test runner: `node --test` over the static build + `astro check`.

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
- T5 [S1,S9] Isometric SVG illustration(s) with anatomy-asset — delegated (gentle-ai-worker, background) — in progress
- T6 [S1,S9] GSAP motion with reduced-motion fallback — inline — pending
- T7 [S1,S9] Finish: detector, desktop/mobile captures, finish review, DESIGN.md — inline — pending

## Log

- L1 (2026-10-29) User request: "Quiero hacer una landing con astro, usando odd y usando las skills de diseño que tengo instaladas la de impecable, gsap y anatomy-asset"
- L2 (2026-10-29) Interview answers recorded verbatim in S2-S11. Empty folder, no prior visual authority; impeccable context reported NO_PRODUCT_MD and no image converter.
- L3 (2026-10-29) Direction round served (seed:d5630982dacc629a): assigned "Tablero de sombras" (shadow board), pick "Manual de montaje", six challengers declined, canon card; sketches in `.impeccable/mocks/decision/`. Awaiting user choice.
- L4 (2026-10-29) T3 RED observed: `node --test "tests/**/*.test.mjs"` → 11/11 fail (no dist). `astro build` refused: "Node.js v22.20.0 is not supported by Astro! Please upgrade Node.js to a supported version: \">=22.23.4\"". User chose "Actualizar Node con nvm (recomendado)". Pi harness lives in the v22.20.0 global modules, so 22.23.4 is installed with nvm without `nvm use`; project commands run with that binary explicitly (`.nvmrc` + `engines`).
- L5 (2026-10-29) User chose "Manual de montaje" (kind pick, code-led). Node 22.23.4 installed into the nvm folder from the official zip (SHA-256 verified), active Node untouched. T3 GREEN: `npm test` 11/11 pass, `astro check` 0 errors.
- L6 (2026-10-29) Commit b286f5e (T1+T3): native assess unavailable (root commit has no base; "the review assess candidate has no pending changes"); deferred to the PR slice. T2 closed. Context backstop reached: T4 and T5 run as two parallel background workers with disjoint edit surfaces. Illustration contract: `src/assets/illustrations/hero-assembly.svg` + `step-1.svg`..`step-5.svg`, inlined via `import.meta.glob` so the page builds without them; GSAP hooks by element id (`part-a`, `part-b`, `part-c`, `part-d`, `arrow-c`, `socket-b`).
- L7 (2026-10-29) T4 worker: RED 4 new tests fail as expected; @fontsource/atkinson-hyperlegible 5.3.0 installed. Hero said "Fig. 4" while AI is process step 3; decided: hero uses circle "3" / "Fig. 3" to match the steps (the sketch number was a placeholder).
- L8 (2026-10-29) T4 done; parent re-ran `npm test`: 19/19 pass. "Integraciones" merged into part A. Worker killed every chrome.exe with taskkill (reported to the user) and left /tmp/t.cjs, /tmp/t2.cjs (deleted by parent).
