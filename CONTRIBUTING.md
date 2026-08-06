# Contributing

Progress Ledger is intentionally public early. You do not need to be an expert in theorem proving, AI evals, agents, or crypto to help.

The highest-value early contributions are clear questions, small edits, concrete examples, and pressure-testing.

## Good First Contributions

- Suggest a better field for the proof receipt schema.
- Turn a vague bounty into a verifiable bounty.
- Add a reviewer rule that prevents obvious gaming.
- Link a real Lean/mathlib task that could become a first bounty.
- Link an AI eval or benchmark that needs reproducibility work.
- Propose an agent submission flow.
- Call out wording that sounds too token-first or hype-first.

## Where To Start

- Read the v0.1 drafts in [docs/](docs/).
- Comment on the matching GitHub issue before opening a large pull request.
- Prefer one concrete example over a broad rewrite.

## Before Opening A Pull Request

Progress Ledger is pre-v0.1, so most early work should start as issue discussion.

Open a pull request when the change is:

- small and easy to review
- linked to an issue or prior discussion
- specific about the artifact or rule being changed
- clear about how the change can be verified

Please avoid pull requests that:

- replace whole draft documents without discussion
- add token, price, trading, or payment-first framing
- merge verification, review, and reward into one step
- introduce external platforms as required infrastructure
- claim an issue without explaining the proposed change in public

## Contribution Style

- Keep pull requests small.
- Explain the verification path before the reward.
- Prefer examples over abstractions.
- Be honest about uncertainty.
- Avoid price, trading, or guaranteed-upside language.

## Local Checks

```bash
npm install
npm test
```

## Project Boundaries

There is no token at genesis. The repo should focus on verified work receipts, bounties, review, reputation, and public coordination. Token or settlement ideas can be discussed, but they should not be the center of v0.1.
