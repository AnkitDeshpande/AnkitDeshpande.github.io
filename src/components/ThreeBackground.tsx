import { useEffect, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useThemeContext } from "../context/ThemeContext";
import ThreeScene from "./ThreeScene";

const SECTION_IDS = ["home", "about", "skills", "github", "leetcode", "qualification", "projects", "contact"];

export default function ThreeBackground() {
  const { isDark } = useThemeContext();
  const [activeSection, setActiveSection] = useState("home");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollSpeed, setScrollSpeed] = useState(0);
  const prevRef = useRef(0);
  const tickingRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { threshold: 0.2, rootMargin: "-80px 0px 0px 0px" },
    );

    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(Math.min(window.scrollY / total, 1));

      if (!tickingRef.current) {
        window.requestAnimationFrame(() => {
          const diff = Math.abs(window.scrollY - prevRef.current);
          prevRef.current = window.scrollY;
          setScrollSpeed(Math.min(diff / 150, 3));
          tickingRef.current = false;
        });
        tickingRef.current = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60, near: 0.1, far: 50 }}
        dpr={[0.5, 1.5]}
        gl={{
          alpha: true,
          antialias: false,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <ThreeScene
          activeSection={activeSection}
          scrollProgress={scrollProgress}
          scrollSpeed={scrollSpeed}
          isDark={isDark}
        />
        <EffectComposer>
          <Bloom
            luminanceThreshold={0.08}
            luminanceSmoothing={0.8}
            intensity={1.0}
            mipmapBlur
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
