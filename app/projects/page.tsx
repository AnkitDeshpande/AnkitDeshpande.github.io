import { Metadata } from "next";
import { ProjectGrid } from "@/components/projects/ProjectCard";
import { getFeaturedProjects, getAllProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Real systems I've built: case studies with architecture, challenges, and measurable outcomes.",
};

export default function ProjectsPage() {
  const featured = getFeaturedProjects()[0];
  const projects = getAllProjects().filter((p) => p.slug !== featured?.slug);

  return (
    <main>
      <ProjectGrid featured={featured} projects={projects} />
    </main>
  );
}