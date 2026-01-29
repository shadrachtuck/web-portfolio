# Quick Start - Environment Setup

## ✅ What's Been Set Up

1. **Environment Variables Configuration**
   - Created `src/lib/config.js` - Centralized config accessible across codebase
   - Created `.env.example` - Template for environment variables
   - Created `.env.local` - Local development configuration (git-ignored)

2. **GraphQL URL Configuration**
   - Updated `src/lib/graphql.js` to use environment variables
   - Automatically switches between local and production based on `.env.local`

3. **Git Branches**
   - `main` - Production branch
   - `development` - Development branch (currently checked out)

## 🚀 Quick Start

### For Local Development

1. **Verify `.env.local` exists and has:**
   ```env
   VITE_WP_GRAPHQL_URL=http://portfolio-backend.local/graphql
   VITE_ENV=development
   ```

2. **Restart your dev server:**
   ```bash
   npm run dev
   ```

3. **The app will now use the local GraphQL endpoint automatically!**

### For Production (Vercel)

1. **Set environment variables in Vercel:**
   - `VITE_WP_GRAPHQL_URL` = `https://backend.shadrach-tuck.dev/graphql`
   - `VITE_ENV` = `production`

2. **Deploy from `main` branch**

## 📝 Using Config in Your Code

```javascript
// Import what you need
import { WP_GRAPHQL_URL, IS_DEVELOPMENT, config } from './lib/config.js';

// Use the GraphQL URL (already done in graphql.js)
console.log(WP_GRAPHQL_URL);

// Check environment
if (IS_DEVELOPMENT) {
  // Development-only code
}

// Or use the full config object
console.log(config.wpGraphQLUrl);
console.log(config.env);
```

## 🔄 Git Workflow

```bash
# Work on development branch
git checkout development

# When ready for production
git checkout main
git merge development
git push origin main  # Auto-deploys to Vercel
```

## 📚 More Details

See `ENVIRONMENT_SETUP.md` for complete documentation.
