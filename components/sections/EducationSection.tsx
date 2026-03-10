// components/sections/EducationSection.tsx
"use client";

import { EDUCATION } from "@/constants";
import SectionWrapper from "../shared/SectionWrapper";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
  },
});

const slideIn = (fromLeft: boolean, delay = 0) => ({
  hidden: { opacity: 0, x: fromLeft ? -48 : 48 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
  },
});

const EducationSection = () => {
  const reduced = useReducedMotion();

  return (
    <SectionWrapper id="education">
      <motion.div
        className="mb-16 flex flex-col items-center gap-2"
        initial={reduced ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="font-mono-accent text-xs font-semibold uppercase tracking-[0.25em] text-primary">
          academic background
        </span>
        <h2 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl">
          <span className="text-gradient font-serif italic">Education</span>
        </h2>
      </motion.div>

      <div className="relative space-y-8">
        {/* Timeline line */}
        <motion.div
          className="absolute left-6 top-0 w-px bg-gradient-to-b from-primary via-secondary to-transparent md:left-1/2 md:-translate-x-1/2"
          initial={reduced ? false : { height: 0 }}
          whileInView={{ height: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />

        {EDUCATION.map((edu, index) => {
          const fromLeft = index % 2 === 0;
          return (
            <div key={edu.institution} className="relative flex w-full items-start">
              {/* Dot */}
              <motion.div
                className="absolute left-6 top-4 z-10 -translate-x-1/2 rounded-full bg-gradient-neon p-1.5 shadow-neon-primary md:left-1/2"
                initial={reduced ? false : { scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.4, type: "spring", stiffness: 260 }}
              >
                <GraduationCap className="h-3 w-3 text-black" />
              </motion.div>

              <motion.div
                className={cn(
                  "ml-12 w-full md:ml-0",
                  fromLeft ? "md:mr-auto md:w-[45%]" : "md:ml-auto md:w-[45%]"
                )}
                variants={reduced ? undefined : slideIn(fromLeft, index * 0.15)}
                initial={reduced ? false : "hidden"}
                whileInView="visible"
                viewport={{ once: true }}
              >
                <Card
                  className="group glass-card cursor-default border border-white/[0.06] transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_30px_hsl(var(--primary)/0.15)]"
                  aria-label={`${edu.degree} at ${edu.institution}`}
                >
                  {/* Hover shimmer */}
                  <div className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-12deg] rounded-xl bg-gradient-to-r from-transparent via-white/[0.04] to-transparent transition-none group-hover:animate-shine" />

                  <CardHeader className="relative z-10">
                    <motion.div
                      whileHover={reduced ? undefined : { x: 4, transition: { duration: 0.2 } }}
                    >
                      <CardTitle className="text-base font-bold text-gradient">{edu.degree}</CardTitle>
                    </motion.div>
                    <p className="text-sm font-medium text-foreground">{edu.institution}</p>
                    <CardDescription className="font-mono-accent text-xs">{edu.duration}</CardDescription>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <p className="text-sm text-muted-foreground">{edu.details}</p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
};

export default EducationSection;
