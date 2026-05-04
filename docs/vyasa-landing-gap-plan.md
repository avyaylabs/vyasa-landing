# Vyasa marketing site — gap plan vs `product-landing-pages.md`

This document captures a **read-only audit** of the current `VyasaLanding` page against the internal guide [`product-landing-pages.md`](./product-landing-pages.md). Use it as a backlog; it is not a commitment to build every item.

**Done:** §2 (hero clarifier), §7 (shorter hero, MCP only in Recall), §9 (`metadataBase` + Open Graph/Twitter + `opengraph-image.tsx`), §10 (bottom waitlist scroll nudge).

---

## Already in good shape

- **One primary outcome:** Waitlist is the main action (hero + `#waitlist`).
- **Framed ask:** “Join the waitlist to try it in the first run” above both forms.
- **Rough anatomy:** Nav → Hero → Why → How → Recall → Privacy → Name → From me → Final CTA → Footer (contact + social).
- **Trust:** Privacy section; copy references terms / subprocessors where relevant.
- **Tone:** Mostly concrete; hero has been steered away from the heaviest spec jargon.

---

## Gaps and planned work

### 1. Real product visuals (highest impact)

**Guide:** Show the real product — photos, short video, or UI screenshots — not only abstract art.

**Current:** Hero / How lean on SVG waveforms; Recall uses a **mock** terminal, not shipped app UI or a photo of the clip.

**Plan**

- Add **above-the-fold or immediately below** hero: device photo, short loop video, or 1–2 labeled screenshots (even “alpha” if honest).
- Extend **How** with the same assets so the story is not diagram-only.

**Before building:** Source assets (photo, screen recording, design export).

---

### 2. Hero: “What is it?” in ~5 seconds

**Guide:** Headline = outcome; visitor should quickly infer *what the product is*.

**Current:** H1 is brand + “searchable”; the **clip** appears in subcopy, not the headline stack.

**Plan**

- Test one **clarifying line** (under H1 or opening subcopy): physical object + job-to-be-done, without bloating layout.

**Optional research:** 5-second comprehension checks (“What is this?”) with a handful of cold readers.

---

### 3. FAQ section

**Guide:** FAQ for objections (shipping, data, price, roadmap).

**Current:** No FAQ block.

**Plan**

- Add **5–8** short Q&As (what waitlist means, regions, rough timeline, what’s in the box, app vs hardware, beta honesty).

**Research:** Pull questions from real emails/DMs; no web scrape required.

---

### 4. Proof near skepticism

**Guide:** Logos, numbers, quotes near claims or CTAs.

**Current:** Avyay Labs + founder note; no third-party proof.

**Plan**

- Add **one honest line** near waitlist if you have something true (e.g. geography, “first run is intentionally small,” real waitlist count **only** if accurate and approved).

---

### 5. Legal / policy links

**Guide:** Footer should support legitimacy; terms/privacy when collecting data.

**Current:** Copy mentions terms; footer has **no** links to published Terms or Privacy Policy pages (`#privacy` is product story, not a policy URL).

**Plan**

- When legal pages exist: footer links to **Terms** + **Privacy** (and cookies if applicable). Consider renaming the story section vs policy URL to avoid confusion.

**Research:** Legal review for jurisdictions where you collect emails.

---

### 6. Secondary actions

**Guide:** Docs / video / etc. lower on the page.

**Current:** No docs, GitHub, video, or press links.

**Plan**

- Footer (or hero under form): muted links **only when URLs exist**.

---

### 7. Hero copy density

**Guide:** Technical depth can live lower; keep hero scannable.

**Current:** One paragraph still bundles buffer, gestures, app, and MCP.

**Plan**

- Shorten hero subcopy; keep **MCP / assistants** primarily in **Recall**.

---

### 8. Mobile and performance

**Guide:** Mobile-friendly; fast loads.

**Current:** Decorative hero SVG on the right; long single page.

**Plan**

- Run **Lighthouse (mobile)** on production; shrink or hide decorative art on small breakpoints if needed; fix any LCP issues.

---

### 9. Social / link previews

**Guide:** (Implicit) Strong sharing when people paste the URL.

**Current:** `layout.tsx` has title + description; no **Open Graph / Twitter** image defined in metadata.

**Plan**

- Add **og:image** (e.g. 1200×630) when art exists.

---

### 10. Duplicate line (optional)

**Current:** Identical “Join the waitlist to try it in the first run” in hero and bottom.

**Plan**

- Either **keep** (intentional repetition for scrollers) or **vary** the bottom line with the same meaning.

---

## Product Hunt (off this repo’s page)

Aligned with **section 4** of the guide — not a change to `VyasaLanding.tsx` alone:

- Tagline, thumbnail, and **gallery** tied to real assets (see §1).
- **Maker first comment** drafted; team ready to reply on launch day.
- After launch: optional footer link to the PH page for social proof.

**Research:** Re-read Product Hunt’s **current** launch rules on their site when you schedule.

---

## Suggested priority

| Priority | Item |
|----------|------|
| High | Real visuals (§1), FAQ (§3) |
| Medium | Hero clarity (§2), shorter hero / MCP placement (§7), Terms/Privacy links when ready (§5) |
| Lower | Proof line (§4), OG image (§9), Lighthouse pass (§8), secondary links (§6), duplicate-line tweak (§10) |

---

*Last aligned with the landing page structure in `src/components/VyasaLanding.tsx` and metadata in `src/app/layout.tsx`.*
