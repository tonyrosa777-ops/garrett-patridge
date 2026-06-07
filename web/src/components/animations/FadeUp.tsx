"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

interface FadeUpProps {
  children: ReactNode;
  /** Stagger delay in seconds before this element animates in. */
  delay?: number;
  className?: string;
}

/**
 * Fade + 18px rise on enter-view. triggerOnce so it never re-fires on scroll
 * (Error #24 — `once` is silently ignored by react-intersection-observer; use triggerOnce).
 * Under prefers-reduced-motion, framer-motion's transition is neutralized by the
 * globals.css reduce-motion block; content still renders visible.
 */
export default function FadeUp({ children, delay = 0, className }: FadeUpProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
      transition={{ duration: 0.6, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
