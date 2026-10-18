# Md. Mizanur Rahaman — SEO Strategist Portfolio

A portfolio website crafted to mirror the design, interactive animations, and responsive aesthetics of [nahian.bd](https://nahian.bd/), tailored specifically for **Md. Mizanur Rahaman** — White Label SEO Strategist, Local & Ecommerce SEO, and AI Search (GEO/AEO) Specialist.

Built with **Astro 5** and **Tailwind CSS**, featuring ultra-fast static generation (100 Core Web Vitals Lighthouse score), dark/light mode toggle with theme persistence, Web Audio API sound effects, and zero-config deployment to **GitHub Pages** and **Vercel**.

---

## 🚀 Live Preview & Pages

- **`/` (Resume / Profile)**: Full professional overview, verified badge, live Asia/Dhaka local clock, interactive halo cards, comprehensive timeline experience at CrazyGraph & Markeion, top skills, tools matrix, certifications, and education.
- **`/work` (Case Studies & Results)**: Detailed breakdowns of signature client results (Shopify 300 → 1.9K+ clicks, UK Healthcare 7 GBPs, UK Taxi 300+ backlink recovery & Top 5 rank, UK Pharmacy 1,200+ calls).
- **`/services` (Services & Retainers)**: White label agency leadership, Google Business Profile domination, AI Search (GEO/AEO), Technical audits, and e-commerce SEO.
- **`/contact` (Direct Contact & Inquiry)**: Direct WhatsApp, Email, Phone, LinkedIn, and an interactive project inquiry form.

---

## 🛠️ Stack & Features

- **Framework**: [Astro 5](https://astro.build/) (Static Site Generation, zero unnecessary JavaScript)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with custom design tokens, halo lighting cards (`data-halo`), glowing ambient banners (`data-slats`), and glassmorphism.
- **View Transitions**: Built-in `<ClientRouter />` for instant app-like page navigation without full reloads.
- **Audio Micro-Interactions**: Custom Web Audio API synthesizer for delightful pop, click, and sparkle sounds with a toggle mute option.
- **SEO & Structured Data**: Built-in Schema.org `Person` JSON-LD, OpenGraph tags, Twitter cards, and `robots.txt`.

---

## 💻 Running Locally

1. Open PowerShell / Terminal in this project directory:
   ```bash
   cd d:\Vide-Coding\Portfolio
   ```

2. Install dependencies (already installed):
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:4321](http://localhost:4321) in your browser.

4. Build for production:
   ```bash
   npm run build
   ```
   Production HTML/CSS output is generated in `./dist`.

---

## 🌐 Deploy to Vercel (Recommended)

### Option A: Via GitHub (Automatic Continuous Deployment)
1. Push this project to a new repository on your GitHub account (see instructions below).
2. Go to [vercel.com](https://vercel.com) and log in.
3. Click **"Add New..."** → **"Project"**.
4. Select your GitHub repository.
5. Vercel will automatically detect **Astro**. The default settings (`npm run build` and `dist`) are already pre-configured in `vercel.json`.
6. Click **"Deploy"**. Your site will be live on a `*.vercel.app` domain in under 30 seconds!

### Option B: Via Vercel CLI
Run:
```bash
npx vercel
```
Follow the prompts in your terminal to deploy directly.

---

## 🐙 Deploy to GitHub Pages (100% Free Forever)

This project includes a ready-to-run GitHub Actions workflow (`.github/workflows/deploy.yml`):

1. Initialize git and push to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of portfolio"
   git branch -M main
   git remote add origin https://github.com/<YOUR-USERNAME>/<YOUR-REPO-NAME>.git
   git push -u origin main
   ```

2. In your GitHub repository:
   - Go to **Settings** → **Pages**.
   - Under **Build and deployment** → **Source**, select **"GitHub Actions"**.
   - GitHub will automatically trigger the workflow and publish your site!

---

## 📋 Information & Assets You Can Provide to Customize Further

Everything from your CV is already integrated! To personalize the website even further, you can add:

1. **Profile Photo**: 
   - Add your profile picture (e.g. `profile.webp` or `profile.jpg`) to the `public/` folder.
   - Replace the `MR` initials avatar in `src/pages/index.astro` and `src/components/Header.astro`.
2. **Downloadable PDF Resume**:
   - Place your PDF resume as `public/resume.pdf`. A "Download PDF" button can then directly link to `/resume.pdf`.
3. **Custom Domain**:
   - E.g. `mizanur.com` or `mizan.me`. You can easily attach your custom domain in Vercel under Project Settings → Domains.
4. **Google Analytics / GTM Tracking ID**:
   - If you want to track recruiter and agency visits, provide your GA4 `G-XXXXXXXXXX` measurement ID to embed in `BaseLayout.astro`.
5. **Additional Social / Portfolio Links**:
   - If you have an active Twitter/X, GitHub, or agency website link you'd like to feature alongside LinkedIn and WhatsApp.
