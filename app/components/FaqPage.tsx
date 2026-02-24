"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import LanguageToggle, { type Lang } from "./LanguageToggle";
import ThemeToggle, { type Theme } from "./ThemeToggle";
import FaqAccordion from "./FaqAccordion";

const copy = {
  fr: {
    back: "← Retour",
    pageTitle: "Questions fréquentes",
    pageSub: "Tout ce que vous devez savoir sur Orly.",
    sections: {
      users: {
        title: "Pour les utilisateurs",
        items: [
          {
            q: "Comment fonctionne Orly ?",
            a: "Orly est une plateforme communautaire qui vous permet de découvrir et partager des services locaux autour de vous : restaurants, artisans, salons, boutiques et bien plus. Les lieux sont ajoutés et évalués par la communauté, pour une information fiable et ancrée dans la réalité du terrain.",
          },
          {
            q: "L'application est-elle gratuite ?",
            a: "Oui, Orly est entièrement gratuit pour les utilisateurs. Vous pouvez rechercher, consulter et évaluer des services sans aucun frais ni inscription obligatoire.",
          },
          {
            q: "Comment trouver un service près de moi ?",
            a: "Ouvrez l'application, activez la géolocalisation et parcourez les suggestions autour de vous. Vous pouvez filtrer par catégorie (alimentation, beauté, réparation…), par budget ou par distance, et consulter les avis d'autres utilisateurs.",
          },
          {
            q: "Puis-je ajouter un lieu qui n'est pas encore répertorié ?",
            a: "Absolument. Chaque utilisateur peut contribuer en ajoutant un nouveau lieu : nom, adresse, catégorie, photos. C'est cette logique communautaire qui fait la force d'Orly et permet de cartographier des services que les plateformes mondiales ignorent.",
          },
          {
            q: "Comment les avis sont-ils modérés ?",
            a: "Les avis sont soumis à un processus de modération combinant vérification automatique et signalement communautaire. Tout contenu inapproprié peut être signalé par les utilisateurs et sera examiné par notre équipe dans les meilleurs délais.",
          },
        ],
      },
      merchants: {
        title: "Pour les commerçants",
        items: [
          {
            q: "Comment référencer mon établissement sur Orly ?",
            a: "Votre établissement est peut-être déjà visible sur Orly grâce aux contributions de la communauté. Pour en prendre le contrôle, créez un compte commerçant et réclamez votre fiche en quelques minutes, sans compétences techniques requises.",
          },
          {
            q: "Que comprend le référencement gratuit ?",
            a: "La fiche gratuite inclut votre nom, catégorie, adresse, horaires d'ouverture, photos et la gestion des avis clients. C'est suffisant pour commencer à recevoir des visiteurs et améliorer votre visibilité locale dès le lancement.",
          },
          {
            q: "Quels avantages offre l'abonnement payant ?",
            a: "L'abonnement business vous permet d'apparaître en tête des résultats de recherche, d'accéder à des statistiques détaillées sur vos visiteurs, de bénéficier d'une mise en avant sponsorisée dans votre zone et d'outils pour gérer votre réputation en ligne.",
          },
          {
            q: "Comment gérer mon profil commerçant ?",
            a: "Depuis votre tableau de bord, vous pouvez mettre à jour vos informations à tout moment, ajouter ou retirer des photos, répondre publiquement aux avis clients et suivre vos statistiques de visibilité en temps réel.",
          },
          {
            q: "Comment contacter le support Orly ?",
            a: "Notre équipe est disponible par email à support@orly.app. Nous répondons généralement dans les 24 heures ouvrées. Pour les abonnés business, un support prioritaire est disponible.",
          },
        ],
      },
    },
    footer: "© 2026 Orly",
  },
  en: {
    back: "← Back",
    pageTitle: "Frequently asked questions",
    pageSub: "Everything you need to know about Orly.",
    sections: {
      users: {
        title: "For users",
        items: [
          {
            q: "How does Orly work?",
            a: "Orly is a community platform that lets you discover and share local services around you: restaurants, artisans, salons, shops and more. Places are added and reviewed by the community, providing reliable, ground-level information.",
          },
          {
            q: "Is the app free?",
            a: "Yes, Orly is completely free for users. You can search, browse and review services at no cost and with no mandatory registration.",
          },
          {
            q: "How do I find a service near me?",
            a: "Open the app, enable location and browse suggestions around you. You can filter by category (food, beauty, repair…), budget or distance, and read reviews from other users.",
          },
          {
            q: "Can I add a place that's not listed yet?",
            a: "Absolutely. Every user can contribute by adding a new place: name, address, category, photos. This community-driven approach is what makes Orly powerful — mapping services that global platforms overlook.",
          },
          {
            q: "How are reviews moderated?",
            a: "Reviews go through both automated checks and community flagging. Any inappropriate content can be reported by users and will be reviewed by our team as quickly as possible.",
          },
        ],
      },
      merchants: {
        title: "For merchants",
        items: [
          {
            q: "How do I list my business on Orly?",
            a: "Your business may already appear on Orly thanks to community contributions. To take control of it, create a merchant account and claim your listing in just a few minutes — no technical skills required.",
          },
          {
            q: "What does the free listing include?",
            a: "The free listing includes your name, category, address, opening hours, photos and customer review management. It's enough to start receiving visitors and improving your local visibility from day one.",
          },
          {
            q: "What does the paid subscription offer?",
            a: "The business subscription lets you appear at the top of search results, access detailed visitor analytics, benefit from sponsored placement in your area, and use tools to actively manage your online reputation.",
          },
          {
            q: "How do I manage my merchant profile?",
            a: "From your dashboard, you can update your information at any time, add or remove photos, reply publicly to customer reviews, and track your visibility stats in real time.",
          },
          {
            q: "How do I contact Orly support?",
            a: "Our team is available by email at support@orly.app. We typically respond within 24 business hours. Business subscribers have access to priority support.",
          },
        ],
      },
    },
    footer: "© 2026 Orly",
  },
};

// Stagger container
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

export default function FaqPage() {
  const [lang, setLang] = useState<Lang>("fr");
  const [theme, setTheme] = useState<Theme>("dark");
  const isDark = theme === "dark";
  const t = copy[lang];

  useEffect(() => {
    const saved = localStorage.getItem("orly-theme") as Theme | null;
    if (saved === "light") setTheme("light");
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("light", !isDark);
    localStorage.setItem("orly-theme", theme);
  }, [isDark, theme]);

  return (
    <div className="relative min-h-screen">
        {/* Subtle radial glow */}
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

            {/* Users section */}
            <motion.div variants={itemVariants}>
              <FaqAccordion
                title={t.sections.users.title}
                items={t.sections.users.items}
                sectionId="users"
              />
            </motion.div>

            {/* Merchants section */}
            <motion.div variants={itemVariants}>
              <FaqAccordion
                title={t.sections.merchants.title}
                items={t.sections.merchants.items}
                sectionId="merchants"
              />
            </motion.div>

            {/* Footer */}
            <motion.div variants={itemVariants}>
              <p className="text-xs" style={{ color: "var(--fg-dim)" }}>
                {t.footer}
              </p>
            </motion.div>
          </motion.div>
        </main>
    </div>
  );
}
