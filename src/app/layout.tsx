import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://vyasa.avyaylabs.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Vyasa · Your conversations searchable",
  description:
    "A wearable clip with about a minute of context on the device. Press once or hold for longer, then search in the Vyasa app.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Vyasa",
    title: "Vyasa · Your conversations searchable",
    description:
      "A wearable clip with about a minute of context on the device. Press once or hold for longer, then search in the Vyasa app.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vyasa · Your conversations searchable",
    description:
      "A wearable clip with about a minute of context on the device. Press once or hold for longer, then search in the Vyasa app.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
