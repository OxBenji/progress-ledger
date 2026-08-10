import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const files = [
  "medallion-base.svg",
  "milestone-verified-contributor.svg",
  "milestone-top-verifier.svg",
];

const artworkFiles = [
  "medallion-base-art.png",
  "milestone-verified-contributor-art.png",
  "milestone-top-verifier-art.png",
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

test("milestone cards use real PNG artwork assets", async () => {
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");

  for (const file of artworkFiles) {
    const png = await readFile(new URL(`../public/milestones/${file}`, import.meta.url));

    assert.match(page, new RegExp(file.replaceAll(".", "\\.")));
    assert.equal(png.subarray(0, 8).toString("hex"), "89504e470d0a1a0a");
    assert.ok(png.length > 1_000_000, `${file} should be high-resolution milestone art`);
  }
});
