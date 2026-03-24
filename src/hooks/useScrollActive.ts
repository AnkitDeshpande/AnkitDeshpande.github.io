import { useState, useEffect } from "react";

const SECTION_TITLES: Record<string, string> = {
  home: "Ankit Deshpande | Portfolio",
  about: "About | Ankit Deshpande",
  skills: "Skills | Ankit Deshpande",
  github: "GitHub Activity | Ankit Deshpande",
  leetcode: "LeetCode | Ankit Deshpande",
  qualification: "My Journey | Ankit Deshpande",
  projects: "Projects | Ankit Deshpande",
  contact: "Contact | Ankit Deshpande",
};

export function useScrollActive(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState<string>(
    sectionIds[0] ?? "",
  );

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      for (const id of [...sectionIds].reverse()) {
        const el = document.getElementById(id);
        if (el && scrollY >= el.offsetTop - 80) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionIds]);

  useEffect(() => {
    const title = SECTION_TITLES[activeSection];
    if (title) document.title = title;
  }, [activeSection]);

  return activeSection;
}
