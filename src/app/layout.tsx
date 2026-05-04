import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const siteUrl = "https://vyasa.avyaylabs.com";
const description =
  "A wearable clip: one press saves the rolling minute, or hold to prepend that minute and keep recording until you stop. Captures stay on the clip until they sync to your phone. Search in the Vyasa app; connect MCP for assistants when you enable it.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Vyasa · Your conversations searchable",
  description,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Vyasa",
    title: "Vyasa · Your conversations searchable",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Vyasa · Your conversations searchable",
    description,
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
