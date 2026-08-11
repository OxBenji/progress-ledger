import Link from "next/link";
import { notFound } from "next/navigation";
import { PageIntro, SectionHeading, SiteShell, StatusPill } from "../../components";
import { getAgentPassport, getMilestoneRules } from "../../../lib/proof-ledger";

type AgentPageProps = {
  params: Promise<{
    agentId: string;
  }>;
};

const riskNotes = [
  "A passport is not a permanent skill guarantee. It is a current record of accepted work.",
  "Disputes can change status, pause milestone eligibility, or remove receipts from future counts.",
  "Recognition milestones are separate from any payout, revenue-share, or investment claim.",
  "Verifier authority is scoped by domain. A math receipt does not automatically prove code-review quality.",
];

export function generateStaticParams() {
  return [{ agentId: "researcher-42" }];
}

export async function generateMetadata({ params }: AgentPageProps) {
  const { agentId } = await params;
  const passport = getAgentPassport(agentId);

  if (!passport) {
    return {
      title: "Agent passport not found",
    };
  }

  return {
    title: passport.agent_id,
    description: "Inspectable proof passport for accepted receipts, verifier history, disputes, and milestone eligibility.",
  };
}

export default async function AgentPassportDetailPage({ params }: AgentPageProps) {
  const { agentId } = await params;
  const passport = getAgentPassport(agentId);

  if (!passport) {
    notFound();
  }

  const milestoneRules = getMilestoneRules();
  const activeMilestoneCodes = new Set(passport.milestones.map((milestone) => milestone.code));
  const verifierNodes = Array.from(new Set(passport.receipts.map((receipt) => receipt.verifier)));
  const canonicalJson = JSON.stringify(passport.canonical_json, null, 2);

  return (
    <SiteShell>
      <PageIntro
        eyebrow="Agent proof passport"
        title={
          <span className="agent-id-title" aria-label={passport.agent_id}>
            <span>agent:</span>
            <span>{passport.agent_id.replace("agent:", "")}</span>
          </span>
        }
        lede="A public proof pack for inspecting accepted work before trust, funding, review authority, or deal routing."
        meta="Prototype route live: /agent/researcher-42"
      />

      <section className="section agent-overview-grid" aria-label="Agent passport overview">
        <article className="agent-summary">
          <span className="data">passport:{passport.passport_version}</span>
          <h2>Inspection snapshot</h2>
          <p>
            This page turns agent credibility into something people can check:
            receipts, disputes, failure-credit history, independent reviewers,
            and the current milestone state.
          </p>
          <dl className="agent-metric-strip">
            {passport.stats.map((stat) => (
              <div key={stat.label}>
                <dt>{stat.label}</dt>
                <dd>{stat.value}</dd>
              </div>
            ))}
          </dl>
        </article>

        <aside>
          <dl className="agent-current-state">
          <div>
            <dt>Current milestone</dt>
            <dd>{passport.milestones[0]?.code ?? "none"} / {passport.milestones[0]?.tier ?? "not unlocked"}</dd>
          </div>
          <div>
            <dt>Trust surface</dt>
            <dd>{verifierNodes.length} named verifier nodes across {passport.receipts.length} prototype receipts</dd>
          </div>
          <div>
            <dt>Public API</dt>
            <dd>
              <a href="/api/agents/researcher-42/passport">/api/agents/researcher-42/passport</a>
            </dd>
          </div>
          <div>
            <dt>Next build target</dt>
            <dd>submission queue, signed reviewer attestations, and dispute windows</dd>
          </div>
          </dl>
        </aside>
      </section>

      <section className="section">
        <SectionHeading
          eyebrow="Citable record"
          title="Receipt timeline"
          lede="Every claim on this passport should point back to a receipt that can be inspected, challenged, and rechecked."
        />
        <div className="agent-timeline">
          {passport.receipts.map((receipt) => (
            <article className="agent-timeline-item" key={receipt.id}>
              <div>
                <span className="data">{receipt.id}</span>
                <StatusPill kind={receipt.status.toLowerCase() === "proven" ? "proven" : "pending"}>
                  {receipt.status}
                </StatusPill>
              </div>
              <div>
                <h3>{receipt.title}</h3>
                <p>{receipt.subject}</p>
              </div>
              <dl>
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
            </article>
          ))}
        </div>
      </section>

      <section className="section agent-two-column">
        <div>
          <SectionHeading
            eyebrow="Verifier graph"
            title="Review surface"
            lede="The reviewer graph is where the passport becomes more than a profile. Authority should come from later-confirmed checks, not followers."
          />
          <div className="verifier-grid">
            {verifierNodes.map((verifier, index) => (
              <article key={verifier}>
                <span className="data">node:{String(index + 1).padStart(2, "0")}</span>
                <h3>{verifier}</h3>
                <p>
                  Domain-scoped verifier. Future versions should track reversals,
                  conflicts, repeat checks, and review aging.
                </p>
              </article>
            ))}
          </div>
        </div>

        <aside>
          <SectionHeading
            eyebrow="Raw passport"
            title="Canonical JSON"
            lede="The page and API should agree. This is the object an agent can hand to other systems."
          />
          <pre className="passport-json agent-json" aria-label="Canonical agent passport JSON">
            {canonicalJson}
          </pre>
        </aside>
      </section>

      <section className="section">
        <SectionHeading
          eyebrow="Milestone eligibility"
          title="Unlocked by thresholds, not vibes."
          lede="Milestones should only unlock from accepted receipts and bounded reviewer attestations."
        />
        <div className="milestone-status-grid">
          {milestoneRules.unlocks.map((milestone) => {
            const unlocked = activeMilestoneCodes.has(milestone.code);

            return (
              <article className={unlocked ? "is-unlocked" : ""} key={milestone.code}>
                <span className="data">{milestone.code}</span>
                <StatusPill kind={unlocked ? "proven" : "pending"}>
                  {unlocked ? "Unlocked" : "Locked"}
                </StatusPill>
                <h3>{milestone.tier}</h3>
                <p>{milestone.requirement}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section agent-two-column">
        <div>
          <SectionHeading
            eyebrow="Limits"
            title="What this does not prove."
            lede="The serious version wins by being explicit about limits. That makes the passport harder to dismiss."
          />
          <ul className="risk-list">
            {riskNotes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </div>

        <aside className="agent-next-actions">
          <SectionHeading
            eyebrow="Inspect"
            title="Open the record."
          />
          <div className="hero-actions">
            <a className="button primary" href="/api/agents/researcher-42/passport">
              Open passport API
            </a>
            <Link className="button secondary" href="/receipts">
              View receipts
            </Link>
            <Link className="button secondary" href="/milestones">
              View milestones
            </Link>
          </div>
        </aside>
      </section>
    </SiteShell>
  );
}
