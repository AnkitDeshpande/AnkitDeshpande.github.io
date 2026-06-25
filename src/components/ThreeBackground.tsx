import { useCallback, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useThemeContext } from "../context/ThemeContext";
import ThreeScene from "./ThreeScene";

export default function ThreeBackground() {
  const { isDark } = useThemeContext();
  const [scrollSpeed, setScrollSpeed] = useState(0);
  const prevRef = useRef(0);
  const tickingRef = useRef(false);

  const handleScroll = useCallback(() => {
    if (!tickingRef.current) {
      window.requestAnimationFrame(() => {
        const diff = Math.abs(window.scrollY - prevRef.current);
        prevRef.current = window.scrollY;
        setScrollSpeed(Math.min(diff / 200, 2));
        tickingRef.current = false;
      });
      tickingRef.current = true;
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[0.5, 1.5]}
        gl={{
          alpha: true,
          antialias: false,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent", opacity: isDark ? 1 : 0.6 }}
      >
        <ThreeScene scrollSpeed={scrollSpeed} />
        <EffectComposer>
          <Bloom
            luminanceThreshold={0.15}
            luminanceSmoothing={0.9}
            intensity={0.6}
            mipmapBlur
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
