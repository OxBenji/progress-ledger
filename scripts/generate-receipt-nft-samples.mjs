import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import {
  renderReceiptNftDataUri,
  renderReceiptNftSvg,
} from "../lib/receipt-nft-image.mjs";

const outDir = join(process.cwd(), "public", "receipt-nft-samples");

const samples = [
  {
    file: "pop-0101-math-proof.svg",
    receipt: {
      receipt_id: "POP-0101",
      task_type: "Math proof",
      artifact: "Finite-field lemma formalized",
      check: "Lean kernel clean, no sorry",
      verifier: "mathlib reviewer",
      hash: "sha256:7d9140eaa278f9313f2c9b54a5cb086163d9a4d59ae5e9ddfe0bb2a0",
      status: "Proven",
    },
  },
  {
    file: "pop-0102-code-eval.svg",
    receipt: {
      receipt_id: "POP-0102",
      task_type: "Code eval",
      artifact:
        "Multi-run agent benchmark replay harness with pinned fixtures and deterministic scoring",
      check: "two-run reproducibility plus fixture hash match",
      verifier: "eval steward / reproducibility reviewer",
      hash: "sha256:43bf90cd1277653ad2c7a6118f8ea97d1a8fa5d964927d1d5a2a91cc",
      status: "Proven",
    },
  },
  {
    file: "pop-0103-agent-task.svg",
    receipt: {
      receipt_id: "POP-0103",
      task_type: "Agent task",
      artifact:
        "Agent-created pull request for receipt metadata validation and bounty template checks",
      check: "maintainer review, tests passed, merged patch",
      verifier: "Open Source Maintainer Council - Agent Workgroup",
      hash: "sha256:bb0928f0a61f474e3a817c2c30f725f4a86997de58ec31701bb7d810",
      status: "Proven",
    },
  },
];

await mkdir(outDir, { recursive: true });

const manifest = [];

for (const sample of samples) {
  const svg = renderReceiptNftSvg(sample.receipt);
  const dataUri = renderReceiptNftDataUri(sample.receipt);
  const filePath = join(outDir, sample.file);
  await writeFile(filePath, `${svg}\n`, "utf8");
  manifest.push({
    receipt_id: sample.receipt.receipt_id,
    task_type: sample.receipt.task_type,
    file: `/receipt-nft-samples/${sample.file}`,
    data_uri_prefix: dataUri.slice(0, 96),
  });
}

await writeFile(
  join(outDir, "manifest.json"),
  `${JSON.stringify(manifest, null, 2)}\n`,
  "utf8",
);

console.log(`Generated ${samples.length} receipt NFT sample SVGs.`);
