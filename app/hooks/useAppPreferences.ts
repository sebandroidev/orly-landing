"use client";

import { useState, useEffect } from "react";
import { type Lang } from "../components/LanguageToggle";
import { type Theme } from "../components/ThemeToggle";

export function useAppPreferences(defaultLang: Lang = "en") {
  const [lang, setLang] = useState<Lang>(defaultLang);
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("orly-theme") as Theme | null;
    if (savedTheme === "light") setTheme("light");
    const savedLang = localStorage.getItem("orly-lang") as Lang | null;
    if (savedLang === "fr" || savedLang === "en") setLang(savedLang);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("light", theme !== "dark");
    localStorage.setItem("orly-theme", theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = lang;
    localStorage.setItem("orly-lang", lang);
  }, [lang]);

  return { lang, setLang, theme, setTheme, isDark: theme === "dark" };
}
