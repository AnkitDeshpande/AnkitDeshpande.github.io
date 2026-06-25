import clsx from "clsx";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { TypeAnimation } from "react-type-animation";
import { useThemeContext } from "../context/ThemeContext";
import { scrollToSection } from "../utils/scroll";

function FloatingShape({
  className,
  delay = 0,
  duration = 3,
  x = 0,
  y = 0,
  rotate = false,
}: {
  className: string;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  rotate?: boolean;
}) {
  return (
    <motion.div
      className={`absolute ${className}`}
      initial={{ x, y, opacity: 0 }}
      animate={{
        x: [x, x + 20, x - 10, x],
        y: [y, y - 15, y + 10, y],
        opacity: [0, 0.6, 0.8, 0.6],
        ...(rotate ? { rotate: [0, 180, 360] } : {}),
        scale: [0.8, 1.2, 0.9, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    />
  );
}

export default function Home() {
  const { isDark } = useThemeContext();

  const resumeViewUrl = "https://drive.google.com/file/d/1Cz0Z_vOqlPp3dlbedFtd8kGbEllrHF3v/view?usp=drive_link";
  const resumeDownloadUrl = "https://drive.google.com/uc?export=download&id=1Cz0Z_vOqlPp3dlbedFtd8kGbEllrHF3v";

  const handleResumeClick = () => {
    const downloadLink = document.createElement("a");
    downloadLink.href = resumeDownloadUrl;
    downloadLink.download = "Ankit-Deshpande-Resume.pdf";
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <section
      id="home"
      className={clsx(
        "min-h-screen flex items-center pt-16 section-glass relative overflow-hidden",
        isDark ? "bg-slate-900/40" : "bg-white/40",
      )}
    >
      {/* Floating decorative shapes */}
      <FloatingShape
        className="w-24 h-24 rounded-full border-2 border-emerald-500/20"
        delay={0}
        duration={4}
        x={-100}
        y={-50}
      />
      <FloatingShape
        className="w-16 h-16 border-2 border-cyan-500/20 rounded-lg"
        delay={0.5}
        duration={5}
        x={120}
        y={60}
      />
      <FloatingShape
        className="w-12 h-12 border-2 border-emerald-400/20 rounded-full"
        delay={1}
        duration={3.5}
        x={-80}
        y={80}
      />
      <FloatingShape
        className="w-8 h-8 border-2 border-cyan-400/20 rotate-45"
        delay={1.5}
        duration={4.5}
        x={100}
        y={-40}
      />
      <FloatingShape
        className="w-20 h-20 rounded-full border border-emerald-500/10"
        delay={0.8}
        duration={6}
        x={-120}
        y={-80}
      />

      {/* Glowing background orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-emerald-500/5 blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-cyan-500/5 blur-3xl" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 relative z-10">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12">
          {/* Text content */}
          <motion.div
            className="flex-1 text-center md:text-left"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="flex items-center gap-4 mb-6 justify-center md:justify-start">
              <a
                href="https://www.linkedin.com/in/ankit-deshpande-54089221b/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 hover:scale-110 transition-all duration-200"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://github.com/AnkitDeshpande"
                target="_blank"
                rel="noopener noreferrer"
                className={clsx(
                  "p-2.5 rounded-full border transition-all duration-200 hover:scale-110",
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
                "text-sm font-medium mb-2 tracking-wider",
                isDark ? "text-emerald-400" : "text-emerald-600",
              )}
            >
              Hello, World!
            </p>
            <h1
              className={clsx(
                "text-4xl sm:text-5xl lg:text-7xl font-bold mb-4 tracking-tight",
                isDark ? "text-white" : "text-slate-900",
              )}
            >
              I'm <span className="gradient-text">Ankit</span>
            </h1>

            <div
              className={clsx(
                "text-xl sm:text-2xl lg:text-3xl font-medium mb-6 h-9",
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
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => scrollToSection("contact")}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-medium transition-all duration-200 shadow-lg shadow-emerald-500/25"
              >
                <Mail size={16} />
                Contact Me
              </motion.button>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                href={resumeViewUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleResumeClick}
                className={clsx(
                  "flex items-center gap-2 px-6 py-3 rounded-xl border font-medium transition-all duration-200",
                  isDark
                    ? "border-slate-600 text-slate-300 hover:border-slate-500 hover:text-white hover:bg-slate-700/50"
                    : "border-slate-300 text-slate-700 hover:border-slate-400 hover:bg-slate-50",
                )}
              >
                View Resume
              </motion.a>
            </div>
          </motion.div>

          {/* Profile image with enhanced 3D glow */}
          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          >
            <div className="relative" id="profile-container">
              {/* Multi-layer glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-500/30 via-emerald-400/20 to-cyan-500/30 blur-3xl scale-150 animate-pulse" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-emerald-600/20 to-cyan-600/20 blur-2xl scale-125" />

              {/* Animated ring */}
              <motion.div
                className="absolute inset-[-8px] rounded-full border-2 border-emerald-500/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-[-4px] rounded-full border border-cyan-400/20"
                animate={{ rotate: -360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              />

              {/* Profile */}
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden border-4 border-emerald-500/40 bg-slate-700 shadow-2xl shadow-emerald-500/20">
                <img
                  src="/img/profile-pic.jpeg"
                  alt="Ankit Deshpande"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Orbiting dots */}
              <div className="absolute inset-0 pointer-events-none">
                <motion.div
                  className="absolute w-2 h-2 bg-emerald-400 rounded-full shadow-lg shadow-emerald-400/50"
                  style={{ top: "-4px", left: "50%", marginLeft: "-4px" }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
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
          <motion.button
            onClick={() => scrollToSection("about")}
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className={clsx(
              "flex flex-col items-center gap-2 text-sm transition-all duration-200",
              isDark
                ? "text-slate-400 hover:text-white"
                : "text-slate-500 hover:text-slate-900",
            )}
          >
            <span>Scroll Down</span>
            <ArrowDown size={16} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
