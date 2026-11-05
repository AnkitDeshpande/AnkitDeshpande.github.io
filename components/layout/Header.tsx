"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Github, Linkedin } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";
import { navItems } from "@/lib/constants";
import { Separator } from "@/components/ui";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("theme") as "dark" | "light" | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = saved || (prefersDark ? "dark" : "light");
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme, mounted]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-[200] transition-all duration-base",
        isScrolled && "bg-bg border-b border-border"
      )}
      role="banner"
    >
      <nav className="container" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link
            href="/"
            className="font-display font-bold text-xl lg:text-2xl text-fg hover:text-crimson-light transition-colors"
            aria-label="Ankit Deshpande - Home"
          >
            ANKIT
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-fg-muted hover:text-crimson-light transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-crimson hover:after:w-full after:transition-width"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-bg-elevated border border-border hover:border-crimson/50 hover:bg-bg-card-hover transition-colors"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              aria-pressed={theme === "dark"}
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-fg-muted" aria-hidden="true" />
              ) : (
                <Moon className="w-5 h-5 text-fg-muted" aria-hidden="true" />
              )}
            </button>

            <div className="hidden lg:flex items-center gap-3">
              <a
                href="https://github.com/AnkitDeshpande"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-bg-elevated border border-border hover:border-crimson/50 hover:bg-bg-card-hover transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" aria-hidden="true" />
              </a>
              <a
                href="https://www.linkedin.com/in/ankit-deshpande-54089221b/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-bg-elevated border border-border hover:border-crimson/50 hover:bg-bg-card-hover transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" aria-hidden="true" />
              </a>
            </div>

            <button
              className="lg:hidden p-2 rounded-lg bg-bg-elevated border border-border"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden border-t border-border bg-bg"
            >
              <div className="py-6 space-y-4 px-2">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="block px-4 py-3 text-base font-medium text-fg-muted hover:text-crimson-light hover:bg-bg-elevated rounded-lg transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <Separator className="my-4" />
                <div className="flex items-center gap-3 px-4">
                  <a
                    href="https://github.com/AnkitDeshpande"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-bg-elevated border border-border hover:border-crimson/50"
                    aria-label="GitHub"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/ankit-deshpande-54089221b/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-bg-elevated border border-border hover:border-crimson/50"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}