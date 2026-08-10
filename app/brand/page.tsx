import Image from "next/image";
import { PageIntro, SiteShell } from "../components";
import { markConcepts } from "../content";

export const metadata = {
  title: "Brand",
  description: "Proof of Progress brand mark studies and final Q.E.D. seal.",
};

export default function BrandPage() {
  return (
    <SiteShell>
      <PageIntro
        eyebrow="Brand system"
        title="Formal proof journal, digitized."
        lede="The mark should feel like a proof has been checked and closed: official, precise, and useful at favicon or hero scale."
        meta="Q.E.D. seal selected"
      />

      <section className="section mark-section">
        <div className="section-kicker">
          <p className="eyebrow">Mark studies</p>
          <h2>Four directions, one final seal.</h2>
        </div>
        <div className="concept-grid">
          {markConcepts.map((concept) => (
            <article className="concept" key={concept.id}>
              <Image src={`/brand/${concept.id}.svg`} alt={`${concept.title} logo concept`} width={150} height={150} />
              <div>
                <span>{concept.verdict}</span>
                <h3>{concept.title}</h3>
                <p>{concept.note}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="recommendation">
          <Image src="/brand/proof-wordmark.svg" alt="Proof of Progress wordmark lockup" width={960} height={260} />
          <p>
            The Q.E.D. seal is the strongest mark: it survives favicon size,
            has the seriousness of an official stamp, and ties directly to the
            mathematical end-of-proof square without becoming ornate.
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
