"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import LanguageToggle, { type Lang } from "./LanguageToggle";
import ThemeToggle, { type Theme } from "./ThemeToggle";

const copy = {
  en: {
    features: "Features",
    merchants: "For Businesses",
    faq: "FAQ",
    waitlist: "Download the app",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
  fr: {
    features: "Fonctionnalités",
    merchants: "Pour les commerçants",
    faq: "FAQ",
    waitlist: "Télécharger l'app",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
  },
};

interface NavbarProps {
  lang: Lang;
  setLang: (l: Lang) => void;
  theme: Theme;
  setTheme: (t: Theme) => void;
  isDark: boolean;
}

export default function Navbar({ lang, setLang, theme, setTheme, isDark }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = copy[lang];

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const navLinks = [
    { label: t.features, href: "#features" },
    { label: t.merchants, href: "#merchants" },
    { label: t.faq, href: "/faq" },
  ];

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backdropFilter: scrolled ? "blur(20px) saturate(180%)" : undefined,
          WebkitBackdropFilter: scrolled ? "blur(20px) saturate(180%)" : undefined,
          backgroundColor: scrolled
            ? isDark ? "rgba(13,13,13,0.88)" : "rgba(245,244,239,0.88)"
            : "transparent",
          borderBottom: `1px solid ${scrolled ? "var(--border-subtle)" : "transparent"}`,
        }}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          {/* Logo */}
          <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center">
            <Image
              src="/logo-orly.svg"
              alt="Orly"
              width={80}
              height={42}
              className="h-8 w-auto"
              priority
            />
          </Link>

          {/* Desktop nav links */}
          <ul className="hidden md:flex items-center gap-7">
            {navLinks.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-sm font-medium transition-opacity duration-150 hover:opacity-100"
                  style={{ color: "var(--fg-dim)" }}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2">
              <LanguageToggle lang={lang} onToggle={setLang} isDark={isDark} />
              <ThemeToggle theme={theme} onToggle={setTheme} isDark={isDark} />
            </div>

            {/* CTA — desktop */}
            <motion.a
              href="#download"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="hidden md:inline-flex items-center rounded-xl px-4 py-2 text-sm font-semibold"
              style={{ backgroundColor: "var(--foreground)", color: "var(--background)" }}
            >
              {t.waitlist}
            </motion.a>

            {/* Hamburger — mobile */}
            <button
              className="flex md:hidden flex-col justify-center items-center w-8 h-8 gap-[5px]"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? t.closeMenu : t.openMenu}
              aria-expanded={mobileOpen}
            >
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.22, ease: "easeInOut" }}
                className="block h-[1.5px] w-5 rounded-full"
                style={{ backgroundColor: "var(--foreground)" }}
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.18 }}
                className="block h-[1.5px] w-5 rounded-full"
                style={{ backgroundColor: "var(--foreground)" }}
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.22, ease: "easeInOut" }}
                className="block h-[1.5px] w-5 rounded-full"
                style={{ backgroundColor: "var(--foreground)" }}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 flex flex-col pt-20 px-5 pb-8"
            style={{ backgroundColor: "var(--background)" }}
          >
            <motion.nav
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05, duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-0 flex-1"
            >
              {navLinks.map(({ label, href }, i) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-5 text-3xl font-black border-b transition-opacity hover:opacity-60"
                    style={{
                      fontFamily: "var(--font-bricolage)",
                      color: "var(--foreground)",
                      borderColor: "var(--border-subtle)",
                    }}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center justify-between"
            >
              <div className="flex gap-2">
                <LanguageToggle lang={lang} onToggle={setLang} isDark={isDark} />
                <ThemeToggle theme={theme} onToggle={setTheme} isDark={isDark} />
              </div>
              <a
                href="#download"
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-5 py-3 text-sm font-semibold"
                style={{ backgroundColor: "var(--foreground)", color: "var(--background)" }}
              >
                {t.waitlist}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
