import Landing from "./components/Landing";
import Footer from "./components/Footer";

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Orly",
    description:
      "Community platform to find, recommend, and discover local services. Restaurants, artisans, hairdressers — all near you.",
    applicationCategory: "LifestyleApplication",
    operatingSystem: "iOS, Android",
    image: "https://getorly.com/opengraph-image",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    url: "https://getorly.com",
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Orly",
    url: "https://getorly.com",
    logo: "https://getorly.com/logo-orly.svg",
    description:
      "Community platform to find, recommend, and discover local services around you.",
    sameAs: [
      process.env.NEXT_PUBLIC_INSTAGRAM_URL,
      process.env.NEXT_PUBLIC_LINKEDIN_URL,
    ].filter(Boolean),
  },
];

export default function Home() {
  return (
    <>
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
        />
      ))}
      <Landing footer={<Footer />} />
    </>
  );
}
