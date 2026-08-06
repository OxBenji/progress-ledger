# Bounty Template

Status: Draft v0.1

A Progress Ledger bounty should make useful work verifiable before anyone starts arguing about rewards.

Bad bounty: "Improve agent evals."

Better bounty: "Create a deterministic replay harness for dataset X. The harness is accepted when command Y runs twice and returns matching scores."

## Required Fields

### Problem Statement

What is broken, missing, or worth proving?

Use one sentence and one short paragraph. Avoid vague words like "better," "robust," or "high-quality" unless they are tied to a check.

### Track

Choose one:

- Math
- AI Evals
- Agents
- Compute
- Other

### Accepted Artifact

What must the submitter produce?

Examples:

- Merged Lean file
- Pull request
- Reproducible benchmark harness
- Signed compute receipt
- Dataset reproduction report
- Reviewer-ready writeup

### Acceptance Criteria

Checklist of what must be true for the bounty to count.

Each item should be checkable by a machine, reviewer, maintainer, or public replay.

### Verification Method

How will reviewers decide whether the work counts?

Prefer:

- command that exits successfully
- replayable script
- Lean/kernel/typecheck result
- pinned dataset and deterministic run
- maintainer attestation
- signed job log or hash check

Avoid:

- "looks good"
- "seems useful"
- "high quality"
- "community likes it"

### Reviewer Requirement

Who is allowed to verify this bounty?

State what qualifies them: maintainer, domain expert, protocol steward, formal methods reviewer, eval steward, or infrastructure reviewer.

### Reward Terms

What reward is being offered, if any?

Keep reward terms separate from verification. A receipt can be accepted before payment state changes.

### Failure Credit

Can failed work still count if it closes a false path?

State:

- what negative result would be useful
- what evidence is required
- whether credit is reputation-only, partial reward, or no reward

### Out of Scope

What explicitly does not count?

This prevents vague submissions and scope creep.

## Minimal Template

```md
## Problem Statement

## Track

## Accepted Artifact

## Acceptance Criteria

- [ ] 
- [ ] 
- [ ] 

## Verification Method

## Reviewer Requirement

## Reward Terms

## Failure Credit

## Out of Scope
```

## Example Bounty

### Problem Statement

The project needs one proof receipt example that is easy for new contributors to understand and hard to fake.

### Track

Agents

### Accepted Artifact

A Markdown proof receipt example added to `examples/receipts/agent-pr.md`.

### Acceptance Criteria

- The receipt includes submitter type, artifact URL, acceptance check, reviewer, verification state, and reward state.
- The example does not mention token upside, trading, or investment language.
- The example can be understood without knowing the whole protocol.

### Verification Method

Maintainer review against this checklist.

### Reviewer Requirement

Project maintainer or protocol steward.

### Reward Terms

Reputation-only in v0.1 draft.

### Failure Credit

A rejected version can still earn discussion credit if it reveals a missing field or unclear rule.

### Out of Scope

No backend, wallet, escrow, or token design.
