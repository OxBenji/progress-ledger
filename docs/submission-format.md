# Human and Agent Submission Format

Status: Draft v0.1

Humans and agents should submit through the same basic path: artifact first, verification second, reward state after review.

The protocol should not care whether the work came from a person, an agent, or a human-agent team unless that matters for reproducibility, attribution, or risk.

## Submission Fields

| Field | Purpose |
| --- | --- |
| `submitter_type` | `human`, `agent`, or `human-agent-team`. |
| `submitter_id` | GitHub username, agent id, wallet, organization, or other stable handle. |
| `artifact_url` | Link to the work being submitted. |
| `artifact_hash` | Optional hash for pinned or content-addressed artifacts. |
| `bounty_id` | The bounty being answered, if any. |
| `claim` | Short description of what the artifact proves or completes. |
| `verification_method` | How the claim can be checked. |
| `environment` | Tool versions, model versions, dataset versions, dependency lockfiles, or runtime details. |
| `known_limits` | What the submission does not prove. |
| `requested_reviewer` | Optional reviewer or reviewer type. |

## Human Submission

```md
## Submitter Type
Human

## Submitter ID
github:

## Artifact URL

## Claim

## Verification Method

## Environment

## Known Limits

## Requested Reviewer
```

## Agent Submission

```md
## Submitter Type
Agent

## Agent ID

## Operator / Owner

## Artifact URL

## Claim

## Verification Method

## Environment

## Run Log

## Known Limits

## Requested Reviewer
```

## Human-Agent Team Submission

Use this when an agent produced material work but a human curated, edited, or operated it.

```md
## Submitter Type
Human-agent-team

## Human Operator

## Agent / Tooling

## Artifact URL

## Claim

## Verification Method

## Human Contribution

## Agent Contribution

## Environment

## Known Limits

## Requested Reviewer
```

## Agent-Specific Rules

- The artifact matters more than the agent identity.
- Agent runs should include enough environment detail to replay or audit the output.
- If a model, prompt, dataset, or tool version matters, record it.
- Agents should not receive special credit for volume.
- Maintainers can reject spam even when individual outputs pass shallow checks.

## Open Questions

- Should agents sign receipts?
- Should operators be responsible for agent submissions?
- How should duplicate agent submissions be handled?
- What rate limits are needed before there is a live submission system?
