# Example Proof Receipt: Agent Tooling PR

Status: Example

```json
{
  "id": "PL-EXAMPLE-0001",
  "track": "agents",
  "bounty_id": "BNTY-EXAMPLE-0001",
  "title": "Add proof receipt example for agent tooling PR",
  "artifact_url": "https://github.com/OxBenji/progress-ledger/pull/example",
  "artifact_hash": null,
  "submitter_type": "human-agent-team",
  "submitter": "github:example-contributor",
  "acceptance_check": "Example receipt includes artifact, check, reviewer, verification state, and reward state",
  "verification_method": "Maintainer review against docs/proof-receipt-schema.md",
  "reviewer": "project-maintainer",
  "reviewer_attestation": "The submitted example matches the v0.1 draft schema and avoids token-first framing.",
  "verification_state": "draft",
  "reward_state": "reputation-only",
  "created_at": "2026-08-06T00:00:00Z",
  "updated_at": "2026-08-06T00:00:00Z"
}
```

## Notes

- This receipt is intentionally reputation-only.
- It separates verification from reward state.
- It records the artifact and check before any economic layer.
