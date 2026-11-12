import Link from "next/link";
import { Github, Linkedin, Mail, MapPin, FileText } from "@/components/ui/Icons";
import { siteConfig, socialLinks } from "@/lib/constants";
import { Separator } from "@/components/ui";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-bg-elevated/50" role="contentinfo">
      <div className="container py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="lg:col-span-2">
            <Link href="/" className="font-display font-bold text-2xl text-fg hover:text-crimson-light transition-colors mb-4 block max-w-fit">
              ANKIT
            </Link>
            <p className="text-fg-muted text-base leading-relaxed max-w-xs mb-6">
              Backend engineer crafting scalable systems with Java, Spring Boot, and cloud-native architectures.
              Based in {siteConfig.location}.
            </p>
            <div className="flex items-center gap-6">
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-bg-elevated border border-border hover:border-crimson/50 hover:bg-bg-card-hover transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" aria-hidden="true" />
              </a>
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-bg-elevated border border-border hover:border-crimson/50 hover:bg-bg-card-hover transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" aria-hidden="true" />
              </a>
              <a
                href={socialLinks.email}
                className="p-2 rounded-lg bg-bg-elevated border border-border hover:border-crimson/50 hover:bg-bg-card-hover transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" aria-hidden="true" />
              </a>
            </div>
          </div>

          <nav aria-label="Quick links">
            <h3 className="font-display font-semibold text-fg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#projects" className="text-fg-muted hover:text-crimson-light transition-colors text-sm">
                  Work
                </a>
              </li>
              <li>
                <a href="#experience" className="text-fg-muted hover:text-crimson-light transition-colors text-sm">
                  Experience
                </a>
              </li>
              <li>
                <a href="#skills" className="text-fg-muted hover:text-crimson-light transition-colors text-sm">
                  Skills
                </a>
              </li>
              <li>
                <a href="#values" className="text-fg-muted hover:text-crimson-light transition-colors text-sm">
                  Values
                </a>
              </li>
              <li>
                <a href="#contact" className="text-fg-muted hover:text-crimson-light transition-colors text-sm">
                  Contact
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-fg-muted hover:text-crimson-light transition-colors text-sm flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" aria-hidden="true" />
                  Resume
                </a>
              </li>
            </ul>
          </nav>

          <address aria-label="Contact information" className="not-italic">
            <h3 className="font-display font-semibold text-fg mb-4">Contact</h3>
            <ul className="space-y-3 text-fg-muted text-sm">
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                <a href={socialLinks.email} className="hover:text-crimson-light transition-colors">
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                <span>{siteConfig.location}</span>
              </li>
            </ul>
          </address>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-fg-subtle text-sm">
            © {currentYear} {siteConfig.name}. Built with Next.js, Tailwind v4, and Framer Motion.
          </p>
          <div className="flex items-center gap-6 text-sm text-fg-subtle">
            <Link href="/legal/privacy" className="hover:text-crimson-light transition-colors">
              Privacy
            </Link>
            <Link href="/legal/tos" className="hover:text-crimson-light transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}