"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, MapPin, Calendar } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  location: string;
  type: "work" | "education";
  description: string[];
  technologies: string[];
}

const experiences: ExperienceItem[] = [
  {
    role: "Software Engineer",
    company: "Agile Soft Systems",
    period: "Dec 2023 – Aug 2025",
    location: "Bengaluru, India",
    type: "work",
    description: [
      "Designed and implemented scalable backend services using Java 17, Spring Boot 3, and PostgreSQL",
      "Built event-driven architectures with Kafka for inter-service communication",
      "Optimized database queries reducing p95 latency by 40% through indexing and query restructuring",
      "Implemented observability stack (Prometheus, Grafana, OpenTelemetry) achieving 99.9% SLA visibility",
      "Mentored 3 junior developers on clean code practices, testing strategies, and system design",
    ],
    technologies: ["Java 17", "Spring Boot 3", "PostgreSQL", "Kafka", "Redis", "Docker", "Kubernetes", "AWS"],
  },
  {
    role: "Assessment Assistant",
    company: "Masai School",
    period: "Oct 2023 – Apr 2024",
    location: "Remote",
    type: "work",
    description: [
      "Evaluated 200+ student projects across full-stack web development curriculum",
      "Provided detailed code reviews focusing on architecture, security, and performance",
      "Designed assessment rubrics for backend engineering competencies",
      "Conducted mock system design interviews for graduating cohorts",
    ],
    technologies: ["JavaScript", "React", "Node.js", "MongoDB", "System Design"],
  },
  {
    role: "Full Stack Web Developer Trainee",
    company: "Masai School",
    period: "Oct 2022 – Oct 2023",
    location: "Bengaluru, India",
    type: "education",
    description: [
      "Intensive 1200+ hour full-stack program covering DSA, backend, frontend, and DevOps",
      "Built 6 production-grade projects including Book My Bus (10k+ daily transactions)",
      "Ranked top 5% in cohort for backend engineering and system design assessments",
      "Selected as Teaching Assistant for Spring Boot and Database modules",
    ],
    technologies: ["Java", "Spring Boot", "Hibernate", "MySQL", "React", "Redis", "AWS", "Docker"],
  },
  {
    role: "Bachelor of Vocation in Software Development",
    company: "MIT, Aurangabad",
    period: "2018 – 2021",
    location: "Aurangabad, India",
    type: "education",
    description: [
      "Core CS curriculum: Data Structures, Algorithms, OS, Networks, Databases",
      "Final year project: Distributed File System with Java RMI",
      "Active member of Coding Club, organized hackathons and peer learning sessions",
    ],
    technologies: ["Java", "C", "Data Structures", "Operating Systems", "Computer Networks"],
  },
  {
    role: "Diploma in Information Technology",
    company: "GPC, Hingoli",
    period: "2014 – 2017",
    location: "Hingoli, India",
    type: "education",
    description: [
      "Foundation in programming, web technologies, and database management",
      "Built first full-stack project: College Library Management System",
      "Developed interest in backend systems and data structures",
    ],
    technologies: ["C", "HTML/CSS", "JavaScript", "SQL", "PHP"],
  },
];

export function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container">
        <header className="section-header max-w-3xl mx-auto text-center mb-16">
          <span className="section-label">Journey</span>
          <h2 className="section-title">Experience</h2>
          <p className="section-description">
            From diploma to production systems: the path that shaped how I build software.
          </p>
        </header>

        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-crimson/20" aria-hidden="true" />

          <div className="space-y-12 relative">
            {experiences.map((exp, index) => (
              <motion.article
                key={`${exp.type}-${index}`}
                initial={{ opacity: 0, x: exp.type === "work" ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
                className={cn(
                  "relative pl-16",
                  exp.type === "work" && "lg:pl-20"
                )}
              >
                <div className="absolute left-6 top-1 w-3 h-3 rounded-full border-2 bg-bg z-10 flex-shrink-0"
                  style={{
                    borderColor: exp.type === "work" ? "var(--color-crimson)" : "var(--color-border-hover)",
                    backgroundColor: exp.type === "work" ? "var(--color-crimson)" : "var(--color-border-hover)",
                  }}
                  aria-hidden="true"
                />
                
                <div className="relative bg-bg-card/60 border border-border rounded-2xl p-6 hover:border-crimson/30 transition-colors">
                  <div className="flex items-center gap-3 mb-4">
                    <span className={cn(
                      "badge px-3 py-1",
                      exp.type === "work" ? "badge-crimson" : "badge-muted"
                    )}>
                      {exp.type === "work" ? "Work" : "Education"}
                    </span>
                    <span className="text-sm font-mono text-fg-subtle">
                      <Calendar className="w-3 h-3 inline-block mr-1" aria-hidden="true" />
                      {exp.period}
                    </span>
                  </div>

                  <div className="flex items-baseline gap-2 mb-2">
                    <h3 className="font-display font-bold text-xl text-fg">{exp.role}</h3>
                    <span className="text-fg-muted">at</span>
                    <span className="font-semibold text-crimson-light">{exp.company}</span>
                  </div>

                  <div className="flex items-center gap-2 text-fg-subtle text-sm mb-4">
                    <MapPin className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
                    <span>{exp.location}</span>
                  </div>

                  <ul className="space-y-2 mb-4">
                    {exp.description.map((desc, i) => (
                      <li key={i} className="flex gap-3 text-fg-muted text-sm leading-relaxed">
                        <span className="flex-shrink-0 w-1.5 h-1.5 bg-crimson/30 rounded-full mt-2" aria-hidden="true" />
                        <span>{desc}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.slice(0, 8).map((tech, i) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs font-mono text-fg-muted bg-bg-elevated border border-border rounded hover:border-crimson/50 hover:text-crimson-light transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                    {exp.technologies.length > 8 && (
                      <span className="px-2 py-1 text-xs font-mono text-fg-subtle bg-bg-elevated border border-border rounded">
                        +{exp.technologies.length - 8} more
                      </span>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}