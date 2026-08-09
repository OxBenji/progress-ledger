import assert from "node:assert/strict";
import test from "node:test";
import {
  renderReceiptNftDataUri,
  renderReceiptNftSvg,
} from "../lib/receipt-nft-image.mjs";

test("renders a static square SVG receipt NFT image", () => {
  const svg = renderReceiptNftSvg({
    receipt_id: "POP-9999",
    task_type: "Escaping test",
    artifact: "Agent proof <must> escape & still wrap",
    check: "unit test",
    verifier: "reviewer@example.test",
    hash: "sha256:abc123",
    status: "Proven",
  });

  assert.match(svg, /^<svg /);
  assert.match(svg, /width="1000"/);
  assert.match(svg, /height="1000"/);
  assert.match(svg, /viewBox="0 0 1000 1000"/);
  assert.match(svg, /POP-9999/);
  assert.match(svg, /PROOF COMPLETE/);
  assert.match(svg, /NON-TRANSFERABLE/);
  assert.match(svg, /SBT/);
  assert.match(svg, /Proof of Progress/);
  assert.match(svg, /Agent proof &lt;must&gt;/);
  assert.doesNotMatch(svg, /<must>/);
  assert.doesNotMatch(svg, /<image\b|@import|url\((?:http|https)/);
});

test("renders an SVG data URI for mint metadata", () => {
  const uri = renderReceiptNftDataUri({
    receipt_id: "POP-1000",
    task_type: "Math proof",
    artifact: "Short lemma",
    check: "kernel clean",
    verifier: "math reviewer",
    hash: "sha256:abc123",
    status: "Proven",
  });

  assert.match(uri, /^data:image\/svg\+xml;charset=utf-8,/);
  assert.ok(uri.includes("POP-1000"));
  assert.ok(uri.includes("PROOF%20COMPLETE"));
});
