"use client";

import { useAppPreferences } from "../hooks/useAppPreferences";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import StatsSection from "./StatsSection";
import BentoSection from "./BentoSection";
import FeaturesSection from "./FeaturesSection";
import TestimonialsSection from "./TestimonialsSection";
import MerchantsSection from "./MerchantsSection";
import DownloadSection from "./DownloadSection";
import SiteFooter from "./SiteFooter";

export default function WebsitePage() {
  const { lang, setLang, theme, setTheme, isDark } = useAppPreferences("en");

  return (
    <>
      <Navbar lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} isDark={isDark} />
      <HeroSection lang={lang} isDark={isDark} />
      <StatsSection lang={lang} />
      <BentoSection lang={lang} isDark={isDark} />
      <FeaturesSection lang={lang} isDark={isDark} />
      <TestimonialsSection lang={lang} isDark={isDark} />
      <MerchantsSection lang={lang} isDark={isDark} />
      <DownloadSection lang={lang} isDark={isDark} />
      <SiteFooter lang={lang} />
    </>
  );
}
