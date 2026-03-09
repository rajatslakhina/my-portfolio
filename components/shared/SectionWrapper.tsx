// components/shared/SectionWrapper.tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const SectionWrapper = ({
    children,
    className,
    id,
}: {
    children: React.ReactNode;
    className?: string;
    id?: string;
}) => {
    const prefersReducedMotion = useReducedMotion();

    return (
        <motion.section
            id={id}
            className={cn("py-20 sm:py-24", className)}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
        >
            {children}
        </motion.section>
    );
};

export default SectionWrapper;
