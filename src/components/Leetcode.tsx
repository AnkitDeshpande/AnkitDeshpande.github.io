import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Trophy, Target, Zap } from "lucide-react";
import clsx from "clsx";
import { useThemeContext } from "../context/ThemeContext";

interface LeetcodeStats {
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  totalEasy: number;
  mediumSolved: number;
  totalMedium: number;
  hardSolved: number;
  totalHard: number;
  acceptanceRate: number;
  ranking: number;
  submissionCalendar: Record<string, number>;
}

// LeetCode stores UTC midnight timestamps (divisible by 86400).
// We build the grid using pure UTC arithmetic so timestamps match exactly.
function buildCalendarGrid(calendar: Record<string, number>) {
  const now = new Date();
  const todayTs =
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()) / 1000;

  // Rewind to the UTC Sunday of this week, then 52 weeks back
  const dayOfWeek = new Date(todayTs * 1000).getUTCDay();
  let cursor = todayTs - dayOfWeek * 86400 - 52 * 7 * 86400;

  const weeks: { date: Date; count: number }[][] = [];
  let week: { date: Date; count: number }[] = [];

  while (cursor <= todayTs) {
    week.push({
      date: new Date(cursor * 1000),
      count: calendar[String(cursor)] ?? 0,
    });
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
    cursor += 86400;
  }
  if (week.length > 0) weeks.push(week);
  return weeks;
}

function cellColor(count: number, isDark: boolean): string {
  if (count === 0) return isDark ? "#1e293b" : "#f1f5f9";
  if (count === 1) return "#fde68a";
  if (count <= 3) return "#fbbf24";
  if (count <= 6) return "#f59e0b";
  return "#d97706";
}

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const DIFFICULTIES = [
  {
    key: "easy",
    label: "Easy",
    color: "text-emerald-400",
    stroke: "#34d399",
    bg: "bg-emerald-500",
    track: "bg-emerald-500/15",
    solved: (s: LeetcodeStats) => s.easySolved,
    total: (s: LeetcodeStats) => s.totalEasy,
  },
  {
    key: "medium",
    label: "Medium",
    color: "text-yellow-400",
    stroke: "#facc15",
    bg: "bg-yellow-400",
    track: "bg-yellow-400/15",
    solved: (s: LeetcodeStats) => s.mediumSolved,
    total: (s: LeetcodeStats) => s.totalMedium,
  },
  {
    key: "hard",
    label: "Hard",
    color: "text-red-400",
    stroke: "#f87171",
    bg: "bg-red-500",
    track: "bg-red-500/15",
    solved: (s: LeetcodeStats) => s.hardSolved,
    total: (s: LeetcodeStats) => s.totalHard,
  },
] as const;

function CircleProgress({
  solved,
  total,
  stroke,
}: {
  solved: number;
  total: number;
  stroke: string;
}) {
  const r = 28;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - (total > 0 ? solved / total : 0));
  return (
    <svg width="72" height="72" className="-rotate-90">
      <circle cx="36" cy="36" r={r} fill="none" stroke="#334155" strokeWidth="5" />
      <motion.circle
        cx="36" cy="36" r={r} fill="none" stroke={stroke} strokeWidth="5"
        strokeLinecap="round" strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        whileInView={{ strokeDashoffset: offset }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
    </svg>
  );
}

export default function Leetcode() {
  const { isDark } = useThemeContext();
  const [stats, setStats] = useState<LeetcodeStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [statsError, setStatsError] = useState(false);
  const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number } | null>(null);

  useEffect(() => {
    const primary = fetch(
      "https://leetcode-stats.tashif.codes/ankitdeshpande",
    )
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((d) => {
        if (d.status !== "success") throw new Error();
        return d as LeetcodeStats;
      });

    const fallback = fetch(
      "https://leetcode-stats-api.herokuapp.com/Ankitdeshpande",
    )
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((d) => {
        if (d.status === "error") throw new Error();
        return {
          ...d,
          submissionCalendar:
            typeof d.submissionCalendar === "string"
              ? JSON.parse(d.submissionCalendar)
              : (d.submissionCalendar ?? {}),
        } as LeetcodeStats;
      });

    primary
      .catch(() => fallback)
      .then((d) => setStats(d))
      .catch(() => setStatsError(true))
      .finally(() => setStatsLoading(false));
  }, []);

  const calendar = stats?.submissionCalendar ?? null;
  const weeks = calendar ? buildCalendarGrid(calendar) : [];

  const monthLabels: { label: string; col: number }[] = [];
  weeks.forEach((week, col) => {
    const firstDay = week[0]?.date;
    if (firstDay && firstDay.getDate() <= 7) {
      monthLabels.push({ label: MONTHS[firstDay.getMonth()], col });
    }
  });

  const totalSubmissions = calendar
    ? Object.values(calendar).reduce((a, b) => a + b, 0)
    : 0;

  return (
    <section id="leetcode" className={clsx("py-20", isDark ? "bg-slate-900" : "bg-white")}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={clsx("text-3xl sm:text-4xl font-bold mb-2", isDark ? "text-white" : "text-slate-900")}>
            Leet<span className="gradient-text">Code</span>
          </h2>
          <span className={clsx("text-sm", isDark ? "text-emerald-400" : "text-emerald-600")}>
            Problem solving stats
          </span>
        </motion.div>

        {statsLoading && (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 rounded-full border-2 border-yellow-400 border-t-transparent animate-spin" />
          </div>
        )}

        {statsError && !stats && (
          <p className={clsx("text-center", isDark ? "text-slate-400" : "text-slate-500")}>
            Could not load stats.{" "}
            <a
              href="https://leetcode.com/u/Ankitdeshpande/"
              target="_blank"
              rel="noreferrer"
              className="text-yellow-400 underline"
            >
              View on LeetCode
            </a>
          </p>
        )}

        {!statsLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={clsx(
              "rounded-2xl border p-6 sm:p-8 space-y-8",
              isDark ? "border-slate-700 bg-slate-800" : "border-slate-200 bg-slate-50",
            )}
          >
            {stats && (
              <>
                {/* ── Top row: donut + quick stats ── */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-700/40">
                  {/* Donut */}
                  <div className="flex items-center gap-5">
                    <div className="relative w-24 h-24">
                      <svg width="96" height="96" className="-rotate-90 absolute inset-0">
                        <circle cx="48" cy="48" r="38" fill="none" stroke="#334155" strokeWidth="6" />
                        <motion.circle
                          cx="48" cy="48" r="38" fill="none" stroke="#10b981" strokeWidth="6"
                          strokeLinecap="round" strokeDasharray={2 * Math.PI * 38}
                          initial={{ strokeDashoffset: 2 * Math.PI * 38 }}
                          whileInView={{ strokeDashoffset: 2 * Math.PI * 38 * (1 - stats.totalSolved / stats.totalQuestions) }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.4, ease: "easeOut" }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className={clsx("text-xl font-bold", isDark ? "text-white" : "text-slate-900")}>
                          {stats.totalSolved}
                        </span>
                        <span className={clsx("text-[10px]", isDark ? "text-slate-400" : "text-slate-500")}>
                          / {stats.totalQuestions}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className={clsx("text-lg font-bold", isDark ? "text-white" : "text-slate-900")}>
                        Problems Solved
                      </p>
                      <p className={clsx("text-sm", isDark ? "text-slate-400" : "text-slate-500")}>
                        out of {stats.totalQuestions} total
                      </p>
                    </div>
                  </div>

                  {/* Quick stats */}
                  <div className="flex gap-6">
                    {[
                      { icon: Trophy, value: `#${stats.ranking.toLocaleString()}`, label: "Ranking",    color: "text-yellow-400" },
                      { icon: Target, value: `${stats.acceptanceRate.toFixed(1)}%`, label: "Acceptance", color: "text-emerald-400" },
                      { icon: Zap,    value: `${stats.totalSolved}`,                label: "Solved",     color: "text-cyan-400" },
                    ].map(({ icon: Icon, value, label, color }) => (
                      <div key={label} className="flex flex-col items-center gap-1">
                        <Icon size={18} className={color} />
                        <span className={clsx("text-lg font-bold", isDark ? "text-white" : "text-slate-900")}>{value}</span>
                        <span className={clsx("text-xs", isDark ? "text-slate-400" : "text-slate-500")}>{label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Difficulty circles */}
                <div className="grid grid-cols-3 gap-4">
                  {DIFFICULTIES.map(({ key, label, color, stroke, bg, track, solved, total }) => {
                    const s = solved(stats);
                    const t = total(stats);
                    return (
                      <div key={key} className="flex flex-col items-center gap-3">
                        <div className="relative">
                          <CircleProgress solved={s} total={t} stroke={stroke} />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className={clsx("text-sm font-bold", color)}>{s}</span>
                          </div>
                        </div>
                        <div className="text-center">
                          <p className={clsx("text-xs font-semibold", color)}>{label}</p>
                          <p className={clsx("text-xs", isDark ? "text-slate-500" : "text-slate-400")}>{s} / {t}</p>
                        </div>
                        <div className={clsx("w-full h-1.5 rounded-full", track)}>
                          <motion.div
                            className={clsx("h-full rounded-full", bg)}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${(s / t) * 100}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {/* ── Submission heatmap ── */}
            {calendar && weeks.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className={clsx("text-sm font-semibold", isDark ? "text-slate-300" : "text-slate-700")}>
                    Submission Activity
                  </p>
                  <p className={clsx("text-xs", isDark ? "text-slate-500" : "text-slate-400")}>
                    {totalSubmissions.toLocaleString()} submissions in the last year
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <div className="relative" style={{ minWidth: `${weeks.length * 13}px` }}>
                    {/* Month labels */}
                    <div className="flex mb-1" style={{ paddingLeft: "18px" }}>
                      {weeks.map((_, col) => {
                        const lbl = monthLabels.find((m) => m.col === col);
                        return (
                          <div key={col} style={{ width: 11, marginRight: 2 }} className="flex-shrink-0">
                            {lbl && (
                              <span className={clsx("text-[9px]", isDark ? "text-slate-500" : "text-slate-400")}>
                                {lbl.label}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex gap-[2px]">
                      {/* Day labels */}
                      <div className="flex flex-col gap-[2px] mr-1 flex-shrink-0">
                        {["", "Mon", "", "Wed", "", "Fri", ""].map((d, i) => (
                          <div
                            key={i}
                            style={{ height: 11 }}
                            className={clsx("text-[9px] leading-none", isDark ? "text-slate-500" : "text-slate-400")}
                          >
                            {d}
                          </div>
                        ))}
                      </div>

                      {/* Weeks */}
                      {weeks.map((week, wi) => (
                        <div key={wi} className="flex flex-col gap-[2px]">
                          {week.map((day, di) => (
                            <div
                              key={di}
                              style={{
                                width: 11, height: 11, borderRadius: 2,
                                backgroundColor: cellColor(day.count, isDark),
                                flexShrink: 0,
                              }}
                              onMouseEnter={(e) => {
                                const rect = (e.target as HTMLElement).getBoundingClientRect();
                                setTooltip({
                                  text: `${day.count} submission${day.count !== 1 ? "s" : ""} on ${day.date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`,
                                  x: rect.left + rect.width / 2,
                                  y: rect.top - 8,
                                });
                              }}
                              onMouseLeave={() => setTooltip(null)}
                            />
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Legend */}
                <div className="flex items-center gap-2 mt-3 justify-end">
                  <span className={clsx("text-[10px]", isDark ? "text-slate-500" : "text-slate-400")}>Less</span>
                  {[0, 1, 3, 5, 7].map((v) => (
                    <div key={v} style={{ width: 11, height: 11, borderRadius: 2, backgroundColor: cellColor(v, isDark) }} />
                  ))}
                  <span className={clsx("text-[10px]", isDark ? "text-slate-500" : "text-slate-400")}>More</span>
                </div>
              </div>
            )}

            {/* Profile link */}
            <div className="flex justify-center pt-2">
              <a
                href="https://leetcode.com/u/Ankitdeshpande/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400 border border-yellow-500/20 text-sm font-medium transition-all duration-200"
              >
                <ExternalLink size={14} />
                View LeetCode Profile
              </a>
            </div>
          </motion.div>
        )}
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="fixed z-50 px-2.5 py-1.5 rounded-lg bg-slate-900 text-white text-xs pointer-events-none shadow-lg border border-slate-700 -translate-x-1/2 -translate-y-full"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          {tooltip.text}
        </div>
      )}
    </section>
  );
}
