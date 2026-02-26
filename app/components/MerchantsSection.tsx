"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { Store01Icon, StarIcon, ChartLineData01Icon } from "@hugeicons/core-free-icons";
import { type Lang } from "./LanguageToggle";

const copy = {
  en: {
    eyebrow: "For Businesses",
    headline: "Get discovered.\nFor free.",
    sub: "List your business on Orly and reach thousands of local customers looking for exactly what you offer. No tech skills required.",
    benefits: [
      {
        title: "Free listing",
        desc: "Appear in search results and on the map at no cost. Always.",
        badge: null,
      },
      {
        title: "Community reviews",
        desc: "Build your reputation through authentic customer feedback.",
        badge: null,
      },
      {
        title: "Analytics",
        desc: "Understand how customers discover and engage with your business.",
        badge: null,
      },
    ],
    cta: "List my business — it's free",
  },
  fr: {
    eyebrow: "Pour les commerçants",
    headline: "Faites-vous découvrir.\nGratuitement.",
    sub: "Inscrivez votre commerce sur Orly et atteignez des milliers de clients locaux qui cherchent exactement ce que vous proposez. Sans compétences techniques.",
    benefits: [
      {
        title: "Inscription gratuite",
        desc: "Apparaissez dans les résultats et sur la carte sans frais. Toujours.",
        badge: null,
      },
      {
        title: "Avis communautaires",
        desc: "Construisez votre réputation grâce aux retours authentiques de vos clients.",
        badge: null,
      },
      {
        title: "Analytiques",
        desc: "Comprenez comment les clients découvrent votre commerce et interagissent avec lui.",
        badge: null,
      },
    ],
    cta: "Inscrire mon commerce — c'est gratuit",
  },
};

const benefitIcons = [Store01Icon, StarIcon, ChartLineData01Icon];

interface MerchantsProps {
  lang: Lang;
  isDark: boolean;
}

export default function MerchantsSection({ lang, isDark }: MerchantsProps) {
  const t = copy[lang];
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="merchants" ref={ref} className="py-24 md:py-32 px-5">
      <div className="mx-auto max-w-6xl">
        <div
          className="relative rounded-3xl border overflow-hidden p-10 md:p-16"
          style={{
            backgroundColor: "var(--surface)",
            borderColor: "var(--border-subtle)",
          }}
        >
          {/* Subtle top glow */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 40% at 50% -10%, var(--glow) 0%, transparent 70%)",
            }}
          />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-start lg:gap-24">
            {/* Left: headline + sub + cta */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex-1 mb-10 lg:mb-0"
            >
              <p
                className="text-xs tracking-widest uppercase mb-3"
                style={{ color: "var(--fg-dim)" }}
              >
                {t.eyebrow}
              </p>
              <h2
                className="text-4xl md:text-5xl font-black leading-[1.05] tracking-tight whitespace-pre-line mb-5"
                style={{ fontFamily: "var(--font-bricolage)", color: "var(--foreground)" }}
              >
                {t.headline}
              </h2>
              <p
                className="text-base md:text-lg leading-relaxed mb-8 max-w-sm"
                style={{ color: "var(--fg-dim)" }}
              >
                {t.sub}
              </p>

              <motion.a
                href="#waitlist"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="inline-flex items-center rounded-xl px-6 py-3 text-sm font-semibold"
                style={{
                  backgroundColor: "var(--foreground)",
                  color: "var(--background)",
                }}
              >
                {t.cta}
              </motion.a>
            </motion.div>

            {/* Right: benefit cards */}
            <div className="flex-1 flex flex-col gap-3">
              {t.benefits.map((benefit, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    delay: 0.1 + i * 0.1,
                    duration: 0.55,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="rounded-2xl border p-5 flex items-start gap-4"
                  style={{
                    backgroundColor: isDark
                      ? "rgba(255,255,255,0.04)"
                      : "rgba(0,0,0,0.03)",
                    borderColor: "var(--border-subtle)",
                  }}
                >
                  <div
                    className="flex-shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-xl mt-0.5"
                    style={{
                      backgroundColor: isDark
                        ? "rgba(255,255,255,0.08)"
                        : "rgba(0,0,0,0.06)",
                    }}
                  >
                    <HugeiconsIcon
                      icon={benefitIcons[i]}
                      size={16}
                      strokeWidth={1.5}
                      color="currentColor"
                      style={{ color: "var(--foreground)" }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3
                        className="text-sm font-bold"
                        style={{
                          fontFamily: "var(--font-bricolage)",
                          color: "var(--foreground)",
                        }}
                      >
                        {benefit.title}
                      </h3>
                      {benefit.badge && (
                        <span
                          className="text-[10px] px-1.5 py-0.5 rounded-full"
                          style={{
                            backgroundColor: "var(--border-subtle)",
                            color: "var(--fg-dim)",
                          }}
                        >
                          {benefit.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: "var(--fg-dim)" }}>
                      {benefit.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
