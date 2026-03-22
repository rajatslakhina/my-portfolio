"use client";
import { useState } from "react";
import { CONTACT_DETAILS } from "@/constants";
import SectionWrapper from "../shared/SectionWrapper";
import { Mail, MapPin, Phone, Linkedin, Send, Radio, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { MediumIcon, WhatsAppIcon } from "@/components/icons";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const contactLinks = [
  { icon: Mail,       label: "Email",    value: CONTACT_DETAILS.email,    href: `mailto:${CONTACT_DETAILS.email}`,        color: "hsl(186 100% 50%)" },
  { icon: Phone,      label: "Phone",    value: CONTACT_DETAILS.phone,    href: `tel:${CONTACT_DETAILS.phone}`,           color: "hsl(275 100% 60%)" },
  { icon: MapPin,     label: "Location", value: CONTACT_DETAILS.location,                                                  color: "hsl(335 100% 55%)" },
  { icon: Linkedin,   label: "LinkedIn", value: "LinkedIn Profile",        href: CONTACT_DETAILS.linkedin,                color: "hsl(186 100% 50%)" },
  { icon: MediumIcon, label: "Medium",   value: "Medium Blog",            href: CONTACT_DETAILS.medium,                  color: "hsl(275 100% 60%)" },
];

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const fadeUp = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  show:   { opacity: 1, y: 0,  filter: "blur(0px)", transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export default function ContactSection() {
  const reduced = useReducedMotion();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle"|"loading"|"success"|"error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <SectionWrapper id="contact">
      {/* Header */}
      <motion.div className="mb-14 flex flex-col items-center gap-3"
        initial={reduced ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
      >
        <div className="relative flex items-center gap-2 border border-primary/30 bg-primary/8 px-4 py-1.5"
          style={{ clipPath: "polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px))" }}
        >
          <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary" />
          <Radio className="h-3 w-3 text-primary" />
          <span className="font-mono-accent text-[10px] text-primary uppercase tracking-[0.3em]">06 / contact.init</span>
        </div>
        <h2 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl">
          Get In <span className="text-gradient font-serif italic">Touch</span>
        </h2>
        <div className="flex items-center gap-3">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/50" />
          <span className="text-primary/30 text-xs">◆</span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary/50" />
        </div>
      </motion.div>

      <div className="mx-auto max-w-xl">
        {/* Transmission terminal */}
        <motion.div
          className="mb-8 relative border border-primary/20 bg-card/50 backdrop-blur-xl overflow-hidden"
          style={{ clipPath: "polygon(0 0,calc(100% - 12px) 0,100% 12px,100% 100%,12px 100%,0 calc(100% - 12px))" }}
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-2 border-b border-primary/10 bg-primary/5 px-4 py-2">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            <span className="font-mono-accent text-[9px] text-primary/60 tracking-widest">TRANSMISSION OPEN · SECURE CHANNEL</span>
            <Send className="ml-auto h-3 w-3 text-primary/40" />
          </div>
          <p className="px-5 py-4 text-sm leading-relaxed text-muted-foreground font-mono-accent text-[11px]">
            <span className="text-primary">{">"}</span>{" "}
            {"Open to new opportunities, collaborations, and conversations about mobile technology. Respond time: < 24h"}
          </p>
        </motion.div>

        {/* Contact rows */}
        <motion.div className="space-y-2.5"
          variants={reduced ? undefined : stagger}
          initial={reduced ? false : "hidden"}
          whileInView="show" viewport={{ once: true }}
        >
          {contactLinks.map((item) => (
            <motion.div key={item.label} variants={reduced ? undefined : fadeUp}>
              {item.href ? (
                <a href={item.href}
                  {...(item.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex items-center gap-4 border bg-card/60 backdrop-blur-sm p-4 transition-all duration-300 overflow-hidden relative"
                  style={{
                    borderColor: item.color + "25",
                    clipPath: "polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px))",
                  }}
                >
                  <ContactRow item={item} />
                </a>
              ) : (
                <div className="group flex items-center gap-4 border bg-card/60 backdrop-blur-sm p-4 transition-all duration-300 overflow-hidden relative cursor-default"
                  style={{
                    borderColor: item.color + "25",
                    clipPath: "polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px))",
                  }}
                >
                  <ContactRow item={item} />
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* WhatsApp CTA */}
        <motion.a
          href={CONTACT_DETAILS.whatsapp} target="_blank" rel="noopener noreferrer"
          className="mt-6 flex w-full items-center justify-center gap-3 border-2 py-4 font-mono-accent text-sm font-bold uppercase tracking-widest transition-all duration-300 relative overflow-hidden group"
          style={{
            borderColor: "hsl(142 72% 36% / 0.6)",
            color: "hsl(142 72% 50%)",
            clipPath: "polygon(0 0,calc(100% - 12px) 0,100% 12px,100% 100%,12px 100%,0 calc(100% - 12px))",
            background: "hsl(142 72% 36% / 0.08)",
          }}
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }}
          whileHover={reduced ? undefined : { scale: 1.01 }}
          whileTap={reduced ? undefined : { scale: 0.98 }}
        >
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: "hsl(142 72% 36% / 0.12)" }} />
          <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 z-10"
            style={{ borderColor: "hsl(142 72% 50%)" }} />
          <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 z-10"
            style={{ borderColor: "hsl(142 72% 50%)" }} />
          <WhatsAppIcon className="relative h-5 w-5" />
          <span className="relative">Chat on WhatsApp</span>
          <span className="relative font-mono-accent text-[10px] opacity-60">· instant connect</span>
        </motion.a>
      </div>

      {/* ── Contact Form ── */}
      <motion.div
        className="mx-auto mt-10 max-w-xl"
        initial={reduced ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="mb-6 flex items-center gap-2">
          <div className="h-px w-6 bg-primary/60" />
          <span className="font-mono-accent text-[9px] tracking-[0.3em] text-primary/50 uppercase">Send a message</span>
          <div className="h-px flex-1 bg-primary/10" />
        </div>

        {status === "success" ? (
          <div className="flex items-center gap-3 border border-primary/30 bg-primary/8 p-6"
            style={{ clipPath: "polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px))" }}>
            <CheckCircle className="h-5 w-5 text-primary shrink-0" />
            <div>
              <p className="font-mono-accent text-[11px] uppercase tracking-wider text-primary font-semibold">Message sent</p>
              <p className="mt-0.5 text-xs text-muted-foreground">Thanks &mdash; I&apos;ll get back to you within 48 hours.</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-mono-accent text-[9px] uppercase tracking-widest text-muted-foreground/60">Name *</label>
                <input
                  required
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className={cn("border bg-card/40 px-3 py-2.5 font-mono-accent text-[11px] text-foreground placeholder:text-muted-foreground/40 focus:outline-none transition-colors",
                    "border-white/10 focus:border-primary/40")}
                  style={{ clipPath: "polygon(0 0,calc(100% - 6px) 0,100% 6px,100% 100%,6px 100%,0 calc(100% - 6px))" }}
                  placeholder="Rajat Lakhina"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-mono-accent text-[9px] uppercase tracking-widest text-muted-foreground/60">Email *</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  className={cn("border bg-card/40 px-3 py-2.5 font-mono-accent text-[11px] text-foreground placeholder:text-muted-foreground/40 focus:outline-none transition-colors",
                    "border-white/10 focus:border-primary/40")}
                  style={{ clipPath: "polygon(0 0,calc(100% - 6px) 0,100% 6px,100% 100%,6px 100%,0 calc(100% - 6px))" }}
                  placeholder="you@company.com"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-mono-accent text-[9px] uppercase tracking-widest text-muted-foreground/60">Subject</label>
              <input
                value={form.subject}
                onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                className={cn("border bg-card/40 px-3 py-2.5 font-mono-accent text-[11px] text-foreground placeholder:text-muted-foreground/40 focus:outline-none transition-colors",
                  "border-white/10 focus:border-primary/40")}
                style={{ clipPath: "polygon(0 0,calc(100% - 6px) 0,100% 6px,100% 100%,6px 100%,0 calc(100% - 6px))" }}
                placeholder="Tech Lead opportunity / Collaboration / etc."
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-mono-accent text-[9px] uppercase tracking-widest text-muted-foreground/60">Message *</label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                className={cn("resize-none border bg-card/40 px-3 py-2.5 font-mono-accent text-[11px] text-foreground placeholder:text-muted-foreground/40 focus:outline-none transition-colors",
                  "border-white/10 focus:border-primary/40")}
                style={{ clipPath: "polygon(0 0,calc(100% - 6px) 0,100% 6px,100% 100%,6px 100%,0 calc(100% - 6px))" }}
                placeholder="Tell me about the role / project / opportunity..."
              />
            </div>
            {status === "error" && (
              <div className="flex items-center gap-2 text-destructive">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                <p className="font-mono-accent text-[9px] uppercase tracking-wider">Failed to send — please try emailing directly.</p>
              </div>
            )}
            <button
              type="submit"
              disabled={status === "loading"}
              className="flex items-center justify-center gap-2 border border-primary/30 bg-primary/10 px-6 py-3 font-mono-accent text-[10px] uppercase tracking-widest text-primary hover:border-primary/60 hover:bg-primary/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              style={{ clipPath: "polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px))" }}
            >
              {status === "loading" ? <Loader2 className="h-3 w-3 animate-spin" /> : <Send className="h-3 w-3" />}
              {status === "loading" ? "Sending..." : "Send Message"}
            </button>
          </form>
        )}
      </motion.div>
    </SectionWrapper>
  );
}

function ContactRow({ item }: { item: { icon: React.ElementType; label: string; value: string; color: string } }) {
  return (
    <>
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, ${item.color}08, transparent)` }} />
      <div className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: item.color, boxShadow: `0 0 8px ${item.color}` }} />
      <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center border transition-colors duration-300"
        style={{
          borderColor: item.color + "30",
          background: item.color + "10",
          clipPath: "polygon(0 0,calc(100% - 5px) 0,100% 5px,100% 100%,5px 100%,0 calc(100% - 5px))",
        }}
      >
        <item.icon className="h-4 w-4" style={{ color: item.color }} />
      </div>
      <div className="relative z-10 min-w-0 flex-1">
        <p className="font-mono-accent text-[9px] uppercase tracking-widest text-muted-foreground/60 mb-0.5">{item.label}</p>
        <p className="text-sm font-medium text-foreground group-hover:text-foreground transition-colors duration-200 truncate"
          style={{ color: undefined }}>
          {item.value}
        </p>
      </div>
      <div className="relative z-10 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{ color: item.color }}>
        <span className="font-mono-accent text-[10px]">→</span>
      </div>
    </>
  );
}
