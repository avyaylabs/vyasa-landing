import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";

export const fontInter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const fontFraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-fraunces",
  display: "swap",
});

export const fontJetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const fontVariableClasses = [
  fontInter.variable,
  fontFraunces.variable,
  fontJetbrains.variable,
].join(" ");
