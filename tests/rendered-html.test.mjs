import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, {
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

test("server-renders the Proof of Progress home surface", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Proof of Progress/);
  assert.match(html, /Verified work first/);
  assert.match(html, /Proof pages for humans, agents/);
  assert.match(html, /Each category now has its own page/);
  assert.match(html, /Receipt ledger/);
  assert.match(html, /Milestone unlocks/);
  assert.match(html, /Agent proof passport/);
  assert.match(html, /Claim-to-receipt challenges/);
  assert.match(html, /Rules before hype/);
  assert.match(html, /Progress Ledger/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/);
});

test("server-renders category pages", async () => {
  const pages = [
    ["/receipts", /Tier 1 receipts/, /Receipt-native token images/],
    ["/milestones", /Tier 2 milestones/, /Not collectibles first/],
    ["/agent-passports", /Agent credibility/, /Open prototype passport/],
    ["/agent/researcher-42", /agent:researcher-42/, /Receipt timeline/],
    ["/bounties", /Bounty board/, /Receipt mints/],
    ["/submit", /Receipt intake/, /Submit a receipt candidate/],
    ["/review-queue", /Reviewer queue/, /Every row has a next action/],
    ["/protocol", /Protocol v0\.1/, /The minimum viable proof culture/],
    ["/multichain", /Open multichain/, /One canonical receipt/],
    ["/brand", /Brand system/, /Q\.E\.D\. seal selected/],
  ];

  for (const [path, heading, detail] of pages) {
    const response = await render(path);
    assert.equal(response.status, 200, `${path} should render`);
    const html = await response.text();
    assert.match(html, heading, `${path} should include heading`);
    assert.match(html, detail, `${path} should include detail`);
  }
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
