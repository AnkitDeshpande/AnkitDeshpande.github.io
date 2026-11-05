"use client";

import { motion } from "framer-motion";
import { ChevronDown, ExternalLink } from "@/components/ui/Icons";
import { useState } from "react";
import { skills, getSkillsByCategory } from "@/lib/skills";
import { Card } from "@/components/ui";
import { cn } from "@/lib/utils";

export function Skills() {
  const grouped = getSkillsByCategory();
  const [expanded, setExpanded] = useState<string[]>([]);

  const toggleCategory = (category: string) => {
    setExpanded((prev) => 
      prev.includes(category) 
        ? prev.filter((c) => c !== category) 
        : [...prev, category]
    );
  };

  const isExpanded = (category: string) => expanded.includes(category);

  const proficiencyColors = {
    Expert: "badge-crimson",
    Advanced: "badge-muted",
    Intermediate: "badge-muted",
    Learning: "badge-muted",
  };

  return (
    <section id="skills" className="section">
      <div className="container">
        <header className="section-header max-w-3xl mx-auto text-center mb-16">
          <span className="section-label">Technical Depth</span>
          <h2 className="section-title">Skills</h2>
          <p className="section-description">
            Technologies I've shipped to production, with measurable outcomes.
            Click a category to explore evidence.
          </p>
        </header>

        <div className="space-y-8">
          {Object.entries(grouped).map(([category, items], catIndex) => (
            <motion.article
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIndex * 0.1 }}
            >
              <button
                onClick={() => toggleCategory(category)}
                className="w-full text-left flex items-center justify-between p-5 bg-bg-card/60 border border-border rounded-xl hover:border-crimson/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson"
                aria-expanded={isExpanded(category)}
              >
                <div className="flex items-center gap-4">
                  <span className="w-10 h-10 rounded-lg bg-crimson/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-crimson" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <polyline points="16 18 22 12 16 6" />
                      <polyline points="8 6 2 12 8 18" />
                    </svg>
                  </span>
                  <div>
                    <h3 className="font-display font-semibold text-xl text-fg">{category}</h3>
                    <p className="text-fg-subtle text-sm mt-0.5">
                      {items.length} technologies • {items.reduce((sum, s) => sum + s.years, 0)}+ years combined
                    </p>
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: isExpanded(category) ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-fg-muted"
                >
                  <ChevronDown className="w-5 h-5" aria-hidden="true" />
                </motion.div>
              </button>

              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: isExpanded(category) ? "auto" : 0, opacity: isExpanded(category) ? 1 : 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden mt-4"
              >
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {items.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: skillIndex * 0.05 }}
                    >
                      <Card className="p-5 h-full">
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-fg mb-1">{skill.name}</h4>
                            <span className={cn(
                              "badge px-2 py-0.5 text-xs",
                              proficiencyColors[skill.proficiency]
                            )}>
                              {skill.proficiency}
                            </span>
                          </div>
                          <span className="text-xs font-mono text-fg-subtle flex-shrink-0">
                            {skill.years}yr
                          </span>
                        </div>

                        {skill.description && (
                          <p className="text-fg-muted text-sm mb-4 leading-relaxed">
                            {skill.description}
                          </p>
                        )}

                        <details className="group">
                          <summary className="flex items-center gap-1.5 text-xs font-mono text-fg-subtle hover:text-crimson-light cursor-pointer mb-3">
                            <span>Evidence</span>
                            <motion.span
                              animate={{ rotate: isExpanded(category) ? 90 : 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <ChevronDown className="w-3 h-3" aria-hidden="true" />
                            </motion.span>
                          </summary>
                          <ul className="space-y-2 text-xs text-fg-muted mt-2 border-t border-border pt-3">
                            {skill.evidence.map((evidence, i) => (
                              <li key={i} className="flex items-start gap-2 leading-relaxed">
                                <span className="flex-shrink-0 w-1.5 h-1.5 bg-crimson/30 rounded-full mt-1.5" aria-hidden="true" />
                                <span className="flex-1">{evidence.title}</span>
                                {evidence.url && (
                                  <a
                                    href={evidence.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-shrink-0 text-crimson-light hover:text-crimson transition-colors"
                                    aria-label={`View ${evidence.title}`}
                                  >
                                    <ExternalLink className="w-3 h-3" aria-hidden="true" />
                                  </a>
                                )}
                              </li>
                            ))}
                          </ul>
                        </details>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}