# Deploy to Vercel (quick)

1. Push `main` to GitHub (Classroom remote already configured).
2. [vercel.com](https://vercel.com) → **Add New Project** → import the GitHub repo.
3. **Framework:** Next.js (auto-detected). **Root directory:** `.` (repository root).
4. **Environment variables** (Production + Preview):

   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

   Paste the same values as in your local `.env.local`.

5. Deploy. Open the **Production** URL — confirm `/`, `/equipment`, and `/events` load.
6. Copy the URL into root **README.md** → section *Deployment URL (grading)*.
7. **Security:** never add the **service role** key to Vercel or the repo. Only the **anon** key with RLS rules appropriate for your project (lab: tables often have RLS disabled per troubleshooting matrix).

If build fails, run `npm run build` locally and fix TypeScript errors before redeploying.
