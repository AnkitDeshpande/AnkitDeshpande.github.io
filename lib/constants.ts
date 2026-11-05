export const siteConfig = {
  name: "Ankit Deshpande",
  title: "Backend Engineer",
  description: "Backend engineer crafting scalable systems with Java, Spring Boot, and cloud-native architectures.",
  url: "https://ankitdeshpande.dev",
  ogImage: "/opengraph-image",
  email: "ankitdeshpande1998@gmail.com",
  phone: "+91 7887977547",
  location: "Bengaluru, India",
  resumeUrl: "/Ankit-Deshpande-Resume.pdf",
};

export const socialLinks = {
  github: "https://github.com/AnkitDeshpande",
  linkedin: "https://www.linkedin.com/in/ankit-deshpande-54089221b/",
  twitter: "https://twitter.com/ankitdeshpande",
  email: "mailto:ankitdeshpande1998@gmail.com",
} as const;

export const navItems = [
  { label: "Work", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/#contact" },
] as const;

export const techCategories = [
  "Language",
  "Framework",
  "Database",
  "Infrastructure",
  "Tooling",
  "Practice",
] as const;

export const proficiencyLevels = [
  "Learning",
  "Intermediate",
  "Advanced",
  "Expert",
] as const;