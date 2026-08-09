export const RECEIPT_NFT_COLORS = {
  paper: "#FAFAF8",
  ink: "#111110",
  proofRed: "#8B1E1E",
  hairline: "#DDD",
  muted: "#5F5A52",
  quiet: "#827B70",
  pending: "#9B6A20",
};

const SIZE = 1000;
const CARD = {
  x: 64,
  y: 64,
  width: 872,
  height: 872,
};

export function renderReceiptNftDataUri(receipt, options = {}) {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
    renderReceiptNftSvg(receipt, options),
  )}`;
}

export function renderReceiptNftSvg(receipt, options = {}) {
  const normalized = normalizeReceipt(receipt);
  const colors = { ...RECEIPT_NFT_COLORS, ...(options.colors ?? {}) };
  const status = normalized.status.toLowerCase();
  const isProven = status === "proven" || status === "verified";
  const statusColor = isProven ? colors.proofRed : colors.pending;
  const statusLabel = isProven ? "PROVEN" : normalized.status.toUpperCase();
  const stampLabel = isProven ? "PROOF COMPLETE" : "PENDING REVIEW";
  const artifactLines = wrapText(normalized.artifact, 22, 5);
  const artifactFontSize = artifactLines.length <= 3 ? 72 : artifactLines.length === 4 ? 60 : 48;
  const artifactLineHeight = Math.round(artifactFontSize * 0.95);
  const factsY = 245 + artifactLines.length * artifactLineHeight + 54;
  const hashLines = wrapText(normalized.hash, 30, 2);

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}" role="img" aria-labelledby="receipt-title receipt-desc">`,
    `<title id="receipt-title">${escapeXml(normalized.receipt_id)} receipt NFT image</title>`,
    `<desc id="receipt-desc">A Proof of Progress soulbound receipt for ${escapeXml(normalized.artifact)}.</desc>`,
    renderDefs(colors),
    `<rect width="${SIZE}" height="${SIZE}" fill="${colors.paper}"/>`,
    `<rect width="${SIZE}" height="${SIZE}" fill="url(#receipt-grid)"/>`,
    `<rect x="${CARD.x}" y="${CARD.y}" width="${CARD.width}" height="${CARD.height}" fill="none" stroke="${colors.hairline}" stroke-width="2"/>`,
    `<rect x="${CARD.x + 18}" y="${CARD.y + 18}" width="${CARD.width - 36}" height="${CARD.height - 36}" fill="none" stroke="${colors.hairline}" stroke-width="1"/>`,
    renderProofMark(104, 101, 74, colors),
    `<text x="196" y="130" class="wordmark">Proof of Progress</text>`,
    `<text x="196" y="165" class="eyebrow">VERIFIED WORK FIRST</text>`,
    `<text x="104" y="235" class="mono id">${escapeXml(normalized.receipt_id)}</text>`,
    renderStatusBadge(754, 200, statusLabel, statusColor),
    renderSbtBadge(626, 268, colors),
    renderTextLines(artifactLines, 104, 332, "artifact", artifactLineHeight, `font-size="${artifactFontSize}"`),
    renderFactGrid(normalized, hashLines, factsY, colors),
    renderStamp(640, 770, stampLabel, statusColor, isProven, colors),
    `<line x1="104" y1="888" x2="896" y2="888" stroke="${colors.hairline}" stroke-width="2"/>`,
    `<text x="104" y="922" class="label">TASK TYPE</text>`,
    `<text x="260" y="922" class="mono footer-value">${escapeXml(normalized.task_type)}</text>`,
    `<text x="690" y="922" class="label">SOULBOUND</text>`,
    `<text x="896" y="922" class="mono footer-value" text-anchor="end">SBT</text>`,
    `</svg>`,
  ].join("");
}

function normalizeReceipt(receipt) {
  return {
    receipt_id: valueOrFallback(receipt?.receipt_id ?? receipt?.receiptId, "POP-0000"),
    task_type: valueOrFallback(receipt?.task_type ?? receipt?.taskType, "Unspecified"),
    artifact: valueOrFallback(receipt?.artifact, "Verified artifact"),
    check: valueOrFallback(receipt?.check, "Verification method recorded"),
    verifier: valueOrFallback(receipt?.verifier, "Protocol reviewer"),
    hash: valueOrFallback(receipt?.hash, "sha256:pending"),
    status: valueOrFallback(receipt?.status, "Proven"),
  };
}

function valueOrFallback(value, fallback) {
  const text = String(value ?? "").replace(/\s+/g, " ").trim();
  return text.length > 0 ? text : fallback;
}

function renderDefs(colors) {
  return `<defs>
  <pattern id="receipt-grid" width="64" height="64" patternUnits="userSpaceOnUse">
    <path d="M64 0H0V64" fill="none" stroke="${colors.ink}" stroke-opacity="0.045" stroke-width="1"/>
  </pattern>
  <style>
    .wordmark{font-family:Georgia,'Times New Roman',serif;font-size:32px;font-weight:700;fill:${colors.ink}}
    .artifact{font-family:Georgia,'Times New Roman',serif;font-weight:700;fill:${colors.ink};letter-spacing:0}
    .mono{font-family:Consolas,'Liberation Mono',Menlo,monospace;fill:${colors.ink};letter-spacing:0}
    .id{font-size:31px}
    .eyebrow,.label,.badge-text,.stamp-small{font-family:Arial,Helvetica,sans-serif;font-weight:800;letter-spacing:5px}
    .eyebrow{font-size:15px;fill:${colors.proofRed}}
    .label{font-size:15px;fill:${colors.quiet}}
    .fact-value{font-family:Arial,Helvetica,sans-serif;font-size:24px;font-weight:700;fill:${colors.ink}}
    .fact-mono{font-family:Consolas,'Liberation Mono',Menlo,monospace;font-size:18px;fill:${colors.ink}}
    .badge-text{font-size:17px}
    .sbt-text{font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:800;letter-spacing:1.2px;fill:${colors.quiet}}
    .stamp-small{font-size:18px}
    .footer-value{font-size:20px}
  </style>
</defs>`;
}

function renderProofMark(x, y, size, colors) {
  const cx = x + size / 2;
  const cy = y + size / 2;
  const scale = size / 128;
  return `<g transform="translate(${x} ${y}) scale(${scale})">
    <circle cx="64" cy="64" r="45" fill="none" stroke="${colors.ink}" stroke-width="6"/>
    <circle cx="64" cy="64" r="34" fill="none" stroke="${colors.proofRed}" stroke-width="3"/>
    <path d="M64 12v12M64 104v12M12 64h12M104 64h12M32 32l9 9M87 87l9 9M96 32l-9 9M41 87l-9 9" stroke="${colors.proofRed}" stroke-width="4" stroke-linecap="square"/>
    <rect x="50" y="50" width="28" height="28" fill="${colors.ink}"/>
    <rect x="59" y="59" width="10" height="10" fill="${colors.paper}"/>
    <rect x="62" y="62" width="4" height="4" fill="${colors.proofRed}"/>
  </g>
  <line x1="${cx - 50}" y1="${cy + 72}" x2="${cx + 50}" y2="${cy + 72}" stroke="${colors.hairline}" stroke-width="2"/>`;
}

function renderStatusBadge(x, y, label, color) {
  return `<g>
    <rect x="${x}" y="${y}" width="142" height="48" fill="none" stroke="${color}" stroke-width="2"/>
    <text x="${x + 71}" y="${y + 31}" class="badge-text" fill="${color}" text-anchor="middle">${escapeXml(label)}</text>
  </g>`;
}

function renderSbtBadge(x, y, colors) {
  return `<g>
    <rect x="${x}" y="${y}" width="270" height="45" fill="none" stroke="${colors.ink}" stroke-width="1.5"/>
    <text x="${x + 17}" y="${y + 29}" class="mono" font-size="18">SBT</text>
    <text x="${x + 65}" y="${y + 29}" class="sbt-text">NON-TRANSFERABLE</text>
  </g>`;
}

function renderFactGrid(receipt, hashLines, y, colors) {
  const x = 104;
  const col = 396;
  const row = 118;
  const gap = 0;
  const cells = [
    { label: "ARTIFACT", value: receipt.artifact, className: "fact-value", maxChars: 28 },
    { label: "CHECK", value: receipt.check, className: "fact-value", maxChars: 28 },
    { label: "VERIFIER", value: receipt.verifier, className: "fact-value", maxChars: 28 },
    { label: "HASH", value: hashLines, className: "fact-mono", maxChars: 34 },
  ];

  return `<g>
    ${renderFactCell(x, y, col, row, cells[0], colors)}
    ${renderFactCell(x + col + gap, y, col, row, cells[1], colors)}
    ${renderFactCell(x, y + row, col, row, cells[2], colors)}
    ${renderFactCell(x + col + gap, y + row, col, row, cells[3], colors)}
  </g>`;
}

function renderFactCell(x, y, width, height, cell, colors) {
  const lines = Array.isArray(cell.value) ? cell.value : wrapText(cell.value, cell.maxChars, 2);
  const valueLineHeight = cell.className === "fact-mono" ? 28 : 34;
  return `<g>
    <rect x="${x}" y="${y}" width="${width}" height="${height}" fill="${colors.paper}" fill-opacity="0.82" stroke="${colors.hairline}" stroke-width="1.5"/>
    <text x="${x + 24}" y="${y + 38}" class="label">${escapeXml(cell.label)}</text>
    ${renderTextLines(lines, x + 24, y + 78, cell.className, valueLineHeight)}
  </g>`;
}

function renderStamp(x, y, label, color, isProven, colors) {
  const squareFill = isProven ? color : colors.pending;
  return `<g transform="rotate(-3 ${x + 128} ${y + 52})">
    <rect x="${x}" y="${y}" width="256" height="104" fill="none" stroke="${color}" stroke-width="3"/>
    <rect x="${x + 10}" y="${y + 10}" width="236" height="84" fill="none" stroke="${color}" stroke-width="1.5"/>
    <text x="${x + 128}" y="${y + 41}" class="stamp-small" fill="${color}" text-anchor="middle">${escapeXml(label)}</text>
    <rect x="${x + 112}" y="${y + 58}" width="32" height="32" fill="${squareFill}"/>
    <text x="${x + 128}" y="${y + 80}" class="mono" fill="${colors.paper}" font-size="18" text-anchor="middle">&#x220E;</text>
  </g>`;
}

function renderTextLines(lines, x, y, className, lineHeight, attrs = "") {
  const tspans = lines
    .map((line, index) => {
      const dy = index === 0 ? 0 : lineHeight;
      return `<tspan x="${x}" dy="${dy}">${escapeXml(line)}</tspan>`;
    })
    .join("");
  return `<text x="${x}" y="${y}" class="${className}" ${attrs}>${tspans}</text>`;
}

function wrapText(value, maxChars, maxLines) {
  const words = splitLongWords(valueOrFallback(value, ""), maxChars);
  const lines = [];
  let current = "";

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length <= maxChars) {
      current = candidate;
      continue;
    }

    if (current) {
      lines.push(current);
    }
    current = word;

    if (lines.length === maxLines) {
      break;
    }
  }

  if (current && lines.length < maxLines) {
    lines.push(current);
  }

  if (lines.length === 0) {
    lines.push("");
  }

  if (words.join(" ").length > lines.join(" ").length && lines.length > 0) {
    const last = lines.length - 1;
    lines[last] = `${lines[last].slice(0, Math.max(0, maxChars - 3)).trimEnd()}...`;
  }

  return lines;
}

function splitLongWords(value, maxChars) {
  const words = String(value).replace(/\s+/g, " ").trim().split(" ").filter(Boolean);
  const chunks = [];

  for (const word of words) {
    if (word.length <= maxChars) {
      chunks.push(word);
      continue;
    }

    for (let index = 0; index < word.length; index += maxChars) {
      chunks.push(word.slice(index, index + maxChars));
    }
  }

  return chunks;
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
