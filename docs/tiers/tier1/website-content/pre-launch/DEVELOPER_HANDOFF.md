# iCare Pre-Launch Website — Developer Handoff

**Date**: February 2026
**Version**: 1.0
**Status**: Content Complete — Ready for Development

---

## Overview

This package contains all content for the iCare pre-launch website. The site's primary purpose is **marketing and lead capture** ahead of our platform launch.

### Primary Goals
1. Capture waitlist signups (families and caregivers)
2. Build newsletter subscribers (Care Guidance)
3. Establish trust and credibility
4. Drive engagement through content marketing

### Target Audiences
- **Families** — Adult children seeking companionship support for elderly parents
- **Caregivers** — Individuals seeking flexible companion care work

---

## Site Architecture

```
/
├── Homepage
├── How It Works
│   ├── For Families
│   └── For Caregivers
├── About Us
├── Care Guidance (Blog)
│   ├── Hub Landing Page
│   └── Articles
│       ├── Understanding Loneliness in Elderly Adults
│       ├── Signs Your Parent May Need Support
│       └── Starting as a Companion Carer
├── FAQ
├── Our Commitment to Safety
├── Contact
├── Privacy Policy
└── Waitlist Confirmation (Thank You)
    ├── Family Variant
    └── Caregiver Variant
```

---

## Page Inventory

### MUST-HAVE Pages (Launch Blocking)

| Page | File | Word Count | Priority |
|------|------|------------|----------|
| Homepage | `pages/homepage.md` | 1,680 | Critical |
| About Us | `pages/about-us.md` | 1,650 | Critical |
| How It Works — Families | `pages/how-it-works-families.md` | 1,320 | Critical |
| How It Works — Caregivers | `pages/how-it-works-caregivers.md` | 1,320 | Critical |
| Contact | `pages/contact.md` | 400 | Critical |
| Privacy Policy | `pages/privacy-policy.md` | 750 | Critical |
| Waitlist Confirmation | `pages/waitlist-confirmation.md` | 474 | Critical |

### NICE-TO-HAVE Pages (Can Launch Without)

| Page | File | Word Count | Priority |
|------|------|------------|----------|
| Care Guidance Hub | `pages/care-guidance-hub.md` | 590 | High |
| FAQ | `pages/faq.md` | 1,150 | High |
| Our Commitment to Safety | `pages/safety-commitment.md` | 1,150 | Medium |
| Article: Loneliness | `articles/loneliness-elderly-adults.md` | 2,100 | Medium |
| Article: Signs Parent Needs Support | `articles/signs-parent-needs-support.md` | 1,800 | Medium |
| Article: Starting as Companion Carer | `articles/starting-companion-carer.md` | 1,850 | Medium |

---

## Navigation Structure

### Primary Navigation
```
Home | How It Works ▾ | About Us | Care Guidance | FAQ | [Join Waitlist]
                │
                ├── For Families
                └── For Caregivers
```

### Footer Navigation
```
Company              Resources           Legal              Connect
─────────            ─────────           ─────              ───────
About Us             Care Guidance       Privacy Policy     Join Waitlist
Our Safety           FAQ                                    Subscribe
Commitment                                                  Newsletter
Contact                                                     [Social Icons]
```

---

## Forms & CTAs

### 1. Waitlist Signup Form

**Purpose**: Capture high-intent users who want to use the platform

**Placement**: Homepage (hero + dedicated section), How It Works pages, About Us, FAQ, Safety Commitment

**Fields**:
| Field | Type | Required | Validation |
|-------|------|----------|------------|
| Email | email | Yes | Valid email format |
| First Name | text | No | Max 50 chars |
| I am... | select | Yes | "Looking for care for a loved one" / "A caregiver" |
| Consent | checkbox | Yes | Must be checked |

**Consent Checkbox Text**:
> "I agree to receive updates about iCare's launch and services. View our [Privacy Policy]. You can unsubscribe at any time."

**Submit Button**: "Join the Waitlist"

**Success Action**: Redirect to `/waitlist-confirmation?type=family` or `/waitlist-confirmation?type=caregiver`

---

### 2. Newsletter Signup Form

**Purpose**: Capture content-interested visitors (lower commitment)

**Placement**: Care Guidance Hub, article footers, homepage secondary section, site footer

**Fields**:
| Field | Type | Required | Validation |
|-------|------|----------|------------|
| Email | email | Yes | Valid email format |
| Consent | checkbox | Yes | Must be checked |

**Consent Checkbox Text**:
> "I agree to receive Care Guidance articles and updates. View our [Privacy Policy]. You can unsubscribe at any time."

**Submit Button**: "Subscribe"

**Success Action**: Inline confirmation message or toast notification

---

### 3. Contact Form (Optional)

If implementing a contact form rather than just email links:

**Fields**:
| Field | Type | Required |
|-------|------|----------|
| Name | text | Yes |
| Email | email | Yes |
| I am... | select | No |
| Message | textarea | Yes |

**Submit Button**: "Send Message"

---

## Waitlist Confirmation Page

**URL Structure**: `/waitlist-confirmation?type={family|caregiver}`

Two content variants based on `type` parameter:
- `type=family` → Family-specific thank you message
- `type=caregiver` → Caregiver-specific thank you message

See `pages/waitlist-confirmation.md` for both variants.

---

## Technical Requirements

### Email Service Integration

An email service provider is required for:
- Waitlist capture
- Newsletter subscriptions
- Automated welcome emails

**Recommended providers**: Mailchimp, ConvertKit, SendGrid, Buttondown

**Requirements**:
- UK data residency or adequate safeguards
- Signed Data Processing Agreement (DPA)
- Double opt-in optional (single opt-in acceptable)
- List segmentation (families vs caregivers vs newsletter-only)

---

### Analytics Tracking

**Recommended events to track**:

| Event | Trigger | Properties |
|-------|---------|------------|
| `page_view` | Page load | page_path, page_title |
| `waitlist_form_view` | Form in viewport | form_location |
| `waitlist_form_start` | First field focus | user_type (if selected) |
| `waitlist_signup` | Form submit success | user_type, source_page |
| `newsletter_signup` | Form submit success | source_page |
| `article_read` | Scroll 75% of article | article_title |
| `cta_click` | CTA button click | cta_text, cta_location |

---

### SEO Requirements

Each page file includes:
- **Meta title** (under 60 chars)
- **Meta description** (under 160 chars)
- **Target keywords**

**Additional SEO setup**:
- Implement Open Graph tags for social sharing
- Create XML sitemap
- Set up robots.txt
- Implement canonical URLs
- Add structured data (Organization, Article schemas)

---

## Design Notes

### Brand Tone
- Warm and empathetic
- Professional but not clinical
- Trustworthy and transparent
- Accessible and clear

### Accessibility Requirements
- WCAG 2.1 AA compliance minimum
- Colour contrast ratios must pass
- All images need alt text
- Forms must be keyboard navigable
- Focus indicators must be visible

### Typography Guidance
- Body text: readable serif or clean sans-serif
- Headings: clear hierarchy
- Reading age target: 12-14 (simple language)
- Line length: 60-80 characters for body text

### Imagery Suggestions
- Warm, natural photographs
- Diverse elderly adults and caregivers
- UK settings (recognisably British)
- Avoid clinical/medical imagery
- Focus on connection and companionship

---

## Content Files Reference

### Strategy & Compliance
| File | Purpose |
|------|---------|
| `CONTENT_STRATEGY_BRIEF.md` | Tone, voice, messaging guidelines |
| `compliance/EMAIL_CAPTURE_REQUIREMENTS.md` | GDPR requirements for forms |

### Pages
| File | Page |
|------|------|
| `pages/homepage.md` | Homepage |
| `pages/about-us.md` | About Us |
| `pages/how-it-works-families.md` | How It Works — Families |
| `pages/how-it-works-caregivers.md` | How It Works — Caregivers |
| `pages/contact.md` | Contact |
| `pages/privacy-policy.md` | Privacy Policy |
| `pages/waitlist-confirmation.md` | Thank You (2 variants) |
| `pages/care-guidance-hub.md` | Care Guidance landing |
| `pages/faq.md` | FAQ |
| `pages/safety-commitment.md` | Our Commitment to Safety |

### Articles
| File | Article |
|------|---------|
| `articles/loneliness-elderly-adults.md` | Understanding Loneliness in Elderly Adults |
| `articles/signs-parent-needs-support.md` | Signs Your Parent May Need Support |
| `articles/starting-companion-carer.md` | Starting as a Companion Carer |
| `articles/ARTICLE_IDEAS.md` | Future article planning |

---

## Placeholder Content

The following items need to be confirmed/replaced before launch:

| Item | Current Placeholder | Action Required |
|------|---------------------|-----------------|
| Email addresses | hello@icare-app.co.uk, privacy@icare-app.co.uk | Confirm domain and create mailboxes |
| Company registration | "iCare Ltd (registration pending)" | Update when registered |
| Social media links | [Twitter], [Facebook], [LinkedIn] | Create accounts and add URLs |
| Founder story | Generic narrative included | Review/customise in About Us |
| Logo | Not included | Provide logo files |

---

## Launch Checklist

### Before Development
- [ ] Confirm email domain and addresses
- [ ] Select email service provider
- [ ] Provide logo and brand assets
- [ ] Review and approve all content
- [ ] Confirm founder story for About Us

### During Development
- [ ] Implement all MUST-HAVE pages
- [ ] Set up waitlist form with email provider
- [ ] Set up newsletter form
- [ ] Implement analytics tracking
- [ ] Test form submissions
- [ ] Test email confirmations

### Before Launch
- [ ] Content review for typos/errors
- [ ] Legal review of Privacy Policy (optional)
- [ ] Accessibility audit
- [ ] Mobile responsiveness testing
- [ ] Form testing (all paths)
- [ ] Email delivery testing
- [ ] SEO setup (sitemap, robots.txt)
- [ ] SSL certificate active
- [ ] Analytics verified

---

## Questions?

Contact the product team for:
- Content clarifications
- Messaging questions
- Scope changes

---

**Document Version**: 1.0
**Last Updated**: February 2026
