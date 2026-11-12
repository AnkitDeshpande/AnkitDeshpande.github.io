import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { Experience } from "@/components/about/Experience";
import { Skills } from "@/components/about/Skills";
import { Values } from "@/components/about/Values";
import { ProjectGrid } from "@/components/projects/ProjectCard";
import { getFeaturedProjects, getAllProjects } from "@/lib/projects";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Ankit Deshpande · Backend Engineer",
  description: "Backend engineer crafting scalable systems with Java, Spring Boot, and cloud-native architectures. 3+ years building resilient, observable backend services.",
};

export default function Page() {
  const featured = getFeaturedProjects()[0];
  const projects = getAllProjects().filter((p) => p.slug !== featured?.slug);

  return (
    <>
      <Hero />
      <Experience />
      <Skills />
      <Values />
      <ProjectGrid featured={featured} projects={projects} />
      <ContactForm />
    </>
  );
}