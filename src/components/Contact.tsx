import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, Linkedin, Github, Send, CheckCircle } from "lucide-react";
import clsx from "clsx";
import { useThemeContext } from "../context/ThemeContext";

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

export default function Contact() {
  const { isDark } = useThemeContext();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (status === "error") setStatus("idle");
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("https://formsubmit.co/ajax/ankitdeshpande1998@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formState),
      });
      if (res.ok) {
        setStatus("success");
        setFormState({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputClass = clsx(
    "w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all duration-200",
    isDark
      ? "border-slate-700 bg-slate-800 text-white placeholder:text-slate-500 focus:border-emerald-500"
      : "border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-emerald-500",
  );

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
            <form onSubmit={handleSubmit} className="space-y-4">
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
                    className={inputClass}
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
                    className={inputClass}
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
                  className={inputClass}
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
                  className={clsx(inputClass, "resize-none")}
                />
              </div>
              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30"
                >
                  <CheckCircle size={20} className="text-emerald-400 shrink-0" />
                  <p className="text-sm text-emerald-400 font-medium">Message sent! I'll get back to you soon.</p>
                </motion.div>
              ) : (
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium transition-all duration-200 shadow-lg shadow-emerald-500/25"
                >
                  <Send size={16} />
                  {status === "sending" ? "Sending..." : "Send Message"}
                </button>
              )}
              {status === "error" && (
                <p className="text-sm text-red-400 text-center">Something went wrong. Please try again.</p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
