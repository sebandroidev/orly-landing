import type { Metadata } from "next";
import FaqPage from "../components/FaqPage";

export const metadata: Metadata = {
  title: { absolute: "FAQ | Orly" },
  description:
    "Everything you need to know about Orly — the community platform for discovering local services around you.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "FAQ | Orly",
    description:
      "Everything you need to know about Orly — the community platform for discovering local services around you.",
    url: "/faq",
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ | Orly",
    description:
      "Everything you need to know about Orly — the community platform for discovering local services around you.",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How does Orly work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Orly is a community platform that lets you discover and share local services around you: restaurants, artisans, salons, shops and more. Places are added and reviewed by the community, providing reliable, ground-level information.",
      },
    },
    {
      "@type": "Question",
      name: "Is the app free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, Orly is completely free for users. You can search, browse and review services at no cost and with no mandatory registration.",
      },
    },
    {
      "@type": "Question",
      name: "How do I find a service near me?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Open the app, enable location and browse suggestions around you. You can filter by category (food, beauty, repair…), budget or distance, and read reviews from other users.",
      },
    },
    {
      "@type": "Question",
      name: "Can I add a place that's not listed yet?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. Every user can contribute by adding a new place: name, address, category, photos. This community-driven approach is what makes Orly powerful — mapping services that global platforms overlook.",
      },
    },
    {
      "@type": "Question",
      name: "How are reviews moderated?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Reviews go through both automated checks and community flagging. Any inappropriate content can be reported by users and will be reviewed by our team as quickly as possible.",
      },
    },
    {
      "@type": "Question",
      name: "How do I list my business on Orly?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Your business may already appear on Orly thanks to community contributions. To take control of it, create a merchant account and claim your listing in just a few minutes — no technical skills required.",
      },
    },
    {
      "@type": "Question",
      name: "What does the free listing include?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The free listing includes your name, category, address, opening hours, photos and customer review management. It's enough to start receiving visitors and improving your local visibility from day one.",
      },
    },
    {
      "@type": "Question",
      name: "What does the paid subscription offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The business subscription lets you appear at the top of search results, access detailed visitor analytics, benefit from sponsored placement in your area, and use tools to actively manage your online reputation.",
      },
    },
    {
      "@type": "Question",
      name: "How do I manage my merchant profile?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "From your dashboard, you can update your information at any time, add or remove photos, reply publicly to customer reviews, and track your visibility stats in real time.",
      },
    },
    {
      "@type": "Question",
      name: "How do I contact Orly support?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our team is available by email at support@orly.app. We typically respond within 24 business hours. Business subscribers have access to priority support.",
      },
    },
  ],
};

export default function FaqRoute() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <FaqPage />
    </>
  );
}
