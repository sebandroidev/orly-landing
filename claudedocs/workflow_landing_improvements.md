# Orly Landing — Improvement Workflow
**Generated:** 2026-02-25
**Source:** Full codebase audit (`/sc:brainstorm`)
**Strategy:** Systematic, prioritized by launch-readiness

---

## Summary

6 phases covering all identified gaps. Each phase is self-contained and can be committed independently. Phases 1–3 are pre-launch blockers; 4–6 are polish.

---

## Phase 1 — Form Validation & UX Correctness
**Goal:** Prevent bad data reaching the API; fix misleading UX for returning users.
**Files:** `app/components/EmailForm.tsx`
**Dependencies:** None

### Tasks

1. **Email regex validation**
   - Add `isValidEmail(email: string): boolean` helper using RFC-5322-lite regex
   - Trigger on form submit (before opening dialog)
   - Show inline error message below the email input
   - Clear error on input change
   - Copy: EN `"Please enter a valid email address."` / FR `"Veuillez entrer une adresse email valide."`

2. **Name field validation**
   - First name + last name: trim whitespace, require min 1 non-space char
   - Trigger on confirm button click
   - Show inline error below each field
   - Copy: EN `"This field is required."` / FR `"Ce champ est obligatoire."`

3. **409 duplicate message**
   - Detect `status === 409` and show distinct message (no confetti)
   - Copy: EN `"You're already on the list! We'll be in touch soon."` / FR `"Vous êtes déjà sur la liste ! Nous vous contacterons bientôt."`
   - Do not reuse the "You're on the list!" success state for 409

### Checkpoint
- [ ] Submit `foo@` → inline error shown, API not called
- [ ] Submit blank first name → inline error shown, dialog stays open
- [ ] Resubmit existing email → distinct 409 message shown

---

## Phase 2 — Accessibility Improvements
**Goal:** Screen reader users get equivalent experience.
**Files:** `app/components/EmailForm.tsx`
**Dependencies:** None (parallel with Phase 1)

### Tasks

1. **`aria-live` for form state transitions**
   - Add `<div role="status" aria-live="polite" className="sr-only">` in the form
   - Populate with a text description on each state change:
     - `idle` → "" (empty)
     - `dialog` → EN "Name entry dialog opened" / FR "Boîte de dialogue ouverte"
     - `loading` → EN "Submitting…" / FR "Envoi en cours…"
     - `success` → EN "You're on the list!" / FR "Vous êtes sur la liste !"
     - `error` → mirror the visible error message

2. **Loading button state**
   - Add `aria-busy="true"` to the confirm button during `loading` state
   - Add `aria-label` on the spinner SVG: `aria-hidden="true"` + text sibling in `sr-only`

3. **Form field labels**
   - Email input: add `<label htmlFor="email">` (currently label-less)
   - First name + last name: add `<label htmlFor="firstName">` / `<label htmlFor="lastName">`
   - Visually hide labels with `sr-only` class if design requires placeholder-only look

### Checkpoint
- [ ] VoiceOver (macOS) announces state transitions during form submit flow
- [ ] Spinner button is identified as "busy" by screen readers
- [ ] All inputs have programmatic labels

---

## Phase 3 — Copyright Year Fix
**Goal:** Avoid stale year in production.
**Files:** `app/components/Footer.tsx`, `app/components/FaqPage.tsx`, `app/components/PrivacyPage.tsx`
**Dependencies:** None (5-minute task)

### Tasks

1. **Replace hardcoded `© 2026`**
   - `Footer.tsx`: Replace `© 2026 Orly` with `© {new Date().getFullYear()} Orly`
   - `FaqPage.tsx`: Same
   - `PrivacyPage.tsx`: Same (both EN + FR strings)

2. **Privacy policy "Last updated" date**
   - Keep hardcoded for now — this is intentional legal content, not a timestamp
   - Document in code with a comment: `{/* Update manually when policy changes */}`

### Checkpoint
- [ ] `new Date().getFullYear()` appears in all three footer/copyright locations
- [ ] Build succeeds, no type errors

---

## Phase 4 — Terms of Service Page
**Goal:** Complete legal coverage; the form currently only links Privacy Policy.
**Files:** New `app/tos/page.tsx`, new `app/components/TosPage.tsx`, update `app/components/EmailForm.tsx`, `app/sitemap.ts`
**Dependencies:** None (but coordinate copy with Phase 1 copy changes)

### Tasks

1. **Create `TosPage.tsx` component**
   - Mirror structure of `PrivacyPage.tsx` (sticky header, staggered motion, sticky header, lang/theme state)
   - Sections (EN + FR):
     1. Introduction — acceptance of terms
     2. Service description — waitlist / discovery platform
     3. User responsibilities — accurate info, no abuse
     4. Intellectual property — Orly owns the brand/content
     5. Limitation of liability — pre-launch service, no guarantees
     6. Governing law — applicable jurisdiction (TBD)
     7. Contact — support@orly.app
   - `Last Updated:` date (hardcoded, same as privacy policy pattern)

2. **Create `app/tos/page.tsx` route**
   - Metadata: `title: "Terms of Service | Orly"`, canonical `/tos`
   - OG + Twitter metadata
   - JSON-LD not required for this page type

3. **Update `EmailForm.tsx` privacy notice**
   - EN: `"By joining, you agree to our [Privacy Policy] and [Terms of Service]."`
   - FR: `"En vous inscrivant, vous acceptez notre [Politique de confidentialité] et nos [Conditions d'utilisation]."`

4. **Update `Footer.tsx`**
   - Add ToS link alongside Privacy link (same style)

5. **Update `app/sitemap.ts`**
   - Add `/tos` with `priority: 0.3`, `changeFrequency: "yearly"`

6. **Update `app/components/FaqPage.tsx`**
   - Add ToS link in FAQ footer alongside Privacy

### Checkpoint
- [ ] `/tos` renders correctly in EN and FR
- [ ] ToS link appears in form privacy notice and in footer
- [ ] `/tos` appears in sitemap.xml
- [ ] Back navigation works from ToS page

---

## Phase 5 — Analytics Integration
**Goal:** Measure form conversion, language/theme preferences, page views.
**Files:** `app/layout.tsx`, `app/components/EmailForm.tsx`, `package.json`
**Dependencies:** Vercel project setup (env var)

### Option A — Vercel Analytics (recommended, zero-config)
1. `npm install @vercel/analytics`
2. Add `<Analytics />` to `app/layout.tsx`
3. No env vars needed — auto-detects Vercel environment

### Option B — Custom event tracking (if more granular data needed)
1. Instrument key events in `EmailForm.tsx`:
   - `waitlist_email_submitted` — email field submitted
   - `waitlist_dialog_opened` — dialog appears
   - `waitlist_confirmed` — name confirmed, API called
   - `waitlist_success` — API 200/201
   - `waitlist_duplicate` — API 409
   - `waitlist_error` — API 4xx/5xx
   - `waitlist_rate_limited` — API 429
2. Use `window.gtag` / `window.analytics` (pluggable, add provider in layout)

### Tasks (Option A path)
1. Install `@vercel/analytics`
2. Import and render `<Analytics />` in `app/layout.tsx` (after all other children)
3. Add `VERCEL_ANALYTICS_ID` to deployment env (auto-set on Vercel)
4. Document in README

### Checkpoint
- [ ] Build passes with analytics package
- [ ] Page view fires on `/` navigation in Vercel dashboard
- [ ] (Optional) custom event fires on successful waitlist submission

---

## Phase 6 — Shared Lang/Theme Hook (Refactor)
**Goal:** Eliminate triplicated localStorage logic across Landing/FaqPage/PrivacyPage (and future TosPage).
**Files:** New `app/hooks/useAppPreferences.ts`, `app/components/Landing.tsx`, `app/components/FaqPage.tsx`, `app/components/PrivacyPage.tsx`
**Dependencies:** Phase 4 (TosPage needs the hook too)
**Risk:** Low — pure refactor, no behavior change

### Tasks

1. **Extract `useAppPreferences` hook**
   ```typescript
   // app/hooks/useAppPreferences.ts
   export function useAppPreferences() {
     const [lang, setLang] = useState<Lang>(() => /* localStorage init */)
     const [theme, setTheme] = useState<Theme>(() => /* localStorage init */)
     // useEffect for DOM sync
     return { lang, setLang, theme, setTheme }
   }
   ```
   - Consolidates all `localStorage.getItem("orly-lang")` / `localStorage.setItem("orly-theme")` logic
   - Handles SSR safety (typeof window check)
   - Returns `{ lang, setLang, theme, setTheme }`

2. **Replace in `Landing.tsx`** — remove duplicate state + effects, use hook
3. **Replace in `FaqPage.tsx`** — same
4. **Replace in `PrivacyPage.tsx`** — same
5. **Use hook in new `TosPage.tsx`** (from Phase 4)

### Checkpoint
- [ ] All pages persist lang/theme correctly after refactor
- [ ] No regressions: dark/light switch works, lang switch works
- [ ] Single source of truth for localStorage keys

---

## Execution Order

```
Phase 1 ──┐
Phase 2 ──┤──► Phase 6 (refactor)
Phase 3 ──┘
           Phase 4 ──► Phase 6 (TosPage uses hook)
           Phase 5    (independent, can go anytime)
```

Phases 1, 2, 3 can be worked in parallel (different concerns, same file for 1+2).
Phase 4 depends on nothing but benefits from Phase 6 being ready.
Phase 5 is fully independent.
Phase 6 is best done last (after Phase 4 adds TosPage).

---

## Pre-Launch Final Checklist

After all phases complete:
- [ ] `NEXT_PUBLIC_API_URL` set to production in Vercel env
- [ ] `GOOGLE_SITE_VERIFICATION` token added to Vercel env
- [ ] `NEXT_PUBLIC_INSTAGRAM_URL` / `NEXT_PUBLIC_LINKEDIN_URL` set
- [ ] App store IDs set once apps are live
- [ ] Run `next build` — zero errors, zero warnings
- [ ] Run Lighthouse audit — target 95+ on all metrics
- [ ] Test form E2E on production URL
- [ ] Verify OG images render on Twitter Card Validator + LinkedIn Post Inspector
- [ ] Verify sitemap.xml accessible at https://orly.app/sitemap.xml
- [ ] Legal review of Privacy Policy + Terms of Service copy
