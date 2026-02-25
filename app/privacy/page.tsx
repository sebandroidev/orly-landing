import type { Metadata } from "next";
import PrivacyPage from "../components/PrivacyPage";

export const metadata: Metadata = {
  title: { absolute: "Privacy Policy | Orly" },
  description:
    "Learn how Orly collects, uses, and protects your personal data.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy Policy | Orly",
    description: "Learn how Orly collects, uses, and protects your personal data.",
    url: "/privacy",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Orly",
    description: "Learn how Orly collects, uses, and protects your personal data.",
  },
};

export default function PrivacyRoute() {
  return <PrivacyPage />;
}
