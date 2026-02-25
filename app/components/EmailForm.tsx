"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { type Lang } from "./LanguageToggle";

type FormState = "idle" | "dialog" | "loading" | "success";

const copy = {
  fr: {
    placeholder: "Votre adresse email",
    submit: "Rejoindre la liste",
    dialogTitle: "Encore une chose\u2026",
    dialogSub: "Comment doit-on vous appeler\u00a0?",
    firstName: "Prénom",
    lastName: "Nom",
    confirm: "Confirmer",
    cancel: "Annuler",
    successTitle: "Vous êtes sur la liste\u00a0!",
    successSub: "Nous vous contacterons très bientôt.",
    alreadyTitle: "Vous êtes déjà sur la liste\u00a0!",
    alreadySub: "Nous vous contacterons bientôt.",
    joinAgain: "Rejoindre à nouveau",
    privacy: "En vous inscrivant, vous acceptez notre ",
    privacyLink: "Politique de confidentialité",
    tosLink: "Conditions d'utilisation",
    error: "Une erreur est survenue. Réessayez.",
    rateLimited: "Trop de tentatives. Réessayez dans une minute.",
    emailInvalid: "Veuillez entrer une adresse email valide.",
    fieldRequired: "Ce champ est obligatoire.",
    liveDialog: "Boîte de dialogue ouverte",
    liveSubmitting: "Envoi en cours\u2026",
  },
  en: {
    placeholder: "Your email address",
    submit: "Join waitlist",
    dialogTitle: "One more thing\u2026",
    dialogSub: "What should we call you?",
    firstName: "First name",
    lastName: "Last name",
    confirm: "Confirm",
    cancel: "Cancel",
    successTitle: "You\u2019re on the list!",
    successSub: "We\u2019ll be in touch very soon.",
    alreadyTitle: "You\u2019re already on the list!",
    alreadySub: "We\u2019ll be in touch soon.",
    joinAgain: "Join again",
    privacy: "By joining, you agree to our ",
    privacyLink: "Privacy Policy",
    tosLink: "Terms of Service",
    error: "Something went wrong. Please try again.",
    rateLimited: "Too many attempts. Try again in a minute.",
    emailInvalid: "Please enter a valid email address.",
    fieldRequired: "This field is required.",
    liveDialog: "Name entry dialog opened",
    liveSubmitting: "Submitting\u2026",
  },
};

function isValidEmail(email: string): boolean {
  return /^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{2,}$/.test(email.trim());
}

interface Props {
  lang: Lang;
  isDark: boolean;
}

export default function EmailForm({ lang, isDark }: Props) {
  const t = copy[lang];
  const [state, setState] = useState<FormState>("idle");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [focused, setFocused] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [firstNameError, setFirstNameError] = useState<string | null>(null);
  const [lastNameError, setLastNameError] = useState<string | null>(null);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [liveMessage, setLiveMessage] = useState("");
  const firstNameRef = useRef<HTMLInputElement>(null);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    if (!isValidEmail(email)) {
      setEmailError(t.emailInvalid);
      return;
    }
    setEmailError(null);
    setState("dialog");
    setLiveMessage(t.liveDialog);
    setTimeout(() => firstNameRef.current?.focus(), 100);
  };

  const handleDialogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let hasError = false;
    if (!firstName.trim()) {
      setFirstNameError(t.fieldRequired);
      hasError = true;
    }
    if (!lastName.trim()) {
      setLastNameError(t.fieldRequired);
      hasError = true;
    }
    if (hasError) return;

    setError(null);
    setFirstNameError(null);
    setLastNameError(null);
    setState("loading");
    setLiveMessage(t.liveSubmitting);

    try {
      const endpoint = process.env.NEXT_PUBLIC_API_URL ?? "https://api.orly.app/api/v1/join";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, firstName, lastName }),
      });

      if (res.status === 409) {
        setIsDuplicate(true);
        setState("success");
        setLiveMessage(t.alreadyTitle);
        return;
      }

      if (!res.ok) {
        setState("dialog");
        const msg = res.status === 429 ? t.rateLimited : t.error;
        setError(msg);
        setLiveMessage(msg);
        return;
      }

      setIsDuplicate(false);
      setState("success");
      setLiveMessage(t.successTitle);
      triggerConfetti();
    } catch {
      setState("dialog");
      setError(t.error);
      setLiveMessage(t.error);
    }
  };

  const triggerConfetti = async () => {
    const confetti = (await import("canvas-confetti")).default;
    confetti({
      particleCount: 130,
      spread: 80,
      origin: { y: 0.55 },
      colors: ["#ffffff", "#e5e5e5", "#a3a3a3", "#737373", "#404040"],
      gravity: 1.1,
    });
  };

  const handleReset = () => {
    setEmail("");
    setFirstName("");
    setLastName("");
    setError(null);
    setEmailError(null);
    setFirstNameError(null);
    setLastNameError(null);
    setIsDuplicate(false);
    setLiveMessage("");
    setState("idle");
  };

  const handleDialogClose = () => {
    setState("idle");
    setError(null);
  };

  const inputCls = isDark
    ? "border-white/10 bg-white/5 text-white placeholder-white/25 focus:border-white/25 focus:bg-white/[0.08] focus:shadow-[0_0_0_4px_rgba(255,255,255,0.04)]"
    : "border-black/10 bg-black/[0.04] text-black placeholder-black/30 focus:border-black/20 focus:bg-black/[0.06] focus:shadow-[0_0_0_4px_rgba(0,0,0,0.04)]";

  const btnCls = isDark
    ? "bg-white text-black hover:bg-white/90"
    : "bg-black text-white hover:bg-black/85";

  const dialogCardCls = isDark
    ? "border-white/10 bg-[#161616]"
    : "border-black/10 bg-white shadow-black/10";

  const dialogTitleCls = isDark ? "text-white" : "text-black";
  const dialogSubCls = isDark ? "text-white/40" : "text-black/50";

  const dialogInputCls = isDark
    ? "border-white/10 bg-white/5 text-white placeholder-white/30 focus:border-white/25"
    : "border-black/10 bg-black/[0.04] text-black placeholder-black/30 focus:border-black/20";

  const dialogCancelCls = isDark
    ? "border-white/10 text-white/50 hover:text-white/70"
    : "border-black/10 text-black/40 hover:text-black/70";

  const dialogConfirmCls = isDark
    ? "bg-white text-black"
    : "bg-black text-white";

  return (
    <div className="relative flex w-full flex-col items-center gap-3">
      {/* Screen reader live region for state announcements */}
      <div role="status" aria-live="polite" className="sr-only">
        {liveMessage}
      </div>

      <AnimatePresence mode="wait">
        {state === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col items-center gap-3 text-center"
          >
            <p
              className="text-lg font-semibold sm:text-xl"
              style={{ fontFamily: "var(--font-bricolage)", color: "var(--foreground)" }}
            >
              {isDuplicate ? t.alreadyTitle : t.successTitle}
            </p>
            <p className="text-sm" style={{ color: "var(--fg-dim)" }}>
              {isDuplicate ? t.alreadySub : t.successSub}
            </p>
            <button
              onClick={handleReset}
              className="mt-2 text-xs underline underline-offset-4 transition-colors"
              style={{ color: "var(--fg-dim)" }}
            >
              {t.joinAgain}
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            onSubmit={handleEmailSubmit}
            className="flex w-full flex-col gap-3 sm:flex-row sm:items-start"
          >
            <motion.div
              className="relative flex-1"
              animate={{ scale: focused ? 1.01 : 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
            >
              <label htmlFor="email" className="sr-only">
                {t.placeholder}
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setEmailError(null); }}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder={t.placeholder}
                required
                aria-describedby={emailError ? "email-error" : undefined}
                className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all duration-200 ${inputCls}`}
              />
              {emailError && (
                <p id="email-error" className="mt-1 text-xs text-red-400">
                  {emailError}
                </p>
              )}
            </motion.div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className={`shrink-0 rounded-xl px-5 py-3 text-sm font-semibold transition-colors ${btnCls}`}
            >
              {t.submit}
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Privacy + ToS notice */}
      {state !== "success" && (
        <p className="text-center text-xs" style={{ color: "var(--fg-dim)", opacity: 0.6 }}>
          {t.privacy}
          <Link
            href="/privacy"
            className="underline underline-offset-2 transition-opacity hover:opacity-80"
          >
            {t.privacyLink}
          </Link>
          {" & "}
          <Link
            href="/tos"
            className="underline underline-offset-2 transition-opacity hover:opacity-80"
          >
            {t.tosLink}
          </Link>
          .
        </p>
      )}

      {/* Dialog overlay */}
      <AnimatePresence>
        {(state === "dialog" || state === "loading") && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={state === "dialog" ? handleDialogClose : undefined}
            />

            {/* Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 12 }}
              transition={{ type: "spring", stiffness: 420, damping: 30 }}
              className={`relative z-10 w-full max-w-sm rounded-2xl border p-6 shadow-2xl ${dialogCardCls}`}
            >
              <h2
                className={`text-base font-semibold ${dialogTitleCls}`}
                style={{ fontFamily: "var(--font-bricolage)" }}
              >
                {t.dialogTitle}
              </h2>
              <p className={`mt-0.5 mb-5 text-sm ${dialogSubCls}`}>{t.dialogSub}</p>

              <form onSubmit={handleDialogSubmit} className="flex flex-col gap-3">
                <div>
                  <label htmlFor="firstName" className="sr-only">
                    {t.firstName}
                  </label>
                  <input
                    id="firstName"
                    ref={firstNameRef}
                    type="text"
                    value={firstName}
                    onChange={(e) => { setFirstName(e.target.value); setFirstNameError(null); }}
                    placeholder={t.firstName}
                    aria-describedby={firstNameError ? "firstName-error" : undefined}
                    className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition-colors ${dialogInputCls}`}
                  />
                  {firstNameError && (
                    <p id="firstName-error" className="mt-1 text-xs text-red-400">
                      {firstNameError}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="lastName" className="sr-only">
                    {t.lastName}
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => { setLastName(e.target.value); setLastNameError(null); }}
                    placeholder={t.lastName}
                    aria-describedby={lastNameError ? "lastName-error" : undefined}
                    className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition-colors ${dialogInputCls}`}
                  />
                  {lastNameError && (
                    <p id="lastName-error" className="mt-1 text-xs text-red-400">
                      {lastNameError}
                    </p>
                  )}
                </div>

                {error && <p className="text-xs text-red-400">{error}</p>}

                <div className="flex gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleDialogClose}
                    className={`flex-1 rounded-xl border py-3 text-sm transition-colors ${dialogCancelCls}`}
                  >
                    {t.cancel}
                  </button>
                  <motion.button
                    type="submit"
                    disabled={state === "loading"}
                    aria-busy={state === "loading"}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex flex-1 items-center justify-center rounded-xl py-3 text-sm font-semibold disabled:opacity-60 ${dialogConfirmCls}`}
                  >
                    {state === "loading" ? (
                      <svg
                        className="h-4 w-4 animate-spin"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                      >
                        <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-80" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                    ) : (
                      t.confirm
                    )}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
