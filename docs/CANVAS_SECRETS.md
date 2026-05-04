# Submitting secrets to the instructor (course grading)

The lab manual asks you to **submit secrets for grading** while **never committing** them to Git.

## Do

- Keep secrets in **`.env.local`** (gitignored) for local development.
- In **Vercel**, set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in the project **Settings → Environment Variables** for Production.
- For Canvas / instructor handoff, paste into a **private comment** or the template they provide:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

## Do not

- Commit `.env`, `.env.local`, or keys in README/docs source.
- Share the **service role** key (not needed for this app’s anon client).

After the course, rotate keys if you posted them anywhere public.
