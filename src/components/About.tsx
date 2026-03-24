import { motion } from "framer-motion";
import { Download, Briefcase, FolderOpen, Building2 } from "lucide-react";
import clsx from "clsx";
import { useThemeContext } from "../context/ThemeContext";

const stats = [
  { icon: Briefcase, value: "2+", label: "Years\nExperience" },
  { icon: FolderOpen, value: "9+", label: "Completed\nProjects" },
  { icon: Building2, value: "2", label: "Companies\nWorked" },
];

export default function About() {
  const { isDark } = useThemeContext();

  return (
    <section
      id="about"
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
            About <span className="gradient-text">Me</span>
          </h2>
          <span
            className={clsx(
              "text-sm",
              isDark ? "text-emerald-400" : "text-emerald-600",
            )}
          >
            My Introduction
          </span>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Image */}
          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative w-60 h-60 sm:w-72 sm:h-72">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 blur-xl scale-110" />
              <img
                src="/img/profile-pic.jpeg"
                alt="About Ankit"
                className="relative w-full h-full object-contain rounded-full border-4 border-emerald-500/30"
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {stats.map(({ icon: Icon, value, label }) => (
                <div
                  key={value}
                  className={clsx(
                    "flex flex-col items-center p-4 rounded-xl border text-center",
                    isDark
                      ? "border-slate-700 bg-slate-800"
                      : "border-slate-200 bg-white",
                  )}
                >
                  <Icon size={20} className="text-emerald-400 mb-2" />
                  <span className="text-2xl font-bold gradient-text">
                    {value}
                  </span>
                  <span
                    className={clsx(
                      "text-xs mt-1 leading-tight whitespace-pre-line",
                      isDark ? "text-slate-400" : "text-slate-500",
                    )}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>

            <p
              className={clsx(
                "text-base leading-relaxed mb-8",
                isDark ? "text-slate-300" : "text-slate-600",
              )}
            >
              Results-driven{" "}
              <span className="text-emerald-400 font-medium">Backend Developer</span>{" "}
              with over 2 years of professional experience designing and
              delivering scalable, production-grade systems. Core expertise in
              Java, Spring Boot, Hibernate, and MySQL, with strong hands-on
              experience in cloud infrastructure across{" "}
              <span className="text-emerald-400 font-medium">AWS</span>{" "}
              (Lambda, S3, SQS, Secrets Manager) and{" "}
              <span className="text-emerald-400 font-medium">Azure</span>{" "}
              (Functions, Service Bus, Blob Storage). Additionally holds working
              knowledge of React and TypeScript for front-end development.
              Passionate about writing clean, maintainable code and building
              products that solve real-world problems.
            </p>

            <a
              href="/Ankit-Deshpande-Resume.pdf"
              download
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-medium transition-all duration-200 shadow-lg shadow-emerald-500/25"
            >
              <Download size={16} />
              Download Resume
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
