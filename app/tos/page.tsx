import type { Metadata } from "next";
import TosPage from "../components/TosPage";

export const metadata: Metadata = {
  title: { absolute: "Terms of Service | Orly" },
  description:
    "Read Orly\u2019s Terms of Service — the rules and guidelines for using the Orly platform.",
  alternates: { canonical: "/tos" },
  openGraph: {
    title: "Terms of Service | Orly",
    description: "Read Orly\u2019s Terms of Service — the rules and guidelines for using the Orly platform.",
    url: "/tos",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service | Orly",
    description: "Read Orly\u2019s Terms of Service — the rules and guidelines for using the Orly platform.",
  },
};

export default function TosRoute() {
  return <TosPage />;
}
