# Fix Vercel Environment Variable Issue

## Problem
The app is still trying to use `http://portfolio-backend.local/graphql` instead of the production URL, even though you set the environment variable in Vercel.

## Solution

### Step 1: Verify Environment Variable in Vercel

1. Go to your Vercel project dashboard
2. Navigate to: **Settings → Environment Variables**
3. Check that you have:
   - **Name:** `VITE_WP_GRAPHQL_URL`
   - **Value:** `https://backend.shadrach-tuck.dev/graphql`
   - **Environment:** Make sure it's set for **Production** (and Preview/Development if needed)

### Step 2: Redeploy the Application

After adding/updating the environment variable, you **must redeploy**:

1. Go to **Deployments** tab in Vercel
2. Click the **three dots (⋮)** on your latest deployment
3. Click **Redeploy**
4. Or: Make a small change to trigger a new deployment (like updating a comment in a file and pushing)

### Step 3: Verify the Build

After redeployment:
1. Check the deployment logs to ensure the environment variable is being read
2. Visit your site: https://shadrach-tuck.dev
3. Check the browser console - you should see requests to `https://backend.shadrach-tuck.dev/graphql` instead of the local URL

## Alternative: Force Production URL in Code

If the environment variable still doesn't work after redeploy, we can hardcode the production URL in the code (not recommended for flexibility, but works as a fallback).

## Troubleshooting

If it still doesn't work:
1. **Clear Vercel build cache:**
   - Settings → General → Clear Build Cache
   - Then redeploy

2. **Check deployment logs:**
   - Look for any errors about environment variables
   - Make sure VITE_ prefix is there (required for Vite)

3. **Verify the URL is correct:**
   - Test in browser: https://backend.shadrach-tuck.dev/graphql
   - Should return GraphQL schema/endpoint info

## Quick Fix Command

If you have Vercel CLI:
```bash
vercel env add VITE_WP_GRAPHQL_URL production
# Enter: https://backend.shadrach-tuck.dev/graphql
vercel --prod
```
