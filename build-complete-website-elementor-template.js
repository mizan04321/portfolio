import fs from 'fs';
import path from 'path';

function uid() {
  return Math.random().toString(16).substring(2, 9);
}

// ==========================================
// COLOR PALETTE (Exact match to live website)
// ==========================================
const THEME = {
  pageBg: '#0f1012',
  cardBg: '#18191d',
  cardBgElevated: '#1f2026',
  cardBorder: '#27282e',
  cardBorderLight: '#32343c',
  primary: '#10b981',        // Emerald
  primaryHover: '#059669',
  primaryMuted: '#064e3b',
  textLight: '#ffffff',
  textBody: '#d1d5db',
  textMuted: '#9ca3af',
  fontFamily: 'Plus Jakarta Sans'
};

// ==========================================
// WIDGET FACTORIES (100% Native Elementor)
// ==========================================

function makeHeading(title, tag = 'h2', align = 'left', color = THEME.textLight, fontSize = 26, weight = '700') {
  return {
    id: uid(),
    elType: 'widget',
    widgetType: 'heading',
    isInner: false,
    settings: {
      title: title,
      header_size: tag,
      align: align,
      title_color: color,
      typography_typography: 'custom',
      typography_font_family: THEME.fontFamily,
      typography_font_size: { unit: 'px', size: fontSize },
      typography_font_weight: String(weight),
      typography_line_height: { unit: 'em', size: 1.25 }
    },
    elements: []
  };
}

function makeTextEditor(htmlContent, align = 'left', color = THEME.textBody, fontSize = 14) {
  return {
    id: uid(),
    elType: 'widget',
    widgetType: 'text-editor',
    isInner: false,
    settings: {
      editor: htmlContent,
      align: align,
      text_color: color,
      typography_typography: 'custom',
      typography_font_family: THEME.fontFamily,
      typography_font_size: { unit: 'px', size: fontSize },
      typography_line_height: { unit: 'em', size: 1.6 }
    },
    elements: []
  };
}

function makeButton(text, url, icon = 'fas fa-arrow-right', bg = THEME.primary, color = '#ffffff', align = 'center') {
  return {
    id: uid(),
    elType: 'widget',
    widgetType: 'button',
    isInner: false,
    settings: {
      text: text,
      link: {
        url: url,
        is_external: true,
        nofollow: false
      },
      align: align,
      size: 'md',
      selected_icon: {
        value: icon,
        library: icon.startsWith('fab') ? 'fa-brands' : 'fa-solid'
      },
      icon_align: 'right',
      button_text_color: color,
      background_color: bg,
      border_radius: {
        unit: 'px',
        top: '12',
        right: '12',
        bottom: '12',
        left: '12',
        isLinked: true
      },
      typography_typography: 'custom',
      typography_font_family: THEME.fontFamily,
      typography_font_weight: '600',
      button_box_shadow_box_shadow_type: 'yes',
      button_box_shadow_box_shadow: {
        horizontal: 0,
        vertical: 4,
        blur: 16,
        spread: -2,
        color: 'rgba(16, 185, 129, 0.35)'
      }
    },
    elements: []
  };
}

function makeCounter(number, suffix, title, color = THEME.primary) {
  return {
    id: uid(),
    elType: 'widget',
    widgetType: 'counter',
    isInner: false,
    settings: {
      starting_number: 0,
      ending_number: number,
      suffix: suffix,
      title: title,
      duration: 1800,
      number_color: color,
      title_color: THEME.textMuted,
      typography_number_typography: 'custom',
      typography_number_font_family: THEME.fontFamily,
      typography_number_font_weight: '800',
      typography_number_font_size: { unit: 'px', size: 36 },
      typography_title_typography: 'custom',
      typography_title_font_family: THEME.fontFamily,
      typography_title_font_weight: '600',
      typography_title_font_size: { unit: 'px', size: 13 }
    },
    elements: []
  };
}

function makeIconBox(icon, title, desc, linkUrl = null, iconColor = THEME.primary, position = 'left') {
  const settings = {
    selected_icon: {
      value: icon,
      library: icon.startsWith('fab') ? 'fa-brands' : 'fa-solid'
    },
    title_text: title,
    description_text: desc,
    position: position,
    primary_color: iconColor,
    title_color: THEME.textLight,
    description_color: THEME.textBody,
    typography_title_typography: 'custom',
    typography_title_font_family: THEME.fontFamily,
    typography_title_font_weight: '700',
    typography_title_font_size: { unit: 'px', size: 16 },
    typography_description_typography: 'custom',
    typography_description_font_family: THEME.fontFamily,
    typography_description_font_size: { unit: 'px', size: 13.5 },
    typography_description_line_height: { unit: 'em', size: 1.55 }
  };

  if (linkUrl) {
    settings.link = {
      url: linkUrl,
      is_external: true,
      nofollow: false
    };
  }

  return {
    id: uid(),
    elType: 'widget',
    widgetType: 'icon-box',
    isInner: false,
    settings: settings,
    elements: []
  };
}

function makeIconList(items, iconColor = THEME.primary) {
  return {
    id: uid(),
    elType: 'widget',
    widgetType: 'icon-list',
    isInner: false,
    settings: {
      icon_color: iconColor,
      text_color: THEME.textBody,
      typography_typography: 'custom',
      typography_font_family: THEME.fontFamily,
      typography_font_size: { unit: 'px', size: 13.5 },
      icon_list: items.map(item => ({
        _id: uid(),
        text: item.text,
        selected_icon: {
          value: item.icon || 'fas fa-check-circle',
          library: 'fa-solid'
        }
      }))
    },
    elements: []
  };
}

function makeAccordion(items) {
  return {
    id: uid(),
    elType: 'widget',
    widgetType: 'accordion',
    isInner: false,
    settings: {
      tabs: items.map(item => ({
        _id: uid(),
        tab_title: item.title,
        tab_content: item.content
      })),
      icon_align: 'right',
      title_color: THEME.textLight,
      tab_active_color: THEME.primary,
      title_background: '#1d1e24',
      active_title_background: '#24262e',
      content_color: THEME.textBody,
      content_background_color: '#16171b',
      border_color: THEME.cardBorder,
      typography_title_typography: 'custom',
      typography_title_font_family: THEME.fontFamily,
      typography_title_font_size: { unit: 'px', size: 14.5 },
      typography_title_font_weight: '600',
      typography_content_typography: 'custom',
      typography_content_font_family: THEME.fontFamily,
      typography_content_font_size: { unit: 'px', size: 13.5 }
    },
    elements: []
  };
}

function makeDivider(color = THEME.cardBorder, gap = 16) {
  return {
    id: uid(),
    elType: 'widget',
    widgetType: 'divider',
    isInner: false,
    settings: {
      color: color,
      weight: { unit: 'px', size: 1 },
      gap: { unit: 'px', size: gap }
    },
    elements: []
  };
}

function makeSpacer(size = 20) {
  return {
    id: uid(),
    elType: 'widget',
    widgetType: 'spacer',
    isInner: false,
    settings: {
      space: { unit: 'px', size: size }
    },
    elements: []
  };
}

function makeImage(url, width = 110, borderRadius = '999') {
  return {
    id: uid(),
    elType: 'widget',
    widgetType: 'image',
    isInner: false,
    settings: {
      image: {
        url: url,
        id: ''
      },
      align: 'center',
      image_size: 'full',
      width: { unit: 'px', size: width },
      border_radius: { unit: 'px', top: borderRadius, right: borderRadius, bottom: borderRadius, left: borderRadius, isLinked: true },
      border_border: 'solid',
      border_width: { unit: 'px', top: '3', right: '3', bottom: '3', left: '3', isLinked: true },
      border_color: THEME.primary,
      box_shadow_box_shadow_type: 'yes',
      box_shadow_box_shadow: {
        horizontal: 0,
        vertical: 8,
        blur: 24,
        spread: -4,
        color: 'rgba(16, 185, 129, 0.4)'
      }
    },
    elements: []
  };
}

// Inner section builder
function makeInnerSection(columnsWidgets, gap = 'default') {
  const colSize = Math.floor(100 / columnsWidgets.length);
  return {
    id: uid(),
    elType: 'section',
    isInner: true,
    settings: {
      gap: gap
    },
    elements: columnsWidgets.map(widgets => ({
      id: uid(),
      elType: 'column',
      isInner: true,
      settings: {
        _column_size: colSize,
        padding: { unit: 'px', top: '8', right: '8', bottom: '8', left: '8', isLinked: true }
      },
      elements: widgets
    }))
  };
}

// Card Section Wrapper
function makeCardSection(widgets, customSettings = {}) {
  return {
    id: uid(),
    elType: 'section',
    isInner: false,
    settings: {
      content_width: 'boxed',
      boxed_width: { unit: 'px', size: 960 },
      background_background: 'classic',
      background_color: THEME.cardBg,
      border_radius: { unit: 'px', top: '20', right: '20', bottom: '20', left: '20', isLinked: true },
      border_border: 'solid',
      border_width: { unit: 'px', top: '1', right: '1', bottom: '1', left: '1', isLinked: true },
      border_color: THEME.cardBorder,
      padding: { unit: 'px', top: '36', right: '30', bottom: '36', left: '30', isLinked: false },
      margin: { unit: 'px', top: '20', right: '15', bottom: '20', left: '15', isLinked: false },
      ...customSettings
    },
    elements: [
      {
        id: uid(),
        elType: 'column',
        isInner: false,
        settings: { _column_size: 100 },
        elements: widgets
      }
    ]
  };
}

// ============================================================================
// SECTION 1: HEADER & PROFILE HERO
// ============================================================================
const heroSection = {
  id: uid(),
  elType: 'section',
  isInner: false,
  settings: {
    content_width: 'boxed',
    boxed_width: { unit: 'px', size: 960 },
    background_background: 'gradient',
    background_color: '#062d1d',
    background_color_b: '#0d1316',
    background_gradient_angle: { unit: 'deg', size: 145 },
    border_radius: { unit: 'px', top: '24', right: '24', bottom: '24', left: '24', isLinked: true },
    border_border: 'solid',
    border_width: { unit: 'px', top: '1', right: '1', bottom: '1', left: '1', isLinked: true },
    border_color: '#10b98133',
    padding: { unit: 'px', top: '55', right: '25', bottom: '50', left: '25', isLinked: false },
    margin: { unit: 'px', top: '25', right: '15', bottom: '20', left: '15', isLinked: false },
    box_shadow_box_shadow_type: 'yes',
    box_shadow_box_shadow: {
      horizontal: 0,
      vertical: 16,
      blur: 40,
      spread: -8,
      color: 'rgba(16, 185, 129, 0.25)'
    }
  },
  elements: [
    {
      id: uid(),
      elType: 'column',
      isInner: false,
      settings: { _column_size: 100 },
      elements: [
        makeImage('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=240&h=240&q=80', 110),
        makeSpacer(15),
        makeHeading('Md. Mizanur Rahaman', 'h1', 'center', '#ffffff', 34, '800'),
        makeHeading('White Label SEO Strategist · Local & Ecommerce SEO · AI Search (GEO/AEO)', 'h3', 'center', '#34d399', 15.5, '600'),
        makeSpacer(5),
        makeHeading('Less talk, show me organic growth!', 'h4', 'center', '#9ca3af', 14, '500'),
        makeSpacer(10),
        makeTextEditor(
          '<div style="text-align: center;"><span style="display: inline-block; background: rgba(16,185,129,0.15); color: #34d399; padding: 6px 16px; border-radius: 999px; font-weight: 600; font-size: 12.5px; border: 1px solid rgba(16,185,129,0.3);">🟢 Available 6–8 hrs/day for Full-Time, Remote & Agency Consulting Roles</span></div>',
          'center',
          '#d1d5db'
        ),
        makeSpacer(10),
        makeTextEditor(
          '🏢 Senior SEO Executive & Team Lead at <strong>CrazyGraph Marketing Agency</strong> &nbsp;|&nbsp; 📍 Chittagong, Bangladesh (GMT+6)',
          'center',
          '#9ca3af'
        ),
        makeSpacer(20),
        makeInnerSection([
          [makeButton('Chat on WhatsApp', 'https://wa.me/8801688327756', 'fab fa-whatsapp', '#10b981', '#ffffff', 'right')],
          [makeButton('Connect on LinkedIn', 'https://www.linkedin.com/in/mizan-seo/', 'fab fa-linkedin', '#1f2937', '#ffffff', 'left')]
        ])
      ]
    }
  ]
};

// ============================================================================
// SECTION 2: NAVIGATION TABS BAR (Anchor Jump Links)
// ============================================================================
const navTabsSection = {
  id: uid(),
  elType: 'section',
  isInner: false,
  settings: {
    content_width: 'boxed',
    boxed_width: { unit: 'px', size: 960 },
    background_background: 'classic',
    background_color: '#131417',
    border_radius: { unit: 'px', top: '16', right: '16', bottom: '16', left: '16', isLinked: true },
    border_border: 'solid',
    border_width: { unit: 'px', top: '1', right: '1', bottom: '1', left: '1', isLinked: true },
    border_color: THEME.cardBorder,
    padding: { unit: 'px', top: '12', right: '15', bottom: '12', left: '15', isLinked: false },
    margin: { unit: 'px', top: '10', right: '15', bottom: '15', left: '15', isLinked: false }
  },
  elements: [
    {
      id: uid(),
      elType: 'column',
      isInner: false,
      settings: { _column_size: 100 },
      elements: [
        makeInnerSection([
          [makeButton('Resume', '#resume', 'fas fa-user', '#1f2026', '#ffffff', 'center')],
          [makeButton('Case Studies', '#case-studies', 'fas fa-chart-line', '#1f2026', '#ffffff', 'center')],
          [makeButton('Services', '#services', 'fas fa-briefcase', '#1f2026', '#ffffff', 'center')],
          [makeButton('Vibe Coding', '#vibe-coding', 'fas fa-code', '#1f2026', '#ffffff', 'center')],
          [makeButton('Contact', '#contact', 'fas fa-envelope', '#10b981', '#ffffff', 'center')]
        ])
      ]
    }
  ]
};

// ============================================================================
// SECTION 3: RESUME & PROFESSIONAL PROFILE (#resume)
// ============================================================================
const resumeSection = makeCardSection([
  makeHeading('About Md. Mizanur Rahaman', 'h2', 'left', '#ffffff', 24, '800'),
  makeDivider(THEME.cardBorder, 15),
  makeTextEditor(
    '<p>I’m an <strong>SEO Strategist with 4+ years of experience</strong> at digital marketing agencies such as Markeion and CrazyGraph, where I worked as both a Junior and Senior SEO Executive. I have experience in both remote and in-house environments, working with UK-based agencies and freelance clients across the <strong>USA, UK, UAE, and the Netherlands</strong>.</p><p>My expertise covers both local and national SEO, including growing a local business from <strong>50 to 1,200+ calls in just 5 months</strong> through strategic Google Business Profile optimization. I build strong technical, semantic, and topical foundations that search engines and AI answer engines can understand, trust, and reward.</p><p>As search evolves into conversational engines, I engineer <strong>Answer Engine Optimization (AEO)</strong> and <strong>Generative Engine Optimization (GEO)</strong> to secure client visibility across Google AI Overviews, ChatGPT, Claude, and Perplexity.</p>',
    'left',
    THEME.textBody,
    14
  ),
  makeSpacer(15),
  makeInnerSection([
    [
      makeIconBox(
        'fas fa-map-marker-alt',
        'Based in Chittagong, Bangladesh',
        'Asia/Dhaka time zone (GMT+6). Smooth overlap with US, UK, and European business hours for agile collaboration.',
        null,
        THEME.primary
      )
    ],
    [
      makeIconBox(
        'fas fa-globe-americas',
        'Remote-First & White Label Ready',
        'Experienced executing under strict agency NDAs with client-branded reporting, custom SOPs, and prompt turnarounds.',
        null,
        THEME.primary
      )
    ]
  ]),
  makeSpacer(25),
  makeHeading('Professional Experience', 'h2', 'left', '#ffffff', 24, '800'),
  makeDivider(THEME.cardBorder, 15),
  makeIconBox(
    'fas fa-briefcase',
    'Senior SEO Executive & Team Lead — CrazyGraph Marketing Agency',
    'Nov 2024 – Present | Bangladesh (In-house)\n• Managing 30+ SEO projects across local, national, multilingual, multi-location, and B2B campaigns in USA, UK, and UAE.\n• Developed personalized agency SOPs driving measurable growth within 3–6 months.\n• Implemented AI-powered SEO strategies across Google SERPs, AI Overviews, and LLMs (ChatGPT, Grok, Claude).'
  ),
  makeDivider(THEME.cardBorder, 12),
  makeIconBox(
    'fas fa-laptop-code',
    'Freelance SEO Executive (Project Basis) — Valley Industry Supply',
    'May 2026 – Present | USA (Remote)\n• Built Google Business Profile and link-building strategies, providing actionable recommendations to improve local rankings.\n• Managed link-building campaigns for B2B manufacturing across USA and Mexico.'
  ),
  makeDivider(THEME.cardBorder, 12),
  makeIconBox(
    'fas fa-tools',
    'Freelance Technical SEO Strategist — Ramies Taxi',
    'Jan 2025 – Jun 2025 | UK (Remote)\n• Audited and fixed technical SEO issues using GSC, Semrush, and Screaming Frog (Core Web Vitals, speed, schema, indexing).\n• Identified and disavowed 300+ harmful backlinks, driving a 3× improvement in organic rankings into Top 5 results.'
  ),
  makeDivider(THEME.cardBorder, 12),
  makeIconBox(
    'fas fa-chart-line',
    'Junior SEO Executive — Markeion Software Company',
    'Aug 2023 – Sep 2024 | UK (Remote)\n• Executed keyword research, on-page & technical SEO, link building, page speed, schema, LLM optimization, and GBP optimization for local, national, and e-commerce clients.'
  ),
  makeDivider(THEME.cardBorder, 12),
  makeIconBox(
    'fas fa-shopping-cart',
    'Freelance Ecommerce SEO Strategist — Fanflix BD',
    'Jun 2023 – Sep 2023 | Dhaka, Bangladesh (Remote)\n• Scaled a Shopify e-commerce store selling digital products from 300 to 1.9K+ organic clicks in 3 months.'
  ),
  makeDivider(THEME.cardBorder, 12),
  makeIconBox(
    'fas fa-store-alt',
    'Freelance Local SEO Strategist — Local Businesses Worldwide',
    'Jan 2023 – Present\n• UK Pharmacy: Local SEO overhaul generating 1,200+ calls in 6 months.\n• Houston Landscaping: Generated 330 calls in a single month through GBP optimization.\n• Oldham Chiropody Clinic: Optimized GBP to produce direct bookings directly via Google Maps.'
  ),
  makeSpacer(25),
  makeHeading('Core Competencies & Tools', 'h2', 'left', '#ffffff', 24, '800'),
  makeDivider(THEME.cardBorder, 15),
  makeInnerSection([
    [
      makeIconList([
        { text: 'Technical SEO, Semantic & Entity SEO', icon: 'fas fa-check-circle' },
        { text: 'Google Business Profile & Local 3-Pack Optimization', icon: 'fas fa-check-circle' },
        { text: 'Answer Engine Optimization (AEO) & GEO', icon: 'fas fa-check-circle' },
        { text: 'Topical Authority & Keyword Intent Mapping', icon: 'fas fa-check-circle' }
      ])
    ],
    [
      makeIconList([
        { text: 'Ecommerce SEO (Shopify, WooCommerce, WordPress)', icon: 'fas fa-check-circle' },
        { text: 'Toxic Backlink Audits & Google Disavow Recovery', icon: 'fas fa-check-circle' },
        { text: 'Google Search Console, GA4 & Looker Studio Reporting', icon: 'fas fa-check-circle' },
        { text: 'White Label Team Leadership & Custom Agency SOPs', icon: 'fas fa-check-circle' }
      ])
    ]
  ]),
  makeSpacer(15),
  makeInnerSection([
    [makeIconBox('fas fa-spider', 'SEO & Research', 'Screaming Frog, Ahrefs, Semrush, Moz, Surfer SEO, Frase, Local Falcon, Ubersuggest')],
    [makeIconBox('fas fa-chart-pie', 'Analytics & Data', 'Google Search Console, GA4, Google Tag Manager, Looker Studio, Google Sheets')],
    [makeIconBox('fas fa-desktop', 'CMS & Platforms', 'WordPress, Shopify, Webflow, Wix, WooCommerce, Drupal')],
    [makeIconBox('fas fa-brain', 'AI & LLM Tools', 'ChatGPT, Claude, Claude Code, Antigravity 2.0, Gemini, Perplexity, Grok')]
  ]),
  makeSpacer(25),
  makeHeading('Education & Certifications', 'h2', 'left', '#ffffff', 24, '800'),
  makeDivider(THEME.cardBorder, 15),
  makeInnerSection([
    [
      makeIconBox(
        'fas fa-graduation-cap',
        'Bachelor of Social Science (BSS)',
        '2020 – 2025 (Completed)\nChittagong College, Bangladesh'
      )
    ],
    [
      makeIconList([
        { text: 'Semrush Academy: Advanced Technical SEO & Fundamentals', icon: 'fas fa-certificate' },
        { text: 'Udemy: From Zero to Page-One Results – AEO & GEO', icon: 'fas fa-certificate' },
        { text: 'Schema App: Schema.org Implementation Specialist', icon: 'fas fa-certificate' },
        { text: 'BrightLocal: Local SEO Fundamentals Certification', icon: 'fas fa-certificate' }
      ])
    ]
  ])
], {
  _css_classes: 'section-resume'
});

// ============================================================================
// SECTION 4: CASE STUDIES & RESULTS (#case-studies)
// ============================================================================
const caseStudiesSection = makeCardSection([
  makeHeading('Case Studies & Measurable Growth', 'h2', 'left', '#ffffff', 26, '800'),
  makeTextEditor('Real client results demonstrating organic search revenue, Google Business Profile growth, and technical precision.', 'left', THEME.textMuted),
  makeDivider(THEME.cardBorder, 15),
  
  // 4 Top Metric Counters
  makeInnerSection([
    [makeCounter(1200, '+', 'Calls Generated via GBP')],
    [makeCounter(30, '+', 'Managed SEO Projects')],
    [makeCounter(3, '×', 'Organic Ranking Surge')],
    [makeCounter(1900, '+', 'Shopify Clicks in 90 Days')]
  ]),
  makeSpacer(25),

  // Featured Client Case Studies
  makeHeading('Featured Client Case Studies', 'h3', 'left', '#ffffff', 20, '700'),
  makeDivider(THEME.cardBorder, 15),
  makeInnerSection([
    [
      makeIconBox(
        'fas fa-shopping-bag',
        'Shopify E-Commerce Growth — Fanflix BD',
        'Outcome: 300 → 1.9K+ Clicks in 3 Months\n• Conducted search intent mapping to align commercial keywords with category URLs.\n• Fixed crawl bloat, collection filter indexation, and implemented Product schema.\n• Scaled organic revenue with sustainable topical authority.'
      )
    ],
    [
      makeIconBox(
        'fas fa-hospital-user',
        'Healthcare SEO (7 Google Business Profiles)',
        'Outcome: 7 Regional GBPs Ranked Top 3 in UK\n• Standardized NAP citations and implemented location-specific semantic entity signals.\n• Built dedicated clinic landing pages with LocalBusiness JSON-LD schema.\n• Dominated Google Maps 3-Pack across primary UK service areas.'
      )
    ]
  ]),
  makeSpacer(15),
  makeInnerSection([
    [
      makeIconBox(
        'fas fa-shield-alt',
        'UK Taxi Technical SEO & Disavow Recovery',
        'Outcome: 3× Organic Surge & Top 5 Rankings\n• Audited link profile with Semrush/GSC, preparing disavow documentation for 300+ toxic links.\n• Resolved Core Web Vitals bottlenecks and sitemap indexation conflicts.\n• Reclaimed lost rankings from page 2 into top 5 search positions.'
      )
    ],
    [
      makeIconBox(
        'fas fa-phone-volume',
        'High-Converting Local Lead Generation',
        'Outcome: 1,200+ Calls (UK) & 330 Calls/Mo (US)\n• UK Pharmacy: Generated 1,200+ phone call inquiries in 6 months.\n• Houston Landscaping: Generated 330 calls in a single month through GBP optimization.\n• Oldham Clinic: Secured automated appointment bookings via Google profile actions.'
      )
    ]
  ]),
  makeSpacer(30),

  // The 5 Dedicated Proof Showcase Sections with Image Placeholders
  makeHeading('Analytics Proof & Screenshot Showcase', 'h3', 'left', '#ffffff', 20, '700'),
  makeTextEditor('Visual evidence from production environments demonstrating quantifiable client growth across Google Search Console, Google Business Profile, Map Rankings, Google Analytics (GA4), and Inbound Leads.', 'left', THEME.textMuted),
  makeDivider(THEME.cardBorder, 15),
  
  // Proof 1: GSC
  makeHeading('PROOF 01: Google Search Console Performance', 'h4', 'left', '#34d399', 16, '700'),
  makeHeading('Clicks, Impressions & Ranking Progression (+546% Growth)', 'h5', 'left', '#ffffff', 18, '600'),
  makeTextEditor('Monthly Organic Clicks grew from 300 to over 1,940+. Impressions surged from 17.5K to 84.2K+ following on-page entity restructuring and Schema.org JSON-LD alignment.', 'left', THEME.textBody),
  makeImage('https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80', 800, '12'),
  makeSpacer(20),

  // Proof 2: GBP
  makeHeading('PROOF 02: Google Business Profile Insights', 'h4', 'left', '#34d399', 16, '700'),
  makeHeading('Customer Interactions & Call Volume (1,200+ Calls)', 'h5', 'left', '#ffffff', 18, '600'),
  makeTextEditor('Direct call inquiries surged from ~50 to over 1,200 calls in 5 months through category optimization, geo-localized service pages, and review velocity.', 'left', THEME.textBody),
  makeImage('https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80', 800, '12'),
  makeSpacer(20),

  // Proof 3: Map Rankings
  makeHeading('PROOF 03: Map Rankings (Local Falcon Heatmap)', 'h4', 'left', '#34d399', 16, '700'),
  makeHeading('Geo-Grid Local Falcon Scan (#1.16 Average Position)', 'h5', 'left', '#ffffff', 18, '600'),
  makeTextEditor('Local Falcon 13x13 geo-grid heatmap scan documenting dominant #1 green ranking pins across city limits, capturing immediate high-intent local phone searches.', 'left', THEME.textBody),
  makeImage('https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&w=900&q=80', 800, '12'),
  makeSpacer(20),

  // Proof 4: Google Analytics
  makeHeading('PROOF 04: Google Analytics (GA4) Acquisition', 'h4', 'left', '#34d399', 16, '700'),
  makeHeading('Organic User Acquisition & Sessions (+310% Active Visitors)', 'h5', 'left', '#ffffff', 18, '600'),
  makeTextEditor('Google Analytics 4 acquisition overview confirming steady growth in organic sessions (22.4K) and high-intent engagement rates exceeding 62%.', 'left', THEME.textBody),
  makeImage('https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=900&q=80', 800, '12'),
  makeSpacer(20),

  // Proof 5: Leads
  makeHeading('PROOF 05: Verified Lead Conversions', 'h4', 'left', '#34d399', 16, '700'),
  makeHeading('Inbound Phone Calls, Form Fills & Client ROI (1,530+ Leads)', 'h5', 'left', '#ffffff', 18, '600'),
  makeTextEditor('Attribution log tracking verified phone call records, scheduled consultation forms, and quotation requests delivered directly to client CRM systems.', 'left', THEME.textBody),
  makeImage('https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=80', 800, '12'),
  makeSpacer(25),

  // The 4-Pillar Organic Growth Framework
  makeHeading('The 4-Pillar Organic Growth Framework', 'h3', 'left', '#ffffff', 20, '700'),
  makeDivider(THEME.cardBorder, 15),
  makeInnerSection([
    [makeIconBox('fas fa-search', '01. Technical Audit', 'Crawl budget, Core Web Vitals, Schema.org implementation, and indexation hygiene.')],
    [makeIconBox('fas fa-sitemap', '02. Topical Authority', 'Mapping semantic entities and search intent to establish domain expertise.')],
    [makeIconBox('fas fa-map-marked-alt', '03. Local Dominance', 'Google Business Profile optimization, local citations, review strategy, and call conversions.')],
    [makeIconBox('fas fa-robot', '04. AI Search Ready', 'Structuring brand knowledge graph data for citations in ChatGPT, Claude, and AI Overviews.')]
  ])
]);

// ============================================================================
// SECTION 5: SERVICES & STRATEGIC OFFERINGS (#services)
// ============================================================================
const servicesSection = makeCardSection([
  makeHeading('SEO Services & Strategic Offerings', 'h2', 'left', '#ffffff', 26, '800'),
  makeTextEditor('Comprehensive white-label and direct consulting services designed to build enduring organic search authority.', 'left', THEME.textMuted),
  makeDivider(THEME.cardBorder, 20),

  // Service 1
  makeHeading('SERVICE 01: White Label Agency SEO & Team Leadership', 'h3', 'left', '#34d399', 18, '700'),
  makeHeading('Built for UK, US & Worldwide Digital Marketing Agencies', 'h4', 'left', '#ffffff', 15, '600'),
  makeTextEditor('Reliable, high-standard execution under strict confidentiality. I act as your agency’s white-label SEO strategist or team lead, managing SOPs, delegation, and reporting.', 'left', THEME.textBody),
  makeIconList([
    { text: 'Custom agency SOPs for predictable 3–6 month ranking improvements', icon: 'fas fa-check' },
    { text: 'Confidential campaign execution across multi-location, local, and B2B clients', icon: 'fas fa-check' },
    { text: 'Detailed Looker Studio / GA4 reporting branded with your agency’s identity', icon: 'fas fa-check' },
    { text: 'Direct technical oversight and quality assurance across junior team members', icon: 'fas fa-check' }
  ]),
  makeTextEditor('<div style="background: #1f2026; padding: 10px 14px; border-radius: 8px; border: 1px solid #2e3038; font-size: 13px; color: #d1d5db;"><strong style="color: #ffffff;">Ideal For:</strong> Agencies scaling past capacity that need senior-level SEO leadership without recruitment overhead.</div>', 'left', THEME.textBody),
  makeDivider(THEME.cardBorder, 20),

  // Service 2
  makeHeading('SERVICE 02: Local SEO & Google Business Profile Domination', 'h3', 'left', '#34d399', 18, '700'),
  makeHeading('Turn Google Maps Searchers into Paying Customers', 'h4', 'left', '#ffffff', 15, '600'),
  makeTextEditor('Holistic local ranking strategy engineered to dominate the Local 3-Pack and drive measurable phone calls and store visits.', 'left', THEME.textBody),
  makeIconList([
    { text: 'GBP deep audit, category optimization, and geo-targeted service descriptions', icon: 'fas fa-check' },
    { text: 'Location-specific landing pages tied to structured LocalBusiness schema', icon: 'fas fa-check' },
    { text: 'High-authority local citation cleanup, building, and NAP consistency audits', icon: 'fas fa-check' },
    { text: 'Proven framework that grew a local client from 50 to 1,200+ calls in 5 months', icon: 'fas fa-check' }
  ]),
  makeTextEditor('<div style="background: #1f2026; padding: 10px 14px; border-radius: 8px; border: 1px solid #2e3038; font-size: 13px; color: #d1d5db;"><strong style="color: #ffffff;">Ideal For:</strong> Pharmacies, clinics, home service contractors, taxi fleets, and multi-location practices.</div>', 'left', THEME.textBody),
  makeDivider(THEME.cardBorder, 20),

  // Service 3
  makeHeading('SERVICE 03: AI Search Optimization (GEO & AEO)', 'h3', 'left', '#34d399', 18, '700'),
  makeHeading('Future-Proof Visibility in ChatGPT, Claude, Perplexity & AI Overviews', 'h4', 'left', '#ffffff', 15, '600'),
  makeTextEditor('Optimizing your brand’s digital footprint so conversational AI answer engines accurately cite and recommend your business.', 'left', THEME.textBody),
  makeIconList([
    { text: 'Answer Engine Optimization (AEO) tailored for direct query answers', icon: 'fas fa-check' },
    { text: 'Generative Engine Optimization (GEO) structured for LLM knowledge retrieval', icon: 'fas fa-check' },
    { text: 'Brand entity mapping and Wikidata / Schema.org semantic connections', icon: 'fas fa-check' },
    { text: 'AI visibility monitoring across Google AI Mode, ChatGPT, and Claude', icon: 'fas fa-check' }
  ]),
  makeTextEditor('<div style="background: #1f2026; padding: 10px 14px; border-radius: 8px; border: 1px solid #2e3038; font-size: 13px; color: #d1d5db;"><strong style="color: #ffffff;">Ideal For:</strong> Brands seeking first-mover advantage as consumer search shifts toward generative AI.</div>', 'left', THEME.textBody),
  makeDivider(THEME.cardBorder, 20),

  // Service 4
  makeHeading('SERVICE 04: Technical SEO Audits & Penalty Recovery', 'h3', 'left', '#34d399', 18, '700'),
  makeHeading('Fix Crawl Bloat, Core Web Vitals & Toxic Backlink Penalties', 'h4', 'left', '#ffffff', 15, '600'),
  makeTextEditor('Deep diagnostic audits using Screaming Frog, Semrush, and GSC to identify and resolve deep architectural roadblocks.', 'left', THEME.textBody),
  makeIconList([
    { text: 'Complete site architecture, crawl budget, and indexation analysis', icon: 'fas fa-check' },
    { text: 'Harmful/spammy backlink identification and Google Disavow file preparation (3× rank recovery)', icon: 'fas fa-check' },
    { text: 'Core Web Vitals diagnostic (LCP, CLS, INP) and speed remediation guidance', icon: 'fas fa-check' },
    { text: 'Advanced Schema.org JSON-LD custom implementation', icon: 'fas fa-check' }
  ]),
  makeTextEditor('<div style="background: #1f2026; padding: 10px 14px; border-radius: 8px; border: 1px solid #2e3038; font-size: 13px; color: #d1d5db;"><strong style="color: #ffffff;">Ideal For:</strong> Websites experiencing sudden traffic drops, indexation stalls, or preparing for site migrations.</div>', 'left', THEME.textBody),
  makeDivider(THEME.cardBorder, 20),

  // Service 5
  makeHeading('SERVICE 05: E-Commerce SEO (Shopify & WooCommerce)', 'h3', 'left', '#34d399', 18, '700'),
  makeHeading('Turn Organic Search into High-Intent Store Revenue', 'h4', 'left', '#ffffff', 15, '600'),
  makeTextEditor('Specialized e-commerce search strategy focusing on high-converting product categories and commercial intent keywords.', 'left', THEME.textBody),
  makeIconList([
    { text: 'Faceted navigation and collection filter crawl-optimization', icon: 'fas fa-check' },
    { text: 'Product schema markup, merchant data alignment, and rich snippet setup', icon: 'fas fa-check' },
    { text: 'Topical category clusters that outrank generic marketplace competitors', icon: 'fas fa-check' },
    { text: 'Proven Shopify case study scaling organic clicks from 300 to 1.9K+ in 90 days', icon: 'fas fa-check' }
  ]),
  makeTextEditor('<div style="background: #1f2026; padding: 10px 14px; border-radius: 8px; border: 1px solid #2e3038; font-size: 13px; color: #d1d5db;"><strong style="color: #ffffff;">Ideal For:</strong> Shopify and WooCommerce brands looking to lower customer acquisition costs (CAC) through organic channels.</div>', 'left', THEME.textBody),
  makeSpacer(25),

  // CTA Block
  makeHeading('Need a Dedicated SEO Strategist for Your Business?', 'h3', 'center', '#ffffff', 20, '700'),
  makeTextEditor('I am currently available 6–8 hours/day for remote contracts, white-label agency partnerships, and consulting roles.', 'center', THEME.textMuted),
  makeSpacer(15),
  makeInnerSection([
    [makeButton('Get in Touch', '#contact', 'fas fa-paper-plane', '#10b981', '#ffffff', 'center')],
    [makeButton('Chat on WhatsApp', 'https://wa.me/8801688327756', 'fab fa-whatsapp', '#1f2026', '#ffffff', 'center')]
  ])
]);

// ============================================================================
// SECTION 6: VIBE CODING PROJECTS (#vibe-coding)
// ============================================================================
const vibeCodingSection = makeCardSection([
  makeHeading('Vibe Coding Projects', 'h2', 'left', '#ffffff', 26, '800'),
  makeTextEditor('Products I’ve designed, built and shipped using AI tools, plus the open source work behind them. (Each card requires only Name, Description, and Live URL).', 'left', THEME.textMuted),
  makeDivider(THEME.cardBorder, 20),

  // Row 1
  makeInnerSection([
    [
      makeIconBox(
        'fas fa-code',
        'Bidvers',
        'Core platform and API behind a real-time hotel upgrade bidding marketplace.\n\n🌐 bidvers.com',
        'https://bidvers.com'
      ),
      makeButton('Visit Live ↗', 'https://bidvers.com', 'fas fa-external-link-alt', '#10b981', '#ffffff', 'left')
    ],
    [
      makeIconBox(
        'fas fa-code',
        'Learn Laravel',
        'Self-learning resources to level up your Laravel skills: tutorials, ebooks, blogs and courses.\n\n🌐 learnlaravel.com',
        'https://learnlaravel.com'
      ),
      makeButton('Visit Live ↗', 'https://learnlaravel.com', 'fas fa-external-link-alt', '#10b981', '#ffffff', 'left')
    ]
  ]),
  makeSpacer(20),

  // Row 2
  makeInnerSection([
    [
      makeIconBox(
        'fas fa-code',
        'Invo',
        'Effortless invoice management, no sign-up needed.\n\n🌐 invo.app',
        'https://invo.app'
      ),
      makeButton('Visit Live ↗', 'https://invo.app', 'fas fa-external-link-alt', '#10b981', '#ffffff', 'left')
    ],
    [
      makeIconBox(
        'fas fa-code',
        'Prompt Filler',
        'Fill prompt placeholders as easily as filling a form.\n\n🌐 promptfiller.com',
        'https://promptfiller.com'
      ),
      makeButton('Visit Live ↗', 'https://promptfiller.com', 'fas fa-external-link-alt', '#10b981', '#ffffff', 'left')
    ]
  ]),
  makeSpacer(20),

  // Row 3
  makeInnerSection([
    [
      makeIconBox(
        'fas fa-code',
        'AI Entity & Schema Generator',
        'Automated schema builder extracting brand knowledge graphs and structuring JSON-LD for AI Overviews & answer engines.\n\n🌐 schema-generator-demo.vercel.app',
        'https://schema-generator-demo.vercel.app'
      ),
      makeButton('Visit Live ↗', 'https://schema-generator-demo.vercel.app', 'fas fa-external-link-alt', '#10b981', '#ffffff', 'left')
    ],
    [
      makeIconBox(
        'fas fa-code',
        'Local Falcon Rank Grid Visualizer',
        'Interactive geo-grid dashboard displaying Google Maps 3-Pack rank heatmaps and competitor positioning.\n\n🌐 rank-grid-demo.vercel.app',
        'https://rank-grid-demo.vercel.app'
      ),
      makeButton('Visit Live ↗', 'https://rank-grid-demo.vercel.app', 'fas fa-external-link-alt', '#10b981', '#ffffff', 'left')
    ]
  ])
]);

// ============================================================================
// SECTION 7: CONTACT & CONSULTATION (#contact)
// ============================================================================
const contactSection = makeCardSection([
  makeHeading('Let’s Build Measurable Organic Growth', 'h2', 'center', '#ffffff', 26, '800'),
  makeTextEditor('Have a campaign, an agency white-label partnership, or a consulting inquiry? Reach out directly below:', 'center', THEME.textMuted),
  makeSpacer(15),

  // Ways We Can Work Together
  makeHeading('Ways We Can Work Together', 'h3', 'left', '#ffffff', 18, '700'),
  makeDivider(THEME.cardBorder, 12),
  makeInnerSection([
    [
      makeIconBox(
        'fas fa-users-cog',
        'White Label Agency Partnership',
        'For digital marketing agencies needing senior execution, custom SOPs, and delivery under strict client confidentiality.'
      )
    ],
    [
      makeIconBox(
        'fas fa-search-dollar',
        'SEO Audit & Diagnostic',
        'Deep technical crawl, Schema.org verification, backlink toxicity review, and an actionable 90-day roadmap.'
      )
    ],
    [
      makeIconBox(
        'fas fa-handshake',
        'Direct Retainer / Team Lead',
        'Monthly ongoing optimization for local business chains, Shopify e-commerce, or B2B enterprise platforms.'
      )
    ]
  ]),
  makeSpacer(25),

  // Direct Channels
  makeHeading('Direct Contact Channels', 'h3', 'left', '#ffffff', 18, '700'),
  makeDivider(THEME.cardBorder, 12),
  makeInnerSection([
    [makeIconBox('fab fa-whatsapp', 'WhatsApp', '+8801688327756', 'https://wa.me/8801688327756', '#25d366', 'top')],
    [makeIconBox('fas fa-envelope', 'Email', 'mizanmahmudseo@gmail.com', 'mailto:mizanmahmudseo@gmail.com', '#3b82f6', 'top')],
    [makeIconBox('fab fa-linkedin', 'LinkedIn', 'in/mizan-seo', 'https://www.linkedin.com/in/mizan-seo/', '#0284c7', 'top')],
    [makeIconBox('fas fa-phone-alt', 'Phone', '+8801688327756', 'tel:+8801688327756', '#a855f7', 'top')]
  ]),
  makeSpacer(25),

  // Interactive Dropdown Accordion Component (Requirement 3: Editable Dropdowns in Elementor)
  makeHeading('Frequently Asked Inquiries & Service Types', 'h3', 'left', '#ffffff', 18, '700'),
  makeDivider(THEME.cardBorder, 12),
  makeAccordion([
    {
      title: 'White Label Agency SEO (How does partnership work?)',
      content: 'I execute all technical audits, on-page optimization, entity mapping, and backlink strategies under your agency’s brand. Deliverables and reports are prepared white-labeled with your logo and presented directly or delivered to your account managers.'
    },
    {
      title: 'Local SEO & Google Business Profile Optimization',
      content: 'Includes full GBP optimization, NAP consistency audits, local schema implementation, citation building, and Geo-grid ranking tracking with Local Falcon to ensure rank dominance across the Local 3-Pack.'
    },
    {
      title: 'AI Search Optimization (GEO & AEO)',
      content: 'Structuring your brand data and digital footprint so answer engines (Google AI Overviews, ChatGPT Search, Claude, and Perplexity) accurately cite and recommend your services.'
    },
    {
      title: 'Technical SEO Audits & Penalty Recovery',
      content: 'Complete crawl budget analysis, Core Web Vitals remediation, structured data validation, and toxic link disavow preparation for websites experiencing indexation drops or manual actions.'
    },
    {
      title: 'Shopify / E-Commerce Organic Growth',
      content: 'Category structure optimization, faceted navigation crawl budget control, high-intent commercial keyword targeting, and schema markup to capture high-converting transactional traffic.'
    },
    {
      title: 'Availability & Working Hours',
      content: 'I am currently available 6–8 hours/day for remote contracts, full-time agency positions, and ongoing client retainers, with convenient overlap with US, UK, and European business hours.'
    }
  ]),
  makeSpacer(25),

  // Quick Action Buttons
  makeInnerSection([
    [makeButton('Chat on WhatsApp (+8801688327756)', 'https://wa.me/8801688327756?text=Hi%20Mizanur,%20I%20would%20like%20to%20discuss%20an%20SEO%20project', 'fab fa-whatsapp', '#10b981', '#ffffff', 'center')],
    [makeButton('Send Email Inquiry', 'mailto:mizanmahmudseo@gmail.com?subject=SEO%20Inquiry%20from%20Portfolio', 'fas fa-paper-plane', '#1f2026', '#ffffff', 'center')]
  ]),
  makeSpacer(20),
  makeDivider(THEME.cardBorder, 15),
  makeTextEditor('<div style="text-align: center; color: #6b7280; font-size: 12px;">© 2026 Md. Mizanur Rahaman · SEO Strategist & AI Search Specialist</div>', 'center', '#6b7280')
]);

// ============================================================================
// FULL COMPLETE ELEMENTOR JSON TEMPLATE
// ============================================================================
const completeElementorTemplate = {
  version: '0.4',
  title: 'Md. Mizanur Rahaman - Complete SEO Portfolio Website',
  type: 'page',
  page_settings: {
    template: 'elementor_canvas',
    background_background: 'classic',
    background_color: THEME.pageBg
  },
  content: [
    heroSection,
    navTabsSection,
    resumeSection,
    caseStudiesSection,
    servicesSection,
    vibeCodingSection,
    contactSection
  ]
};

const outputPath = path.resolve(process.cwd(), 'elementor-complete-portfolio-template.json');
fs.writeFileSync(outputPath, JSON.stringify(completeElementorTemplate, null, 2), 'utf-8');

console.log('✅ Successfully created Complete Elementor JSON Template at: ' + outputPath);
console.log('Total top-level sections:', completeElementorTemplate.content.length);
