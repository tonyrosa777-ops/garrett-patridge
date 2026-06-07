"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

interface SlideInProps {
  children: ReactNode;
  /** Direction the element slides FROM. Defaults to "left". */
  from?: "left" | "right";
  /** Stagger delay in seconds before this element animates in. */
  delay?: number;
  className?: string;
}

/**
 * Slide in from left or right on enter-view. triggerOnce so it never re-fires
 * (Error #24 — use triggerOnce, NOT `once`). Reduced motion is neutralized by
 * the globals.css reduce-motion block; content still renders visible.
 */
export default function SlideIn({ children, from = "left", delay = 0, className }: SlideInProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });
  const offset = from === "left" ? -28 : 28;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: offset }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: offset }}
      transition={{ duration: 0.6, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
