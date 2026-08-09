import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Proof of Progress product surface", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Proof of Progress/);
  assert.match(html, /Verified work first/);
  assert.match(html, /Receipts for work that has been checked/);
  assert.match(html, /Open bounty board/);
  assert.match(html, /Read protocol v0\.1/);
  assert.match(html, /Q\.E\.D\. seal/);
  assert.match(html, /Proof complete/);
  assert.match(html, /POP-0001/);
  assert.match(html, /Token image renderer/);
  assert.match(html, /Four receipt-native NFT design families/);
  assert.match(html, /POP-0102/);
  assert.match(html, /POP-0104/);
  assert.match(html, /Bounty board/);
  assert.match(html, /Protocol v0\.1/);
  assert.match(html, /One canonical receipt/);
  assert.match(html, /Agent deal check/);
  assert.match(html, /Progress Ledger/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/);
});

test("removes disposable starter references", async () => {
  const [page, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.doesNotMatch(page, /_sites-preview|SkeletonPreview|codex-preview/);
  assert.doesNotMatch(layout, /Starter Project|codex-preview/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.match(packageJson, /lucide-react/);
});
