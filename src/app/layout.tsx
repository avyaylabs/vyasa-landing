import type { Metadata } from "next";
import "./globals.css";
import {
  IS_PREVIEW,
  ORGANIZATION,
  SITE_DESCRIPTION,
  SITE_URL,
} from "@/lib/site-config";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Vyasa · Your conversations searchable",
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  ...(IS_PREVIEW
    ? {
        robots: {
          index: false,
          follow: false,
          googleBot: { index: false, follow: false },
        },
      }
    : {
        robots: {
          index: true,
          follow: true,
        },
      }),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Vyasa",
    title: "Vyasa · Your conversations searchable",
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Vyasa · Your conversations searchable",
    description: SITE_DESCRIPTION,
  },
  verification: {
    google: "x2LV7Dz0H7kmaHi-nE-p64jHxY4TtE645Ymnq1Whsqg",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${ORGANIZATION.url}/#organization`,
      name: ORGANIZATION.name,
      url: ORGANIZATION.url,
      sameAs: [...ORGANIZATION.sameAs],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "Vyasa",
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      publisher: { "@id": `${ORGANIZATION.url}/#organization` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
