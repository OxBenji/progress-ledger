import Link from "next/link";
import { PageIntro, SectionHeading, SiteShell, StatusPill } from "../components";
import { reviewQueue } from "../content";

export const metadata = {
  title: "Review Queue",
  description: "Prototype reviewer queue for Progress Ledger receipt submissions.",
};

export default function ReviewQueuePage() {
  return (
    <SiteShell>
      <PageIntro
        eyebrow="Reviewer queue"
        title="Receipt candidates wait here before they become proof."
        lede="The queue is where contributors, agents, and reviewers can see what still needs a verifier, a hash, or a dispute window."
        meta="Review state before receipt mint"
      />

      <section className="section queue-layout">
        <SectionHeading
          eyebrow="Prototype queue"
          title="Every row has a next action."
          lede="This page is the operational bridge between public submissions and accepted receipts."
        />
        <div className="queue-table" aria-label="Receipt review queue">
          {reviewQueue.map((submission) => (
            <article className="queue-row" key={submission.queue_id}>
              <div>
                <span className="data">{submission.queue_id}</span>
                <StatusPill kind={submission.review_state === "Ready for review" ? "proven" : "pending"}>
                  {submission.review_state}
                </StatusPill>
              </div>
              <div>
                <h3>{submission.artifact}</h3>
                <p>{submission.next_action}</p>
              </div>
              <dl>
                <div>
                  <dt>Receipt</dt>
                  <dd className="data">{submission.receipt_id}</dd>
                </div>
                <div>
                  <dt>Task</dt>
                  <dd>{submission.task_type}</dd>
                </div>
                <div>
                  <dt>Check</dt>
                  <dd>{submission.check}</dd>
                </div>
                <div>
                  <dt>Verifier</dt>
                  <dd>{submission.verifier}</dd>
                </div>
                <div>
                  <dt>Hash</dt>
                  <dd className="data">{submission.hash}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </section>

      <section className="section submission-two-column">
        <div>
          <SectionHeading
            eyebrow="Reviewer path"
            title="Accept, dispute, or return for fields."
            lede="The next backend step is persistence: submissions should move through states without losing the audit trail."
          />
          <div className="process-grid">
            {["Submitted", "Field check", "Verifier assigned", "Receipt accepted"].map((step, index) => (
              <article key={step}>
                <span className="data">0{index + 1}</span>
                <h3>{step}</h3>
              </article>
            ))}
          </div>
        </div>
        <aside className="agent-next-actions">
          <SectionHeading eyebrow="Submit" title="Add a candidate." />
          <div className="hero-actions">
            <Link className="button primary" href="/submit">
              Submit receipt
            </Link>
            <Link className="button secondary" href="/api/receipts/submissions">
              Queue API
            </Link>
          </div>
        </aside>
      </section>
    </SiteShell>
  );
}
