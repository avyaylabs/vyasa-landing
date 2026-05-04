# Vyāsa landing

Next.js app for the Vyāsa marketing page and waitlist.

## Where emails are stored

Signups go to a **Supabase** Postgres table `waitlist_signups` (columns: `email`, `created_at`). You view and export them in the Supabase dashboard: **Table Editor → waitlist_signups**.

The browser only calls `POST /api/waitlist`; the **service role key** stays on the server (Vercel environment variables), never in the client.

## Local setup

1. Copy env and fill in Supabase values:

   ```bash
   cp .env.example .env.local
   ```

2. In [Supabase](https://supabase.com), create a project → **SQL Editor** → run the script in [`supabase/schema.sql`](supabase/schema.sql).

3. **Project Settings → API**: paste `SUPABASE_URL` and `service_role` key into `.env.local` as `SUPABASE_SERVICE_ROLE_KEY`.

4. Install and run:

   ```bash
   npm install
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## Deploy on Vercel

1. Push this repo to GitHub (see below).
2. [Vercel](https://vercel.com) → **Add New Project** → import the repo → deploy.
3. In the project **Settings → Environment Variables**, add `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` (same values as local). Redeploy if the first build ran without them.

Production URL will show an error under the waitlist fields until those variables are set.

## Create the GitHub repo

This folder is already a git repository (`create-next-app` ran `git init`). From the project root:

```bash
cd /Users/rahuld/Documents/avyaylabs/projects/vyasa-landing
git add -A
git status
git commit -m "Vyāsa landing with Supabase waitlist API"
```

Then either:

**GitHub CLI** (if installed and logged in):

```bash
gh repo create avyaylabs/vyasa-landing --private --source=. --remote=origin --push
```

Adjust `avyaylabs/vyasa-landing` to your org or username. Omit `--private` for a public repo.

**Or manually**: create an empty repo on GitHub, then:

```bash
git remote add origin https://github.com/YOUR_USER/vyasa-landing.git
git branch -M main
git push -u origin main
```

## Optional alternatives

- **Resend / Loops / Buttondown**: instead of (or in addition to) Supabase, you could POST from the same route to an email API or newsletter tool.
- **Vercel Postgres / Neon**: same pattern as Supabase—insert from `src/app/api/waitlist/route.ts` only.
