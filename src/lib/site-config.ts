/**
 * EDITABLE CONTENT CONFIG
 * -----------------------
 * Everything the site displays lives here. Update copy, services,
 * sub-category groups, items and social links without touching layout code.
 */

export const site = {
  brand: "BRINCO",
  tagline: "A creative and digital studio. Brand, web, content, campaigns and film.",
  hero: {
    eyebrow: "What we do",
    headline: "BRINCO",
    subhead: "Book your next project",
  },
  email: "kailainathanjeiharey@gmail.com",
  /** Add real profile URLs here. Empty string = icon hidden. */
  socials: [
    { label: "Facebook", icon: "facebook", url: "https://www.facebook.com/profile.php?id=61551897634287&_rdc=1&_rdr#" },
    { label: "Instagram", icon: "instagram", url: "https://www.instagram.com/brinco.media/" },
    { label: "WhatsApp", icon: "whatsapp", url: "" },
    { label: "Threads", icon: "threads", url: "" },
    { label: "X", icon: "x", url: "" },
    { label: "LinkedIn", icon: "linkedin", url: "" },
  ],
} as const;


export type ServiceItem = {
  id: string;
  name: string;
  description: string;
};

export type ServiceGroup = {
  id: string;
  name: string;
  items: ServiceItem[];
};

export type Service = {
  slug: string;
  number: string;
  title: string;
  summary: string;
  groups: ServiceGroup[];
};

export const services: Service[] = [
  {
    slug: "logo-brand-identity",
    number: "01",
    title: "Logo Design & Brand Identity",
    summary: "Marks, systems and guidelines that hold a brand together.",
    groups: [
      {
        id: "logo-design",
        name: "Logo Design",
        items: [
          { id: "logo-concepts", name: "Logo Concepts", description: "Multiple original logo directions exploring different visual approaches for your brand mark." },
          { id: "logo-refinement", name: "Logo Refinement", description: "Polishing a chosen concept — refining shapes, spacing and details until it's launch-ready." },
          { id: "logo-variations", name: "Logo Variations", description: "Horizontal, stacked, icon-only and reversed versions built for every placement." },
          { id: "icon-monogram", name: "Icon / Monogram Design", description: "A standalone icon or lettermark that works as an app icon, favicon or stamp." },
          { id: "logo-guidelines", name: "Logo Guidelines", description: "Clear rules for logo spacing, sizing, colour use and what to avoid." },
        ],
      },
      {
        id: "brand-strategy-identity",
        name: "Brand Strategy & Identity",
        items: [
          { id: "brand-positioning", name: "Brand Positioning", description: "Defining where you sit in the market and why customers should pick you over the alternative." },
          { id: "brand-strategy", name: "Brand Strategy", description: "The thinking behind the brand — audience, positioning and goals mapped out before any design starts." },
          { id: "colour-systems", name: "Colour Systems", description: "A defined palette with primary, secondary and accent colours, built for consistency." },
          { id: "typography-systems", name: "Typography Systems", description: "Font pairings and a type scale for headings, body copy and UI." },
          { id: "brand-voice", name: "Brand Voice", description: "How your brand sounds in writing — tone, vocabulary and personality guidelines." },
          { id: "visual-language", name: "Visual Language", description: "Recurring shapes, patterns and imagery style that make your brand recognisable at a glance." },
          { id: "brand-guidelines", name: "Brand Guidelines", description: "A single reference document covering logo, colour, type and tone of voice." },
        ],
      },
      {
        id: "brand-collateral",
        name: "Brand Collateral",
        items: [
          { id: "business-cards", name: "Business Cards", description: "Printable, on-brand business card designs ready for the printer." },
          { id: "letterheads", name: "Letterheads", description: "Branded letterhead templates for official and formal correspondence." },
          { id: "email-signatures", name: "Email Signatures", description: "A clean, on-brand signature block for every team member's inbox." },
          { id: "invoices-quotations", name: "Invoices & Quotations", description: "Branded invoice and quotation templates that look as professional as the work itself." },
          { id: "presentation-templates", name: "Presentation Templates", description: "A branded slide deck template for pitches, proposals and reports." },
          { id: "social-templates-collateral", name: "Social Media Templates", description: "Reusable post and story templates that keep every channel on-brand." },
        ],
      },
    ],
  },
  {
    slug: "web-design-development",
    number: "02",
    title: "Web Design & Development",
    summary: "Websites designed, built and kept running, from landing page to store.",
    groups: [
      {
        id: "website-design",
        name: "Website Design",
        items: [
          { id: "ui-ux-design", name: "UI/UX Design", description: "Interface design focused on how a site looks, feels and flows." },
          { id: "landing-pages", name: "Landing Pages", description: "A single-page design built around one clear goal or offer." },
          { id: "business-websites", name: "Business Websites", description: "A multi-page website designed to represent your business online." },
          { id: "corporate-websites", name: "Corporate Websites", description: "A polished, larger-scale website suited to established organisations." },
          { id: "ecommerce-websites", name: "E-commerce Websites", description: "An online store designed for browsing, product discovery and checkout." },
        ],
      },
      {
        id: "development",
        name: "Development",
        items: [
          { id: "responsive-development", name: "Responsive Development", description: "Building the site so it works properly on every screen size." },
          { id: "cms-websites", name: "CMS Websites", description: "A website built on a content management system you can update yourself." },
          { id: "ecommerce-development", name: "E-commerce Development", description: "The technical build behind an online store, from products to payments." },
          { id: "website-integrations", name: "Website Integrations", description: "Connecting your site to the tools and platforms your business runs on." },
          { id: "custom-website-solutions", name: "Custom Website Solutions", description: "A bespoke build for requirements a template can't handle." },
        ],
      },
      {
        id: "digital-experience",
        name: "Digital Experience",
        items: [
          { id: "user-journey-design", name: "User Journey Design", description: "Mapping out how a visitor moves through your site, step by step." },
          { id: "conversion-focused-design", name: "Conversion-focused Design", description: "Design decisions made specifically to encourage enquiries and sales." },
          { id: "landing-page-optimisation", name: "Landing Page Optimisation", description: "Testing and refining a landing page to lift its conversion rate." },
          { id: "mobile-first-design", name: "Mobile-first Design", description: "Designed for mobile screens first, since that's where most visitors are." },
        ],
      },
      {
        id: "website-maintenance-support",
        name: "Website Maintenance & Support",
        items: [
          { id: "website-maintenance", name: "Website Maintenance", description: "Ongoing upkeep to keep your site running smoothly." },
          { id: "content-updates", name: "Content Updates", description: "Regular updates to text, images and pages as your business changes." },
          { id: "performance-optimisation-web", name: "Performance Optimisation", description: "Speeding up load times and overall site performance." },
          { id: "security-updates", name: "Security Updates", description: "Keeping your site's software and plugins patched and secure." },
          { id: "technical-support", name: "Technical Support", description: "On-call help when something on your website needs fixing." },
        ],
      },
    ],
  },
  {
    slug: "social-media-content",
    number: "03",
    title: "Social Media & Content",
    summary: "Content, campaigns and day-to-day management for social channels.",
    groups: [
      {
        id: "content-creation",
        name: "Content Creation",
        items: [
          { id: "static-posts", name: "Static Social Media Posts", description: "Individually designed feed posts for announcements, quotes and promotions." },
          { id: "carousels", name: "Carousels", description: "Multi-slide carousel posts built to educate, tell a story or drive saves." },
          { id: "reels-shortform", name: "Reels & Short-form Content", description: "Short vertical video content edited for Reels, TikTok and Shorts." },
          { id: "stories", name: "Stories", description: "Story-format graphics and templates designed for full-screen mobile viewing." },
          { id: "social-templates-creation", name: "Social Media Templates", description: "A reusable design system so future posts stay consistent without starting from scratch." },
        ],
      },
      {
        id: "social-management",
        name: "Social Media Management",
        items: [
          { id: "content-planning", name: "Content Planning", description: "Mapping out what gets posted, where and when, ahead of each month." },
          { id: "content-calendars", name: "Monthly Content Calendars", description: "A full calendar of scheduled content, planned around key dates and campaigns." },
          { id: "platform-management", name: "Platform Management", description: "Day-to-day posting, scheduling and upkeep across your chosen social platforms." },
          { id: "community-management", name: "Community Management", description: "Responding to comments and messages to keep your audience engaged." },
          { id: "performance-reporting", name: "Performance Reporting", description: "A regular look at what's working, with numbers to back it up." },
        ],
      },
      {
        id: "campaign-creative",
        name: "Campaign Creative",
        items: [
          { id: "campaign-key-visuals-social", name: "Campaign Key Visuals", description: "The core visual that anchors a campaign across every asset and channel." },
          { id: "promotional-creatives", name: "Promotional Creatives", description: "Eye-catching designs built to promote an offer, sale or announcement." },
          { id: "product-service-campaigns", name: "Product / Service Campaigns", description: "Creative built to launch or spotlight a specific product or service." },
          { id: "seasonal-campaigns", name: "Seasonal Campaigns", description: "Timely creative for holidays, seasons and recurring calendar moments." },
          { id: "social-ad-creatives", name: "Social Media Ad Creatives", description: "Scroll-stopping creative sized and built for paid social placements." },
        ],
      },
      {
        id: "content-strategy",
        name: "Content Strategy",
        items: [
          { id: "content-strategy-item", name: "Content Strategy", description: "A plan for what you post and why, tied back to real goals rather than guesswork." },
          { id: "audience-research", name: "Audience Research", description: "Understanding who you're actually talking to, so content lands instead of just going out." },
          { id: "content-pillars", name: "Content Pillars", description: "The core themes your content rotates around, so every post ties back to the brand." },
          { id: "platform-strategy", name: "Platform Strategy", description: "Deciding which platforms are worth your time and how content should differ across them." },
          { id: "campaign-planning", name: "Campaign Planning", description: "Mapping out a content campaign from concept through to publishing schedule." },
        ],
      },
      {
        id: "monthly-retainers",
        name: "Monthly Retainers",
        items: [
          { id: "bronze", name: "Bronze", description: "An entry-level monthly package covering the essential social media output." },
          { id: "silver", name: "Silver", description: "A mid-tier monthly package with more content and closer management." },
          { id: "gold", name: "Gold", description: "A comprehensive monthly package for brands that need full-service social support." },
          { id: "custom-retainer", name: "Custom", description: "A tailored monthly scope built around your specific goals and volume." },
        ],
      },
    ],
  },
  {
    slug: "creative-production",
    number: "04",
    title: "Creative & Production",
    summary: "Print, packaging, signage and motion — creative wherever a brand shows up.",
    groups: [
      {
        id: "advertising-campaigns",
        name: "Advertising & Campaigns",
        items: [
          { id: "campaign-key-visuals-creative", name: "Campaign Key Visuals", description: "The lead visual that ties an advertising campaign together." },
          { id: "advertising-creatives", name: "Advertising Creatives", description: "Designed creative for print, digital or outdoor advertising placements." },
          { id: "promotional-materials", name: "Promotional Materials", description: "Supporting creative built to promote an offer or event." },
          { id: "digital-campaign-assets", name: "Digital Campaign Assets", description: "A full set of sized, ready-to-use assets for a digital campaign." },
        ],
      },
      {
        id: "print-marketing-materials",
        name: "Print & Marketing Materials",
        items: [
          { id: "brochures", name: "Brochures", description: "Multi-page brochure design for products, services or company information." },
          { id: "flyers", name: "Flyers", description: "Single-sheet flyer design for promotions, events or announcements." },
          { id: "posters", name: "Posters", description: "Large-format poster design built to catch attention from a distance." },
          { id: "company-profiles", name: "Company Profiles", description: "A professional document introducing your business to clients and partners." },
          { id: "presentation-design", name: "Presentation Design", description: "Custom-designed slides for pitches, reports and proposals." },
        ],
      },
      {
        id: "brand-applications",
        name: "Brand Applications",
        items: [
          { id: "packaging-design", name: "Packaging Design", description: "Product packaging designed to stand out on a shelf or screen." },
          { id: "signage", name: "Signage", description: "Branded signage design for storefronts, offices and events." },
          { id: "vehicle-branding", name: "Vehicle Branding", description: "Branding layouts designed for cars, vans and fleet vehicles." },
          { id: "merchandise", name: "Merchandise", description: "Branded designs for apparel, giveaways and promotional items." },
          { id: "event-materials", name: "Event Materials", description: "Design for banners, badges and other on-site event materials." },
        ],
      },
      {
        id: "motion-visual-content",
        name: "Motion & Visual Content",
        items: [
          { id: "logo-animation", name: "Logo Animation", description: "A short animated version of your logo for intros and outros." },
          { id: "motion-graphics", name: "Motion Graphics", description: "Animated graphics used to explain, promote or add visual interest." },
          { id: "promotional-videos", name: "Promotional Videos", description: "Short edited videos built to promote a product, service or brand." },
          { id: "social-media-motion", name: "Social Media Motion", description: "Motion content designed specifically for social feeds and stories." },
          { id: "animated-ads", name: "Animated Ads", description: "Animated creative built for video ad placements." },
        ],
      },
      {
        id: "creative-production-group",
        name: "Creative Production",
        items: [
          { id: "ai-assisted-visuals", name: "AI-assisted Visuals", description: "Concept and reference visuals produced with AI tools, refined and art-directed by hand." },
          { id: "product-visuals", name: "Product Visuals", description: "Clean, styled visuals of your product built for web, social and advertising use." },
          { id: "creative-concepts", name: "Creative Concepts", description: "The initial ideas and direction behind a campaign, presented before full production begins." },
          { id: "art-direction", name: "Art Direction", description: "Overseeing the visual style of a shoot or campaign so everything looks intentional and consistent." },
          { id: "visual-production", name: "Visual Production", description: "Hands-on production of the final visual assets, from setup through to delivery." },
        ],
      },
    ],
  },
  {
    slug: "digital-marketing",
    number: "05",
    title: "Digital Marketing",
    summary: "Paid media, search visibility and lead generation, tracked properly.",
    groups: [
      {
        id: "paid-advertising",
        name: "Paid Advertising",
        items: [
          { id: "meta-ads", name: "Meta Ads", description: "Facebook and Instagram ad campaigns built, targeted and launched for you." },
          { id: "google-ads", name: "Google Ads", description: "Search and display ad campaigns set up to reach people actively looking." },
          { id: "campaign-setup", name: "Campaign Setup", description: "Structuring a new ad account and campaign from the ground up." },
          { id: "campaign-management", name: "Campaign Management", description: "Ongoing oversight, budget adjustments and optimisation of live campaigns." },
          { id: "retargeting", name: "Retargeting", description: "Ads aimed at people who've already visited your site or shown interest." },
        ],
      },
      {
        id: "seo",
        name: "SEO",
        items: [
          { id: "keyword-research", name: "Keyword Research", description: "Finding the terms your customers are actually searching for." },
          { id: "on-page-seo", name: "On-Page SEO", description: "Optimising page titles, content and structure so search engines understand your site." },
          { id: "technical-seo", name: "Technical SEO", description: "Fixing the behind-the-scenes issues that hold back search performance." },
          { id: "local-seo", name: "Local SEO", description: "Improving visibility for people searching for your business nearby." },
          { id: "seo-content-strategy", name: "SEO Content Strategy", description: "A content plan built around the topics your audience searches for." },
        ],
      },
      {
        id: "lead-generation",
        name: "Lead Generation",
        items: [
          { id: "lead-campaigns", name: "Lead Campaigns", description: "Campaigns designed specifically to capture new leads, not just traffic." },
          { id: "landing-page-campaigns", name: "Landing Page Campaigns", description: "A focused landing page paired with traffic to drive one specific action." },
          { id: "lead-funnels", name: "Lead Funnels", description: "A structured path that guides a visitor from interest to enquiry." },
          { id: "conversion-optimisation-leadgen", name: "Conversion Optimisation", description: "Refining pages and funnels to turn more visitors into leads." },
          { id: "lead-tracking", name: "Lead Tracking", description: "Setting up the tools to see exactly where your leads come from." },
        ],
      },
      {
        id: "conversion-growth",
        name: "Conversion & Growth",
        items: [
          { id: "cro", name: "Conversion Rate Optimisation", description: "Testing and refining pages to turn more of your existing traffic into customers." },
          { id: "funnel-strategy", name: "Funnel Strategy", description: "Mapping the path from first visit to conversion, and fixing where people drop off." },
          { id: "ab-testing", name: "A/B Testing", description: "Running structured tests on pages or campaigns to see what actually performs better." },
          { id: "marketing-automation", name: "Marketing Automation", description: "Setting up automated flows that follow up, nurture and convert without manual work." },
        ],
      },
      {
        id: "analytics-reporting",
        name: "Analytics & Reporting",
        items: [
          { id: "campaign-reporting", name: "Campaign Reporting", description: "Clear, regular reports on how your marketing campaigns are performing." },
          { id: "performance-analysis", name: "Performance Analysis", description: "A closer look at the numbers to explain what's driving results." },
          { id: "audience-insights", name: "Audience Insights", description: "Understanding who your audience is and how they behave online." },
          { id: "conversion-tracking", name: "Conversion Tracking", description: "Tracking the actions that matter, from form fills to purchases." },
          { id: "monthly-reports", name: "Monthly Reports", description: "A monthly summary of marketing performance, in plain English." },
        ],
      },
    ],
  },
];
export const getService = (slug: string) => services.find((s) => s.slug === slug);
