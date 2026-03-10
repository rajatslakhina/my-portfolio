// components/sections/AboutSection.tsx
import { PROFILE_SUMMARY } from "@/constants";
import SectionWrapper from "../shared/SectionWrapper";
import { CheckCircle } from "lucide-react";
import React from "react";

const formatMarkdownBold = (text: string): React.ReactNode[] =>
  text.split(/\*\*(.*?)\*\*/g).map((part, i) =>
    i % 2 === 1 ? <strong key={i} className="font-semibold text-foreground">{part}</strong> : part
  );

const STATS = [
  { value: "9+",   label: "Years Experience",  color: "text-primary",   border: "border-primary/20",  bg: "bg-primary/5" },
  { value: "10+",  label: "Apps Shipped",       color: "text-secondary", border: "border-secondary/20",bg: "bg-secondary/5" },
  { value: "5+",   label: "Enterprise Clients", color: "text-accent",    border: "border-accent/20",   bg: "bg-accent/5" },
  { value: "100%", label: "Passion for Mobile", color: "text-primary",   border: "border-primary/20",  bg: "bg-primary/5" },
];

const AboutSection = () => (
  <SectionWrapper id="about">
    {/* Heading */}
    <div className="mb-16 flex flex-col items-center gap-2">
      <span className="font-mono-accent text-xs font-semibold uppercase tracking-[0.25em] text-primary">{/* about me */}
      </span>
      <h2 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl">
        Who{" "}
        <span className="text-gradient font-serif italic">I Am</span>
      </h2>
    </div>

    {/* Stats row */}
    <div className="mb-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
      {STATS.map((s) => (
        <div key={s.label} className={`glass-card rounded-xl border p-5 text-center ${s.border} ${s.bg}`}>
          <p className={`font-mono text-3xl font-black ${s.color}`}>{s.value}</p>
          <p className="mt-1 font-mono-accent text-xs text-muted-foreground">{s.label}</p>
        </div>
      ))}
    </div>

    {/* Content grid */}
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
      <div>
        <h3 className="mb-6 text-2xl font-bold text-foreground">{PROFILE_SUMMARY.title}</h3>
        <div className="space-y-4 text-base leading-7 text-muted-foreground">
          {PROFILE_SUMMARY.description.map((text, i) => (
            <p key={i}>{formatMarkdownBold(text)}</p>
          ))}
        </div>
      </div>
      <div>
        <h3 className="mb-6 text-2xl font-bold text-foreground">Core Competencies</h3>
        <ul className="space-y-3">
          {PROFILE_SUMMARY.coreCompetencies.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
              <span className="text-sm text-muted-foreground">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </SectionWrapper>
);

export default AboutSection;
