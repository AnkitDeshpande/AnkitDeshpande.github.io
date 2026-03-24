import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, Linkedin, Github, Send } from "lucide-react";
import clsx from "clsx";

interface Props {
  isDark: boolean;
}

const contactInfo = [
  {
    icon: Phone,
    label: "Phone",
    value: "+91 7887977547",
    href: "tel:+917887977547",
  },
  {
    icon: Mail,
    label: "Email",
    value: "ankitdeshpande1998@gmail.com",
    href: "mailto:ankitdeshpande1998@gmail.com",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "ankit-deshpande",
    href: "https://www.linkedin.com/in/ankit-deshpande-54089221b/",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "AnkitDeshpande",
    href: "https://github.com/AnkitDeshpande",
  },
];

export default function Contact({ isDark }: Props) {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section
      id="contact"
      className={clsx("py-20", isDark ? "bg-slate-900" : "bg-white")}
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
            Contact <span className="gradient-text">Me</span>
          </h2>
          <span
            className={clsx(
              "text-sm",
              isDark ? "text-emerald-400" : "text-emerald-600",
            )}
          >
            Get in touch
          </span>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {contactInfo.map(({ icon: Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className={clsx(
                  "flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 group",
                  isDark
                    ? "border-slate-700 bg-slate-800 hover:border-emerald-500/40"
                    : "border-slate-200 bg-slate-50 hover:border-emerald-400/40",
                )}
              >
                <div className="p-2.5 rounded-lg bg-emerald-500/10">
                  <Icon size={18} className="text-emerald-400" />
                </div>
                <div>
                  <div
                    className={clsx(
                      "text-xs mb-0.5",
                      isDark ? "text-slate-500" : "text-slate-400",
                    )}
                  >
                    {label}
                  </div>
                  <div
                    className={clsx(
                      "text-sm font-medium group-hover:text-emerald-400 transition-colors",
                      isDark ? "text-white" : "text-slate-900",
                    )}
                  >
                    {value}
                  </div>
                </div>
              </a>
            ))}
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <form
              action="https://formsubmit.co/ankitdeshpande1998@gmail.com"
              method="POST"
              target="_blank"
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    className={clsx(
                      "block text-xs font-medium mb-1.5",
                      isDark ? "text-slate-400" : "text-slate-600",
                    )}
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className={clsx(
                      "w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all duration-200",
                      isDark
                        ? "border-slate-700 bg-slate-800 text-white placeholder:text-slate-500 focus:border-emerald-500"
                        : "border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-emerald-500",
                    )}
                  />
                </div>
                <div>
                  <label
                    className={clsx(
                      "block text-xs font-medium mb-1.5",
                      isDark ? "text-slate-400" : "text-slate-600",
                    )}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                    className={clsx(
                      "w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all duration-200",
                      isDark
                        ? "border-slate-700 bg-slate-800 text-white placeholder:text-slate-500 focus:border-emerald-500"
                        : "border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-emerald-500",
                    )}
                  />
                </div>
              </div>
              <div>
                <label
                  className={clsx(
                    "block text-xs font-medium mb-1.5",
                    isDark ? "text-slate-400" : "text-slate-600",
                  )}
                >
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formState.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  required
                  className={clsx(
                    "w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all duration-200",
                    isDark
                      ? "border-slate-700 bg-slate-800 text-white placeholder:text-slate-500 focus:border-emerald-500"
                      : "border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-emerald-500",
                  )}
                />
              </div>
              <div>
                <label
                  className={clsx(
                    "block text-xs font-medium mb-1.5",
                    isDark ? "text-slate-400" : "text-slate-600",
                  )}
                >
                  Message
                </label>
                <textarea
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  placeholder="Write your message..."
                  required
                  rows={5}
                  className={clsx(
                    "w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all duration-200 resize-none",
                    isDark
                      ? "border-slate-700 bg-slate-800 text-white placeholder:text-slate-500 focus:border-emerald-500"
                      : "border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-emerald-500",
                  )}
                />
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-medium transition-all duration-200 shadow-lg shadow-emerald-500/25"
              >
                <Send size={16} />
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
