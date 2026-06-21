# Smart Estate

Smart Estate is a modern real estate web application for discovering, listing, and exploring properties in Bangladesh. It combines premium property browsing, AI-assisted search, virtual tours, authentication, and admin-friendly property management into one Next.js platform.

Live site: https://smart-estate-topaz.vercel.app

## Overview

Smart Estate helps buyers, renters, agents, and property owners find better matches faster. Users can browse apartments, houses, villas, commercial spaces, and land, filter listings by important details, open property pages, and explore supported listings through 360 degree virtual walkthroughs.

The website is designed around the Bangladesh real estate market, with AI-powered property assistance, generated listing descriptions, verified-style listing presentation, and a polished responsive interface.

## Key Features

- Property discovery for apartments, houses, villas, commercial spaces, and land
- Search and filter experience for location, category, price, rating, and listing details
- Featured properties and category-based browsing
- Individual property detail pages
- 360 degree virtual tour experience with panoramic scene navigation
- AI property assistant for recommendations, market questions, and buyer guidance
- AI property description generator for real estate listing copy
- Login and registration flow with JWT-based authentication
- Admin/dashboard surfaces for real estate management workflows
- MongoDB-backed API routes for property and auth data
- Responsive light/dark themed interface

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- MongoDB and Mongoose
- JWT authentication
- React Hook Form and Zod
- Lucide React icons
- Photo Sphere Viewer for 360 tours
- Vercel deployment

## Pages

- `/` - Home page with hero search, featured listings, categories, stats, AI assistant CTA, insights, and newsletter section
- `/properties` - Property listing page with filters and grid/list controls
- `/properties/[id]` - Property details page
- `/properties/[id]/tour` - 360 degree virtual property walkthrough
- `/ai-chat` - AI property assistant
- `/ai-description` - AI listing description generator
- `/about` - Company story, mission, stats, and milestones
- `/contact` - Contact and inquiry page
- `/login` and `/register` - Authentication pages
- `/dashboard` and `/dashboard/admin` - Dashboard/admin views

## Getting Started

Install dependencies:

```bash
npm install
```

Create a `.env.local` file:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NEXT_PUBLIC_API_URL=http://localhost:3000/api
GOOGLE_AI_API_KEY=your_google_ai_api_key
```

Run the development server:

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Deployment

The project is configured for Vercel and currently deployed at:

https://smart-estate-topaz.vercel.app

Make sure the production environment variables are configured in Vercel before deploying.

## Project Focus

Smart Estate is built as a real estate platform, not just a landing page. The core experience is property discovery, intelligent guidance, listing management, and immersive property exploration for the Bangladesh market.
