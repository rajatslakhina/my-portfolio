// components/ui/glitch-text.tsx
"use client";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "framer-motion";

interface GlitchTextProps {
  text: string;
  className?: string;
}

export function GlitchText({ text, className }: GlitchTextProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span
      className={cn("relative inline-block select-none", className)}
      data-text={text}
    >
      <style>{`
        .glitch-wrap::before,
        .glitch-wrap::after {
          content: attr(data-text);
          position: absolute;
          inset: 0;
        }
        .glitch-wrap::before {
          color: hsl(var(--primary));
          animation: glitch-1 4s infinite linear;
          opacity: 0;
        }
        .glitch-wrap::after {
          color: hsl(var(--secondary));
          animation: glitch-2 4s infinite linear 0.5s;
          opacity: 0;
        }
        .glitch-wrap:hover::before,
        .glitch-wrap:hover::after { opacity: 0.7; }
      `}</style>
      <span className="glitch-wrap relative" data-text={text}>{text}</span>
    </span>
  );
}
