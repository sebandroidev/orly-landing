"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { EarthIcon, ArrowDown01Icon, Tick01Icon } from "@hugeicons/core-free-icons";

export type Lang = "fr" | "en";

const labels: Record<Lang, string> = {
  en: "English",
  fr: "Français",
};

const langs: Lang[] = ["en", "fr"];

interface Props {
  lang: Lang;
  onToggle: (lang: Lang) => void;
  isDark: boolean;
}

export default function LanguageToggle({ lang, onToggle, isDark }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function select(l: Lang) {
    onToggle(l);
    setOpen(false);
  }

  const border = isDark ? "border-white/10" : "border-black/10";
  const surface = isDark ? "bg-[#1a1a1a]" : "bg-white";

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors duration-200 ${
          isDark
            ? "border-white/10 bg-white/5 text-white/60 hover:border-white/20 hover:bg-white/10 hover:text-white/90"
            : "border-black/10 bg-black/5 text-black/50 hover:border-black/20 hover:bg-black/10 hover:text-black/80"
        }`}
      >
        <HugeiconsIcon icon={EarthIcon} size={13} strokeWidth={1.8} color="currentColor" />
        <span>{labels[lang]}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="flex items-center"
        >
          <HugeiconsIcon icon={ArrowDown01Icon} size={11} strokeWidth={2} color="currentColor" />
        </motion.span>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={`absolute right-0 mt-1.5 min-w-[120px] overflow-hidden rounded-xl border shadow-lg ${border} ${surface}`}
          >
            {langs.map((l) => (
              <li key={l}>
                <button
                  role="option"
                  aria-selected={lang === l}
                  onClick={() => select(l)}
                  className={`flex w-full items-center justify-between gap-3 px-3 py-2 text-xs font-medium transition-colors duration-150 ${
                    isDark
                      ? "text-white/70 hover:bg-white/8 hover:text-white"
                      : "text-black/60 hover:bg-black/5 hover:text-black"
                  }`}
                >
                  {labels[l]}
                  {lang === l && (
                    <HugeiconsIcon
                      icon={Tick01Icon}
                      size={11}
                      strokeWidth={2.5}
                      color="currentColor"
                    />
                  )}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
