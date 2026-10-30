// Shared vocabulary for the "Manual de montaje" illustrations: one camera, one palette, one set of
// parts (A backend slab, B frontend slab with a socket, C AI module, D automation drive) that the
// hero and the five step drawings all build from. Geometry comes from the anatomy-asset kit.
import * as k from "file:///C:/Users/David/.agents/skills/anatomy-asset/kit/iso-kit.mjs";

export { k };

// ---------- palette (the direction contract) ----------
// paper #f6f7f8, ink #121314, side faces #e4e6ea, rules #c9ccd1, process blue #2d5bff (part C only).
export function styleSheet(id, { w = 2.5, wf = 1.5, wd = 1.4 } = {}) {
  const s = `#${id}`;
  return `
${s}{--anatomy-paper:#f6f7f8;--anatomy-top:#ffffff;--anatomy-shade-0:#d3d6dc;--anatomy-shade-1:#dbdee3;--anatomy-shade-2:#e0e3e7;--anatomy-shade-3:#e4e6ea;--anatomy-hi:#121314;--anatomy-mid:#5b6068;--anatomy-lo:#9ca1a9;--anatomy-faint:#c9ccd1;--anatomy-dot:#121314;--w:${w}px;--wf:${wf}px;--wd:${wd}px;--pit-1:#3d4046;--pit-2:#2b2d31;--pit-f:#1a1b1e}
${s} .ac-ink{--anatomy-paper:#2a2c30;--anatomy-top:#4a4d54;--anatomy-shade-0:#222428;--anatomy-shade-1:#2c2e33;--anatomy-shade-2:#33363b;--anatomy-shade-3:#3a3d43;--anatomy-faint:#55585f;--anatomy-lo:#70747c;--anatomy-mid:#8d9199;--anatomy-dot:#f6f7f8}
${s} .ac-blue{--anatomy-paper:#2d5bff;--anatomy-top:#5f84ff;--anatomy-shade-0:#2146c4;--anatomy-shade-1:#264ed9;--anatomy-shade-2:#2a56f0;--anatomy-shade-3:#2d5bff;--anatomy-faint:#1b3aa8;--anatomy-lo:#8fa8ff;--anatomy-mid:#c3d0ff;--anatomy-dot:#f6f7f8}
${s} .iso-fill{fill:var(--anatomy-paper);stroke:none}
${s} .iso-shade,${s} .iso-top{stroke:none}
${s} .iso-shade[data-shade="0"]{fill:var(--anatomy-shade-0)}
${s} .iso-shade[data-shade="1"]{fill:var(--anatomy-shade-1)}
${s} .iso-shade[data-shade="2"]{fill:var(--anatomy-shade-2)}
${s} .iso-shade[data-shade="3"]{fill:var(--anatomy-shade-3)}
${s} .iso-top{fill:var(--anatomy-top)}
${s} .iso-line{fill:none;stroke:var(--anatomy-lo);stroke-width:var(--wd);stroke-linecap:round;stroke-linejoin:round}
${s} .iso-line[data-tone="hi"]{stroke:var(--anatomy-hi)}
${s} .iso-line[data-tone="mid"]{stroke:var(--anatomy-mid)}
${s} .iso-line[data-tone="lo"]{stroke:var(--anatomy-lo)}
${s} .iso-line[data-tone="faint"]{stroke:var(--anatomy-faint)}
${s} .iso-solid>.iso-edge,${s} .iso-solid>.iso-crease{stroke:var(--anatomy-hi);stroke-width:var(--w)}
${s} .iso-solid.fine>.iso-edge,${s} .iso-solid.fine>.iso-crease{stroke-width:var(--wf)}
${s} .iso-dots circle{fill:var(--anatomy-dot);stroke:none}
${s} .slot{fill:var(--anatomy-faint);stroke:var(--anatomy-hi);stroke-width:var(--wf);stroke-linejoin:round}
${s} .slot-d{fill:#1a1b1e;stroke:var(--anatomy-hi);stroke-width:var(--wf);stroke-linejoin:round}
${s} .led{fill:var(--anatomy-hi);stroke:none}
${s} .pit-1{fill:var(--pit-1);stroke:var(--anatomy-hi);stroke-width:var(--wf);stroke-linejoin:round}
${s} .pit-2{fill:var(--pit-2);stroke:var(--anatomy-hi);stroke-width:var(--wf);stroke-linejoin:round}
${s} .pit-f{fill:var(--pit-f);stroke:var(--anatomy-hi);stroke-width:var(--wf);stroke-linejoin:round}
${s} .pit-edge{fill:none;stroke:var(--anatomy-hi);stroke-width:var(--w);stroke-linejoin:round}
${s} .pin{fill:#2b2d31;stroke:#9ca1a9;stroke-width:1.2}
${s} .pin-dot{fill:#c9ccd1;stroke:none}
${s} .guide{fill:none;stroke:var(--anatomy-hi);stroke-width:var(--wd);stroke-linecap:round;stroke-dasharray:5 6}
${s} .arrow{fill:none;stroke:var(--anatomy-hi);stroke-width:var(--w);stroke-linecap:round;stroke-dasharray:8 7}
${s} .arrowhead{fill:none;stroke:var(--anatomy-hi);stroke-width:var(--w);stroke-linecap:round;stroke-linejoin:round}
${s} .arrowhead-bg{fill:none;stroke:#f6f7f8;stroke-width:7;stroke-linecap:round;stroke-linejoin:round}
${s} .cable-o{fill:none;stroke:var(--anatomy-hi);stroke-linecap:round;stroke-linejoin:round}
${s} .cable-i{fill:none;stroke:#e4e6ea;stroke-linecap:round;stroke-linejoin:round}
${s} .cable-f{fill:none;stroke:var(--anatomy-hi);stroke-linecap:round}
${s} .bubble{fill:#f6f7f8;stroke:#121314;stroke-width:var(--w)}
${s} .leader{fill:none;stroke:#121314;stroke-width:var(--wd);stroke-linecap:round}
${s} .anchor{fill:#121314;stroke:none}
${s} .mark{fill:none;stroke:#121314;stroke-width:var(--w);stroke-linecap:round;stroke-linejoin:round}
${s} .mark-f{fill:#f6f7f8;stroke:#121314;stroke-width:var(--w);stroke-linecap:round;stroke-linejoin:round}
${s} .blue-face{fill:var(--anatomy-paper);stroke:var(--anatomy-hi);stroke-width:var(--wf);stroke-linejoin:round}
${s} .strap{fill:#2a2c30;stroke:var(--anatomy-hi);stroke-width:var(--wf);stroke-linejoin:round}
${s} .el-face{fill:var(--anatomy-shade-3);stroke:var(--anatomy-hi);stroke-width:var(--wf);stroke-linejoin:round}
${s} .el-mid{fill:var(--anatomy-shade-1);stroke:var(--anatomy-hi);stroke-width:var(--wf);stroke-linejoin:round}
${s} .glyph{fill:none;stroke:var(--anatomy-hi);stroke-width:var(--wf);stroke-linejoin:round;stroke-linecap:round}
${s} .tapeslab>.iso-fill,${s} .tapeslab>.iso-top{fill:#c9ccd1}
${s} .tapeslab>.iso-shade{fill:#b3b7be}
${s} .tape{fill:#c9ccd1;stroke:#121314;stroke-width:var(--wf);stroke-linejoin:round}
`.trim();
}

export function svgDoc({ id, width, height, body, css }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" id="${id}" viewBox="0 0 ${width} ${height}"><style><![CDATA[\n${css}\n]]></style>${Array.isArray(body) ? body.join("") : body}</svg>`;
}

// ---------- drawing context bound to one camera ----------
export function ctx(P, id) {
  const at = (p) => k.iso(p, P);
  const depth = (p) => k.depthOf(p, P);
  const S = (paths, o = {}) => k.solidSvg(paths, { tone: "hi", crease: "hi", ...o });
  const L = (d, o = {}) => k.lineSvg(d, { tone: "mid", ...o });
  const Dt = (pts, o = {}) => k.dotsSvg(pts, { size: 1.3, tone: "hi", ...o });
  const ink = (s) => `<g class="ac-ink">${s}</g>`;
  const blue = (s) => `<g class="ac-blue">${s}</g>`;
  const ordered = (items) => [...items].sort((a, b) => depth(a.at) - depth(b.at)).map((i) => i.svg).join("");
  const faceY = (y, x0, x1, z0, z1) => k.pathOf([[x0, y, z0], [x1, y, z0], [x1, y, z1], [x0, y, z1]].map(at), true);
  const faceX = (x, y0, y1, z0, z1) => k.pathOf([[x, y0, z0], [x, y1, z0], [x, y1, z1], [x, y0, z1]].map(at), true);
  const path = (cls, d) => `<path class="${cls}" d="${d}"/>`;
  return { P, id, at, depth, S, L, Dt, ink, blue, ordered, faceY, faceX, path };
}

// ---------- small shared parts ----------
// Hex-head bolt with a screwdriver slot, standing on a top face.
export function bolt(c, [x, y], z, r = 3) {
  const h = r * 0.75;
  return c.S(k.cylinder(x, y, r, z, h, c.P, 6), { className: "fine" }) +
    c.L(k.lineOnTop([x - r * 0.55, y], [x + r * 0.55, y], z + h, c.P), { tone: "hi" });
}

// A turned dowel pin with a chamfered tip.
export function dowel(c, [x, y], z, r = 3, h = 10) {
  return c.S(k.cylinder(x, y, r, z, h, c.P, 14), { className: "fine" }) +
    c.S(k.cylinder(x, y, r * 0.6, z + h, r * 0.5, c.P, 12), { className: "fine" });
}

// A toothed ring, tooth centred on `phase`, for a spur gear.
export function gearRing(cx, cy, rTip, rRoot, n, phase = 0) {
  const pts = [];
  const pitch = (Math.PI * 2) / n;
  const f = [-0.3, -0.14, 0.14, 0.3];
  const r = [rRoot, rTip, rTip, rRoot];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < 4; j++) {
      const a = phase + i * pitch + f[j] * pitch;
      pts.push([cx + r[j] * Math.cos(a), cy + r[j] * Math.sin(a)]);
    }
  }
  return pts;
}

// A lettered callout: circle, leader line and an anchor dot on the part. Letters only.
export function callout(letter, [cx, cy], [ax, ay], r = 15) {
  const dx = ax - cx;
  const dy = ay - cy;
  const len = Math.hypot(dx, dy) || 1;
  const sx = cx + (dx / len) * r;
  const sy = cy + (dy / len) * r;
  const f = (n) => Math.round(n * 10) / 10;
  return `<path class="leader" d="M${f(sx)} ${f(sy)}L${f(ax)} ${f(ay)}"/><circle class="anchor" cx="${f(ax)}" cy="${f(ay)}" r="3"/><circle class="bubble" cx="${f(cx)}" cy="${f(cy)}" r="${r}"/><text x="${f(cx)}" y="${f(cy + r * 0.38)}" text-anchor="middle" font-family="Atkinson Hyperlegible, sans-serif" font-size="${f(r * 1.15)}" font-weight="700" fill="#121314">${letter}</text>`;
}

// ---------- layout: every part's height above the floor, scaled by u ----------
export function layout(u, { gapAB = 48, gapC = 64, zB: zBase, ax0 = -124, aw = 286 } = {}) {
  const s = (v) => v * u;
  const aH = s(20);
  const aTier = s(5);
  const aTop = aH + aTier;
  const zB = zBase ?? aTop + s(gapAB);
  const bH = s(18);
  const bTop = zB + bH;
  const collarH = s(4);
  const collarTop = bTop + collarH;
  const pitFloor = bTop - s(9);
  const zC = collarTop + s(gapC);
  return {
    u, s, aH, aTier, aTop, zB, bH, bTop, collarH, collarTop, pitFloor, zC,
    A: { x: s(ax0), y: -s(98), w: s(aw), d: s(196), r: s(5) },
    B: { x: -s(76), y: -s(68), w: s(152), d: s(136), r: s(5) },
    Cp: { x: -s(26), y: -s(26), w: s(52), d: s(52), r: s(3) },
    cBody: s(24), cPlate: s(5), cHandle: s(11),
    cTop: zC + s(24) + s(5) + s(11),
    foot: s(5),
  };
}

// ---------- part A: the backend base ----------
export function partA(c, Lay, { rich = true, guides = true, key = rich } = {}) {
  const { s, u, A } = Lay;
  const P = c.P;
  const out = [];
  // rubber feet
  const feet = k.corners(A, s(16)).map(([x, y]) => ({ at: [x, y, 0], svg: c.ink(c.S(k.cylinder(x, y, s(7.5), -Lay.foot, Lay.foot, P, 16), { className: "fine" })) }));
  out.push(c.ordered(feet));
  // plinth with a seam
  out.push(c.S(k.slabOf(A, 0, Lay.aH, P, 4), { inner: c.L(k.sideSeam(A, Lay.aH - s(5), P, 4), { tone: "faint" }) }));
  const xMax = A.x + A.w;
  const yMax = A.y + A.d;
  // drive bays on the long face (+y): slots with a status dot each
  const bays = 4;
  const bayW = s(rich ? 46 : 40);
  const bayGap = s(rich ? 64 : 52);
  const bx0 = A.x + s(rich ? 18 : 16);
  for (let i = 0; i < bays; i++) {
    const x0 = bx0 + i * bayGap;
    out.push(c.path("slot", c.faceY(yMax, x0, x0 + bayW, s(4), s(12.5))));
    out.push(c.Dt([c.at([x0 + s(5), yMax, s(8.2)])], { size: 1.5 }));
    if (rich) out.push(c.L(c.faceY(yMax, x0 + s(14), x0 + bayW - s(5), s(7), s(9.5)), { tone: "mid" }));
  }
  // network ports on the short face (+x): three round sockets
  const ports = rich ? [64, 40, 16] : [52, 24];
  for (const py of ports.map(s)) {
    out.push(c.path("slot-d", k.sideRing([xMax, py, s(9.5)], s(6.2), "x", P, 18)));
    out.push(c.path("slot", k.sideRing([xMax, py, s(9.5)], s(3.3), "x", P, 14)));
  }
  // upper tier
  const T = k.insetPlan(A, s(7));
  out.push(c.S(k.slabOf(T, Lay.aH, Lay.aTier, P, 4)));
  if (rich) out.push(c.L(k.planOutline(k.insetPlan(T, s(5)), Lay.aTop, P, 4), { tone: "faint" }));
  // things on the tier
  const items = [];
  for (const [x, y] of k.corners(T, s(10))) items.push({ at: [x, y, Lay.aTop], svg: bolt(c, [x, y], Lay.aTop, Math.max(2.4, 3.1 * u)) });
  // dowels that locate part B (and the dashed assembly guides)
  const dx = Lay.B.w / 2 - s(12);
  const dy = Lay.B.d / 2 - s(12);
  const dh = s(10);
  const dowels = [];
  for (const [x, y] of [[-dx, -dy], [dx, -dy], [-dx, dy], [dx, dy]]) dowels.push({ at: [x, y, Lay.aTop], svg: dowel(c, [x, y], Lay.aTop, Math.max(2.4, 3 * u), dh) });
  const guideSvg = guides ? [[-dx, -dy], [dx, -dy], [-dx, dy], [dx, dy]].map(([x, y]) => `<path class="guide" d="${k.rise([x, y], Lay.aTop + dh + s(3), Lay.zB, P)}"/>`).join("") : "";
  if (rich) {
    // the database: two stacks of discs on the front strip
    const drum = (x, y, r, n) => {
      const parts = [];
      for (let i = 0; i < n; i++) {
        const z = Lay.aTop + i * s(7);
        parts.push(c.S(k.cylinder(x, y, r, z, s(5), P, 28), { className: "fine", inner: c.L(k.sideArc(x, y, r, z + s(2.5), P, 28), { tone: "faint" }) }));
      }
      return parts.join("");
    };
    items.push({ at: [-s(28), s(78), Lay.aTop], svg: drum(-s(28), s(78), s(12), 3) });
    items.push({ at: [s(2), s(78), Lay.aTop], svg: drum(s(2), s(78), s(9), 2) });
    // a label plate with rule lines and two dots (no text)
    const lab = { x: A.x + s(12), y: s(70), w: s(36), d: s(18), r: s(1.5) };
    items.push({ at: [lab.x + lab.w / 2, lab.y + lab.d / 2, Lay.aTop], svg: c.S(k.slabOf(lab, Lay.aTop, s(1.2), P, 3), { className: "fine" }) + c.L([8, 13].map((len, i) => k.lineOnTop([lab.x + s(5), lab.y + s(5 + i * 4)], [lab.x + s(5 + len * 1.4), lab.y + s(5 + i * 4)], Lay.aTop + s(1.2), P)).join(""), { tone: "mid", free: true }) + c.Dt([c.at([lab.x + lab.w - s(5), lab.y + lab.d / 2, Lay.aTop + s(1.2)])], { size: 1.4 }) });
    // a power block with a fan grille on the left strip
    const pb = { x: A.x + s(10), y: s(8), w: s(36), d: s(24), r: s(2) };
    const fan = [pb.x + pb.w / 2, pb.y + pb.d / 2];
    const pz = Lay.aTop + s(8);
    items.push({ at: [fan[0], fan[1], Lay.aTop], svg: c.S(k.slabOf(pb, Lay.aTop, s(8), P, 3), { inner: c.L(k.sideSeam(pb, Lay.aTop + s(2.5), P, 3), { tone: "faint" }) }) +
      c.L(k.ring(fan[0], fan[1], s(8.5), pz, P, 24) + k.ring(fan[0], fan[1], s(5), pz, P, 20), { tone: "mid" }) +
      c.L([0, 1, 2, 3].map((i) => { const a = (i * Math.PI) / 4; return k.onTop([[fan[0] - Math.cos(a) * s(8.5), fan[1] - Math.sin(a) * s(8.5)], [fan[0] + Math.cos(a) * s(8.5), fan[1] + Math.sin(a) * s(8.5)]], pz, P); }).join(""), { tone: "lo" }) +
      c.Dt([c.at([fan[0], fan[1], pz])], { size: 1.6 }) });
    // cooling ribs along the front
    for (let i = 0; i < 5; i++) {
      const rx = s(32 + i * 10);
      items.push({ at: [rx, s(80), Lay.aTop], svg: c.S(k.slabOf({ x: rx, y: s(72), w: s(3.6), d: s(16), r: 0.4 }, Lay.aTop, s(5), P, 2), { className: "fine" }) });
    }
  }
  out.push(guideSvg);
  if (key) {
    // a hex key lying on the right strip (the assembly-manual accessory)
    const kx = (Lay.B.x + Lay.B.w + A.x + A.w - s(7)) / 2 - s(8);
    const key1 = { x: kx, y: s(66), w: s(3.4), d: s(30), r: 0.3 };
    const key2 = { x: kx, y: s(66) + s(30) - s(3.4), w: s(18), d: s(3.4), r: 0.3 };
    items.push({ at: [kx, s(80), Lay.aTop], svg: c.S(k.slabOf(key1, Lay.aTop, s(3.4), P, 2), { className: "fine", crease: "none" }) + c.S(k.slabOf(key2, Lay.aTop, s(3.4), P, 2), { className: "fine", crease: "none" }) });
  }
  out.push(c.ordered([...items, ...dowels]));
  return { svg: out.join(""), anchors: { face: c.at([-s(60), yMax, s(8)]), top: c.at([-s(100), -s(40), Lay.aTop]) } };
}

// ---------- part B: the frontend slab with its empty socket ----------
export function partB(c, Lay, { rich = true, socketId = "socket-b", clipId = "socket-clip" } = {}) {
  const { s, u, B } = Lay;
  const P = c.P;
  const out = [];
  out.push(c.S(k.slabOf(B, Lay.zB, Lay.bH, P, 4), { inner: c.L(k.sideSeam(B, Lay.bTop - s(5), P, 4), { tone: "faint" }) }));
  const xMax = B.x + B.w;
  const yMax = B.y + B.d;
  // long face: a browser-like window, three dots and rule lines (no text)
  const wz0 = Lay.zB + s(4);
  const wz1 = Lay.bTop - s(4);
  out.push(c.path("slot", c.faceY(yMax, B.x + s(12), xMax - s(12), wz0, wz1)));
  out.push(c.Dt([0, 5, 10].map((i) => c.at([B.x + s(20) + s(i), yMax, wz1 - s(3.4)])), { size: 1.4 }));
  if (rich) {
    out.push(c.L(c.faceY(yMax, B.x + s(60), xMax - s(20), wz0 + s(2.5), wz0 + s(4.5)), { tone: "mid" }));
  }
  // short face: connector plate for the automation cable, plus a row of slots
  const slots = rich ? 3 : 2;
  for (let i = 0; i < slots; i++) {
    const y0 = B.y + s(66 + i * 20);
    out.push(c.path("slot", c.faceX(xMax, y0, y0 + s(12), wz0, wz1)));
  }
  // top face
  out.push(c.L(k.planOutline(k.insetPlan(B, s(5)), Lay.bTop, P, 4), { tone: "faint" }));
  const items = [];
  for (const [x, y] of k.corners(B, s(9))) items.push({ at: [x, y, Lay.bTop], svg: bolt(c, [x, y], Lay.bTop, Math.max(2.4, 3.1 * u)) });
  const tiles = rich
    ? [
        { x: -68, y: -52, w: 26, d: 30 }, { x: -68, y: -18, w: 26, d: 22 }, { x: -68, y: 8, w: 26, d: 40 },
        { x: 42, y: -52, w: 26, d: 24 }, { x: 42, y: -24, w: 26, d: 34 }, { x: 42, y: 14, w: 26, d: 34 },
      ]
    : [{ x: -68, y: -40, w: 24, d: 30 }, { x: -68, y: -6, w: 24, d: 34 }, { x: 44, y: -40, w: 24, d: 26 }, { x: 44, y: -10, w: 24, d: 34 }];
  for (const t of tiles) {
    const plan = { x: s(t.x), y: s(t.y), w: s(t.w), d: s(t.d), r: s(1.5) };
    items.push({ at: [plan.x + plan.w / 2, plan.y + plan.d / 2, Lay.bTop], svg: c.S(k.slabOf(plan, Lay.bTop, s(2.4), P, 3), { className: "fine" }) });
  }
  // buttons on the front strip
  for (const bx of [-22, 0, 22]) {
    const x = s(bx);
    const y = s(50);
    items.push({ at: [x, y, Lay.bTop], svg: c.S(k.cylinder(x, y, s(5), Lay.bTop, s(3), P, 18), { className: "fine" }) + c.L(k.ring(x, y, s(2.4), Lay.bTop + s(3), P, 12), { tone: "faint" }) });
  }
  if (rich) {
    // two sliders on the back strip
    for (const [sy, kx] of [[-52, -14], [-44, 12]]) {
      const track = { x: -s(32), y: s(sy) - s(1.6), w: s(64), d: s(3.2), r: s(1.4) };
      items.push({ at: [0, s(sy), Lay.bTop], svg: c.path("slot", k.planOutline(track, Lay.bTop, P, 3)) + c.S(k.cylinder(s(kx), s(sy), s(3.2), Lay.bTop, s(3), P, 16), { className: "fine" }) });
    }
  }
  out.push(c.ordered(items));
  // the socket: a raised collar around a pit with a 3x3 contact field
  out.push(`<g id="${socketId}">${socket(c, Lay, clipId)}</g>`);
  return { svg: out.join(""), anchors: { face: c.at([B.x + s(34), yMax, Lay.zB + s(9)]), socket: c.at([0, 0, Lay.collarTop]), port: [xMax, -s(36), Lay.zB + s(9)] } };
}

function socket(c, Lay, clipId) {
  const { s, P } = { s: Lay.s, P: c.P };
  const col = { x: -s(36), y: -s(36), w: s(72), d: s(72), r: s(3) };
  const top = Lay.collarTop;
  const fl = Lay.pitFloor;
  const h = s(28);
  const Pt = (x, y, z) => c.at([x, y, z]);
  const poly = (pts) => k.pathOf(pts, true);
  const hole = poly([Pt(-h, -h, top), Pt(h, -h, top), Pt(h, h, top), Pt(-h, h, top)]);
  const wallX = poly([Pt(-h, -h, top), Pt(-h, h, top), Pt(-h, h, fl), Pt(-h, -h, fl)]);
  const wallY = poly([Pt(-h, -h, top), Pt(h, -h, top), Pt(h, -h, fl), Pt(-h, -h, fl)]);
  const floor = poly([Pt(-h, -h, fl), Pt(h, -h, fl), Pt(h, h, fl), Pt(-h, h, fl)]);
  let out = c.S(k.slabOf(col, Lay.bTop, Lay.collarH, P, 3), { inner: "" });
  out += `<clipPath id="${clipId}"><path d="${hole}"/></clipPath>`;
  let inner = c.path("pit-1", wallX) + c.path("pit-2", wallY) + c.path("pit-f", floor);
  // contact field: 3x3 rings with a centre dot, one key notch on the floor
  const pins = [];
  for (const px of [-14, 0, 14]) {
    for (const py of [-14, 0, 14]) {
      const cx = s(px);
      const cy = s(py);
      pins.push({ at: [cx, cy, fl], svg: `<path class="pin" d="${k.ring(cx, cy, s(3.4), fl, P, 14)}"/><circle class="pin-dot" cx="${c.at([cx, cy, fl])[0].toFixed(1)}" cy="${c.at([cx, cy, fl])[1].toFixed(1)}" r="${(s(1) * 1.4).toFixed(1)}"/>` });
    }
  }
  inner += c.ordered(pins);
  inner += `<path d="${k.onTop([[-h + s(2), -s(24)], [-h + s(2), -s(20)], [-h + s(7), -s(20)], [-h + s(7), -s(24)]], fl, P, true)}" class="pin"/>`;
  out += `<g clip-path="url(#${clipId})">${inner}</g>`;
  out += `<path class="pit-edge" d="${hole}"/>`;
  return out;
}

// ---------- part C: the AI module (the only blue) ----------
export function partC(c, Lay, { rich = true, z0 = Lay.zC } = {}) {
  const { s, u, Cp } = Lay;
  const P = c.P;
  const out = [];
  const top = z0 + Lay.cBody;
  const xMax = Cp.x + Cp.w;
  const yMax = Cp.y + Cp.d;
  out.push(c.S(k.slabOf(Cp, z0, Lay.cBody, P, 3), { inner: c.L(k.sideSeam(Cp, z0 + s(6), P, 3), { tone: "faint" }) }));
  // edge connector fingers on the long face
  for (let i = -3; i <= 3; i++) out.push(c.path("slot", c.faceY(yMax, s(i * 6) - s(1.4), s(i * 6) + s(1.4), z0 + s(1.2), z0 + s(4.4))));
  // vents on the long face
  for (const vx of [-14, 0, 14]) out.push(c.path("slot", c.faceY(yMax, s(vx) - s(2.4), s(vx) + s(2.4), z0 + s(10), z0 + s(20))));
  // status LEDs and a label window on the short face
  out.push(c.path("slot", c.faceX(xMax, -s(16), s(16), z0 + s(10), z0 + s(19))));
  out.push(c.Dt([-10, 0, 10].map((y) => c.at([xMax, s(y), z0 + s(14.5)])), { size: 1.6 }));
  // corner bolts on the body top
  const items = [];
  for (const [x, y] of k.corners(Cp, s(4.2))) items.push({ at: [x, y, top], svg: bolt(c, [x, y], top, Math.max(2, 2.5 * u)) });
  // raised plate with two dies and traces
  const plate = k.insetPlan(Cp, s(8));
  out.push(c.ordered(items));
  out.push(c.S(k.slabOf(plate, top, Lay.cPlate, P, 3)));
  const pt = top + Lay.cPlate;
  const traces = [];
  for (const dyy of [-11, 11]) {
    const cy = s(dyy);
    const dieW = s(14);
    const dieD = s(8);
    for (const tx of [-9, -3, 3, 9]) {
      const sgn = Math.sign(dyy);
      traces.push(k.lineOnTop([s(tx), cy + sgn * dieD / 2], [s(tx), sgn * (plate.d / 2)], pt, P));
    }
  }
  out.push(c.L(traces.join(""), { tone: "lo" }));
  for (const dyy of [-11, 11]) {
    const die = { x: -s(7), y: s(dyy) - s(4), w: s(14), d: s(8), r: s(1) };
    out.push(c.S(k.slabOf(die, pt, s(2), P, 2), { className: "fine" }));
  }
  if (rich) {
    // lifting handle: two posts and a bar
    const ph = s(7);
    for (const px of [-10, 10]) out.push(c.S(k.cylinder(s(px), 0, Math.max(1.8, 2.2 * u), pt, ph, P, 12), { className: "fine" }));
    out.push(c.S(k.slabOf({ x: -s(14), y: -s(3), w: s(28), d: s(6), r: s(1.5) }, pt + ph, s(4), P, 3), { className: "fine" }));
  }
  return { svg: out.join(""), anchors: { face: c.at([xMax, s(-6), z0 + s(14)]), base: c.at([0, 0, z0]), top: c.at([0, 0, z0 + Lay.cBody + Lay.cPlate + s(11)]) } };
}

// ---------- part D: the automation drive (gear pair + signal cable) ----------
export function partD(c, Lay, { rich = true, cable = true, cableWidth = 9, plugs = true, bow = 0.55 } = {}) {
  const { s, u, A, B } = Lay;
  const P = c.P;
  const out = [];
  const z = Lay.aTop;
  const gh = s(5);
  // gear pair on the short strip of A, meshing along y
  // the strip between B and the edge of A's tier; the pair meshes along x
  const sx0 = B.x + B.w + s(4);
  const sx1 = A.x + A.w - s(7) - s(2);
  const W = sx1 - sx0;
  const r1 = Math.min(s(22), W * 0.28);
  const r2 = r1 * 0.55;
  const gy = s(8);
  const g1 = { x: sx0 + r1, y: gy, rTip: r1, rRoot: r1 * 0.8, n: 12 };
  const g2 = { x: g1.x + r1 + r2 - r1 * 0.1, y: gy, rTip: r2, rRoot: r2 * 0.7, n: 7 };
  const toward = 0;
  const gears = [];
  const mk = (g, phase, holes) => {
    let svg = c.S(k.extrude(gearRing(g.x, g.y, g.rTip, g.rRoot, g.n, phase), z, gh, P, { convex: false }), { className: "fine" });
    svg += c.L(k.ring(g.x, g.y, g.rRoot * 0.78, z + gh, P, 28), { tone: "faint" });
    if (holes) {
      for (let i = 0; i < 3; i++) {
        const a = phase + (i * 2 * Math.PI) / 3 + Math.PI / 6;
        svg += c.path("slot", k.ring(g.x + Math.cos(a) * g.rRoot * 0.52, g.y + Math.sin(a) * g.rRoot * 0.52, g.rRoot * 0.17, z + gh, P, 12));
      }
    }
    svg += c.S(k.cylinder(g.x, g.y, g.rRoot * 0.3, z + gh, s(2.4), P, 14), { className: "fine" });
    svg += c.Dt([c.at([g.x, g.y, z + gh + s(2.4)])], { size: 1.2 });
    return svg;
  };
  gears.push({ at: [g1.x, g1.y, z], svg: mk(g1, toward, true) });
  gears.push({ at: [g2.x, g2.y, z], svg: mk(g2, toward + Math.PI + Math.PI / g2.n, false) });
  out.push(c.ordered(gears));
  // connector plates on A and B, and the cable between them
  const plateA = { x: A.x + A.w, y: -s(62), w: s(7), d: s(22), r: s(1) };
  const zA = s(5);
  const plateB = { x: B.x + B.w, y: -s(44), w: s(7), d: s(18), r: s(1) };
  const zBp = Lay.zB + s(3);
  if (plugs) {
    out.push(c.ink(c.S(k.slabOf(plateA, zA, s(11), P, 2), { className: "fine" })));
    out.push(c.ink(c.S(k.slabOf(plateB, zBp, s(11), P, 2), { className: "fine" })));
  }
  const pA = c.at([plateA.x + plateA.w, plateA.y + plateA.d / 2, zA + s(5.5)]);
  const pB = c.at([plateB.x + plateB.w, plateB.y + plateB.d / 2, zBp + s(5.5)]);
  if (cable) {
    const dist = Math.hypot(pB[0] - pA[0], pB[1] - pA[1]);
    const len = dist * bow;
    const dir = [Math.SQRT1_2, Math.SQRT1_2 * 0.5].map((v) => v / Math.hypot(Math.SQRT1_2, Math.SQRT1_2 * 0.5));
    const c0 = [pA[0] + dir[0] * len, pA[1] + dir[1] * len];
    const c1 = [pB[0] + dir[0] * len, pB[1] + dir[1] * len];
    const d = `M${pA[0].toFixed(1)} ${pA[1].toFixed(1)}C${c0[0].toFixed(1)} ${c0[1].toFixed(1)} ${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${pB[0].toFixed(1)} ${pB[1].toFixed(1)}`;
    out.push(`<path class="cable-o" stroke-width="${cableWidth}" d="${d}"/><path class="cable-i" stroke-width="${cableWidth - 5}" d="${d}"/><path class="cable-f" stroke-width="2.2" stroke-dasharray="2 8" d="${d}"/>`);
  }
  return { svg: out.join(""), anchors: { gear: c.at([g1.x, g1.y, z + gh + s(2.4)]), gearWorld: [g1.x, g1.y, g1.rTip], cable: pA }, points: [[plateA.x + plateA.w + s(34), plateA.y, zA], [plateB.x + plateB.w + s(34), plateB.y, zBp + s(14)]] };
}
