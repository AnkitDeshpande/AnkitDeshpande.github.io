import { useState, useEffect } from "react";

export function useElementPosition(id: string) {
  const [pos, setPos] = useState({ x: 0, y: 0, w: 0, h: 0 });

  useEffect(() => {
    const update = () => {
      const el = document.getElementById(id);
      if (!el) return;
      const r = el.getBoundingClientRect();
      setPos({
        x: r.left + r.width / 2,
        y: r.top + r.height / 2,
        w: r.width,
        h: r.height,
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [id]);

  return pos;
}
