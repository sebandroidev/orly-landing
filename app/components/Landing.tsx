"use client";

import { useState, useEffect, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LogoScene from "./LogoScene";
import LanguageToggle, { type Lang } from "./LanguageToggle";
import ThemeToggle, { type Theme } from "./ThemeToggle";
import EmailForm from "./EmailForm";

const copy = {
  fr: {
    headline: "Découvrez tout local",
    sub: "Trouver les meilleures adresses et services tout autour de vous.",
  },
  en: {
    headline: "Discover what\u2019s around you",
    sub: "Find trusted local businesses your neighbors love.",
  },
};

// Staggered entrance for each section below the logo
const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: {
    delay,
    duration: 0.55,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  },
});

export default function Landing({ footer }: { footer: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const [theme, setTheme] = useState<Theme>("dark");
  const isDark = theme === "dark";
  const t = copy[lang];

  // Read persisted theme and lang after hydration (avoids SSR mismatch)
  useEffect(() => {
    const savedTheme = localStorage.getItem("orly-theme") as Theme | null;
    if (savedTheme === "light") setTheme("light");
    const savedLang = localStorage.getItem("orly-lang") as Lang | null;
    if (savedLang === "fr" || savedLang === "en") setLang(savedLang);
  }, []);

  // Keep <html> class and localStorage in sync
  useEffect(() => {
    document.documentElement.classList.toggle("light", !isDark);
    localStorage.setItem("orly-theme", theme);
  }, [isDark, theme]);

  // Keep <html lang> and localStorage in sync
  useEffect(() => {
    document.documentElement.lang = lang;
    localStorage.setItem("orly-lang", lang);
  }, [lang]);

  return (
    <main className="relative flex h-[100dvh] w-full flex-col items-center justify-center overflow-hidden px-5 pb-16">
      {/* Subtle radial glow in center */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(ellipse 70% 55% at 50% 45%, var(--glow) 0%, transparent 100%)`,
        }}
      />

      {/* Language + Theme toggles — top right */}
      <motion.div
        className="absolute top-5 right-5 flex items-center gap-2"
        {...fadeUp(0.9)}
      >
        <LanguageToggle lang={lang} onToggle={setLang} isDark={isDark} />
        <ThemeToggle theme={theme} onToggle={setTheme} isDark={isDark} />
      </motion.div>

      {footer}

      {/* Content stack */}
      <div className="flex w-full max-w-sm flex-col items-center gap-4 sm:gap-3 md:max-w-2xl">
        {/* Logo scene */}
        <LogoScene />

        {/* Headline */}
        <div className="overflow-hidden text-center">
          <AnimatePresence mode="wait" initial={false}>
            <motion.h1
              key={lang + "-headline"}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="text-4xl font-black leading-[1.1] tracking-tight sm:text-6xl md:whitespace-nowrap"
              style={{
                fontFamily: "var(--font-bricolage)",
                color: "var(--foreground)",
                fontWeight: 900,
              }}
            >
              {t.headline}
            </motion.h1>
          </AnimatePresence>
        </div>

        {/* Sub-headline */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={lang + "-sub"}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="text-center text-base font-medium leading-snug sm:text-lg md:max-w-[30rem]"
            style={{ color: "var(--fg-dim)" }}
          >
            {t.sub}
          </motion.p>
        </AnimatePresence>

        {/* Email form */}
        <motion.div className="mt-6 w-full md:max-w-sm" {...fadeUp(0.7)}>
          <EmailForm lang={lang} isDark={isDark} />
        </motion.div>
      </div>
    </main>
  );
}
