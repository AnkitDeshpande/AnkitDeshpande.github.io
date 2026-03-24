import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Github,
  Video,
  LayoutGrid,
  LayoutList,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
} from "lucide-react";
import clsx from "clsx";
import { projects, type Project } from "../data/projects";

interface Props {
  isDark: boolean;
}

// ─── Shared buttons ───────────────────────────────────────────────────────────
function ProjectLinks({
  project,
  isDark,
}: {
  project: Project;
  isDark: boolean;
}) {
  return (
    <div className="flex gap-2 flex-wrap">
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-medium transition-all duration-200"
        >
          <ExternalLink size={11} /> Live
        </a>
      )}
      {project.videoUrl && (
        <a
          href={project.videoUrl}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-500 hover:bg-blue-400 text-white text-xs font-medium transition-all duration-200"
        >
          <Video size={11} /> Demo
        </a>
      )}
      <a
        href={project.repoUrl}
        target="_blank"
        rel="noreferrer"
        className={clsx(
          "flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all duration-200",
          isDark
            ? "border-slate-600 text-slate-300 hover:border-slate-500 hover:text-white hover:bg-slate-700"
            : "border-slate-300 text-slate-600 hover:border-slate-400 hover:bg-slate-50",
        )}
      >
        <Github size={11} /> Repo
      </a>
    </div>
  );
}

// ─── Spotlight layout (default) ───────────────────────────────────────────────
function SpotlightView({ isDark }: { isDark: boolean }) {
  return (
    <div className="space-y-8">
      {projects.map((project, i) => {
        const isEven = i % 2 === 0;
        return (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: i * 0.07 }}
            className={clsx(
              "group flex flex-col md:flex-row rounded-2xl border overflow-hidden transition-all duration-300",
              !isEven && "md:flex-row-reverse",
              isDark
                ? "border-slate-700 bg-slate-800 hover:border-emerald-500/40 hover:shadow-2xl hover:shadow-emerald-500/5"
                : "border-slate-200 bg-white hover:border-emerald-400/40 hover:shadow-2xl hover:shadow-emerald-500/10",
            )}
          >
            {/* Image */}
            <div className="relative md:w-2/5 overflow-hidden h-64 md:h-auto flex-shrink-0 bg-slate-900">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="240" viewBox="0 0 400 240"><rect width="400" height="240" fill="%231e293b"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" font-family="sans-serif" font-size="14" fill="%2364748b">No Image</text></svg>';
                }}
              />
              <div
                className={clsx(
                  "absolute inset-0",
                  isEven
                    ? "bg-gradient-to-r from-transparent to-black/20 md:bg-gradient-to-l"
                    : "bg-gradient-to-l from-transparent to-black/20 md:bg-gradient-to-r",
                )}
              />
              {/* Number badge */}
              <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
                <span className="text-white text-xs font-bold">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center flex-1 p-6 sm:p-8">
              <h3
                className={clsx(
                  "text-xl font-bold mb-3",
                  isDark ? "text-white" : "text-slate-900",
                )}
              >
                {project.title}
              </h3>
              <p
                className={clsx(
                  "text-sm leading-relaxed mb-4",
                  isDark ? "text-slate-400" : "text-slate-600",
                )}
              >
                {project.description}
              </p>
              {/* Tech pills */}
              <div className="flex flex-wrap gap-2 mb-5">
                {project.techStack.split(",").map((t) => (
                  <span
                    key={t}
                    className={clsx(
                      "px-2.5 py-1 rounded-full text-xs font-medium",
                      isDark
                        ? "bg-slate-700 text-emerald-400"
                        : "bg-emerald-50 text-emerald-700",
                    )}
                  >
                    {t.trim()}
                  </span>
                ))}
              </div>
              <ProjectLinks project={project} isDark={isDark} />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

// ─── Grid layout (legacy) ─────────────────────────────────────────────────────
function GridView({ isDark }: { isDark: boolean }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project, i) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.08 }}
          whileHover={{ y: -4 }}
          className={clsx(
            "flex flex-col rounded-2xl border overflow-hidden transition-all duration-300",
            isDark
              ? "border-slate-700 bg-slate-800 hover:border-emerald-500/40 hover:shadow-xl hover:shadow-emerald-500/5"
              : "border-slate-200 bg-white hover:border-emerald-400/40 hover:shadow-xl hover:shadow-emerald-500/10",
          )}
        >
          <div className="relative overflow-hidden h-56 bg-slate-900">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-contain transition-transform duration-500 hover:scale-105"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="176" viewBox="0 0 400 176"><rect width="400" height="176" fill="%231e293b"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" font-family="sans-serif" font-size="14" fill="%2364748b">No Image</text></svg>';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>
          <div className="flex flex-col flex-1 p-5">
            <h3
              className={clsx(
                "font-bold text-base mb-2",
                isDark ? "text-white" : "text-slate-900",
              )}
            >
              {project.title}
            </h3>
            <p
              className={clsx(
                "text-sm leading-relaxed mb-3 flex-1",
                isDark ? "text-slate-400" : "text-slate-600",
              )}
            >
              {project.description}
            </p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.techStack.split(",").map((t) => (
                <span
                  key={t}
                  className={clsx(
                    "px-2 py-0.5 rounded-full text-[11px] font-medium",
                    isDark
                      ? "bg-slate-700 text-emerald-400"
                      : "bg-emerald-50 text-emerald-700",
                  )}
                >
                  {t.trim()}
                </span>
              ))}
            </div>
            <ProjectLinks project={project} isDark={isDark} />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Slider layout ────────────────────────────────────────────────────────────
function SliderView({ isDark }: { isDark: boolean }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const go = (next: number) => {
    setDirection(next > index ? 1 : -1);
    setIndex(next);
  };
  const prev = () => go(index === 0 ? projects.length - 1 : index - 1);
  const next = () => go(index === projects.length - 1 ? 0 : index + 1);

  const project = projects[index];

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Slide — full-bleed image with overlaid content */}
      <div
        className="relative w-full rounded-2xl overflow-hidden"
        style={{ height: 600 }}
      >
        {/* Prev / Next arrows — sit outside the AnimatePresence so they don't slide */}
        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm transition-all duration-200"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm transition-all duration-200"
        >
          <ChevronRight size={20} />
        </button>

        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={project.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            {/* Full-bleed image */}
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-contain bg-slate-900"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="520" viewBox="0 0 800 520"><rect width="800" height="520" fill="%231e293b"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" font-family="sans-serif" font-size="16" fill="%2364748b">No Image</text></svg>';
              }}
            />

            {/* Gradient overlay — darker at bottom for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

            {/* Counter badge */}
            <div className="absolute top-5 right-5 px-3 py-1 rounded-full bg-emerald-500/90 backdrop-blur-sm text-white text-xs font-bold">
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(projects.length).padStart(2, "0")}
            </div>

            {/* Content pinned to bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                {project.title}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-4 max-w-2xl line-clamp-2">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-5">
                {project.techStack.split(",").map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-full text-xs font-medium bg-white/10 text-emerald-300 backdrop-blur-sm border border-white/10"
                  >
                    {t.trim()}
                  </span>
                ))}
              </div>
              <ProjectLinks project={project} isDark={true} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dot controls */}
      <div className="flex gap-2">
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            className={clsx(
              "rounded-full transition-all duration-300",
              i === index
                ? "w-6 h-2 bg-emerald-500"
                : clsx(
                    "w-2 h-2",
                    isDark
                      ? "bg-slate-600 hover:bg-slate-400"
                      : "bg-slate-300 hover:bg-slate-400",
                  ),
            )}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────
export default function Projects({ isDark }: Props) {
  const [layout, setLayout] = useState<"spotlight" | "grid" | "slider">(
    "slider",
  );

  return (
    <section
      id="projects"
      className={clsx("py-20", isDark ? "bg-slate-800/50" : "bg-slate-50")}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header + toggle */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h2
              className={clsx(
                "text-3xl sm:text-4xl font-bold mb-1",
                isDark ? "text-white" : "text-slate-900",
              )}
            >
              My <span className="gradient-text">Projects</span>
            </h2>
            <span
              className={clsx(
                "text-sm",
                isDark ? "text-emerald-400" : "text-emerald-600",
              )}
            >
              Most recent work
            </span>
          </div>

          {/* Layout toggle */}
          <div
            className={clsx(
              "flex rounded-xl p-1 self-start sm:self-auto",
              isDark ? "bg-slate-800" : "bg-slate-200",
            )}
          >
            {(
              [
                { key: "slider", icon: SlidersHorizontal, label: "Slider" },
                { key: "spotlight", icon: LayoutList, label: "Spotlight" },
                { key: "grid", icon: LayoutGrid, label: "Grid" },
              ] as const
            ).map(({ key, icon: Icon, label }) => (
              <button
                key={key}
                onClick={() => setLayout(key)}
                title={`${label} view`}
                className={clsx(
                  "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  layout === key
                    ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/25"
                    : isDark
                      ? "text-slate-400 hover:text-white"
                      : "text-slate-500 hover:text-slate-900",
                )}
              >
                <Icon size={15} />
                {label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Layout views */}
        <AnimatePresence mode="wait">
          <motion.div
            key={layout}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
          >
            {layout === "spotlight" && <SpotlightView isDark={isDark} />}
            {layout === "slider" && <SliderView isDark={isDark} />}
            {layout === "grid" && <GridView isDark={isDark} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
