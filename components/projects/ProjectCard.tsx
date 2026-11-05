"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, Code, Play } from "@/components/ui/Icons";
import { Card } from "@/components/ui";
import { Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
      className="group"
    >
      <Card className="overflow-hidden h-full flex flex-col">
        <Link
          href={`/projects/${project.slug}`}
          className="relative aspect-video overflow-hidden"
          aria-label={`View ${project.title} case study`}
        >
          <Image
            src={project.images.hero}
            alt={`${project.title} preview`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-bg/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {project.links.live && (
            <motion.a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="absolute bottom-4 right-4 p-3 bg-bg/95 border border-border rounded-lg hover:border-crimson/50 hover:bg-bg transition-colors group-hover:opacity-100 opacity-0"
              aria-label={`View ${project.title} live demo`}
            >
              <ExternalLink className="w-5 h-5 text-fg" aria-hidden="true" />
            </motion.a>
          )}
          
          <motion.a
            href={project.links.github}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="absolute bottom-4 left-4 p-3 bg-bg/95 border border-border rounded-lg hover:border-crimson/50 hover:bg-bg transition-colors group-hover:opacity-100 opacity-0"
            aria-label={`View ${project.title} source code`}
          >
            <Code className="w-5 h-5 text-fg" aria-hidden="true" />
          </motion.a>
        </Link>

        <div className="p-6 flex flex-col flex-1">
          <div className="flex items-center gap-2 mb-3">
            {project.featured && (
              <span className="badge badge-crimson">Featured</span>
            )}
            <span className="text-xs font-mono text-fg-subtle">{project.duration}</span>
          </div>

          <h3 className="font-display font-bold text-xl text-fg mb-2 group-hover:text-crimson-light transition-colors">
            {project.title}
          </h3>

          <p className="text-fg-muted text-sm leading-relaxed mb-4 flex-1">
            {project.summary}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.slice(0, 2).flatMap((t) => t.items.slice(0, 3)).map((tech, i) => (
              <span
                key={`${tech}-${i}`}
                className="px-2 py-0.5 text-xs font-mono text-fg-muted bg-bg-elevated border border-border rounded hover:border-crimson/50 hover:text-crimson-light transition-colors"
              >
                {tech}
              </span>
            ))}
            {project.tech.reduce((acc, t) => acc + t.items.length, 0) > 6 && (
              <span className="px-2 py-0.5 text-xs font-mono text-fg-subtle bg-bg-elevated border border-border rounded">
                +{project.tech.reduce((acc, t) => acc + t.items.length, 0) - 6} more
              </span>
            )}
          </div>

          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-crimson-light hover:text-crimson transition-colors"
          >
            View Case Study
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </Link>
        </div>
      </Card>
    </motion.article>
  );
}

interface FeaturedProjectProps {
  project: Project;
}

export function FeaturedProject({ project }: FeaturedProjectProps) {
  return (
    <article className="group relative">
      <Link
        href={`/projects/${project.slug}`}
        className="relative aspect-[16/10] overflow-hidden rounded-2xl"
        aria-label={`View ${project.title} case study`}
      >
        <Image
          src={project.images.hero}
          alt={`${project.title} preview`}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 60vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-bg/75" />
        
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="badge badge-crimson">Featured</span>
              <span className="text-sm font-mono text-fg-subtle">{project.duration}</span>
              <span className="text-sm font-mono text-fg-subtle">{project.teamSize} person team</span>
            </div>
            <h2 className="font-display font-bold text-3xl lg:text-4xl text-fg mb-3 group-hover:text-crimson-light transition-colors">
              {project.title}
            </h2>
            <p className="text-fg-muted text-lg leading-relaxed mb-6 max-w-xl">
              {project.summary}
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tech.slice(0, 3).flatMap((t) => t.items.slice(0, 4)).map((tech, i) => (
                <span
                  key={`${tech}-${i}`}
                  className="px-3 py-1 text-sm font-mono text-fg bg-bg-elevated border border-border rounded-lg hover:border-crimson/50 hover:text-crimson-light transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="inline-flex items-center gap-2 text-crimson-light font-semibold">
              View Case Study
              <motion.span
                animate={{ x: [0, 6, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                →
              </motion.span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}

interface ProjectGridProps {
  projects: Project[];
  featured?: Project;
}

export function ProjectGrid({ projects, featured }: ProjectGridProps) {
  return (
    <section id="projects" className="section">
      <div className="container">
        <header className="section-header mb-16">
          <span className="section-label">Selected Work</span>
          <h2 className="section-title">Projects</h2>
          <p className="section-description">
            Real systems I've built, from high-throughput reservation platforms to collaborative marketplaces.
            Each case study dives into the problem, architecture, challenges, and measurable outcomes.
          </p>
        </header>

        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <FeaturedProject project={featured} />
          </motion.div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}