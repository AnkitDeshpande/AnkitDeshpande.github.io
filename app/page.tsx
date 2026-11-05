import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Ankit Deshpande · Backend Engineer",
  description: "Backend engineer crafting scalable systems with Java, Spring Boot, and cloud-native architectures.",
};

export default function Page() {
  return (
    <>
      <Hero />
      <ContactForm />
    </>
  );
}
