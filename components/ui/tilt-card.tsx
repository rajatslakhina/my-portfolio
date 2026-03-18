"use client";
import { useRef, MouseEvent, ReactNode, CSSProperties } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
  style?: CSSProperties;
}

export function TiltCard({ children, className, intensity = 10, style }: TiltCardProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    ref.current.style.transform  = `perspective(700px) rotateX(${-y * intensity}deg) rotateY(${x * intensity}deg) translateZ(8px)`;
    ref.current.style.background = `radial-gradient(circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, hsl(186 100% 50% / 0.07) 0%, transparent 60%)`;
  };

  const onLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform  = "perspective(700px) rotateX(0) rotateY(0) translateZ(0)";
    ref.current.style.background = "";
  };

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
      className={cn("transition-all duration-200 ease-out", className)}
      style={{ transformStyle: "preserve-3d", willChange: "transform", ...style }}
    >
      {children}
    </div>
  );
}
