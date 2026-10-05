"use client";

import { MotionConfig } from "motion/react";

/** Semua animasi otomatis dimatikan bila pengguna mengaktifkan "reduce motion" di OS. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
