// Builds the hero and the five step drawings, then the preview page.
//   node .impeccable/assets-preview/build.mjs --raw     uncropped drawings (canvas as authored)
//   node .impeccable/assets-preview/measure.mjs src/assets/illustrations .impeccable/assets-preview/bounds.json
//   node .impeccable/assets-preview/build.mjs           crop every viewBox to its measured ink bounds
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { fitInto } from "file:///C:/Users/David/.agents/skills/anatomy-asset/kit/asset.mjs";
import { k, styleSheet, svgDoc, ctx, layout, partA, partB, partC, partD, callout } from "./lib.mjs";
import { stepBuilders } from "./steps.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(HERE, "../../src/assets/illustrations");
mkdirSync(OUT, { recursive: true });

const AZ = 45;
const EL = 30;
const f1 = (n) => Math.round(n * 10) / 10;

// ---- crop: viewBox = ink bounds + an even margin, from the bounds measured on the raw build ----
const RAW = process.argv.includes("--raw");
const BOUNDS_FILE = join(HERE, "bounds.json");
if (!RAW && !existsSync(BOUNDS_FILE)) throw new Error("bounds.json missing: run build.mjs --raw, then measure.mjs");
const BOUNDS = RAW ? null : JSON.parse(readFileSync(BOUNDS_FILE, "utf8"));
const HERO_MARGIN = 10;
const STEP_MARGIN = 8;

// ======================================================================================
// HERO: the exploded assembly (A base, B slab with socket, C descending, D connecting)
// ======================================================================================
function hero() {
  let W = 720;
  let H = 700;
  let dx = 0;
  let dy = 0;
  if (BOUNDS) {
    const b = BOUNDS["hero-assembly.svg"];
    W = Math.round((b.w + 2 * HERO_MARGIN) * 10) / 10;
    H = Math.round((b.h + 2 * HERO_MARGIN) * 10) / 10;
    dx = HERO_MARGIN - b.x;
    dy = HERO_MARGIN - b.y;
  }
  const Lay = layout(1, { gapAB: 58, gapC: 78 });
  const { s } = Lay;
  const pts = [
    ...k.boxCorners(Lay.A, -Lay.foot, Lay.aTop),
    ...k.boxCorners(Lay.B, Lay.zB, Lay.collarTop),
    ...k.boxCorners(Lay.Cp, Lay.zC, Lay.cTop),
    [Lay.A.x + Lay.A.w + s(40), -s(62), s(5)],
    [Lay.B.x + Lay.B.w + s(40), -s(44), Lay.zB + s(14)],
  ];
  const P0 = fitInto(pts, { x: 50, y: 24, w: 620, h: 656 }, { pad: 0, azimuth: AZ, elevation: EL });
  const P = { ...P0, origin: [P0.origin[0] + dx, P0.origin[1] + dy] };
  const c = ctx(P, "hero");

  const A = partA(c, Lay, { rich: true });
  const B = partB(c, Lay, { rich: true, socketId: "socket-b", clipId: "hero-socket-clip" });
  const C = partC(c, Lay, { rich: true });
  C.svg = c.blue(C.svg);
  const D = partD(c, Lay, { rich: true });

  // dashed descent arrow for C: from under its base down to the mouth of the socket
  const from = c.at([0, 0, Lay.zC - s(8)]);
  const to = c.at([0, 0, Lay.collarTop - s(2)]);
  const head = `M${f1(to[0] - 10)} ${f1(to[1] - 13)}L${f1(to[0])} ${f1(to[1])}L${f1(to[0] + 10)} ${f1(to[1] - 13)}`;
  const arrow = `<g id="hero-arrow"><path id="arrow-c" class="arrow" d="M${f1(from[0])} ${f1(from[1])}L${f1(to[0])} ${f1(to[1] - 2)}"/><path class="arrowhead-bg" d="${head}"/><path id="hero-arrowhead" class="arrowhead" d="${head}"/></g>`;

  // lettered callouts, leaders end on a dot on the part
  const call = {
    a: callout("A", [A.anchors.face[0] - 70, A.anchors.face[1] + 58], A.anchors.face),
    b: callout("B", [B.anchors.face[0] - 64, B.anchors.face[1] - 70], B.anchors.face),
    c: callout("C", [C.anchors.face[0] + 84, C.anchors.face[1] - 52], C.anchors.face),
    d: callout("D", [D.anchors.gear[0] + 10, D.anchors.gear[1] + 52], D.anchors.gear),
  };

  const centre = (anchor, off) => [f1(anchor[0] + off[0]), f1(anchor[1] + off[1])];
  const meta = {
    viewBox: `0 0 ${W} ${H}`,
    callouts: { A: centre(A.anchors.face, [-70, 58]), B: centre(B.anchors.face, [-64, -70]), C: centre(C.anchors.face, [84, -52]), D: centre(D.anchors.gear, [10, 52]) },
    callout_r: 15,
    arrow_c: { tail: [f1(from[0]), f1(from[1])], tip: [f1(to[0]), f1(to[1] - 2)], vector: [f1(to[0] - from[0]), f1(to[1] - 2 - from[1])] },
  };
  meta.callout_c_seated = [f1(meta.callouts.C[0] + meta.arrow_c.vector[0]), f1(meta.callouts.C[1] + meta.arrow_c.vector[1])];
  if (!RAW) writeFileSync(join(HERE, "hero-meta.json"), JSON.stringify(meta, null, 1));

  const body = [
    `<g id="part-a">${A.svg}${call.a}</g>`,
    `<g id="part-b">${B.svg}${call.b}</g>`,
    arrow,
    `<g id="part-c">${C.svg}${call.c}</g>`,
    `<g id="part-d">${D.svg}${call.d}</g>`,
  ].join("");
  return svgDoc({ id: "hero-assembly", width: W, height: H, body, css: styleSheet("hero-assembly", { w: 2.5, wf: 1.5, wd: 1.4 }) });
}

const heroSvg = hero();
writeFileSync(join(OUT, "hero-assembly.svg"), heroSvg);
console.log("hero-assembly.svg", heroSvg.length);
// one frame for all five steps: the largest art plus the margin, each drawing centred in it
let frames = stepBuilders.map(() => undefined);
if (BOUNDS) {
  const bs = [1, 2, 3, 4, 5].map((n) => BOUNDS[`step-${n}.svg`]);
  const W = Math.round((Math.max(...bs.map((b) => b.w)) + 2 * STEP_MARGIN) * 10) / 10;
  const H = Math.round((Math.max(...bs.map((b) => b.h)) + 2 * STEP_MARGIN) * 10) / 10;
  frames = bs.map((b) => ({ W, H, dx: W / 2 - (b.x + b.w / 2), dy: H / 2 - (b.y + b.h / 2) }));
}
const stepSvgs = stepBuilders.map((fn, i) => {
  const svg = fn(frames[i]);
  writeFileSync(join(OUT, `step-${i + 1}.svg`), svg);
  console.log(`step-${i + 1}.svg`, svg.length);
  return svg;
});

// ---------- preview page ----------
// Inline (as the page will use them) and as <img> (proves each file is a valid standalone SVG).
const names = ["hero-assembly", "step-1", "step-2", "step-3", "step-4", "step-5"];
const page = `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Illustrations preview</title>
<style>*{box-sizing:border-box}html,body{margin:0;background:#f6f7f8;color:#121314;font-family:system-ui,sans-serif}
main{width:min(1100px,100% - 32px);margin:32px auto;display:grid;gap:40px}
h2{font-size:13px;letter-spacing:.14em;text-transform:uppercase;margin:0 0 12px;border-bottom:3px solid #121314;padding-bottom:8px}
.asset-stage.iso-plate{padding:0;box-shadow:none;background:#f6f7f8}
.hero{width:min(724px,100%)}svg,img{display:block;width:100%;height:auto}
.steps{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:24px}
.step-fig{margin:0;border:2px solid #121314}
.imgs{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:16px}.imgs img{border:1px solid #c9ccd1}</style></head><body><main>
<section><h2>Hero (inline, 724 px)</h2><div class="asset-stage iso-plate hero">${heroSvg}</div></section>
<section><h2>Steps 1-5 (inline)</h2><div class="steps">${stepSvgs.map((svg, i) => `<figure class="step-fig"><div class="asset-stage iso-plate" id="s${i + 1}">${svg}</div></figure>`).join("")}</div></section>
<section><h2>As &lt;img&gt; (standalone validity)</h2><div class="imgs">${names.map((n) => `<img src="../../src/assets/illustrations/${n}.svg?v=${Date.now()}" alt="">`).join("")}</div></section>
</main></body></html>`;
writeFileSync(join(HERE, "preview.html"), page);
