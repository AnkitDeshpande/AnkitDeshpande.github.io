import { useState, useEffect } from "react";
import { Menu, X, Moon, Sun, Download } from "lucide-react";
import { useScrollActive } from "../hooks/useScrollActive";
import clsx from "clsx";

const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "qualification", label: "Qualification" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

const SECTION_IDS = NAV_LINKS.map((l) => l.id);

interface Props {
  isDark: boolean;
  onThemeToggle: () => void;
}

export default function Navbar({ isDark, onThemeToggle }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeSection = useScrollActive(SECTION_IDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const navBg = isDark
    ? scrolled
      ? "bg-slate-900/95 backdrop-blur-md shadow-lg shadow-black/20"
      : "bg-transparent"
    : scrolled
      ? "bg-white/95 backdrop-blur-md shadow-lg shadow-black/10"
      : "bg-transparent";

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        navBg,
      )}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => scrollTo("home")}
          className="text-2xl font-bold gradient-text"
        >
          Ankit
        </button>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => scrollTo(link.id)}
                className={clsx(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  activeSection === link.id
                    ? "text-emerald-400 bg-emerald-400/10"
                    : isDark
                      ? "text-slate-300 hover:text-white hover:bg-slate-700/50"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100",
                )}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          <a
            href="/Ankit-Deshpande-Resume.pdf"
            download
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-medium transition-all duration-200"
          >
            <Download size={14} />
            Resume
          </a>
          <button
            onClick={onThemeToggle}
            className={clsx(
              "p-2 rounded-lg transition-all duration-200",
              isDark
                ? "text-slate-300 hover:text-white hover:bg-slate-700/50"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100",
            )}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={clsx(
              "md:hidden p-2 rounded-lg transition-all duration-200",
              isDark
                ? "text-slate-300 hover:text-white hover:bg-slate-700/50"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100",
            )}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className={clsx(
            "md:hidden border-t px-4 py-3 space-y-1",
            isDark
              ? "bg-slate-900/98 border-slate-700"
              : "bg-white/98 border-slate-200",
          )}
        >
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={clsx(
                "w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                activeSection === link.id
                  ? "text-emerald-400 bg-emerald-400/10"
                  : isDark
                    ? "text-slate-300 hover:text-white hover:bg-slate-700/50"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100",
              )}
            >
              {link.label}
            </button>
          ))}
          <a
            href="/Ankit-Deshpande-Resume.pdf"
            download
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-medium transition-all duration-200"
          >
            <Download size={14} />
            Resume
          </a>
        </div>
      )}
    </header>
  );
}
