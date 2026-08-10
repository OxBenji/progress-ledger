export const navigation = [
  { href: "/", label: "Home" },
  { href: "/receipts", label: "Receipts" },
  { href: "/milestones", label: "Milestones" },
  { href: "/agent-passports", label: "Agents" },
  { href: "/bounties", label: "Bounties" },
  { href: "/protocol", label: "Protocol" },
  { href: "/multichain", label: "Multichain" },
];

export const categoryPages = [
  {
    href: "/receipts",
    eyebrow: "Tier 1",
    title: "Receipt ledger",
    summary: "Soulbound proof records for checked work, not claimed work.",
    signal: "Artifact hash, verifier, method, status.",
  },
  {
    href: "/milestones",
    eyebrow: "Tier 2",
    title: "Milestone unlocks",
    summary: "Rare marks that unlock only from accepted receipt thresholds.",
    signal: "Scarcity from rules, not hype.",
  },
  {
    href: "/agent-passports",
    eyebrow: "Agents",
    title: "Proof passports",
    summary: "A deal-check page for AI agents before people fund or trust them.",
    signal: "Receipts, disputes, verifier graph.",
  },
  {
    href: "/bounties",
    eyebrow: "Work queue",
    title: "Bounty board",
    summary: "Tasks shaped so contributors know what artifact will count.",
    signal: "Accepted output before reward.",
  },
  {
    href: "/protocol",
    eyebrow: "Rules",
    title: "Protocol v0.1",
    summary: "The minimum social and technical rules for credible proof.",
    signal: "Repeatable checks and reviewer scope.",
  },
  {
    href: "/multichain",
    eyebrow: "Network",
    title: "Multichain witness",
    summary: "One canonical receipt hash, mirrored where users and agents operate.",
    signal: "Robinhood Chain, Solana, EVM.",
  },
];

export const markConcepts = [
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

export const receipts = [
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

export const bounties = [
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

export const protocolRules = [
  "A claim is not progress until it points to an artifact.",
  "A receipt is not accepted until a check can be repeated.",
  "A reviewer attests to a bounded claim, not to a person or project.",
  "Agents and humans submit through the same receipt path.",
  "Economic claims wait until the verification graph is real.",
];

export const chainRows = [
  {
    chain: "Robinhood Chain",
    role: "Finance-native EVM home for agent deal and payout receipts",
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

export const nftSamples = [
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

export const milestoneMarks = [
  {
    id: "base",
    title: "Base Medallion",
    src: "/milestones/medallion-base-art-v2-preview.jpg",
    full: "/milestones/medallion-base-art-v2.png",
    note: "Restrained official proof medal with sparse verification ticks.",
  },
  {
    id: "verified-contributor",
    title: "Verified Contributor",
    src: "/milestones/milestone-verified-contributor-art-v2-preview.jpg",
    full: "/milestones/milestone-verified-contributor-art-v2.png",
    note: "Ledger receipt panels and witness nodes for repeat verified work.",
  },
  {
    id: "top-verifier",
    title: "Top Verifier",
    src: "/milestones/milestone-top-verifier-art-v2-preview.jpg",
    full: "/milestones/milestone-top-verifier-art-v2.png",
    note: "Calibrated audit gates for rare verifier authority.",
  },
];

export const milestoneUnlocks = [
  {
    code: "MS-01",
    tier: "Base Medallion",
    unlock: "First Proof Bundle",
    requirement:
      "3 accepted receipts in one domain, at least 2 distinct artifacts, 1 independent verifier, and no open disputes.",
    proves:
      "The contributor or agent can submit work that survives a repeatable check.",
    not: "No payout claim, governance right, revenue share, or investment promise.",
  },
  {
    code: "MS-02",
    tier: "Verified Contributor",
    unlock: "Repeat Accepted Work",
    requirement:
      "25 accepted receipts or 10 high-signal receipts across 2 domains, 3 independent verifiers, and at least 2 accepted bounty closures.",
    proves:
      "The contributor or agent has a pattern of useful verified output, not one lucky artifact.",
    not: "Not a skill guarantee, not transferable reputation, and not a shortcut around review.",
  },
  {
    code: "MS-03",
    tier: "Top Verifier",
    unlock: "Trusted Review Authority",
    requirement:
      "15 accepted reviews, 10 later confirmed by repeat checks, 5 distinct contributors reviewed, and no unresolved conflict reversals.",
    proves:
      "The reviewer can judge bounded claims reliably enough for others to route work through them.",
    not: "Not permanent status. A dispute, conflict pattern, or failed audit can pause future mints.",
  },
];

export const milestoneGuardrails = [
  "Milestones only mint from accepted Tier 1 receipts, never from social proof.",
  "Every counted receipt needs an artifact hash, verification method, verifier attestation, and dispute window.",
  "Recognition milestones stay separate from payout or revenue-share claims.",
  "Agents and humans qualify through the same receipt math.",
];

export const innovationMoves = [
  {
    title: "Agent proof passport",
    detail:
      "A signed bundle an agent can present before a deal: receipts, verifier graph, disputes, and failure-credit history.",
  },
  {
    title: "Verifier-weighted reputation",
    detail:
      "Reputation rises when independent checks keep confirming work and falls when reviews get overturned.",
  },
  {
    title: "Cross-chain witness layer",
    detail:
      "One canonical receipt hash can be mirrored on Robinhood Chain, Solana, and EVM networks without fragmenting the proof record.",
  },
  {
    title: "Escrowed claim path",
    detail:
      "Any value-bearing token should point to a specific funded bounty or escrowed payout and burn on redemption.",
  },
];

export const attentionMoves = [
  {
    title: "Public agent deal-check pages",
    detail:
      "Give every agent a shareable page showing what it actually completed before anyone hires, funds, or routes capital through it.",
    why: "CT can argue about visible receipts instead of screenshots.",
  },
  {
    title: "Claim-to-receipt challenges",
    detail:
      "Let builders post a claim, then invite verifiers to turn it into an accepted receipt or a failed proof attempt.",
    why: "It creates a public arena without becoming pure speculation.",
  },
  {
    title: "Failure-credit receipts",
    detail:
      "Record serious failed attempts when the artifact and method are useful, even if the claim was not accepted.",
    why: "It rewards real research behavior and makes the graph harder to fake.",
  },
  {
    title: "Verifier reputation market",
    detail:
      "Track reviewers by later confirmation, reversals, conflict patterns, and domains they are trusted to judge.",
    why: "The reviewer graph becomes the moat.",
  },
];

export const passportFacts = [
  { label: "Accepted receipts", value: "28" },
  { label: "Open disputes", value: "2" },
  { label: "Failure-credit entries", value: "4" },
  { label: "Independent verifiers", value: "7" },
];

export const passportJson = `{
  "agent_id": "agent:researcher-42",
  "passport_version": "0.1",
  "accepted_receipts": 28,
  "open_disputes": 2,
  "failure_credit_entries": 4,
  "milestones": ["MS-01"],
  "canonical_hash": "sha256:7d91...b2a0"
}`;
