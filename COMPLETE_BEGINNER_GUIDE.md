# SO PRODUCTIONS — Complete Step-by-Step Guide
# From fresh laptop to live website

---

## WHAT YOU NEED BEFORE STARTING
- The zip file (so-productions-complete.zip) downloaded
- Internet connection
- About 30-45 minutes

---

# PART 1: INSTALL THE TOOLS (Do this once)

---

## Step 1 — Install Node.js

1. Open your browser
2. Go to: https://nodejs.org
3. Click the big green button that says "LTS" (Long Term Support)
4. Download runs — open it when done
5. Click Next → Next → Next → Install → Finish
6. To check it worked: Press Windows key, type "cmd", press Enter
   Type this and press Enter:
   ```
   node -v
   ```
   You should see something like: v20.11.0
   If you see that, Node.js is installed ✅

---

## Step 2 — Install Git

1. Go to: https://git-scm.com/download/win
2. Click "Click here to download"
3. Open the installer → click Next all the way through → Install
4. This also installs "Git Bash" which you'll use instead of cmd

---

## Step 3 — Install VS Code (code editor)

1. Go to: https://code.visualstudio.com
2. Click "Download for Windows"
3. Open installer → Next → Next → Install
4. Open VS Code when done

---

# PART 2: SET UP THE PROJECT

---

## Step 4 — Extract the zip file

1. Find the file: so-productions-complete.zip
   (Probably in your Downloads folder)
2. Right-click it → "Extract All"
3. Choose where to put it — Desktop is fine
4. Click "Extract"
5. You'll see a folder called "so-productions" appear

---

## Step 5 — Open the project in VS Code

1. Open VS Code
2. Click "File" in the top menu
3. Click "Open Folder"
4. Find and select the "so-productions" folder
5. Click "Select Folder"
6. You'll see all the files listed on the left side

---

## Step 6 — Open the Terminal in VS Code

1. In VS Code, click "Terminal" in the top menu
2. Click "New Terminal"
3. A panel opens at the bottom of VS Code
4. Make sure it says "so-productions" in the path
   (If not, type: cd Desktop/so-productions and press Enter)

---

## Step 7 — Install project packages

In the VS Code terminal, type this exactly and press Enter:

```
npm install
```

This will download all the libraries the project needs.
It takes 2-5 minutes. You'll see lots of text scrolling.
Wait for it to finish — you'll see your cursor come back.

✅ When done, you'll see something like "added 847 packages"

---

# PART 3: SET UP MONGODB (Free Database)

---

## Step 8 — Create MongoDB Atlas account

1. Open your browser
2. Go to: https://cloud.mongodb.com
3. Click "Try Free"
4. Sign up with Google (easiest) or create an account
5. When asked what you're building — choose "Learn MongoDB"
6. Click "Finish"

---

## Step 9 — Create your free database

1. You'll see a page asking to create a cluster
2. Choose "M0" — it says FREE ✅
3. Provider: AWS
4. Region: Choose "eu-west-1" (Ireland) — closest free option to SA
5. Cluster Name: type "so-productions"
6. Click "Create Deployment"

---

## Step 10 — Create a database user

A popup will appear asking to create a user:

1. Username: soproductions
2. Password: Click "Autogenerate Secure Password"
3. IMPORTANT: Click "Copy" and save the password somewhere
   (Notepad, WhatsApp yourself, anywhere — you NEED this)
4. Click "Create Database User"
5. Click "Choose a connection method"

---

## Step 11 — Allow connections from anywhere

1. After creating user, you'll see "Network Access" setup
2. Click "Add My Current IP Address"
3. Then also click "Add IP Address" again
4. In the box, type: 0.0.0.0/0
5. Click "Confirm"
   (This allows Vercel to connect to your database)

---

## Step 12 — Get your connection string

1. Click "Drivers" (or "Connect" then "Drivers")
2. You'll see a connection string that looks like this:
   ```
   mongodb+srv://soproductions:<password>@cluster0.abc123.mongodb.net/?retryWrites=true&w=majority
   ```
3. Copy the whole thing
4. Replace <password> with your actual password from Step 10
5. Add the database name — change the end so it looks like:
   ```
   mongodb+srv://soproductions:YOURPASSWORD@cluster0.abc123.mongodb.net/so-productions?retryWrites=true&w=majority
   ```
6. Save this full string — you need it next

---

# PART 4: CONFIGURE THE PROJECT

---

## Step 13 — Create your settings file

In VS Code:
1. Look at the left sidebar — find the file called ".env.example"
2. Right-click it → "Copy"
3. Right-click the empty space below → "Paste"
4. Rename the copy to: .env.local
   (Right-click → Rename → type .env.local → press Enter)
5. Double-click .env.local to open it

---

## Step 14 — Fill in .env.local

Replace each line with your real values:

```
# Paste your MongoDB connection string from Step 12
MONGODB_URI=mongodb+srv://soproductions:YOURPASSWORD@cluster0.abc123.mongodb.net/so-productions?retryWrites=true&w=majority

# Go to https://generate-secret.vercel.app/64 — copy what it shows
JWT_SECRET=paste-the-64-character-string-here

# The email you'll use to log into the admin panel
ADMIN_EMAIL=yourname@gmail.com

# Leave this for now — you'll fill it in Step 15
ADMIN_PASSWORD_HASH=

# Leave this for now
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Leave blank
GOOGLE_SITE_VERIFICATION=
```

Save the file: Press Ctrl + S

---

## Step 15 — Create your admin password

In the VS Code terminal, paste this exactly and press Enter:

```
node -e "const b = require('bcryptjs'); b.hash('MyPassword123!', 12).then(h => console.log(h))"
```

IMPORTANT: Replace MyPassword123! with a password you'll remember.
Use a mix of letters, numbers and ! — save this password somewhere.

You'll see output like:
```
$2b$12$abc123xyz...very long string...
```

Copy that entire output (starting with $2b$12$)
Paste it as the value for ADMIN_PASSWORD_HASH in your .env.local file

Save again: Ctrl + S

---

# PART 5: RUN THE WEBSITE LOCALLY

---

## Step 16 — Start the website

In the VS Code terminal, type:

```
npm run dev
```

Wait about 30 seconds. You'll see:
```
▲ Next.js 15.x.x
- Local: http://localhost:3000
✓ Ready
```

---

## Step 17 — Open the website

1. Open your browser
2. Go to: http://localhost:3000
3. You should see the So Productions website! 🎉

Test these pages:
- http://localhost:3000 — Home page (with animations)
- http://localhost:3000/about — About page
- http://localhost:3000/services — Services
- http://localhost:3000/gallery — Gallery with photos
- http://localhost:3000/works — Projects with images
- http://localhost:3000/contact — Contact form
- http://localhost:3000/admin/login — Admin panel

For the admin panel, use:
- Email: whatever you put in ADMIN_EMAIL
- Password: whatever you typed in Step 15 (e.g. MyPassword123!)

---

# PART 6: PUT IT ON THE INTERNET (Free Hosting)

---

## Step 18 — Create a GitHub account

1. Go to: https://github.com
2. Click "Sign up"
3. Enter email, password, username
4. Verify your email

---

## Step 19 — Create a new repository on GitHub

1. Once logged in, click the "+" icon (top right)
2. Click "New repository"
3. Repository name: so-productions
4. Set to "Private"
5. Do NOT tick any checkboxes
6. Click "Create repository"
7. Keep this page open — you'll need the URL

---

## Step 20 — Push your code to GitHub

In the VS Code terminal (stop the running server first: press Ctrl+C):

Run these commands one by one, pressing Enter after each:

```
git init
```
```
git add .
```
```
git commit -m "So Productions website - initial commit"
```
```
git branch -M main
```
```
git remote add origin https://github.com/YOURGITHUBUSERNAME/so-productions.git
```
(Replace YOURGITHUBUSERNAME with your actual GitHub username)

```
git push -u origin main
```

It will ask for your GitHub username and password.
Note: For password, use a "Personal Access Token" not your GitHub password.
To create one: GitHub → Settings → Developer Settings → Personal Access Tokens → Tokens (classic) → Generate new token → tick "repo" → Generate → copy it → use as password.

---

## Step 21 — Create a Vercel account

1. Go to: https://vercel.com
2. Click "Sign Up"
3. Click "Continue with GitHub" — easiest option
4. Authorize Vercel to access GitHub
5. You'll land on the Vercel dashboard

---

## Step 22 — Deploy to Vercel

1. In Vercel dashboard, click "Add New..." → "Project"
2. You'll see your GitHub repos
3. Find "so-productions" → click "Import"
4. Vercel auto-detects Next.js — don't change Framework
5. BEFORE clicking Deploy — click "Environment Variables"

Add each variable one by one:

| Name | Value |
|------|-------|
| MONGODB_URI | your full connection string |
| JWT_SECRET | your 64-char string |
| ADMIN_EMAIL | your admin email |
| ADMIN_PASSWORD_HASH | your $2b$12$... hash |
| NEXT_PUBLIC_SITE_URL | https://so-productions.vercel.app (you'll update this after deploy) |

6. Click "Deploy"
7. Wait 2-3 minutes
8. You'll get a URL like: https://so-productions-abc123.vercel.app

---

## Step 23 — Update your site URL

1. Copy your Vercel URL (e.g. https://so-productions-abc123.vercel.app)
2. In Vercel → your project → "Settings" → "Environment Variables"
3. Find NEXT_PUBLIC_SITE_URL → click Edit
4. Paste your actual Vercel URL
5. Click Save
6. Go to "Deployments" → click the 3 dots on latest → "Redeploy"

---

## Step 24 — Your website is LIVE! 🎉

Share these links with your uncle:

- Website: https://so-productions-abc123.vercel.app
- Admin: https://so-productions-abc123.vercel.app/admin/login

---

# PART 7: SEO SETUP (Do this after site is live)

---

## Step 25 — Submit to Google

1. Go to: https://search.google.com/search-console
2. Sign in with Google
3. Click "Add Property"
4. Enter your website URL
5. Choose "URL prefix"
6. Verify by downloading the HTML file and adding to /public folder
   OR choose "Domain" verification via DNS
7. Once verified, click "Sitemaps" in left menu
8. Enter: sitemap.xml
9. Click Submit

Google will start indexing your site within a few days.

---

## Step 26 — Google Business Profile (Very Important for Local SEO)

1. Go to: https://business.google.com
2. Click "Manage now"
3. Search for "So Productions" — if not found, click "Add your business"
4. Fill in:
   - Business name: So Productions
   - Category: Sound Production Service (or Event Production Company)
   - Location: Add your address
   - Service areas: Johannesburg, Cape Town, etc.
   - Phone number: your uncle's number
   - Website: your Vercel URL
5. Verify the business (Google sends a postcard or calls)
6. Add photos of actual events
7. This makes you appear in Google Maps searches!

---

# PART 8: PERSONALISE THE WEBSITE

---

## Step 27 — Update contact details

Open VS Code and use Find & Replace (Ctrl+Shift+H) to replace:

| Find | Replace with |
|------|-------------|
| +27 (0) 00 000 0000 | real phone number |
| hello@soproductions.co.za | real email |
| 27000000000 | WhatsApp number without + or spaces |

Click "Replace All" for each one, then save files.

---

## Step 28 — Add real photos (when you have them)

When your uncle gives you real event photos:

1. Upload them to https://cloudinary.com (free account)
2. Get the image URL from Cloudinary
3. In VS Code, find Unsplash URLs (they start with images.unsplash.com)
4. Replace with your Cloudinary URLs
5. Push to GitHub → Vercel auto-deploys

---

## Step 29 — Update business info in schema

Open: lib/schema.ts

Update:
- address → real address
- latitude/longitude → real coordinates (get from Google Maps)
- telephone → real phone number

---

# QUICK REFERENCE

## To start working on the site:
1. Open VS Code
2. Open Terminal
3. Type: npm run dev
4. Open browser: http://localhost:3000

## To save changes to live site:
```
git add .
git commit -m "describe what you changed"
git push
```
Vercel auto-deploys in 2 minutes after each push.

## Admin panel:
- Local: http://localhost:3000/admin/login
- Live: https://yoursite.vercel.app/admin/login

## If something breaks:
```
npm run build
```
This shows you exactly what error to fix.

---

# WHAT'S ALREADY DONE FOR YOU IN THE CODE

✅ Full website with 15+ pages
✅ Premium dark gold design matching inspiration image
✅ GSAP animations (hero, scroll reveals, floating notes, counters)
✅ Real concert/studio photos from Unsplash (until real photos available)
✅ Contact form with validation
✅ Admin dashboard to manage content
✅ MongoDB database setup
✅ SEO: sitemap.xml auto-generated
✅ SEO: robots.txt auto-generated
✅ SEO: JSON-LD structured data for Google
✅ SEO: Open Graph (WhatsApp/Facebook sharing previews)
✅ SEO: Page-level meta titles and descriptions on every page
✅ Security headers
✅ Mobile responsive
✅ Privacy Policy page
✅ Terms of Service page
✅ All 6 service detail pages
✅ Works/portfolio with case studies
✅ Gallery with masonry grid
✅ Locations page (Johannesburg, Cape Town, Pretoria, Durban, etc.)
✅ Blog page
✅ Testimonials with auto-rotating slider
✅ WhatsApp integration button

# WHAT YOU STILL NEED TO DO

⬜ Replace placeholder phone number
⬜ Replace placeholder email
⬜ Replace placeholder WhatsApp number
⬜ Add real photos (when uncle provides them)
⬜ Update real address in lib/schema.ts
⬜ Submit sitemap to Google Search Console
⬜ Create Google Business Profile
⬜ Buy a domain (optional — e.g. soproductions.co.za via domains.co.za)

