import Image from "next/image";
import { PageIntro, SectionHeading, SiteShell } from "../components";
import { milestoneGuardrails, milestoneMarks, milestoneUnlocks } from "../content";

export const metadata = {
  title: "Milestones",
  description: "Tier 2 milestone unlock rules for Progress Ledger.",
};

export default function MilestonesPage() {
  return (
    <SiteShell>
      <PageIntro
        eyebrow="Tier 2 milestones"
        title="Rare marks that unlock from the receipt graph."
        lede="The art is visible, but the unlock rule is the point. Milestones are not random collectibles; they are earned from accepted Tier 1 receipts."
        meta="Scarcity source: accepted proof thresholds"
      />

      <section className="section milestone-section">
        <SectionHeading
          eyebrow="Milestone art"
          title="A restrained tier ladder."
          lede="Base is quiet, Contributor is richer, Top Verifier is the highest audit authority mark."
        />
        <div className="milestone-grid">
          {milestoneMarks.map((mark) => (
            <article className="milestone-card" key={mark.id}>
              <a href={mark.full} target="_blank" rel="noreferrer" aria-label={`Open full resolution ${mark.title} art`}>
                <Image src={mark.src} alt={`${mark.title} medallion mark`} width={900} height={900} />
              </a>
              <div>
                <span className="data">{mark.id}</span>
                <strong>{mark.title}</strong>
                <p>{mark.note}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section unlock-section">
        <SectionHeading
          eyebrow="Unlock rules"
          title="Not collectibles first. Verified thresholds first."
          lede="Milestones only mint when accepted receipts cross a defined threshold."
        />
        <div className="unlock-table">
          {milestoneUnlocks.map((item) => (
            <article className="unlock-row" key={item.code}>
              <div>
                <span className="data">{item.code}</span>
                <h3>{item.tier}</h3>
                <p>{item.unlock}</p>
              </div>
              <dl>
                <div>
                  <dt>Unlock requirement</dt>
                  <dd>{item.requirement}</dd>
                </div>
                <div>
                  <dt>What it proves</dt>
                  <dd>{item.proves}</dd>
                </div>
                <div>
                  <dt>What it does not promise</dt>
                  <dd>{item.not}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
        <div className="guardrail-panel" aria-label="Milestone guardrails">
          {milestoneGuardrails.map((rule) => (
            <p key={rule}>{rule}</p>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
