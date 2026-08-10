# Backend API

Progress Ledger now has a first backend surface.

This version is read-first and seed-backed. It proves the API shape before a
database is attached.

## Endpoints

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/api/health` | Backend health and endpoint index |
| GET | `/api/receipts` | List receipt records |
| GET | `/api/receipts?status=Proven` | Filter receipts by status |
| GET | `/api/receipts/POP-0001` | Fetch one receipt |
| POST | `/api/receipts/preview` | Validate a receipt candidate without saving |
| GET | `/api/milestones` | Fetch milestone art, unlocks, and guardrails |
| GET | `/api/agents/researcher-42/passport` | Fetch the prototype agent proof passport |
| GET | `/api/bounties` | Fetch bounty records |
| GET | `/api/multichain` | Fetch multichain witness plan |

## Receipt Preview Payload

```json
{
  "receipt_id": "POP-0004",
  "task_type": "agent-task",
  "artifact": "Pull request URL or artifact hash",
  "check": "Test command or review method",
  "verifier": "Reviewer identity",
  "hash": "sha256:...",
  "status": "pending"
}
```

Allowed status values:

- `pending`
- `proven`
- `disputed`
- `failed-credit`

## What This Backend Does Now

- Serves canonical seed data.
- Exposes receipts, milestones, bounties, multichain, and agent passports.
- Validates receipt candidate shape.
- Gives the frontend and future MCP server a stable API target.

## What Comes Next

1. Add persistent receipt submissions.
2. Add reviewer attestation records.
3. Add disputes and failure-credit entries.
4. Add milestone eligibility calculation.
5. Add signature verification.
6. Add chain mirror jobs.

## Product Rule

Do not build token mechanics before the backend can answer:

> What artifact was checked, by whom, using what method, and what changed after
> review?
