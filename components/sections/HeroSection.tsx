// components/sections/HeroSection.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import SocialLinks from "../shared/SocialLinks";
import { Typewriter } from "@/components/ui/typewriter";
import { Download, Eye, Send, ChevronDown, Terminal } from "lucide-react";
import { RESUME_URL } from "@/constants";

const ROLES = [
  "Mobile Development Professional",
  "iOS Architecture Specialist",
  "SwiftUI Engineer",
  "Senior Consultant @ ThoughtWorks",
];

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const HeroSection = () => {
  const reduced = useReducedMotion();

  return (
    <section className="relative flex min-h-[calc(100vh-5rem)] items-center py-24">
      <div className="grid w-full grid-cols-1 items-center gap-16 lg:grid-cols-2">

        {/* ── Left ── */}
        <motion.div
          className="flex flex-col items-center text-center lg:items-start lg:text-left"
          initial={reduced ? false : "hidden"}
          animate="visible"
          variants={reduced ? undefined : { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {/* Terminal eyebrow */}
          <motion.div
            variants={reduced ? undefined : item}
            className="mb-6 flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5"
          >
            <Terminal className="h-3.5 w-3.5 text-primary" />
            <span className="font-mono-accent text-xs font-medium tracking-widest text-primary uppercase">
              Hello World
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={reduced ? undefined : item}
            className="text-5xl font-extrabold leading-none tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl"
          >
            <span className="block text-foreground">Rajat</span>
            <span className="block font-serif italic text-gradient">Lakhina</span>
          </motion.h1>

          {/* Typewriter role */}
          <motion.div
            variants={reduced ? undefined : item}
            className="mt-5 h-8"
          >
            <span className="font-mono-accent text-base font-medium text-muted-foreground sm:text-lg">
              {">"}{" "}
              {reduced
                ? ROLES[0]
                : <Typewriter texts={ROLES} speed={55} deleteSpeed={30} pause={2200} />
              }
            </span>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={reduced ? undefined : item}
            className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground"
          >
            Nearly{" "}
            <span className="font-semibold text-primary">10 years</span>{" "}
            building enterprise-grade mobile products at{" "}
            <span className="font-semibold text-secondary">ThoughtWorks</span>.
            Specializing in iOS, SwiftUI &amp; mobile architecture.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={reduced ? undefined : item}
            className="mt-10 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
          >
            <Button
              asChild
              size="lg"
              className="group relative overflow-hidden border-0 bg-gradient-neon font-semibold text-black shadow-neon-primary transition-all duration-300 hover:scale-[1.03] hover:shadow-neon-secondary"
            >
              <a href={RESUME_URL} download>
                {/* Shine */}
                <span className="absolute inset-0 -translate-x-full skew-x-[-12deg] bg-white/20 transition-none group-hover:animate-shine" />
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </a>
            </Button>
            <Button
              asChild variant="outline" size="lg"
              className="border-primary/30 text-foreground backdrop-blur-sm hover:border-primary hover:bg-primary/10 hover:shadow-neon-primary transition-all duration-300"
            >
              <Link href="/projects">
                <Eye className="mr-2 h-4 w-4" />
                View Projects
              </Link>
            </Button>
            <Button
              asChild variant="ghost" size="lg"
              className="text-muted-foreground hover:text-foreground hover:bg-white/5"
            >
              <Link href="/contact">
                <Send className="mr-2 h-4 w-4" />
                Contact
              </Link>
            </Button>
          </motion.div>

          <motion.div className="mt-8" variants={reduced ? undefined : item}>
            <SocialLinks />
          </motion.div>
        </motion.div>

        {/* ── Right: Avatar ── */}
        <motion.div
          className="flex items-center justify-center"
          initial={reduced ? false : { opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative">
            {/* Orbiting ring */}
            {!reduced && (
              <div className="absolute inset-0 rounded-full border border-primary/20 animate-spin-slow" />
            )}
            {/* Blob glows */}
            {!reduced && (
              <>
                <div className="absolute -inset-8 rounded-full bg-primary/10 blur-3xl animate-blob" />
                <div className="absolute -inset-8 rounded-full bg-secondary/10 blur-3xl animate-blob [animation-delay:3.5s]" />
              </>
            )}

            {/* Outer gradient ring */}
            <div
              className="relative h-64 w-64 rounded-full p-[3px] sm:h-80 sm:w-80 lg:h-[420px] lg:w-[420px]"
              style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)), hsl(var(--accent)))" }}
            >
              {/* Inner image */}
              <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-card">
                <Image
                  src="/rajat-profile.webp"
                  alt="Rajat Lakhina"
                  fill priority
                  sizes="(max-width: 640px) 256px, (max-width: 768px) 320px, 420px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Stats floating cards */}
            {!reduced && (
              <>
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -left-4 top-1/4 rounded-xl border border-primary/20 bg-card/80 px-3 py-2 backdrop-blur-md lg:-left-16"
                >
                  <p className="font-mono-accent text-xl font-black text-primary">9+</p>
                  <p className="font-mono-accent text-xs text-muted-foreground">Years Exp</p>
                </motion.div>
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                  className="absolute -right-4 bottom-1/4 rounded-xl border border-secondary/20 bg-card/80 px-3 py-2 backdrop-blur-md lg:-right-16"
                >
                  <p className="font-mono-accent text-xl font-black text-secondary">10+</p>
                  <p className="font-mono-accent text-xs text-muted-foreground">Apps Shipped</p>
                </motion.div>
              </>
            )}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      {!reduced && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="font-mono-accent text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Scroll</span>
          <ChevronDown className="h-4 w-4 animate-scroll-bounce text-primary" />
        </div>
      )}
    </section>
  );
};

export default HeroSection;
