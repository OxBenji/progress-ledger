# Proof Receipt Schema

Status: Draft v0.1

A proof receipt is the public record that connects a useful work claim to a checkable artifact, an accountable reviewer, and a reward or reputation state.

It should be boring, durable, and easy to verify later.

## Required Fields

| Field | Purpose |
| --- | --- |
| `id` | Stable receipt identifier, for example `PL-0001`. |
| `track` | Work category: `math`, `ai-evals`, `agents`, `compute`, or `other`. |
| `bounty_id` | Optional link to the bounty this work answered. |
| `title` | Short human-readable label. |
| `artifact_url` | Link to the submitted proof, PR, benchmark, report, job output, or other artifact. |
| `artifact_hash` | Optional content hash when the artifact can be pinned. |
| `submitter_type` | `human`, `agent`, or `human-agent-team`. |
| `submitter` | Public handle, wallet, GitHub account, agent id, or organization. |
| `acceptance_check` | The objective check the artifact must satisfy. |
| `verification_method` | Command, replay, kernel check, review checklist, or signed receipt used to verify the work. |
| `reviewer` | Person, maintainer, steward, or qualified reviewer responsible for the decision. |
| `reviewer_attestation` | What the reviewer is actually saying is true. |
| `verification_state` | `draft`, `submitted`, `under-review`, `accepted`, `rejected`, `needs-revision`, or `superseded`. |
| `reward_state` | `none`, `pledged`, `escrowed`, `approved`, `paid`, `reputation-only`, or `disputed`. |
| `created_at` | Receipt creation timestamp. |
| `updated_at` | Last material update timestamp. |

## Optional Fields

| Field | Purpose |
| --- | --- |
| `chain_refs` | Optional settlement, escrow, or reputation references. Not required in v0.1. |
| `failure_credit` | Credit awarded for useful failed work, negative results, or closed false paths. |
| `dependencies` | Prior receipts, datasets, tasks, or proofs this receipt depends on. |
| `reproduction_notes` | Instructions for later reviewers to reproduce the result. |
| `dispute_url` | Link to issue, thread, or record where disputes are handled. |

## Example

```json
{
  "id": "PL-0001",
  "track": "math",
  "bounty_id": "BNTY-0001",
  "title": "Formalize finite-field lemma in Lean",
  "artifact_url": "https://github.com/example/repo/pull/12",
  "artifact_hash": null,
  "submitter_type": "human",
  "submitter": "github:example",
  "acceptance_check": "Lean file typechecks with no sorry placeholders",
  "verification_method": "lake exe cache get && lake build",
  "reviewer": "github:mathlib-reviewer",
  "reviewer_attestation": "The submitted artifact satisfies the stated acceptance check and does not rely on hidden assumptions.",
  "verification_state": "under-review",
  "reward_state": "pledged",
  "created_at": "2026-08-06T00:00:00Z",
  "updated_at": "2026-08-06T00:00:00Z"
}
```

## What Must Stay Separate

- Verification is not payment.
- Payment is not endorsement.
- A reviewer confirms the stated check, not the entire person or project.
- A token or chain reference is optional infrastructure, not the source of truth.

## Open Questions

- Should agent identity be self-declared, signed, or tied to a platform account?
- What minimum evidence is needed for failure credit?
- When should a receipt become immutable?
- Who can mark a disputed receipt as resolved?
