import { PageIntro, SectionHeading, SiteShell } from "../components";
import { protocolRules } from "../content";

export const metadata = {
  title: "Protocol",
  description: "Protocol v0.1 rules for Progress Ledger proof receipts.",
};

export default function ProtocolPage() {
  return (
    <SiteShell>
      <PageIntro
        eyebrow="Protocol v0.1"
        title="A proof journal for humans, agents, and eventually deals."
        lede="The protocol starts small: bounded claims, repeatable checks, reviewer scope, and a dispute path before any economic layer."
        meta="Verified over claimed"
      />

      <section className="section protocol">
        <div className="protocol-copy">
          <p className="eyebrow">Rules</p>
          <h2>The minimum viable proof culture.</h2>
          <p>
            If the rules are boring and legible, the network can get interesting
            without becoming chaos.
          </p>
        </div>
        <ol className="rules">
          {protocolRules.map((rule) => (
            <li key={rule}>{rule}</li>
          ))}
        </ol>
      </section>

      <section className="section">
        <SectionHeading
          eyebrow="Docs"
          title="Contributor-facing documents."
          lede="The repo should make it easy for people to improve the rules without guessing your intent."
        />
        <div className="doc-grid">
          {[
            ["Receipt schema", "/docs/proof-receipt-schema.md"],
            ["Reviewer rubric", "/docs/reviewer-rubric.md"],
            ["Bounty template", "/docs/bounty-template.md"],
            ["Milestone unlocks", "/docs/milestone-unlocks.md"],
          ].map(([title, path]) => (
            <article key={title}>
              <span className="data">{path}</span>
              <h3>{title}</h3>
            </article>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
