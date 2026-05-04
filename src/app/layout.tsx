import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vyasa · Your conversations searchable",
  description:
    "A temporary memory of the last minute on the device. Press once or hold for longer, then search in the Vyasa app or connect tools that support MCP.",
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
