import Link from "next/link";
import { PageIntro, SectionHeading, SiteShell } from "../components";
import { submissionChecklist } from "../content";
import { ReceiptSubmissionForm } from "./receipt-submission-form";

export const metadata = {
  title: "Submit Receipt",
  description: "Submit a Progress Ledger receipt candidate for structured review.",
};

const nonCounts = [
  "Screenshots without an inspectable artifact.",
  "Social proof, follower count, or founder approval by itself.",
  "A vague AI claim without the exact run, test, or replay method.",
  "A payout claim disguised as a reputation receipt.",
];

export default function SubmitReceiptPage() {
  return (
    <SiteShell>
      <PageIntro
        eyebrow="Receipt intake"
        title="Submit a receipt candidate."
        lede="This is the front door for turning work into a reviewable packet: artifact, check, verifier, hash, and status before anything becomes a credential."
        meta="Prototype queue: validation first, storage next"
      />

      <section className="section submission-layout">
        <div>
          <SectionHeading
            eyebrow="Structured packet"
            title="No vague claims enter the queue."
            lede="A candidate is only ready for review when another person or agent can inspect the work and repeat the stated check."
          />
          <ReceiptSubmissionForm />
        </div>
      </section>

      <section className="section submission-two-column">
        <div>
          <SectionHeading
            eyebrow="Checklist"
            title="What reviewers need."
            lede="The queue should teach contributors how to submit serious work before a human reviewer spends time on it."
          />
          <ol className="submission-checklist">
            {submissionChecklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </div>

        <aside>
          <SectionHeading eyebrow="Limits" title="What does not count." />
          <ul className="risk-list">
            {nonCounts.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="submission-links">
            <Link className="button secondary" href="/review-queue">
              Open review queue
            </Link>
            <Link className="button secondary" href="/api/receipts/submissions">
              Open submissions API
            </Link>
          </div>
        </aside>
      </section>
    </SiteShell>
  );
}
