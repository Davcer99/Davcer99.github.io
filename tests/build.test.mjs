// Checks the static build output for the bilingual landing (specs S3, S5, S7, S10).
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";

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
