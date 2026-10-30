// Five spot drawings, one camera, one world scale, the same parts as the hero.
import { k, styleSheet, svgDoc, ctx, layout, partA, partB, partC, partD, gearRing } from "./lib.mjs";

const AZ = 45;
const EL = 30;
const SW = 320;
const SH = 260;
const U = 0.55;
const f1 = (n) => Math.round(n * 10) / 10;
const part = (inner, cls = "part") => `<g class="${cls}">${inner}</g>`;
const partC_ = (inner) => `<g class="part part-c">${inner}</g>`;

// A step's projection: the shared scale, centred on its own points.
// `frame` ({ W, H, dx, dy }) re-centres the drawing in a cropped viewBox; without it, the raw 320x260.
function stepProjection(points, scale, frame) {
  const base = { origin: [0, 0], scale, azimuth: AZ, elevation: EL };
  const xy = points.map((p) => k.iso(p, base));
  const x0 = Math.min(...xy.map((p) => p[0]));
  const x1 = Math.max(...xy.map((p) => p[0]));
  const y0 = Math.min(...xy.map((p) => p[1]));
  const y1 = Math.max(...xy.map((p) => p[1]));
  return { ...base, origin: [SW / 2 - (x0 + x1) / 2 + (frame?.dx ?? 0), SH / 2 - (y0 + y1) / 2 + 2 + (frame?.dy ?? 0)] };
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

const matLay = () => {
  const s = (v) => v * U;
  return { s, mat: { x: -s(140), y: -s(96), w: s(280), d: s(192), r: s(4) }, top: s(3) };
};
const step1Points = () => {
  const { s, mat } = matLay();
  return k.boxCorners(mat, 0, s(34)).concat([[s(112), s(70), s(14)]]);
};

// one world scale for the whole set: the tightest of the four machine drawings fits with a
// 14 px margin; the carton of step 5 is built at that same scale
const fitScale = (pts) => k.fitProjection(pts, SW, SH, { pad: 14, azimuth: AZ, elevation: EL }).scale;
const S0 = (() => {
  const Lay = stepLay();
  return Math.min(
    fitScale(step1Points()),
    fitScale(stackPoints(Lay)),
    fitScale(stackPoints(Lay, { c: true })),
    fitScale(stackPoints(Lay, { c: true, d: true })),
  );
})();
const scaleFor = () => S0;

function stepDoc(n, body, frame) {
  const id = `step${n}`;
  return svgDoc({ id, width: frame?.W ?? SW, height: frame?.H ?? SH, body, css: styleSheet(id, { w: 2, wf: 1.2, wd: 1.2 }) });
}

// ---- 1 Understand: a part on the bench, measured with a caliper, beside the parts list ----
function step1(frame) {
  const Lay = stepLay({ zB: matLay().top });
  const { s } = Lay;
  const { mat, top } = matLay();
  const P = stepProjection(step1Points(), scaleFor(), frame);
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
  return stepDoc(1, out.join(""), frame);
}

// ---- 2 Build: A and B stacked ----
function step2(frame) {
  const Lay = stepLay();
  const P = stepProjection(stackPoints(Lay), scaleFor(), frame);
  const c = ctx(P, "step2");
  const A = partA(c, Lay, { rich: false, guides: false, key: true });
  const B = partB(c, Lay, { rich: false, socketId: "step2-socket", clipId: "step2-socket-clip" });
  return stepDoc(2, part(A.svg) + part(B.svg), frame);
}

// ---- 3 Integrate AI: C seated in B's socket ----
function step3(frame) {
  const Lay = stepLay();
  const P = stepProjection(stackPoints(Lay, { c: true }), scaleFor(), frame);
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
  return stepDoc(3, part(A.svg) + part(B.svg) + partC_(c.blue(C.svg)) + part(`<path class="mark" d="${fan.join("")}"/>`), frame);
}

// ---- 4 Automate: D connected, the gears turning ----
function step4(frame) {
  const Lay = stepLay();
  const P = stepProjection(stackPoints(Lay, { c: true, d: true }), scaleFor(), frame);
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
  return stepDoc(4, part(A.svg) + part(B.svg) + partC_(c.blue(C.svg)) + part(D.svg + `<path class="mark" d="${arrow}"/>`), frame);
}

// ---- 5 Ship: the same machine, packed. A carton at the footprint and scale of steps 1-4, closed
// and taped; a die-cut window on the long face shows the AI module (blue) seated on the stack ----
function step5(frame) {
  const Lay = stepLay();
  const { s } = Lay;
  const W = s(248);
  const Dp = s(100);
  const plan = { x: -W / 2, y: -Dp / 2, w: W, d: Dp, r: s(2) };
  const H = s(85);
  const flap = s(2.4);
  const P = stepProjection(k.boxCorners(plan, 0, H + flap), scaleFor(), frame);
  const c = ctx(P, "step5");
  const xMax = plan.x + plan.w;
  const yMax = plan.y + plan.d;
  const tz = H + flap;
  const face = (pts) => k.pathOf(pts.map(c.at), true);
  const open = (pts) => k.pathOf(pts.map(c.at));

  // carton body: one seam under the flaps, the manufacturer's glue joint on the long face
  let body = c.S(k.slabOf(plan, 0, H, P, 3), { inner: c.L(k.sideSeam(plan, H - s(6), P, 3), { tone: "faint" }) });
  for (const gx of [plan.x + s(18), plan.x + s(24)]) body += c.L(k.segment([gx, yMax, 0], [gx, yMax, H - s(6)], P), { tone: "faint" });

  // long face: the window is a recess; the unit sits one board-thickness behind the face plane
  const win = { x0: -s(104), x1: s(36), z0: s(19), z1: s(79) };
  const wall = s(2.5);
  const yD = yMax - wall;
  const winPath = c.faceY(yMax, win.x0, win.x1, win.z0, win.z1);
  const ox = -s(34);
  const fy = (x0, x1, z0, z1) => k.pathOf([[x0 + ox, yD, z0], [x1 + ox, yD, z0], [x1 + ox, yD, z1], [x0 + ox, yD, z1]].map(c.at), true);
  const el = (cls, x0, x1, z0, z1) => c.path(cls, fy(x0, x1, z0, z1));
  const seg = (x0, x1, z, tone) => c.L(k.segment([x0 + ox, yD, z], [x1 + ox, yD, z], P), { tone });
  const A = Lay.A;
  const B = Lay.B;
  let unit = el("el-face", A.x, A.x + A.w, win.z0, Lay.aTop) + seg(A.x, A.x + A.w, Lay.aH, "hi");
  unit += el("el-face", B.x, B.x + B.w, Lay.zB, Lay.bTop) + seg(B.x, B.x + B.w, Lay.bTop - s(5), "faint");
  unit += el("slot", B.x + s(12), B.x + B.w - s(12), Lay.zB + s(4), Lay.bTop - s(4));
  unit += c.Dt([0, 5, 10].map((i) => c.at([B.x + s(20) + s(i) + ox, yD, Lay.bTop - s(7.4)])), { size: 1.3 });
  unit += el("el-mid", -s(36), s(36), Lay.bTop, Lay.collarTop);
  const z0 = Lay.zC;
  const cp = z0 + Lay.cBody;
  let mod = el("el-face", -s(26), s(26), z0, cp) + seg(-s(26), s(26), z0 + s(6), "faint");
  for (let i = -3; i <= 3; i++) mod += el("slot", s(i * 6) - s(1.4), s(i * 6) + s(1.4), z0 + s(1.2), z0 + s(4.4));
  for (const vx of [-14, 0, 14]) mod += el("slot", s(vx) - s(2.4), s(vx) + s(2.4), z0 + s(10), z0 + s(20));
  mod += el("el-mid", -s(18), s(18), cp, cp + Lay.cPlate);
  mod += c.Dt([-1, 1].map((sg) => c.at([sg * s(21) + ox, yD, cp - s(4)])), { size: 1.3 });
  const clip = `<clipPath id="step5-win-clip"><path d="${winPath}"/></clipPath>`;
  // recess: dark back, the unit (clipped to the opening), then the two inner walls that face the viewer
  const wl = k.pathOf([[win.x0, yMax, win.z0], [win.x0, yD, win.z0], [win.x0, yD, win.z1], [win.x0, yMax, win.z1]].map(c.at), true);
  const wb = k.pathOf([[win.x0, yMax, win.z0], [win.x1, yMax, win.z0], [win.x1, yD, win.z0], [win.x0, yD, win.z0]].map(c.at), true);
  body += c.path("slot-d", winPath) + clip + `<g clip-path="url(#step5-win-clip)">${unit}</g>`;
  body += `<path class="el-mid" d="${wl}"/><path class="el-face" d="${wb}"/>`;
  body += c.path("pit-edge", winPath);
  // hand slot and three vent holes, echoing the round ports of the base
  body += c.path("slot-d", c.faceY(yMax, s(52), s(102), s(46), s(56)));
  body += c.L(k.segment([s(56), yMax, s(51)], [s(98), yMax, s(51)], P), { tone: "mid", free: true });
  for (const hx of [60, 78, 96]) body += c.path("slot-d", k.sideRing([s(hx), yMax, s(68)], s(3.6), "y", P, 16));

  // short face: barcode label, two up arrows, the ready tick, and a sticker with the two gears of D
  body += c.path("slot", c.faceX(xMax, -s(46), -s(12), s(54), s(78)));
  const bars = [];
  for (let i = 0; i < 6; i++) bars.push(k.segment([xMax, -s(41) + i * s(5), s(59)], [xMax, -s(41) + i * s(5), s(73)], P));
  body += c.L(bars.join(""), { tone: "hi", free: true });
  const up = (y) => k.segment([xMax, y, s(10)], [xMax, y, s(40)], P) + open([[xMax, y - s(6), s(33)], [xMax, y, s(41)], [xMax, y + s(6), s(33)]]);
  body += c.L(up(-s(34)) + up(-s(19)), { tone: "hi", free: true });
  body += c.path("slot", k.sideRing([xMax, s(30), s(68)], s(9), "x", P, 20));
  body += c.L(open([[xMax, s(26), s(68)], [xMax, s(29), s(64.5)], [xMax, s(35), s(71.5)]]), { tone: "hi", free: true });
  body += c.path("slot", c.faceX(xMax, s(14), s(48), s(14), s(44)));
  const glyph = (cy, cz, tip, root, n, phase) => `<path class="glyph" d="${face(gearRing(cy, cz, tip, root, n, phase).map(([a, b]) => [xMax, a, b]))}"/><path class="glyph" d="${k.sideRing([xMax, cy, cz], root * 0.42, "x", P, 12)}"/>`;
  body += glyph(s(26), s(29), s(8.4), s(6.7), 10, 0) + glyph(s(38.3), s(29), s(5), s(3.8), 6, Math.PI / 6);

  // top: two flaps meeting over the centre seam, a fold score along each long edge, and the tape
  const fp1 = { x: plan.x, y: plan.y, w: plan.w, d: Dp / 2, r: s(1) };
  const fp2 = { x: plan.x, y: 0, w: plan.w, d: Dp / 2, r: s(1) };
  const score = (y) => c.L(k.lineOnTop([plan.x, y], [xMax, y], tz, P), { tone: "faint" });
  let flaps = c.S(k.slabOf(fp1, H, flap, P, 2), { className: "fine", inner: score(plan.y + s(9)) });
  flaps += c.S(k.slabOf(fp2, H, flap, P, 2), { className: "fine", inner: score(yMax - s(9)) });
  const tw = s(8);
  const tt = s(0.8);
  const tape = { x: plan.x + s(2), y: -tw, w: plan.w - s(2), d: 2 * tw, r: 0 };
  flaps += c.S(k.slabOf(tape, tz, tt, P, 1), { className: "fine tapeslab" });
  flaps += c.L([-tw + s(3.5), tw - s(3.5)].map((y) => k.lineOnTop([tape.x, y], [xMax, y], tz + tt, P)).join(""), { tone: "mid" });
  const teeth = [];
  const n = 5;
  for (let i = 0; i <= n; i++) teeth.push([xMax, tw - (2 * tw * i) / n, tz - s(28) + (i % 2 ? s(3) : 0)]);
  flaps += `<path class="tape" d="${face([[xMax, -tw, tz], [xMax, tw, tz], ...teeth])}"/>`;
  flaps += c.L(open([[xMax, tw - s(3.5), tz - s(2)], [xMax, tw - s(3.5), tz - s(24)]]) + open([[xMax, -tw + s(3.5), tz - s(2)], [xMax, -tw + s(3.5), tz - s(24)]]), { tone: "mid", free: true });

  return stepDoc(5, part(body) + partC_(`<g clip-path="url(#step5-win-clip)">${c.blue(mod)}</g>`) + part(flaps), frame);
}

export const stepBuilders = [step1, step2, step3, step4, step5];
