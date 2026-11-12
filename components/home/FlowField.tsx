"use client";

import { useEffect, useRef } from "react";

interface FlowFieldProps {
  className?: string;
  animate?: boolean;
}

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

/**
 * Position-only flow field. The angle at any point depends solely on where
 * that point is, so neighbouring streamlines curve together and the whole
 * field reads as one current rather than scattered noise.
 */
export function FlowField({ className, animate = true }: FlowFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const ctx: CanvasRenderingContext2D = context;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let animationId = 0;
    let time = 0;

    const particles: Particle[] = [];

    const count = () => (window.innerWidth < 768 ? 40 : 88);

    function resize() {
      const rect = canvas!.parentElement?.getBoundingClientRect();
      if (!rect) return;
      width = rect.width;
      height = rect.height;
      canvas!.width = Math.max(1, Math.round(width * dpr));
      canvas!.height = Math.max(1, Math.round(height * dpr));
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function seed() {
      particles.length = 0;
      const total = count();
      for (let i = 0; i < total; i++) {
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

    function update() {
      time += 0.002;
      for (const p of particles) {
        p.px = p.x;
        p.py = p.y;

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
      }
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      ctx.lineCap = "round";
      for (const p of particles) {
        ctx.beginPath();
        ctx.moveTo(p.px, p.py);
        ctx.lineTo(p.x, p.y);
        ctx.strokeStyle = `rgba(224, 62, 62, ${p.alpha})`;
        ctx.lineWidth = p.width;
        ctx.stroke();
      }
    }

    function loop() {
      update();
      draw();
      animationId = requestAnimationFrame(loop);
    }

    function renderOnce() {
      // Warm the trails up so a still frame still shows streamlines.
      for (let i = 0; i < 200; i++) update();
      draw();
    }

    resize();
    seed();
    if (animate) {
      loop();
    } else {
      renderOnce();
    }

    const onResize = () => {
      resize();
      seed();
      if (!animate) renderOnce();
    };

    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", onResize);
    };
  }, [animate]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
