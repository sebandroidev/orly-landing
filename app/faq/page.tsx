import type { Metadata } from "next";
import FaqPage from "../components/FaqPage";

export const metadata: Metadata = {
  title: "FAQ — Orly",
  description:
    "Everything you need to know about Orly — the community platform for discovering local services around you.",
};

export default function FaqRoute() {
  return <FaqPage />;
}
