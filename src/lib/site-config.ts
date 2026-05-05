/** Canonical marketing URL (override with NEXT_PUBLIC_SITE_URL if needed). */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://vyasa.avyaylabs.com"
).replace(/\/$/, "");

/** True on Vercel preview deployments; use for noindex + restrictive robots. */
export const IS_PREVIEW = process.env.VERCEL_ENV === "preview";

export const SITE_DESCRIPTION =
  "A wearable clip: one press saves the rolling minute, or hold to prepend that minute and keep recording until you stop. Captures stay on the clip until they sync to your phone. Search in the Vyasa app; connect MCP for assistants when you enable it.";

export const ORGANIZATION = {
  name: "Avyay Labs",
  url: "https://avyaylabs.com",
  sameAs: ["https://x.com/avyaylabs"],
} as const;
