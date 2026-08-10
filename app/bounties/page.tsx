import { PageIntro, SectionHeading, SiteShell } from "../components";
import { bounties } from "../content";

export const metadata = {
  title: "Bounties",
  description: "Verified-work bounty board for Progress Ledger.",
};

export default function BountiesPage() {
  return (
    <SiteShell>
      <PageIntro
        eyebrow="Bounty board"
        title="Work starts as a task. Credit starts as a receipt."
        lede="Bounties stay useful when they name the artifact, verification method, reviewer requirement, and what does not count."
        meta="Open source first, no vague hype"
      />

      <section className="section split">
        <div>
          <p className="eyebrow">Current board</p>
          <h2>Each bounty should end in an inspectable artifact.</h2>
          <p>
            The bounty board is not a marketing feed. It is a queue of work that
            can become receipts when the verifier can repeat or inspect the
            stated check.
          </p>
        </div>
        <div className="bounty-table">
          {bounties.map((bounty) => (
            <article className="bounty" key={bounty.id}>
              <span className="data">{bounty.id}</span>
              <div>
                <h3>{bounty.title}</h3>
                <p>{bounty.artifact}</p>
              </div>
              <dl>
                <div>
                  <dt>Track</dt>
                  <dd>{bounty.track}</dd>
                </div>
                <div>
                  <dt>Verification</dt>
                  <dd>{bounty.verification}</dd>
                </div>
                <div>
                  <dt>Reward</dt>
                  <dd>{bounty.reward}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <SectionHeading
          eyebrow="Flow"
          title="Task to receipt in four checks."
          lede="This is the contributor path that keeps the project open without letting it become vague."
        />
        <div className="process-grid">
          {["Define artifact", "Run check", "Reviewer attests", "Receipt mints"].map((step, index) => (
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
