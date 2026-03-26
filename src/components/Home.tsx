import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import { Linkedin, Github, ArrowDown, Mail } from "lucide-react";
import clsx from "clsx";
import { useThemeContext } from "../context/ThemeContext";
import { scrollToSection } from "../utils/scroll";

export default function Home() {
  const { isDark } = useThemeContext();

  return (
    <section
      id="home"
      className={clsx(
        "min-h-screen flex items-center pt-16",
        isDark ? "bg-slate-900" : "bg-white",
      )}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12">
          {/* Text content */}
          <motion.div
            className="flex-1 text-center md:text-left"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* Social links */}
            <div className="flex items-center gap-4 mb-6 justify-center md:justify-start">
              <a
                href="https://www.linkedin.com/in/ankit-deshpande-54089221b/"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-full border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 transition-all duration-200"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://github.com/AnkitDeshpande"
                target="_blank"
                rel="noreferrer"
                className={clsx(
                  "p-2 rounded-full border transition-all duration-200",
                  isDark
                    ? "border-slate-600 text-slate-300 hover:bg-slate-700/50"
                    : "border-slate-300 text-slate-600 hover:bg-slate-100",
                )}
              >
                <Github size={18} />
              </a>
            </div>

            <p
              className={clsx(
                "text-sm font-medium mb-2",
                isDark ? "text-emerald-400" : "text-emerald-600",
              )}
            >
              Hello, World! 👋
            </p>
            <h1
              className={clsx(
                "text-4xl sm:text-5xl lg:text-6xl font-bold mb-4",
                isDark ? "text-white" : "text-slate-900",
              )}
            >
              I'm <span className="gradient-text">Ankit</span>
            </h1>

            <div
              className={clsx(
                "text-xl sm:text-2xl font-medium mb-6 h-8",
                isDark ? "text-slate-300" : "text-slate-600",
              )}
            >
              <TypeAnimation
                sequence={[
                  "SDE at ZET credit card app",
                  2000,
                  "Web Developer",
                  2000,
                  "Backend Engineer",
                  2000,
                  "a Learner",
                  2000,
                  "a Believer",
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="text-emerald-400"
              />
            </div>

            <p
              className={clsx(
                "text-base sm:text-lg mb-8 max-w-lg leading-relaxed",
                isDark ? "text-slate-400" : "text-slate-600",
              )}
            >
              Backend Developer with 2+ years of professional experience
              building scalable systems with Java & Spring Boot, deploying
              cloud-native solutions on AWS & Azure, with working knowledge of
              React & TypeScript on the front-end.
            </p>

            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <button
                onClick={() => scrollToSection("contact")}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-medium transition-all duration-200 shadow-lg shadow-emerald-500/25"
              >
                <Mail size={16} />
                Contact Me
              </button>
              <a
                href="/Ankit-Deshpande-Resume.pdf"
                download
                className={clsx(
                  "flex items-center gap-2 px-6 py-3 rounded-xl border font-medium transition-all duration-200",
                  isDark
                    ? "border-slate-600 text-slate-300 hover:border-slate-500 hover:text-white hover:bg-slate-700/50"
                    : "border-slate-300 text-slate-700 hover:border-slate-400 hover:bg-slate-50",
                )}
              >
                View Resume
              </a>
            </div>
          </motion.div>

          {/* Profile image */}
          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/30 to-cyan-500/30 blur-2xl scale-110" />
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden border-4 border-emerald-500/40 bg-slate-700">
                <img
                  src="/img/profile-pic.jpeg"
                  alt="Ankit Deshpande"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll down */}
        <motion.div
          className="flex justify-center mt-16"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <button
            onClick={() => scrollToSection("about")}
            className={clsx(
              "flex flex-col items-center gap-2 text-sm transition-all duration-200 animate-bounce",
              isDark
                ? "text-slate-400 hover:text-white"
                : "text-slate-500 hover:text-slate-900",
            )}
          >
            <span>Scroll Down</span>
            <ArrowDown size={16} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
