# Receipt Queue Storage

The receipt submission queue now has a durable storage adapter.

## Default Mode

Without storage env vars, the API stays online and uses the seed review queue.
Submissions are validated and return a queue id, but `persistence.persisted`
is `false`.

## Durable Mode

Attach an Upstash Redis store to the Vercel project and set:

- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`

When both are present:

- `POST /api/receipts/submissions` persists accepted packets.
- `GET /api/receipts/submissions` returns stored packets plus seed examples.
- `/review-queue` shows `Durable writes enabled`.

## Product Rule

Do not claim live public intake is durable until the review queue shows durable
storage enabled and the API returns `persistence.persisted: true`.
