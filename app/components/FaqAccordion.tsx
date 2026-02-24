"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface FaqItem {
  q: string;
  a: string;
}

interface Props {
  title: string;
  items: FaqItem[];
  sectionId: string;
}

function ChevronIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function FaqAccordion({ title, items, sectionId }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div className="w-full">
      <p
        className="mb-4 text-xs font-semibold uppercase tracking-widest"
        style={{ color: "var(--fg-dim)" }}
      >
        {title}
      </p>

      <div
        className="overflow-hidden rounded-2xl border"
        style={{ borderColor: "var(--border-subtle)" }}
      >
        {items.map((item, i) => {
          const isOpen = openIndex === i;
          const answerId = `${sectionId}-answer-${i}`;

          return (
            <div
              key={i}
              style={{
                borderBottom:
                  i < items.length - 1
                    ? "1px solid var(--border-subtle)"
                    : undefined,
              }}
            >
              <button
                onClick={() => toggle(i)}
                aria-expanded={isOpen}
                aria-controls={answerId}
                className={`flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors duration-150 ${
                  isOpen ? "bg-[var(--surface)]" : "hover:bg-[var(--surface)]"
                }`}
              >
                <span
                  className="text-sm font-semibold leading-snug"
                  style={{ color: "var(--foreground)" }}
                >
                  {item.q}
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="shrink-0"
                  style={{ color: "var(--fg-dim)" }}
                >
                  <ChevronIcon />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={answerId}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                    style={{ overflow: "hidden" }}
                  >
                    <p
                      className="border-l-2 px-5 pb-5 pt-1 text-sm leading-relaxed"
                      style={{
                        color: "var(--fg-dim)",
                        borderLeftColor: "var(--foreground)",
                      }}
                    >
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
