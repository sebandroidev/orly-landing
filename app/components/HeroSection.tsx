"use client";

import { motion, AnimatePresence } from "framer-motion";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import { AppStoreIcon, PlayStoreIcon } from "@hugeicons/core-free-icons";
import { type Lang } from "./LanguageToggle";
import Logo from "./Logo";
import PhoneMockup from "./PhoneMockup";

const copy = {
  en: {
    headline: "Your city,\nat your fingertips.",
    sub: "Discover trusted local businesses your neighbors love — restaurants, artisans, services — all in one place.",
    appStore: "App Store",
    appStoreSub: "Download on the",
    playStore: "Google Play",
    playStoreSub: "Get it on",
    scroll: "Discover",
  },
  fr: {
    headline: "Votre ville,\nà portée de main.",
    sub: "Découvrez les meilleures adresses recommandées par votre communauté — restaurants, artisans, services — au même endroit.",
    appStore: "App Store",
    appStoreSub: "Disponible sur",
    playStore: "Google Play",
    playStoreSub: "Disponible sur",
    scroll: "Découvrir",
  },
};

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: {
    delay,
    duration: 0.6,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  },
});

interface HeroProps {
  lang: Lang;
  isDark: boolean;
}

export default function HeroSection({ lang, isDark }: HeroProps) {
  const t = copy[lang];

  return (
    <section className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden px-5 pb-16 pt-24">
      {/* Radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 40%, var(--glow) 0%, transparent 100%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center w-full max-w-4xl mx-auto">
        {/* Animated logo */}
        <div className="mb-8">
          <Logo />
        </div>

        {/* Headline */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.h1
            key={lang + "-hero-headline"}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[1.05] tracking-tight whitespace-pre-line"
            style={{ fontFamily: "var(--font-bricolage)", color: "var(--foreground)" }}
          >
            {t.headline}
          </motion.h1>
        </AnimatePresence>

        {/* Sub */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={lang + "-hero-sub"}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="mt-6 text-lg sm:text-xl max-w-xl leading-relaxed"
            style={{ color: "var(--fg-dim)" }}
          >
            {t.sub}
          </motion.p>
        </AnimatePresence>

        {/* App store buttons */}
        <motion.div {...fadeUp(0.3)} className="mt-10 flex flex-wrap gap-3 justify-center">
          <StoreButton href="#download" icon={AppStoreIcon} label={t.appStore} sub={t.appStoreSub} />
          <StoreButton href="#download" icon={PlayStoreIcon} label={t.playStore} sub={t.playStoreSub} />
        </motion.div>

        {/* Phone mockup */}
        <motion.div
          {...fadeUp(0.5)}
          className="mt-16 md:mt-20"
          whileHover={{ y: -8, rotate: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <PhoneMockup width={240} height={480} />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span
          className="text-[10px] tracking-widest uppercase"
          style={{ color: "var(--fg-dim)" }}
        >
          {t.scroll}
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="14" height="8" viewBox="0 0 14 8" fill="none" aria-hidden>
            <path
              d="M1 1l6 6 6-6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ color: "var(--fg-dim)" }}
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}

function StoreButton({
  href,
  icon,
  label,
  sub,
}: {
  href: string;
  icon: IconSvgElement;
  label: string;
  sub: string;
}) {
  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className="flex items-center gap-3 rounded-2xl px-5 py-3 border"
      style={{
        borderColor: "var(--border-subtle)",
        backgroundColor: "var(--surface)",
        textDecoration: "none",
      }}
    >
      <HugeiconsIcon
        icon={icon}
        size={22}
        strokeWidth={1.5}
        color="currentColor"
        style={{ color: "var(--foreground)" }}
      />
      <div className="text-left">
        <div className="text-[10px] leading-none mb-0.5" style={{ color: "var(--fg-dim)" }}>
          {sub}
        </div>
        <div className="text-sm font-semibold leading-none" style={{ color: "var(--foreground)" }}>
          {label}
        </div>
      </div>
    </motion.a>
  );
}
