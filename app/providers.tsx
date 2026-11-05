"use client";

import { MotionConfig } from "framer-motion";
import { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig
      transition={{
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1],
      }}
      reducedMotion="user"
    >
      {children}
    </MotionConfig>
  );
}