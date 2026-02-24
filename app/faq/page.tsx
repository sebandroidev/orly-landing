import type { Metadata } from "next";
import FaqPage from "../components/FaqPage";

export const metadata: Metadata = {
  title: "FAQ — Orly",
  description:
    "Tout ce que vous devez savoir sur Orly, la plateforme communautaire de découverte des services locaux.",
};

export default function FaqRoute() {
  return <FaqPage />;
}
