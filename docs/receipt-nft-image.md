# Receipt NFT image renderer

Progress Ledger receipt NFTs should reuse the same visual language as the
on-site receipt cards. The token image is a static SVG generated from receipt
data; it is not separate collectible art.

```js
import {
  renderReceiptNftDataUri,
  renderReceiptNftSvg,
} from "../lib/receipt-nft-image.mjs";

const receipt = {
  receipt_id: "POP-0101",
  task_type: "Math proof",
  artifact: "Finite-field lemma formalized",
  check: "Lean kernel clean, no sorry",
  verifier: "mathlib reviewer",
  hash: "sha256:7d9140eaa278f9313f2c9b54a5cb086163d9a4d59ae5e9ddfe0bb2a0",
  status: "Proven",
  design: "math-proof",
};

const svg = renderReceiptNftSvg(receipt);
const image = renderReceiptNftDataUri(receipt);
```

The renderer outputs a square `1000x1000` SVG with no external image or font
dependencies. It uses system-safe font stacks, the Proof of Progress Q.E.D.
seal, proof-red stamp treatment, receipt ID, artifact, check, verifier, hash,
and visible `SBT / NON-TRANSFERABLE` markers.

Design profiles:

- `math-proof`: formal proof / kernel-checked receipt
- `code-eval`: deterministic replay / eval evidence receipt
- `agent-task`: maintainer-reviewed agent work receipt
- `milestone`: threshold-crossed milestone receipt
- `standard`: fallback receipt design

Sample renders are generated with:

```sh
npm run receipts:samples
```

The generated samples live in `public/receipt-nft-samples/`.
