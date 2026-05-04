# How to make product landing pages

A practical guide for **marketing sites** (what people usually call a “landing page”) and **Product Hunt launch pages**, based on common patterns from strong consumer and SaaS products and on how successful teams treat Product Hunt.

---

## 1. Know which page you are building

| | **Marketing landing** | **Product Hunt launch** |
|---|------------------------|-------------------------|
| **Job** | Explain the product, build trust, drive one primary action (sign up, buy, book). | Win attention in a feed, earn upvotes and comments, drive **Visit** clicks. |
| **Audience** | Cold traffic, ads, SEO, word of mouth. | Hunters and makers who see **tagline + thumbnail + gallery** first. |
| **Lifecycle** | Long-lived; you iterate for months. | Spike on launch day; the PH page stays as social proof. |

Your **own site** should carry depth (story, privacy, FAQ, pricing when relevant). Your **PH page** should be scannable in seconds and backed by a great **first comment** and real replies on launch day.

---

## 2. Principles that apply to both

**One primary outcome**  
Pick the main action (e.g. join waitlist, start trial, install). Repeat it in the hero and again after scroll; secondary actions (“Read docs”, “Watch video”) come later or as text links.

**Headline = outcome, not jargon**  
Above the fold, answer: *what is it?* and *why should I care?* Subcopy can explain *how* (mechanism) one level down. Avoid internal codenames in the hero.

**Frame the ask**  
If the CTA is email or payment, a short line above the field (“Join the waitlist to try…”) reduces the feeling that you dropped a form out of nowhere.

**Show the real product**  
Screenshots, short loop video, or hardware on a desk beats abstract illustrations for “is this real?” Products that rank well on Product Hunt typically use **clear gallery images** (UI or device), not cluttered slides or generic stock.

**Proof near skepticism**  
Logos, numbers, quotes, or “built by X” work best **next to** claims or CTAs, not only at the bottom. If you have no logos yet, be honest: limited run, waitlist, who you are.

**Reading level**  
Short sentences and concrete verbs outperform dense technical paragraphs for first-time visitors. Technical detail belongs lower on the page or in docs.

**Mobile and speed**  
A large share of Product Hunt traffic is mobile. Hero text should wrap cleanly; images should load fast; tap targets should be large.

---

## 3. Marketing landing page anatomy (what “online” product pages usually include)

Order and depth depend on stage (idea vs shipping vs scale). A solid default:

1. **Nav** — Minimal links; primary CTA visible or repeated in hero.
2. **Hero** — Headline + supporting line + primary CTA + optional hero visual.
3. **Problem / context** — Why now, who it’s for (optional if hero already does this).
4. **How it works** — 3 steps or a few tight sections; screenshots or diagram.
5. **Differentiation** — What you are not, or what you do differently (without sounding defensive).
6. **Trust** — Privacy, security, team, press, or testimonials as appropriate.
7. **FAQ** — Objections in question form (shipping, data, pricing, roadmap).
8. **Final CTA** — Same primary action; repeat the value line in one sentence.

**Pricing** — Include when you sell now; skip or “Coming soon” for waitlist-only products.

**Footer** — Contact, legal, social; keeps the page feeling legitimate.

---

## 4. Product Hunt launch page: what to optimize

Product Hunt surfaces your product as a **card** (name, tagline, thumbnail) and a **detail page** (gallery, description, links, comments). Treat both as first-class.

**Tagline (short)**  
One line, benefit-forward, no buzzword stacking. This is the line people see in the feed next to your icon.

**Gallery (first slide matters most)**  
First image should read at small size: product name + one visual hook, or clearest UI frame. Additional slides: workflow, before/after, social proof. Avoid tiny text in screenshots.

**Description**  
Short paragraphs or bullets: what it does, who it’s for, link to site. Don’t duplicate your entire marketing page; tease and send people to your landing for depth.

**Topics**  
Pick accurate topics so the right people find you; don’t spam irrelevant tags.

**Links**  
Website, and optionally Twitter/X, GitHub, or video. Broken or missing “Visit” targets hurt conversion badly.

**First comment (maker comment)**  
Prepare a human, specific post: why you built it, what’s shipped vs roadmap, how to try it, invitation to feedback. Pin engagement: reply quickly on launch day.

**Launch day**  
Coordinate with people who genuinely use or care about the product; focus on **conversation quality** and real users rather than generic vote begging. Follow Product Hunt’s own rules for launches (see their help / launch materials).

**After launch**  
Your PH page remains a trust badge—link to it from your site footer or press page when it helps.

Further reading (third-party playbooks and PH’s own launch prep content) is easy to find by searching “Product Hunt launch guide” and opening [Product Hunt’s launch resources](https://www.producthunt.com/launch) when available.

---

## 5. Copy and tone

- **Prefer “you” and concrete verbs** over abstract nouns (“memory” vs “semantic knowledge graph”).
- **One idea per paragraph** on the web; white space is not wasted space.
- **Avoid LLM tells** if you want a human feel: endless em dashes, “delve,” “revolutionize,” symmetric triples in every sentence.
- **Match the product** — Hardware: ship date, what’s in the box, support. Developer tools: install snippet, docs link. Consumer app: emotion + simplicity.

---

## 6. Checklist before you ship

**Marketing site**

- [ ] Hero states outcome + primary CTA in ~5 seconds of reading.
- [ ] Ask is framed (trial, waitlist, buy, demo).
- [ ] Real product visuals above the fold or immediately below.
- [ ] One clear path for the main conversion; no competing equal-weight buttons in hero.
- [ ] Works on a phone; no illegible screenshot text.
- [ ] Footer contact + basics (privacy/terms when you collect data).

**Product Hunt**

- [ ] Tagline and thumbnail work at card size.
- [ ] Gallery tells a story in order; first slide is the hook.
- [ ] Description + links proofread; “Visit” goes to the right URL.
- [ ] First comment drafted; team ready to reply on launch day.
- [ ] Topics honest and specific.

---

## 7. How this relates to Vyasa’s site

This repo’s page leans **waitlist-first**, **buffer-led story**, **minimal nav**, and **framed email ask**—that matches the principles above. As the product matures, you might add gallery-style visuals, FAQ, and post-launch a Product Hunt page that points back here for the full story.

**Concrete backlog:** see [`vyasa-landing-gap-plan.md`](./vyasa-landing-gap-plan.md) for a gap-by-gap plan vs this guide (no code changes implied until you pick items).

---

*This doc is internal guidance, not legal or Product Hunt policy. Always follow [Product Hunt’s current rules](https://www.producthunt.com/) for launches and community behavior.*
