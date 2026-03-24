import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, GraduationCap, Calendar, MapPin, Flag } from "lucide-react";
import clsx from "clsx";
import {
  workEntries,
  educationEntries,
  type QualificationEntry,
} from "../data/qualification";
import { useThemeContext } from "../context/ThemeContext";

type Tab = "work" | "education";

// ─── Entry card ───────────────────────────────────────────────────────────────
function EntryCard({
  entry,
  isDark,
  align,
}: {
  entry: QualificationEntry;
  isDark: boolean;
  align: "left" | "right";
}) {
  return (
    <div
      className={clsx(
        "p-4 rounded-xl border transition-colors duration-200",
        isDark
          ? "border-slate-700 bg-slate-800 hover:border-emerald-500/40"
          : "border-slate-200 bg-white hover:border-emerald-400/40",
        align === "right" ? "text-right" : "text-left",
      )}
    >
      <h3
        className={clsx(
          "font-semibold text-sm mb-1",
          isDark ? "text-white" : "text-slate-900",
        )}
      >
        {entry.title}
      </h3>
      <p
        className={clsx(
          "text-xs mb-2",
          isDark ? "text-slate-400" : "text-slate-500",
        )}
      >
        {entry.organization}
      </p>
      <div
        className={clsx(
          "flex items-center gap-1 text-xs",
          isDark ? "text-emerald-400" : "text-emerald-600",
          align === "right" ? "justify-end" : "justify-start",
        )}
      >
        <Calendar size={10} />
        {entry.period}
      </div>
    </div>
  );
}

// ─── Milestone dot ────────────────────────────────────────────────────────────
function Milestone({
  isWork,
  isDark,
  sm,
}: {
  isWork: boolean;
  isDark: boolean;
  sm?: boolean;
}) {
  return (
    <div
      className={clsx(
        "rounded-full flex items-center justify-center",
        "bg-emerald-500 shadow-lg shadow-emerald-500/40 border-[3px]",
        isDark ? "border-slate-900" : "border-white",
        sm ? "w-8 h-8" : "w-10 h-10",
      )}
    >
      {isWork ? (
        <Briefcase size={sm ? 12 : 14} className="text-white" />
      ) : (
        <GraduationCap size={sm ? 12 : 14} className="text-white" />
      )}
    </div>
  );
}

// ─── Road strip (desktop center / mobile left) ────────────────────────────────
function RoadStrip({
  isDark,
  dashCount = 50,
}: {
  isDark: boolean;
  dashCount?: number;
}) {
  return (
    <>
      {/* Left shoulder */}
      <div
        className={clsx(
          "absolute left-0 top-0 bottom-0 w-px",
          isDark ? "bg-slate-500/50" : "bg-slate-400/50",
        )}
      />
      {/* Right shoulder */}
      <div
        className={clsx(
          "absolute right-0 top-0 bottom-0 w-px",
          isDark ? "bg-slate-500/50" : "bg-slate-400/50",
        )}
      />
      {/* Center dashes */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 flex flex-col items-center gap-2 py-3 overflow-hidden pointer-events-none">
        {Array.from({ length: dashCount }).map((_, i) => (
          <div
            key={i}
            className={clsx(
              "w-px h-4 shrink-0",
              isDark ? "bg-white/20" : "bg-white/70",
            )}
          />
        ))}
      </div>
    </>
  );
}

// ─── Route start / end marker ─────────────────────────────────────────────────
function RouteMarker({
  label,
  type,
  isDark,
}: {
  label: string;
  type: "now" | "past";
  isDark: boolean;
}) {
  return (
    <div className="flex justify-center relative z-10 py-1">
      <div
        className={clsx(
          "flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border",
          type === "now"
            ? isDark
              ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
              : "bg-emerald-50 text-emerald-600 border-emerald-200"
            : isDark
              ? "bg-slate-700 text-slate-400 border-slate-600"
              : "bg-slate-100 text-slate-500 border-slate-200",
        )}
      >
        {type === "now" ? <MapPin size={10} /> : <Flag size={10} />}
        {label}
      </div>
    </div>
  );
}

// ─── Road timeline ────────────────────────────────────────────────────────────
function RoadTimeline({
  entries,
  isDark,
  isWork,
}: {
  entries: QualificationEntry[];
  isDark: boolean;
  isWork: boolean;
}) {
  const nowLabel = isWork ? "Present" : "2021 – Latest";
  const pastLabel = isWork ? "Oct 2022 – Beginning" : "2003 – Beginning";

  return (
    <>
      {/* ── Mobile ──────────────────────────────────────────────────────── */}
      <div className="relative md:hidden">
        {/* Road strip on left */}
        <div
          className={clsx(
            "absolute top-0 bottom-0 left-4 w-10",
            isDark ? "bg-slate-600/40" : "bg-slate-300/60",
          )}
        >
          <RoadStrip isDark={isDark} dashCount={30} />
        </div>

        <RouteMarker label={nowLabel} type="now" isDark={isDark} />

        <div className="relative space-y-5 pl-16 pt-4 pb-4">
          {entries.map((entry, i) => (
            <motion.div
              key={entry.id}
              className="relative flex items-center"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              {/* Milestone sitting on road */}
              <div className="absolute -left-11 z-10">
                <Milestone isWork={isWork} isDark={isDark} sm />
              </div>
              <EntryCard entry={entry} isDark={isDark} align="left" />
            </motion.div>
          ))}
        </div>

        <RouteMarker label={pastLabel} type="past" isDark={isDark} />
      </div>

      {/* ── Desktop ─────────────────────────────────────────────────────── */}
      <div className="relative hidden md:block">
        {/* Road strip in center — must match grid center column (56 px) */}
        <div
          className={clsx(
            "absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-14",
            isDark ? "bg-slate-600/40" : "bg-slate-300/60",
          )}
        >
          <RoadStrip isDark={isDark} dashCount={50} />
        </div>

        <div className="relative space-y-8">
          <RouteMarker label={nowLabel} type="now" isDark={isDark} />

          {entries.map((entry, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={entry.id}
                className="grid grid-cols-[1fr_56px_1fr] items-center"
                initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                {/* Left card */}
                <div className="flex justify-end pr-8">
                  {isLeft && (
                    <EntryCard entry={entry} isDark={isDark} align="right" />
                  )}
                </div>

                {/* Milestone on road */}
                <div className="flex justify-center z-10">
                  <Milestone isWork={isWork} isDark={isDark} />
                </div>

                {/* Right card */}
                <div className="pl-8">
                  {!isLeft && (
                    <EntryCard entry={entry} isDark={isDark} align="left" />
                  )}
                </div>
              </motion.div>
            );
          })}

          <RouteMarker label={pastLabel} type="past" isDark={isDark} />
        </div>
      </div>
    </>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────
export default function Qualification() {
  const { isDark } = useThemeContext();
  const [activeTab, setActiveTab] = useState<Tab>("work");

  return (
    <section
      id="qualification"
      className={clsx("py-20", isDark ? "bg-slate-900" : "bg-white")}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
              "text-3xl sm:text-4xl font-bold mb-1",
              isDark ? "text-white" : "text-slate-900",
            )}
          >
            My <span className="gradient-text">Journey</span>
          </h2>
          <span
            className={clsx(
              "text-sm",
              isDark ? "text-emerald-400" : "text-emerald-600",
            )}
          >
            Qualification
          </span>
        </motion.div>

        {/* Toggle — same pill style as Projects section */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div
            className={clsx(
              "flex rounded-xl p-1",
              isDark ? "bg-slate-800" : "bg-slate-200",
            )}
          >
            {[
              { key: "work" as Tab, icon: Briefcase, label: "Work" },
              {
                key: "education" as Tab,
                icon: GraduationCap,
                label: "Education",
              },
            ].map(({ key, icon: Icon, label }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={clsx(
                  "flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                  activeTab === key
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

        {/* Road timeline */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <RoadTimeline
              entries={activeTab === "work" ? workEntries : educationEntries}
              isDark={isDark}
              isWork={activeTab === "work"}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
