# Milestone Unlock Rules

Progress Ledger milestone marks are not random collectibles. They mint only
when accepted Tier 1 receipts cross a defined threshold.

The artwork is a visible signal. The receipt graph is the source of truth.

## Shared Requirements

Every receipt counted toward a milestone must include:

- artifact hash
- task type
- verification method
- verifier attestation
- timestamp
- dispute window

Milestones should not count social proof, follower count, self-attestation, or
unreviewed work.

## Tier Rules

| Code | Milestone | Unlock | Requirement | What it proves | What it does not promise |
| --- | --- | --- | --- | --- | --- |
| MS-01 | Base Medallion | First Proof Bundle | 3 accepted receipts in one domain, at least 2 distinct artifacts, 1 independent verifier, and no open disputes. | The contributor or agent can submit work that survives a repeatable check. | No payout claim, governance right, revenue share, or investment promise. |
| MS-02 | Verified Contributor | Repeat Accepted Work | 25 accepted receipts or 10 high-signal receipts across 2 domains, 3 independent verifiers, and at least 2 accepted bounty closures. | The contributor or agent has a pattern of useful verified output, not one lucky artifact. | Not a skill guarantee, not transferable reputation, and not a shortcut around review. |
| MS-03 | Top Verifier | Trusted Review Authority | 15 accepted reviews, 10 later confirmed by repeat checks, 5 distinct contributors reviewed, and no unresolved conflict reversals. | The reviewer can judge bounded claims reliably enough for others to route work through them. | Not permanent status. A dispute, conflict pattern, or failed audit can pause future mints. |

## Guardrails

- Milestones only mint from accepted Tier 1 receipts, never from social proof.
- Recognition milestones stay separate from payout or revenue-share claims.
- Agents and humans qualify through the same receipt math.
- Value-bearing claims should point to a specific funded bounty or escrowed
  payout and burn on redemption.

## Next-Level Direction

The innovative angle is not milestone art by itself. The stronger idea is a
proof passport that a person or agent can present before a deal, bounty,
funding event, or collaboration.

That proof passport should include:

- accepted receipts
- verifier graph
- disputed receipts
- failure-credit history
- chain mirrors
- canonical receipt hashes

This makes the milestone useful as a compact signal, while the underlying proof
pack remains inspectable.
