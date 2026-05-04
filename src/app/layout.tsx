import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vyasa — Your conversations searchable",
  description:
    "Sixty seconds of audio in a rolling buffer on the clip—press once to save that slice, hold for a longer take, then search what you kept or use MCP with Claude.",
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
