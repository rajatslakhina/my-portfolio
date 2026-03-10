// components/effects/BackgroundEffects.tsx
"use client";
import { useReducedMotion } from "framer-motion";

export default function BackgroundEffects() {
  const reduced = useReducedMotion();

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* Dot grid */}
      <div className="absolute inset-0 bg-grid opacity-40" />

      {/* Radial vignette to darken edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,hsl(var(--primary)/0.08),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_80%_80%,hsl(var(--secondary)/0.06),transparent)]" />

      {/* Animated glow orbs */}
      {!reduced && (
        <>
          <div
            className="absolute -left-32 top-1/4 h-[500px] w-[500px] rounded-full bg-primary/8 blur-[120px] animate-blob"
            style={{ animationDelay: "0s" }}
          />
          <div
            className="absolute -right-32 top-1/2 h-[400px] w-[400px] rounded-full bg-secondary/8 blur-[100px] animate-blob"
            style={{ animationDelay: "3s" }}
          />
          <div
            className="absolute bottom-0 left-1/2 h-[350px] w-[350px] -translate-x-1/2 rounded-full bg-accent/5 blur-[100px] animate-blob"
            style={{ animationDelay: "5s" }}
          />
        </>
      )}
    </div>
  );
}
