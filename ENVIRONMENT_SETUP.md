# Environment Configuration Guide

This project uses environment variables to manage different configurations for local development and production environments.

## Environment Variables

### Available Variables

- `VITE_WP_GRAPHQL_URL` - WordPress GraphQL API endpoint
- `VITE_ENV` - Environment identifier (development/production)

### Configuration Files

1. **`.env.example`** - Template file showing required environment variables (committed to git)
2. **`.env.local`** - Local development configuration (git-ignored, create from `.env.example`)
3. **`.env.production`** - Production configuration (if needed, git-ignored)

## Setup Instructions

### Local Development

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and set:
   ```env
   VITE_WP_GRAPHQL_URL=http://portfolio-backend.local/graphql
   VITE_ENV=development
   ```

3. Restart your dev server:
   ```bash
   npm run dev
   ```

### Production (Vercel)

1. In Vercel dashboard, go to your project settings
2. Navigate to "Environment Variables"
3. Add:
   - `VITE_WP_GRAPHQL_URL` = `https://backend.shadrach-tuck.dev/graphql`
   - `VITE_ENV` = `production`

## Using Configuration in Code

The configuration is centralized in `src/lib/config.js`:

```javascript
import { WP_GRAPHQL_URL, ENV, IS_DEVELOPMENT, IS_PRODUCTION, config } from './lib/config.js';

// Use the GraphQL URL
console.log(WP_GRAPHQL_URL);

// Check environment
if (IS_DEVELOPMENT) {
  console.log('Running in development mode');
}

// Or use the config object
console.log(config.wpGraphQLUrl);
```

## Git Branches

### Branch Strategy

- **`main`** - Production branch (deployed to Vercel)
- **`development`** - Development branch (local development)

### Workflow

1. Work on the `development` branch for local development
2. Merge `development` → `main` when ready for production
3. `main` branch is automatically deployed to Vercel

### Creating/Switching Branches

```bash
# Create and switch to development branch
git checkout -b development

# Switch to main branch
git checkout main

# Switch to development branch
git checkout development
```

## Troubleshooting

### Environment variables not working?

1. **Restart dev server** - Vite requires a restart to pick up new env vars
2. **Check variable prefix** - Vite requires `VITE_` prefix for client-side variables
3. **Verify file location** - `.env.local` must be in the project root
4. **Check .gitignore** - Ensure `.env.local` is git-ignored

### GraphQL URL not updating?

1. Verify `.env.local` has the correct URL
2. Restart the dev server (`npm run dev`)
3. Check browser console for the actual URL being used
4. Clear browser cache if needed

## Notes

- `.env.local` is git-ignored and should never be committed
- `.env.example` is committed and serves as a template
- Environment variables are available at build time and runtime
- Vite exposes env vars via `import.meta.env.VITE_*`
