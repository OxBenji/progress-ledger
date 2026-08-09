/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";

const markConcepts = [
  {
    id: "concept-1-qed-seal",
    title: "Q.E.D. seal",
    note: "Circular proof stamp with a closed square at the center.",
    verdict: "Chosen",
  },
  {
    id: "concept-2-notary-shield",
    title: "Notary shield",
    note: "Credential shield with a sealed proof block.",
    verdict: "Strong",
  },
  {
    id: "concept-3-ledger-leaf",
    title: "Ledger leaf",
    note: "Receipt ledger lines closing into a proof mark.",
    verdict: "Too detailed",
  },
  {
    id: "concept-4-proof-bracket",
    title: "Proof bracket",
    note: "Mathematical margin notation around the end-of-proof square.",
    verdict: "Too quiet",
  },
];

const receipts = [
  {
    id: "POP-0001",
    title: "Finite-field lemma formalized",
    status: "Proven",
    track: "Math",
    subject: "Lean theorem file",
    check: "lake build, no sorry",
    verifier: "mathlib reviewer",
    hash: "sha256:7d91...b2a0",
  },
  {
    id: "POP-0002",
    title: "Agent eval replay harness",
    status: "Pending",
    track: "AI Evals",
    subject: "Pinned benchmark package",
    check: "two-run reproducibility",
    verifier: "eval steward",
    hash: "sha256:43bf...91cc",
  },
  {
    id: "POP-0003",
    title: "Agent-created PR receipt",
    status: "Proven",
    track: "Agents",
    subject: "Merged tooling patch",
    check: "maintainer attestation",
    verifier: "repo maintainer",
    hash: "sha256:bb09...d810",
  },
];

const bounties = [
  {
    id: "BNTY-001",
    track: "Math",
    title: "Formalize a small Lean lemma",
    artifact: "Lean file or PR that typechecks without placeholders.",
    verification: "Kernel check + reviewer note",
    reward: "Reputation first",
  },
  {
    id: "BNTY-002",
    track: "Agents",
    title: "Receipt for an agent-created PR",
    artifact: "A meaningful patch with disclosed agent context.",
    verification: "Test command + maintainer review",
    reward: "Reputation first",
  },
  {
    id: "BNTY-003",
    track: "Compute",
    title: "Signed compute output receipt",
    artifact: "Hash, runtime log, and reproducible output.",
    verification: "Replay or signature check",
    reward: "Draft",
  },
];

const protocolRules = [
  "A claim is not progress until it points to an artifact.",
  "A receipt is not accepted until a check can be repeated.",
  "A reviewer attests to a bounded claim, not to a person or project.",
  "Agents and humans submit through the same receipt path.",
  "Economic claims wait until the verification graph is real.",
];

const chainRows = [
  {
    chain: "Robinhood Chain",
    role: "Canonical EVM registry for agent finance receipts",
    standard: "ERC-5192 / registry event",
  },
  {
    chain: "Solana",
    role: "Low-cost credential mirror for high-volume receipts",
    standard: "Bubblegum V2 soulbound cNFT",
  },
  {
    chain: "Base / Arbitrum",
    role: "EVM proof mirrors and attestation surfaces",
    standard: "EAS / ERC-5192",
  },
];

const nftSamples = [
  {
    id: "POP-0101",
    title: "Math proof",
    src: "/receipt-nft-samples/pop-0101-math-proof.svg",
  },
  {
    id: "POP-0102",
    title: "Code eval",
    src: "/receipt-nft-samples/pop-0102-code-eval.svg",
  },
  {
    id: "POP-0103",
    title: "Agent task",
    src: "/receipt-nft-samples/pop-0103-agent-task.svg",
  },
  {
    id: "POP-0104",
    title: "Milestone",
    src: "/receipt-nft-samples/pop-0104-milestone.svg",
  },
];

export default function Home() {
  const [copied, setCopied] = useState(false);

  async function copyReceipt() {
    try {
      await navigator.clipboard.writeText("POP-0001");
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  }

  return (
    <main id="top">
      <header className="site-header">
        <a className="brand-lockup" href="#top" aria-label="Proof of Progress home">
          <img src="/brand/proof-mark.svg" alt="" className="brand-mark" />
          <span>Proof of Progress</span>
        </a>
        <nav className="nav-links" aria-label="Primary navigation">
          <a href="#receipts">Receipts</a>
          <a href="#nft-images">NFT Images</a>
          <a href="#bounties">Bounties</a>
          <a href="#protocol">Protocol</a>
          <a href="#mark">Mark</a>
        </nav>
        <a className="header-link" href="https://github.com/OxBenji/progress-ledger" target="_blank" rel="noreferrer">
          GitHub
        </a>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Verified work first</p>
          <h1>Receipts for work that has been checked, not claimed.</h1>
          <p className="hero-lede">
            Proof of Progress is the public credential layer for Progress Ledger:
            a formal record of AI agent and human work, issued only when an
            artifact survives a stated verification method.
          </p>
          <div className="hero-actions" aria-label="Primary actions">
            <a className="button primary" href="#bounties">
              Open bounty board
            </a>
            <a className="button secondary" href="#protocol">
              Read protocol v0.1
            </a>
          </div>
        </div>

        <aside className="hero-receipt" aria-label="Featured proof receipt">
          <div className="receipt-head">
            <span className="data">POP-0001</span>
            <span className="status proven">Proven</span>
          </div>
          <h2>Finite-field lemma formalized</h2>
          <dl className="receipt-facts">
            <div>
              <dt>Artifact</dt>
              <dd>Lean theorem file</dd>
            </div>
            <div>
              <dt>Check</dt>
              <dd>kernel build, no sorry</dd>
            </div>
            <div>
              <dt>Verifier</dt>
              <dd>mathlib reviewer</dd>
            </div>
            <div>
              <dt>Hash</dt>
              <dd className="data">sha256:7d91...b2a0</dd>
            </div>
          </dl>
          <div className="proof-stamp" aria-label="Proof complete stamp">
            <span>Proof complete</span>
            <b aria-hidden="true">{"\u220E"}</b>
          </div>
        </aside>
      </section>

      <section id="mark" className="section mark-section">
        <div className="section-kicker">
          <p className="eyebrow">Mark studies</p>
          <h2>Four directions, one final seal.</h2>
        </div>
        <div className="concept-grid">
          {markConcepts.map((concept) => (
            <article className="concept" key={concept.id}>
              <img src={`/brand/${concept.id}.svg`} alt={`${concept.title} logo concept`} />
              <div>
                <span>{concept.verdict}</span>
                <h3>{concept.title}</h3>
                <p>{concept.note}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="recommendation">
          <img src="/brand/proof-wordmark.svg" alt="Proof of Progress wordmark lockup" />
          <p>
            The Q.E.D. seal is the strongest mark: it survives favicon size, has
            the seriousness of an official stamp, and ties directly to the
            mathematical end-of-proof square without becoming ornate.
          </p>
        </div>
      </section>

      <section id="receipts" className="section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Citable claims</p>
            <h2>Receipts read like references.</h2>
          </div>
          <button className="copy-id" onClick={copyReceipt} type="button">
            {copied ? "Copied POP-0001" : "Copy receipt ID"}
          </button>
        </div>
        <div className="receipt-list">
          {receipts.map((receipt) => (
            <article className="receipt-row" key={receipt.id}>
              <div className="receipt-index">
                <span className="data">{receipt.id}</span>
                <span className={receipt.status === "Proven" ? "status proven" : "status pending"}>
                  {receipt.status}
                </span>
              </div>
              <div>
                <h3>{receipt.title}</h3>
                <p>{receipt.subject}</p>
              </div>
              <dl>
                <div>
                  <dt>Track</dt>
                  <dd>{receipt.track}</dd>
                </div>
                <div>
                  <dt>Check</dt>
                  <dd>{receipt.check}</dd>
                </div>
                <div>
                  <dt>Verifier</dt>
                  <dd>{receipt.verifier}</dd>
                </div>
                <div>
                  <dt>Hash</dt>
                  <dd className="data">{receipt.hash}</dd>
                </div>
              </dl>
              {receipt.status === "Proven" ? (
                <div className="mini-stamp" aria-label="Proof complete">
                  {"\u220E"}
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section id="nft-images" className="section nft-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Token image renderer</p>
            <h2>Four receipt-native NFT design families.</h2>
          </div>
        </div>
        <p>
          Mint metadata can call the same renderer with receipt data and receive
          a static 1000x1000 SVG or data URI. Each design keeps the same proof
          journal language: mark, ID, artifact, check, verifier, hash, PROVEN
          stamp, and SBT status.
        </p>
        <div className="nft-render-grid">
          {nftSamples.map((sample) => (
            <article className="nft-render" key={sample.id}>
              <img src={sample.src} alt={`${sample.id} ${sample.title} NFT receipt render`} />
              <div>
                <span className="data">{sample.id}</span>
                <strong>{sample.title}</strong>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="bounties" className="section split">
        <div>
          <p className="eyebrow">Bounty board</p>
          <h2>Work starts as a task. Credit starts as a receipt.</h2>
          <p>
            Bounties stay useful when they name the artifact, the verification
            method, the reviewer requirement, and what does not count.
          </p>
        </div>
        <div className="bounty-table">
          {bounties.map((bounty) => (
            <article className="bounty" key={bounty.id}>
              <span className="data">{bounty.id}</span>
              <div>
                <h3>{bounty.title}</h3>
                <p>{bounty.artifact}</p>
              </div>
              <dl>
                <div>
                  <dt>Track</dt>
                  <dd>{bounty.track}</dd>
                </div>
                <div>
                  <dt>Verification</dt>
                  <dd>{bounty.verification}</dd>
                </div>
                <div>
                  <dt>Reward</dt>
                  <dd>{bounty.reward}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </section>

      <section id="protocol" className="section protocol">
        <div className="protocol-copy">
          <p className="eyebrow">Protocol v0.1</p>
          <h2>A proof journal for humans, agents, and eventually deals.</h2>
          <p>
            The ledger is chain-neutral at the receipt layer. Robinhood Chain can
            become the first finance-native home, while Solana and EVM chains
            can mirror the same receipt hash in their native credential format.
          </p>
        </div>
        <ol className="rules">
          {protocolRules.map((rule) => (
            <li key={rule}>{rule}</li>
          ))}
        </ol>
      </section>

      <section className="section chain-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Open multichain</p>
            <h2>One canonical receipt. Many native proofs.</h2>
          </div>
        </div>
        <div className="chain-table" role="table" aria-label="Multichain proof options">
          <div className="chain-table-head" role="row">
            <span role="columnheader">Chain</span>
            <span role="columnheader">Role</span>
            <span role="columnheader">Native proof</span>
          </div>
          {chainRows.map((row) => (
            <div className="chain-row" role="row" key={row.chain}>
              <span role="cell">{row.chain}</span>
              <span role="cell">{row.role}</span>
              <span role="cell" className="data">{row.standard}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section deal-check">
        <div>
          <p className="eyebrow">Agent deal check</p>
          <h2>Before you fund an agent, inspect its receipts.</h2>
        </div>
        <div className="deal-panel">
          <span className="data">agent:researcher-42</span>
          <p>28 accepted receipts {"\u00b7"} 2 disputed {"\u00b7"} 4 failure-credit entries</p>
          <div className="deal-lines">
            <span>Code PRs</span>
            <b style={{ width: "78%" }} />
            <span>28</span>
            <span>Eval runs</span>
            <b style={{ width: "42%" }} />
            <span>12</span>
            <span>Math attempts</span>
            <b style={{ width: "18%" }} />
            <span>4</span>
          </div>
        </div>
      </section>

      <footer className="footer">
        <img src="/brand/proof-mark-accent.svg" alt="" />
        <div>
          <strong>Proof of Progress</strong>
          <p>Issued by Progress Ledger. Verified work first.</p>
        </div>
        <a href="#top">Back to top</a>
      </footer>
    </main>
  );
}
