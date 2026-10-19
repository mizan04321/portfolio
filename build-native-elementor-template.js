import fs from 'fs';
import path from 'path';

function uid() {
  return Math.random().toString(16).substring(2, 9);
}

// Visual Elementor Widget Builder Helpers
function makeHeading(title, tag = 'h2', align = 'left', color = '#0f172a', fontSize = 28, weight = '700') {
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
      typography_font_family: 'Plus Jakarta Sans',
      typography_font_size: { unit: 'px', size: fontSize },
      typography_font_weight: String(weight)
    },
    elements: []
  };
}

function makeTextEditor(htmlContent, align = 'left', color = '#475569') {
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
      typography_font_family: 'Plus Jakarta Sans',
      typography_font_size: { unit: 'px', size: 15 },
      typography_line_height: { unit: 'em', size: 1.6 }
    },
    elements: []
  };
}

function makeButton(text, url, icon = 'fas fa-arrow-right', bg = '#0f9459', color = '#ffffff', align = 'center') {
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
        library: 'fa-solid'
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
      typography_font_family: 'Plus Jakarta Sans',
      typography_font_weight: '600',
      button_box_shadow_box_shadow_type: 'yes',
      button_box_shadow_box_shadow: {
        horizontal: 0,
        vertical: 6,
        blur: 18,
        spread: -4,
        color: 'rgba(15, 148, 89, 0.4)'
      }
    },
    elements: []
  };
}

function makeCounter(number, suffix, title, color = '#0f9459') {
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
      title_color: '#64748b',
      typography_number_typography: 'custom',
      typography_number_font_family: 'Plus Jakarta Sans',
      typography_number_font_weight: '800',
      typography_number_font_size: { unit: 'px', size: 36 },
      typography_title_typography: 'custom',
      typography_title_font_family: 'Plus Jakarta Sans',
      typography_title_font_weight: '600',
      typography_title_font_size: { unit: 'px', size: 13 }
    },
    elements: []
  };
}

function makeIconBox(icon, title, desc, linkUrl = null, iconColor = '#0f9459', position = 'left') {
  const settings = {
    selected_icon: {
      value: icon,
      library: 'fa-solid'
    },
    title_text: title,
    description_text: desc,
    position: position,
    primary_color: iconColor,
    title_color: '#0f172a',
    description_color: '#475569',
    typography_title_typography: 'custom',
    typography_title_font_family: 'Plus Jakarta Sans',
    typography_title_font_weight: '700',
    typography_title_font_size: { unit: 'px', size: 16 },
    typography_description_typography: 'custom',
    typography_description_font_family: 'Plus Jakarta Sans',
    typography_description_font_size: { unit: 'px', size: 14 },
    typography_description_line_height: { unit: 'em', size: 1.5 }
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

function makeIconList(items, iconColor = '#0f9459') {
  return {
    id: uid(),
    elType: 'widget',
    widgetType: 'icon-list',
    isInner: false,
    settings: {
      icon_color: iconColor,
      text_color: '#334155',
      typography_typography: 'custom',
      typography_font_family: 'Plus Jakarta Sans',
      typography_font_size: { unit: 'px', size: 14 },
      icon_list: items.map(item => ({
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

function makeDivider(color = '#e2e8e5', gap = 20) {
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

function makeSpacer(size = 25) {
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

function makeImage(url, width = 120) {
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
      image_size: 'thumbnail',
      width: { unit: 'px', size: width },
      border_radius: { unit: 'px', top: '999', right: '999', bottom: '999', left: '999', isLinked: true },
      border_border: 'solid',
      border_width: { unit: 'px', top: '4', right: '4', bottom: '4', left: '4', isLinked: true },
      border_color: '#ffffff',
      box_shadow_box_shadow_type: 'yes',
      box_shadow_box_shadow: {
        horizontal: 0,
        vertical: 10,
        blur: 25,
        spread: -5,
        color: 'rgba(0, 0, 0, 0.2)'
      }
    },
    elements: []
  };
}

// Wrapper to build a section with columns
function makeSection(columnWidgetsArray, settings = {}) {
  const colSize = Math.floor(100 / columnWidgetsArray.length);
  return {
    id: uid(),
    elType: 'section',
    isInner: false,
    settings: {
      content_width: 'boxed',
      boxed_width: { unit: 'px', size: 920 },
      padding: {
        unit: 'px',
        top: '30',
        right: '20',
        bottom: '30',
        left: '20',
        isLinked: false
      },
      ...settings
    },
    elements: columnWidgetsArray.map(widgets => ({
      id: uid(),
      elType: 'column',
      isInner: false,
      settings: {
        _column_size: colSize,
        padding: { unit: 'px', top: '10', right: '10', bottom: '10', left: '10', isLinked: true }
      },
      elements: widgets
    }))
  };
}

// Inner section generator
function makeInnerSection(columnsWidgets) {
  const colSize = Math.floor(100 / columnsWidgets.length);
  return {
    id: uid(),
    elType: 'section',
    isInner: true,
    settings: {
      gap: 'default'
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

// ==========================================
// BUILD SECTIONS
// ==========================================

// 1. HERO SECTION
const heroSection = {
  id: uid(),
  elType: 'section',
  isInner: false,
  settings: {
    background_background: 'gradient',
    background_color: '#063f29',
    background_color_b: '#0a7f4f',
    background_gradient_angle: { unit: 'deg', size: 145 },
    padding: { unit: 'px', top: '60', right: '20', bottom: '50', left: '20', isLinked: false },
    border_radius: { unit: 'px', top: '24', right: '24', bottom: '24', left: '24', isLinked: true },
    margin: { unit: 'px', top: '20', right: '10', bottom: '25', left: '10', isLinked: false },
    box_shadow_box_shadow_type: 'yes',
    box_shadow_box_shadow: {
      horizontal: 0,
      vertical: 12,
      blur: 35,
      spread: -8,
      color: 'rgba(10, 127, 79, 0.35)'
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
        makeHeading('Md. Mizanur Rahaman', 'h1', 'center', '#ffffff', 36, '800'),
        makeHeading('White Label SEO Strategist · Local & Ecommerce SEO · AI Search (GEO/AEO)', 'h3', 'center', '#a7f3d0', 16, '600'),
        makeHeading('🟢 Available 6–8 hrs/day for Full-Time, Remote & Agency Consulting Roles', 'h4', 'center', '#ffffff', 13, '600'),
        makeTextEditor('🏢 Senior SEO Executive & Team Lead at <strong>CrazyGraph Marketing Agency</strong> &nbsp;|&nbsp; 📍 Chittagong, Bangladesh (GMT+6)', 'center', '#e2e8e5'),
        makeSpacer(15),
        makeInnerSection([
          [makeButton('Chat on WhatsApp', 'https://wa.me/8801688327756', 'fab fa-whatsapp', '#25d366', '#ffffff', 'right')],
          [makeButton('Connect on LinkedIn', 'https://www.linkedin.com/in/mizan-seo/', 'fab fa-linkedin', '#ffffff', '#0f172a', 'left')]
        ])
      ]
    }
  ]
};

// 2. STATS & KEY PROOF SECTION (4 Column Counters)
const statsSection = {
  id: uid(),
  elType: 'section',
  isInner: false,
  settings: {
    padding: { unit: 'px', top: '20', right: '10', bottom: '20', left: '10', isLinked: false }
  },
  elements: [
    {
      id: uid(),
      elType: 'column',
      isInner: false,
      settings: { _column_size: 100 },
      elements: [
        makeInnerSection([
          [makeCounter(1200, '+', 'Calls Generated via GBP')],
          [makeCounter(30, '+', 'Managed SEO Projects')],
          [makeCounter(3, '×', 'Organic Ranking Surge')],
          [makeCounter(1900, '+', 'Shopify Clicks in 90 Days')]
        ])
      ]
    }
  ]
};

// 3. ABOUT ME SECTION
const aboutSection = {
  id: uid(),
  elType: 'section',
  isInner: false,
  settings: {
    padding: { unit: 'px', top: '25', right: '10', bottom: '25', left: '10', isLinked: false }
  },
  elements: [
    {
      id: uid(),
      elType: 'column',
      isInner: false,
      settings: { _column_size: 100 },
      elements: [
        makeHeading('About Md. Mizanur Rahaman', 'h2', 'left', '#0f172a', 26, '800'),
        makeDivider('#e2e8e5', 15),
        makeTextEditor(
          '<p>I’m an <strong>SEO Strategist with 4+ years of experience</strong> at digital marketing agencies such as Markeion and CrazyGraph, where I worked as both a Junior and Senior SEO Executive. I have experience in both remote and in-house environments, working with UK-based agencies and freelance clients across the <strong>USA, UK, UAE, and the Netherlands</strong>.</pp><p>My expertise covers both local and national SEO, including growing a local business from <strong>50 to 1,200+ calls in just 5 months</strong> through strategic Google Business Profile optimization. I build strong technical, semantic, and topical foundations that search engines and AI answer engines can understand, trust, and reward.</p><p>As search evolves into conversational engines, I engineer <strong>Answer Engine Optimization (AEO)</strong> and <strong>Generative Engine Optimization (GEO)</strong> to secure client visibility across Google AI Overviews, ChatGPT, Claude, and Perplexity.</p>',
          'left',
          '#334155'
        ),
        makeSpacer(10),
        makeInnerSection([
          [
            makeIconBox(
              'fas fa-map-marker-alt',
              'Based in Chittagong, Bangladesh',
              'Asia/Dhaka time zone (GMT+6). Smooth overlap with US, UK, and European business hours for agile communication.'
            )
          ],
          [
            makeIconBox(
              'fas fa-globe-americas',
              'Remote-First & White Label Ready',
              'Experienced executing under strict agency NDAs with client-branded reporting, custom SOPs, and prompt turnarounds.'
            )
          ]
        ])
      ]
    }
  ]
};

// 4. EXPERIENCE SECTION
const experienceSection = {
  id: uid(),
  elType: 'section',
  isInner: false,
  settings: {
    padding: { unit: 'px', top: '25', right: '10', bottom: '25', left: '10', isLinked: false }
  },
  elements: [
    {
      id: uid(),
      elType: 'column',
      isInner: false,
      settings: { _column_size: 100 },
      elements: [
        makeHeading('Professional Experience', 'h2', 'left', '#0f172a', 26, '800'),
        makeDivider('#e2e8e5', 15),
        makeIconBox(
          'fas fa-briefcase',
          'Senior SEO Executive & Team Lead — CrazyGraph Marketing Agency',
          'Nov 2024 – Present | Bangladesh (In-house)\n• Managing 30+ SEO projects across local, national, multilingual, multi-location, and B2B campaigns in healthcare and other industries across USA, UK, and UAE.\n• Developed personalized agency SOPs driving measurable growth within 3–6 months.\n• Implemented AI-powered SEO strategies across Google SERPs, AI Overviews, and LLMs (ChatGPT, Grok, Claude).'
        ),
        makeDivider('#f1f5f9', 10),
        makeIconBox(
          'fas fa-laptop-code',
          'Freelance SEO Executive (Project Basis) — Valley Industry Supply',
          'May 2026 – Present | USA (Remote)\n• Built Google Business Profile and link-building strategies, providing actionable recommendations to improve local rankings.\n• Managed link-building campaigns for B2B manufacturing across USA and Mexico.'
        ),
        makeDivider('#f1f5f9', 10),
        makeIconBox(
          'fas fa-tools',
          'Freelance Technical SEO Strategist — Ramies Taxi',
          'Jan 2025 – Jun 2025 | UK (Remote)\n• Audited and fixed technical SEO issues using GSC, Semrush, and Screaming Frog, including Core Web Vitals, page speed, schema, and indexing.\n• Identified and disavowed 300+ harmful backlinks, driving a 3× improvement in organic rankings into Top 5 results.'
        ),
        makeDivider('#f1f5f9', 10),
        makeIconBox(
          'fas fa-chart-line',
          'Junior SEO Executive — Markeion Software Company',
          'Aug 2023 – Sep 2024 | UK (Remote)\n• Executed keyword research, on-page & technical SEO, link building, page speed, schema, LLM optimization, and GBP optimization for local, national, and e-commerce clients.'
        ),
        makeDivider('#f1f5f9', 10),
        makeIconBox(
          'fas fa-shopping-cart',
          'Freelance Ecommerce SEO Strategist — Fanflix BD',
          'Jun 2023 – Sep 2023 | Dhaka, Bangladesh (Remote)\n• Scaled a Shopify e-commerce store selling digital products from 300 to 1.9K+ organic clicks in 3 months.'
        ),
        makeDivider('#f1f5f9', 10),
        makeIconBox(
          'fas fa-store-alt',
          'Freelance Local SEO Strategist — Local Businesses Worldwide',
          'Jan 2023 – Present\n• UK Pharmacy: Complete local SEO overhaul generating 1,200+ calls in 6 months.\n• Houston Landscaping: Generated 330 calls in a single month through GBP optimization.\n• Oldham Chiropody Clinic: Optimized GBP to produce direct bookings directly via Google Maps.'
        )
      ]
    }
  ]
};

// 5. CASE STUDY HIGHLIGHTS SECTION
const caseStudiesSection = {
  id: uid(),
  elType: 'section',
  isInner: false,
  settings: {
    padding: { unit: 'px', top: '25', right: '10', bottom: '25', left: '10', isLinked: false }
  },
  elements: [
    {
      id: uid(),
      elType: 'column',
      isInner: false,
      settings: { _column_size: 100 },
      elements: [
        makeHeading('Case Study Highlights', 'h2', 'left', '#0f172a', 26, '800'),
        makeDivider('#e2e8e5', 15),
        makeInnerSection([
          [
            makeIconBox(
              'fas fa-shopping-bag',
              'Shopify E-Commerce Growth',
              'Increased organic clicks from 300 to 1.9K+ within 3 months via keyword intent mapping, technical category audits, and structured product schema.'
            )
          ],
          [
            makeIconBox(
              'fas fa-hospital-user',
              'UK Healthcare (7 Google Business Profiles)',
              'Managed multi-location local SEO for a UK-based healthcare business across 7 GBPs, securing dominant Google Maps 3-Pack visibility and patient leads.'
            )
          ]
        ]),
        makeSpacer(10),
        makeInnerSection([
          [
            makeIconBox(
              'fas fa-shield-alt',
              'UK Taxi Technical SEO & Disavow Recovery',
              'Fixed Core Web Vitals, audited link health, and disavowed 300+ spammy backlinks, propelling target keywords from position 10+ into Top 5 organic rankings.'
            )
          ],
          [
            makeIconBox(
              'fas fa-phone-volume',
              'High-Converting Local Lead Generation',
              'Generated 1,200+ calls within 6 months for a UK pharmacy, and 330 calls in a single month for a Houston, USA landscaping enterprise.'
            )
          ]
        ])
      ]
    }
  ]
};

// 6. CORE SKILLS & TOOLS SECTION
const skillsSection = {
  id: uid(),
  elType: 'section',
  isInner: false,
  settings: {
    padding: { unit: 'px', top: '25', right: '10', bottom: '25', left: '10', isLinked: false }
  },
  elements: [
    {
      id: uid(),
      elType: 'column',
      isInner: false,
      settings: { _column_size: 100 },
      elements: [
        makeHeading('Core Competencies & Tools', 'h2', 'left', '#0f172a', 26, '800'),
        makeDivider('#e2e8e5', 15),
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
          [
            makeIconBox('fas fa-spider', 'SEO & Research', 'Screaming Frog, Ahrefs, Semrush, Moz, Surfer SEO, Frase, Local Falcon, Ubersuggest')
          ],
          [
            makeIconBox('fas fa-chart-pie', 'Analytics & Data', 'Google Search Console, GA4, Google Tag Manager, Looker Studio, Google Sheets')
          ],
          [
            makeIconBox('fas fa-desktop', 'CMS & Platforms', 'WordPress, Shopify, Webflow, Wix, WooCommerce, Drupal')
          ],
          [
            makeIconBox('fas fa-brain', 'AI & LLM Tools', 'ChatGPT, Claude, Claude Code, Antigravity 2.0, Gemini, Perplexity, Grok')
          ]
        ])
      ]
    }
  ]
};

// 7. EDUCATION & CERTIFICATIONS SECTION
const credentialsSection = {
  id: uid(),
  elType: 'section',
  isInner: false,
  settings: {
    padding: { unit: 'px', top: '25', right: '10', bottom: '25', left: '10', isLinked: false }
  },
  elements: [
    {
      id: uid(),
      elType: 'column',
      isInner: false,
      settings: { _column_size: 100 },
      elements: [
        makeHeading('Education & Certifications', 'h2', 'left', '#0f172a', 26, '800'),
        makeDivider('#e2e8e5', 15),
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
            ], '#0f9459')
          ]
        ])
      ]
    }
  ]
};

// 8. CONTACT SECTION
const contactSection = {
  id: uid(),
  elType: 'section',
  isInner: false,
  settings: {
    background_background: 'classic',
    background_color: '#f8faf9',
    border_radius: { unit: 'px', top: '20', right: '20', bottom: '20', left: '20', isLinked: true },
    border_border: 'solid',
    border_width: { unit: 'px', top: '1', right: '1', bottom: '1', left: '1', isLinked: true },
    border_color: '#e2e8e5',
    padding: { unit: 'px', top: '45', right: '20', bottom: '45', left: '20', isLinked: false },
    margin: { unit: 'px', top: '25', right: '10', bottom: '40', left: '10', isLinked: false }
  },
  elements: [
    {
      id: uid(),
      elType: 'column',
      isInner: false,
      settings: { _column_size: 100 },
      elements: [
        makeHeading('Let’s Build Something Great Together', 'h2', 'center', '#0f172a', 26, '800'),
        makeTextEditor('Have an SEO project, an agency white-label partnership, or a consultation inquiry? Reach out directly below:', 'center', '#64748b'),
        makeSpacer(15),
        makeInnerSection([
          [makeIconBox('fab fa-whatsapp', 'WhatsApp', '+8801688327756', 'https://wa.me/8801688327756', '#25d366', 'top')],
          [makeIconBox('fas fa-envelope', 'Email', 'mizanmahmudseo@gmail.com', 'mailto:mizanmahmudseo@gmail.com', '#2563eb', 'top')],
          [makeIconBox('fab fa-linkedin', 'LinkedIn', 'in/mizan-seo', 'https://www.linkedin.com/in/mizan-seo/', '#0284c7', 'top')],
          [makeIconBox('fas fa-phone-alt', 'Phone', '+8801688327756', 'tel:+8801688327756', '#9333ea', 'top')]
        ]),
        makeSpacer(20),
        makeButton('Chat on WhatsApp (+8801688327756)', 'https://wa.me/8801688327756?text=Hi%20Mizanur,%20I%20would%20like%20to%20discuss%20an%20SEO%20project', 'fab fa-whatsapp', '#0f9459', '#ffffff', 'center')
      ]
    }
  ]
};

// ==========================================
// FULL ELEMENTOR JSON DOCUMENT
// ==========================================
const visualElementorTemplate = {
  version: '0.4',
  title: 'Md. Mizanur Rahaman - Visual SEO Portfolio Homepage',
  type: 'page',
  page_settings: {
    template: 'elementor_canvas'
  },
  content: [
    heroSection,
    statsSection,
    aboutSection,
    experienceSection,
    caseStudiesSection,
    skillsSection,
    credentialsSection,
    contactSection
  ]
};

const outputPath = path.resolve(process.cwd(), 'elementor-visual-portfolio-template.json');
fs.writeFileSync(outputPath, JSON.stringify(visualElementorTemplate, null, 2), 'utf-8');

console.log('Successfully created Visual Elementor JSON at: ' + outputPath);
