# So Productions — Website

Premium Next.js 15 website for So Productions, a South African sound & event production company.

## Tech Stack
- **Next.js 15** App Router + TypeScript
- **Tailwind CSS v4** for styling
- **GSAP** with ScrollTrigger for animations
- **MongoDB** + Mongoose for data
- **Zod** for validation
- **JWT** for admin auth

## Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
```bash
cp .env.example .env.local
# Fill in all values in .env.local
```

### 3. Generate admin password hash
```bash
node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('YourPassword123!', 12).then(h => console.log(h))"
# Paste the output into ADMIN_PASSWORD_HASH in .env.local
```

### 4. Run development server
```bash
npm run dev
# Open http://localhost:3000
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Secret for JWT tokens (min 32 chars) |
| `ADMIN_EMAIL` | Admin login email |
| `ADMIN_PASSWORD_HASH` | Bcrypt hash of admin password |
| `NEXT_PUBLIC_SITE_URL` | Production URL (e.g. https://soproductions.co.za) |
| `GOOGLE_SITE_VERIFICATION` | Google Search Console verification code |
| `SMTP_HOST` | Email SMTP host |
| `SMTP_PORT` | Email SMTP port |
| `SMTP_USER` | Email sender address |
| `SMTP_PASS` | Email app password |

## Project Structure
```
so-productions/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Home page
│   ├── about/              # About page
│   ├── services/           # Services index + 6 detail pages
│   ├── works/              # Works/portfolio
│   ├── gallery/            # Gallery
│   ├── locations/          # Locations/SEO pages
│   ├── blog/               # Blog
│   ├── contact/            # Contact form
│   ├── admin/              # Admin dashboard (protected)
│   ├── api/                # API routes
│   ├── robots.ts           # SEO robots.txt
│   └── sitemap.ts          # SEO sitemap
├── components/
│   ├── sections/           # Page sections (Hero, Navbar, Footer…)
│   └── ui/                 # Reusable UI components
├── lib/                    # MongoDB, utils, schema
├── models/                 # Mongoose models
├── validations/            # Zod schemas
├── styles/                 # globals.css (Tailwind v4)
└── .env.example            # Environment variable template
```

## Deploy to Vercel

1. Push to GitHub
2. Import repo in Vercel dashboard
3. Set all environment variables from `.env.example`
4. Deploy — Vercel auto-detects Next.js

## Admin Panel
- URL: `/admin/login`
- Protected by JWT cookie (httpOnly, secure)
- Rate-limited login endpoint
- Dashboard at `/admin/dashboard`

## SEO
- Static metadata on all pages
- `robots.ts` and `sitemap.ts` auto-generated
- JSON-LD structured data (LocalBusiness, Organization, Service, Breadcrumb)
- Open Graph + Twitter cards on every page

## Adding Real Content
1. Connect MongoDB Atlas in `.env.local`
2. Use admin dashboard at `/admin/dashboard` to manage:
   - Blog posts
   - Services
   - Works/projects
   - Gallery items
   - Testimonials
   - Locations
3. Replace placeholder images in `/public/images/`
4. Update contact details in `Footer.tsx` and `contact/page.tsx`
5. Update WhatsApp number in `FinalCTA.tsx` and `Footer.tsx`
