"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import LanguageToggle from "./LanguageToggle";
import ThemeToggle from "./ThemeToggle";
import { useAppPreferences } from "../hooks/useAppPreferences";

const copy = {
  fr: {
    back: "← Retour",
    pageTitle: "Politique de confidentialité",
    pageSub: "Dernière mise à jour : 25 février 2026",
    sections: [
      {
        title: "Introduction",
        body: "Orly (« nous ») s'engage à protéger vos données personnelles. Cette politique explique quelles données nous collectons, pourquoi, et comment vous pouvez exercer vos droits. Elle s'applique au site orly.app et à l'application Orly.",
      },
      {
        title: "Données collectées",
        body: "Lors de votre inscription à la liste d'attente, nous collectons votre adresse email, votre prénom et votre nom. Dans l'application, nous pouvons collecter votre position géographique (avec votre accord), les lieux que vous ajoutez ou évaluez, ainsi que des données techniques anonymes (type d'appareil, version de l'OS) à des fins de diagnostic.",
      },
      {
        title: "Utilisation des données",
        body: "Vos données sont utilisées pour vous contacter lors du lancement de l'application, améliorer nos services, et personnaliser votre expérience locale. Nous ne vendons ni ne partageons vos données personnelles avec des tiers à des fins commerciales.",
      },
      {
        title: "Conservation des données",
        body: "Vos données de liste d'attente sont conservées jusqu'au lancement de l'application, puis converties en compte utilisateur si vous confirmez votre inscription. Vous pouvez demander leur suppression à tout moment en nous contactant.",
      },
      {
        title: "Vos droits",
        body: "Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, de suppression et de portabilité de vos données. Vous pouvez également vous opposer à leur traitement ou en limiter l'usage. Pour exercer ces droits, contactez-nous à support@orly.app.",
      },
      {
        title: "Contact",
        body: "Pour toute question relative à cette politique ou à vos données personnelles, écrivez-nous à support@orly.app. Nous répondons dans les 72 heures ouvrées.",
      },
    ],
  },
  en: {
    back: "← Back",
    pageTitle: "Privacy Policy",
    pageSub: "Last updated: February 25, 2026",
    sections: [
      {
        title: "Introduction",
        body: "Orly (\u201cwe\u201d) is committed to protecting your personal data. This policy explains what data we collect, why we collect it, and how you can exercise your rights. It applies to orly.app and the Orly app.",
      },
      {
        title: "Data we collect",
        body: "When you join our waitlist, we collect your email address, first name, and last name. In the app, we may collect your location (with your permission), the places you add or review, and anonymous technical data (device type, OS version) for diagnostic purposes.",
      },
      {
        title: "How we use your data",
        body: "Your data is used to notify you at launch, improve our services, and personalize your local experience. We do not sell or share your personal data with third parties for commercial purposes.",
      },
      {
        title: "Data retention",
        body: "Your waitlist data is kept until the app launches, then converted into a user account if you confirm your registration. You can request deletion at any time by contacting us.",
      },
      {
        title: "Your rights",
        body: "Under GDPR, you have the right to access, correct, delete, and export your data. You may also object to or restrict its processing. To exercise these rights, contact us at support@orly.app.",
      },
      {
        title: "Contact",
        body: "For any questions about this policy or your personal data, email us at support@orly.app. We respond within 72 business hours.",
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

export default function PrivacyPage() {
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
