import { motion } from "framer-motion";
import GitHubCalendar from "react-github-calendar";
import clsx from "clsx";

interface Props {
  isDark: boolean;
}

export default function Github({ isDark }: Props) {
  return (
    <section
      className={clsx("py-20", isDark ? "bg-slate-800/50" : "bg-slate-50")}
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
            GitHub <span className="gradient-text">Activity</span>
          </h2>
          <span
            className={clsx(
              "text-sm",
              isDark ? "text-emerald-400" : "text-emerald-600",
            )}
          >
            My contributions
          </span>
        </motion.div>

        {/* Stats images */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <img
            src="https://github-readme-stats.vercel.app/api/top-langs/?username=ankitdeshpande&theme=vue-dark&show_icons=true&hide_border=true&layout=compact"
            alt="Top Languages"
            className="rounded-xl"
          />
          <img
            src="https://github-readme-streak-stats.herokuapp.com/?user=ankitdeshpande&theme=vue-dark&hide_border=true"
            alt="GitHub Streak"
            className="rounded-xl"
          />
          <img
            src="https://github-readme-stats.vercel.app/api?username=ankitdeshpande&theme=vue-dark&show_icons=true&hide_border=true&count_private=true"
            alt="GitHub Stats"
            className="rounded-xl"
          />
        </motion.div>

        {/* GitHub Calendar — container shrinks to fit content */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div
            className={clsx(
              "p-6 rounded-2xl border w-fit overflow-x-auto",
              isDark
                ? "border-slate-700 bg-slate-800"
                : "border-slate-200 bg-white",
            )}
          >
            <GitHubCalendar
              username="ankitdeshpande"
              colorScheme={isDark ? "dark" : "light"}
              theme={{
                dark: ["#1e293b", "#065f46", "#059669", "#10b981", "#34d399"],
                light: ["#f1f5f9", "#d1fae5", "#6ee7b7", "#34d399", "#10b981"],
              }}
              fontSize={12}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
