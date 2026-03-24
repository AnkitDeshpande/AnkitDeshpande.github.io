import { useTheme } from "./hooks/useTheme";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Skills from "./components/Skills";
import Github from "./components/Github";
import Leetcode from "./components/Leetcode";
import Qualification from "./components/Qualification";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScrollUp from "./components/ScrollUp";

export default function App() {
  const { isDark, toggle } = useTheme();

  return (
    <div
      className={isDark ? "bg-slate-900 text-white" : "bg-white text-slate-900"}
    >
      <Navbar isDark={isDark} onThemeToggle={toggle} />
      <main>
        <Home isDark={isDark} />
        <About isDark={isDark} />
        <Skills isDark={isDark} />
        <Github isDark={isDark} />
        <Leetcode isDark={isDark} />
        <Qualification isDark={isDark} />
        <Projects isDark={isDark} />
        <Contact isDark={isDark} />
      </main>
      <Footer isDark={isDark} />
      <ScrollUp />
    </div>
  );
}
