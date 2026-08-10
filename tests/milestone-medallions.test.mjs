import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const files = [
  "medallion-base.svg",
  "milestone-verified-contributor.svg",
  "milestone-top-verifier.svg",
];

const artworkFiles = [
  "medallion-base-art-v2-preview.jpg",
  "milestone-verified-contributor-art-v2-preview.jpg",
  "milestone-top-verifier-art-v2-preview.jpg",
];

const fullArtworkFiles = [
  "medallion-base-art-v2.png",
  "milestone-verified-contributor-art-v2.png",
  "milestone-top-verifier-art-v2.png",
];

test("milestone medallions are text-free flat SVGs", async () => {
  for (const file of files) {
    const svg = await readFile(new URL(`../public/milestones/${file}`, import.meta.url), "utf8");

    assert.match(svg, /viewBox="0 0 1000 1000"/);
    assert.match(svg, /#FAFAF8/);
    assert.match(svg, /#111110/);
    assert.match(svg, /#8B1E1E/);
    assert.doesNotMatch(svg, /<text\b/i);
    assert.doesNotMatch(svg, /linearGradient|radialGradient|filter|feGaussianBlur|box-shadow/i);
  }
});

test("milestone cards use lightweight previews backed by full PNG artwork", async () => {
  const page = await readFile(new URL("../app/content.ts", import.meta.url), "utf8");

  for (const file of artworkFiles) {
    const jpg = await readFile(new URL(`../public/milestones/${file}`, import.meta.url));

    assert.match(page, new RegExp(file.replaceAll(".", "\\.")));
    assert.equal(jpg.subarray(0, 3).toString("hex"), "ffd8ff");
    assert.ok(jpg.length < 250_000, `${file} should be lightweight for page loads`);
  }

  for (const file of fullArtworkFiles) {
    const png = await readFile(new URL(`../public/milestones/${file}`, import.meta.url));

    assert.match(page, new RegExp(file.replaceAll(".", "\\.")));
    assert.equal(png.subarray(0, 8).toString("hex"), "89504e470d0a1a0a");
    assert.ok(png.length > 1_000_000, `${file} should remain full-resolution milestone art`);
  }
});
