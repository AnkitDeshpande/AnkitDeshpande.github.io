import { useState, useEffect } from "react";

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

  return activeSection;
}
