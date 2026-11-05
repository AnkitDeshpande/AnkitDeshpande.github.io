import { Metadata } from "next";
import { Experience } from "@/components/about/Experience";
import { Skills } from "@/components/about/Skills";
import { Values } from "@/components/about/Values";

export const metadata: Metadata = {
  title: "About",
  description: "Backend engineer with 3+ years crafting scalable systems. Journey from diploma to production systems at scale.",
};

export default function AboutPage() {
  return (
    <main>
      <Experience />
      <Skills />
      <Values />
    </main>
  );
}