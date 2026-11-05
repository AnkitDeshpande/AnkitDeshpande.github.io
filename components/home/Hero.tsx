"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const phrases = [
  "Backend Engineer",
  "Systems Thinker",
  "Problem Solver",
  "Code Craftsman",
];

export function Hero() {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const phrase = phrases[index];
    let charIndex = 0;

    const timer = setInterval(() => {
      if (!isDeleting) {
        setText(phrase.slice(0, ++charIndex));
        if (charIndex === phrase.length) {
          setIsDeleting(true);
          setTimeout(() => clearInterval(timer), 1800);
        }
      } else {
        setText(phrase.slice(0, --charIndex));
        if (charIndex === 0) {
          setIsDeleting(false);
          setIndex((i) => (i + 1) % phrases.length);
        }
      }
    }, isDeleting ? 35 : 70);

    return () => clearInterval(timer);
  }, [index, isDeleting]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;
    const ctx: CanvasRenderingContext2D = context;

    const dpr = Math.min(window.devicePixelRatio, 2);
    let width = 0;
    let height = 0;
    let animationId: number;
    let time = 0;

    interface Particle {
      x: number;
      y: number;
      px: number;
      py: number;
      vx: number;
      vy: number;
      width: number;
      alpha: number;
    }

    const particles: Particle[] = [];
    const PARTICLE_COUNT = 90;

    function resize() {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function initParticles() {
      particles.length = 0;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        particles.push({
          x,
          y,
          px: x,
          py: y,
          vx: 0,
          vy: 0,
          width: Math.random() * 0.7 + 0.4,
          alpha: Math.random() * 0.22 + 0.06,
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      ctx.lineCap = "round";

      particles.forEach((p) => {
        ctx.beginPath();
        ctx.moveTo(p.px, p.py);
        ctx.lineTo(p.x, p.y);
        ctx.strokeStyle = `rgba(224, 62, 62, ${p.alpha})`;
        ctx.lineWidth = p.width;
        ctx.stroke();
      });
    }

    function update() {
      time += 0.002;
      particles.forEach((p) => {
        p.px = p.x;
        p.py = p.y;

        // Flow field: the angle depends only on position, so nearby
        // streamlines curve together and the field reads as a current.
        const angle =
          Math.sin(p.x * 0.004 + time) * 1.4 +
          Math.cos(p.y * 0.004 - time) * 1.4;

        p.vx = p.vx * 0.94 + Math.cos(angle) * 0.24;
        p.vy = p.vy * 0.94 + Math.sin(angle) * 0.24;
        p.x += p.vx;
        p.y += p.vy;

        // Wrap, and reset the previous point so no line spans the canvas.
        if (p.x < -20) { p.x = width + 20; p.px = p.x; p.py = p.y; }
        if (p.x > width + 20) { p.x = -20; p.px = p.x; p.py = p.y; }
        if (p.y < -20) { p.y = height + 20; p.px = p.x; p.py = p.y; }
        if (p.y > height + 20) { p.y = -20; p.px = p.x; p.py = p.y; }
      });
    }

    function loop() {
      update();
      draw();
      animationId = requestAnimationFrame(loop);
    }

    resize();
    initParticles();
    loop();

    const handleResize = () => {
      resize();
      initParticles();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section
      className="relative min-h-[calc(100vh_-_5rem)] flex items-center justify-center px-6 overflow-hidden"
      aria-labelledby="hero-title"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 -z-10 pointer-events-none"
        aria-hidden="true"
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-10 lg:gap-20 items-center min-h-[calc(100vh_-_9rem)]"
      >
        <div className="lg:order-2 relative">
          <div className="relative aspect-square max-w-lg mx-auto">
            <div className="absolute inset-0 overflow-hidden rounded-2xl">
              <Image
                src="/images/profile/ankit-portrait.png"
                alt="Ankit Deshpande, Backend Engineer"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                style={{
                  filter: "contrast(1.05) saturate(1.1)",
                }}
              />

              <svg
                viewBox="0 0 800 800"
                preserveAspectRatio="xMidYMid slice"
                className="absolute inset-0 h-full w-full font-display text-bg pointer-events-none select-none"
                aria-hidden="true"
              >
                <text
                  x="400"
                  y="409"
                  textAnchor="middle"
                  fontSize="190"
                  fontWeight="800"
                  letterSpacing="-4"
                  fill="currentColor"
                  stroke="var(--color-crimson)"
                  strokeWidth="3"
                  paintOrder="stroke"
                  textLength="772"
                  lengthAdjust="spacingAndGlyphs"
                >
                  ANKIT
                </text>
                <text
                  x="400"
                  y="529"
                  textAnchor="middle"
                  fontSize="104"
                  fontWeight="800"
                  letterSpacing="-2"
                  fill="currentColor"
                  stroke="var(--color-crimson)"
                  strokeWidth="3"
                  paintOrder="stroke"
                  textLength="772"
                  lengthAdjust="spacingAndGlyphs"
                >
                  DESHPANDE
                </text>
              </svg>
            </div>

            <div
              className="absolute -inset-4 rounded-[20px] border border-crimson/30 pointer-events-none -z-10"
              aria-hidden="true"
            />

            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-4 -right-4 w-24 h-24 border-2 border-crimson/20 rounded-full pointer-events-none"
              aria-hidden="true"
            />
            <motion.div
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 w-16 h-16 border-2 border-crimson/30 rounded-lg pointer-events-none"
              style={{ transformOrigin: "center" }}
              aria-hidden="true"
            />
          </div>

          <div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-fg-subtle text-xs font-mono"
            aria-hidden="true"
          >
            <span className="tracking-widest uppercase">Scroll</span>
            <span className="block w-px h-8 bg-border-hover" />
          </div>
        </div>

        <div className="lg:order-1 text-center lg:text-left">
          <motion.h1
            id="hero-title"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="font-display font-black tracking-tighter text-5xl lg:text-7xl xl:text-8xl leading-[0.95] mb-4 text-fg"
          >
            ANKIT<br />
            <span className="text-crimson">DESHPANDE</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="text-fg-muted text-sm lg:text-base font-medium tracking-widest uppercase mb-6"
          >
            Backend Engineer • Systems Thinker
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="flex items-center justify-center lg:justify-start gap-3 mb-10 min-h-[2.5rem]"
          >
            <span className="text-fg-subtle text-lg font-mono">I'm a</span>
            <span className="text-crimson-light font-mono text-lg font-medium" aria-live="polite" role="status">
              {text}
            </span>
            <span className="text-crimson font-mono text-lg font-medium animate-pulse" aria-hidden="true">|</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            className="text-fg-muted text-lg lg:text-xl max-w-xl mb-12 leading-relaxed"
          >
            3+ years crafting scalable backends with Java, Spring Boot & cloud-native architectures.
            I care about clean code, observable systems, and developer experience.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <a
              href="#projects"
              className="group relative px-8 py-4 bg-crimson text-bg font-semibold rounded-lg overflow-hidden transition-all duration-200 hover:shadow-crimson hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="relative z-10">View Work</span>
              <motion.span
                className="absolute inset-0 bg-crimson-hover scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-200 ease-out"
                layoutId="cta-fill"
              />
            </a>
            <a
              href="#contact"
              className="px-8 py-4 border-2 border-border-hover text-fg font-semibold rounded-lg transition-all duration-200 hover:border-crimson hover:bg-bg-elevated hover:text-crimson-light active:scale-[0.98]"
            >
              Get in Touch
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mt-12 pt-8 border-t border-border"
          >
            <span className="text-fg-subtle text-xs font-mono tracking-wider">Stack:</span>
            {["Java 17", "Spring Boot 3", "PostgreSQL", "Redis", "Kubernetes", "AWS", "TypeScript", "React"].map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + i * 0.05, type: "spring", stiffness: 300, damping: 25 }}
                className="px-3 py-1 text-xs font-mono text-fg-muted bg-bg-elevated border border-border rounded-full hover:border-crimson/50 hover:text-crimson-light transition-colors duration-200"
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}