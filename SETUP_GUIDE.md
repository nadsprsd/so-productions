# So Productions — Complete Setup & Deployment Guide

---

## STEP 1: Prerequisites — Install These First

### On Windows 11 (your machine):
1. **Node.js** — Download from https://nodejs.org (choose "LTS" version)
   - After install, open Git Bash and type: `node -v` — should show v20+
2. **Git** — Download from https://git-scm.com/download/win
3. **VS Code** — Download from https://code.visualstudio.com
4. **Git Bash** — Comes with Git install above (use this instead of CMD)

---

## STEP 2: Set Up the Project Locally

Open Git Bash and run:

```bash
# Navigate to where you want the project
cd ~/Desktop

# Extract the zip (or use Windows right-click > Extract All)
# Then go into the folder:
cd so-productions

# Install all packages (takes 1-3 minutes)
npm install
```

---

## STEP 3: Set Up MongoDB Atlas (Free Cloud Database)

### 3a. Create Free Account
1. Go to **https://cloud.mongodb.com**
2. Click "Try Free" → sign up with Google or email
3. Choose **FREE tier (M0)** — it's free forever for small projects

### 3b. Create a Cluster
1. After signup → click "Create" → choose **M0 FREE**
2. Pick a region (choose closest to South Africa — e.g. AWS eu-west-1)
3. Give it a name: `so-productions`
4. Click "Create Deployment"

### 3c. Create Database User
1. When prompted, create a username & password
   - Username: `soproductions`  
   - Password: make a strong one, **save it — you'll need it**
2. Click "Create Database User"

### 3d. Allow Your IP Address
1. Click "Add My Current IP Address"
2. Also add `0.0.0.0/0` (allows Vercel to connect) → click "Add Entry"
3. Click "Finish and Close"

### 3e. Get Your Connection String
1. In Atlas dashboard → click "Connect" on your cluster
2. Choose "Drivers"
3. Copy the connection string — looks like:
   ```
   mongodb+srv://soproductions:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
4. Replace `<password>` with your actual password
5. Add your database name before the `?`:
   ```
   mongodb+srv://soproductions:yourpassword@cluster0.xxxxx.mongodb.net/so-productions?retryWrites=true&w=majority
   ```

---

## STEP 4: Create Environment Variables

In the project folder, create a file called `.env.local`:

```bash
# In Git Bash inside the so-productions folder:
cp .env.example .env.local
```

Then open `.env.local` in VS Code and fill in:

```env
# Your MongoDB connection string from Step 3e
MONGODB_URI=mongodb+srv://soproductions:yourpassword@cluster0.xxxxx.mongodb.net/so-productions?retryWrites=true&w=majority

# Make this a long random string (go to https://generate-secret.vercel.app/64 for one)
JWT_SECRET=paste-a-64-character-random-string-here

# Your admin login email
ADMIN_EMAIL=admin@soproductions.co.za

# Generate this in Step 5 below
ADMIN_PASSWORD_HASH=paste-bcrypt-hash-here

# Your website URL (use this for local testing)
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Leave blank for now
GOOGLE_SITE_VERIFICATION=
```

---

## STEP 5: Create Your Admin Password

In Git Bash (inside the project folder):

```bash
node -e "const b = require('bcryptjs'); b.hash('YourChosenPassword123!', 12).then(h => console.log('COPY THIS:', h))"
```

Copy the output that starts with `$2b$12$...` and paste it as `ADMIN_PASSWORD_HASH` in `.env.local`

> **Save your password somewhere safe — you'll use it to log into /admin/login**

---

## STEP 6: Run Locally (Test Before Deploying)

```bash
npm run dev
```

Open your browser: **http://localhost:3000**

You should see the full So Productions website! Test:
- ✅ Home page loads with animations
- ✅ All nav links work
- ✅ Contact form at /contact
- ✅ Admin login at /admin/login (use your email + password from Step 5)
- ✅ Admin dashboard at /admin/dashboard

---

## STEP 7: Push to GitHub

### 7a. Create GitHub Account
Go to **https://github.com** and create a free account if you don't have one.

### 7b. Create a New Repository
1. Click the **+** icon → "New repository"
2. Name it: `so-productions`
3. Keep it **Private**
4. **Don't** tick "Add README"
5. Click "Create repository"

### 7c. Push Your Code
In Git Bash inside the project folder:

```bash
git init
git add .
git commit -m "Initial commit — So Productions website"
git branch -M main
git remote add origin https://github.com/YOURUSERNAME/so-productions.git
git push -u origin main
```

Replace `YOURUSERNAME` with your actual GitHub username.

---

## STEP 8: Deploy to Vercel (Free Hosting)

### 8a. Create Vercel Account
Go to **https://vercel.com** → "Sign Up" → **Sign up with GitHub** (easiest)

### 8b. Import Your Project
1. In Vercel dashboard → click "Add New..." → "Project"
2. Find `so-productions` in your GitHub repos → click "Import"
3. Framework will auto-detect as **Next.js** — don't change anything

### 8c. Add Environment Variables
Before clicking "Deploy", click **"Environment Variables"** and add ALL of these:

| Name | Value |
|------|-------|
| `MONGODB_URI` | Your full MongoDB connection string |
| `JWT_SECRET` | Your 64-char random string |
| `ADMIN_EMAIL` | Your admin email |
| `ADMIN_PASSWORD_HASH` | Your bcrypt hash |
| `NEXT_PUBLIC_SITE_URL` | https://your-project.vercel.app (update after deploy) |

### 8d. Deploy
Click **"Deploy"** — wait 2-3 minutes.

You'll get a URL like: `https://so-productions-abc123.vercel.app`

**Update `NEXT_PUBLIC_SITE_URL`** in Vercel → Settings → Environment Variables with this URL, then redeploy.

---

## STEP 9: Connect a Custom Domain (Optional)

1. In Vercel dashboard → your project → "Settings" → "Domains"
2. Add your domain: e.g. `soproductions.co.za`
3. Vercel gives you DNS records to add to your domain registrar
4. Typical DNS records:
   - Type: `A`, Name: `@`, Value: `76.76.21.21`
   - Type: `CNAME`, Name: `www`, Value: `cname.vercel-dns.com`
5. DNS propagation takes up to 48 hours

---

## STEP 10: SEO Setup (After Going Live)

### 10a. Google Search Console
1. Go to **https://search.google.com/search-console**
2. Add your domain as a property
3. Verify via DNS (recommended) or HTML tag
4. Submit your sitemap: `https://yourdomain.com/sitemap.xml`

### 10b. Update GOOGLE_SITE_VERIFICATION
1. In Search Console → Settings → Ownership verification
2. Copy the meta tag content value
3. Add to Vercel env vars: `GOOGLE_SITE_VERIFICATION=your-code`
4. Redeploy

### 10c. Google Business Profile
1. Go to **https://business.google.com**
2. Add "So Productions" as a business
3. Add: address, phone, hours, website URL, category (Sound Production Service)
4. Upload photos of your actual work
5. This is crucial for local SEO in Johannesburg / Cape Town

### 10d. What's Already Configured in the Code
- ✅ `robots.txt` auto-generated at `/robots.txt`
- ✅ `sitemap.xml` auto-generated at `/sitemap.xml`
- ✅ JSON-LD structured data: LocalBusiness, Organization, Service, Breadcrumb schemas
- ✅ Open Graph tags (Facebook/WhatsApp sharing previews)
- ✅ Twitter Card tags
- ✅ Canonical URLs via `metadataBase`
- ✅ Per-page SEO metadata on every page
- ✅ Performance: Next.js Image optimization, lazy loading
- ✅ Security headers (HSTS, X-Frame-Options, etc.)

---

## STEP 11: Replace Demo Images With Real Photos

All images currently use free Unsplash photos. To use real So Productions photos:

1. Upload photos to **Cloudinary** (free at cloudinary.com) or keep in `/public/images/`
2. In each component, replace Unsplash URLs with your image URLs
3. Key files to update:
   - `components/sections/HeroSection.tsx` — hero background
   - `components/sections/AboutPreview.tsx` — studio/engineer photo  
   - `app/about/page.tsx` — founder + studio photos
   - `app/gallery/page.tsx` — all 12 gallery images
   - `app/works/page.tsx` — 3 project cover images

### Recommended Free Image Sizes:
- Hero background: 1920×1080px
- Gallery items: 800×600px
- About photo: 600×800px
- Works cover: 1200×500px

---

## STEP 12: Customise Real Content

### Update Contact Details
Search for `+27 (0) 00 000 0000` and replace with real phone number in:
- `components/sections/Footer.tsx`
- `app/contact/page.tsx`
- `components/sections/TrustSection.tsx`

Search for `hello@soproductions.co.za` and update in same files.

Update WhatsApp link `https://wa.me/27000000000` with real number.

### Update Business Info
- `lib/schema.ts` — Update address, phone, coordinates
- `app/layout.tsx` — Update site description

---

## Quick Reference: Important URLs

| Page | URL |
|------|-----|
| Home | `/` |
| About | `/about` |
| Services | `/services` |
| Sound Engineering | `/services/sound-engineering` |
| Music Production | `/services/music-production` |
| DJ Services | `/services/dj-services` |
| Stage Sound | `/services/stage-sound` |
| School Events | `/services/school-event-sound` |
| Guitar Support | `/services/guitar-support` |
| Works | `/works` |
| Gallery | `/gallery` |
| Blog | `/blog` |
| Locations | `/locations` |
| Contact | `/contact` |
| Admin Login | `/admin/login` |
| Admin Dashboard | `/admin/dashboard` |
| Sitemap | `/sitemap.xml` |
| Robots | `/robots.txt` |
| Privacy Policy | `/privacy-policy` |
| Terms | `/terms-of-service` |

---

## Common Issues & Fixes

**"Module not found" error after npm install**
```bash
rm -rf node_modules
npm install
```

**MongoDB connection error**
- Double-check your connection string has the password replaced
- Make sure `0.0.0.0/0` is in MongoDB Atlas → Network Access

**Admin login not working**
- Re-run the bcrypt command in Step 5 and re-paste the hash in `.env.local`
- Make sure there are no spaces in the hash

**Images not loading on Vercel**
- Check that `NEXT_PUBLIC_SITE_URL` is set to your actual domain in Vercel env vars

**Build fails on Vercel**
- Run `npm run build` locally first — it will show the exact error
- Fix TypeScript errors shown in the output

---

## Production Checklist Before Showing Demo

- [ ] `npm run dev` works on your machine
- [ ] Home page animations play correctly
- [ ] Contact form submits successfully
- [ ] Admin login works at `/admin/login`
- [ ] All service pages load
- [ ] Gallery shows images
- [ ] Pushed to GitHub
- [ ] Deployed to Vercel
- [ ] Env vars set in Vercel
- [ ] Site URL updated in `NEXT_PUBLIC_SITE_URL`

