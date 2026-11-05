"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui";

interface Value {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const values: Value[] = [
  {
    title: "Ship Reliable Systems",
    description: "Code is a liability until it's running in production with observability. I prioritize operational excellence, meaning logging, metrics, tracing, and graceful degradation, over clever abstractions.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6" aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    title: "Understand Before Building",
    description: "Every feature starts with a problem statement, not a solution. I invest time in domain modeling, threat modeling, and capacity planning before writing the first line of code.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
  {
    title: "Automate Ruthlessly",
    description: "If I do it twice, I script it. If the team does it daily, I build a tool for it. CI/CD, database migrations, environment provisioning, code generation: automation compounds.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6" aria-hidden="true">
        <rect x="2" y="3" width="8" height="8" rx="1" />
        <path d="M10 3v8M14 3v8M2 11h20M2 19h20" />
      </svg>
    ),
  },
  {
    title: "Share Knowledge Openly",
    description: "Documentation, ADRs, runbooks, postmortems. Writing is thinking. I treat internal documentation as a first-class deliverable, not an afterthought.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
];

export function Values() {
  return (
    <section id="values" className="section">
      <div className="container">
        <header className="section-header max-w-3xl mx-auto text-center mb-16">
          <span className="section-label">Principles</span>
          <h2 className="section-title">How I Work</h2>
          <p className="section-description">
            Engineering principles that guide technical decisions and team dynamics.
          </p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <motion.article
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <Card className="p-6 h-full hover:border-crimson/30 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-crimson/10 flex items-center justify-center text-crimson mb-4">
                  {value.icon}
                </div>
                <h3 className="font-display font-semibold text-xl text-fg mb-3">
                  {value.title}
                </h3>
                <p className="text-fg-muted text-base leading-relaxed">
                  {value.description}
                </p>
              </Card>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}