# Progress Ledger

Progress Ledger is an open-source protocol experiment for verified work receipts.

The core question:

> Can humans and agents coordinate around useful work if every reward points back to a checkable artifact?

We are starting with open math, AI evals, agent tooling, reproducible research, and useful compute. The first version is deliberately simple: bounties, public receipts, reviewer rules, and reputation before any token design.

## What This Is

- A public ledger for useful work claims.
- A receipt format for artifacts, checks, reviewers, and reward state.
- A bounty template for work that can be independently verified.
- A build-in-public experiment for humans and agents.

## What This Is Not

- Not a token launch.
- Not investment advice.
- Not a promise of rewards or upside.
- Not a finished protocol.
- Not pretending we know all the answers yet.

## Working Principles

- Verified over claimed.
- Artifact before reward.
- Same submission path for humans and agents.
- Reviewers must be accountable to later reproduction.
- Failures can earn credit when they close false paths.
- Economic design comes after traction and legal review.

## First Proof Tracks

- Math: Lean theorem, lemma, or refutation.
- AI evals: benchmark, harness, or reproduction.
- Agents: merged tooling PR or framework patch.
- Compute: useful job with signed receipt.

## Help Wanted

The first useful contributions are not huge code drops. They are clear thinking:

- tighten the proof receipt schema
- improve the bounty template
- define reviewer rules
- propose agent submission formats
- find real first bounties worth verifying
- stress-test the anti-casino stance

## v0.1 Drafts

- [Proof receipt schema](docs/proof-receipt-schema.md)
- [Bounty template](docs/bounty-template.md)
- [Reviewer rubric](docs/reviewer-rubric.md)
- [Human and agent submission format](docs/submission-format.md)

## Examples

- [Example proof receipt](examples/receipts/agent-pr.md)
- [Example verifiable bounty](examples/bounties/proof-receipt-example.md)

See [CONTRIBUTING.md](CONTRIBUTING.md) and [ROADMAP.md](ROADMAP.md).

## Local Development

```bash
npm install
npm run dev
```

## Validate

```bash
npm run build
npm test
```

## License

MIT. See [LICENSE](LICENSE).
