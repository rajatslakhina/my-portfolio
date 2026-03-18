"use client";
import { CONTACT_DETAILS } from "@/constants";
import SectionWrapper from "../shared/SectionWrapper";
import { Mail, MapPin, Phone, Linkedin, Send, Radio } from "lucide-react";
import { MediumIcon, WhatsAppIcon } from "@/components/icons";
import { motion, useReducedMotion } from "framer-motion";

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
          <span className="relative font-mono-accent text-[10px] opacity-60">// instant connect</span>
        </motion.a>
      </div>
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
