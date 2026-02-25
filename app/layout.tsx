import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["600", "800"],
  display: "swap",
});

const BASE_URL = "https://orly.app";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0d0d0d" },
    { media: "(prefers-color-scheme: light)", color: "#f5f4ef" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Orly — Discover Local Services Around You",
    template: "%s | Orly",
  },
  description:
    "Orly is the community platform to find, recommend, and discover local services. Restaurants, artisans, hairdressers — all near you.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Orly",
    title: "Orly — Discover Local Services Around You",
    description:
      "Orly is the community platform to find, recommend, and discover local services. Restaurants, artisans, hairdressers — all near you.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Orly — Discover Local Services Around You",
    description:
      "Orly is the community platform to find, recommend, and discover local services.",
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
  other: {
    ...(process.env.NEXT_PUBLIC_APPLE_APP_ID && {
      "apple-itunes-app": `app-id=${process.env.NEXT_PUBLIC_APPLE_APP_ID}`,
    }),
    ...(process.env.NEXT_PUBLIC_GOOGLE_PLAY_APP_ID && {
      "google-play-app": `app-id=${process.env.NEXT_PUBLIC_GOOGLE_PLAY_APP_ID}`,
    }),
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
  },
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={bricolage.variable} suppressHydrationWarning>
      <head>
        {/* Apply saved theme before hydration to prevent flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var l=localStorage;if(l.getItem('orly-theme')==='light')document.documentElement.classList.add('light');var lang=l.getItem('orly-lang');if(lang)document.documentElement.lang=lang;}catch(e){}`,
          }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
