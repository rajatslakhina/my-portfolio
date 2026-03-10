// components/sections/AboutSection.tsx
"use client";

import { PROFILE_SUMMARY } from "@/constants";
import SectionWrapper from "../shared/SectionWrapper";
import { CheckCircle } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";

const formatMarkdownBold = (text: string): React.ReactNode[] =>
  text.split(/\*\*(.*?)\*\*/g).map((part, i) =>
    i % 2 === 1 ? <strong key={i} className="font-semibold text-foreground">{part}</strong> : part
  );

const STATS = [
  { value: "10+", num: 10, label: "Years Experience",  color: "text-primary",   border: "border-primary/20",   bg: "bg-primary/5",   glow: "group-hover:shadow-neon-primary" },
  { value: "10+", num: 10, label: "Apps Shipped",       color: "text-secondary", border: "border-secondary/20", bg: "bg-secondary/5", glow: "group-hover:shadow-neon-secondary" },
  { value: "5+",  num: 5,  label: "Enterprise Clients", color: "text-accent",    border: "border-accent/20",    bg: "bg-accent/5",    glow: "group-hover:shadow-[0_0_20px_hsl(var(--accent)/0.6)]" },
  { value: "100%",num: 100,label: "Passion for Mobile", color: "text-primary",   border: "border-primary/20",   bg: "bg-primary/5",   glow: "group-hover:shadow-neon-primary" },
];

function AnimatedCounter({ target, suffix = "", reduced }: { target: number; suffix?: string; reduced: boolean | null }) {
  const [count, setCount] = useState(reduced ? target : 0);
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (reduced || !inView) return;
    let start = 0;
    const duration = 1400;
    const step = 16;
    const totalSteps = Math.ceil(duration / step);
    const increment = target / totalSteps;
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, step);
    return () => clearInterval(timer);
  }, [inView, target, reduced]);

  return <p ref={ref} className="font-mono text-3xl font-black">{count}{suffix}</p>;
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const AboutSection = () => {
  const reduced = useReducedMotion();

  return (
    <SectionWrapper id="about">
      {/* Heading */}
      <motion.div
        className="mb-16 flex flex-col items-center gap-2"
        initial={reduced ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="font-mono-accent text-xs font-semibold uppercase tracking-[0.25em] text-primary">
          about me
        </span>
        <h2 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl">
          Who{" "}
          <span className="text-gradient font-serif italic">I Am</span>
        </h2>
      </motion.div>

      {/* Stats row */}
      <motion.div
        className="mb-16 grid grid-cols-2 gap-4 sm:grid-cols-4"
        variants={reduced ? undefined : container}
        initial={reduced ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true }}
      >
        {STATS.map((s) => (
          <motion.div
            key={s.label}
            variants={reduced ? undefined : fadeUp}
            whileHover={reduced ? undefined : { y: -6, scale: 1.03, transition: { duration: 0.2 } }}
            className={`group glass-card cursor-default rounded-xl border p-5 text-center transition-all duration-300 ${s.border} ${s.bg} ${s.glow}`}
          >
            <div className={s.color}>
              {reduced
                ? <p className="font-mono text-3xl font-black">{s.value}</p>
                : <AnimatedCounter
                    target={s.num}
                    suffix={s.value.replace(/\d+/g, "")}
                    reduced={reduced}
                  />
              }
            </div>
            <p className="mt-1 font-mono-accent text-xs text-muted-foreground">{s.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Content grid */}
      <motion.div
        className="grid grid-cols-1 gap-12 lg:grid-cols-2"
        variants={reduced ? undefined : container}
        initial={reduced ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div variants={reduced ? undefined : fadeUp}>
          <h3 className="mb-6 text-2xl font-bold text-foreground">{PROFILE_SUMMARY.title}</h3>
          <div className="space-y-4 text-base leading-7 text-muted-foreground">
            {PROFILE_SUMMARY.description.map((text, i) => (
              <p key={i}>{formatMarkdownBold(text)}</p>
            ))}
          </div>
        </motion.div>
        <motion.div variants={reduced ? undefined : fadeUp}>
          <h3 className="mb-6 text-2xl font-bold text-foreground">Core Competencies</h3>
          <ul className="space-y-3">
            {PROFILE_SUMMARY.coreCompetencies.map((competency, i) => (
              <motion.li
                key={competency}
                className="flex items-start gap-3"
                initial={reduced ? false : { opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: reduced ? 0 : i * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary transition-all duration-300 group-hover:scale-110" />
                <span className="text-sm text-muted-foreground">{competency}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </SectionWrapper>
  );
};

export default AboutSection;
