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

## Deployment

Deploy to Vercel or your preferred hosting platform.

## Backend

Connects to the shared WordPress backend via WPGraphQL at the endpoint specified in `.env`.

