# Debug Environment Variable Issue

## The Problem

Even after pushing the code, the app is still trying to use `http://portfolio-backend.local/graphql` instead of the production URL.

## Possible Causes

1. **Environment variable is set but empty/wrong in Vercel**
   - If `VITE_WP_GRAPHQL_URL` exists but is empty or set to the old local URL
   - It will override the code default

2. **Environment variable format issue**
   - Trailing spaces, wrong value, or not set for Production environment

3. **Build cache issue**
   - Old build artifacts might still be cached

## Fix Steps

### Step 1: Check Vercel Environment Variables

Go to Vercel Dashboard:
1. Your Project → Settings → Environment Variables
2. Look for `VITE_WP_GRAPHQL_URL`
3. **If it exists**, check its value:
   - If it's empty or wrong → Delete it OR set it correctly
   - If it's correct → Make sure it's enabled for Production

### Step 2: Remove or Fix the Environment Variable

**Option A: Delete it (let code default work)**
- Delete `VITE_WP_GRAPHQL_URL` from Vercel
- The code default will be used: `https://backend.shadrach-tuck.dev/graphql`

**Option B: Set it correctly**
- Make sure value is exactly: `https://backend.shadrach-tuck.dev/graphql`
- No spaces, no trailing slash, HTTPS not HTTP
- Enabled for Production environment

### Step 3: Clear Build Cache and Redeploy

1. Vercel Dashboard → Settings → General → **Clear Build Cache**
2. Deployments → Latest → **Redeploy**

### Step 4: Hardcode as Last Resort

If the environment variable keeps causing issues, we can temporarily hardcode the production URL in the code (bypassing env var completely).

## Check Production Endpoint

Test if the endpoint is accessible:
```bash
curl https://backend.shadrach-tuck.dev/graphql
```

Should return GraphQL schema/endpoint info.

## Verify in Browser Console

After redeploying, check browser console:
- Should see: `GraphQL URL: https://backend.shadrach-tuck.dev/graphql`
- Should NOT see requests to `portfolio-backend.local`
