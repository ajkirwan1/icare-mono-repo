# Pre-Launch Website Metadata Specification

**Document Type**: Technical Specification for Developer Handoff
**Purpose**: Complete metadata specifications for all pre-launch website pages
**Status**: READY FOR IMPLEMENTATION
**Created**: 2026-02-07
**Version**: 1.2
**Framework**: React Router v7.7.1
**Language**: JavaScript (.jsx)

---

## Overview

This document provides complete metadata specifications for every page on the iCare pre-launch website, specifically for implementation with **React Router v7.7.1**.

### What's Included

- React Router v7 route module patterns
- Meta tag implementation using route `meta` exports
- HTML metadata (title, description, canonical)
- Open Graph tags for social sharing
- Twitter Card specifications
- Schema.org structured data (JSON-LD)
- Analytics event tracking requirements
- Accessibility metadata
- Image specifications with alt text
- Internal linking strategy

### React Router v7 Integration

All metadata is provided in React Router v7 compatible formats:
- Route module `meta` exports for dynamic meta tags
- Route module `links` exports for stylesheets and canonical URLs
- Script injection patterns for JSON-LD structured data
- Component-level analytics tracking

Use this document alongside `DEVELOPER_HANDOFF.md` for complete implementation guidance.

---

## Table of Contents

1. [React Router v7 Setup](#react-router-v7-setup) ⭐ **Start here**
2. [Global Metadata](#global-metadata) (applies to all pages)
3. [Homepage](#homepage)
4. [About Us](#about-us)
5. [How It Works - Families](#how-it-works-families)
6. [How It Works - Caregivers](#how-it-works-caregivers)
7. [Care Guidance Hub](#care-guidance-hub)
8. [FAQ](#faq)
9. [Our Commitment to Safety](#our-commitment-to-safety)
10. [Contact](#contact)
11. [Privacy Policy](#privacy-policy)
12. [Waitlist Confirmation](#waitlist-confirmation)
13. [Articles](#articles) (3 articles)

---

## React Router v7 Setup

### Overview

React Router v7 uses route modules with special exports to handle metadata. Each route file exports:
- `meta` - Function that returns meta tags
- `links` - Function that returns link tags (stylesheets, canonical)
- `loader` - Function that provides data (optional, for dynamic content)

### Route Module Structure

```javascript
// app/routes/example.jsx
import { Link } from "react-router";

// Meta tags (title, description, Open Graph, Twitter Cards)
export const meta = ({ data }) => {
  return [
    { title: "Page Title | iCare" },
    { name: "description", content: "Page description" },
    { property: "og:title", content: "OG Title" },
    { property: "og:description", content: "OG Description" },
    { property: "og:image", content: "https://icare.co.uk/images/og-image.jpg" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Twitter Title" },
  ];
};

// Link tags (canonical, stylesheets)
export const links = () => {
  return [
    { rel: "canonical", href: "https://icare.co.uk/page-url" },
  ];
};

// Component
export default function Page() {
  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Page Name",
          }),
        }}
      />

      {/* Page content */}
      <div>Page content here</div>
    </>
  );
}
```

### Global Metadata (Root Layout)

Create a root layout component that applies to all pages:

```javascript
// app/root.jsx
import { Meta, Links, Outlet, ScrollRestoration, Scripts } from "react-router";

export const meta = () => {
  return [
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width,initial-scale=1" },
    { name: "robots", content: "index, follow" },
    { name: "language", content: "en-GB" },
    { name: "geo.region", content: "GB" },
    { name: "geo.placename", content: "United Kingdom" },
    { name: "author", content: "iCare" },
    { name: "copyright", content: "© 2026 iCare. All rights reserved." },

    // Global Open Graph
    { property: "og:site_name", content: "iCare" },
    { property: "og:locale", content: "en_GB" },

    // Global Twitter
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: "@icare" },
  ];
};

export default function App() {
  return (
    <html lang="en-GB">
      <head>
        <Meta />
        <Links />

        {/* Global JSON-LD Organization schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "iCare",
              "url": "https://icare.co.uk",
              "logo": "https://icare.co.uk/images/logo.png",
              "description": "Trusted companionship care connecting families with caring professionals across the UK.",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "GB"
              },
            }),
          }}
        />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
```

### Dynamic Meta Tags with Loader Data

For pages with dynamic content (e.g., articles):

```javascript
// app/routes/articles.$slug.jsx
import { json } from "react-router";

export async function loader({ params }) {
  const article = await getArticle(params.slug);
  return json({ article });
}

export const meta = ({ data }) => {
  if (!data?.article) {
    return [{ title: "Article Not Found | iCare" }];
  }

  const { article } = data;

  return [
    { title: `${article.title} | iCare Care Guidance` },
    { name: "description", content: article.description },
    { name: "keywords", content: article.keywords.join(", ") },

    // Open Graph
    { property: "og:type", content: "article" },
    { property: "og:title", content: article.title },
    { property: "og:description", content: article.description },
    { property: "og:image", content: article.ogImage },
    { property: "article:published_time", content: article.publishedDate },

    // Twitter
    { name: "twitter:title", content: article.title },
    { name: "twitter:description", content: article.description },
    { name: "twitter:image", content: article.twitterImage },
  ];
};

export const links = ({ params }) => {
  return [
    { rel: "canonical", href: `https://icare.co.uk/care-guidance/${params.slug}` },
  ];
};
```

### Analytics Tracking

Use React Router's built-in navigation hooks for analytics:

```javascript
// app/hooks/useAnalytics.js
import { useEffect } from "react";
import { useLocation } from "react-router";

export function usePageView() {
  const location = useLocation();

  useEffect(() => {
    // Track page view
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "page_view", {
        page_path: location.pathname,
        page_title: document.title,
      });
    }
  }, [location]);
}

// Usage in root layout
export default function App() {
  usePageView(); // Tracks page views on navigation

  return (
    // ... app content
  );
}
```

### Event Tracking in Components

```javascript
// Example: Track waitlist form interactions
import { useNavigate } from "react-router";

export function WaitlistForm() {
  const navigate = useNavigate();

  const handleFormView = () => {
    window.gtag?.("event", "waitlist_form_view", {
      form_location: "hero",
      user_type: "family",
    });
  };

  const handleFormStart = (userType) => {
    window.gtag?.("event", "waitlist_form_start", {
      form_location: "hero",
      user_type: userType,
    });
  };

  const handleFormSubmit = async (userType) => {
    // Submit form...

    window.gtag?.("event", "waitlist_signup", {
      source_page: "homepage",
      user_type: userType,
      form_location: "hero",
    });

    // Navigate to confirmation
    navigate(`/waitlist-confirmation?type=${userType}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  );
}
```

### Image Handling

React Router v7 works well with standard `<img>` tags and modern image formats:

```javascript
export default function Page() {
  return (
    <>
      {/* Hero image with responsive srcset */}
      <img
        src="/images/hero-homepage.jpg"
        srcSet="/images/hero-homepage-800.jpg 800w,
                /images/hero-homepage-1200.jpg 1200w,
                /images/hero-homepage-1920.jpg 1920w"
        sizes="(max-width: 800px) 800px,
               (max-width: 1200px) 1200px,
               1920px"
        alt="Elderly woman and companion sharing tea and smiling conversation in a warm, comfortable living room"
        loading="eager" // For hero images
        width={1920}
        height={1080}
      />

      {/* Below-fold image with lazy loading */}
      <img
        src="/images/problem-section.jpg"
        alt="Elderly man sitting alone looking out window, contemplative expression"
        loading="lazy"
        width={800}
        height={600}
      />
    </>
  );
}
```

### Route Organization

Organize routes to match URL structure:

```
app/routes/
├── _index.jsx                          # Homepage (/)
├── about-us.jsx                        # /about-us
├── how-it-works.families.jsx          # /how-it-works/families
├── how-it-works.caregivers.jsx        # /how-it-works/caregivers
├── care-guidance._index.jsx           # /care-guidance
├── care-guidance.$slug.jsx            # /care-guidance/:slug (articles)
├── faq.jsx                            # /faq
├── safety.jsx                         # /safety
├── contact.jsx                        # /contact
├── privacy-policy.jsx                 # /privacy-policy
└── waitlist-confirmation.jsx          # /waitlist-confirmation
```

### Type Safety (Optional - TypeScript Users Only)

If using TypeScript instead of JavaScript, you can define types for analytics events:

```typescript
// app/types/analytics.ts
export type AnalyticsEvent =
  | { event: "page_view"; page_path: string; page_title: string }
  | { event: "waitlist_form_view"; form_location: string; user_type?: string }
  | { event: "waitlist_form_start"; form_location: string; user_type: string }
  | { event: "waitlist_signup"; source_page: string; user_type: string; form_location: string }
  | { event: "newsletter_signup"; source_page: string; form_location: string }
  | { event: "article_read_progress"; article_title: string; progress: 25 | 50 | 75 | 100 };

declare global {
  interface Window {
    gtag?: (
      command: "event",
      eventName: string,
      eventParams: Record<string, any>
    ) => void;
  }
}
```

**Note**: For JavaScript (.jsx) implementations, type definitions are not required. The above is only applicable if you choose to use TypeScript (.tsx) files.

### Implementation Checklist

Per route, you should implement:

- [ ] `meta` export with all required meta tags
- [ ] `links` export with canonical URL
- [ ] JSON-LD structured data in component
- [ ] Proper image specifications with alt text
- [ ] Analytics tracking hooks/functions
- [ ] Accessibility attributes (ARIA, semantic HTML)

---

## Global Metadata

### Applied to All Pages

**HTML Head (All Pages)**

```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="robots" content="index, follow">
<meta name="language" content="en-GB">
<meta name="geo.region" content="GB">
<meta name="geo.placename" content="United Kingdom">
<link rel="canonical" href="[page-specific]">

<!-- Brand/Company -->
<meta name="author" content="iCare">
<meta name="copyright" content="© 2026 iCare. All rights reserved.">
```

**Global Open Graph Tags (All Pages)**

```html
<meta property="og:site_name" content="iCare">
<meta property="og:locale" content="en_GB">
<meta property="og:type" content="website"> <!-- "article" for blog posts -->
```

**Global Twitter Card Tags (All Pages)**

```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@icare"> <!-- Update when Twitter handle created -->
```

**Global Schema.org: Organization (All Pages)**

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "iCare",
  "url": "https://icare.co.uk",
  "logo": "https://icare.co.uk/images/logo.png",
  "description": "Trusted companionship care connecting families with caring professionals across the UK.",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "GB"
  },
  "sameAs": [
    "[Twitter URL when available]",
    "[LinkedIn URL when available]",
    "[Facebook URL when available]"
  ]
}
```

**Global Analytics Events**

All pages should track:
- `page_view` - on page load
- `scroll_depth` - at 25%, 50%, 75%, 100%
- `time_on_page` - duration tracking

---

## Homepage

**URL**: `/` or `/index.html`
**Route File**: `app/routes/_index.jsx`

### React Router v7 Implementation

```javascript
// app/routes/_index.jsx
import { Link } from "react-router";

export const meta = () => {
  return [
    { title: "iCare - Trusted Companionship for Elderly Adults Across the UK" },
    { name: "description", content: "Find trusted companions for elderly relatives or join our community of caregivers. We're building a better way to connect families with caring professionals. Join the waitlist." },
    { name: "keywords", content: "elderly companionship UK, companionship care for elderly, companion for elderly parent, caregiver jobs UK, trusted caregivers" },

    // Open Graph
    { property: "og:type", content: "website" },
    { property: "og:title", content: "iCare - Trusted Companionship for Elderly Adults" },
    { property: "og:description", content: "Find trusted companions for elderly relatives or join our community of caregivers. Be among the first when we launch." },
    { property: "og:url", content: "https://icare.co.uk/" },
    { property: "og:image", content: "https://icare.co.uk/images/og-homepage.jpg" },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: "Elderly adult and caregiver sharing tea and conversation" },

    // Twitter Card
    { name: "twitter:title", content: "iCare - Trusted Companionship for Elderly Adults" },
    { name: "twitter:description", content: "We're building a better way to find trusted companionship care. Join the waitlist today." },
    { name: "twitter:image", content: "https://icare.co.uk/images/twitter-homepage.jpg" },
    { name: "twitter:image:alt", content: "Elderly adult and caregiver sharing tea and conversation" },
  ];
};

export const links = () => {
  return [
    { rel: "canonical", href: "https://icare.co.uk/" },
  ];
};

export default function Index() {
  return (
    <>
      {/* JSON-LD WebSite Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "iCare",
            "url": "https://icare.co.uk",
            "description": "Trusted companionship care connecting families with caring professionals across the UK.",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://icare.co.uk/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          }),
        }}
      />

      {/* Page content */}
      <main>
        {/* Hero section, forms, content... */}
      </main>
    </>
  );
}
```

### HTML Metadata (Reference)

```html
<title>iCare - Trusted Companionship for Elderly Adults Across the UK</title>
<meta name="description" content="Find trusted companions for elderly relatives or join our community of caregivers. We're building a better way to connect families with caring professionals. Join the waitlist.">
<meta name="keywords" content="elderly companionship UK, companionship care for elderly, companion for elderly parent, caregiver jobs UK, trusted caregivers">
<link rel="canonical" href="https://icare.co.uk/">
```

### Open Graph Tags

```html
<meta property="og:title" content="iCare - Trusted Companionship for Elderly Adults">
<meta property="og:description" content="Find trusted companions for elderly relatives or join our community of caregivers. Be among the first when we launch.">
<meta property="og:url" content="https://icare.co.uk/">
<meta property="og:image" content="https://icare.co.uk/images/og-homepage.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Elderly adult and caregiver sharing tea and conversation">
```

### Twitter Card Tags

```html
<meta name="twitter:title" content="iCare - Trusted Companionship for Elderly Adults">
<meta name="twitter:description" content="We're building a better way to find trusted companionship care. Join the waitlist today.">
<meta name="twitter:image" content="https://icare.co.uk/images/twitter-homepage.jpg">
<meta name="twitter:image:alt" content="Elderly adult and caregiver sharing tea and conversation">
```

### Schema.org Structured Data

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "iCare",
  "url": "https://icare.co.uk",
  "description": "Trusted companionship care connecting families with caring professionals across the UK.",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://icare.co.uk/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
```

### Analytics Events

```javascript
// Track specific interactions
{
  event: "waitlist_form_view",
  properties: {
    form_location: "hero" | "mid_page" | "footer",
    user_type: "family" | "caregiver" | "unknown"
  }
}

{
  event: "waitlist_form_start",
  properties: {
    form_location: "hero" | "mid_page" | "footer",
    user_type: "family" | "caregiver"
  }
}

{
  event: "waitlist_signup",
  properties: {
    source_page: "homepage",
    user_type: "family" | "caregiver",
    form_location: "hero" | "mid_page" | "footer"
  }
}

{
  event: "newsletter_signup",
  properties: {
    source_page: "homepage",
    form_location: "footer" | "care_guidance_section"
  }
}

{
  event: "cta_click",
  properties: {
    cta_text: "[button text]",
    cta_location: "[section name]",
    cta_type: "waitlist" | "newsletter" | "learn_more"
  }
}

{
  event: "navigation_click",
  properties: {
    nav_item: "how_it_works" | "about_us" | "care_guidance" | "faq",
    nav_location: "header" | "footer"
  }
}
```

### Image Specifications

| Image Purpose | Dimensions | Alt Text | File Name |
|---------------|------------|----------|-----------|
| Hero image | 1920x1080 | "Elderly woman and companion sharing tea and smiling conversation in a warm, comfortable living room" | hero-homepage.jpg |
| Problem section | 800x600 | "Elderly man sitting alone looking out window, contemplative expression" | loneliness-problem.jpg |
| Caregiver section | 800x600 | "Professional caregiver assisting elderly adult with a walk in the park, both smiling" | caregiver-support.jpg |
| OG/Social card | 1200x630 | "iCare: Trusted companionship for elderly adults" | og-homepage.jpg |

### Internal Linking Strategy

**Links FROM homepage TO:**
- How It Works - Families (primary journey)
- How It Works - Caregivers (primary journey)
- About Us (trust building)
- Care Guidance Hub (content marketing)
- Safety Commitment (trust building)
- FAQ (objection handling)
- Contact (support)

**Anchor text examples:**
- "Learn how it works for families" → How It Works - Families
- "Discover caregiver opportunities" → How It Works - Caregivers
- "Read our story" → About Us
- "Explore care guidance" → Care Guidance Hub

### Accessibility Metadata

```html
<!-- ARIA labels -->
<header role="banner" aria-label="Main navigation">
<main role="main" aria-label="Homepage content">
<form role="form" aria-label="Join waitlist">
<footer role="contentinfo" aria-label="Site footer">

<!-- Skip links -->
<a href="#main-content" class="skip-link">Skip to main content</a>

<!-- Focus management -->
<!-- Ensure all interactive elements have visible focus indicators -->
<!-- Tab order follows logical reading order -->
```

**Keyboard Navigation Requirements:**
- All forms accessible via Tab/Shift+Tab
- Submit buttons triggered by Enter
- Dropdown menus navigable with Arrow keys
- Skip link visible on focus

**Screen Reader Considerations:**
- All images have descriptive alt text
- Form fields have associated labels
- Error messages announced to screen readers
- Loading states communicated

---

## About Us

**URL**: `/about-us` or `/about`

### HTML Metadata

```html
<title>About iCare - Our Mission to End Elderly Loneliness in the UK</title>
<meta name="description" content="Learn why we're building iCare. Discover our mission to connect elderly adults with trusted companions and create meaningful work for caregivers. Join our journey.">
<meta name="keywords" content="elderly loneliness UK, about iCare, companionship for elderly, care platform mission">
<link rel="canonical" href="https://icare.co.uk/about-us">
```

### Open Graph Tags

```html
<meta property="og:title" content="About iCare - Our Mission to End Elderly Loneliness">
<meta property="og:description" content="We're building iCare because elderly adults deserve companionship, caregivers deserve respect, and families deserve peace of mind.">
<meta property="og:url" content="https://icare.co.uk/about-us">
<meta property="og:image" content="https://icare.co.uk/images/og-about-us.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Diverse group of elderly adults and caregivers together">
```

### Twitter Card Tags

```html
<meta name="twitter:title" content="About iCare - Our Mission to End Elderly Loneliness">
<meta name="twitter:description" content="We believe elderly adults deserve companionship, caregivers deserve respect, and families deserve peace of mind.">
<meta name="twitter:image" content="https://icare.co.uk/images/twitter-about-us.jpg">
<meta name="twitter:image:alt" content="Diverse group of elderly adults and caregivers together">
```

### Schema.org Structured Data

```json
{
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "name": "About iCare",
  "description": "Learn about iCare's mission to connect elderly adults with trusted companionship care and empower caregivers.",
  "url": "https://icare.co.uk/about-us",
  "mainEntity": {
    "@type": "Organization",
    "name": "iCare",
    "foundingDate": "2025",
    "description": "Platform connecting families with trusted companions for elderly adults across the UK.",
    "mission": "To help elderly adults live with dignity, connection, and joy by making trusted companionship care accessible to families and rewarding for caregivers."
  }
}
```

### Analytics Events

```javascript
{
  event: "about_page_section_view",
  properties: {
    section: "mission" | "problem" | "story" | "beliefs" | "building" | "join_journey"
  }
}

{
  event: "founder_story_read",
  properties: {
    scroll_depth: 50 | 75 | 100 // percentage of story read
  }
}

{
  event: "trust_signal_viewed",
  properties: {
    signal_type: "age_uk_stat" | "nhs_research" | "founder_experience"
  }
}

{
  event: "waitlist_signup",
  properties: {
    source_page: "about_us",
    user_type: "family" | "caregiver",
    cta_location: "end_of_page"
  }
}
```

### Image Specifications

| Image Purpose | Dimensions | Alt Text | File Name |
|---------------|------------|----------|-----------|
| Hero/Mission | 1920x1080 | "Elderly adult and companion walking together outdoors, both smiling warmly" | about-hero.jpg |
| Problem section | 800x600 | "Elderly person sitting alone with cup of tea, looking contemplative" | problem-loneliness.jpg |
| Our Story | 800x600 | "Founder or team member speaking with elderly person, caring expression" | our-story.jpg |
| What We Believe | 800x600 | "Caregiver and elderly adult engaged in conversation, both animated and happy" | our-beliefs.jpg |
| OG/Social card | 1200x630 | "About iCare: Building a better way to connect elderly adults with trusted companionship" | og-about-us.jpg |

### Internal Linking Strategy

**Links FROM About Us TO:**
- Homepage (breadcrumb)
- How It Works - Families (CTA)
- How It Works - Caregivers (CTA)
- Safety Commitment (trust building)
- Care Guidance Hub (problem validation)

**Anchor text examples:**
- "Learn how we're building this" → How It Works pages
- "See our safety commitment" → Safety Commitment
- "Read about elderly loneliness" → Care Guidance article

### Accessibility Metadata

```html
<article role="article" aria-label="About iCare story">
<section aria-labelledby="mission-heading">
  <h2 id="mission-heading">Our Mission</h2>
</section>
```

**Reading Experience:**
- Long-form content, ensure clear heading hierarchy
- Estimate reading time: ~7 minutes
- Provide table of contents for screen reader users

---

## How It Works - Families

**URL**: `/how-it-works/families` or `/families`

### HTML Metadata

```html
<title>How It Works for Families - iCare Companionship Services</title>
<meta name="description" content="Discover how iCare helps families find trusted companions for elderly relatives. Simple, safe, and designed around real human connection. Join the waitlist today.">
<meta name="keywords" content="companion for elderly parent, how companionship care works, find companion for elderly UK, care for elderly parent">
<link rel="canonical" href="https://icare.co.uk/how-it-works/families">
```

### Open Graph Tags

```html
<meta property="og:title" content="How It Works for Families - iCare">
<meta property="og:description" content="Learn how iCare makes it easy to find trusted companions for elderly relatives. Priority access available for families on the waitlist.">
<meta property="og:url" content="https://icare.co.uk/how-it-works/families">
<meta property="og:image" content="https://icare.co.uk/images/og-how-families.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Family searching for care on laptop with elderly parent nearby">
```

### Twitter Card Tags

```html
<meta name="twitter:title" content="How It Works for Families - iCare">
<meta name="twitter:description" content="Find trusted companions for your elderly relative in 5 simple steps. Join the waitlist for priority access.">
<meta name="twitter:image" content="https://icare.co.uk/images/twitter-how-families.jpg">
<meta name="twitter:image:alt" content="Family searching for care on laptop">
```

### Schema.org Structured Data

```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Find Companionship Care for Elderly Relatives",
  "description": "Step-by-step guide for families seeking trusted companions for elderly relatives through iCare.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Tell us what you need",
      "text": "Create a simple profile describing your loved one's situation and companionship preferences."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Discover caring people in your area",
      "text": "See profiles of verified companions in your local area who want to spend time with older adults."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Find the right match",
      "text": "Choose the companion who feels like the best fit for your loved one's personality and interests."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Arrange visits easily",
      "text": "Work together to agree on a schedule that suits your loved one's preferences and needs."
    },
    {
      "@type": "HowToStep",
      "position": 5,
      "name": "Enjoy peace of mind",
      "text": "Your loved one receives regular companionship while you have confidence they're in good company."
    }
  ]
}
```

### Analytics Events

```javascript
{
  event: "how_to_step_view",
  properties: {
    step_number: 1-5,
    step_name: "tell_us" | "discover" | "match" | "arrange" | "peace_of_mind"
  }
}

{
  event: "waitlist_signup",
  properties: {
    source_page: "how_it_works_families",
    user_type: "family",
    cta_location: "end_of_page"
  }
}

{
  event: "differentiator_viewed",
  properties: {
    differentiator: "choice_vs_assignment" | "trust_built_in" | "relationships" | "simplicity"
  }
}

{
  event: "use_case_resonance",
  properties: {
    use_case: "parent_isolated" | "stretched_thin" | "need_respite" | "gentle_encouragement"
  }
}
```

### Image Specifications

| Image Purpose | Dimensions | Alt Text | File Name |
|---------------|------------|----------|-----------|
| Hero | 1920x1080 | "Adult daughter sitting with elderly mother reviewing profiles on tablet together" | families-hero.jpg |
| Step 1: Tell Us | 600x400 | "Person completing profile form on laptop" | step-tell-us.jpg |
| Step 2: Discover | 600x400 | "Grid of caregiver profiles displayed on screen" | step-discover.jpg |
| Step 3: Match | 600x400 | "Elderly person and caregiver meeting for first time, shaking hands" | step-match.jpg |
| Step 4: Arrange | 600x400 | "Calendar or schedule being planned" | step-arrange.jpg |
| Step 5: Peace of Mind | 600x400 | "Elderly person and companion enjoying activity together while family member smiles" | step-peace-of-mind.jpg |
| OG/Social card | 1200x630 | "How It Works for Families: Find trusted companions in 5 simple steps" | og-how-families.jpg |

### Internal Linking Strategy

**Links FROM How It Works - Families TO:**
- Homepage (breadcrumb)
- How It Works - Caregivers (alternative journey)
- About Us (trust building)
- Safety Commitment (addressing concerns)
- FAQ (answering questions)
- Care Guidance Hub (related content)

**Anchor text examples:**
- "Learn about our safety commitment" → Safety Commitment
- "Read about our mission" → About Us
- "See answers to common questions" → FAQ

### Accessibility Metadata

```html
<nav aria-label="Process steps breadcrumb">
  <ol>
    <li>Step 1: Tell us what you need</li>
    <li>Step 2: Discover caring people</li>
    <!-- etc -->
  </ol>
</nav>

<section aria-labelledby="how-to-find-support">
  <h2 id="how-to-find-support">How You'll Find Support</h2>
</section>
```

**Process Flow Navigation:**
- Consider adding "Previous/Next Step" navigation
- Ensure step indicators are keyboard accessible
- Provide clear visual focus states for current step

---

## How It Works - Caregivers

**URL**: `/how-it-works/caregivers` or `/caregivers`

### HTML Metadata

```html
<title>How It Works for Caregivers - Build Your Companion Care Practice | iCare</title>
<meta name="description" content="Join iCare as a companion caregiver. Set your own hours, choose who you work with, and build meaningful relationships. Fair pay, flexibility, and respect.">
<meta name="keywords" content="companion carer jobs UK, companionship care jobs, flexible carer work, private carer opportunities, caregiver platform">
<link rel="canonical" href="https://icare.co.uk/how-it-works/caregivers">
```

### Open Graph Tags

```html
<meta property="og:title" content="How It Works for Caregivers - Build Your Practice">
<meta property="og:description" content="Set your own hours. Choose who you work with. Build meaningful relationships. Join iCare's founding community of caregivers.">
<meta property="og:url" content="https://icare.co.uk/how-it-works/caregivers">
<meta property="og:image" content="https://icare.co.uk/images/og-how-caregivers.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Professional caregiver providing companionship to elderly adult">
```

### Twitter Card Tags

```html
<meta name="twitter:title" content="How It Works for Caregivers - iCare">
<meta name="twitter:description" content="Build a flexible companion care practice. Set your hours, choose your clients, earn fair pay. Join the waitlist.">
<meta name="twitter:image" content="https://icare.co.uk/images/twitter-how-caregivers.jpg">
<meta name="twitter:image:alt" content="Caregiver and elderly adult working on puzzle together">
```

### Schema.org Structured Data

```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Become a Companion Caregiver on iCare",
  "description": "Step-by-step guide for caregivers to join iCare and build a flexible companion care practice.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Join the community",
      "text": "Sign up for early access and be part of our founding community of caregivers."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Complete verification",
      "text": "Go through our verification process to ensure trust and safety for everyone."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Create your profile",
      "text": "Build a profile that shows who you are and what companionship you offer."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Connect with families",
      "text": "Families will find your profile and reach out for the companionship you provide."
    },
    {
      "@type": "HowToStep",
      "position": 5,
      "name": "Build your practice",
      "text": "Set your hours, choose your clients, and earn fair compensation for meaningful work."
    }
  ]
}
```

### Analytics Events

```javascript
{
  event: "caregiver_journey_step_view",
  properties: {
    step_number: 1-5,
    step_name: "join" | "verify" | "profile" | "connect" | "build_practice"
  }
}

{
  event: "waitlist_signup",
  properties: {
    source_page: "how_it_works_caregivers",
    user_type: "caregiver",
    cta_location: "end_of_page" | "mid_page"
  }
}

{
  event: "value_prop_viewed",
  properties: {
    value_prop: "flexibility" | "fair_pay" | "respect" | "relationships" | "control"
  }
}

{
  event: "agency_pain_point_resonance",
  properties: {
    pain_point: "rushed_visits" | "low_pay" | "no_choice" | "undervalued"
  }
}
```

### Image Specifications

| Image Purpose | Dimensions | Alt Text | File Name |
|---------------|------------|----------|-----------|
| Hero | 1920x1080 | "Professional caregiver walking with elderly person outdoors, both smiling and engaged" | caregivers-hero.jpg |
| Agency comparison | 800x600 | "Split image: rushed agency visit vs. quality companionship time" | agency-vs-icare.jpg |
| Flexibility | 600x400 | "Caregiver managing their own schedule on phone" | caregiver-flexibility.jpg |
| Relationships | 600x400 | "Caregiver and elderly person laughing together over shared activity" | caregiver-relationship.jpg |
| Fair compensation | 600x400 | "Diverse group of professional caregivers looking confident and valued" | fair-compensation.jpg |
| OG/Social card | 1200x630 | "Join iCare as a Companion Caregiver: Flexibility, Respect, Fair Pay" | og-how-caregivers.jpg |

### Internal Linking Strategy

**Links FROM How It Works - Caregivers TO:**
- Homepage (breadcrumb)
- How It Works - Families (alternative perspective)
- About Us (values alignment)
- Safety Commitment (bilateral trust)
- FAQ (answering questions)
- Article: Starting as a Companion Carer (related content)

**Anchor text examples:**
- "Read about our values" → About Us
- "Learn about our safety approach" → Safety Commitment
- "Get answers to your questions" → FAQ

### Accessibility Metadata

Similar to Families page, ensure:
- Clear step-by-step navigation
- Keyboard accessible process flow
- ARIA labels for each section
- Screen reader friendly form labels

---

## Care Guidance Hub

**URL**: `/care-guidance` or `/blog`

### HTML Metadata

```html
<title>Care Guidance - Expert Advice for Families | iCare</title>
<meta name="description" content="Practical advice and insights for families navigating elderly care. Weekly guidance on understanding needs, having conversations, and finding the right support.">
<meta name="keywords" content="elderly care advice, caring for elderly parent, elderly care guidance UK, family caregiver support">
<link rel="canonical" href="https://icare.co.uk/care-guidance">
```

### Open Graph Tags

```html
<meta property="og:title" content="Care Guidance - Expert Advice for Families">
<meta property="og:description" content="Practical advice for families navigating elderly care challenges. Free weekly guidance delivered to your inbox.">
<meta property="og:url" content="https://icare.co.uk/care-guidance">
<meta property="og:image" content="https://icare.co.uk/images/og-care-guidance.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Family reading care guidance materials together">
```

### Twitter Card Tags

```html
<meta name="twitter:title" content="Care Guidance - Expert Advice for Families">
<meta name="twitter:description" content="Practical advice for families caring for elderly relatives. Subscribe for weekly guidance.">
<meta name="twitter:image" content="https://icare.co.uk/images/twitter-care-guidance.jpg">
<meta name="twitter:image:alt" content="Care Guidance newsletter preview">
```

### Schema.org Structured Data

```json
{
  "@context": "https://schema.org",
  "@type": "Blog",
  "name": "iCare Care Guidance",
  "description": "Expert advice and practical guidance for families navigating elderly care challenges.",
  "url": "https://icare.co.uk/care-guidance",
  "publisher": {
    "@type": "Organization",
    "name": "iCare",
    "logo": {
      "@type": "ImageObject",
      "url": "https://icare.co.uk/images/logo.png"
    }
  }
}
```

### Analytics Events

```javascript
{
  event: "blog_landing_view",
  properties: {
    featured_article: "[article title]"
  }
}

{
  event: "article_click",
  properties: {
    article_title: "[article title]",
    article_category: "loneliness" | "signs" | "caregiver_advice",
    click_position: "featured" | "recent_posts" | "category_grid"
  }
}

{
  event: "newsletter_signup",
  properties: {
    source_page: "care_guidance_hub",
    form_location: "hero" | "sidebar" | "footer"
  }
}

{
  event: "category_filter",
  properties: {
    category: "families" | "caregivers" | "health" | "practical_advice"
  }
}
```

### Image Specifications

| Image Purpose | Dimensions | Alt Text | File Name |
|---------------|------------|----------|-----------|
| Hub hero | 1920x1080 | "Open notebook with care guidance notes and family photos nearby" | guidance-hero.jpg |
| Newsletter promo | 800x600 | "Email newsletter preview on tablet device" | newsletter-promo.jpg |
| Featured article | 800x600 | Varies by article | article-featured.jpg |
| OG/Social card | 1200x630 | "Care Guidance from iCare: Expert advice for families" | og-care-guidance.jpg |

### Internal Linking Strategy

**Links FROM Care Guidance Hub TO:**
- Individual articles (primary purpose)
- Homepage (breadcrumb)
- How It Works - Families (conversion path)
- Waitlist page (secondary CTA)

**Links TO Care Guidance Hub FROM:**
- Homepage (content marketing)
- How It Works pages (related reading)
- About Us (expertise demonstration)
- Footer (all pages)

### Accessibility Metadata

```html
<main aria-label="Care guidance articles">
<section aria-label="Featured article">
<nav aria-label="Article categories">
```

---

## FAQ

**URL**: `/faq` or `/frequently-asked-questions`

### HTML Metadata

```html
<title>FAQ - Your Questions About iCare Answered</title>
<meta name="description" content="Get answers about iCare's companionship platform. Learn how we connect families with trusted caregivers, what services we offer, and how to join our waitlist.">
<meta name="keywords" content="iCare FAQ, companionship care questions, how does iCare work, caregiver platform FAQ">
<link rel="canonical" href="https://icare.co.uk/faq">
```

### Open Graph Tags

```html
<meta property="og:title" content="Frequently Asked Questions - iCare">
<meta property="og:description" content="Get answers about iCare's companionship platform, services, safety, and how to join the waitlist.">
<meta property="og:url" content="https://icare.co.uk/faq">
<meta property="og:image" content="https://icare.co.uk/images/og-faq.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="FAQ: Your questions about iCare answered">
```

### Twitter Card Tags

```html
<meta name="twitter:title" content="FAQ - Your Questions About iCare Answered">
<meta name="twitter:description" content="Find answers about companionship care, safety, pricing, and more. Your questions answered.">
<meta name="twitter:image" content="https://icare.co.uk/images/twitter-faq.jpg">
<meta name="twitter:image:alt" content="Frequently asked questions about iCare">
```

### Schema.org Structured Data

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is iCare?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "iCare is a platform connecting families with trusted companions for elderly relatives across the UK. We're making it easier for families to find caring people who can spend quality time with their loved ones, and for caregivers to build meaningful, flexible practices. We're starting with companionship services because connection matters most."
      }
    },
    {
      "@type": "Question",
      "name": "When will iCare launch?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We're working hard to launch in the coming months. We're building this thoughtfully to ensure we get the important things right, particularly around trust and safety. Families and caregivers on our waitlist will be the first to know when we're ready to launch and will get priority access to the platform."
      }
    },
    {
      "@type": "Question",
      "name": "How is iCare different from care agencies?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Traditional care agencies typically assign whoever is available on their rota without giving you real choice. They often feel rushed and transactional. iCare is fundamentally different. We give families genuine choice over who spends time with their loved one. We enable caregivers to build their own practices with flexibility and control. We focus on relationships, not transactions, and we build trust and safety into everything from the ground up."
      }
    },
    {
      "@type": "Question",
      "name": "How will I know caregivers are trustworthy?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Safety is our foundation, not an afterthought. We're building thorough verification into everything we do because your loved one's safety matters to us as much as it does to you. Every caregiver on iCare will complete our verification process before they can connect with families. More information will be available when we launch."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need qualifications to join as a caregiver?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For companionship care, what matters most is who you are as a person. Are you patient, kind, and reliable? Can you make people feel heard and valued? Do you treat elderly adults with dignity and respect? Those qualities are what make a great companion caregiver. While formal care qualifications are welcome, they're not required for providing companionship."
      }
    }
    // Add all Q&A pairs from FAQ page
  ]
}
```

### Analytics Events

```javascript
{
  event: "faq_question_expand",
  properties: {
    question_category: "general" | "families" | "caregivers" | "waitlist",
    question_text: "[abbreviated question]"
  }
}

{
  event: "faq_cta_click",
  properties: {
    cta_type: "waitlist" | "contact",
    cta_location: "general" | "families" | "caregivers" | "footer"
  }
}

{
  event: "faq_search", // if search implemented
  properties: {
    search_term: "[user query]",
    results_found: true | false
  }
}

{
  event: "waitlist_signup",
  properties: {
    source_page: "faq",
    user_type: "family" | "caregiver",
    previous_questions_viewed: ["q1", "q2", "q3"]
  }
}
```

### Image Specifications

| Image Purpose | Dimensions | Alt Text | File Name |
|---------------|------------|----------|-----------|
| FAQ hero | 1920x1080 | "Friendly support representative at desk ready to help" | faq-hero.jpg |
| Accordion icon (open) | 32x32 | "Expand answer" | icon-expand.svg |
| Accordion icon (close) | 32x32 | "Collapse answer" | icon-collapse.svg |
| OG/Social card | 1200x630 | "FAQ: Get your questions about iCare answered" | og-faq.jpg |

### Internal Linking Strategy

**Links FROM FAQ TO:**
- How It Works - Families (conversion)
- How It Works - Caregivers (conversion)
- Safety Commitment (trust building)
- About Us (mission context)
- Care Guidance Hub (related content)
- Contact (unanswered questions)

**Anchor text examples:**
- "Learn how it works" → How It Works pages
- "Read about our safety approach" → Safety Commitment
- "Contact us directly" → Contact

### Accessibility Metadata

```html
<!-- Accordion pattern -->
<button aria-expanded="false" aria-controls="answer-1" id="question-1">
  What is iCare?
</button>
<div id="answer-1" aria-labelledby="question-1" hidden>
  <!-- Answer content -->
</div>

<!-- Navigation -->
<nav aria-label="FAQ categories">
  <ul>
    <li><a href="#general">General Questions</a></li>
    <li><a href="#families">For Families</a></li>
    <li><a href="#caregivers">For Caregivers</a></li>
    <li><a href="#waitlist">Waitlist Questions</a></li>
  </ul>
</nav>
```

**Keyboard Navigation:**
- Tab through questions
- Enter/Space to expand/collapse
- Up/Down arrows to navigate between questions (optional enhancement)

---

## Our Commitment to Safety

**URL**: `/safety` or `/our-commitment-to-safety`

### HTML Metadata

```html
<title>Our Safety Commitment - Trusted Companionship Care | iCare</title>
<meta name="description" content="Safety isn't an afterthought at iCare - it's the foundation of everything we build. Learn how we're creating a trusted platform for elderly companionship care.">
<meta name="keywords" content="trusted caregivers UK, safe companionship care, verified caregivers, elderly care safety">
<link rel="canonical" href="https://icare.co.uk/safety">
```

### Open Graph Tags

```html
<meta property="og:title" content="Our Commitment to Safety - iCare">
<meta property="og:description" content="Safety is the foundation of everything we build. Learn about our principles and commitments to families and caregivers.">
<meta property="og:url" content="https://icare.co.uk/safety">
<meta property="og:image" content="https://icare.co.uk/images/og-safety.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Shield with checkmark: Our commitment to safety">
```

### Twitter Card Tags

```html
<meta name="twitter:title" content="Our Commitment to Safety - iCare">
<meta name="twitter:description" content="Trust is everything. Learn about the 5 safety principles that guide everything we build.">
<meta name="twitter:image" content="https://icare.co.uk/images/twitter-safety.jpg">
<meta name="twitter:image:alt" content="Safety principles: Identity, Choice, Transparency, Support, Improvement">
```

### Schema.org Structured Data

```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Our Commitment to Safety",
  "description": "iCare's safety principles and commitments for families and caregivers.",
  "url": "https://icare.co.uk/safety",
  "mainEntity": {
    "@type": "ItemList",
    "name": "Safety Principles",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Identity First",
        "description": "We verify who people are through thorough verification processes."
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Choice and Control",
        "description": "You decide who you work with - families choose caregivers, caregivers choose families."
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Transparency",
        "description": "Clear information to make informed decisions, presented honestly without hidden terms."
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Support When Needed",
        "description": "Help is available if something goes wrong or if you have questions or concerns."
      },
      {
        "@type": "ListItem",
        "position": 5,
        "name": "Continuous Improvement",
        "description": "We're always learning, adapting, and improving our safety measures."
      }
    ]
  }
}
```

### Analytics Events

```javascript
{
  event: "safety_principle_viewed",
  properties: {
    principle: "identity" | "choice" | "transparency" | "support" | "improvement",
    scroll_depth: 50 | 75 | 100
  }
}

{
  event: "safety_promise_viewed",
  properties: {
    section: "promise_section"
  }
}

{
  event: "trust_signal_interaction",
  properties: {
    signal_type: "verification_mention" | "bilateral_protection" | "transparency_commitment"
  }
}

{
  event: "waitlist_signup",
  properties: {
    source_page: "safety",
    user_type: "family" | "caregiver",
    safety_concerns_addressed: true
  }
}
```

### Image Specifications

| Image Purpose | Dimensions | Alt Text | File Name |
|---------------|------------|----------|-----------|
| Hero | 1920x1080 | "Caregiver and elderly person in warm, secure home environment, both smiling" | safety-hero.jpg |
| Identity First icon | 128x128 | "Shield with checkmark representing identity verification" | icon-identity.svg |
| Choice & Control icon | 128x128 | "Hand selecting from options representing choice" | icon-choice.svg |
| Transparency icon | 128x128 | "Open book representing transparency" | icon-transparency.svg |
| Support icon | 128x128 | "Helping hands representing support" | icon-support.svg |
| Improvement icon | 128x128 | "Upward arrow in cycle representing continuous improvement" | icon-improvement.svg |
| For Families section | 800x600 | "Family feeling reassured and confident about care decision" | safety-families.jpg |
| For Caregivers section | 800x600 | "Professional caregiver looking confident and supported" | safety-caregivers.jpg |
| OG/Social card | 1200x630 | "Our Commitment to Safety: Trust is the foundation" | og-safety.jpg |

### Internal Linking Strategy

**Links FROM Safety TO:**
- Homepage (breadcrumb)
- How It Works - Families (process context)
- How It Works - Caregivers (bilateral protection)
- About Us (values alignment)
- FAQ (detailed questions)

**Links TO Safety FROM:**
- Homepage (trust building)
- How It Works pages (addressing concerns)
- About Us (values)
- FAQ (specific safety questions)
- Footer (all pages)

### Accessibility Metadata

```html
<section aria-labelledby="safety-principles">
  <h2 id="safety-principles">Our Safety Principles</h2>
  <ol>
    <li>
      <h3>Identity First</h3>
      <p>We verify who people are.</p>
    </li>
    <!-- etc -->
  </ol>
</section>

<!-- Icon accessibility -->
<img src="icon-identity.svg" alt="Shield with checkmark" role="img" aria-label="Identity verification icon">
```

---

## Contact

**URL**: `/contact` or `/contact-us`

### HTML Metadata

```html
<title>Contact Us - Get in Touch with iCare</title>
<meta name="description" content="Have questions about iCare? Get in touch with our team. We're here to help families and caregivers learn more about our companionship platform.">
<meta name="keywords" content="contact iCare, iCare support, get in touch, companionship care inquiry">
<link rel="canonical" href="https://icare.co.uk/contact">
```

### Open Graph Tags

```html
<meta property="og:title" content="Contact Us - iCare">
<meta property="og:description" content="Have questions about iCare? Get in touch with our team. We're here to help.">
<meta property="og:url" content="https://icare.co.uk/contact">
<meta property="og:image" content="https://icare.co.uk/images/og-contact.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Contact iCare - We're here to help">
```

### Twitter Card Tags

```html
<meta name="twitter:title" content="Contact Us - iCare">
<meta name="twitter:description" content="Questions about companionship care? Get in touch with the iCare team.">
<meta name="twitter:image" content="https://icare.co.uk/images/twitter-contact.jpg">
<meta name="twitter:image:alt" content="Email or phone icons for contacting iCare">
```

### Schema.org Structured Data

```json
{
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contact iCare",
  "url": "https://icare.co.uk/contact",
  "mainEntity": {
    "@type": "Organization",
    "name": "iCare",
    "email": "hello@icare.co.uk",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Support",
      "email": "hello@icare.co.uk",
      "availableLanguage": "English",
      "areaServed": "GB"
    }
  }
}
```

### Analytics Events

```javascript
{
  event: "contact_page_view",
  properties: {
    referrer_page: "[previous page]"
  }
}

{
  event: "contact_method_click",
  properties: {
    method: "email" | "form" | "social_media"
  }
}

{
  event: "contact_form_start", // if form implemented
  properties: {
    user_type: "family" | "caregiver" | "other" | "unknown"
  }
}

{
  event: "contact_form_submit",
  properties: {
    user_type: "family" | "caregiver" | "other",
    inquiry_type: "general" | "support" | "partnership" | "press"
  }
}
```

### Image Specifications

| Image Purpose | Dimensions | Alt Text | File Name |
|---------------|------------|----------|-----------|
| Hero | 1920x1080 | "Friendly support team member at desk with laptop, smiling and welcoming" | contact-hero.jpg |
| Email icon | 64x64 | "Email us at hello@icare.co.uk" | icon-email.svg |
| OG/Social card | 1200x630 | "Contact iCare: We're here to help" | og-contact.jpg |

### Internal Linking Strategy

**Links FROM Contact TO:**
- Homepage (breadcrumb)
- FAQ (self-service answers)
- How It Works pages (detailed information)
- Waitlist (primary CTA alternative)

**Links TO Contact FROM:**
- All pages in footer
- FAQ ("Still have questions?")
- Error pages

### Accessibility Metadata

```html
<form role="form" aria-label="Contact form">
  <div>
    <label for="name">Your Name *</label>
    <input type="text" id="name" name="name" required aria-required="true">
  </div>

  <div>
    <label for="email">Your Email *</label>
    <input type="email" id="email" name="email" required aria-required="true" aria-describedby="email-help">
    <span id="email-help" class="help-text">We'll respond within 2 business days</span>
  </div>

  <div>
    <label for="message">Your Message *</label>
    <textarea id="message" name="message" required aria-required="true"></textarea>
  </div>

  <button type="submit" aria-label="Send message">Send Message</button>
</form>

<!-- Error handling -->
<div role="alert" aria-live="polite" id="form-errors"></div>
<div role="status" aria-live="polite" id="form-success"></div>
```

---

## Privacy Policy

**URL**: `/privacy-policy` or `/privacy`

### HTML Metadata

```html
<title>Privacy Policy - How iCare Protects Your Data</title>
<meta name="description" content="Learn how iCare collects, uses, and protects your personal information. Our commitment to data privacy and GDPR compliance.">
<meta name="keywords" content="iCare privacy policy, data protection, GDPR compliance, email data privacy">
<link rel="canonical" href="https://icare.co.uk/privacy-policy">
<meta name="robots" content="index, follow">
```

### Open Graph Tags

```html
<meta property="og:title" content="Privacy Policy - iCare">
<meta property="og:description" content="How iCare collects, uses, and protects your personal information. Read our privacy policy.">
<meta property="og:url" content="https://icare.co.uk/privacy-policy">
<meta property="og:image" content="https://icare.co.uk/images/og-default.jpg">
```

### Twitter Card Tags

```html
<meta name="twitter:title" content="Privacy Policy - iCare">
<meta name="twitter:description" content="How iCare protects your data and respects your privacy. GDPR compliant.">
<meta name="twitter:image" content="https://icare.co.uk/images/twitter-default.jpg">
```

### Schema.org Structured Data

```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Privacy Policy",
  "description": "iCare's privacy policy explaining how we collect, use, and protect personal information.",
  "url": "https://icare.co.uk/privacy-policy",
  "datePublished": "2026-02-01",
  "dateModified": "2026-02-01"
}
```

### Analytics Events

```javascript
{
  event: "privacy_policy_view",
  properties: {
    referrer_page: "[previous page]",
    section_viewed: "all" | "specific_section"
  }
}

{
  event: "privacy_section_view",
  properties: {
    section: "collection" | "usage" | "storage" | "rights" | "cookies"
  }
}

{
  event: "data_rights_link_click",
  properties: {
    right: "access" | "deletion" | "portability" | "object"
  }
}
```

### Image Specifications

| Image Purpose | Dimensions | Alt Text | File Name |
|---------------|------------|----------|-----------|
| No images typically needed for privacy policy | - | - | - |
| OG/Social card (generic) | 1200x630 | "iCare Privacy Policy" | og-default.jpg |

### Internal Linking Strategy

**Links FROM Privacy Policy TO:**
- Contact (data rights inquiries)
- Homepage (breadcrumb)

**Links TO Privacy Policy FROM:**
- All form consent checkboxes
- Footer (all pages)
- Waitlist forms
- Newsletter forms

### Accessibility Metadata

```html
<article role="article" aria-label="Privacy policy document">
  <nav aria-label="Privacy policy sections">
    <ol>
      <li><a href="#information-we-collect">Information We Collect</a></li>
      <li><a href="#how-we-use">How We Use Information</a></li>
      <li><a href="#data-storage">Data Storage</a></li>
      <li><a href="#your-rights">Your Rights</a></li>
      <li><a href="#contact">Contact Us</a></li>
    </ol>
  </nav>
</article>
```

**Reading Experience:**
- Clear heading hierarchy for long document
- "Last updated" date prominently displayed
- Table of contents with jump links
- Plain English summaries where possible

---

## Waitlist Confirmation

**URL**: `/waitlist-confirmation?type={family|caregiver}`

### HTML Metadata (Family Variant)

```html
<title>Welcome to iCare - You're on the Waitlist!</title>
<meta name="description" content="Thank you for joining the iCare waitlist. You'll be among the first to access our companionship platform when we launch.">
<meta name="keywords" content="iCare waitlist, welcome to iCare">
<link rel="canonical" href="https://icare.co.uk/waitlist-confirmation">
<meta name="robots" content="noindex, follow"> <!-- Don't index confirmation pages -->
```

### HTML Metadata (Caregiver Variant)

```html
<title>Welcome to iCare - You're in Our Founding Community!</title>
<meta name="description" content="Thank you for joining iCare's caregiver waitlist. You'll get early access and help shape our platform.">
<meta name="keywords" content="iCare caregiver waitlist, founding community">
<link rel="canonical" href="https://icare.co.uk/waitlist-confirmation">
<meta name="robots" content="noindex, follow">
```

### Open Graph Tags (Dynamic based on type)

```html
<!-- Family variant -->
<meta property="og:title" content="Welcome to the iCare Community!">
<meta property="og:description" content="You're on the waitlist for trusted companionship care. Priority access coming soon.">
<meta property="og:url" content="https://icare.co.uk/waitlist-confirmation">
<meta property="og:image" content="https://icare.co.uk/images/og-welcome-family.jpg">

<!-- Caregiver variant -->
<meta property="og:title" content="Welcome to iCare's Founding Community!">
<meta property="og:description" content="You're part of our founding caregiver community. Get ready to build meaningful work.">
<meta property="og:url" content="https://icare.co.uk/waitlist-confirmation">
<meta property="og:image" content="https://icare.co.uk/images/og-welcome-caregiver.jpg">
```

### Twitter Card Tags

Similar to OG tags, dynamic based on type parameter.

### Schema.org Structured Data

```json
{
  "@context": "https://schema.org",
  "@type": "ConfirmationPage",
  "name": "Waitlist Confirmation",
  "description": "Thank you page confirming waitlist signup.",
  "url": "https://icare.co.uk/waitlist-confirmation"
}
```

### Analytics Events

```javascript
{
  event: "waitlist_confirmation_view",
  properties: {
    user_type: "family" | "caregiver",
    signup_source: "[page where they signed up]",
    timestamp: "[ISO timestamp]"
  }
}

{
  event: "social_share_click",
  properties: {
    platform: "twitter" | "facebook" | "linkedin" | "email",
    user_type: "family" | "caregiver"
  }
}

{
  event: "next_steps_click",
  properties: {
    action: "explore_articles" | "learn_more" | "follow_social"
  }
}

{
  event: "newsletter_signup_post_waitlist",
  properties: {
    user_type: "family" | "caregiver"
  }
}
```

### Image Specifications

| Image Purpose | Dimensions | Alt Text | File Name |
|---------------|------------|----------|-----------|
| Confirmation hero (family) | 1200x800 | "Welcome checkmark and welcoming illustration" | confirmation-family.jpg |
| Confirmation hero (caregiver) | 1200x800 | "Welcome checkmark and welcoming illustration" | confirmation-caregiver.jpg |
| Social share preview (family) | 1200x630 | "I just joined the iCare waitlist for trusted elderly companionship care" | share-family.jpg |
| Social share preview (caregiver) | 1200x630 | "I'm joining iCare's founding community of companion caregivers" | share-caregiver.jpg |

### Internal Linking Strategy

**Links FROM Confirmation TO:**
- Care Guidance Hub (keep engaged)
- About Us (learn more)
- Homepage (explore further)
- Social media accounts (follow updates)

### Accessibility Metadata

```html
<div role="alert" aria-live="polite" aria-atomic="true">
  <h1>Welcome! You're on the waitlist.</h1>
  <p>Check your email for confirmation.</p>
</div>

<section aria-labelledby="what-happens-next">
  <h2 id="what-happens-next">What Happens Next</h2>
  <!-- Content -->
</section>
```

---

## Articles

### General Article Metadata Structure

All articles follow this pattern with article-specific variations.

**Base URL Structure**: `/care-guidance/[article-slug]`

### Common HTML Metadata Pattern

```html
<title>[Article Title] | iCare Care Guidance</title>
<meta name="description" content="[Article-specific description]">
<meta name="keywords" content="[Primary keywords], [Secondary keywords], care guidance">
<link rel="canonical" href="https://icare.co.uk/care-guidance/[article-slug]">
<meta name="author" content="iCare Care Guidance Team">
<meta name="article:published_time" content="2026-02-01T00:00:00+00:00">
<meta name="article:modified_time" content="2026-02-01T00:00:00+00:00">
```

### Common Open Graph Tags Pattern

```html
<meta property="og:type" content="article">
<meta property="og:title" content="[Article Title]">
<meta property="og:description" content="[Article description]">
<meta property="og:url" content="https://icare.co.uk/care-guidance/[article-slug]">
<meta property="og:image" content="https://icare.co.uk/images/articles/[article-slug]-og.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="[Image description]">
<meta property="article:published_time" content="2026-02-01T00:00:00+00:00">
<meta property="article:modified_time" content="2026-02-01T00:00:00+00:00">
<meta property="article:author" content="iCare Care Guidance Team">
<meta property="article:section" content="Care Guidance">
<meta property="article:tag" content="[tag1]">
<meta property="article:tag" content="[tag2]">
```

### Common Twitter Card Tags Pattern

```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="[Article Title]">
<meta name="twitter:description" content="[Article description - 200 chars max]">
<meta name="twitter:image" content="https://icare.co.uk/images/articles/[article-slug]-twitter.jpg">
<meta name="twitter:image:alt" content="[Image description]">
<meta name="twitter:label1" content="Reading time">
<meta name="twitter:data1" content="[X] min read">
<meta name="twitter:label2" content="Category">
<meta name="twitter:data2" content="Care Guidance">
```

### Common Schema.org Article Structure

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "[Article Title]",
  "description": "[Article description]",
  "image": "https://icare.co.uk/images/articles/[article-slug]-og.jpg",
  "author": {
    "@type": "Organization",
    "name": "iCare Care Guidance Team"
  },
  "publisher": {
    "@type": "Organization",
    "name": "iCare",
    "logo": {
      "@type": "ImageObject",
      "url": "https://icare.co.uk/images/logo.png"
    }
  },
  "datePublished": "2026-02-01",
  "dateModified": "2026-02-01",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://icare.co.uk/care-guidance/[article-slug]"
  },
  "wordCount": [word count],
  "articleSection": "Care Guidance",
  "keywords": "[comma-separated keywords]"
}
```

### Common Analytics Events

```javascript
// All articles track these events
{
  event: "article_view",
  properties: {
    article_title: "[title]",
    article_category: "families" | "caregivers" | "health",
    word_count: [count],
    reading_time: "[X] min"
  }
}

{
  event: "article_read_progress",
  properties: {
    article_title: "[title]",
    progress: 25 | 50 | 75 | 100 // percentage
  }
}

{
  event: "article_social_share",
  properties: {
    article_title: "[title]",
    platform: "twitter" | "facebook" | "linkedin" | "email"
  }
}

{
  event: "article_cta_click",
  properties: {
    article_title: "[title]",
    cta_type: "waitlist" | "newsletter" | "related_article"
  }
}

{
  event: "related_article_click",
  properties: {
    source_article: "[current article]",
    destination_article: "[clicked article]"
  }
}
```

---

### Article 1: Understanding Loneliness in Elderly Adults

**URL**: `/care-guidance/loneliness-elderly-adults`

**HTML Metadata**

```html
<title>Understanding Loneliness in Elderly Adults | iCare Care Guidance</title>
<meta name="description" content="Loneliness affects 1.4 million elderly people in the UK. Learn about the causes, health effects, warning signs, and what families can do to help their loved ones.">
<meta name="keywords" content="elderly loneliness UK, loneliness in elderly adults, signs of loneliness in elderly, how to help lonely elderly parent, health effects of loneliness">
<link rel="canonical" href="https://icare.co.uk/care-guidance/loneliness-elderly-adults">
```

**Open Graph Tags**

```html
<meta property="og:title" content="Understanding Loneliness in Elderly Adults">
<meta property="og:description" content="1.4 million elderly people in the UK are chronically lonely. Learn the causes, health impacts, and how families can help.">
<meta property="og:url" content="https://icare.co.uk/care-guidance/loneliness-elderly-adults">
<meta property="og:image" content="https://icare.co.uk/images/articles/loneliness-og.jpg">
<meta property="og:image:alt" content="Elderly person sitting alone looking out window - representing loneliness">
<meta property="article:tag" content="Loneliness">
<meta property="article:tag" content="Health">
<meta property="article:tag" content="Families">
```

**Twitter Card Tags**

```html
<meta name="twitter:title" content="Understanding Loneliness in Elderly Adults">
<meta name="twitter:description" content="1.4M elderly people in UK are lonely. Learn causes, health effects & how to help. Essential reading for families.">
<meta name="twitter:image" content="https://icare.co.uk/images/articles/loneliness-twitter.jpg">
<meta name="twitter:label1" content="Reading time">
<meta name="twitter:data1" content="10 min read">
```

**Image Specifications**

| Image Purpose | Dimensions | Alt Text | File Name |
|---------------|------------|----------|-----------|
| Article hero | 1920x1080 | "Elderly person sitting alone by window looking contemplative and isolated" | loneliness-hero.jpg |
| Statistics graphic | 1200x800 | "Infographic: 1.4 million elderly people in UK are often lonely - Age UK statistic" | loneliness-stats.jpg |
| Health impact diagram | 1200x800 | "Health effects of loneliness: increased dementia risk, heart disease, depression" | loneliness-health.jpg |
| Warning signs checklist | 1200x800 | "Visual checklist of loneliness warning signs in elderly adults" | loneliness-signs.jpg |
| What you can do | 1200x800 | "Family member visiting and spending time with elderly relative" | loneliness-help.jpg |
| OG/Social card | 1200x630 | "Understanding Loneliness in Elderly Adults - Read the guide" | loneliness-og.jpg |

---

### Article 2: Signs Your Parent May Need Support

**URL**: `/care-guidance/signs-parent-needs-support`

**HTML Metadata**

```html
<title>Signs Your Elderly Parent May Need Support | iCare Care Guidance</title>
<meta name="description" content="Recognise the warning signs that your elderly parent needs help. From hygiene changes to social withdrawal, learn what to look for and how to start the conversation.">
<meta name="keywords" content="signs elderly parent needs help, when elderly parent needs support, warning signs aging parent, elderly care signs, parent needs help UK">
<link rel="canonical" href="https://icare.co.uk/care-guidance/signs-parent-needs-support">
```

**Open Graph Tags**

```html
<meta property="og:title" content="Signs Your Elderly Parent May Need Support">
<meta property="og:description" content="Recognise warning signs your parent needs help: hygiene changes, social withdrawal, memory concerns. Learn what to look for.">
<meta property="og:url" content="https://icare.co.uk/care-guidance/signs-parent-needs-support">
<meta property="og:image" content="https://icare.co.uk/images/articles/signs-parent-og.jpg">
<meta property="og:image:alt" content="Adult child noticing warning signs in elderly parent's home">
<meta property="article:tag" content="Warning Signs">
<meta property="article:tag" content="Families">
<meta property="article:tag" content="Assessment">
```

**Twitter Card Tags**

```html
<meta name="twitter:title" content="Signs Your Elderly Parent May Need Support">
<meta name="twitter:description" content="Is your parent withdrawing socially? Neglecting hygiene? Learn the warning signs and how to help.">
<meta name="twitter:image" content="https://icare.co.uk/images/articles/signs-parent-twitter.jpg">
<meta name="twitter:label1" content="Reading time">
<meta name="twitter:data1" content="9 min read">
```

**Image Specifications**

| Image Purpose | Dimensions | Alt Text | File Name |
|---------------|------------|----------|-----------|
| Article hero | 1920x1080 | "Adult child visiting elderly parent at home, observing surroundings with concern" | signs-parent-hero.jpg |
| Physical signs | 1200x800 | "Visual checklist of physical warning signs: hygiene, weight loss, mobility changes" | signs-physical.jpg |
| Behavioral signs | 1200x800 | "Visual checklist of behavioral signs: withdrawal, forgetfulness, mood changes" | signs-behavioral.jpg |
| Home environment | 1200x800 | "Signs in the home: unpaid bills, expired food, clutter, repairs needed" | signs-home.jpg |
| Having the conversation | 1200x800 | "Adult child and elderly parent having caring, respectful conversation" | signs-conversation.jpg |
| OG/Social card | 1200x630 | "Signs Your Parent May Need Support - Essential guide for families" | signs-parent-og.jpg |

---

### Article 3: Starting as a Companion Carer

**URL**: `/care-guidance/starting-companion-carer`

**HTML Metadata**

```html
<title>How to Start as a Companion Carer in the UK | iCare Care Guidance</title>
<meta name="description" content="Want to become a companion carer? Learn what the role involves, skills you need, how to get started, and what to expect. No formal qualifications required.">
<meta name="keywords" content="become companion carer UK, how to start as carer, companion care jobs, become caregiver no experience, companion carer requirements">
<link rel="canonical" href="https://icare.co.uk/care-guidance/starting-companion-carer">
```

**Open Graph Tags**

```html
<meta property="og:title" content="How to Start as a Companion Carer in the UK">
<meta property="og:description" content="Become a companion carer: Learn what the role involves, skills needed, and how to get started. No formal qualifications required.">
<meta property="og:url" content="https://icare.co.uk/care-guidance/starting-companion-carer">
<meta property="og:image" content="https://icare.co.uk/images/articles/starting-carer-og.jpg">
<meta property="og:image:alt" content="New caregiver spending time with elderly person, both smiling">
<meta property="article:tag" content="Caregivers">
<meta property="article:tag" content="Getting Started">
<meta property="article:tag" content="Career">
```

**Twitter Card Tags**

```html
<meta name="twitter:title" content="How to Start as a Companion Carer">
<meta name="twitter:description" content="Want to become a companion carer? Learn what it involves, skills needed & how to start. No formal qualifications required.">
<meta name="twitter:image" content="https://icare.co.uk/images/articles/starting-carer-twitter.jpg">
<meta name="twitter:label1" content="Reading time">
<meta name="twitter:data1" content="9 min read">
```

**Image Specifications**

| Image Purpose | Dimensions | Alt Text | File Name |
|---------------|------------|----------|-----------|
| Article hero | 1920x1080 | "Diverse group of companion carers together, professional and welcoming" | starting-carer-hero.jpg |
| What is companion care | 1200x800 | "Caregiver and elderly person doing jigsaw puzzle together, engaged and happy" | carer-what-is.jpg |
| Skills needed | 1200x800 | "Visual representation of key qualities: patience, empathy, reliability, communication" | carer-skills.jpg |
| Day in the life | 1200x800 | "Split panel showing typical activities: walk in park, cup of tea, conversation, errands" | carer-day-life.jpg |
| Getting started steps | 1200x800 | "Pathway illustration showing steps to become companion carer" | carer-getting-started.jpg |
| OG/Social card | 1200x630 | "Starting as a Companion Carer: Complete guide for new caregivers" | starting-carer-og.jpg |

---

## Global Image Requirements

### Standard Sizes

```
Hero images: 1920x1080 (16:9)
Content images: 1200x800 (3:2)
Small icons: 64x64, 128x128 (square)
Open Graph: 1200x630 (1.91:1)
Twitter Card: 1200x675 (16:9) or 1200x630 (1.91:1)
Favicon: 32x32, 16x16 (square)
```

### Image Optimization

```
Format: WebP with JPEG fallback
Compression: 80-85% quality
Lazy loading: Enabled for below-fold images
Responsive images: Multiple sizes via srcset
Alt text: Required for all images (accessibility)
```

### Alt Text Guidelines

1. **Hero images**: Describe the scene and emotion
2. **Informational graphics**: Describe the key data/insight
3. **Decorative images**: Use empty alt="" if purely decorative
4. **Icons**: Describe the function, not the appearance
5. **Article images**: Describe content relevance to article

---

## Implementation Checklist

### Per Page Setup

- [ ] HTML metadata tags implemented
- [ ] Open Graph tags added
- [ ] Twitter Card tags added
- [ ] Schema.org structured data (JSON-LD) embedded
- [ ] Canonical URL set correctly
- [ ] All images have proper alt text
- [ ] Analytics events configured
- [ ] Accessibility attributes added
- [ ] Internal links implemented
- [ ] Mobile responsive verification

### Testing Requirements

- [ ] Social card preview testing (Facebook Debugger, Twitter Card Validator)
- [ ] Schema.org validation (Google Rich Results Test)
- [ ] Accessibility audit (WAVE, axe DevTools)
- [ ] Analytics event testing (Google Tag Manager Preview)
- [ ] Cross-browser testing
- [ ] Mobile device testing
- [ ] Screen reader testing
- [ ] Keyboard navigation testing

### SEO Verification

- [ ] Google Search Console setup
- [ ] Sitemap.xml submitted
- [ ] Robots.txt configured
- [ ] All pages indexed
- [ ] No duplicate content issues
- [ ] Page speed optimization
- [ ] Core Web Vitals passing

---

## Maintenance Schedule

### Quarterly Reviews

- Update modified dates on pages with content changes
- Review analytics data for underperforming pages
- Update keywords based on search console data
- Refresh social card images if needed

### Annual Reviews

- Audit all metadata for accuracy
- Update Schema.org to latest specifications
- Review and update privacy policy
- Refresh article publication dates if content updated

---

## Document Version History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-02-07 | Product Director (Agent) | Initial comprehensive metadata specification for all pre-launch pages |
| 1.1 | 2026-02-07 | Product Director (Agent) | **React Router v7 Integration**: Added comprehensive React Router v7.7.1 implementation patterns, route module examples, meta/links exports, JSON-LD integration, analytics tracking, type safety, and implementation checklist |
| 1.2 | 2026-02-07 | Product Director (Agent) | **JavaScript Conversion**: Converted all code examples from TypeScript (.tsx) to JavaScript (.jsx) to match project requirements. Updated all route file extensions, removed type annotations, removed type imports, and updated implementation examples throughout document. |

---

## React Router v7 Implementation Notes

### Key Patterns

1. **Route Modules**: Each page is a separate route file in `app/routes/` with `.jsx` extension
2. **Meta Export**: Use `export const meta = () => [...]` for all meta tags
3. **Links Export**: Use `export const links = () => [...]` for canonical URLs
4. **JSON-LD**: Add structured data as `<script type="application/ld+json">` in component
5. **Analytics**: Use hooks (`usePageView`) and event tracking in components
6. **Type Safety** (Optional): If using TypeScript, define types for analytics events

### Benefits

- ✅ Server-side rendering of meta tags (SEO-friendly)
- ✅ Client-side navigation with instant page transitions
- ✅ Dynamic meta tags based on loader data
- ✅ Consistent pattern across all pages
- ✅ Built-in meta tag deduplication
- ✅ JavaScript (.jsx) for simplicity and wider compatibility

### Additional Resources

- [React Router v7 Meta API Documentation](https://reactrouter.com/docs/en/v7/route/meta)
- [React Router v7 Links API Documentation](https://reactrouter.com/docs/en/v7/route/links)
- [React Router v7 Loader Documentation](https://reactrouter.com/docs/en/v7/route/loader)

---

**END OF METADATA SPECIFICATION**
