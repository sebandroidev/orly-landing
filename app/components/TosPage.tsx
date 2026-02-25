"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import LanguageToggle from "./LanguageToggle";
import ThemeToggle from "./ThemeToggle";
import { useAppPreferences } from "../hooks/useAppPreferences";

const copy = {
  fr: {
    back: "← Retour",
    pageTitle: "Conditions d'utilisation",
    pageSub: "Dernière mise à jour : 25 février 2026",
    sections: [
      {
        title: "Acceptation des conditions",
        body: "En accédant au site orly.app ou en vous inscrivant à la liste d'attente d'Orly, vous acceptez les présentes conditions d'utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser nos services.",
      },
      {
        title: "Description du service",
        body: "Orly est une plateforme communautaire permettant de découvrir, partager et évaluer des services locaux. Dans sa phase actuelle, le service se limite à l'inscription sur une liste d'attente. Les fonctionnalités complètes seront disponibles lors du lancement officiel de l'application.",
      },
      {
        title: "Responsabilités de l'utilisateur",
        body: "Vous vous engagez à fournir des informations exactes lors de votre inscription (email, prénom, nom). Vous vous interdisez d'utiliser nos services à des fins illicites, de tenter de perturber nos systèmes, ou de vous faire passer pour une autre personne ou entité.",
      },
      {
        title: "Propriété intellectuelle",
        body: "Toutes les marques, logos, textes, images et autres contenus présents sur orly.app sont la propriété exclusive d'Orly ou de ses partenaires, et sont protégés par les lois applicables sur la propriété intellectuelle. Toute reproduction non autorisée est interdite.",
      },
      {
        title: "Limitation de responsabilité",
        body: "Orly est fourni « tel quel » dans sa phase de prélancement. Nous ne garantissons pas la disponibilité continue du service, ni l'exactitude des informations présentées. Notre responsabilité ne saurait être engagée pour des dommages indirects résultant de l'utilisation de nos services.",
      },
      {
        title: "Droit applicable",
        body: "Les présentes conditions sont régies par le droit français. Tout litige relatif à leur interprétation ou exécution sera soumis à la compétence exclusive des tribunaux compétents.",
      },
      {
        title: "Contact",
        body: "Pour toute question relative aux présentes conditions, contactez-nous à support@orly.app. Nous répondons dans les 72 heures ouvrées.",
      },
    ],
  },
  en: {
    back: "← Back",
    pageTitle: "Terms of Service",
    pageSub: "Last updated: February 25, 2026",
    sections: [
      {
        title: "Acceptance of terms",
        body: "By accessing orly.app or signing up for the Orly waitlist, you agree to these Terms of Service. If you do not agree, please do not use our services.",
      },
      {
        title: "Service description",
        body: "Orly is a community platform for discovering, sharing, and reviewing local services. In its current phase, the service is limited to waitlist registration. Full features will be available at the official app launch.",
      },
      {
        title: "User responsibilities",
        body: "You agree to provide accurate information when registering (email, first name, last name). You must not use our services for unlawful purposes, attempt to disrupt our systems, or impersonate any person or entity.",
      },
      {
        title: "Intellectual property",
        body: "All trademarks, logos, text, images, and other content on orly.app are the exclusive property of Orly or its partners, and are protected by applicable intellectual property laws. Unauthorized reproduction is prohibited.",
      },
      {
        title: "Limitation of liability",
        body: "Orly is provided \u201cas is\u201d during its pre-launch phase. We do not guarantee continuous availability of the service or the accuracy of any information presented. We shall not be liable for indirect damages resulting from the use of our services.",
      },
      {
        title: "Governing law",
        body: "These terms are governed by French law. Any dispute relating to their interpretation or performance shall be subject to the exclusive jurisdiction of the competent courts.",
      },
      {
        title: "Contact",
        body: "For any questions about these terms, contact us at support@orly.app. We respond within 72 business hours.",
      },
    ],
  },
};

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export default function TosPage() {
  const { lang, setLang, theme, setTheme, isDark } = useAppPreferences("fr");
  const t = copy[lang];

  return (
    <div className="relative min-h-screen">
      <div
        className="pointer-events-none fixed inset-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(ellipse 70% 55% at 50% 20%, var(--glow) 0%, transparent 100%)`,
        }}
      />

      {/* Top bar */}
      <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-4">
        <Link
          href="/"
          className="text-xs font-medium transition-colors duration-150"
          style={{ color: "var(--fg-dim)" }}
        >
          {t.back}
        </Link>
        <div className="flex items-center gap-2">
          <LanguageToggle lang={lang} onToggle={setLang} isDark={isDark} />
          <ThemeToggle theme={theme} onToggle={setTheme} isDark={isDark} />
        </div>
      </div>

      {/* Content */}
      <main className="mx-auto max-w-2xl px-5 pb-24 pt-10">
        <motion.div
          key={lang}
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-12"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="flex flex-col gap-2">
            <h1
              className="text-4xl font-extrabold tracking-tight sm:text-5xl"
              style={{
                fontFamily: "var(--font-bricolage)",
                color: "var(--foreground)",
              }}
            >
              {t.pageTitle}
            </h1>
            <p className="text-base" style={{ color: "var(--fg-dim)" }}>
              {t.pageSub}
            </p>
          </motion.div>

          {/* Sections */}
          {t.sections.map((section) => (
            <motion.div key={section.title} variants={itemVariants} className="flex flex-col gap-3">
              <h2
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: "var(--fg-dim)" }}
              >
                {section.title}
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: "var(--foreground)" }}>
                {section.body}
              </p>
            </motion.div>
          ))}

          {/* Footer */}
          <motion.div variants={itemVariants}>
            <p className="text-xs" style={{ color: "var(--fg-dim)" }}>
              © {new Date().getFullYear()} Orly
            </p>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
