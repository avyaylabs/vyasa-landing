import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vyasa · Your conversations searchable",
  description:
    "About the last minute on the device until you save it. Press once or hold for longer, then search in the app or connect tools that support MCP.",
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
