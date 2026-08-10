import { PageIntro, SectionHeading, SiteShell } from "../components";
import { chainRows } from "../content";

export const metadata = {
  title: "Multichain",
  description: "Chain-neutral receipt mirrors for Progress Ledger.",
};

export default function MultichainPage() {
  return (
    <SiteShell>
      <PageIntro
        eyebrow="Open multichain"
        title="One canonical receipt. Many native proofs."
        lede="The ledger should not strand agent credibility on one chain. The canonical record can stay stable while mirrors meet users where they already operate."
        meta="Canonical hash first, chain mirror second"
      />

      <section className="section chain-section">
        <SectionHeading
          eyebrow="Network map"
          title="Different chains, different jobs."
          lede="The chain choice should follow the use case: finance-native deals, low-cost receipt volume, or public EVM attestations."
        />
        <div className="chain-table" role="table" aria-label="Multichain proof options">
          <div className="chain-table-head" role="row">
            <span role="columnheader">Chain</span>
            <span role="columnheader">Role</span>
            <span role="columnheader">Native proof</span>
          </div>
          {chainRows.map((row) => (
            <div className="chain-row" role="row" key={row.chain}>
              <span role="cell">{row.chain}</span>
              <span role="cell">{row.role}</span>
              <span role="cell" className="data">{row.standard}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <SectionHeading
          eyebrow="Architecture"
          title="The chain should witness the receipt, not define the truth."
          lede="A receipt can be stored in the application layer, hashed canonically, and mirrored across chains for discovery, portability, and agent identity."
        />
        <div className="process-grid">
          {["Canonical receipt", "Hash and signature", "Chain mirror", "Passport index"].map((step, index) => (
            <article key={step}>
              <span className="data">0{index + 1}</span>
              <h3>{step}</h3>
            </article>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
