"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { FlowField } from "./FlowField";

const stack = [
  "Java 17",
  "Spring Boot 3",
  "PostgreSQL",
  "Redis",
  "Kubernetes",
  "AWS",
];

const corridor = [
  { z: -900, scale: 1.7, opacity: 0.1 },
  { z: -560, scale: 1.34, opacity: 0.17 },
  { z: -280, scale: 1.1, opacity: 0.26 },
];

export function Hero() {
  const runway = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

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

  const worldZ = useTransform(progress, [0, 1], [-140, 230]);
  const worldRotX = useTransform(progress, [0, 1], [0, -3]);

  const imgRotY = useTransform(progress, [0, 1], [-25, 8]);
  const imgRotX = useTransform(progress, [0, 1], [10, -5]);
  const imgRotZ = useTransform(progress, [0, 1], [-1, 2]);
  const imgY = useTransform(progress, [0, 1], [0, -20]);
  const imgScale = useTransform(progress, [0, 1], [1, 1.05]);

  const ringSpin = useTransform(progress, [0, 1], [-18, 12]);

  const copyY = useTransform(progress, [0, 1], [0, -30]);
  const hintOpacity = useTransform(progress, [0, 0.07], [1, 0]);
  const railScale = useTransform(progress, [0, 1], [0.02, 1]);

  const nameOpacity = useTransform(progress, [0, 0.3], [0.15, 0]);
  const nameScale = useTransform(progress, [0, 1], [1.2, 1]);
  const nameRotY = useTransform(progress, [0, 1], [-5, 5]);

  return (
    <section
      id="hero"
      ref={runway}
      aria-labelledby="hero-title"
      className="relative lg:h-[300vh]"
    >
      <div className="relative flex min-h-[calc(100svh-4rem)] flex-col overflow-hidden lg:sticky lg:top-20 lg:h-[calc(100svh-5rem)] lg:min-h-0 lg:justify-center">
        <FlowField className="absolute inset-0 h-full w-full" animate={live} />

        {/* ---------- Background name text (behind image) ---------- */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
          aria-hidden="true"
        >
          <motion.div
            style={{
              opacity: live ? nameOpacity : 0.15,
              scale: live ? nameScale : 1,
              rotateY: live ? nameRotY : 0,
              willChange: "opacity, transform",
            }}
            className="font-display font-black uppercase whitespace-nowrap"
          >
            <span
              className="text-[clamp(8rem,25vw,18rem)] leading-none text-crimson/10"
              style={{
                textShadow: "0 0 80px rgba(224, 62, 62, 0.15)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
            >
              ANKIT DESHPANDE
            </span>
          </motion.div>
        </div>

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
            {/* Receding corridor frames */}
            {corridor.map((frame, i) => (
              <div
                key={i}
                className="absolute left-1/2 top-1/2 border border-crimson/30 lg:left-[68%]"
                style={{
                  width: "calc(var(--img-w) * 1.6)",
                  height: "calc(var(--img-w) * 1.6)",
                  marginLeft: "calc(var(--img-w) * -0.8)",
                  marginTop: "calc(var(--img-w) * -0.8)",
                  transform: `translateZ(${frame.z}px) scale(${frame.scale})`,
                  opacity: frame.opacity,
                }}
              />
            ))}

            {/* Orbit rings */}
            <div
              className="absolute left-1/2 top-1/2 rounded-full lg:left-[68%]"
              style={{
                width: "calc(var(--img-w) * 2.2)",
                height: "calc(var(--img-w) * 2.2)",
                marginLeft: "calc(var(--img-w) * -1.1)",
                marginTop: "calc(var(--img-w) * -1.1)",
                transform: "translateZ(-640px) rotateX(68deg)",
              }}
            >
              <motion.div
                className="h-full w-full rounded-full border border-crimson/20"
                style={{ rotate: live ? ringSpin : 0 }}
              />
            </div>
            <div
              className="absolute left-1/2 top-1/2 rounded-full border border-crimson/10 lg:left-[68%]"
              style={{
                width: "calc(var(--img-w) * 1.65)",
                height: "calc(var(--img-w) * 1.65)",
                marginLeft: "calc(var(--img-w) * -0.825)",
                marginTop: "calc(var(--img-w) * -0.825)",
                transform: "translateZ(-380px) rotateX(76deg)",
              }}
            />

            {/* Portrait image with 3D transform */}
            <div
              className="absolute left-1/2 top-1/2 lg:left-[68%]"
              style={{
                transformStyle: "preserve-3d",
                translate: "-50% -50%",
              }}
            >
              <motion.div
                style={{
                  transformStyle: "preserve-3d",
                  rotateY: live ? imgRotY : -12,
                  rotateX: live ? imgRotX : 6,
                  rotate: live ? imgRotZ : 0,
                  y: live ? imgY : 0,
                  scale: live ? imgScale : 1,
                  willChange: "transform",
                  filter: "drop-shadow(0 40px 80px rgba(224, 62, 62, 0.3))",
                }}
              >
                <div
                  className="relative"
                  style={{
                    width: "var(--img-w)",
                    height: "calc(var(--img-w) * 1.78)",
                    borderRadius: "24px",
                    overflow: "hidden",
                    boxShadow: "0 0 0 1px rgba(224, 62, 62, 0.2), 0 80px 160px -40px rgba(0, 0, 0, 0.8)",
                  }}
                >
                  {/* Mobile image - hidden on desktop */}
                  <div className="lg:hidden w-full" style={{ height: "calc(var(--img-w) * 1.78)" }}>
                    <Image
                      src="/images/profile/ankit-mobile.png"
                      alt="Ankit Deshpande"
                      fill
                      priority
                      sizes="90vw"
                      className="object-cover"
                    />
                  </div>
                  {/* Desktop image - hidden on mobile */}
                  <div className="hidden lg:block w-full h-full">
                    <Image
                      src="/images/profile/ankit-desktop.png"
                      alt="Ankit Deshpande"
                      fill
                      priority
                      sizes="(max-width: 1024px) 56vw, 30vw"
                      className="object-cover"
                    />
                  </div>
                  {/* Subtle crimson gradient overlay */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-crimson/20 via-transparent to-transparent pointer-events-none"
                    aria-hidden="true"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* ---------- Copy ---------- */}
        <div className="relative z-10 w-full px-6 pb-12 lg:absolute lg:inset-0 lg:flex lg:items-center lg:pb-0">
          <div className="mx-auto w-full max-w-7xl lg:pr-[44%]">
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
                  href="#projects"
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