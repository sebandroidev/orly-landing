import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { InstagramIcon, Linkedin01Icon } from "@hugeicons/core-free-icons";

const INSTAGRAM_URL = process.env.NEXT_PUBLIC_INSTAGRAM_URL;
const LINKEDIN_URL = process.env.NEXT_PUBLIC_LINKEDIN_URL;

const socials = [
  { url: INSTAGRAM_URL, label: "Instagram", icon: InstagramIcon },
  { url: LINKEDIN_URL, label: "LinkedIn", icon: Linkedin01Icon },
].filter((s): s is { url: string; label: string; icon: typeof InstagramIcon } =>
  Boolean(s.url)
);

export default function Footer() {
  return (
    <div className="absolute bottom-5 left-0 right-0 flex items-center justify-center gap-4">
      {socials.map(({ url, label, icon }) => (
        <a
          key={label}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="transition-opacity duration-150 hover:opacity-70"
          style={{ color: "var(--fg-dim)" }}
        >
          <HugeiconsIcon icon={icon} size={16} strokeWidth={1.5} color="currentColor" />
        </a>
      ))}

      {socials.length > 0 && (
        <span style={{ color: "var(--border-subtle)" }}>·</span>
      )}

      <Link
        href="/faq"
        className="text-xs transition-opacity duration-150 hover:opacity-70"
        style={{ color: "var(--fg-dim)" }}
      >
        FAQ
      </Link>

      <span style={{ color: "var(--border-subtle)" }}>·</span>

      <Link
        href="/privacy"
        className="text-xs transition-opacity duration-150 hover:opacity-70"
        style={{ color: "var(--fg-dim)" }}
      >
        Privacy
      </Link>

      <span style={{ color: "var(--border-subtle)" }}>·</span>

      <Link
        href="/tos"
        className="text-xs transition-opacity duration-150 hover:opacity-70"
        style={{ color: "var(--fg-dim)" }}
      >
        Terms
      </Link>

      <span style={{ color: "var(--border-subtle)" }}>·</span>

      <span className="text-xs" style={{ color: "var(--fg-dim)" }}>
        © {new Date().getFullYear()} Orly
      </span>
    </div>
  );
}
