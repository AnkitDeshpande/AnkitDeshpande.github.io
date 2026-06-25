import { lazy, Suspense, useState, useEffect } from "react";
import { ThemeProvider, useThemeContext } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import ScrollProgress from "./components/ScrollProgress";
import ScrollUp from "./components/ScrollUp";
import LoadingScreen from "./components/LoadingScreen";

const ThreeBackground = lazy(() => import("./components/ThreeBackground"));
const About = lazy(() => import("./components/About"));
const Skills = lazy(() => import("./components/Skills"));
const Github = lazy(() => import("./components/Github"));
const Leetcode = lazy(() => import("./components/Leetcode"));
const Qualification = lazy(() => import("./components/Qualification"));
const Projects = lazy(() => import("./components/Projects"));
const Contact = lazy(() => import("./components/Contact"));
const Footer = lazy(() => import("./components/Footer"));

function AppContent() {
  const { isDark, toggle } = useThemeContext();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LoadingScreen isLoading={!ready} />
      {ready && (
        <Suspense fallback={null}>
          <ThreeBackground />
        </Suspense>
      )}
      <div
        className={`relative z-10 ${
          isDark ? "bg-slate-900/80 text-white" : "bg-white/80 text-slate-900"
        }`}
      >
        <Navbar onThemeToggle={toggle} />
        <main>
          <Home />
          <Suspense fallback={null}>
            <About />
            <Skills />
            <Github />
            <Leetcode />
            <Qualification />
            <Projects />
            <Contact />
          </Suspense>
        </main>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
        <ScrollProgress />
        <ScrollUp />
      </div>
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
