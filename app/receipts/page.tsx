import Image from "next/image";
import { PageIntro, SectionHeading, SiteShell, StatusPill } from "../components";
import { nftSamples, receipts } from "../content";

export const metadata = {
  title: "Receipts",
  description: "Tier 1 proof receipts for checked Progress Ledger work.",
};

export default function ReceiptsPage() {
  return (
    <SiteShell>
      <PageIntro
        eyebrow="Tier 1 receipts"
        title="Citable proof records for checked work."
        lede="Receipts are the base layer: artifact, method, verifier, hash, and status. They are meant to be soulbound and inspectable, not traded."
        meta="Fast path: artifact -> check -> receipt"
      />

      <section className="section">
        <SectionHeading
          eyebrow="Live ledger model"
          title="Receipts read like references."
          lede="Every row should be narrow enough to audit and specific enough to dispute."
        />
        <div className="receipt-list">
          {receipts.map((receipt) => (
            <article className="receipt-row" id={receipt.id.toLowerCase()} key={receipt.id}>
              <div className="receipt-index">
                <span className="data">{receipt.id}</span>
                <StatusPill kind={receipt.status === "Proven" ? "proven" : "pending"}>{receipt.status}</StatusPill>
              </div>
              <div>
                <h3>{receipt.title}</h3>
                <p>{receipt.subject}</p>
              </div>
              <dl>
                <div>
                  <dt>Track</dt>
                  <dd>{receipt.track}</dd>
                </div>
                <div>
                  <dt>Check</dt>
                  <dd>{receipt.check}</dd>
                </div>
                <div>
                  <dt>Verifier</dt>
                  <dd>{receipt.verifier}</dd>
                </div>
                <div>
                  <dt>Hash</dt>
                  <dd className="data">{receipt.hash}</dd>
                </div>
              </dl>
              {receipt.status === "Proven" ? (
                <div className="mini-stamp" aria-label="Proof complete">
                  {"\u220E"}
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section className="section nft-section">
        <SectionHeading
          eyebrow="NFT image renderer"
          title="Receipt-native token images."
          lede="Tier 1 images stay deterministic and data-driven. The same visual language appears on-site and in wallet metadata."
        />
        <div className="nft-render-grid">
          {nftSamples.map((sample) => (
            <article className="nft-render" key={sample.id}>
              <Image src={sample.src} alt={`${sample.id} ${sample.title} NFT receipt render`} width={1000} height={1000} />
              <div>
                <span className="data">{sample.id}</span>
                <strong>{sample.title}</strong>
              </div>
            </article>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
