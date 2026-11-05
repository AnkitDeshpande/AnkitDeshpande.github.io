"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, MapPin, Github, Linkedin, Send, Loader2, CheckCircle, AlertCircle } from "@/components/ui/Icons";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { siteConfig, socialLinks } from "@/lib/constants";
import { cn } from "@/lib/utils";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(20, "Message must be at least 20 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Something went wrong");
      }

      setStatus("success");
      reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Failed to send message. Please try again.");
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <header className="section-header max-w-3xl mx-auto text-center mb-16">
          <span className="section-label">Get in Touch</span>
          <h2 className="section-title">Contact Me</h2>
          <p className="section-description">
            Have a project in mind or just want to say hello? I'd love to hear from you.
          </p>
        </header>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto">
          <div className="lg:col-span-1">
            <Card className="p-6 h-full">
              <h3 className="font-display font-semibold text-xl text-fg mb-6">Let's Connect</h3>
              <p className="text-fg-muted mb-8 leading-relaxed">
                I'm always open to discussing new opportunities, interesting problems, or just chatting about backend engineering.
              </p>

              <div className="space-y-4">
                <a
                  href={socialLinks.email}
                  className="flex items-center gap-4 p-4 bg-bg-card/60 border border-border rounded-xl hover:border-crimson/30 hover:bg-bg-elevated transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-crimson/10 flex items-center justify-center text-crimson group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-fg-subtle uppercase tracking-wider">Email</p>
                    <p className="text-fg group-hover:text-crimson-light transition-colors">{siteConfig.email}</p>
                  </div>
                </a>

                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(siteConfig.location)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-bg-card/60 border border-border rounded-xl hover:border-crimson/30 hover:bg-bg-elevated transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-bg-elevated flex items-center justify-center text-fg-muted group-hover:text-crimson transition-colors">
                    <MapPin className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-fg-subtle uppercase tracking-wider">Location</p>
                    <p className="text-fg">{siteConfig.location}</p>
                  </div>
                </a>

                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-bg-card/60 border border-border rounded-xl hover:border-crimson/30 hover:bg-bg-elevated transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-bg-elevated flex items-center justify-center text-fg-muted group-hover:text-crimson transition-colors">
                    <Github className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-fg-subtle uppercase tracking-wider">GitHub</p>
                    <p className="text-fg group-hover:text-crimson-light transition-colors">AnkitDeshpande</p>
                  </div>
                </a>

                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-bg-card/60 border border-border rounded-xl hover:border-crimson/30 hover:bg-bg-elevated transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-bg-elevated flex items-center justify-center text-fg-muted group-hover:text-crimson transition-colors">
                    <Linkedin className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-fg-subtle uppercase tracking-wider">LinkedIn</p>
                    <p className="text-fg group-hover:text-crimson-light transition-colors">ankit-deshpande</p>
                  </div>
                </a>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card className="p-6 lg:p-8">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 rounded-full bg-green/10 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green" aria-hidden="true" />
                    </div>
                    <h3 className="font-display font-bold text-2xl text-fg mb-2">Message Sent!</h3>
                    <p className="text-fg-muted mb-6">Thanks for reaching out. I'll get back to you within 24 hours.</p>
                    <Button variant="secondary" onClick={() => setStatus("idle")}>
                      Send Another Message
                    </Button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <div className="grid md:grid-cols-2 gap-6">
                      <Input
                        label="Name"
                        placeholder="Your name"
                        error={errors.name?.message}
                        {...register("name")}
                      />
                      <Input
                        label="Email"
                        placeholder="you@example.com"
                        type="email"
                        error={errors.email?.message}
                        {...register("email")}
                      />
                    </div>

                    <Input
                      label="Subject"
                      placeholder="What's this about?"
                      error={errors.subject?.message}
                      {...register("subject")}
                    />

                    <Textarea
                      label="Message"
                      placeholder="Tell me about your project, opportunity, or question..."
                      rows={6}
                      error={errors.message?.message}
                      {...register("message")}
                    />

                    {status === "error" && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-3 p-4 bg-crimson/10 border border-crimson/30 rounded-lg text-crimson-light"
                        role="alert"
                      >
                        <AlertCircle className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                        <p className="text-sm">{errorMessage}</p>
                      </motion.div>
                    )}

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full sm:w-auto"
                      isLoading={status === "submitting"}
                    >
                      {status === "submitting" ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="w-5 h-5" aria-hidden="true" />
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-fg-subtle text-center">
                      By submitting this form, you agree to our{" "}
                      <a href="/legal/privacy" className="underline hover:text-crimson-light">Privacy Policy</a>
                      {" "}and{" "}
                      <a href="/legal/tos" className="underline hover:text-crimson-light">Terms of Service</a>
                      .
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}