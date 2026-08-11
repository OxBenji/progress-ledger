import Image from "next/image";
import Link from "next/link";
import { navigation } from "./content";

type PageIntroProps = {
  eyebrow: string;
  title: React.ReactNode;
  lede: string;
  meta?: string;
};

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  lede?: string;
};

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <main id="top">
      <SiteHeader />
      {children}
      <SiteFooter />
    </main>
  );
}

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand-lockup" href="/" aria-label="Proof of Progress home">
        <Image src="/brand/proof-mark.svg" alt="" className="brand-mark" width={38} height={38} priority />
        <span>Proof of Progress</span>
      </Link>
      <nav className="nav-links" aria-label="Primary navigation">
        {navigation.map((item) => (
          <Link href={item.href} key={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
      <a className="header-link" href="https://github.com/OxBenji/progress-ledger" target="_blank" rel="noreferrer">
        GitHub
      </a>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="footer">
      <Image src="/brand/proof-mark-accent.svg" alt="" width={44} height={44} />
      <div>
        <strong>Proof of Progress</strong>
        <p>Issued by Progress Ledger. Verified work first.</p>
      </div>
      <a href="#top">Back to top</a>
    </footer>
  );
}

export function PageIntro({ eyebrow, title, lede, meta }: PageIntroProps) {
  return (
    <section className="page-intro">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p>{lede}</p>
      {meta ? <span className="page-meta data">{meta}</span> : null}
    </section>
  );
}

export function SectionHeading({ eyebrow, title, lede }: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        {lede ? <p>{lede}</p> : null}
      </div>
    </div>
  );
}

export function StatusPill({ children, kind = "proven" }: { children: React.ReactNode; kind?: "proven" | "pending" }) {
  return <span className={`status ${kind}`}>{children}</span>;
}
