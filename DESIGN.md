---
name: David Balaguer Cervera, personal landing
description: A bilingual assembly manual for a full-stack developer who builds AI in as one part of a whole system.
colors:
  paper: "#f6f7f8"
  white: "#ffffff"
  ink: "#121314"
  ink-soft: "#4a4d52"
  side: "#e4e6ea"
  rule: "#c9ccd1"
  blue: "#2d5bff"
  blue-deep: "#1b3fd1"
  blue-left: "#577cff"
  blue-right: "#7694ff"
typography:
  display:
    fontFamily: "Atkinson Hyperlegible, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 4rem)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.01em"
  display-panel:
    fontFamily: "Atkinson Hyperlegible, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(2.75rem, 8vw, 6rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Atkinson Hyperlegible, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(2rem, 4vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.01em"
  title-lg:
    fontFamily: "Atkinson Hyperlegible, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(1.375rem, 2.2vw, 1.75rem)"
    fontWeight: 700
    lineHeight: 1.2
  title:
    fontFamily: "Atkinson Hyperlegible, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "1.625rem"
    fontWeight: 700
    lineHeight: 1.15
  title-sm:
    fontFamily: "Atkinson Hyperlegible, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.15
  lede:
    fontFamily: "Atkinson Hyperlegible, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(1.0625rem, 1.5vw, 1.25rem)"
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: "Atkinson Hyperlegible, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
    fontFeature: "tabular-nums"
  button:
    fontFamily: "Atkinson Hyperlegible, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 700
    lineHeight: 1
  nav:
    fontFamily: "Atkinson Hyperlegible, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.55
  model-line:
    fontFamily: "Atkinson Hyperlegible, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 700
    letterSpacing: "0.12em"
  label:
    fontFamily: "Atkinson Hyperlegible, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 700
    letterSpacing: "0.14em"
  caption:
    fontFamily: "Atkinson Hyperlegible, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.45
  callout:
    fontFamily: "Atkinson Hyperlegible, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 700
    lineHeight: 1.2
rounded:
  pill: "999px"
  circle: "50%"
spacing:
  gutter: "clamp(1.25rem, 4vw, 3.5rem)"
  section-space: "clamp(4rem, 8vw, 7.5rem)"
  page: "90rem"
components:
  button-primary:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.white}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "0 1.75rem"
    height: "3.375rem"
  button-primary-hover:
    backgroundColor: "{colors.blue-deep}"
    textColor: "{colors.white}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "0 1.75rem"
    height: "3.375rem"
  button-ghost-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  circle-number:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.circle}"
    size: "3.5rem"
  circle-number-ai:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.white}"
    rounded: "{rounded.circle}"
    size: "3.5rem"
  circle-letter:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.circle}"
    size: "3rem"
  header-bar:
    textColor: "{colors.ink}"
    typography: "{typography.model-line}"
    padding: "0 0 0.5rem"
  parts-table-head:
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    padding: "0.625rem 0.875rem"
  parts-table-row:
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    padding: "0.625rem 0.875rem"
  parts-list-row:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    padding: "1.5rem 2rem"
  figure-caption:
    textColor: "{colors.ink-soft}"
    typography: "{typography.caption}"
  callout-label:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.callout}"
    padding: "0.125rem 0.25rem"
  help-panel:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    padding: "clamp(1.5rem, 4vw, 3.5rem)"
---

# Design System: David Balaguer Cervera, personal landing

## Overview

**Creative North Star: "The Assembly Manual"**

The page is a flat-pack instruction sheet for one person's profile. Cool white paper, black line art, and a single process blue. A header bar with a heavy rule, a bordered parts list with `1×` quantities, circled numbers for steps, circled letters (A Backend, B Frontend, C AI integration, D Automation) that tie every drawing to its text, and isometric figures with captions. It reads as a document first and a website second, which is the point: calm, exact, a little dry, with a visible sense of "everything has a place".

Density is moderate and structured. Text sits in narrow measures beside large drawings, and sections are separated by ruled lines instead of boxes or background changes. Personality comes from the drawings and from the manual's vocabulary, not from decoration. The build is light only (`color-scheme: light`); there is no dark theme and no accent beyond one blue.

PRODUCT.md commits the visual system to three durable constraints: it must not read as a dark/neon developer-portfolio template, as over-animated, or as AI hype (no glow, no magic gradients). The manual vocabulary answers all three by construction.

**Key Characteristics:**
- Paper, ink, one blue. Blue is a signal, never a theme.
- Every structure is drawn with an ink line (1px / 2px / 3px), never with a shadow or a fill block.
- Square corners everywhere except pills (buttons) and circles (numbers and letters).
- One family, Atkinson Hyperlegible, two weights (400, 700); hierarchy comes from size and weight.
- Illustrations are authored isometric SVGs inlined in the page, animated by a small, quiet GSAP clock.
- Motion is progressive enhancement: the authored figure is always the no-JS and reduced-motion state.

## Colors

A cool neutral paper-and-ink palette with a single saturated blue that marks the AI module and the one thing a visitor is asked to do.

### Primary
- **Process Blue** (`#2d5bff`): the AI module (part C) in every drawing and glyph, the primary action button, and the AI step circle. White text on it measures 5.18:1.
- **Process Blue, pressed** (`#1b3fd1`): primary button hover only (white text 7.84:1).
- **Module Blue, left / right faces** (`#577cff`, `#7694ff`): the lit side faces of the part C glyph in the parts list, so the small glyph keeps the three-tone shading of the drawings.

### Neutral
- **Cool Paper** (`#f6f7f8`): page background, and the fill behind circled numbers, callout labels and the help panel so they sit cleanly over rules and drawings.
- **Sheet White** (`#ffffff`): top faces of drawn parts, and text on blue.
- **Technical Ink** (`#121314`): text, every border and rule, line art, focus ring, the ghost button, the socket in glyph B. 17.34:1 on paper.
- **Pencil Grey** (`#4a4d52`): secondary text only: figure captions, the "Email" label in the help panel, the footer note. 7.91:1 on paper.
- **Side Face Grey** (`#e4e6ea`): side faces of drawn parts and glyphs; also the scrollbar track.
- **Hairline Grey** (`#c9ccd1`): 1px dividers between parts-list rows, table cells, and step rows; the dashed frame of a missing figure. Decorative only (1.5:1), so it never carries meaning alone.

### Named Rules
**The One Blue Rule.** Blue appears on exactly three things: part C (the AI module) in drawings and glyphs, the primary action, and the circle of the process step that integrates AI. Nothing else is blue: not links, not headings, not rules, not hover states of ghost elements.

**The Ink-on-Paper Rule.** Neutrals do the work. If a new element needs emphasis, give it a heavier ink line or weight 700, not a tint.

## Typography

**Family:** Atkinson Hyperlegible (latin 400 and 700 via `@fontsource`), falling back to `system-ui, -apple-system, "Segoe UI", sans-serif`.

**Character:** a humane, high-legibility grotesque used heavy for titles and regular for reading, with tabular numerals on the body so quantities and step numbers align. No second family, no italics, no weights beyond 400 and 700.

### Hierarchy
- **Display** (700, `clamp(2.25rem, 5vw, 4rem)`, 1.02, -0.01em): the H1 with his name. Balanced wrapping.
- **Display, panel** (700, `clamp(2.75rem, 8vw, 6rem)`, 1, -0.02em): the one big word of the help panel ("¿Dudas?" / "Questions?").
- **Headline** (700, `clamp(2rem, 4vw, 3rem)`, 1.05, -0.01em): section H2s.
- **Title, large** (700, `clamp(1.375rem, 2.2vw, 1.75rem)`, 1.2, max 24ch): the hero role line.
- **Title** (700, 1.625rem, 1.15): process step names. **Title, small** (700, 1.5rem, 1.15): capability part names.
- **Lede** (400, `clamp(1.0625rem, 1.5vw, 1.25rem)`, 1.5, max 52ch): the hero paragraph.
- **Body** (400, 1.0625rem, 1.55, tabular numerals): paragraphs. Measures are capped per context: 40ch in steps, 46ch in the help panel, 48ch in section intros, 55ch in capability rows.
- **Model line** (700, 0.875rem, 0.12em, uppercase): the header's "Model DBC · Full-stack + AI" title-block line.
- **Label** (700, 0.8125rem, 0.14em, uppercase): the header cell of the parts table.
- **Caption** (400, 0.875rem, 1.45, Pencil Grey, max 60ch): figure captions. **Callout** (700, 0.8125rem, 1.2): part names beside circled letters in the hero drawing. 0.8125rem is the smallest size in the system; do not go below it.
- **Button** (700, 1.125rem, line-height 1). **Nav** (400, 0.9375rem; the language switch is 700).

### Named Rules
**The Two-Weight Rule.** 400 reads, 700 labels and titles. A new level gets a size, not a new weight or family.

**The Tracked-Label Rule.** Uppercase letter-spacing exists only in two places the manual itself would put it: the title-block line in the header bar and the header cell of the parts table. It is not an eyebrow style and is never placed above a heading.

## Layout

A single centered column, `max-width: 90rem` with a fluid gutter `clamp(1.25rem, 4vw, 3.5rem)`. At 900px and wider the page works in a 5/12 text, 7/12 figure split: the intro (copy beside the assembly drawing), each section head (heading beside its intro), each process step (a 4.5rem number column, text, figure) and the help panel (big word beside body and actions). Below 900px everything stacks.

Vertical rhythm is manual-page rhythm: each section opens with a 2px ink rule, 1.25rem of padding, the H2 and its intro, then content, and closes with `clamp(4rem, 8vw, 7.5rem)` of space. Gaps in use are small and regular (0.5rem, 0.75rem, 1.25rem, 2.5rem, 3.5rem); components pad with 0.625rem / 0.875rem (tables), 1.25rem to 2rem (list rows), and a fluid `clamp(1.5rem, 4vw, 3.5rem)` (help panel).

Responsive behavior, as built:
- `max-width: 29.99rem`: the hero parts table drops to one column.
- `max-width: 35.99rem`: hero callout words are hidden; the parts table directly above the drawing already names every part.
- `min-width: 45rem`: capability rows go from two lines to one line (letter, glyph, text, quantity); on narrower screens the action buttons are ordered before the parts table so the first screen holds name, role line and the primary action.
- `min-width: 56.25rem`: the 5/12 and 7/12 split above. Step figures are capped at 30rem (38rem when stacked) so five drawings do not dominate the page.
- Drawings are width-fluid (`width: 100%`, `height: auto`) and carry an aspect ratio so the layout never jumps.

## Elevation & Depth

Flat. There are no shadows, gradients, blurs or overlays in the UI. Hierarchy is drawn: heavier ink lines (1px, 2px, 3px), and bordered containers on the same paper. The only depth in the system lives inside the illustrations, where isometric parts are shaded in four tones with correct painter's order.

State is expressed with color swaps, not lift: primary hover darkens to `#1b3fd1`, ghost hover inverts to ink-on-paper, `:active` moves the button 1px down. Focus is a 3px ink outline offset by 3px.

### Named Rules
**The No-Lift Rule.** Nothing floats. A new surface is a ruled box on the paper, never a card with a shadow, a blurred panel or a gradient fill.

## Shapes

Orthogonal and drawn. Containers are rectangles with square corners. Two radii exist: a full pill (`999px`) for buttons, and a circle (`50%`) for step numbers and part letters. Nothing else is rounded.

Line weight is the system's main shape token:
- **3px ink**: the header rule, the footer rule, the help panel border, and every circled number or letter.
- **2px ink**: section rules, the bordered parts table and parts list, button borders, link underlines (`text-decoration-thickness: 2px`, offset 0.2em).
- **1px Hairline Grey**: dividers inside tables, lists and step rows.
- **Drawings**: 2.5px ink for the hero and the part glyphs (3px on the cable glyph), 2px on the step drawings, with 1.2px to 1.5px for fine detail and 1.4px for dashed guides.

### Named Rules
**The Circle Means Reference Rule.** A circle is a pointer, not decoration: numbers for steps, letters for parts. A step number is paper with an ink ring; the AI step alone is blue-filled with white text. Part letters are identical in ES and EN and match between hero, parts list and glyphs.

**The One Pill Family Rule.** Pills are buttons and only buttons. Cards, tables, panels and labels stay square.

## Components

### Header bar
A title-block line on the left (model line, uppercase tracked), in-page navigation and the language switch on the right (the switch is bold), all sitting on a 3px ink rule with 0.5rem of padding below. Links are unadorned and underline on hover; nav items have 0.5rem of vertical padding for touch. It wraps instead of collapsing.

### Buttons
- **Shape:** pill (999px), `min-height: 3.375rem`, 0 1.75rem padding, 2px border, 700 at 1.125rem.
- **Primary:** Process Blue fill, white text, blue border; the only blue fill on the page besides part C and the AI step circle. Hover: `#1b3fd1`. Used for the mailto action in the hero and in the help panel.
- **Ghost:** transparent, 2px ink border and ink text; hover inverts to ink fill and paper text. Used for LinkedIn.
- **Transitions:** 160ms on background, border and text color with `--ease-out` (`cubic-bezier(0.16, 1, 0.3, 1)`); `:active` is a 1px nudge.

### Circled numbers and letters
Paper-filled circles with a 3px ink ring and a bold numeral: 3.5rem for step numbers (font 1.75rem), 3.5rem for the hero figure mark, 3rem for parts-list letters (font 1.5rem). Inside the hero drawing, the A to D letters are drawn as SVG circles (radius 15 in viewBox units) with the same ring. The AI step circle swaps its fill to Process Blue with white text and keeps the ink ring.

### Parts table ("pieces included")
A 2px ink box with a tracked uppercase header cell and a two-column grid of rows: bold `1×`, bold letter, part name. Rows are separated by 1px Hairline Grey; one column below 30rem. This is the quantity vocabulary of the manual: every part is `1×`, never more.

### Capability parts list
A bordered (2px ink) list. Each row: circled letter, small authored isometric glyph of the part, name and one-sentence summary, bold `1×` at the end. The glyphs use the drawings' own grammar (2.5px ink line, white top faces, Side Face Grey sides, ink for sockets, blue only for part C).

### Figures and captions
Every illustration lives in a `figure` with a Pencil Grey caption underneath. The hero caption is numbered like a manual ("Fig. 3 · ...") and step captions start with the result label. The drawing is decorative for assistive tech (`aria-hidden`); the caption and surrounding text carry the meaning. A missing illustration falls back to a dashed 2px frame of the same aspect ratio.

### Callout labels
Bold 0.8125rem words on a paper-colored chip placed beside each circled letter in the hero drawing, positioned in percentages of the drawing's viewBox so they scale with it. The label for part C travels with the module when it seats. They are HTML (not SVG text) so they translate with the page; geometry comes from `src/data/hero-callouts.ts`.

### Help panel
The closing "Questions?" block: a 3px ink border, fluid padding, one oversized word, a short paragraph, the two buttons, and the plain email address underlined as a link. It is the manual's last page; it holds the primary action again.

### Footer
A 3px ink rule, the name and model line in bold on the left, and a Pencil Grey note on the right that states the drawings are illustrative and show no real projects or clients.

### Motion

Motion is one small clock in `src/scripts/motion.ts` (GSAP + ScrollTrigger). It only describes assembly: parts settling into place, the AI module seating.

- **Durations (s):** settle 0.45, draw 0.4, seat 0.55, pulse 0.16 (half a step-circle pulse). Stagger 0.08.
- **Distances** (fractions of the drawing's viewBox width, so hero and step drawings move the same visual amount): settle 0.02, drop 0.06, flow 0.04.
- **Easing:** `expo.out` for arrivals (decelerates, no overshoot), `power3.out` for the seat, `power2.out` for the pulse, `power1.in` for the arrow's late fade.
- **Scroll:** each step drawing plays once at `top 85%` (`once: true`), parts rise and fade in with a stagger, the AI module drops in last.
- **Hero:** on load the dashed arrow flows, part C travels the vector measured from the arrow itself, its callout label moves with it, the arrow fades, and the figure mark pulses once (scale 1.12). Nothing is hidden or offset before it plays.

### Named Rules
**The Content-First Rule.** Motion is enhancement over a complete static page. Nothing is hidden by CSS. Without JavaScript or under `prefers-reduced-motion: reduce`, no tween is registered (`gsap.matchMedia`) and the drawings stay exactly as authored (the exploded figure: C beside its socket, arrow visible). CSS transitions collapse to 0.01ms. Before printing, every tween is reverted so unscrolled step parts are visible.

**The Once Rule.** Each animation plays once on load or first scroll. No loops, no scroll-linked scrubbing, no parallax, no hover choreography.

### Illustrations

Authored with the anatomy-asset skill; the generator lives in `.impeccable/assets-preview/` (dev-only). Files in `src/assets/illustrations/`: `hero-assembly.svg` and `step-1.svg` to `step-5.svg`. They are inlined into the HTML (so GSAP can address inner elements), have a transparent background on the paper, and draw physical, detailed isometric objects: many small solid parts, ink outlines, four-tone shading (white top, three side tones), a dark neutral ramp for sockets and pits, and the blue ramp reserved for the AI module.

- Line weights are per file in `--w` (main), `--wf` (fine) and `--wd` (dashed): hero 2.5 / 1.5 / 1.4px, steps 2 / 1.2 / 1.2px.
- Step drawings are cropped to the art, so figures have no empty margins; all five share one footprint and level of detail.
- Hero hook ids that GSAP and the page rely on: `#hero-assembly` (svg), `#part-a`, `#part-b`, `#part-c` (the AI module), `#part-d`, `#arrow-c` (the dashed path whose first and last points define C's travel), `#hero-arrow` (group that also holds the arrowhead, faded together), `#socket-b` (where C seats). The HTML wrapper carries `data-figure="hero-assembly"`, and the C label is `[data-callout="C"]` with its authored `data-y`.
- Step hook classes: every movable part group is `.part`; the AI module is `.part.part-c`. Wrappers are `data-figure="step-N"`. The svg roots use ids `step1` to `step5`.
- Renaming or removing a hook silently disables that motion (the code returns early), so changes to a drawing must keep them. The hero callout coordinates in `src/data/hero-callouts.ts` must be regenerated with the drawing (`hero-meta.json`).
- Only part C may use the blue ramp. Drawings contain no text other than the circled letters in the hero; names are HTML.

## Do's and Don'ts

### Do:
- **Do** keep the page paper-white (`#f6f7f8`) with ink (`#121314`) as the only text and line color; use Pencil Grey (`#4a4d52`) for captions and secondary notes.
- **Do** reserve Process Blue (`#2d5bff`) for part C, the primary action and the AI step circle.
- **Do** draw structure with ink lines: 3px for rules that frame the page, 2px for boxes, 1px Hairline Grey for dividers.
- **Do** tie every drawing to text with a circled number or letter, and keep part letters identical in both locales.
- **Do** show quantities as `1×` in tables and lists.
- **Do** keep content equivalent in ES and EN, including new sections, captions and labels.
- **Do** give every new motion a duration, distance and ease from the clock in `motion.ts`, make it play once, and make sure the no-JS and reduced-motion state is a complete page.
- **Do** keep a visible 3px ink focus ring on every interactive element.

### Don't:
- **Don't** add shadows, gradients, glows, blurs or translucency.
- **Don't** round cards, panels, tables or images. Rounded means a button pill or a reference circle, nothing else.
- **Don't** use blue for links, headings, decoration, dividers or hover states of ghost elements.
- **Don't** add a second typeface, a third weight, or type below 0.8125rem.
- **Don't** add icons from a glyph font or icon library; if a pictogram is needed, draw it in the manual's isometric language.
- **Don't** add a dark theme, neon or terminal styling.
- **Don't** loop, scrub or parallax anything; don't hide content in CSS waiting for a script.
- **Don't** invent evidence in drawings or captions (clients, metrics, named projects). Illustrations stay labeled as illustrative.
