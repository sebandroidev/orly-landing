"use client";

import Link from "next/link";
import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import { InstagramIcon, Linkedin01Icon } from "@hugeicons/core-free-icons";
import { type Lang } from "./LanguageToggle";

const INSTAGRAM_URL = process.env.NEXT_PUBLIC_INSTAGRAM_URL;
const LINKEDIN_URL = process.env.NEXT_PUBLIC_LINKEDIN_URL;

const socials = [
  { url: INSTAGRAM_URL, label: "Instagram", icon: InstagramIcon },
  { url: LINKEDIN_URL, label: "LinkedIn", icon: Linkedin01Icon },
].filter(
  (s): s is { url: string; label: string; icon: typeof InstagramIcon } => Boolean(s.url)
);

const copy = {
  en: {
    tagline: "Your city, explored together.",
    product: "Product",
    features: "Features",
    merchants: "For Businesses",
    faq: "FAQ",
    legal: "Legal",
    privacy: "Privacy Policy",
    tos: "Terms of Service",
    contact: "Contact",
  },
  fr: {
    tagline: "Votre ville, explorée ensemble.",
    product: "Produit",
    features: "Fonctionnalités",
    merchants: "Pour les commerçants",
    faq: "FAQ",
    legal: "Légal",
    privacy: "Confidentialité",
    tos: "Conditions d'utilisation",
    contact: "Contact",
  },
};

export default function SiteFooter({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t px-5 py-14 md:py-20"
      style={{ borderColor: "var(--border-subtle)" }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-12">
          {/* Brand col */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-5">
            <Image
              src="/logo-orly.svg"
              alt="Orly"
              width={80}
              height={42}
              className="h-9 w-auto"
            />
            <p className="text-sm leading-relaxed max-w-[200px]" style={{ color: "var(--fg-dim)" }}>
              {t.tagline}
            </p>
            {socials.length > 0 && (
              <div className="flex items-center gap-3">
                {socials.map(({ url, label, icon }) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="transition-opacity hover:opacity-70"
                    style={{ color: "var(--fg-dim)" }}
                  >
                    <HugeiconsIcon icon={icon} size={16} strokeWidth={1.5} color="currentColor" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Product links */}
          <div className="flex flex-col gap-3">
            <p
              className="text-xs font-semibold tracking-wider uppercase mb-1"
              style={{ color: "var(--fg-dim)", opacity: 0.5 }}
            >
              {t.product}
            </p>
            {[
              { label: t.features, href: "#features" },
              { label: t.merchants, href: "#merchants" },
              { label: t.faq, href: "/faq" },
            ].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="text-sm transition-opacity hover:opacity-80"
                style={{ color: "var(--fg-dim)" }}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Legal links */}
          <div className="flex flex-col gap-3">
            <p
              className="text-xs font-semibold tracking-wider uppercase mb-1"
              style={{ color: "var(--fg-dim)", opacity: 0.5 }}
            >
              {t.legal}
            </p>
            {[
              { label: t.privacy, href: "/privacy" },
              { label: t.tos, href: "/tos" },
              { label: t.contact, href: "/contact" },
            ].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="text-sm transition-opacity hover:opacity-80"
                style={{ color: "var(--fg-dim)" }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-6 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
          style={{ borderColor: "var(--border-subtle)" }}
        >
          <p className="text-xs" style={{ color: "var(--fg-dim)", opacity: 0.6 }}>
            © {year} Orly. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: "var(--fg-dim)", opacity: 0.4 }}>
            Made with care for local communities.
          </p>
        </div>
      </div>
    </footer>
  );
}
