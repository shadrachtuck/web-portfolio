# Web Development Portfolio

Focused React portfolio application showcasing web development and software projects.

## Purpose

This is a streamlined portfolio site specifically for web/software development job applications. It displays only web development projects from the shared WordPress backend.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment:
```bash
cp .env.example .env
# Update VITE_WP_GRAPHQL_URL with your WordPress GraphQL endpoint
```

3. Start development server:
```bash
npm run dev
```

## Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Deployment

Deploy to Vercel or your preferred hosting platform.

### Vercel Deployment

1. Connect this repository to Vercel
2. Add environment variable: `VITE_WP_GRAPHQL_URL` with your production WordPress GraphQL endpoint
3. Deploy

## Backend

Connects to the shared WordPress backend via WPGraphQL at the endpoint specified in `.env`.

The backend repository: https://github.com/shadrachtuck/portfolio-backend.git

### Backend Connection

The portfolio fetches web projects from the WordPress backend using WPGraphQL. The Work section displays projects from the `web_project` custom post type.

**GraphQL Endpoint Configuration:**
- Default: `http://portfolio-backend.local/graphql` (Local by Flywheel)
- Set `VITE_WP_GRAPHQL_URL` in your `.env` file to point to your WordPress GraphQL endpoint
- The endpoint should be: `https://your-site.com/graphql` for production

**Available Data:**
- Web Projects (displayed in Work section)
  - Title, excerpt, featured image
  - Technology stack
  - Client, year
  - Project URL, GitHub URL
  - Screenshots gallery

The app uses the `useWebProjects` hook from `src/hooks/useWordPressData.js` to fetch data from the backend.

