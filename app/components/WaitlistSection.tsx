"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { type Lang } from "./LanguageToggle";
import EmailForm from "./EmailForm";

const copy = {
  en: {
    eyebrow: "Early Access",
    headline: "Be among\nthe first.",
    sub: "We launch city by city. Join the waitlist and get notified when Orly arrives near you.",
  },
  fr: {
    eyebrow: "Accès anticipé",
    headline: "Soyez parmi\nles premiers.",
    sub: "Nous lançons ville par ville. Rejoignez la liste et soyez notifié quand Orly arrive près de chez vous.",
  },
};

interface WaitlistProps {
  lang: Lang;
  isDark: boolean;
}

export default function WaitlistSection({ lang, isDark }: WaitlistProps) {
  const t = copy[lang];
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="waitlist" ref={ref} className="py-24 md:py-32 px-5">
      {/* Subtle divider line */}
      <div
        className="mx-auto max-w-6xl mb-24 h-px"
        style={{ backgroundColor: "var(--border-subtle)" }}
      />

      <div className="mx-auto max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p
            className="text-xs tracking-widest uppercase mb-4"
            style={{ color: "var(--fg-dim)" }}
          >
            {t.eyebrow}
          </p>
          <h2
            className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight whitespace-pre-line mb-5"
            style={{ fontFamily: "var(--font-bricolage)", color: "var(--foreground)" }}
          >
            {t.headline}
          </h2>
          <p
            className="text-base md:text-lg leading-relaxed mb-10"
            style={{ color: "var(--fg-dim)" }}
          >
            {t.sub}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <EmailForm lang={lang} isDark={isDark} />
        </motion.div>
      </div>
    </section>
  );
}
