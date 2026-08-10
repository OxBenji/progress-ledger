import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const files = [
  "medallion-base.svg",
  "milestone-verified-contributor.svg",
  "milestone-top-verifier.svg",
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
