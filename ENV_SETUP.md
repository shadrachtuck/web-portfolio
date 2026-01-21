# Environment Variable Setup

## Production API Endpoint

The frontend is now configured to use the production WordPress backend by default.

### Current Configuration

**Production URL:** `https://backend.shadrach-tuck.dev/graphql`

The default URL in `src/lib/graphql.js` has been updated to point to production.

## For Local Development

If you need to develop locally, create a `.env` file in the root of `portfolio-webdev/`:

```bash
# .env
VITE_WP_GRAPHQL_URL=http://portfolio-backend.local/graphql
```

This will override the production default when running `npm run dev`.

## For Vercel Deployment

If deploying to Vercel, add the environment variable in your Vercel project settings:

1. Go to your Vercel project dashboard
2. Settings → Environment Variables
3. Add:
   - **Name:** `VITE_WP_GRAPHQL_URL`
   - **Value:** `https://backend.shadrach-tuck.dev/graphql`
   - **Environment:** Production, Preview, Development (select all)

This ensures the production API is used in all deployments.

## Verify Connection

After updating, test the connection by:
1. Running the dev server: `npm run dev`
2. Checking the browser console for any GraphQL errors
3. Verifying projects load in the Work section
