// Five spot drawings, one camera, one world scale, the same parts as the hero.
import { k, styleSheet, svgDoc, ctx, layout, partA, partB, partC, partD } from "./lib.mjs";

const AZ = 45;
const EL = 30;
const SW = 320;
const SH = 260;
const U = 0.55;
const f1 = (n) => Math.round(n * 10) / 10;
const part = (inner, cls = "part") => `<g class="${cls}">${inner}</g>`;
const partC_ = (inner) => `<g class="part part-c">${inner}</g>`;

// A step's projection: the shared scale, centred on its own points.
function stepProjection(points, scale) {
  const base = { origin: [0, 0], scale, azimuth: AZ, elevation: EL };
  const xy = points.map((p) => k.iso(p, base));
  const x0 = Math.min(...xy.map((p) => p[0]));
  const x1 = Math.max(...xy.map((p) => p[0]));
  const y0 = Math.min(...xy.map((p) => p[1]));
  const y1 = Math.max(...xy.map((p) => p[1]));
  return { ...base, origin: [SW / 2 - (x0 + x1) / 2, SH / 2 - (y0 + y1) / 2 + 2] };
}

const shift = (c, [ox, oy], svg) => {
  const a = c.at([0, 0, 0]);
  const b = c.at([ox, oy, 0]);
  return `<g transform="translate(${f1(b[0] - a[0])} ${f1(b[1] - a[1])})">${svg}</g>`;
};

const stepLay = (opts = {}) => layout(U, { gapAB: 0, gapC: 0, ax0: -100, aw: 250, ...opts });

const stackPoints = (Lay, { c = false, d = false } = {}) => {
  const { s } = Lay;
  const pts = [...k.boxCorners(Lay.A, -Lay.foot, Lay.aTop), ...k.boxCorners(Lay.B, Lay.zB, Lay.collarTop)];
  if (c) pts.push(...k.boxCorners(Lay.Cp, Lay.zC, Lay.cTop));
  if (d) pts.push([Lay.A.x + Lay.A.w + s(34), -s(62), s(5)], [Lay.B.x + Lay.B.w + s(34), -s(44), Lay.zB + s(14)]);
  return pts;
};

const boxLay = () => {
  const s = (v) => v * U;
  return { s, plan: { x: -s(116), y: -s(98), w: s(232), d: s(196), r: s(3) }, H: s(96), flap: s(2.4) };
};
const matLay = () => {
  const s = (v) => v * U;
  return { s, mat: { x: -s(140), y: -s(96), w: s(280), d: s(192), r: s(4) }, top: s(3) };
};
const step1Points = () => {
  const { s, mat } = matLay();
  return k.boxCorners(mat, 0, s(34)).concat([[s(112), s(70), s(14)]]);
};

// one world scale for the set: the tightest drawing fits with a 14 px margin; roomier ones
// may grow by at most 18% so they fill their canvas without drifting from the rest
const fitScale = (pts) => k.fitProjection(pts, SW, SH, { pad: 14, azimuth: AZ, elevation: EL }).scale;
const FITS = (() => {
  const Lay = stepLay();
  const b = boxLay();
  return {
    1: fitScale(step1Points()),
    2: fitScale(stackPoints(Lay)),
    3: fitScale(stackPoints(Lay, { c: true })),
    4: fitScale(stackPoints(Lay, { c: true, d: true })),
    5: fitScale(k.boxCorners(b.plan, 0, b.H + b.flap)),
  };
})();
const MIN_FIT = Math.min(...Object.values(FITS));
const scaleFor = (n) => Math.min(FITS[n], MIN_FIT * 1.18);

function stepDoc(n, body) {
  const id = `step${n}`;
  return svgDoc({ id, width: SW, height: SH, body, css: styleSheet(id, { w: 2, wf: 1.2, wd: 1.2 }) });
}

// ---- 1 Understand: a part on the bench, measured with a caliper, beside the parts list ----
function step1() {
  const Lay = stepLay({ zB: matLay().top });
  const { s } = Lay;
  const { mat, top } = matLay();
  const P = stepProjection(step1Points(), scaleFor(1));
  const c = ctx(P, "step1");
  const out = [];
  // bench mat with a printed grid
  const grid = [];
  for (let i = 1; i < 12; i++) grid.push(k.lineOnTop([mat.x + s(6), mat.y + (mat.d / 12) * i], [mat.x + mat.w - s(6), mat.y + (mat.d / 12) * i], top, P));
  for (let i = 1; i < 15; i++) grid.push(k.lineOnTop([mat.x + (mat.w / 15) * i, mat.y + s(6)], [mat.x + (mat.w / 15) * i, mat.y + mat.d - s(6)], top, P));
  out.push(part(c.S(k.slabOf(mat, 0, top, P, 3)) + c.L(k.planOutline(k.insetPlan(mat, s(6)), top, P, 3), { tone: "faint" }) + c.L(grid.join(""), { tone: "faint" })));
  // parts list: a sheet with ticked boxes and rule lines (no text)
  const sh = { x: -s(128), y: -s(58), w: s(58), d: s(88), r: s(1.5) };
  const sz = top + s(1.6);
  let sheet = c.S(k.slabOf(sh, top, s(1.6), P, 2), { className: "fine" });
  sheet += c.L(k.lineOnTop([sh.x + s(5), sh.y + s(8)], [sh.x + sh.w - s(5), sh.y + s(8)], sz, P), { tone: "hi", free: true });
  const ticks = [];
  for (let i = 0; i < 4; i++) {
    const by = sh.y + s(16 + i * 18);
    sheet += c.L(k.planOutline({ x: sh.x + s(6), y: by, w: s(8), d: s(8), r: 0 }, sz, P, 1), { tone: "hi" });
    sheet += c.L(k.lineOnTop([sh.x + s(19), by + s(3)], [sh.x + sh.w - s(6), by + s(3)], sz, P) + k.lineOnTop([sh.x + s(19), by + s(8)], [sh.x + sh.w - s(15), by + s(8)], sz, P), { tone: "mid", free: true });
    if (i < 2) ticks.push(k.onTop([[sh.x + s(7.4), by + s(4.2)], [sh.x + s(10), by + s(6.8)], [sh.x + s(14.5), by + s(0.2)]], sz, P));
  }
  sheet += c.L(ticks.join(""), { tone: "hi", free: true });
  out.push(part(sheet));
  // B on the bench: the part under inspection, shifted right of the sheet
  const off = [s(30), -s(18)];
  const B = partB(c, Lay, { rich: false, socketId: "step1-socket", clipId: "step1-socket-clip" });
  const frontY = off[1] + Lay.B.y + Lay.B.d;
  const beamY = frontY + s(14);
  const jawL = { x: off[0] + Lay.B.x - s(8), y: frontY - s(46), w: s(4), d: s(46) + s(24), r: 0.3 };
  const jawR = { x: off[0] + Lay.B.x + Lay.B.w + s(4), y: frontY - s(46), w: s(4), d: s(46) + s(24), r: 0.3 };
  const jawH = s(25);
  out.push(part(c.S(k.slabOf(jawL, top, jawH, P, 2), { className: "fine" }) + shift(c, off, B.svg)));
  // caliper: beam with a scale, fixed jaw (above), sliding jaw with its thumb wheel
  const beam = { x: jawL.x, y: beamY, w: jawR.x + jawR.w + s(18) - jawL.x, d: s(9), r: 0.3 };
  const bz = top + s(3.4);
  let cal = c.S(k.slabOf(beam, top, s(3.4), P, 2), { className: "fine" });
  const tk = k.topTicks(beam.x + s(8), jawR.x - s(6), s(6), 5, beam.y + s(0.8), bz, [s(2.4), s(4.4)], P, "x");
  cal += c.L(tk.minor, { tone: "mid" }) + c.L(tk.major, { tone: "hi" });
  cal += c.S(k.slabOf(jawR, top, jawH, P, 2), { className: "fine" });
  const slider = { x: jawR.x - s(2), y: beam.y - s(2), w: s(18), d: s(13), r: s(1) };
  cal += c.S(k.slabOf(slider, bz, s(5), P, 2), { className: "fine" });
  cal += c.S(k.cylinder(slider.x + slider.w - s(5), slider.y + slider.d / 2, s(3.4), bz + s(5), s(2.4), P, 14), { className: "fine" });
  out.push(part(cal));
  return stepDoc(1, out.join(""));
}

// ---- 2 Build: A and B stacked ----
function step2() {
  const Lay = stepLay();
  const P = stepProjection(stackPoints(Lay), scaleFor(2));
  const c = ctx(P, "step2");
  const A = partA(c, Lay, { rich: false, guides: false, key: true });
  const B = partB(c, Lay, { rich: false, socketId: "step2-socket", clipId: "step2-socket-clip" });
  return stepDoc(2, part(A.svg) + part(B.svg));
}

// ---- 3 Integrate AI: C seated in B's socket ----
function step3() {
  const Lay = stepLay();
  const P = stepProjection(stackPoints(Lay, { c: true }), scaleFor(3));
  const c = ctx(P, "step3");
  const { s } = Lay;
  const A = partA(c, Lay, { rich: false, guides: false, key: false });
  const B = partB(c, Lay, { rich: false, socketId: "step3-socket", clipId: "step3-socket-clip" });
  const C = partC(c, Lay, { rich: false });
  // snap marks: a fan of three short strokes out of each side of C
  const fan = [];
  for (const [x, y, dir] of [[-s(26), s(26), Math.PI], [s(26), -s(26), 0]]) {
    const p = c.at([x, y, Lay.zC + s(13)]);
    for (const da of [-0.5, 0, 0.5]) {
      const a = dir + da * (dir ? -1 : 1);
      fan.push(`M${f1(p[0] + Math.cos(a) * 9)} ${f1(p[1] + Math.sin(a) * 9 - 2)}L${f1(p[0] + Math.cos(a) * 17)} ${f1(p[1] + Math.sin(a) * 17 - 2)}`);
    }
  }
  return stepDoc(3, part(A.svg) + part(B.svg) + partC_(c.blue(C.svg)) + part(`<path class="mark" d="${fan.join("")}"/>`));
}

// ---- 4 Automate: D connected, the gears turning ----
function step4() {
  const Lay = stepLay();
  const P = stepProjection(stackPoints(Lay, { c: true, d: true }), scaleFor(4));
  const c = ctx(P, "step4");
  const { s } = Lay;
  const A = partA(c, Lay, { rich: false, guides: false, key: false });
  const B = partB(c, Lay, { rich: false, socketId: "step4-socket", clipId: "step4-socket-clip" });
  const C = partC(c, Lay, { rich: false });
  const D = partD(c, Lay, { rich: false, cableWidth: 6.5, bow: 0.32 });
  // turning arrow around the big gear
  const [gx, gy, gr] = D.anchors.gearWorld;
  const R = gr + s(9);
  const pts = [];
  for (let a = 150; a <= 330; a += 10) pts.push(c.at([gx + Math.cos((a * Math.PI) / 180) * R, gy + Math.sin((a * Math.PI) / 180) * R, Lay.aTop + s(9)]));
  const last = pts[pts.length - 1];
  const prev = pts[pts.length - 3];
  const ang = Math.atan2(last[1] - prev[1], last[0] - prev[0]);
  const head = [Math.PI * 0.82, -Math.PI * 0.82].map((da) => [last[0] + Math.cos(ang + da) * 6.5, last[1] + Math.sin(ang + da) * 6.5]);
  const arrow = `M${pts.map(([x, y]) => `${f1(x)} ${f1(y)}`).join("L")}M${f1(head[0][0])} ${f1(head[0][1])}L${f1(last[0])} ${f1(last[1])}L${f1(head[1][0])} ${f1(head[1][1])}`;
  return stepDoc(4, part(A.svg) + part(B.svg) + partC_(c.blue(C.svg)) + part(D.svg + `<path class="mark" d="${arrow}"/>`));
}

// ---- 5 Ship: the unit boxed and closed; a window shows the module ----
function step5() {
  const { s, plan, H, flap } = boxLay();
  const P = stepProjection(k.boxCorners(plan, 0, H + flap), scaleFor(5));
  const c = ctx(P, "step5");
  const xMax = plan.x + plan.w;
  const yMax = plan.y + plan.d;
  const face = (pts) => k.pathOf(pts.map(c.at));
  let body = c.S(k.slabOf(plan, 0, H, P, 3), { inner: c.L(k.sideSeam(plan, H - s(9), P, 3), { tone: "faint" }) });
  // long face: the window and a hand slot
  body += c.path("slot-d", c.faceY(yMax, -s(84), s(20), s(26), s(72)));
  body += c.path("slot-d", c.faceY(yMax, s(46), s(96), s(52), s(62)));
  // short face: label with a barcode, two up arrows, a ticked sticker
  body += c.path("slot", c.faceX(xMax, -s(78), -s(18), s(40), s(76)));
  const bars = [];
  for (let i = 0; i < 9; i++) bars.push(k.segment([xMax, -s(72) + i * s(5), s(46)], [xMax, -s(72) + i * s(5), s(62)], P));
  body += c.L(bars.join(""), { tone: "hi", free: true });
  const arrowUp = (y) => k.segment([xMax, y, s(30)], [xMax, y, s(70)], P) + face([[xMax, y - s(8), s(58)], [xMax, y, s(71)], [xMax, y + s(8), s(58)]]);
  body += c.L(arrowUp(s(14)) + arrowUp(s(36)), { tone: "hi", free: true });
  body += c.path("slot", k.sideRing([xMax, s(72), s(32)], s(14), "x", P, 20));
  body += c.L(face([[xMax, s(65), s(32)], [xMax, s(70), s(26)], [xMax, s(80), s(40)]]), { tone: "hi", free: true });
  // a strap around the carton: over the top and down both visible faces
  const sx0 = s(28);
  const sx1 = s(36);
  const sT = H + flap;
  body += `<path class="strap" d="${face([[sx0, yMax, 0], [sx1, yMax, 0], [sx1, yMax, sT], [sx0, yMax, sT]]).replace(/$/, "Z")}"/>`;
  // the module seen through the window (the only blue)
  const win = c.blue(`<path class="blue-face" d="${c.faceY(yMax, -s(78), s(14), s(30), s(66))}"/>` +
    [-58, -34, -10].map((x) => c.path("slot", c.faceY(yMax, s(x) - s(5), s(x) + s(5), s(42), s(58)))).join("") +
    c.Dt([-72, 8].map((x) => c.at([s(x), yMax, s(36)])), { size: 1.2 }));
  // closed flaps and the tape across the seam
  const fp1 = { x: plan.x, y: plan.y, w: plan.w, d: plan.d / 2, r: s(1) };
  const fp2 = { x: plan.x, y: 0, w: plan.w, d: plan.d / 2, r: s(1) };
  const strapTop = k.pathOf([[sx0, plan.y, sT], [sx1, plan.y, sT], [sx1, yMax, sT], [sx0, yMax, sT]].map(c.at), true);
  const buckle = c.S(k.slabOf({ x: sx0 - s(2), y: -s(7), w: s(12), d: s(14), r: s(1.5) }, sT, s(2.2), P, 2), { className: "fine" });
  let flaps = c.S(k.slabOf(fp1, H, flap, P, 2), { className: "fine" }) + c.S(k.slabOf(fp2, H, flap, P, 2), { className: "fine" });
  const tz = H + flap;
  const tape = k.pathOf([[plan.x + s(2), -s(8), tz], [xMax, -s(8), tz], [xMax, s(8), tz], [plan.x + s(2), s(8), tz]].map(c.at), true);
  const tapeFace = k.pathOf([[xMax, -s(8), tz], [xMax, s(8), tz], [xMax, s(8), tz - s(30)], [xMax, -s(8), tz - s(30)]].map(c.at), true);
  flaps += `<path class="tape" d="${tape}"/><path class="tape" d="${tapeFace}"/><path class="strap" d="${strapTop}"/>` + buckle;
  return stepDoc(5, part(body) + partC_(win) + part(flaps));
}

export const stepBuilders = [step1, step2, step3, step4, step5];
