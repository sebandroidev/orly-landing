"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import { AppStoreIcon, PlayStoreIcon } from "@hugeicons/core-free-icons";
import { type Lang } from "./LanguageToggle";
import PhoneMockup from "./PhoneMockup";

const copy = {
  en: {
    eyebrow: "Download",
    headline: "Ready to explore?",
    sub: "Download Orly for free and start discovering the best local spots around you.",
    free: "Free to download. No subscription.",
    appStore: "App Store",
    playStore: "Google Play",
    appStoreSub: "Download on the",
    playStoreSub: "Get it on",
  },
  fr: {
    eyebrow: "Télécharger",
    headline: "Prêt à explorer ?",
    sub: "Téléchargez Orly gratuitement et découvrez les meilleures adresses autour de vous.",
    free: "Gratuit. Sans abonnement.",
    appStore: "App Store",
    playStore: "Google Play",
    appStoreSub: "Disponible sur",
    playStoreSub: "Disponible sur",
  },
};

interface DownloadProps {
  lang: Lang;
  isDark: boolean;
}

export default function DownloadSection({ lang, isDark }: DownloadProps) {
  const t = copy[lang];
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="download" ref={ref} className="py-24 md:py-32 px-5">
      {/* Divider */}
      <div
        className="mx-auto max-w-6xl mb-24 h-px"
        style={{ backgroundColor: "var(--border-subtle)" }}
      />

      <div className="mx-auto max-w-6xl">
        <div
          className="relative rounded-3xl border overflow-hidden"
          style={{
            backgroundColor: "var(--surface)",
            borderColor: "var(--border-subtle)",
          }}
        >
          {/* Glow */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 60% at 30% 50%, var(--glow) 0%, transparent 70%)",
            }}
          />

          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-0">
            {/* Left: text + buttons */}
            <div className="flex-1 p-10 md:p-16 flex flex-col items-start">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <p
                  className="text-xs tracking-widest uppercase mb-3"
                  style={{ color: "var(--fg-dim)" }}
                >
                  {t.eyebrow}
                </p>
                <h2
                  className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight mb-4"
                  style={{ fontFamily: "var(--font-bricolage)", color: "var(--foreground)" }}
                >
                  {t.headline}
                </h2>
                <p
                  className="text-base md:text-lg leading-relaxed mb-2 max-w-md"
                  style={{ color: "var(--fg-dim)" }}
                >
                  {t.sub}
                </p>
                <p
                  className="text-sm font-semibold mb-10"
                  style={{ color: "var(--foreground)", opacity: 0.5 }}
                >
                  {t.free}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-wrap gap-3"
              >
                <StoreButton
                  href="#"
                  icon={AppStoreIcon}
                  sub={t.appStoreSub}
                  label={t.appStore}
                  isDark={isDark}
                />
                <StoreButton
                  href="#"
                  icon={PlayStoreIcon}
                  sub={t.playStoreSub}
                  label={t.playStore}
                  isDark={isDark}
                />
              </motion.div>
            </div>

            {/* Right: phone mockup */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="hidden lg:flex flex-shrink-0 items-end pr-16"
              style={{ marginBottom: -1 }}
            >
              <PhoneMockup width={220} height={420} />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StoreButton({
  href,
  icon,
  sub,
  label,
  isDark,
}: {
  href: string;
  icon: IconSvgElement;
  sub: string;
  label: string;
  isDark: boolean;
}) {
  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className="flex items-center gap-3 rounded-2xl px-5 py-3.5 border"
      style={{
        backgroundColor: "var(--foreground)",
        borderColor: "var(--foreground)",
        color: "var(--background)",
        textDecoration: "none",
      }}
    >
      <HugeiconsIcon
        icon={icon}
        size={24}
        strokeWidth={1.5}
        color="currentColor"
      />
      <div className="text-left">
        <div className="text-[10px] leading-none mb-0.5 opacity-70">{sub}</div>
        <div
          className="text-sm font-bold leading-none"
          style={{ fontFamily: "var(--font-bricolage)" }}
        >
          {label}
        </div>
      </div>
    </motion.a>
  );
}
