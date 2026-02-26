"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { type Lang } from "./LanguageToggle";

const copy = {
  en: {
    stats: [
      { value: 5000, suffix: "+", label: "Active users" },
      { value: 1200, suffix: "+", label: "Places listed" },
      { value: 12, suffix: "", label: "Service categories" },
      { value: 4.8, suffix: "★", label: "Average rating", decimal: true },
    ],
  },
  fr: {
    stats: [
      { value: 5000, suffix: "+", label: "Utilisateurs actifs" },
      { value: 1200, suffix: "+", label: "Lieux référencés" },
      { value: 12, suffix: "", label: "Catégories de services" },
      { value: 4.8, suffix: "★", label: "Note moyenne", decimal: true },
    ],
  },
};

interface StatsProps {
  lang: Lang;
}

export default function StatsSection({ lang }: StatsProps) {
  const t = copy[lang];
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-16 px-5">
      <div
        className="mx-auto max-w-6xl rounded-2xl border px-8 py-10"
        style={{
          backgroundColor: "var(--surface)",
          borderColor: "var(--border-subtle)",
        }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {t.stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center text-center gap-1"
            >
              <div
                className="text-4xl md:text-5xl font-black tracking-tight"
                style={{ fontFamily: "var(--font-bricolage)", color: "var(--foreground)" }}
              >
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  decimal={"decimal" in stat ? stat.decimal : false}
                  inView={inView}
                  delay={i * 80}
                />
              </div>
              <p className="text-sm font-medium" style={{ color: "var(--fg-dim)" }}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AnimatedCounter({
  value,
  suffix,
  decimal,
  inView,
  delay,
}: {
  value: number;
  suffix: string;
  decimal?: boolean;
  inView: boolean;
  delay: number;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const timeout = setTimeout(() => {
      const duration = 1400;
      const fps = 60;
      const frames = (duration / 1000) * fps;
      const increment = value / frames;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(decimal ? Math.round(current * 10) / 10 : Math.floor(current));
        }
      }, 1000 / fps);

      return () => clearInterval(timer);
    }, delay);

    return () => clearTimeout(timeout);
  }, [inView, value, delay, decimal]);

  const display = decimal ? count.toFixed(1) : count.toLocaleString();
  return <>{display}{suffix}</>;
}
