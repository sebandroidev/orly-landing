"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import {
  Search01Icon,
  MapsIcon,
  StarIcon,
  LocationAddIcon,
  Bookmark01Icon,
} from "@hugeicons/core-free-icons";
import { type Lang } from "./LanguageToggle";
import PhoneMockup from "./PhoneMockup";

const copy = {
  en: {
    eyebrow: "The App",
    headline: "Everything local,\nin one place.",
    cells: [
      {
        title: "Find anything near you",
        desc: "Search thousands of local services by category, distance, or keyword.",
      },
      {
        title: "Explore the map",
        desc: "Every local spot pinned on an interactive map.",
      },
      {
        title: "Trusted reviews",
        desc: "Real people, real experiences.",
      },
      {
        title: "Add a place",
        desc: "Be the first to add a spot your community will love.",
      },
      {
        title: "Save your spots",
        desc: "Build your personal guide to the city.",
      },
    ],
  },
  fr: {
    eyebrow: "L'Application",
    headline: "Tout le local,\nau même endroit.",
    cells: [
      {
        title: "Trouvez tout autour de vous",
        desc: "Cherchez parmi des milliers de services locaux par catégorie, distance ou mot-clé.",
      },
      {
        title: "Explorez la carte",
        desc: "Chaque adresse locale sur une carte interactive.",
      },
      {
        title: "Avis de confiance",
        desc: "De vraies personnes, de vraies expériences.",
      },
      {
        title: "Ajoutez un lieu",
        desc: "Soyez le premier à ajouter un lieu que votre communauté adorera.",
      },
      {
        title: "Sauvegardez vos spots",
        desc: "Construisez votre guide personnel de la ville.",
      },
    ],
  },
};

const icons = [Search01Icon, MapsIcon, StarIcon, LocationAddIcon, Bookmark01Icon];

interface BentoProps {
  lang: Lang;
  isDark: boolean;
}

export default function BentoSection({ lang, isDark }: BentoProps) {
  const t = copy[lang];
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const cellBase =
    "rounded-2xl border overflow-hidden flex flex-col gap-0 transition-shadow duration-300";
  const cellStyle = {
    backgroundColor: "var(--surface)",
    borderColor: "var(--border-subtle)",
  };

  return (
    <section id="features" ref={ref} className="py-24 md:py-32 px-5">
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

        {/* Bento grid
            Layout (3-col):
            [Search col-span-2 row-span-2]  [Map       ]
            [Search col-span-2 row-span-2]  [Reviews   ]
            [Add Place col-span-2         ]  [Favorites ]
        */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:grid-rows-[minmax(200px,auto)_minmax(200px,auto)_minmax(200px,auto)]">

          {/* Cell 0 — Search (large, col-span-2, row-span-2) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -4 }}
            className={`${cellBase} md:col-span-2 md:row-span-2 min-h-[360px] md:min-h-0`}
            style={cellStyle}
          >
            <div className="p-6 flex flex-col gap-2">
              <IconBadge icon={icons[0]} isDark={isDark} />
              <h3
                className="text-xl font-black mt-1"
                style={{ fontFamily: "var(--font-bricolage)", color: "var(--foreground)" }}
              >
                {t.cells[0].title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--fg-dim)" }}>
                {t.cells[0].desc}
              </p>
            </div>
            {/* Phone mockup clipped at bottom */}
            <div className="flex-1 flex items-end justify-center pt-4 overflow-hidden">
              <div style={{ marginBottom: -60 }}>
                <PhoneMockup width={200} height={360} />
              </div>
            </div>
          </motion.div>

          {/* Cell 1 — Map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.18, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -4 }}
            className={`${cellBase} p-6 min-h-[200px]`}
            style={cellStyle}
          >
            <IconBadge icon={icons[1]} isDark={isDark} />
            <h3
              className="text-base font-black mt-3"
              style={{ fontFamily: "var(--font-bricolage)", color: "var(--foreground)" }}
            >
              {t.cells[1].title}
            </h3>
            <p className="text-sm mt-1 leading-relaxed" style={{ color: "var(--fg-dim)" }}>
              {t.cells[1].desc}
            </p>
            {/* Map dots illustration */}
            <div className="flex-1 flex items-end justify-end mt-4 opacity-20">
              <MapDots />
            </div>
          </motion.div>

          {/* Cell 2 — Reviews */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.24, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -4 }}
            className={`${cellBase} p-6 min-h-[200px]`}
            style={cellStyle}
          >
            <IconBadge icon={icons[2]} isDark={isDark} />
            <h3
              className="text-base font-black mt-3"
              style={{ fontFamily: "var(--font-bricolage)", color: "var(--foreground)" }}
            >
              {t.cells[2].title}
            </h3>
            <p className="text-sm mt-1 leading-relaxed" style={{ color: "var(--fg-dim)" }}>
              {t.cells[2].desc}
            </p>
            {/* Star row */}
            <div className="flex gap-1 mt-4 opacity-30">
              {[1, 2, 3, 4, 5].map((i) => (
                <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
          </motion.div>

          {/* Cell 3 — Add Place (col-span-2) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -4 }}
            className={`${cellBase} p-6 md:col-span-2 min-h-[200px] flex-row md:flex-col`}
            style={cellStyle}
          >
            <IconBadge icon={icons[3]} isDark={isDark} />
            <h3
              className="text-base font-black mt-3"
              style={{ fontFamily: "var(--font-bricolage)", color: "var(--foreground)" }}
            >
              {t.cells[3].title}
            </h3>
            <p className="text-sm mt-1 leading-relaxed" style={{ color: "var(--fg-dim)" }}>
              {t.cells[3].desc}
            </p>
          </motion.div>

          {/* Cell 4 — Favorites */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.36, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -4 }}
            className={`${cellBase} p-6 min-h-[200px]`}
            style={cellStyle}
          >
            <IconBadge icon={icons[4]} isDark={isDark} />
            <h3
              className="text-base font-black mt-3"
              style={{ fontFamily: "var(--font-bricolage)", color: "var(--foreground)" }}
            >
              {t.cells[4].title}
            </h3>
            <p className="text-sm mt-1 leading-relaxed" style={{ color: "var(--fg-dim)" }}>
              {t.cells[4].desc}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function IconBadge({
  icon,
  isDark,
}: {
  icon: IconSvgElement;
  isDark: boolean;
}) {
  return (
    <div
      className="inline-flex items-center justify-center w-10 h-10 rounded-xl"
      style={{
        backgroundColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
      }}
    >
      <HugeiconsIcon
        icon={icon}
        size={18}
        strokeWidth={1.5}
        color="currentColor"
        style={{ color: "var(--foreground)" }}
      />
    </div>
  );
}

function MapDots() {
  const dots = [
    [0, 0], [1, 0], [2, 0], [3, 0],
    [0, 1], [1, 1], [2, 1], [3, 1],
    [0, 2], [1, 2], [2, 2], [3, 2],
    [0, 3], [1, 3], [2, 3], [3, 3],
  ];
  return (
    <div className="relative" style={{ width: 64, height: 64 }}>
      {dots.map(([x, y]) => (
        <div
          key={`${x}-${y}`}
          className="absolute rounded-full"
          style={{
            width: 4,
            height: 4,
            left: x * 16 + 2,
            top: y * 16 + 2,
            backgroundColor: "currentColor",
          }}
        />
      ))}
      {/* Pin */}
      <div
        className="absolute"
        style={{ left: 30, top: 18, color: "currentColor" }}
      >
        <svg width="10" height="14" viewBox="0 0 10 14" fill="currentColor" aria-hidden>
          <path d="M5 0C2.24 0 0 2.24 0 5c0 3.75 5 9 5 9s5-5.25 5-9c0-2.76-2.24-5-5-5zm0 6.5A1.5 1.5 0 113.5 5 1.5 1.5 0 015 6.5z" />
        </svg>
      </div>
    </div>
  );
}
