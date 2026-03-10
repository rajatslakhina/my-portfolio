// components/shared/SectionWrapper.tsx
"use client";
import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

const SectionWrapper = ({ children, className, id }: SectionWrapperProps) => {
  const reduced = useReducedMotion();

  return (
    <motion.section
      id={id}
      className={cn("py-24 sm:py-32", className)}
      initial={reduced ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.section>
  );
};

export default SectionWrapper;
