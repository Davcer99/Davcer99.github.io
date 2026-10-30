// Checks the static build output for the bilingual landing (specs S3, S5, S7, S10).
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, existsSync } from "node:fs";

const EMAIL = "davidbalaguercervera@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/david-balaguer-cervera/";

const pages = {
  es: { file: "dist/index.html", path: "/" },
  en: { file: "dist/en/index.html", path: "/en/" },
};

function read(locale) {
  const { file } = pages[locale];
  assert.ok(existsSync(file), `${file} should exist in the static build`);
  return readFileSync(file, "utf8");
}

function sectionIds(html) {
  return [...html.matchAll(/<section[^>]*\sid="([^"]+)"/g)].map((m) => m[1]);
}

for (const [locale, other] of [["es", "en"], ["en", "es"]]) {
  test(`${locale}: declares <html lang="${locale}">`, () => {
    assert.match(read(locale), new RegExp(`<html[^>]*\\slang="${locale}"`));
  });

  test(`${locale}: primary action is a mailto to ${EMAIL}`, () => {
    assert.ok(read(locale).includes(`href="mailto:${EMAIL}"`));
  });

  test(`${locale}: links to the LinkedIn profile`, () => {
    assert.ok(read(locale).includes(`href="${LINKEDIN}"`));
  });

  test(`${locale}: offers a language switch to ${other}`, () => {
    const html = read(locale);
    const target = pages[other].path;
    assert.match(html, new RegExp(`<a[^>]*href="${target}"[^>]*hreflang="${other}"`));
  });

  test(`${locale}: declares hreflang alternates for both locales`, () => {
    const html = read(locale);
    for (const l of ["es", "en"]) {
      assert.match(html, new RegExp(`<link[^>]*rel="alternate"[^>]*hreflang="${l}"`));
    }
  });
}

test("both locales render the same section set", () => {
  const es = sectionIds(read("es"));
  const en = sectionIds(read("en"));
  assert.ok(es.length >= 3, `expected at least 3 sections, got ${es.length}`);
  assert.deepEqual(en, es);
});

// Assembly-manual landing rules (task T4).
function sliceSection(html, id) {
  const match = html.match(new RegExp(`<section[^>]*\\sid="${id}"[\\s\\S]*?</section>`));
  assert.ok(match, `section #${id} should exist`);
  return match[0];
}

for (const locale of ["es", "en"]) {
  test(`${locale}: parts list exposes parts A-D`, () => {
    const html = read(locale);
    for (const letter of ["A", "B", "C", "D"]) {
      assert.match(html, new RegExp(`data-part="${letter}"`), `part ${letter} should be listed`);
    }
  });

  test(`${locale}: #contact contains the mailto link`, () => {
    assert.ok(sliceSection(read(locale), "contact").includes(`href="mailto:${EMAIL}"`));
  });

  test(`${locale}: loads no Google Fonts resources`, () => {
    const html = read(locale);
    assert.ok(!html.includes("fonts.googleapis.com"));
    assert.ok(!html.includes("fonts.gstatic.com"));
  });

  test(`${locale}: renders the 5 process steps`, () => {
    const process = sliceSection(read(locale), "process");
    const steps = [...process.matchAll(/data-step="(\d)"/g)].map((m) => m[1]);
    assert.deepEqual(steps, ["1", "2", "3", "4", "5"]);
  });
}

// Motion rules (task T6, specs S1 and S9): the script ships bundled, content is never hidden without JS,
// and the hero drawing exposes the hooks the timeline targets.
for (const locale of ["es", "en"]) {
  test(`${locale}: loads a bundled module script for the motion`, () => {
    const html = read(locale);
    const srcs = [...html.matchAll(/<script[^>]*\stype="module"[^>]*\ssrc="([^"]+\.js)"/g)].map((m) => m[1]);
    assert.ok(srcs.length > 0, "expected an external module script in the built HTML");
    const bundles = srcs.map((src) => {
      const file = `dist${src}`;
      assert.ok(existsSync(file), `${file} should be emitted by the build`);
      return readFileSync(file, "utf8");
    });
    // Following the static imports keeps the check valid when the bundler splits GSAP into a shared chunk.
    const emitted = readdirSync("dist/_astro").filter((f) => f.endsWith(".js"));
    const all = bundles.join("\n") + emitted.map((f) => readFileSync(`dist/_astro/${f}`, "utf8")).join("\n");
    assert.match(all, /prefers-reduced-motion/, "the bundle should gate motion on prefers-reduced-motion");
    assert.match(all, /ScrollTrigger/, "the bundle should register ScrollTrigger");
  });

  test(`${locale}: hides no content from the static HTML`, () => {
    const html = read(locale);
    const hiding = /opacity:\s*0(?![.\d])|visibility:\s*hidden/i;
    const inlineStyles = [...html.matchAll(/\sstyle="([^"]*)"/g)].map((m) => m[1]);
    const styleBlocks = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map((m) => m[1]);
    for (const css of [...inlineStyles, ...styleBlocks]) {
      assert.ok(!hiding.test(css), `static HTML must not hide content without JS: ${css.match(hiding)?.[0]}`);
    }
  });

  test(`${locale}: inlines the hero drawing with the motion hooks`, () => {
    const html = read(locale);
    for (const id of ["part-a", "part-b", "part-c", "part-d", "arrow-c", "socket-b"]) {
      assert.match(html, new RegExp(`\\sid="${id}"`), `#${id} should be inline in the hero drawing`);
    }
    const process = sliceSection(html, "process");
    assert.match(process, /class="part part-c"/, "a process step should expose its .part-c group");
  });
}

test("both locales declare an SVG favicon that ships in the build", () => {
  for (const locale of ["es", "en"]) {
    assert.match(read(locale), /<link[^>]*rel="icon"[^>]*href="\/favicon\.svg"/);
  }
  assert.ok(existsSync("dist/favicon.svg"), "dist/favicon.svg should exist");
});

const heroLabels = {
  es: { A: "Backend", B: "Frontend", C: "Integración IA", D: "Automatización" },
  en: { A: "Backend", B: "Frontend", C: "AI integration", D: "Automation" },
};

for (const locale of ["es", "en"]) {
  test(`${locale}: the hero drawing names each part next to its letter`, () => {
    const intro = sliceSection(read(locale), "intro");
    for (const [letter, name] of Object.entries(heroLabels[locale])) {
      assert.match(intro, new RegExp(`<span[^>]*data-callout="${letter}"[^>]*>${name}</span>`));
    }
  });

  test(`${locale}: the hero figure frame matches the cropped drawing ratio`, () => {
    assert.match(sliceSection(read(locale), "intro"), /--ratio: 637\.3 \/ 548\.8/);
  });
}
