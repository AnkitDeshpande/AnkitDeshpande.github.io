import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Code2, Server, Users, BookOpen } from "lucide-react";
import clsx from "clsx";
import {
  skillGroups,
  techStackRow1,
  techStackRow2,
  techStackRow3,
} from "../data/skills";

const ICON_MAP: Record<string, React.ElementType> = {
  Code2,
  Server,
  Users,
  BookOpen,
};

interface Props {
  isDark: boolean;
}

function SkillBar({
  name,
  percentage,
  isDark,
  visible,
}: {
  name: string;
  percentage: number;
  isDark: boolean;
  visible: boolean;
}) {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1.5">
        <span
          className={clsx(
            "text-sm font-medium",
            isDark ? "text-slate-200" : "text-slate-700",
          )}
        >
          {name}
        </span>
        <span className="text-sm text-emerald-400 font-medium">
          {percentage}%
        </span>
      </div>
      <div
        className={clsx(
          "h-2 rounded-full overflow-hidden",
          isDark ? "bg-slate-700" : "bg-slate-200",
        )}
      >
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500"
          initial={{ width: 0 }}
          animate={{ width: visible ? `${percentage}%` : 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

function TechStackRow({
  items,
  isDark,
}: {
  items: { src: string; alt: string }[];
  isDark: boolean;
}) {
  return (
    <div className="flex flex-wrap justify-center gap-6 mb-6">
      {items.map((item) => (
        <motion.div
          key={item.alt}
          whileHover={{ scale: 1.15, y: -4 }}
          className={clsx(
            "flex flex-col items-center gap-2 p-3 rounded-xl border transition-all duration-200 cursor-default",
            isDark
              ? "border-slate-700 bg-slate-800 hover:border-emerald-500/50"
              : "border-slate-200 bg-white hover:border-emerald-400/50",
          )}
        >
          <img
            src={item.src}
            alt={item.alt}
            className="w-10 h-10 object-contain"
          />
          <span
            className={clsx(
              "text-xs font-medium",
              isDark ? "text-slate-400" : "text-slate-500",
            )}
          >
            {item.alt}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

export default function Skills({ isDark }: Props) {
  const [openGroup, setOpenGroup] = useState<string>("frontend");
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="skills"
      className={clsx("py-20", isDark ? "bg-slate-900" : "bg-white")}
      ref={sectionRef}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className={clsx(
              "text-3xl sm:text-4xl font-bold mb-2",
              isDark ? "text-white" : "text-slate-900",
            )}
          >
            My <span className="gradient-text">Skills</span>
          </h2>
          <span
            className={clsx(
              "text-sm",
              isDark ? "text-emerald-400" : "text-emerald-600",
            )}
          >
            My technical level
          </span>
        </motion.div>

        {/* Accordion */}
        <div className="max-w-2xl mx-auto mb-16 space-y-3">
          {skillGroups.map((group, i) => {
            const Icon = ICON_MAP[group.icon] ?? Code2;
            const isOpen = openGroup === group.id;
            return (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={clsx(
                  "rounded-xl border overflow-hidden",
                  isDark
                    ? "border-slate-700 bg-slate-800"
                    : "border-slate-200 bg-white",
                )}
              >
                <button
                  onClick={() => setOpenGroup(isOpen ? "" : group.id)}
                  className="w-full flex items-center justify-between p-5"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-500/10">
                      <Icon size={18} className="text-emerald-400" />
                    </div>
                    <div className="text-left">
                      <div
                        className={clsx(
                          "font-semibold",
                          isDark ? "text-white" : "text-slate-900",
                        )}
                      >
                        {group.title}
                      </div>
                      {group.subtitle && (
                        <div
                          className={clsx(
                            "text-xs",
                            isDark ? "text-slate-400" : "text-slate-500",
                          )}
                        >
                          {group.subtitle}
                        </div>
                      )}
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown
                      size={18}
                      className={isDark ? "text-slate-400" : "text-slate-500"}
                    />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className={clsx(
                        "px-5 pb-5 border-t",
                        isDark ? "border-slate-700" : "border-slate-100",
                      )}
                    >
                      <div className="pt-4">
                        {group.skills.map((skill) => (
                          <SkillBar
                            key={skill.name}
                            name={skill.name}
                            percentage={skill.percentage}
                            isDark={isDark}
                            visible={visible && isOpen}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Tech stack */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3
            className={clsx(
              "text-xl font-semibold text-center mb-8",
              isDark ? "text-white" : "text-slate-900",
            )}
          >
            Tech Stack
          </h3>
          <TechStackRow items={techStackRow1} isDark={isDark} />
          <TechStackRow items={techStackRow2} isDark={isDark} />
          <TechStackRow items={techStackRow3} isDark={isDark} />
        </motion.div>
      </div>
    </section>
  );
}
