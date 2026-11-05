"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

export function MotionDiv(props: HTMLMotionProps<"div">) {
  return <motion.div {...props} />;
}

export function MotionLi(props: HTMLMotionProps<"li">) {
  return <motion.li {...props} />;
}

export function MotionSection(props: HTMLMotionProps<"section">) {
  return <motion.section {...props} />;
}
