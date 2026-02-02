# Tier 1 Launch Readiness Checklist

**Document Purpose**: Comprehensive checklist for Tier 1 market entry (companionship services only).

**Document Owner**: Product Director & Founder
**Created**: 2026-02-01
**Status**: ACTIVE - Pre-Launch Phase

---

## Executive Summary

This checklist tracks all requirements for Tier 1 launch. Tier 1 enables companionship services only (no personal care, no health data) to minimize compliance investment before product-market fit validation.

**Critical Path**: Items marked with [BLOCKER] MUST be complete before launch. Items marked with [RECOMMENDED] should be complete but can be deferred if necessary.

**Tier 1 Scope Reminder**:
- Services: Companionship, light housework, shopping, meal preparation
- Data: Standard personal data ONLY (no health data, no special category data)
- Verification: ID, right to work, phone/email. DBS is VOLUNTARY
- No personal care, no medication assistance, no live-in care

---

## 1. Product Readiness

### 1.1 Core Features Complete

**User Management & Authentication** [T1]
- [ ] [BLOCKER] Care receiver registration (email + password)
- [ ] [BLOCKER] Caregiver registration (email + password)
- [ ] [BLOCKER] Email verification (double opt-in)
- [ ] [BLOCKER] Phone verification (SMS OTP)
- [ ] [BLOCKER] Password management (reset, change)
- [ ] [BLOCKER] Session management (secure cookies, expiry)
- [ ] [BLOCKER] Role-based access control (Care Receiver, Caregiver, Admin)

**Caregiver Profiles** [T1]
- [ ] [BLOCKER] Profile creation wizard (name, photo, bio, experience)
- [ ] [BLOCKER] Service type selection (companionship only at T1)
- [ ] [BLOCKER] Hourly rate setting (caregiver-controlled, 12-25 GBP guidance)
- [ ] [BLOCKER] Service radius configuration (5-30 miles)
- [ ] [BLOCKER] Availability calendar (mark available time slots)
- [ ] [BLOCKER] Bank account setup (Stripe Connect for payouts)
- [ ] [BLOCKER] Profile displays "Companionship Services Only" badge

**Verification System** [T1]
- [ ] [BLOCKER] ID verification (Stripe Identity or equivalent)
- [ ] [BLOCKER] Right to work verification (UKVI share code + document upload)
- [ ] [BLOCKER] Admin approval workflow
- [ ] [BLOCKER] Verification status tracking
- [ ] [RECOMMENDED] Voluntary DBS certificate upload
- [ ] [RECOMMENDED] "DBS Verified" badge display (if caregiver submits certificate)

**Care Receiver Profiles** [T1]
- [ ] [BLOCKER] Basic registration (name, email, phone, postcode)
- [ ] [BLOCKER] Age verification (65+ or documented care needs)
- [ ] [BLOCKER] Emergency contact capture
- [ ] [BLOCKER] GDPR consent management
- [ ] [RECOMMENDED] Family member proxy registration

**Discovery & Search** [T1]
- [ ] [BLOCKER] Postcode-based location search
- [ ] [BLOCKER] Radius selection (5-30 miles)
- [ ] [BLOCKER] Caregiver results list (sorted by distance)
- [ ] [BLOCKER] Caregiver profile cards (photo, name, bio, rate, distance, rating)
- [ ] [BLOCKER] Filter by availability
- [ ] [BLOCKER] Filter by hourly rate range
- [ ] [RECOMMENDED] Filter by "DBS Verified" status
- [ ] [RECOMMENDED] Save favorite caregivers

**Booking System** [T1]
- [ ] [BLOCKER] Hourly booking request creation (companionship only)
- [ ] [BLOCKER] Date/time selection
- [ ] [BLOCKER] Service type confirmation (limited to T1 services)
- [ ] [BLOCKER] Caregiver booking request review
- [ ] [BLOCKER] Caregiver accept/decline workflow
- [ ] [BLOCKER] Payment capture on acceptance (Stripe escrow)
- [ ] [BLOCKER] Booking lifecycle management (pending, confirmed, in-progress, completed, cancelled)
- [ ] [BLOCKER] Booking completion workflow
- [ ] [BLOCKER] Cancellation policy enforcement
- [ ] [BLOCKER] No-show management

**Messaging System** [T1]
- [ ] [BLOCKER] In-app messaging (care receiver ↔ caregiver)
- [ ] [BLOCKER] Message history persistence
- [ ] [BLOCKER] Email notifications for new messages
- [ ] [RECOMMENDED] Content filtering (off-platform payment keywords)
- [ ] [RECOMMENDED] Message reporting mechanism

**Payment & Financial** [T1]
- [ ] [BLOCKER] Stripe integration (payment processing)
- [ ] [BLOCKER] Stripe Connect (caregiver payouts)
- [ ] [BLOCKER] Escrow workflow (hold on booking, release on completion)
- [ ] [BLOCKER] Commission deduction (rate TBD - **PENDING FOUNDER DECISION**)
- [ ] [BLOCKER] Refund processing (for cancellations)
- [ ] [BLOCKER] Caregiver earnings dashboard
- [ ] [BLOCKER] Care receiver payment history
- [ ] [RECOMMENDED] Invoice generation

**Reviews & Ratings** [T1]
- [ ] [BLOCKER] Post-booking review prompt
- [ ] [BLOCKER] 5-star rating system
- [ ] [BLOCKER] Written review submission
- [ ] [BLOCKER] Review display on caregiver profile
- [ ] [BLOCKER] Average rating calculation
- [ ] [RECOMMENDED] Review moderation queue (admin)
- [ ] [RECOMMENDED] Inappropriate review flagging

**Safeguarding & Incidents** [T1]
- [ ] [BLOCKER] Incident reporting form (care receiver, caregiver, admin)
- [ ] [BLOCKER] Incident categorization (safeguarding concern, financial, conduct)
- [ ] [BLOCKER] Admin incident review dashboard
- [ ] [BLOCKER] Incident escalation workflow
- [ ] [BLOCKER] Emergency escalation (999 guidance)
- [ ] [BLOCKER] Safeguarding Adults Board (SAB) contact list
- [ ] [RECOMMENDED] Automated safeguarding keyword detection in messages

**Admin Dashboard** [T1]
- [ ] [BLOCKER] User management (view, suspend, delete)
- [ ] [BLOCKER] Caregiver verification queue (ID, right to work, DBS)
- [ ] [BLOCKER] Booking oversight (view all bookings)
- [ ] [BLOCKER] Dispute resolution tools
- [ ] [BLOCKER] Incident management dashboard
- [ ] [BLOCKER] Safeguarding reporting interface
- [ ] [BLOCKER] Basic analytics (user counts, booking volume, revenue)
- [ ] [RECOMMENDED] Email communication tools

---

### 1.2 User Flows Tested

- [ ] [BLOCKER] Care receiver registration → search → booking request → payment
- [ ] [BLOCKER] Caregiver registration → verification → profile creation → booking acceptance → payout
- [ ] [BLOCKER] Family member proxy registration → booking on behalf → communication
- [ ] [BLOCKER] Booking cancellation (care receiver initiated)
- [ ] [BLOCKER] Booking cancellation (caregiver initiated)
- [ ] [BLOCKER] No-show handling
- [ ] [BLOCKER] Review submission post-booking
- [ ] [BLOCKER] Safeguarding incident reporting
- [ ] [BLOCKER] Admin verification approval/rejection
- [ ] [RECOMMENDED] Message-based care planning discussion

---

### 1.3 Admin Tools Ready

- [ ] [BLOCKER] Admin user account created
- [ ] [BLOCKER] Admin access to verification queue
- [ ] [BLOCKER] Admin access to incident reports
- [ ] [BLOCKER] Admin access to user suspension/removal
- [ ] [BLOCKER] Admin access to booking disputes
- [ ] [BLOCKER] Admin training on safeguarding escalation
- [ ] [RECOMMENDED] Admin user guide/documentation

---

## 2. Legal & Compliance

### 2.1 DPIA (Data Protection Impact Assessment)

- [ ] [BLOCKER] Tier 1 DPIA completed (standard personal data only)
- [ ] [BLOCKER] DPO or data protection consultant engaged
- [ ] [BLOCKER] DPIA reviewed and signed off
- [ ] [BLOCKER] Confirmation that ICO prior consultation NOT required for Tier 1
- [ ] [BLOCKER] DPIA filed internally for audit trail
- [ ] [RECOMMENDED] Legal review of DPIA conclusions

**Status**: REQUIRED for Tier 1 launch. Estimated cost: 2,000-4,000 GBP. Timeline: 1-2 weeks.

---

### 2.2 Privacy Policy

- [ ] [BLOCKER] Privacy Policy drafted
- [ ] [BLOCKER] Privacy Policy covers Tier 1 data processing only
- [ ] [BLOCKER] Privacy Policy specifies data retention periods
- [ ] [BLOCKER] Privacy Policy explains user rights (access, deletion, portability)
- [ ] [BLOCKER] Privacy Policy references Stripe as payment processor
- [ ] [BLOCKER] Privacy Policy includes cookie policy
- [ ] [BLOCKER] Legal review of Privacy Policy completed
- [ ] [BLOCKER] Privacy Policy published on website
- [ ] [BLOCKER] Privacy Policy acceptance required during registration

**Status**: REQUIRED for Tier 1 launch. Estimated cost: 1,000-2,000 GBP (legal review). Timeline: 1 week.

---

### 2.3 Terms of Service

**Care Receiver Terms of Service**
- [ ] [BLOCKER] Terms of Service drafted (care receiver version)
- [ ] [BLOCKER] Introduction Agency model language (platform facilitates introductions)
- [ ] [BLOCKER] Self-employed caregiver status disclosure
- [ ] [BLOCKER] Platform liability limitations (no guarantee of care quality)
- [ ] [BLOCKER] Cancellation policy
- [ ] [BLOCKER] Refund policy
- [ ] [BLOCKER] Dispute resolution process
- [ ] [BLOCKER] Legal review completed
- [ ] [BLOCKER] Published on website
- [ ] [BLOCKER] Acceptance required during registration

**Caregiver Terms of Service**
- [ ] [BLOCKER] Terms of Service drafted (caregiver version)
- [ ] [BLOCKER] Self-employment status confirmation
- [ ] [BLOCKER] Tax responsibility disclosure (HMRC self-assessment)
- [ ] [BLOCKER] Insurance requirements (Public Liability minimum)
- [ ] [BLOCKER] Commission structure (**PENDING FOUNDER DECISION**)
- [ ] [BLOCKER] Payout terms (timing, method)
- [ ] [BLOCKER] Service standards (companionship scope)
- [ ] [BLOCKER] Platform suspension/removal rights
- [ ] [BLOCKER] Legal review completed
- [ ] [BLOCKER] Published on website
- [ ] [BLOCKER] Acceptance required during registration

**Status**: REQUIRED for Tier 1 launch. Estimated cost: 2,000-3,000 GBP (legal review). Timeline: 1 week.

---

### 2.4 ICO Registration

- [ ] [BLOCKER] ICO registration completed (Data Controller)
- [ ] [BLOCKER] Registration fee paid (40-60 GBP)
- [ ] [BLOCKER] Registration certificate received
- [ ] [BLOCKER] Registration number added to Privacy Policy

**Status**: REQUIRED for Tier 1 launch. Cost: 40-60 GBP. Timeline: 1 day (online application).

---

### 2.5 Cookie Consent (PECR Compliance)

- [ ] [BLOCKER] Cookie consent banner implemented
- [ ] [BLOCKER] Cookie policy drafted
- [ ] [BLOCKER] Cookie categorization (essential, analytics, marketing)
- [ ] [BLOCKER] User can accept/reject non-essential cookies
- [ ] [BLOCKER] Cookie preferences saved
- [ ] [BLOCKER] Analytics cookies blocked until consent given
- [ ] [RECOMMENDED] Cookie consent management platform integrated

**Status**: REQUIRED for Tier 1 launch (legal requirement). Estimated cost: 500-1,000 GBP (implementation). Timeline: 1 week.

---

### 2.6 Legal Opinions

**CQC Registration (Introduction Agency Status)**
- [ ] [BLOCKER] Regulatory solicitor engaged
- [ ] [BLOCKER] Legal opinion commissioned (Introduction Agency classification)
- [ ] [BLOCKER] Legal opinion received and reviewed
- [ ] [BLOCKER] Legal opinion filed for audit trail
- [ ] [BLOCKER] Legal opinion confirms NO CQC registration required for Tier 1

**Status**: STRONGLY RECOMMENDED before launch. Estimated cost: 3,000-5,000 GBP. Timeline: 1-2 weeks.

**Right to Work Verification**
- [ ] [RECOMMENDED] Legal guidance on UKVI share code verification process
- [ ] [RECOMMENDED] Document retention requirements confirmed

---

### 2.7 Safeguarding Policy

- [ ] [BLOCKER] Safeguarding policy drafted (Care Act 2014 compliance)
- [ ] [BLOCKER] Policy defines safeguarding concerns (abuse, neglect, exploitation)
- [ ] [BLOCKER] Policy defines reporting procedures (internal escalation + SAB liaison)
- [ ] [BLOCKER] Policy defines admin safeguarding lead responsibilities
- [ ] [BLOCKER] Policy includes emergency escalation (999 guidance)
- [ ] [BLOCKER] Policy published on website
- [ ] [BLOCKER] Admin team trained on safeguarding policy
- [ ] [RECOMMENDED] Legal review of safeguarding policy

**Status**: REQUIRED for Tier 1 launch. Estimated cost: Included in legal review (1,500-2,500 GBP if standalone). Timeline: 1-2 weeks.

---

### 2.8 Insurance

**Platform Insurance**
- [ ] [BLOCKER] Insurance broker consultation completed
- [ ] [BLOCKER] Platform Public Liability insurance procured (marketplace operator scope)
- [ ] [BLOCKER] Cyber insurance procured (data breach coverage)
- [ ] [BLOCKER] Professional Indemnity insurance procured (platform services)
- [ ] [RECOMMENDED] Directors & Officers insurance procured
- [ ] [BLOCKER] Insurance certificates filed
- [ ] [BLOCKER] Insurance requirements documented in risk register

**Caregiver Insurance Requirements**
- [ ] [BLOCKER] Caregiver insurance requirements defined (Public Liability minimum)
- [ ] [BLOCKER] Insurance verification process defined
- [ ] [BLOCKER] Insurance requirements added to Caregiver Terms of Service
- [ ] [RECOMMENDED] Optional group insurance scheme for caregivers explored

**Status**: REQUIRED for Tier 1 launch. Estimated cost: 3,000-6,000 GBP/year (platform insurance). Timeline: 1-2 weeks.

---

### 2.9 Compliance Documentation

- [ ] [BLOCKER] Gap registry updated (all Tier 1 compliance gaps closed)
- [ ] [BLOCKER] Audit trail for all founder decisions (FDR-001, FDR-002, FDR-003)
- [ ] [BLOCKER] Compliance risk register created
- [ ] [BLOCKER] Document retention policy defined
- [ ] [RECOMMENDED] Compliance calendar created (annual reviews, renewals)

---

## 3. Content & Marketing

### 3.1 Website Live

- [ ] [BLOCKER] Domain registered
- [ ] [BLOCKER] Hosting configured
- [ ] [BLOCKER] SSL certificate installed (HTTPS)
- [ ] [BLOCKER] Homepage live
- [ ] [BLOCKER] "How It Works" page (care receivers)
- [ ] [BLOCKER] "How It Works" page (caregivers)
- [ ] [BLOCKER] Pricing page (**PENDING FOUNDER DECISION** on commission model)
- [ ] [BLOCKER] Privacy Policy page
- [ ] [BLOCKER] Terms of Service page (care receiver + caregiver)
- [ ] [BLOCKER] Cookie Policy page
- [ ] [BLOCKER] Safeguarding page
- [ ] [BLOCKER] Contact page
- [ ] [BLOCKER] FAQ page
- [ ] [RECOMMENDED] About Us page
- [ ] [RECOMMENDED] Blog/resources section

---

### 3.2 Caregiver Recruitment Materials

- [ ] [BLOCKER] Caregiver landing page (value proposition)
- [ ] [BLOCKER] Caregiver registration flow accessible
- [ ] [BLOCKER] Caregiver onboarding guide (email sequence or PDF)
- [ ] [BLOCKER] Verification requirements clearly communicated
- [ ] [BLOCKER] Payout structure communicated (**PENDING FOUNDER DECISION**)
- [ ] [RECOMMENDED] Caregiver recruitment ads prepared (social media, job boards)
- [ ] [RECOMMENDED] Caregiver testimonials (if available from beta/pilot)

---

### 3.3 Family Marketing Materials

- [ ] [BLOCKER] Care receiver landing page (value proposition)
- [ ] [BLOCKER] Registration flow accessible
- [ ] [BLOCKER] Service scope clearly communicated (companionship only at T1)
- [ ] [BLOCKER] Pricing information available (**PENDING FOUNDER DECISION**)
- [ ] [BLOCKER] Trust signals emphasized (verification, reviews, safeguarding)
- [ ] [RECOMMENDED] Family testimonials (if available)
- [ ] [RECOMMENDED] Marketing ads prepared (Google, Facebook, care directories)

---

### 3.4 Messaging & Positioning

- [ ] [BLOCKER] Messaging confirms Introduction Agency model (self-employed caregivers)
- [ ] [BLOCKER] No claims of CQC registration or regulated care provider status
- [ ] [BLOCKER] Clear disclosure: "Companionship services only at launch"
- [ ] [BLOCKER] Roadmap visibility: "Personal care services coming soon" (Tier 2)
- [ ] [BLOCKER] Safeguarding commitment messaging
- [ ] [BLOCKER] Trust and safety messaging (verification, reviews)

---

## 4. Operations

### 4.1 Support Process Defined

- [ ] [BLOCKER] Support email address created (support@[domain])
- [ ] [BLOCKER] Support request categorization process (technical, booking, safeguarding, dispute)
- [ ] [BLOCKER] Support response SLAs defined
- [ ] [BLOCKER] Support team trained (or founder acting as support)
- [ ] [BLOCKER] Support knowledge base created (FAQ, common issues)
- [ ] [RECOMMENDED] Support ticketing system configured (Zendesk, Intercom, etc.)
- [ ] [RECOMMENDED] Phone support option defined

---

### 4.2 Safeguarding Escalation Process

- [ ] [BLOCKER] Safeguarding lead assigned (admin or founder)
- [ ] [BLOCKER] Safeguarding escalation procedure documented
- [ ] [BLOCKER] Safeguarding Adults Board (SAB) contacts identified for operating areas
- [ ] [BLOCKER] Emergency escalation process defined (999, local authority)
- [ ] [BLOCKER] Safeguarding incident log template created
- [ ] [BLOCKER] Safeguarding team training completed
- [ ] [RECOMMENDED] Safeguarding policy breach response plan

---

### 4.3 Incident Response Plan

- [ ] [BLOCKER] Incident response plan drafted
- [ ] [BLOCKER] Data breach response procedure (ICO notification within 72 hours)
- [ ] [BLOCKER] Safeguarding incident response procedure
- [ ] [BLOCKER] Payment failure response procedure
- [ ] [BLOCKER] Platform outage communication plan
- [ ] [BLOCKER] Incident response team roles assigned
- [ ] [RECOMMENDED] Incident response plan tested (tabletop exercise)

---

### 4.4 Onboarding & Training

**Caregiver Onboarding**
- [ ] [BLOCKER] Caregiver onboarding checklist created
- [ ] [BLOCKER] Verification requirements communicated
- [ ] [BLOCKER] Profile creation guidance provided
- [ ] [BLOCKER] Service scope communicated (companionship only at T1)
- [ ] [BLOCKER] Payment and payout process explained
- [ ] [RECOMMENDED] Caregiver onboarding call/webinar offered

**Care Receiver Onboarding**
- [ ] [BLOCKER] Care receiver welcome email sequence
- [ ] [BLOCKER] How to search and book guidance
- [ ] [BLOCKER] How to message caregivers guidance
- [ ] [BLOCKER] Safeguarding reporting guidance
- [ ] [RECOMMENDED] Onboarding call for elderly users (assisted registration)

**Admin Training**
- [ ] [BLOCKER] Admin trained on verification approval process
- [ ] [BLOCKER] Admin trained on safeguarding escalation
- [ ] [BLOCKER] Admin trained on dispute resolution
- [ ] [BLOCKER] Admin trained on incident management

---

### 4.5 Quality Assurance

- [ ] [BLOCKER] Review moderation process defined
- [ ] [BLOCKER] Caregiver profile approval criteria documented
- [ ] [BLOCKER] Booking dispute resolution process defined
- [ ] [RECOMMENDED] Periodic caregiver quality audits planned
- [ ] [RECOMMENDED] Care receiver satisfaction surveys planned

---

## 5. Technical

### 5.1 Hosting & Infrastructure

- [ ] [BLOCKER] Hosting environment configured (AWS, Azure, Heroku, etc.)
- [ ] [BLOCKER] Production environment created
- [ ] [BLOCKER] Staging environment created (for testing before release)
- [ ] [BLOCKER] Database configured (PostgreSQL, MySQL, etc.)
- [ ] [BLOCKER] Database backups configured (daily minimum)
- [ ] [BLOCKER] SSL/TLS certificates configured (HTTPS)
- [ ] [BLOCKER] Domain DNS configured
- [ ] [BLOCKER] CDN configured (for static assets, images)
- [ ] [RECOMMENDED] Disaster recovery plan documented

---

### 5.2 Payment Processing (Stripe)

- [ ] [BLOCKER] Stripe account created and verified
- [ ] [BLOCKER] Stripe Connect configured (caregiver payouts)
- [ ] [BLOCKER] Stripe payment integration tested (test mode)
- [ ] [BLOCKER] Stripe webhooks configured (payment success, failure)
- [ ] [BLOCKER] Stripe escrow workflow implemented (hold → release on completion)
- [ ] [BLOCKER] Stripe commission deduction configured (**PENDING FOUNDER DECISION**)
- [ ] [BLOCKER] Stripe refund processing tested
- [ ] [BLOCKER] Stripe fraud prevention configured
- [ ] [BLOCKER] Stripe switched to live mode (production)
- [ ] [BLOCKER] PCI DSS compliance confirmed (Stripe handles card data)

---

### 5.3 Monitoring & Alerting

- [ ] [BLOCKER] Error tracking configured (Sentry, Rollbar, etc.)
- [ ] [BLOCKER] Application performance monitoring (APM) configured
- [ ] [BLOCKER] Uptime monitoring configured (Pingdom, UptimeRobot, etc.)
- [ ] [BLOCKER] Server resource monitoring (CPU, memory, disk)
- [ ] [BLOCKER] Database monitoring (query performance, connections)
- [ ] [BLOCKER] Alert notifications configured (email, Slack, SMS)
- [ ] [BLOCKER] On-call rotation defined (who responds to alerts)
- [ ] [RECOMMENDED] Log aggregation configured (ELK, Splunk, etc.)

---

### 5.4 Security

- [ ] [BLOCKER] HTTPS enforced (all traffic)
- [ ] [BLOCKER] Password hashing (bcrypt or argon2)
- [ ] [BLOCKER] Session security (secure cookies, HttpOnly, SameSite)
- [ ] [BLOCKER] SQL injection protection (parameterized queries)
- [ ] [BLOCKER] XSS protection (input sanitization, output encoding)
- [ ] [BLOCKER] CSRF protection (tokens)
- [ ] [BLOCKER] Rate limiting (API, login attempts)
- [ ] [BLOCKER] Data encryption at rest (database, file storage)
- [ ] [BLOCKER] Secure file uploads (virus scanning, file type validation)
- [ ] [BLOCKER] Environment variables secured (no hardcoded secrets)
- [ ] [RECOMMENDED] Security audit/penetration testing
- [ ] [RECOMMENDED] Bug bounty program considered

---

### 5.5 Data Management

- [ ] [BLOCKER] Database schema finalized (Tier 1 data only)
- [ ] [BLOCKER] Data retention policy implemented
- [ ] [BLOCKER] User data deletion workflow (GDPR right to erasure)
- [ ] [BLOCKER] Data export workflow (GDPR right to portability)
- [ ] [BLOCKER] Audit logging configured (user actions, admin actions)
- [ ] [BLOCKER] Personal data pseudonymization (where applicable)
- [ ] [RECOMMENDED] Data anonymization for analytics

---

### 5.6 Third-Party Integrations

**Stripe (Payment Processing)**
- [ ] [BLOCKER] Stripe integration complete (see Section 5.2)

**Stripe Identity (ID Verification)**
- [ ] [BLOCKER] Stripe Identity configured
- [ ] [BLOCKER] ID verification flow tested
- [ ] [BLOCKER] Verification results integrated into admin dashboard

**SMS Provider (Phone Verification)**
- [ ] [BLOCKER] SMS provider selected (Twilio, Plivo, etc.)
- [ ] [BLOCKER] SMS OTP flow implemented
- [ ] [BLOCKER] SMS delivery tested

**Email Provider (Transactional Emails)**
- [ ] [BLOCKER] Email provider selected (SendGrid, Mailgun, AWS SES)
- [ ] [BLOCKER] Email templates created (welcome, verification, booking confirmation, etc.)
- [ ] [BLOCKER] Email deliverability tested (SPF, DKIM, DMARC)
- [ ] [BLOCKER] Unsubscribe mechanism implemented

**Analytics (Optional but Recommended)**
- [ ] [RECOMMENDED] Google Analytics configured (with cookie consent)
- [ ] [RECOMMENDED] Event tracking configured (registrations, bookings, searches)

---

### 5.7 Performance

- [ ] [BLOCKER] Page load time optimized (< 3 seconds)
- [ ] [BLOCKER] Database queries optimized (indexes, query analysis)
- [ ] [BLOCKER] Image optimization (compression, lazy loading)
- [ ] [BLOCKER] Caching configured (application, database, CDN)
- [ ] [RECOMMENDED] Load testing performed (concurrent users, booking volume)

---

### 5.8 Deployment

- [ ] [BLOCKER] CI/CD pipeline configured (automated testing, deployment)
- [ ] [BLOCKER] Deployment process documented
- [ ] [BLOCKER] Rollback procedure defined
- [ ] [BLOCKER] Database migration strategy defined
- [ ] [BLOCKER] Zero-downtime deployment configured
- [ ] [RECOMMENDED] Staging deployment tested before production

---

## 6. Launch Readiness

### 6.1 Pre-Launch Testing

- [ ] [BLOCKER] End-to-end user flows tested (care receiver registration → booking)
- [ ] [BLOCKER] End-to-end user flows tested (caregiver registration → verification → booking acceptance → payout)
- [ ] [BLOCKER] Payment processing tested (real transactions in Stripe test mode)
- [ ] [BLOCKER] Refund processing tested
- [ ] [BLOCKER] Email notifications tested (delivery, content)
- [ ] [BLOCKER] SMS notifications tested
- [ ] [BLOCKER] Safeguarding incident reporting tested
- [ ] [BLOCKER] Admin dashboard tested (verification, incidents, disputes)
- [ ] [BLOCKER] Mobile responsiveness tested (iOS, Android browsers)
- [ ] [BLOCKER] Browser compatibility tested (Chrome, Safari, Firefox, Edge)
- [ ] [RECOMMENDED] Accessibility testing (WCAG 2.1 AA compliance)
- [ ] [RECOMMENDED] User acceptance testing (beta users, friends/family)

---

### 6.2 Launch Sequence

- [ ] [BLOCKER] Soft launch plan defined (limited geography, limited caregivers)
- [ ] [BLOCKER] Launch communication plan (press release, social media, email)
- [ ] [BLOCKER] Initial caregiver recruitment (pre-launch onboarding)
- [ ] [BLOCKER] Initial care receiver recruitment (waitlist or early access)
- [ ] [BLOCKER] Support team ready for launch day
- [ ] [BLOCKER] Monitoring dashboards ready for launch day
- [ ] [RECOMMENDED] Launch day runbook (hour-by-hour checklist)

---

### 6.3 Post-Launch Monitoring

- [ ] [BLOCKER] Daily monitoring plan (first 7 days)
- [ ] [BLOCKER] Weekly review meetings (first 4 weeks)
- [ ] [BLOCKER] User feedback collection mechanism
- [ ] [BLOCKER] Bug reporting process
- [ ] [BLOCKER] Incident response team on standby
- [ ] [RECOMMENDED] Daily metrics dashboard (registrations, bookings, revenue)

---

## 7. Open Questions & Decisions Pending

### 7.1 Pricing Model [PENDING FOUNDER DECISION]

**Status**: Founder has deferred pricing decisions to allow other work to proceed.

**Questions**:
- [ ] Who pays commission: Care receiver, caregiver, or split?
- [ ] Commission percentage: 10%, 15%, 20%, 25%?
- [ ] Minimum booking duration: 1 hour, 2 hours, 3 hours?
- [ ] Early adopter program: Free period, reduced commission, bonus incentives?

**Impact**: These decisions affect:
- Caregiver Terms of Service (commission disclosure)
- Pricing page content
- Stripe commission configuration
- Financial projections
- Marketing messaging

**Workaround**: Can proceed with placeholder values for development, but MUST be finalized before:
- Caregiver Terms of Service legal review
- Public pricing page publication
- First live transaction

**Recommended Timeline**: Finalize by Week 3 (before Terms of Service legal review)

---

### 7.2 Insurance Requirements [OPEN]

**Status**: GD-03 is open. Simplified requirements for Tier 1.

**Questions**:
- [ ] Public Liability minimum coverage amount: £1M, £2M, £5M?
- [ ] Is Professional Indemnity required at Tier 1 (companionship only)?
- [ ] How strict is verification: Certificate upload + admin review, or self-declaration?
- [ ] Platform group insurance scheme: Offer optional insurance to caregivers?

**Recommended Action**:
- Consult insurance broker for Tier 1 companionship-only requirements
- Define minimum requirements by Week 2
- Add to Caregiver Terms of Service

---

### 7.3 Mental Capacity Act Compliance [OPEN - Can Defer to Tier 3]

**Status**: GD-04 is open but can be simplified at Tier 1.

**Tier 1 Approach**:
- Care receiver registration requires care receiver consent (checkbox)
- Family proxy registration requires care receiver consent confirmation
- No LPA verification required at Tier 1 (companionship only, low risk)
- No cognitive impairment matching at Tier 1 (no health data)

**Deferred to Tier 3**: LPA verification, capacity assessments, best interests framework

**Action**: Document simplified Tier 1 approach in Terms of Service

---

### 7.4 Medication Assistance [DEFERRED TO TIER 2]

**Status**: GD-05 is deferred. NOT offered at Tier 1.

**Tier 1 Position**: Medication assistance NOT available. Personal care services (including medication prompting) deferred to Tier 2.

**Action**: Ensure booking flow does NOT offer medication assistance options.

---

### 7.5 Live-In Care [DEFERRED TO TIER 3]

**Status**: GD-06 is deferred. NOT offered at Tier 1.

**Tier 1 Position**: Live-in care NOT available. Hourly bookings only at Tier 1.

**Action**: Booking system limited to hourly bookings.

---

### 7.6 DBS Verification [VOLUNTARY AT TIER 1]

**Status**: DBS is voluntary at Tier 1 (companionship is not a regulated activity).

**Tier 1 Approach**:
- Caregivers can upload existing DBS certificates for verification
- Admin reviews and awards "DBS Verified" badge
- Care receivers can filter by "DBS Verified" status
- NOT mandatory for Tier 1 launch

**Deferred to Tier 2**: Mandatory DBS checks via umbrella body integration

**Action**: Build voluntary DBS upload and badge display

---

## 8. Success Metrics (Tier 1)

**Metrics to track from launch**:

### 8.1 User Acquisition
- [ ] Care receiver registrations per week
- [ ] Caregiver registrations per week
- [ ] Verification completion rate (caregivers)
- [ ] Profile completion rate (caregivers)

### 8.2 Engagement
- [ ] Searches per care receiver
- [ ] Messages sent (care receiver ↔ caregiver)
- [ ] Booking requests per care receiver
- [ ] Booking acceptance rate (caregivers)

### 8.3 Transactions
- [ ] Completed bookings per week
- [ ] Average booking value (GBP)
- [ ] Repeat booking rate
- [ ] Cancellation rate

### 8.4 Quality
- [ ] Average caregiver rating
- [ ] Reviews submitted per booking
- [ ] Safeguarding incidents reported
- [ ] Disputes escalated

### 8.5 Tier 1 → Tier 2 Progression Gates

**To progress to Tier 2 (Personal Care Services), must achieve**:
- [ ] 500+ monthly active care receivers
- [ ] 100+ completed bookings per month
- [ ] 50+ verified caregivers
- [ ] 5,000+ GBP monthly revenue
- [ ] Net Promoter Score 30+
- [ ] 3+ months operating time
- [ ] Zero serious safeguarding incidents
- [ ] 20%+ of inquiries requesting personal care services (validates demand)

---

## 9. Document Control

**Version History**:

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-02-01 | Product Director | Initial Tier 1 launch checklist created |

**Review Schedule**:
- Weekly review during pre-launch phase
- Update as decisions are finalized
- Final review 1 week before launch

**Owner**: Product Director & Founder

---

**END OF CHECKLIST**
