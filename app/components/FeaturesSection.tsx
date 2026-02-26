"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { type Lang } from "./LanguageToggle";
import PhoneMockup from "./PhoneMockup";

const copy = {
  en: {
    eyebrow: "Features",
    headline: "Built for how people\nactually discover places.",
    features: [
      {
        eyebrow: "Smart Search",
        title: "Find exactly what you're looking for.",
        body: "Filter by category, distance, budget, and rating. Whether you need a barber, a restaurant, or a repair shop — Orly finds it in seconds.",
      },
      {
        eyebrow: "Community",
        title: "Recommendations from people you trust.",
        body: "Orly's reviews come from your neighbors, not anonymous strangers. See what people in your area are actually saying about local businesses.",
      },
      {
        eyebrow: "Contribute",
        title: "You are the map.",
        body: "Add businesses, update information, share photos. Every contribution makes Orly more useful for everyone in your city.",
      },
    ],
  },
  fr: {
    eyebrow: "Fonctionnalités",
    headline: "Conçu pour la vraie façon\nde découvrir des lieux.",
    features: [
      {
        eyebrow: "Recherche intelligente",
        title: "Trouvez exactement ce que vous cherchez.",
        body: "Filtrez par catégorie, distance, budget et note. Que vous cherchiez un coiffeur, un restaurant ou un réparateur — Orly le trouve en quelques secondes.",
      },
      {
        eyebrow: "Communauté",
        title: "Des recommandations de personnes de confiance.",
        body: "Les avis sur Orly viennent de vos voisins, pas d'inconnus anonymes. Voyez ce que les gens de votre quartier disent vraiment des commerces locaux.",
      },
      {
        eyebrow: "Contribuez",
        title: "Vous êtes la carte.",
        body: "Ajoutez des commerces, mettez à jour les informations, partagez des photos. Chaque contribution rend Orly plus utile pour toute votre ville.",
      },
    ],
  },
};

interface FeaturesProps {
  lang: Lang;
  isDark: boolean;
}

export default function FeaturesSection({ lang }: FeaturesProps) {
  const t = copy[lang];
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section className="py-24 md:py-32 px-5">
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 md:mb-20"
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

        {/* Feature rows */}
        <div className="flex flex-col gap-16 md:gap-24">
          {t.features.map((feature, i) => (
            <FeatureRow key={i} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureRow({
  feature,
  index,
}: {
  feature: { eyebrow: string; title: string; body: string };
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`flex flex-col gap-12 md:gap-16 md:items-center ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      {/* Text block */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -24 : 24 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="flex-1 min-w-0"
      >
        <p
          className="text-xs tracking-widest uppercase mb-4"
          style={{ color: "var(--fg-dim)" }}
        >
          {feature.eyebrow}
        </p>
        <h3
          className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-tight mb-5"
          style={{ fontFamily: "var(--font-bricolage)", color: "var(--foreground)" }}
        >
          {feature.title}
        </h3>
        <p
          className="text-base md:text-lg leading-relaxed"
          style={{ color: "var(--fg-dim)" }}
        >
          {feature.body}
        </p>
      </motion.div>

      {/* Phone mockup */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? 24 : -24 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
        className="flex-shrink-0 flex justify-center"
        whileHover={{ y: -6, rotate: isEven ? 1 : -1 }}
      >
        <PhoneMockup width={220} height={440} />
      </motion.div>
    </div>
  );
}
