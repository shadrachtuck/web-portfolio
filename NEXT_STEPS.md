# Next Steps to Fix API URL Issue

The app is still trying to use `http://portfolio-backend.local/graphql` instead of the production URL. Here's what to try:

## Option 1: Verify and Fix Vercel Environment Variable (RECOMMENDED)

1. **Check Vercel Environment Variable:**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Make sure you have: `VITE_WP_GRAPHQL_URL` = `https://backend.shadrach-tuck.dev/graphql`
   - Check that it's enabled for **Production** environment
   - Note: The name MUST start with `VITE_` for Vite to pick it up

2. **Clear Build Cache:**
   - In Vercel: Settings → General → Clear Build Cache
   - This ensures a fresh build

3. **Redeploy:**
   - Deployments tab → Click latest deployment → Redeploy
   - OR make a small commit and push to trigger new build

## Option 2: Verify Environment Variable Value in Vercel

Double-check the exact value in Vercel:
- Should be: `https://backend.shadrach-tuck.dev/graphql`
- NOT: `http://backend.shadrach-tuck.dev/graphql` (must be HTTPS)
- NOT: `https://backend.shadrach-tuck.dev/graphql/` (no trailing slash)
- NOT: Anything with `portfolio-backend.local`

## Option 3: Commit and Push the Code Change

If you haven't committed the code change yet:

```bash
cd portfolio-webdev
git add src/lib/graphql.js
git commit -m "Update default GraphQL URL to production"
git push
```

This will trigger a new deployment with the updated code.

## Option 4: Test Environment Variable Locally

To verify the env var works, create a `.env` file locally and test:

```bash
# In portfolio-webdev/.env
VITE_WP_GRAPHQL_URL=https://backend.shadrach-tuck.dev/graphql
```

Then run `npm run dev` and check if it works.

## Option 5: Hardcode Production URL (Temporary Fix)

If nothing else works, we can temporarily hardcode the production URL in the code to ensure it works while troubleshooting the env var issue.

## What to Check

1. **Vercel Dashboard:**
   - Environment Variables tab → Is `VITE_WP_GRAPHQL_URL` set correctly?
   - Is it enabled for Production?
   
2. **Deployment Logs:**
   - Check recent deployment logs
   - Look for any errors or warnings about environment variables

3. **Browser Cache:**
   - Hard refresh the page (Cmd+Shift+R or Ctrl+Shift+R)
   - Or clear browser cache

## Most Likely Issue

The environment variable might not be set correctly in Vercel, or the deployment happened before it was set. Try clearing the build cache and redeploying first.
