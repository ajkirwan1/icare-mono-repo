// ============================================================================
// React Router v7 Implementation Example (JavaScript)
// ============================================================================
// This file demonstrates a complete route implementation for the iCare
// pre-launch website using React Router v7.7.1 with JavaScript (.jsx)
//
// File: app/routes/how-it-works.families.jsx
// URL: /how-it-works/families
// ============================================================================

import { Link } from "react-router";
import { useEffect, useRef } from "react";

// ============================================================================
// Meta Tags Export
// ============================================================================
// This function returns all meta tags for the page
// React Router will automatically deduplicate and merge with root meta tags
// ============================================================================

export const meta = () => {
  return [
    // Page title
    { title: "How It Works for Families - iCare Companionship Services" },

    // Standard meta tags
    { name: "description", content: "Discover how iCare helps families find trusted companions for elderly relatives. Simple, safe, and designed around real human connection. Join the waitlist today." },
    { name: "keywords", content: "companion for elderly parent, how companionship care works, find companion for elderly UK, care for elderly parent" },

    // Open Graph tags (Facebook, LinkedIn)
    { property: "og:type", content: "website" },
    { property: "og:title", content: "How It Works for Families - iCare" },
    { property: "og:description", content: "Learn how iCare makes it easy to find trusted companions for elderly relatives. Priority access available for families on the waitlist." },
    { property: "og:url", content: "https://icare.co.uk/how-it-works/families" },
    { property: "og:image", content: "https://icare.co.uk/images/og-how-families.jpg" },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: "Family searching for care on laptop with elderly parent nearby" },

    // Twitter Card tags
    { name: "twitter:title", content: "How It Works for Families - iCare" },
    { name: "twitter:description", content: "Find trusted companions for your elderly relative in 5 simple steps. Join the waitlist for priority access." },
    { name: "twitter:image", content: "https://icare.co.uk/images/twitter-how-families.jpg" },
    { name: "twitter:image:alt", content: "Family searching for care on laptop" },
  ];
};

// ============================================================================
// Links Export
// ============================================================================
// This function returns link tags (canonical URLs, stylesheets, etc.)
// ============================================================================

export const links = () => {
  return [
    { rel: "canonical", href: "https://icare.co.uk/how-it-works/families" },
  ];
};

// ============================================================================
// Analytics Hook
// ============================================================================
// Track when users view specific sections of the page
// ============================================================================

function useStepTracking() {
  const hasTrackedRef = useRef({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const stepNumber = entry.target.getAttribute("data-step");
            const stepName = entry.target.getAttribute("data-step-name");

            if (stepNumber && stepName && !hasTrackedRef.current[Number(stepNumber)]) {
              window.gtag?.("event", "how_to_step_view", {
                step_number: Number(stepNumber),
                step_name: stepName,
              });
              hasTrackedRef.current[Number(stepNumber)] = true;
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    // Observe all step sections
    document.querySelectorAll("[data-step]").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);
}

// ============================================================================
// Main Component
// ============================================================================

export default function HowItWorksFamilies() {
  useStepTracking();

  const handleWaitlistClick = () => {
    window.gtag?.("event", "waitlist_signup", {
      source_page: "how_it_works_families",
      user_type: "family",
      cta_location: "end_of_page",
    });
  };

  return (
    <>
      {/* ================================================================== */}
      {/* JSON-LD Structured Data (Schema.org HowTo Schema) */}
      {/* ================================================================== */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
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
          }),
        }}
      />

      {/* ================================================================== */}
      {/* Page Content */}
      {/* ================================================================== */}
      <main className="how-it-works-families" role="main" aria-label="How it works for families">
        {/* Skip link for accessibility */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        {/* Hero Section */}
        <section className="hero" id="main-content">
          <div className="container">
            <h1>Finding Trusted Companionship for Your Loved One</h1>
            <p className="lead">
              Finding the right support for an elderly loved one shouldn't feel overwhelming.
              Whether you're worried about a parent who's become increasingly isolated, seeking
              respite so you can catch your breath, or simply want someone trustworthy to spend
              time with your relative, you deserve a better way forward.
            </p>

            <img
              src="/images/families-hero.jpg"
              srcSet="/images/families-hero-800.jpg 800w,
                      /images/families-hero-1200.jpg 1200w,
                      /images/families-hero-1920.jpg 1920w"
              sizes="(max-width: 800px) 800px,
                     (max-width: 1200px) 1200px,
                     1920px"
              alt="Adult daughter sitting with elderly mother reviewing profiles on tablet together"
              loading="eager"
              width={1920}
              height={1080}
            />
          </div>
        </section>

        {/* Step-by-step process */}
        <section className="steps">
          <div className="container">
            <h2>How You'll Find Support</h2>

            {/* Step 1 */}
            <article
              className="step"
              data-step="1"
              data-step-name="tell_us"
              aria-labelledby="step-1-heading"
            >
              <h3 id="step-1-heading">1. Tell us what you need</h3>
              <p>
                You'll start by creating a simple profile that helps us understand your situation.
                Where does your loved one live? What kind of companionship would be most meaningful
                for them? What days and times work best?
              </p>
              <img
                src="/images/step-tell-us.jpg"
                alt="Person completing profile form on laptop"
                loading="lazy"
                width={600}
                height={400}
              />
            </article>

            {/* Step 2 */}
            <article
              className="step"
              data-step="2"
              data-step-name="discover"
              aria-labelledby="step-2-heading"
            >
              <h3 id="step-2-heading">2. Discover caring people in your area</h3>
              <p>
                Once you've told us what you're looking for, you'll be able to see profiles of
                verified companions in your local area. These are real people who genuinely want
                to spend time with older adults.
              </p>
              <img
                src="/images/step-discover.jpg"
                alt="Grid of caregiver profiles displayed on screen"
                loading="lazy"
                width={600}
                height={400}
              />
            </article>

            {/* Steps 3-5... */}
            {/* (Additional steps follow same pattern) */}
          </div>
        </section>

        {/* What Makes This Different */}
        <section className="differentiators">
          <div className="container">
            <h2>What Makes This Different</h2>
            <p>
              If you've looked into care agencies or other options, you might be wondering what
              makes iCare different. It comes down to how we're designing every part of this service.
            </p>

            {/* Differentiator cards... */}
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta">
          <div className="container">
            <h2>Be Among the First</h2>
            <p>
              We're working hard to launch iCare in the coming months. When we do, we want
              families like yours to be first in line.
            </p>

            <Link
              to="/waitlist?type=family"
              className="btn btn-primary"
              onClick={handleWaitlistClick}
              aria-label="Join the waitlist for families"
            >
              Join the Waitlist for Families
            </Link>

            <p className="cta-subtext">
              Get priority access when we launch. Receive updates on our progress.
              Help shape what we build.
            </p>
          </div>
        </section>

        {/* Internal Links */}
        <nav className="related-links" aria-label="Related pages">
          <h2>Learn More</h2>
          <ul>
            <li>
              <Link to="/about-us">Read about our mission</Link>
            </li>
            <li>
              <Link to="/safety">Learn about our safety approach</Link>
            </li>
            <li>
              <Link to="/faq">Get answers to your questions</Link>
            </li>
            <li>
              <Link to="/care-guidance">Explore our care guidance articles</Link>
            </li>
          </ul>
        </nav>
      </main>
    </>
  );
}

// ============================================================================
// Analytics Event Examples (for reference)
// ============================================================================
// When tracking analytics events, use these patterns:
//
// Step View Event:
// {
//   event: "how_to_step_view",
//   step_number: 1-5,
//   step_name: "tell_us" | "discover" | "match" | "arrange" | "peace_of_mind"
// }
//
// Waitlist Signup Event:
// {
//   event: "waitlist_signup",
//   source_page: "how_it_works_families",
//   user_type: "family",
//   cta_location: "end_of_page" | "mid_page" | etc
// }
//
// Note: window.gtag is provided by Google Analytics script tag in <head>
