"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { FlowField } from "./FlowField";
import { PortraitSlab } from "./PortraitSlab";

const stack = [
  "Java 17",
  "Spring Boot 3",
  "PostgreSQL",
  "Redis",
  "Kubernetes",
  "AWS",
];

/**
 * Receding frames behind the portrait. Each sits at a fixed depth; the camera
 * dolly moves them forward, so they separate from the slab as you scroll.
 */
const corridor = [
  { z: -900, scale: 1.7, opacity: 0.1 },
  { z: -560, scale: 1.34, opacity: 0.17 },
  { z: -280, scale: 1.1, opacity: 0.26 },
];

export function Hero() {
  const runway = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  // The pinned journey is desktop-only. Phones and tablets get the same scene
  // in normal flow, where a scroll-linked transform would only fight the layout.
  const [wide, setWide] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const sync = () => setWide(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  const live = wide && !reduceMotion;

  const { scrollYProgress } = useScroll({
    target: runway,
    offset: ["start start", "end end"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.0005,
  });

  // Camera
  const worldZ = useTransform(progress, [0, 1], [-140, 230]);
  const worldRotX = useTransform(progress, [0, 1], [0, -3]);

  // The portrait object
  const slabRotY = useTransform(progress, [0, 1], [-30, 5]);
  const slabRotX = useTransform(progress, [0, 1], [12, -4]);
  const slabRotZ = useTransform(progress, [0, 1], [-2, 1.5]);
  const slabY = useTransform(progress, [0, 1], [0, -18]);

  // Orbit rings
  const ringSpin = useTransform(progress, [0, 1], [-18, 12]);

  // Copy + chrome
  const copyY = useTransform(progress, [0, 1], [0, -30]);
  const hintOpacity = useTransform(progress, [0, 0.07], [1, 0]);
  const railScale = useTransform(progress, [0, 1], [0.02, 1]);

  return (
    <section
      ref={runway}
      aria-labelledby="hero-title"
      className="relative lg:h-[300vh]"
    >
      <div className="[--slab-w:clamp(150px,44vw,220px)] relative flex min-h-[calc(100svh-4rem)] flex-col overflow-hidden lg:sticky lg:top-20 lg:h-[calc(100svh-5rem)] lg:min-h-0 lg:justify-center lg:[--slab-w:clamp(280px,26vw,384px)]">
        <FlowField className="absolute inset-0 h-full w-full" animate={live} />

        {/* ---------- 3D stage ---------- */}
        <div
          className="pointer-events-none relative h-[44svh] w-full lg:absolute lg:inset-0 lg:h-full"
          style={{ perspective: "1600px", perspectiveOrigin: "50% 46%" }}
          aria-hidden="true"
        >
          <motion.div
            className="absolute inset-0"
            style={{
              transformStyle: "preserve-3d",
              z: live ? worldZ : 0,
              rotateX: live ? worldRotX : 0,
              willChange: "transform",
            }}
          >
            {/* Receding corridor */}
            {corridor.map((frame, i) => (
              <div
                key={i}
                className="absolute left-1/2 top-1/2 border border-crimson lg:left-[72%]"
                style={{
                  width: "calc(var(--slab-w) * 1.7)",
                  height: "calc(var(--slab-w) * 1.7)",
                  marginLeft: "calc(var(--slab-w) * -0.85)",
                  marginTop: "calc(var(--slab-w) * -0.85)",
                  transform: `translateZ(${frame.z}px) scale(${frame.scale})`,
                  opacity: frame.opacity,
                }}
              />
            ))}

            {/* Orbit rings */}
            <div
              className="absolute left-1/2 top-1/2 rounded-full lg:left-[72%]"
              style={{
                width: "calc(var(--slab-w) * 2.35)",
                height: "calc(var(--slab-w) * 2.35)",
                marginLeft: "calc(var(--slab-w) * -1.175)",
                marginTop: "calc(var(--slab-w) * -1.175)",
                transform: "translateZ(-640px) rotateX(68deg)",
              }}
            >
              <motion.div
                className="h-full w-full rounded-full border border-crimson/25"
                style={{ rotate: live ? ringSpin : 0 }}
              />
            </div>
            <div
              className="absolute left-1/2 top-1/2 rounded-full border border-crimson/15 lg:left-[72%]"
              style={{
                width: "calc(var(--slab-w) * 1.75)",
                height: "calc(var(--slab-w) * 1.75)",
                marginLeft: "calc(var(--slab-w) * -0.875)",
                marginTop: "calc(var(--slab-w) * -0.875)",
                transform: "translateZ(-380px) rotateX(76deg)",
              }}
            />

            {/* The portrait slab */}
            <div
              className="absolute left-1/2 top-1/2 lg:left-[72%]"
              style={{
                transformStyle: "preserve-3d",
                translate: "-50% -50%",
              }}
            >
              <motion.div
                style={{
                  transformStyle: "preserve-3d",
                  rotateY: live ? slabRotY : -14,
                  rotateX: live ? slabRotX : 7,
                  rotate: live ? slabRotZ : 0,
                  y: live ? slabY : 0,
                  willChange: "transform",
                }}
              >
                <PortraitSlab />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* ---------- Copy ---------- */}
        <div className="relative z-10 w-full px-6 pb-12 lg:absolute lg:inset-0 lg:flex lg:items-center lg:pb-0">
          <div className="mx-auto w-full max-w-7xl lg:pr-[46%]">
            <motion.div style={{ y: live ? copyY : 0 }}>
              <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.32em] text-crimson">
                Backend Engineer
                <span className="mx-2 text-border-hover">/</span>
                <span className="text-fg-subtle">Bengaluru, India</span>
              </p>

              <h1 id="hero-title" className="sr-only">
                Ankit Deshpande, Backend Engineer
              </h1>

              <p className="mb-5 max-w-xl font-display text-[2rem] font-bold leading-[1.05] tracking-tight text-fg sm:text-4xl lg:text-5xl">
                Systems that hold up
                <br />
                <span className="text-crimson">under load.</span>
              </p>

              <p className="mb-8 hidden max-w-md leading-relaxed text-fg-muted sm:block">
                3+ years building Java and Spring Boot services, observable
                pipelines, and cloud-native infrastructure that stays boring in
                production.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/projects"
                  className="inline-flex items-center justify-center rounded-lg bg-crimson px-7 py-3.5 font-semibold text-bg transition-colors duration-200 hover:bg-crimson-hover"
                >
                  View Work
                </Link>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-lg border border-border-hover px-7 py-3.5 font-semibold text-fg transition-colors duration-200 hover:border-crimson hover:bg-bg-elevated hover:text-crimson-light"
                >
                  Get in Touch
                </a>
              </div>

              <div className="mt-9 hidden flex-wrap items-center gap-2 sm:flex">
                <span className="mr-1 font-mono text-[10px] uppercase tracking-[0.2em] text-fg-subtle">
                  Stack
                </span>
                {stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-border bg-bg-elevated px-3 py-1 font-mono text-[11px] text-fg-muted transition-colors duration-200 hover:border-crimson/50 hover:text-crimson-light"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* ---------- Chrome ---------- */}
        <motion.div
          className="pointer-events-none absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 lg:flex"
          style={{ opacity: live ? hintOpacity : 1 }}
          aria-hidden="true"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-fg-subtle">
            Scroll
          </span>
          <span className="block h-10 w-px bg-border" />
        </motion.div>

        <div
          className="pointer-events-none absolute right-8 top-1/2 hidden h-40 w-px -translate-y-1/2 bg-border lg:block"
          aria-hidden="true"
        >
          <motion.span
            className="absolute inset-x-0 top-0 block h-full origin-top bg-crimson"
            style={{ scaleY: live ? railScale : 1 }}
          />
        </div>
      </div>
    </section>
  );
}
