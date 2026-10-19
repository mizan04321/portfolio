import fs from 'fs';
import path from 'path';

// Helper to generate 7-char random hex IDs for Elementor
function genId() {
  return Math.random().toString(16).substring(2, 9);
}

// Complete embedded styles matching nahian.bd
const customCSS = `
<style>
/* Scoped Font & Variables */
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap');

:root {
  --mz-surface: #ffffff;
  --mz-surface-2: #f8faf9;
  --mz-surface-3: #f0f4f2;
  --mz-line: #e2e8e5;
  --mz-line-strong: #cbd5e1;
  --mz-ink: #0f172a;
  --mz-ink-2: #475569;
  --mz-ink-3: #64748b;
  --mz-brand-400: #22a86a;
  --mz-brand-500: #0f9459;
  --mz-brand-600: #0a7f4f;
  --mz-brand-700: #08673f;
  --mz-radius: 1.25rem;
}

@media (prefers-color-scheme: dark) {
  :root {
    --mz-surface: #0b0f0d;
    --mz-surface-2: #131a16;
    --mz-surface-3: #1c2620;
    --mz-line: #223129;
    --mz-line-strong: #2f4338;
    --mz-ink: #f8fafc;
    --mz-ink-2: #94a3b8;
    --mz-ink-3: #64748b;
  }
}

.mz-wrapper {
  font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
  color: var(--mz-ink);
  line-height: 1.6;
  max-width: 900px;
  margin: 0 auto;
  padding: 0 1rem 4rem;
}

/* Slats Animated Cover */
.mz-cover {
  position: relative;
  height: 180px;
  border-radius: var(--mz-radius);
  overflow: hidden;
  background: linear-gradient(135deg, #063f29 0%, #0a7f4f 50%, #2dd4bf 100%);
  margin-bottom: -55px;
  box-shadow: 0 10px 30px -10px rgba(15, 148, 89, 0.4);
}

.mz-cover-blob {
  position: absolute;
  border-radius: 9999px;
  filter: blur(40px);
  opacity: 0.65;
  animation: mz-drift 18s ease-in-out infinite alternate;
}

@keyframes mz-drift {
  0% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(25px, -15px) scale(1.15); }
  100% { transform: translate(-20px, 20px) scale(0.9); }
}

/* Avatar & Profile */
.mz-profile-header {
  text-align: center;
  position: relative;
  z-index: 2;
  margin-bottom: 2rem;
}

.mz-avatar-box {
  display: inline-block;
  position: relative;
}

.mz-avatar {
  width: 104px;
  height: 104px;
  border-radius: 9999px;
  border: 4px solid var(--mz-surface);
  background: linear-gradient(135deg, #0f9459, #34d399);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.2rem;
  font-weight: 800;
  box-shadow: 0 12px 30px -10px rgba(0,0,0,0.25);
  margin: 0 auto;
}

.mz-verified-badge {
  position: absolute;
  bottom: 4px;
  right: 6px;
  background: #0f9459;
  color: #fff;
  width: 22px;
  height: 22px;
  border-radius: 9999px;
  border: 2px solid var(--mz-surface);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 900;
}

.mz-name {
  font-size: 1.85rem;
  font-weight: 800;
  letter-spacing: -0.025em;
  margin: 0.75rem 0 0.25rem;
  color: var(--mz-ink);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.mz-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--mz-brand-600);
  margin-bottom: 0.75rem;
}

.mz-status-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(15, 148, 89, 0.1);
  color: var(--mz-brand-600);
  border: 1px solid rgba(15, 148, 89, 0.25);
  padding: 0.35rem 0.85rem;
  border-radius: 9999px;
  font-size: 0.78rem;
  font-weight: 600;
  text-decoration: none;
}

.mz-pulse-dot {
  width: 8px;
  height: 8px;
  border-radius: 9999px;
  background: var(--mz-brand-500);
  box-shadow: 0 0 0 0 rgba(15, 148, 89, 0.7);
  animation: mz-pulse 2s infinite;
}

@keyframes mz-pulse {
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(15, 148, 89, 0.7); }
  70% { transform: scale(1); box-shadow: 0 0 0 8px rgba(15, 148, 89, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(15, 148, 89, 0); }
}

.mz-meta-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  font-size: 0.85rem;
  color: var(--mz-ink-2);
  margin-top: 0.75rem;
}

/* Pills Stack */
.mz-pills-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  justify-content: center;
  margin-top: 1.25rem;
}

.mz-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.25rem 0.65rem;
  border-radius: 9999px;
  font-size: 0.78rem;
  font-weight: 500;
  background: var(--mz-surface-2);
  border: 1px solid var(--mz-line);
  color: var(--mz-ink);
  transition: transform 0.15s, border-color 0.15s;
}

.mz-pill:hover {
  transform: translateY(-1px);
  border-color: var(--mz-line-strong);
}

.mz-pill-ai {
  border-color: rgba(15, 148, 89, 0.35);
  background: linear-gradient(180deg, var(--mz-surface-2), var(--mz-surface-3));
}

/* Halo Card Effect */
.mz-card {
  background: var(--mz-surface);
  border: 1px solid var(--mz-line);
  border-radius: var(--mz-radius);
  padding: 1.5rem;
  box-shadow: 0 4px 20px -8px rgba(0, 0, 0, 0.05);
  transition: transform 0.25s, box-shadow 0.25s, border-color 0.25s;
  position: relative;
  overflow: hidden;
}

.mz-card:hover {
  transform: translateY(-2px);
  border-color: var(--mz-line-strong);
  box-shadow: 0 12px 28px -10px rgba(0, 0, 0, 0.1);
}

.mz-card-halo {
  position: relative;
}

.mz-card-halo::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  background: conic-gradient(from 180deg, #22a86a, transparent 30%, #10b981 70%, transparent 95%);
  z-index: -1;
  opacity: 0.25;
  filter: blur(12px);
  transition: opacity 0.3s;
}

.mz-card-halo:hover::before {
  opacity: 0.6;
}

/* Grid Layouts */
.mz-grid-2 {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
  margin: 1.5rem 0;
}

.mz-grid-4 {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 0.75rem;
  margin: 1.25rem 0;
}

/* Typography & Headings */
.mz-section-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--mz-ink);
  letter-spacing: -0.015em;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 2rem 0 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--mz-line);
}

.mz-stat-number {
  font-size: 1.75rem;
  font-weight: 800;
  color: var(--mz-brand-600);
  line-height: 1;
}

.mz-stat-label {
  font-size: 0.75rem;
  color: var(--mz-ink-3);
  margin-top: 0.25rem;
}

/* Timeline */
.mz-timeline {
  position: relative;
  padding-left: 1.75rem;
  border-left: 2px solid var(--mz-line);
  margin: 1.5rem 0;
}

.mz-timeline-item {
  position: relative;
  margin-bottom: 2rem;
}

.mz-timeline-dot {
  position: absolute;
  left: -2.35rem;
  top: 0.25rem;
  width: 14px;
  height: 14px;
  border-radius: 9999px;
  background: var(--mz-surface);
  border: 3px solid var(--mz-brand-500);
}

.mz-role-title {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--mz-ink);
  margin: 0;
}

.mz-company-sub {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--mz-brand-600);
  margin: 0.15rem 0 0.5rem;
}

.mz-desc {
  font-size: 0.875rem;
  color: var(--mz-ink-2);
  margin-bottom: 0.75rem;
}

/* Buttons */
.mz-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.6rem 1.25rem;
  border-radius: 0.75rem;
  font-size: 0.85rem;
  font-weight: 600;
  text-decoration: none;
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
}

.mz-btn:hover {
  transform: translateY(-1px);
}

.mz-btn-primary {
  background: linear-gradient(180deg, #22a86a, #0a7f4f);
  color: #ffffff !important;
  box-shadow: 0 4px 14px rgba(10, 127, 79, 0.4);
}

.mz-btn-secondary {
  background: var(--mz-surface-2);
  color: var(--mz-ink) !important;
  border: 1px solid var(--mz-line);
}
</style>
`;

// HTML content for Hero section
const heroHTML = `
${customCSS}
<div class="mz-wrapper">
  <!-- Slats Banner -->
  <div class="mz-cover">
    <div class="mz-cover-blob" style="background:#34d399; width:220px; height:220px; top:-40px; left:-20px;"></div>
    <div class="mz-cover-blob" style="background:#0f9459; width:200px; height:200px; top:20px; right:10px;"></div>
    <div class="mz-cover-blob" style="background:#5eead4; width:180px; height:180px; bottom:-30px; left:40%;"></div>
  </div>

  <!-- Profile Header -->
  <div class="mz-profile-header">
    <div class="mz-avatar-box">
      <div class="mz-avatar">MR</div>
      <div class="mz-verified-badge" title="Verified Professional">✓</div>
    </div>

    <h1 class="mz-name">
      Md. Mizanur Rahaman
      <span style="color:#0f9459; font-size:1.4rem;">●</span>
    </h1>

    <div class="mz-title">
      White Label SEO Strategist | Local & Ecommerce SEO | AI Search (GEO/AEO) Specialist
    </div>

    <a href="#mz-contact" class="mz-status-pill">
      <span class="mz-pulse-dot"></span>
      Available 6–8 hrs/day for Remote, Full-time, Team Lead & Consulting Roles
    </a>

    <div class="mz-meta-row">
      <span>🏢 Senior SEO Executive & Team Lead at <strong>CrazyGraph Marketing Agency</strong></span>
      <span>📍 Chittagong, Bangladesh (GMT+6)</span>
    </div>

    <!-- AI Search Tools -->
    <div class="mz-pills-wrap">
      <span class="mz-pill mz-pill-ai">🤖 ChatGPT</span>
      <span class="mz-pill mz-pill-ai">⚡ Claude</span>
      <span class="mz-pill mz-pill-ai">💻 Claude Code</span>
      <span class="mz-pill mz-pill-ai">🚀 Antigravity 2.0</span>
      <span class="mz-pill mz-pill-ai">✨ Gemini</span>
      <span class="mz-pill mz-pill-ai">🔍 Perplexity</span>
      <span class="mz-pill mz-pill-ai">🧠 Grok</span>
    </div>

    <!-- SEO Tools -->
    <div class="mz-pills-wrap" style="margin-top:0.5rem;">
      <span class="mz-pill">Screaming Frog</span>
      <span class="mz-pill">Ahrefs</span>
      <span class="mz-pill">Semrush</span>
      <span class="mz-pill">Moz</span>
      <span class="mz-pill">Surfer SEO</span>
      <span class="mz-pill">Google Search Console</span>
      <span class="mz-pill">GA4</span>
      <span class="mz-pill">WordPress</span>
      <span class="mz-pill">Shopify</span>
      <span class="mz-pill">Schema.org</span>
    </div>

    <div style="margin-top: 1.5rem; display:flex; gap:0.75rem; justify-content:center;">
      <a href="#mz-contact" class="mz-btn mz-btn-primary">Get in Touch</a>
      <a href="https://www.linkedin.com/in/mizan-seo/" target="_blank" class="mz-btn mz-btn-secondary">LinkedIn Profile</a>
    </div>
  </div>
</div>
`;

// HTML for Quick Facts & Highlights
const highlightsHTML = `
<div class="mz-wrapper" style="padding-top:0;">
  <div class="mz-grid-4">
    <div class="mz-card">
      <div class="mz-stat-number">1,200+</div>
      <div class="mz-stat-label">Calls via GBP in 5 Mos (UK)</div>
    </div>
    <div class="mz-card">
      <div class="mz-stat-number">30+</div>
      <div class="mz-stat-label">Managed SEO Projects</div>
    </div>
    <div class="mz-card">
      <div class="mz-stat-number">3×</div>
      <div class="mz-stat-label">Organic Ranking Growth</div>
    </div>
    <div class="mz-card">
      <div class="mz-stat-number">1.9K+</div>
      <div class="mz-stat-label">Shopify Organic Clicks in 90d</div>
    </div>
  </div>

  <div class="mz-grid-2">
    <div class="mz-card mz-card-halo">
      <h3 style="font-size:1rem; font-weight:700; margin-top:0;">📍 Based in Chittagong, Bangladesh</h3>
      <p style="font-size:0.85rem; color:var(--mz-ink-2); margin-top:0.25rem;">
        Asia/Dhaka timezone (GMT+6). Flexible overlap with US, UK, and European business hours for seamless real-time or asynchronous coordination.
      </p>
      <div style="display:inline-block; margin-top:0.5rem; font-size:0.75rem; font-weight:600; color:#0a7f4f; background:rgba(15,148,89,0.1); padding:0.2rem 0.6rem; border-radius:6px;">
        Local Time: GMT+6 Active
      </div>
    </div>

    <div class="mz-card mz-card-halo">
      <h3 style="font-size:1rem; font-weight:700; margin-top:0;">🌐 Remote-First & White Label Ready</h3>
      <p style="font-size:0.85rem; color:var(--mz-ink-2); margin-top:0.25rem;">
        Experienced executing under strict agency non-disclosure agreements (NDAs) with client-branded reporting, transparent communication, and structured SOPs.
      </p>
      <div style="display:flex; gap:0.4rem; flex-wrap:wrap; margin-top:0.5rem;">
        <span class="mz-pill">✓ US Hours</span>
        <span class="mz-pill">✓ UK & EU Hours</span>
        <span class="mz-pill">✓ Async Friendly</span>
      </div>
    </div>
  </div>
</div>
`;

// HTML for Timeline & Experience
const experienceHTML = `
<div class="mz-wrapper" style="padding-top:0;">
  <h2 class="mz-section-title">
    💼 Professional Experience
  </h2>

  <div class="mz-timeline">
    <!-- Role 1 -->
    <div class="mz-timeline-item">
      <div class="mz-timeline-dot"></div>
      <h3 class="mz-role-title">Senior SEO Executive & Team Lead</h3>
      <div class="mz-company-sub">CrazyGraph Marketing Agency – Bangladesh (In-house) · Nov 2024 – Present</div>
      <p class="mz-desc">
        Managing 30+ SEO projects across local, national, multilingual, multi-location, and B2B campaigns in healthcare and other industries across the USA, UK, and UAE under strict client confidentiality.
      </p>
      <ul style="font-size:0.85rem; color:var(--mz-ink-2); padding-left:1.2rem; margin:0 0 0.75rem 0;">
        <li>Developed personalized SOPs and client-specific SEO frameworks driving measurable organic growth within 3–6 months.</li>
        <li>Implemented AI-powered SEO strategies to improve visibility across Google SERPs, AI Overviews, AI Mode, and LLM platforms (ChatGPT, Grok, Claude).</li>
      </ul>
    </div>

    <!-- Role 2 -->
    <div class="mz-timeline-item">
      <div class="mz-timeline-dot"></div>
      <h3 class="mz-role-title">Freelance SEO Executive (Project Basis)</h3>
      <div class="mz-company-sub">Valley Industry Supply – USA (Remote) · May 2026 – Present</div>
      <p class="mz-desc">
        Built Google Business Profile and authoritative link-building strategies for a prominent B2B manufacturing firm, significantly expanding organic reach across the USA and Mexico.
      </p>
    </div>

    <!-- Role 3 -->
    <div class="mz-timeline-item">
      <div class="mz-timeline-dot"></div>
      <h3 class="mz-role-title">Freelance Technical SEO Strategist</h3>
      <div class="mz-company-sub">Ramies Taxi – UK (Remote) · Jan 2025 – Jun 2025</div>
      <p class="mz-desc">
        Audited and resolved deep technical SEO issues using GSC, Semrush, and Screaming Frog. Identified and disavowed 300+ harmful backlinks, driving a <strong>3× improvement in organic rankings</strong> and pushing target keywords into Top 5 results.
      </p>
    </div>

    <!-- Role 4 -->
    <div class="mz-timeline-item">
      <div class="mz-timeline-dot"></div>
      <h3 class="mz-role-title">Junior SEO Executive</h3>
      <div class="mz-company-sub">Markeion Software Company – UK (Remote) · Aug 2023 – Sep 2024</div>
      <p class="mz-desc">
        Executed keyword research, on-page & technical SEO, link building, page speed, schema implementation, LLM optimization, and GBP optimization for local, national, and e-commerce clients.
      </p>
    </div>

    <!-- Role 5 -->
    <div class="mz-timeline-item">
      <div class="mz-timeline-dot"></div>
      <h3 class="mz-role-title">Freelance Ecommerce SEO Strategist</h3>
      <div class="mz-company-sub">Fanflix BD – Dhaka, Bangladesh (Remote) · Jun 2023 – Sep 2023</div>
      <p class="mz-desc">
        Optimized a Shopify-based digital product e-commerce store, increasing organic clicks from <strong>300 to 1.9K+ clicks within 3 months</strong> through high-intent category and product page optimization.
      </p>
    </div>

    <!-- Role 6 -->
    <div class="mz-timeline-item">
      <div class="mz-timeline-dot"></div>
      <h3 class="mz-role-title">Freelance Local SEO Strategist</h3>
      <div class="mz-company-sub">Local Businesses – Worldwide · Jan 2023 – Present</div>
      <p class="mz-desc">
        • <strong>UK Pharmacy:</strong> Led complete local SEO campaign generating 1,200+ calls within 6 months.<br>
        • <strong>Houston Landscaping Business:</strong> Generated 330 calls in a single month through GBP optimization.<br>
        • <strong>Chiropody Clinic (Oldham, Manchester):</strong> Restructured services and GBP to deliver direct patient bookings.
      </p>
    </div>
  </div>
</div>
`;

// HTML for Case Studies & Competencies
const caseStudiesHTML = `
<div class="mz-wrapper" style="padding-top:0;">
  <h2 class="mz-section-title">
    🏆 Case Study Highlights
  </h2>

  <div class="mz-grid-2">
    <div class="mz-card">
      <span style="font-size:0.75rem; font-weight:700; color:#0f9459; text-transform:uppercase;">E-Commerce SEO</span>
      <h3 style="font-size:1.05rem; font-weight:700; margin:0.35rem 0;">Shopify Digital Store Growth</h3>
      <div style="font-size:1.25rem; font-weight:800; color:#0f9459; margin:0.25rem 0 0.5rem;">300 → 1.9K+ Organic Clicks</div>
      <p style="font-size:0.85rem; color:var(--mz-ink-2);">
        Achieved a 530%+ organic click increase in 90 days through keyword intent mapping, technical collection filter audits, and structured product schema.
      </p>
    </div>

    <div class="mz-card">
      <span style="font-size:0.75rem; font-weight:700; color:#0f9459; text-transform:uppercase;">Healthcare Local SEO</span>
      <h3 style="font-size:1.05rem; font-weight:700; margin:0.35rem 0;">7 Google Business Profiles (UK)</h3>
      <div style="font-size:1.25rem; font-weight:800; color:#0f9459; margin:0.25rem 0 0.5rem;">Dominant 3-Pack Rankings</div>
      <p style="font-size:0.85rem; color:var(--mz-ink-2);">
        Managed local search across 7 regional UK healthcare branches, achieving dominant Google 3-Pack visibility and consistent qualified patient lead flow.
      </p>
    </div>

    <div class="mz-card">
      <span style="font-size:0.75rem; font-weight:700; color:#0f9459; text-transform:uppercase;">Penalty Recovery</span>
      <h3 style="font-size:1.05rem; font-weight:700; margin:0.35rem 0;">UK Taxi Service Backlink Cleanup</h3>
      <div style="font-size:1.25rem; font-weight:800; color:#0f9459; margin:0.25rem 0 0.5rem;">3× Visibility · Top 5 Rank</div>
      <p style="font-size:0.85rem; color:var(--mz-ink-2);">
        Audited toxic links and disavowed 300+ spammy backlinks while fixing Core Web Vitals, elevating rankings from beyond page 1 to Top 5 organic spots.
      </p>
    </div>

    <div class="mz-card">
      <span style="font-size:0.75rem; font-weight:700; color:#0f9459; text-transform:uppercase;">Local Conversion</span>
      <h3 style="font-size:1.05rem; font-weight:700; margin:0.35rem 0;">UK Pharmacy & US Landscaping</h3>
      <div style="font-size:1.25rem; font-weight:800; color:#0f9459; margin:0.25rem 0 0.5rem;">1,200+ Direct Phone Calls</div>
      <p style="font-size:0.85rem; color:var(--mz-ink-2);">
        Turned Google Maps traffic into high-converting phone calls: 1,200+ calls within 6 months for a UK pharmacy, and 330 calls in 1 month in Houston, USA.
      </p>
    </div>
  </div>

  <h2 class="mz-section-title" style="margin-top:2.5rem;">
    🎓 Education & Certifications
  </h2>

  <div class="mz-grid-2">
    <div class="mz-card">
      <span style="font-size:0.75rem; font-weight:700; color:#0f9459; text-transform:uppercase;">Education</span>
      <h3 style="font-size:1rem; font-weight:700; margin:0.25rem 0;">Bachelor of Social Science (BSS)</h3>
      <p style="font-size:0.85rem; color:var(--mz-ink-2); margin:0;">
        2020 – 2025 (Completed) · Chittagong College, Bangladesh
      </p>
    </div>

    <div class="mz-card">
      <span style="font-size:0.75rem; font-weight:700; color:#0f9459; text-transform:uppercase;">Certifications</span>
      <ul style="font-size:0.82rem; color:var(--mz-ink-2); margin:0.35rem 0 0 0; padding-left:1.1rem; line-height:1.7;">
        <li><strong>Semrush Academy:</strong> Advanced Technical SEO & Fundamentals</li>
        <li><strong>Udemy:</strong> Page-One Results – AEO & GEO</li>
        <li><strong>Schema App:</strong> Schema.org Implementation Specialist</li>
        <li><strong>BrightLocal:</strong> Local SEO Fundamentals Certification</li>
      </ul>
    </div>
  </div>
</div>
`;

// HTML for Contact & Inquiry Section
const contactHTML = `
<div class="mz-wrapper" id="mz-contact" style="padding-top:0;">
  <h2 class="mz-section-title">
    📬 Direct Contact & Inquiries
  </h2>

  <div class="mz-grid-2">
    <a href="https://wa.me/8801688327756?text=Hi%20Mizanur,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss%20an%20SEO%20project." target="_blank" class="mz-card" style="text-decoration:none; display:flex; align-items:center; gap:1rem;">
      <div style="width:48px; height:48px; border-radius:12px; background:rgba(15,148,89,0.15); color:#0f9459; display:flex; align-items:center; justify-content:center; font-size:1.4rem;">💬</div>
      <div>
        <div style="font-weight:700; font-size:0.95rem; color:var(--mz-ink);">WhatsApp Direct</div>
        <div style="font-size:0.8rem; color:var(--mz-ink-3); font-family:monospace;">+8801688327756</div>
      </div>
    </a>

    <a href="mailto:mizanmahmudseo@gmail.com" class="mz-card" style="text-decoration:none; display:flex; align-items:center; gap:1rem;">
      <div style="width:48px; height:48px; border-radius:12px; background:rgba(37,99,235,0.15); color:#2563eb; display:flex; align-items:center; justify-content:center; font-size:1.4rem;">✉️</div>
      <div>
        <div style="font-weight:700; font-size:0.95rem; color:var(--mz-ink);">Email Address</div>
        <div style="font-size:0.8rem; color:var(--mz-ink-3); font-family:monospace;">mizanmahmudseo@gmail.com</div>
      </div>
    </a>

    <a href="https://www.linkedin.com/in/mizan-seo/" target="_blank" class="mz-card" style="text-decoration:none; display:flex; align-items:center; gap:1rem;">
      <div style="width:48px; height:48px; border-radius:12px; background:rgba(14,165,233,0.15); color:#0284c7; display:flex; align-items:center; justify-content:center; font-size:1.4rem;">🔗</div>
      <div>
        <div style="font-weight:700; font-size:0.95rem; color:var(--mz-ink);">LinkedIn Profile</div>
        <div style="font-size:0.8rem; color:var(--mz-ink-3);">linkedin.com/in/mizan-seo</div>
      </div>
    </a>

    <div class="mz-card" style="display:flex; align-items:center; gap:1rem;">
      <div style="width:48px; height:48px; border-radius:12px; background:rgba(147,51,234,0.15); color:#9333ea; display:flex; align-items:center; justify-content:center; font-size:1.4rem;">📞</div>
      <div>
        <div style="font-weight:700; font-size:0.95rem; color:var(--mz-ink);">Direct Phone</div>
        <div style="font-size:0.8rem; color:var(--mz-ink-3); font-family:monospace;">+8801688327756</div>
      </div>
    </div>
  </div>

  <!-- Inquiry Box -->
  <div class="mz-card mz-card-halo" style="margin-top:1.5rem; text-align:center; padding:2rem;">
    <h3 style="font-size:1.25rem; font-weight:800; margin:0 0 0.5rem 0;">Ready to Scale Your Organic Search Visibility?</h3>
    <p style="font-size:0.9rem; color:var(--mz-ink-2); max-width:550px; margin:0 auto 1.25rem auto;">
      Whether you represent an agency seeking white-label execution or a business needing high-impact SEO & AI search growth, let's connect today.
    </p>
    <a href="mailto:mizanmahmudseo@gmail.com?subject=SEO%20Inquiry%20from%20Portfolio" class="mz-btn mz-btn-primary" style="font-size:0.95rem; padding:0.75rem 1.75rem;">
      Send Project Inquiry
    </a>
  </div>
</div>
`;

// Helper to wrap HTML in an Elementor Section -> Column -> Widget structure
function createSection(htmlContent) {
  return {
    id: genId(),
    elType: "section",
    isInner: false,
    settings: {
      gap: "no",
      padding: {
        unit: "px",
        top: "0",
        right: "0",
        bottom: "0",
        left: "0",
        isLinked: true
      }
    },
    elements: [
      {
        id: genId(),
        elType: "column",
        isInner: false,
        settings: {
          _column_size: 100
        },
        elements: [
          {
            id: genId(),
            elType: "widget",
            widgetType: "html",
            isInner: false,
            settings: {
              html: htmlContent
            },
            elements: []
          }
        ]
      }
    ]
  };
}

// Complete Elementor JSON document
const elementorTemplate = {
  version: "0.4",
  title: "Md. Mizanur Rahaman - SEO Portfolio Homepage",
  type: "page",
  page_settings: {
    template: "elementor_canvas" // Canvas hides theme header/footer for pristine 1:1 nahian.bd look
  },
  content: [
    createSection(heroHTML),
    createSection(highlightsHTML),
    createSection(experienceHTML),
    createSection(caseStudiesHTML),
    createSection(contactHTML)
  ]
};

// Write out to JSON file
const outputPath = path.resolve('d:\\Vide-Coding\\Portfolio\\elementor-portfolio-template.json');
fs.writeFileSync(outputPath, JSON.stringify(elementorTemplate, null, 2), 'utf-8');

console.log('Successfully generated Elementor template JSON at: ' + outputPath);
