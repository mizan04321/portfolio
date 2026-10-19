# Case Study Screenshot Placeholders

This folder contains the visual proof screenshots and placeholders for the **Case Studies & Results** page (`/work`).

## 📁 Files in this directory:

| Filename | Section / Category | Recommended Image Size | Format |
|---|---|---|---|
| `google-search-console.svg` (or `.png`) | **Google Search Console** | `1200 × 750` px (16:10 or 16:9) | PNG, JPG, or WebP |
| `google-business-profile.svg` (or `.png`) | **Google Business Profile** | `1200 × 750` px (16:10 or 16:9) | PNG, JPG, or WebP |
| `map-rankings.svg` (or `.png`) | **Map Rankings (Local Falcon)** | `1200 × 750` px (16:10 or 16:9) | PNG, JPG, or WebP |
| `google-analytics.svg` (or `.png`) | **Google Analytics (GA4)** | `1200 × 750` px (16:10 or 16:9) | PNG, JPG, or WebP |
| `leads.svg` (or `.png`) | **Leads & Inbound Conversions** | `1200 × 750` px (16:10 or 16:9) | PNG, JPG, or WebP |

---

## 🚀 How to Add or Replace Your Own Screenshots:

### Method 1: Drop & Replace (Zero code edits)
1. Export or take a screenshot from your dashboard (GSC, GBP, Local Falcon, GA4, or CRM/Lead sheet).
2. Save it as a PNG or SVG with the exact same name as above:
   * e.g. overwrite `google-search-console.svg` with your file, or rename your file to match.
3. Refresh your browser!

### Method 2: Custom Filename (Recommended)
1. Save your screenshot in this folder:
   * `public/images/case-studies/my-gsc-screenshot.png`
2. Open [`src/pages/work.astro`](../../src/pages/work.astro)
3. Locate the `proofSections` or `caseStudies` array near the top of the file:
   ```ts
   image: "/images/case-studies/my-gsc-screenshot.png",
   ```
4. Save the file. Astro updates automatically!
