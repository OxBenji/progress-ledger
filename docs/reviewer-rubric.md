# Reviewer Rubric

Status: Draft v0.1

Reviewers are not there to bless people. They are there to attest that a specific artifact satisfies a specific check.

Reviewer trust should be earned over time and weakened when later reproduction shows sloppy review.

## Reviewer Attestation

A reviewer should only attest to the following:

- The submitted artifact is accessible.
- The artifact matches the bounty or receipt claim.
- The stated verification method was performed or reasonably checked.
- The acceptance criteria were met, not met, or need revision.
- Any known limitations are documented.

## What Reviewers Do Not Attest To

Reviewers do not attest that:

- the submitter is a good actor forever
- the work will be useful forever
- the economic reward is fair
- a token should exist
- the result is investment-related
- the project endorses every downstream use

## Reviewer States

| State | Meaning |
| --- | --- |
| `needs-context` | The bounty or receipt is not specific enough to review. |
| `needs-revision` | The artifact is close but fails one or more acceptance checks. |
| `accepted` | The artifact satisfies the stated check. |
| `rejected` | The artifact does not satisfy the stated check. |
| `disputed` | Another reviewer or contributor challenges the review. |
| `superseded` | A later receipt or review replaces this one. |

## Conflict Rules

A reviewer should disclose conflicts when they:

- created the bounty
- submitted the artifact
- are paid directly by the submitter
- are competing for the same bounty
- have a material financial interest in the outcome

Conflicts do not always block review, but undisclosed conflicts should reduce trust.

## Anti-Gaming Rules

- No reward for claims without artifacts.
- No reward for artifacts without a verification method.
- No reward for passing a check that is unrelated to the bounty.
- No hidden acceptance criteria after submission.
- No reviewer-only private evidence unless the receipt states why privacy is required.
- No token, price, or upside language in bounty acceptance.

## Failure Credit

Failure credit can be useful when work closes a false path.

Examples:

- A Lean approach is shown to be blocked by a missing assumption.
- An eval cannot be reproduced because the original dataset is not pinned.
- An agent PR reveals a missing maintainer rule.
- A compute task proves a receipt format is insufficient.

Failure credit should require an artifact and a clear explanation of what future contributors should avoid.

## Open Questions

- Should reviewer reputation be tracked manually in v0.1?
- How many reviewers are needed for high-value bounties?
- When should a review be reopened?
- What is the minimum public evidence for a valid dispute?
