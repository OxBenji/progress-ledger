import { Redis } from "@upstash/redis";
import {
  listReceiptSubmissions,
  queueReceiptSubmission,
  type QueuedReceiptSubmission,
} from "./proof-ledger";

const indexKey = "progress-ledger:receipt-submissions:index";
const recordKeyPrefix = "progress-ledger:receipt-submission:";

type ReceiptSubmissionPacket = ReturnType<typeof queueReceiptSubmission>;

type StoredReceiptSubmission = {
  submitted_at: string;
  submission: ReceiptSubmissionPacket;
};

type SubmissionStorageStatus = {
  provider: "upstash_redis" | "prototype_seed_queue";
  configured: boolean;
  writable: boolean;
  durable: boolean;
  detail: string;
  required_env?: string[];
};

let redisClient: Redis | null = null;

function hasUpstashEnv() {
  return Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);
}

function getRedis() {
  if (!redisClient) {
    redisClient = Redis.fromEnv();
  }

  return redisClient;
}

export function getSubmissionStorageStatus(): SubmissionStorageStatus {
  if (!hasUpstashEnv()) {
    return {
      provider: "prototype_seed_queue",
      configured: false,
      writable: false,
      durable: false,
      detail: "Durable queue storage is ready in code but not attached in this environment.",
      required_env: ["UPSTASH_REDIS_REST_URL", "UPSTASH_REDIS_REST_TOKEN"],
    };
  }

  return {
    provider: "upstash_redis",
    configured: true,
    writable: true,
    durable: true,
    detail: "Receipt submissions persist through the Upstash Redis queue adapter.",
  };
}

function storedPacketToQueueRow(record: StoredReceiptSubmission): QueuedReceiptSubmission {
  const { candidate, queue_id, review_state, next_actions } = record.submission;

  return {
    queue_id,
    receipt_id: candidate.receipt_id,
    task_type: candidate.task_type,
    artifact: candidate.artifact,
    check: candidate.check,
    verifier: candidate.verifier,
    hash: candidate.hash,
    status: candidate.status,
    review_state: review_state === "ready_for_review" ? "Ready for review" : "Needs fields",
    next_action: next_actions[0] ?? "Assign reviewer.",
    source: "stored",
    submitted_at: record.submitted_at,
  };
}

export async function listStoredReceiptSubmissions() {
  const storage = getSubmissionStorageStatus();

  if (!storage.configured) {
    return {
      storage,
      submissions: listReceiptSubmissions().map((submission) => ({
        ...submission,
        source: "seed",
      })),
    };
  }

  const redis = getRedis();
  const queueIds = await redis.lrange<string>(indexKey, 0, 99);
  const uniqueQueueIds = Array.from(new Set(queueIds));
  const storedRecords = await Promise.all(
    uniqueQueueIds.map((queueId) => redis.get<StoredReceiptSubmission>(`${recordKeyPrefix}${queueId}`)),
  );
  const storedSubmissions = storedRecords
    .filter((record): record is StoredReceiptSubmission => Boolean(record))
    .map(storedPacketToQueueRow);
  const seedSubmissions = listReceiptSubmissions().map((submission) => ({
    ...submission,
    source: "seed",
  }));

  return {
    storage,
    submissions: [...storedSubmissions, ...seedSubmissions],
  };
}

export async function persistReceiptSubmission(submission: ReceiptSubmissionPacket) {
  const storage = getSubmissionStorageStatus();

  if (!submission.accepted_for_review) {
    return {
      storage,
      persisted: false,
      detail: "Only complete receipt packets are persisted.",
    };
  }

  if (!storage.configured) {
    return {
      storage,
      persisted: false,
      detail: "Submission validated but not persisted because durable storage is not attached.",
    };
  }

  const redis = getRedis();
  const record: StoredReceiptSubmission = {
    submitted_at: new Date().toISOString(),
    submission,
  };

  await redis.set(`${recordKeyPrefix}${submission.queue_id}`, record);
  await redis.lrem(indexKey, 0, submission.queue_id);
  await redis.lpush(indexKey, submission.queue_id);

  return {
    storage,
    persisted: true,
    detail: "Submission persisted to durable queue storage.",
  };
}
