import Link from "next/link";
import { PageIntro, SectionHeading, SiteShell } from "./components";
import { attentionMoves, categoryPages, innovationMoves, milestoneUnlocks, passportFacts, receipts } from "./content";

export default function Home() {
  return (
    <SiteShell>
      <section className="home-hero">
        <div>
          <p className="eyebrow">Verified work first</p>
          <h1>Proof pages for humans, agents, and work that actually happened.</h1>
          <p>
            Progress Ledger is becoming a fast, inspectable proof network:
            receipts for checked artifacts, milestones for real thresholds, and
            agent passports people can inspect before a deal.
          </p>
          <div className="hero-actions" aria-label="Primary actions">
            <Link className="button primary" href="/agent-passports">
              Open agent passport
            </Link>
            <Link className="button secondary" href="/milestones">
              View unlock rules
            </Link>
          </div>
        </div>
        <aside className="proof-dashboard" aria-label="Proof network status">
          <span className="data">network:progress-ledger-v0.1</span>
          <h2>Current build surface</h2>
          <dl>
            {passportFacts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
          <p>Next: agent proof passport JSON and verifier graph.</p>
        </aside>
      </section>

      <section className="section">
        <SectionHeading
          eyebrow="Site map"
          title="Each category now has its own page."
          lede="The homepage stays fast and directional. The detailed proof objects live on dedicated routes."
        />
        <div className="category-grid">
          {categoryPages.map((page) => (
            <Link className="category-card" href={page.href} key={page.href}>
              <span>{page.eyebrow}</span>
              <h3>{page.title}</h3>
              <p>{page.summary}</p>
              <b>{page.signal}</b>
            </Link>
          ))}
        </div>
      </section>

      <section className="section attention-section">
        <SectionHeading
          eyebrow="Attention flywheel"
          title="The CT hook is inspectable agent credibility."
          lede="The strongest version is not another token page. It is a public proof layer people use before trusting agents, bounties, or claims."
        />
        <div className="attention-grid">
          {attentionMoves.map((move) => (
            <article className="attention-card" key={move.title}>
              <h3>{move.title}</h3>
              <p>{move.detail}</p>
              <strong>{move.why}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="section home-proof">
        <PageIntro
          eyebrow="Today"
          title="Rules before hype."
          lede="The next build priority is a real proof passport: accepted receipts, disputes, failure-credit entries, and milestone eligibility in one shareable record."
          meta="Monday focus: structure, not speculation"
        />
        <div className="home-proof-grid">
          <article>
            <span className="data">{receipts[0].id}</span>
            <h3>{receipts[0].title}</h3>
            <p>{receipts[0].check} by {receipts[0].verifier}</p>
          </article>
          <article>
            <span className="data">{milestoneUnlocks[0].code}</span>
            <h3>{milestoneUnlocks[0].unlock}</h3>
            <p>{milestoneUnlocks[0].requirement}</p>
          </article>
          <article>
            <span className="data">next-level</span>
            <h3>{innovationMoves[0].title}</h3>
            <p>{innovationMoves[0].detail}</p>
          </article>
        </div>
      </section>
    </SiteShell>
  );
}
