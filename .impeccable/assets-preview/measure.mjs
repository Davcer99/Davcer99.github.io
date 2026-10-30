// Measures the ink bounds (strokes included) of the illustration SVGs by rasterising each one in
// headless Chrome and scanning the alpha channel. Dev-only: needs the anatomy-asset scripts.
//   node measure.mjs <dir-with-svgs> <out.json> [file ...]
// Each result is in the SVG's own viewBox units: { x, y, w, h, vb: [w, h] }.
import { spawnSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const DRIVE = "C:/Users/David/.agents/skills/anatomy-asset/scripts/drive.mjs";
const [dir, outFile, ...names] = process.argv.slice(2);
const files = names.length ? names : ["hero-assembly.svg", "step-1.svg", "step-2.svg", "step-3.svg", "step-4.svg", "step-5.svg"];
const SCALE = 4;

const shots = join(HERE, "shots");
mkdirSync(shots, { recursive: true });
const data = {};
for (const f of files) data[f] = Buffer.from(readFileSync(resolve(dir, f), "utf8")).toString("base64");

const page = `<!doctype html><meta charset="utf-8"><body><script>
window.measure = (data, scale) => Promise.all(Object.entries(data).map(([name, b64]) => new Promise((done) => {
  const img = new Image();
  img.onload = () => {
    const svg = atob(b64);
    const m = svg.match(/viewBox="([\\d.\\- ]+)"/)[1].split(" ").map(Number);
    const w = Math.round(m[2] * scale), h = Math.round(m[3] * scale);
    const c = document.createElement("canvas"); c.width = w; c.height = h;
    const g = c.getContext("2d"); g.drawImage(img, 0, 0, w, h);
    const px = g.getImageData(0, 0, w, h).data;
    let x0 = w, y0 = h, x1 = -1, y1 = -1;
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) if (px[(y * w + x) * 4 + 3] > 24) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
    done([name, { x: x0 / scale, y: y0 / scale, w: (x1 + 1 - x0) / scale, h: (y1 + 1 - y0) / scale, vb: [m[2], m[3]] }]);
  };
  img.src = "data:image/svg+xml;base64," + b64;
}))).then(Object.fromEntries);
</script></body>`;
writeFileSync(join(shots, "measure.html"), page);
writeFileSync(join(shots, "measure-actions.json"), JSON.stringify([["eval", `window.measure(${JSON.stringify(data)}, ${SCALE})`]]));

const run = spawnSync(process.execPath, [DRIVE, join(shots, "measure.html"), "--actions", join(shots, "measure-actions.json")], { encoding: "utf8", maxBuffer: 1 << 28 });
const line = (run.stdout || "").split("\n").find((l) => l.startsWith("eval:"));
if (!line) { console.error(run.stdout, run.stderr); process.exit(1); }
const result = JSON.parse(line.slice(5));
writeFileSync(outFile, JSON.stringify(result, null, 1));
for (const [n, b] of Object.entries(result)) console.log(n.padEnd(18), JSON.stringify(b));
