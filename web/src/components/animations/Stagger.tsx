"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

const parentVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const childVariants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

interface StaggerProps {
  children: ReactNode;
  className?: string;
}

/**
 * Parent that staggers its StaggerItem children (0.12s apart) on enter-view.
 * triggerOnce so it never re-fires on scroll (Error #24 — use triggerOnce, NOT `once`).
 */
export function Stagger({ children, className }: StaggerProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <motion.div
      ref={ref}
      variants={parentVariants}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

/** Child of Stagger — fade + rise, timed by the parent's staggerChildren. */
export function StaggerItem({ children, className }: StaggerItemProps) {
  return (
    <motion.div variants={childVariants} className={className}>
      {children}
    </motion.div>
  );
}
