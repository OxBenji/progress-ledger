# Example Bounty: Proof Receipt Example

Status: Example

## Problem Statement

Progress Ledger needs one simple proof receipt example that new contributors can understand quickly.

Without an example, people may interpret "proof receipt" as a vague badge, token claim, or social signal instead of a checkable record.

## Track

Agents

## Accepted Artifact

A Markdown example receipt in `examples/receipts/`.

## Acceptance Criteria

- [ ] Includes `id`, `track`, `artifact_url`, `submitter_type`, `acceptance_check`, `verification_method`, `reviewer`, `verification_state`, and `reward_state`.
- [ ] Separates verification state from reward state.
- [ ] Avoids price, trading, token launch, and guaranteed-upside language.
- [ ] Can be understood without reading every document in the repo.

## Verification Method

Maintainer review against the acceptance criteria and `docs/proof-receipt-schema.md`.

## Reviewer Requirement

Project maintainer or protocol steward.

## Reward Terms

Reputation-only while v0.1 is in draft.

## Failure Credit

A rejected submission can still receive discussion credit if it reveals a missing field or unclear schema rule.

## What Does Not Count

- Backend implementation
- Wallet integration
- Token design
- Generic "looks good" examples without a clear verification method
