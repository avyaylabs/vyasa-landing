import type { MetadataRoute } from "next";
import { IS_PREVIEW, SITE_URL } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  if (IS_PREVIEW) {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

  /* Allow all crawlers; `*` covers Facebook, X/Twitterbot, LinkedInBot, etc.
     Per-bot rules are redundant unless you disallow something for `*` and need exceptions. */
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
