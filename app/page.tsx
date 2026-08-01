"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Clipboard,
  ExternalLink,
  GitPullRequest,
  RadioTower,
  ShieldCheck,
  Sparkles,
  Trophy,
  Users,
  Workflow,
} from "lucide-react";

type Track = "Math" | "AI Evals" | "Agents" | "Compute";

type Bounty = {
  id: string;
  track: Track;
  title: string;
  reward: string;
  status: "Open" | "Drafting" | "Reviewer needed";
  difficulty: string;
  due: string;
  verifier: string;
  ask: string;
  signal: string;
};

const tracks: Array<Track | "All"> = ["All", "Math", "AI Evals", "Agents", "Compute"];

const bounties: Bounty[] = [
  {
    id: "lean-finite-field",
    track: "Math",
    title: "Formalize a finite-field lemma in Lean",
    reward: "$750",
    status: "Open",
    difficulty: "Intermediate",
    due: "7 days",
    verifier: "Lean kernel plus mathlib reviewer",
    ask: "Port one target lemma, document imports, and remove all sorry placeholders.",
    signal: "Typechecks cleanly",
  },
  {
    id: "agent-eval-repro",
    track: "AI Evals",
    title: "Reproducible agent benchmark harness",
    reward: "$1,200",
    status: "Drafting",
    difficulty: "Advanced",
    due: "10 days",
    verifier: "Pinned dataset, deterministic runner, reviewer replay",
    ask: "Package a small eval where submitted agents can be scored and replayed.",
    signal: "Runs twice, same score",
  },
  {
    id: "github-pr-gate",
    track: "Agents",
    title: "GitHub PR contribution gate",
    reward: "$500",
    status: "Open",
    difficulty: "Starter",
    due: "5 days",
    verifier: "Merged PR plus maintainer attestation",
    ask: "Define the minimum metadata for an open-source agent-tooling PR to earn reputation.",
    signal: "Merged and reviewed",
  },
  {
    id: "compute-receipts",
    track: "Compute",
    title: "Signed compute receipt prototype",
    reward: "$900",
    status: "Reviewer needed",
    difficulty: "Advanced",
    due: "14 days",
    verifier: "Job hash, runtime log, signed worker receipt",
    ask: "Design the first receipt format for useful compute jobs with replayable outputs.",
    signal: "Receipt verifies",
  },
];

const gates = [
  {
    icon: ShieldCheck,
    label: "Verification",
    title: "No credit without a check",
    body: "Formal proofs typecheck. Evals replay. PRs merge. Compute emits receipts.",
  },
  {
    icon: Users,
    label: "Review",
    title: "Human judgment where needed",
    body: "Reviewers earn trust for good calls and lose it when work fails reproduction.",
  },
  {
    icon: Trophy,
    label: "Rewards",
    title: "Bounties before tokens",
    body: "Cash, reputation, and public credit now. Token design only after useful work exists.",
  },
];

const ledger = [
  {
    item: "Lean proof bounty",
    contributor: "pending",
    proof: "Kernel check",
    state: "Open",
  },
  {
    item: "Eval replay harness",
    contributor: "founding team",
    proof: "Two-run reproducibility",
    state: "Drafting",
  },
  {
    item: "Reviewer charter",
    contributor: "inviting 3-5 reviewers",
    proof: "Public attestation",
    state: "Recruiting",
  },
  {
    item: "Economic paper",
    contributor: "held until traction",
    proof: "Legal review",
    state: "Later",
  },
];

const plan = [
  {
    window: "Days 1-3",
    title: "Public spec",
    body: "Publish the contribution rules, bounty template, reviewer rubric, and anti-casino position.",
  },
  {
    window: "Days 4-10",
    title: "MVP board",
    body: "Ship bounties, submissions, public profiles, review states, and the first ledger entries.",
  },
  {
    window: "Days 11-20",
    title: "Math and eval tracks",
    body: "Integrate Lean targets, reproducible eval tasks, and reviewer attestations.",
  },
  {
    window: "Days 21-30",
    title: "First paid results",
    body: "Award the first bounties, publish postmortems, and recruit the next wave of contributors.",
  },
];

const learning = [
  "Lean/mathlib basics and what a kernel actually verifies",
  "How AI evals get gamed, reproduced, and scored",
  "Public goods funding, quadratic funding, and retroactive rewards",
  "Token danger zones, transfer restrictions, and legal review triggers",
];

const posts = [
  {
    id: "sat-1",
    label: "Tonight",
    title: "Warm the room",
    text:
      "Been thinking a lot about what crypto was supposed to be.\n\nNot endless casino rotation.\n\nA way to coordinate people around hard, useful work that would otherwise be underfunded.",
  },
  {
    id: "sun-1",
    label: "Tomorrow",
    title: "Name the shape",
    text:
      "I do not think the right move is \"launch a token for AGI.\"\n\nThe right move is to build the contribution graph first:\n\nbounties, reviews, reputation, public ledgers, reproducible work.\n\nEconomics should come after reality, not before it.",
  },
  {
    id: "mon-1",
    label: "Monday",
    title: "Main post",
    text:
      "I am going to build the incentive layer I always wanted crypto to become:\n\nverified rewards for open math, theorem proving, AI evals, agent tooling, reproducible research, and useful compute.\n\nNo token first.\n\nBounties, reputation, reviews, public ledger, then economics after real work exists.\n\nCrypto made speculation programmable.\n\nLet's make verified progress programmable.",
  },
];

export default function Home() {
  const [activeTrack, setActiveTrack] = useState<Track | "All">("All");
  const [copiedPost, setCopiedPost] = useState<string | null>(null);

  const visibleBounties = useMemo(
    () =>
      activeTrack === "All"
        ? bounties
        : bounties.filter((bounty) => bounty.track === activeTrack),
    [activeTrack],
  );

  async function copyPost(id: string, text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedPost(id);
      window.setTimeout(() => setCopiedPost(null), 1400);
    } catch {
      setCopiedPost(null);
    }
  }

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Proof of Progress home">
          <span className="brand-mark">P</span>
          <span>Proof of Progress</span>
        </a>
        <nav className="nav-links" aria-label="Primary navigation">
          <a href="#bounties">Bounties</a>
          <a href="#protocol">Protocol</a>
          <a href="#launch">X Kit</a>
        </nav>
        <a className="header-action" href="https://github.com/lalalune/ArkLib" target="_blank" rel="noreferrer">
          GitHub <ExternalLink aria-hidden="true" size={15} />
        </a>
      </header>

      <section id="top" className="hero-shell">
        <div className="hero-copy">
          <p className="eyebrow">No token first. Verified work first.</p>
          <h1>Make verified progress programmable.</h1>
          <p className="hero-lede">
            A contribution network for open math, theorem proving, AI evals, agent tooling,
            reproducible research, and useful compute.
          </p>
          <div className="hero-actions" aria-label="Primary actions">
            <a className="button button-primary" href="#bounties">
              Open bounty board <ArrowRight aria-hidden="true" size={18} />
            </a>
            <a className="button button-secondary" href="#protocol">
              Read protocol
            </a>
          </div>
          <div className="signal-strip" aria-label="Launch principles">
            <span>No casino launch</span>
            <span>Public ledger</span>
            <span>Reviewer attestations</span>
          </div>
        </div>

        <div className="command-deck" aria-label="Launch cockpit">
          <div className="deck-header">
            <div>
              <p className="micro">MVP launch state</p>
              <h2>Contribution cockpit</h2>
            </div>
            <span className="live-pill">
              <RadioTower aria-hidden="true" size={15} /> building in public
            </span>
          </div>
          <div className="deck-grid">
            <Metric value="4" label="tracks" />
            <Metric value="30" label="day build" />
            <Metric value="0" label="tokens sold" />
          </div>
          <div className="priority-list">
            {bounties.slice(0, 3).map((bounty) => (
              <div className="priority-row" key={bounty.id}>
                <span className={`track-dot ${trackClass(bounty.track)}`} />
                <div>
                  <strong>{bounty.title}</strong>
                  <p>{bounty.verifier}</p>
                </div>
                <span>{bounty.reward}</span>
              </div>
            ))}
          </div>
          <img
            className="social-preview"
            src="/og.png"
            alt="Proof of Progress social preview"
          />
        </div>
      </section>

      <section className="gate-band" aria-label="Verification gates">
        {gates.map((gate) => {
          const Icon = gate.icon;
          return (
            <article className="gate-card" key={gate.label}>
              <span className="gate-label">
                <Icon aria-hidden="true" size={16} /> {gate.label}
              </span>
              <h3>{gate.title}</h3>
              <p>{gate.body}</p>
            </article>
          );
        })}
      </section>

      <section id="bounties" className="section-shell">
        <div className="section-heading">
          <div>
            <p className="eyebrow">First useful surface</p>
            <h2>Bounty board</h2>
          </div>
          <div className="segmented" aria-label="Filter bounties by track">
            {tracks.map((track) => (
              <button
                className={activeTrack === track ? "segment active" : "segment"}
                key={track}
                onClick={() => setActiveTrack(track)}
                aria-pressed={activeTrack === track}
              >
                {track}
              </button>
            ))}
          </div>
        </div>

        <div className="bounty-grid">
          {visibleBounties.map((bounty) => (
            <article className="bounty-card" key={bounty.id}>
              <div className="bounty-topline">
                <span className={`track-badge ${trackClass(bounty.track)}`}>{bounty.track}</span>
                <span className="status-badge">{bounty.status}</span>
              </div>
              <h3>{bounty.title}</h3>
              <p>{bounty.ask}</p>
              <dl className="bounty-facts">
                <div>
                  <dt>Reward</dt>
                  <dd>{bounty.reward}</dd>
                </div>
                <div>
                  <dt>Due</dt>
                  <dd>{bounty.due}</dd>
                </div>
                <div>
                  <dt>Difficulty</dt>
                  <dd>{bounty.difficulty}</dd>
                </div>
              </dl>
              <div className="verification-line">
                <CheckCircle2 aria-hidden="true" size={16} />
                <span>{bounty.signal}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="protocol" className="section-shell protocol-grid">
        <div className="protocol-copy">
          <p className="eyebrow">Protocol draft</p>
          <h2>Credit only moves when the work survives verification.</h2>
          <p>
            The first version rewards contributions with reputation, cash bounties,
            public attestations, and reviewer trust. A token can be designed later,
            after the work graph has real signal and legal review.
          </p>
          <a className="inline-action" href="#plan">
            See 30-day build plan <ArrowRight aria-hidden="true" size={16} />
          </a>
        </div>
        <div className="ledger-panel" aria-label="Public contribution ledger preview">
          <div className="ledger-header">
            <span>Public ledger</span>
            <span>launch draft</span>
          </div>
          {ledger.map((row) => (
            <div className="ledger-row" key={row.item}>
              <div>
                <strong>{row.item}</strong>
                <p>{row.contributor}</p>
              </div>
              <div>
                <span>{row.proof}</span>
                <small>{row.state}</small>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="plan" className="section-shell">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Quicker side, serious bar</p>
            <h2>30-day build plan</h2>
          </div>
          <span className="plan-note">Ship visible proof every week</span>
        </div>
        <div className="plan-grid">
          {plan.map((step) => (
            <article className="plan-card" key={step.window}>
              <span>{step.window}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell learning-shell">
        <div>
          <p className="eyebrow">Founder learning track</p>
          <h2>Learn enough to lead the room.</h2>
          <p>
            You do not need to be the best mathematician or protocol lawyer.
            You need enough fluency to recruit the right experts, ask precise questions,
            and protect the incentive design from nonsense.
          </p>
        </div>
        <ul className="learning-list">
          {learning.map((item) => (
            <li key={item}>
              <Sparkles aria-hidden="true" size={16} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section id="launch" className="section-shell launch-grid">
        <div className="launch-copy">
          <p className="eyebrow">Build in public</p>
          <h2>X launch room</h2>
          <p>
            Seed the idea tonight, explain the shape tomorrow, then make Monday
            feel like the beginning of a real build instead of a sudden pitch.
          </p>
          <div className="launch-stack">
            <span>
              <GitPullRequest aria-hidden="true" size={16} /> invite contributors
            </span>
            <span>
              <Workflow aria-hidden="true" size={16} /> publish the protocol
            </span>
          </div>
        </div>
        <div className="post-stack">
          {posts.map((post) => (
            <article className="post-card" key={post.id}>
              <div className="post-topline">
                <span>{post.label}</span>
                <button
                  className="copy-button"
                  onClick={() => copyPost(post.id, post.text)}
                  aria-label={`Copy ${post.title} post`}
                >
                  <Clipboard aria-hidden="true" size={15} />
                  {copiedPost === post.id ? "Copied" : "Copy"}
                </button>
              </div>
              <h3>{post.title}</h3>
              <p>{post.text}</p>
            </article>
          ))}
        </div>
      </section>

      <footer className="footer-shell">
        <div>
          <strong>Proof of Progress</strong>
          <p>Verified rewards for open math and open AGI work.</p>
        </div>
        <a href="#top">Back to top</a>
      </footer>
    </main>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="metric">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

function trackClass(track: Track) {
  return track.toLowerCase().replace(" ", "-");
}
