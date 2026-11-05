import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink, Github, ChevronLeft, ArrowRight } from "@/components/ui/Icons";
import { getProject, getProjectSlugs } from "@/lib/projects";
import { Card, Separator } from "@/components/ui";
import { MotionDiv, MotionLi } from "@/components/ui/Motion";
import { Button } from "@/components/ui/Button";
import { formatDateRange } from "@/lib/utils";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const project = getProject(resolvedParams.slug);
  
  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      images: [project.images.hero],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.summary,
      images: [project.images.hero],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const resolvedParams = await params;
  const project = getProject(resolvedParams.slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <article>
        <header className="relative min-h-[50vh] lg:min-h-[60vh] flex items-end overflow-hidden">
          <Image
            src={project.images.hero}
            alt={`${project.title} hero`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-bg/75" />
          
          <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
            <div className="container max-w-5xl">
              <MotionDiv
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    {project.featured && (
                      <span className="badge badge-crimson">Featured</span>
                    )}
                    <span className="badge badge-muted">{project.role}</span>
                    <span className="text-sm font-mono text-fg-subtle">
                      {project.duration} • {project.teamSize} person team
                    </span>
                  </div>
                  <h1 className="font-display font-black text-4xl lg:text-6xl text-fg leading-tight mb-4">
                    {project.title}
                  </h1>
                  <p className="text-fg-muted text-lg lg:text-xl max-w-2xl leading-relaxed">
                    {project.summary}
                  </p>
                </div>
                <div className="flex items-center gap-4 flex-wrap">
                  {project.links.live && (
                    <Button
                      asChild
                      variant="primary"
                      size="lg"
                      className="gap-2"
                    >
                      <a href={project.links.live} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-5 h-5" aria-hidden="true" />
                        Live Demo
                      </a>
                    </Button>
                  )}
                  {project.links.github && (
                    <Button
                      asChild
                      variant="secondary"
                      size="lg"
                      className="gap-2"
                    >
                      <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                        <Github className="w-5 h-5" aria-hidden="true" />
                        Source Code
                      </a>
                    </Button>
                  )}
                </div>
              </MotionDiv>
            </div>
          </div>
        </header>

        <div className="container max-w-5xl py-16 lg:py-24 px-6">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="prose prose-invert max-w-none"
          >
            <section className="mb-16">
              <h2 className="font-display font-bold text-2xl lg:text-3xl text-fg mb-6 flex items-center gap-3">
                <span className="text-crimson font-mono text-sm" aria-hidden="true">//</span>
                The Problem
              </h2>
              <p className="text-fg-muted text-lg leading-relaxed max-w-3xl">
                {project.problem}
              </p>
            </section>

            <section className="mb-16">
              <h2 className="font-display font-bold text-2xl lg:text-3xl text-fg mb-6 flex items-center gap-3">
                <span className="text-crimson font-mono text-sm" aria-hidden="true">//</span>
                The Solution
              </h2>
              <p className="text-fg-muted text-lg leading-relaxed max-w-3xl mb-8">
                {project.solution}
              </p>

              {project.architecture && (
                <div className="bg-bg-card/60 border border-border rounded-2xl p-6 overflow-x-auto">
                  <pre className="text-fg-muted text-sm font-mono leading-relaxed">{project.architecture}</pre>
                </div>
              )}
            </section>

            <section className="mb-16">
              <h2 className="font-display font-bold text-2xl lg:text-3xl text-fg mb-6 flex items-center gap-3">
                <span className="text-crimson font-mono text-sm" aria-hidden="true">//</span>
                Tech Stack
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {project.tech.map((category) => (
                  <Card key={category.category} className="p-5">
                    <h3 className="font-mono text-xs font-semibold text-crimson-light uppercase tracking-wider mb-3">
                      {category.category}
                    </h3>
                    <ul className="space-y-2">
                      {category.items.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-fg-muted">
                          <span className="w-1.5 h-1.5 bg-crimson/30 rounded-full" aria-hidden="true" />
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                ))}
              </div>
            </section>

            <section className="mb-16">
              <h2 className="font-display font-bold text-2xl lg:text-3xl text-fg mb-6 flex items-center gap-3">
                <span className="text-crimson font-mono text-sm" aria-hidden="true">//</span>
                Key Challenges
              </h2>
              <ul className="space-y-4">
                {project.challenges.map((challenge, i) => (
                  <MotionLi
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-4 p-5 bg-bg-card/60 border border-border rounded-xl hover:border-crimson/30 transition-colors"
                  >
                    <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-crimson/10 flex items-center justify-center">
                      <span className="font-display font-bold text-crimson text-lg">{i + 1}</span>
                    </span>
                    <p className="text-fg text-base leading-relaxed pt-1">{challenge}</p>
                  </MotionLi>
                ))}
              </ul>
            </section>

            <section className="mb-16">
              <h2 className="font-display font-bold text-2xl lg:text-3xl text-fg mb-6 flex items-center gap-3">
                <span className="text-crimson font-mono text-sm" aria-hidden="true">//</span>
                Outcomes & Metrics
              </h2>
              <ul className="space-y-3">
                {project.outcomes.map((outcome, i) => (
                  <MotionLi
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex gap-3 p-4 bg-bg-card/60 border border-border rounded-lg"
                  >
                    <svg
                      className="flex-shrink-0 w-5 h-5 text-crimson mt-0.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    <p className="text-fg text-base leading-relaxed">{outcome}</p>
                  </MotionLi>
                ))}
              </ul>
            </section>

            {project.images.screenshots.length > 0 && (
              <section className="mb-16">
                <h2 className="font-display font-bold text-2xl lg:text-3xl text-fg mb-6 flex items-center gap-3">
                  <span className="text-crimson font-mono text-sm" aria-hidden="true">//</span>
                  Screenshots
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {project.images.screenshots.map((screenshot, i) => (
                    <MotionDiv
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="group relative aspect-video overflow-hidden rounded-xl border border-border hover:border-crimson/50 transition-colors"
                    >
                      <Image
                        src={screenshot}
                        alt={`${project.title} screenshot ${i + 1}`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </MotionDiv>
                  ))}
                </div>
              </section>
            )}
          </MotionDiv>

          <Separator className="my-12" />

          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-fg-muted hover:text-crimson-light transition-colors font-medium"
            >
              <ChevronLeft className="w-5 h-5" aria-hidden="true" />
              Back to Projects
            </Link>
            <div className="flex items-center gap-4">
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-crimson-light hover:text-crimson border border-crimson/30 rounded-lg hover:border-crimson/50 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                  Live Demo
                </a>
              )}
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-fg-muted hover:text-crimson-light border border-border-hover rounded-lg hover:border-crimson/30 transition-colors"
                >
                  <Github className="w-4 h-4" aria-hidden="true" />
                  Source Code
                </a>
              )}
            </div>
          </MotionDiv>
        </div>
      </article>
    </main>
  );
}