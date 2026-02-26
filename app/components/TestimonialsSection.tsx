"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { type Lang } from "./LanguageToggle";

const copy = {
  en: {
    eyebrow: "People love Orly",
    headline: "Real people,\nreal places.",
    testimonials: [
      {
        quote:
          "Found my new favorite restaurant in under 2 minutes. The reviews are spot on — I can tell they come from people who actually live here.",
        name: "Kofi A.",
        role: "User · Lomé",
        initials: "KA",
      },
      {
        quote:
          "My salon went from invisible to getting new walk-ins every week. And it didn't cost me anything. Orly just works.",
        name: "Adjoa M.",
        role: "Business owner · Lomé",
        initials: "AM",
      },
      {
        quote:
          "Finally an app that actually knows my neighborhood. Every place I search for is there. It feels built for us.",
        name: "Emmanuel D.",
        role: "User · Lomé",
        initials: "ED",
      },
    ],
  },
  fr: {
    eyebrow: "Ils adorent Orly",
    headline: "De vraies personnes,\nde vrais lieux.",
    testimonials: [
      {
        quote:
          "J'ai trouvé mon nouveau restaurant préféré en moins de 2 minutes. Les avis sont fiables — on voit que ça vient de gens du quartier.",
        name: "Kofi A.",
        role: "Utilisateur · Lomé",
        initials: "KA",
      },
      {
        quote:
          "Mon salon est passé de invisible à recevoir de nouveaux clients chaque semaine. Et ça ne m'a rien coûté. Orly, ça marche tout simplement.",
        name: "Adjoa M.",
        role: "Commerçante · Lomé",
        initials: "AM",
      },
      {
        quote:
          "Enfin une appli qui connaît vraiment mon quartier. Tout ce que je cherche est là. On dirait qu'elle a été faite pour nous.",
        name: "Emmanuel D.",
        role: "Utilisateur · Lomé",
        initials: "ED",
      },
    ],
  },
};

interface TestimonialsProps {
  lang: Lang;
  isDark: boolean;
}

export default function TestimonialsSection({ lang, isDark }: TestimonialsProps) {
  const t = copy[lang];
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 md:py-32 px-5">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 md:mb-16"
        >
          <p
            className="text-xs tracking-widest uppercase mb-3"
            style={{ color: "var(--fg-dim)" }}
          >
            {t.eyebrow}
          </p>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight whitespace-pre-line"
            style={{ fontFamily: "var(--font-bricolage)", color: "var(--foreground)" }}
          >
            {t.headline}
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {t.testimonials.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
              className="rounded-2xl border p-6 flex flex-col gap-5"
              style={{
                backgroundColor: "var(--surface)",
                borderColor: "var(--border-subtle)",
              }}
            >
              {/* Stars */}
              <div className="flex gap-1" aria-label="5 stars">
                {[1, 2, 3, 4, 5].map((s) => (
                  <svg key={s} width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p
                className="text-sm leading-relaxed flex-1"
                style={{ color: "var(--foreground)", opacity: 0.85 }}
              >
                &ldquo;{item.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold"
                  style={{
                    backgroundColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)",
                    color: "var(--foreground)",
                    fontFamily: "var(--font-bricolage)",
                  }}
                >
                  {item.initials}
                </div>
                <div>
                  <p
                    className="text-sm font-semibold leading-none mb-0.5"
                    style={{ fontFamily: "var(--font-bricolage)", color: "var(--foreground)" }}
                  >
                    {item.name}
                  </p>
                  <p className="text-xs" style={{ color: "var(--fg-dim)" }}>
                    {item.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
