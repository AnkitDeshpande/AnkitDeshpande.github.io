import { useEffect } from "react";
import { motion, useMotionValue } from "framer-motion";

const ScrollProgress = () => {
  const scaleX = useMotionValue(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollY = window.scrollY;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? scrollY / scrollHeight : 0;
      scaleX.set(progress);
    };

    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    updateScrollProgress();

    return () => {
      window.removeEventListener("scroll", updateScrollProgress);
    };
  }, [scaleX]);

  return (
    <motion.div
      style={{
        scaleX,
        transformOrigin: "left",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "3px",
        zIndex: 9999,
      }}
      className="bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.7)]"
    />
  );
};

export default ScrollProgress;
