import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "maplibre-gl/dist/maplibre-gl.css";
import "./globals.css";
import { SITE, absUrl } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.tagline} | ${SITE.name}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.org.name, url: SITE.org.url }],
  creator: SITE.org.name,
  publisher: SITE.org.name,
  generator: "Next.js",
  keywords: [
    "builder local",
    "Cultura Builder",
    "consultoria de IA Brasil",
    "implementação de agentes de IA",
    "treinamento de IA para empresas",
    "freelancer de IA",
    "carreira IA Brasil",
    "AWS Partner Brasil",
    "NVIDIA Inception",
    "automação com IA",
    "agente IA WhatsApp",
    "copiloto comercial IA",
  ],
  category: "Technology",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.tagline} | ${SITE.name}`,
    description: SITE.shortDescription,
  },
  twitter: {
    card: "summary_large_image",
    site: SITE.twitter,
    creator: SITE.twitter,
    title: `${SITE.tagline} | ${SITE.name}`,
    description: SITE.shortDescription,
  },
  icons: {
    icon: [
      { url: "/logo.svg", type: "image/svg+xml" },
    ],
  },
  other: {
    "format-detection": "telephone=no",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0A0A0A",
  colorScheme: "dark",
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE.org.url}#org`,
  name: SITE.org.name,
  legalName: SITE.org.legalName,
  url: SITE.org.url,
  logo: SITE.org.logo,
  description:
    "Cultura Builder treina e certifica builders locais de IA em todo o Brasil. Parceira AWS e membro do NVIDIA Inception Program.",
  sameAs: SITE.org.sameAs,
  knowsAbout: [
    "Inteligência Artificial",
    "Agentes de IA",
    "Automação Empresarial",
    "Treinamento Corporativo de IA",
    "Implementação de LLMs",
  ],
  award: [
    "AWS Partner Network Member",
    "NVIDIA Inception Program Member",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE.url}#website`,
  url: SITE.url,
  name: SITE.name,
  description: SITE.description,
  inLanguage: "pt-BR",
  publisher: { "@id": `${SITE.org.url}#org` },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="canonical" href={absUrl("/")} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
