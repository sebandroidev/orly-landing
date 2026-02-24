"use client";

import { motion, AnimatePresence } from "framer-motion";

export type Theme = "dark" | "light";

interface Props {
  theme: Theme;
  onToggle: (t: Theme) => void;
  isDark: boolean;
}

function SunIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="4.5" fill="currentColor" />
      <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <line x1="12" y1="2" x2="12" y2="4.5" />
        <line x1="12" y1="19.5" x2="12" y2="22" />
        <line x1="4.22" y1="4.22" x2="5.98" y2="5.98" />
        <line x1="18.02" y1="18.02" x2="19.78" y2="19.78" />
        <line x1="2" y1="12" x2="4.5" y2="12" />
        <line x1="19.5" y1="12" x2="22" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.98" y2="18.02" />
        <line x1="18.02" y1="5.98" x2="19.78" y2="4.22" />
      </g>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export default function ThemeToggle({ theme, onToggle, isDark }: Props) {
  return (
    <motion.button
      onClick={() => onToggle(isDark ? "light" : "dark")}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.93 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`relative flex h-[30px] w-[30px] items-center justify-center rounded-full border transition-colors duration-300 ${
        isDark
          ? "border-white/10 bg-white/5 text-white/60 hover:text-white/90"
          : "border-black/10 bg-black/5 text-black/50 hover:text-black/80"
      }`}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={theme}
          initial={{ opacity: 0, rotate: isDark ? -60 : 60, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: isDark ? 60 : -60, scale: 0.6 }}
          transition={{
            duration: 0.28,
            ease: [0.34, 1.56, 0.64, 1],
          }}
          className="flex items-center justify-center"
        >
          {isDark ? <MoonIcon /> : <SunIcon />}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
