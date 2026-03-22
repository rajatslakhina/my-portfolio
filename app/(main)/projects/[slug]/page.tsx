import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Tag } from "lucide-react";
import { CASE_STUDIES, getCaseStudy } from "@/data/case-studies";
import type { Metadata } from "next";

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return CASE_STUDIES.map(c => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return {};
  return { title: cs.title, description: cs.tagline };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  if (cs.stub) {
    return (
      <div className="relative min-h-screen py-24">
        <div className="relative z-10 container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Link href="/#projects" className="mb-8 flex items-center gap-2 font-mono-accent text-[10px] uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-3 w-3" /> Back to Projects
          </Link>
          <div className="border border-primary/15 bg-card/40 p-12 text-center"
            style={{ clipPath: "polygon(0 0,calc(100% - 14px) 0,100% 14px,100% 100%,14px 100%,0 calc(100% - 14px))" }}>
            <p className="font-mono-accent text-[10px] uppercase tracking-widest text-primary/50 mb-4">Case Study</p>
            <h1 className="text-3xl font-extrabold mb-3">{cs.title}</h1>
            <p className="text-muted-foreground mb-6">{cs.tagline}</p>
            <p className="text-sm text-muted-foreground/60">Full case study coming soon.</p>
            {cs.liveUrl && (
              <a href={cs.liveUrl} target="_blank" rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 border border-primary/30 bg-primary/10 px-4 py-2 font-mono-accent text-[10px] uppercase tracking-widest text-primary hover:border-primary/60 transition-all">
                <ExternalLink className="h-3 w-3" /> View on App Store
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen py-24">
      <div className="absolute inset-0 bg-grid-fine pointer-events-none opacity-20" />
      <div className="relative z-10 container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">

        <Link href="/#projects" className="mb-10 flex items-center gap-2 font-mono-accent text-[10px] uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="h-3 w-3" /> Back to Projects
        </Link>

        {/* Header */}
        <div className="mb-12 border-l-2 border-primary pl-6">
          <p className="font-mono-accent text-[10px] uppercase tracking-widest text-primary/60 mb-2">
            {cs.domain} · {cs.company} · {cs.duration}
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-3">{cs.title}</h1>
          <p className="text-lg text-muted-foreground mb-4">{cs.tagline}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {cs.tags.map(t => (
              <span key={t} className="flex items-center gap-1 font-mono-accent text-[9px] uppercase tracking-wider text-primary/70 border border-primary/20 bg-primary/8 px-2 py-0.5">
                <Tag className="h-2.5 w-2.5" />{t}
              </span>
            ))}
          </div>
          {cs.liveUrl && (
            <a href={cs.liveUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-primary/30 bg-primary/10 px-4 py-2 font-mono-accent text-[10px] uppercase tracking-widest text-primary hover:border-primary/60 transition-all">
              <ExternalLink className="h-3 w-3" /> View on App Store
            </a>
          )}
        </div>

        {/* Sections */}
        {[
          { label: "Overview",     body: cs.overview },
          { label: "The Problem",  body: cs.problem },
          { label: "The Solution", body: cs.solution },
          { label: "Architecture", body: cs.architecture },
        ].map(({ label, body }) => body ? (
          <div key={label} className="mb-10">
            <h2 className="font-mono-accent text-[11px] uppercase tracking-[0.3em] text-primary/60 mb-3">{label}</h2>
            <p className="text-[15px] leading-[1.85] text-foreground/85">{body}</p>
          </div>
        ) : null)}

        {/* Outcomes */}
        {cs.outcomes.length > 0 && (
          <div className="mb-10">
            <h2 className="font-mono-accent text-[11px] uppercase tracking-[0.3em] text-primary/60 mb-4">Outcomes</h2>
            <div className="flex flex-col gap-3">
              {cs.outcomes.map((o, i) => (
                <div key={i} className="flex items-start gap-3 border border-primary/15 bg-primary/5 p-4"
                  style={{ clipPath: "polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px))" }}>
                  <span className="font-mono-accent text-primary text-lg font-black leading-none mt-0.5">{String(i + 1).padStart(2, "0")}</span>
                  <p className="text-sm leading-relaxed text-foreground/85">{o}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <Link href="/#projects" className="mt-4 flex items-center gap-2 font-mono-accent text-[10px] uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="h-3 w-3" /> Back to Projects
        </Link>
      </div>
    </div>
  );
}
