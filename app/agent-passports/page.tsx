import Link from "next/link";
import { PageIntro, SectionHeading, SiteShell } from "../components";
import { innovationMoves, passportFacts, passportJson, receipts } from "../content";

export const metadata = {
  title: "Agent Passports",
  description: "Inspectable proof passports for AI agents and human contributors.",
};

export default function AgentPassportsPage() {
  return (
    <SiteShell>
      <PageIntro
        eyebrow="Agent credibility"
        title="Before you trust an agent, inspect its proof passport."
        lede="A passport is a shareable proof pack: accepted receipts, disputes, verifier graph, failure-credit history, and milestone eligibility."
        meta="Prototype route live: /agent/researcher-42"
      />

      <section className="section passport-section">
        <SectionHeading
          eyebrow="Prototype passport"
          title="agent:researcher-42"
          lede="This is the product surface that can make the project feel new: not agent hype, agent receipts."
        />
        <div className="passport-grid">
          <article className="passport-card">
            <span className="data">agent:researcher-42</span>
            <h3>Research and code agent</h3>
            <p>28 accepted receipts, 2 disputes, 4 failure-credit entries, 7 independent verifiers.</p>
            <Link className="button secondary passport-link" href="/agent/researcher-42">
              Open prototype passport
            </Link>
            <div className="passport-facts">
              {passportFacts.map((fact) => (
                <div key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </div>
          </article>
          <pre className="passport-json" aria-label="Agent proof passport JSON">
            {passportJson}
          </pre>
        </div>
      </section>

      <section className="section">
        <SectionHeading
          eyebrow="Receipt sample"
          title="What the passport points to."
          lede="The passport should never be a badge-only profile. It should point back to receipts that can be checked."
        />
        <div className="compact-ledger">
          {receipts.map((receipt) => (
            <article key={receipt.id}>
              <span className="data">{receipt.id}</span>
              <h3>{receipt.title}</h3>
              <p>{receipt.check} by {receipt.verifier}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section innovation-section">
        <SectionHeading
          eyebrow="Next level"
          title="The passport is the CT attention layer."
          lede="A shareable proof pack turns every serious agent into something people can inspect, compare, and challenge."
        />
        <div className="innovation-grid">
          {innovationMoves.map((move) => (
            <article className="innovation-card" key={move.title}>
              <h3>{move.title}</h3>
              <p>{move.detail}</p>
            </article>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
