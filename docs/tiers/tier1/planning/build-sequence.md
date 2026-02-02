# Tier 1 Build Sequence: Companionship-Only Launch

**Document Purpose**: Define the development sequence for Tier 1 market entry (companionship services only).

**Document Owner**: Product & Engineering Teams
**Created**: 2026-02-01
**Status**: ACTIVE

---

## Tier 1 Scope Overview

**Market Entry Strategy**: Launch with companionship services only to minimize compliance investment before product-market fit validation (FDR-003).

**Services Enabled**:
- Companionship (conversation, activities)
- Light housework and cleaning
- Shopping and errands
- Meal preparation (NO feeding assistance)
- Transportation (if caregiver has vehicle)

**Services NOT Available at Tier 1**:
- Personal care (washing, dressing, toileting) - deferred to Tier 2
- Mobility assistance - deferred to Tier 2
- Medication assistance - deferred to Tier 2
- Overnight care - deferred to Tier 2
- Live-in care - deferred to Tier 3
- Condition-specific matching - deferred to Tier 3

**Data Scope**: Standard personal data only (NO health data, NO special category data)

**Verification Scope**: ID, right to work, phone/email verification. DBS is VOLUNTARY (not required for companionship).

---

## Build Sequence Priority

### Phase 1: Foundation (Weeks 1-2)

**Goal**: Core infrastructure and authentication

#### 1.1 Technical Infrastructure [T1]
- Database schema (PostgreSQL/MySQL)
- Authentication system (JWT or session-based)
- API architecture (RESTful or GraphQL)
- Hosting environment (AWS, Azure, or similar)
- CI/CD pipeline
- Development, staging, production environments

#### 1.2 User Management & Authentication [T1]
**Priority**: CRITICAL
- Care receiver registration (email + password)
- Caregiver registration (email + password)
- Email verification (double opt-in)
- Phone verification (SMS OTP)
- Password management (reset, change, strength requirements)
- Session management (secure cookies, expiry)
- Role-based access control (Care Receiver, Caregiver, Admin)

**Excluded from Tier 1**:
- Multi-factor authentication (nice-to-have, defer to post-launch)

**Acceptance Criteria**:
- User can register as care receiver or caregiver
- User receives email verification link
- User verifies phone via SMS OTP
- User can log in and access role-appropriate features
- Session expires after inactivity

---

### Phase 2: Caregiver Profiles (Weeks 2-3)

**Goal**: Caregiver supply-side profile creation

#### 2.1 Caregiver Profile Creation [T1]
**Priority**: CRITICAL
- Professional profile wizard (name, photo, bio, experience)
- Service type selection (companionship only at Tier 1)
- Hourly rate setting (within platform guidance, e.g., 12-25 GBP/hour)
- Service radius configuration (5, 10, 15, 20, 30 miles)
- Availability calendar (mark available time slots)
- Bank account setup (Stripe Connect for payouts)

**Data Collected**:
- Name, email, phone, postcode
- Professional bio (500 char limit)
- Profile photo (uploaded, admin-reviewed)
- Service types offered (companionship only at T1)
- Hourly rate (caregiver-set)
- Service radius (distance in miles)
- Availability (recurring weekly schedule)

**Data NOT Collected at Tier 1**:
- Medical condition experience (deferred to Tier 3)
- Care skills (washing, dressing, toileting - deferred to Tier 2)
- Qualifications (NVQ, Care Certificate - deferred to Tier 2)
- Employment history (deferred to Tier 2)

**Acceptance Criteria**:
- Caregiver completes profile wizard
- Profile displays on search (after admin approval)
- Caregiver can edit profile and rate
- Profile includes "companionship services only" badge

---

### Phase 3: Verification System (Weeks 3-4)

**Goal**: Basic caregiver verification for safeguarding

#### 3.1 Identity Verification [T1]
**Priority**: CRITICAL
- Government ID verification (Stripe Identity or equivalent)
- ID document upload (passport, driving license)
- Automated ID check (name, DOB, photo match)
- Admin review queue for ID verification
- Verification status tracking

#### 3.2 Right to Work Verification [T1]
**Priority**: CRITICAL
- UK Visas and Immigration share code entry
- Document upload (right to work documents)
- Admin verification workflow
- Expiry tracking for time-limited work permissions

#### 3.3 Voluntary DBS Verification [T1]
**Priority**: MEDIUM (trust signal, not mandatory at T1)
- DBS certificate upload (PDF)
- DBS certificate number capture
- Issue date and expiry capture
- Admin verification (check certificate is valid)
- "DBS Verified" badge display on profile (if verified)

**Rationale**: DBS is NOT mandatory at Tier 1 (companionship is not a regulated activity), but voluntary submission provides trust signal for care receivers.

#### 3.4 Admin Approval Workflow [T1]
**Priority**: CRITICAL
- Admin dashboard for pending verifications
- Approve/reject workflow
- Rejection reason capture
- Email notification to caregiver on approval/rejection
- Profile goes live only after admin approval

**Acceptance Criteria**:
- Caregiver uploads ID document
- Admin reviews and approves ID
- Caregiver submits right to work verification
- Admin approves right to work
- Caregiver profile status changes to "Verified" after all checks
- Profile visible to care receivers only after verification

---

### Phase 4: Care Receiver Profile (Week 4)

**Goal**: Care receiver demand-side profile creation

#### 4.1 Care Receiver Registration [T1]
**Priority**: CRITICAL
- Name, email, phone, postcode
- Age verification (65+ or documented care needs)
- Emergency contact capture (name, relationship, phone)
- GDPR consent management (checkboxes for privacy policy, terms)

**Data Collected**:
- Name, email, phone, postcode
- Age (for 65+ verification)
- Emergency contact details

**Data NOT Collected at Tier 1**:
- Medical conditions (deferred to Tier 3)
- Care needs assessment (deferred to Tier 3)
- Risk assessment (deferred to Tier 3)

#### 4.2 Family Member Registration [T1]
**Priority**: HIGH
- Family member registration on behalf of care receiver
- Relationship to care receiver
- Care receiver consent confirmation (checkbox)
- Proxy user permissions (view, book, message on behalf)

**Acceptance Criteria**:
- Care receiver creates account
- Care receiver adds emergency contact
- Family member can register on behalf of care receiver
- Family member has delegated access to care receiver account

---

### Phase 5: Discovery & Search (Weeks 5-6)

**Goal**: Core economic loop - caregiver discovery

#### 5.1 Location-Based Search [T1]
**Priority**: CRITICAL
- Postcode search input
- Radius selection (5, 10, 15, 20, 30 miles)
- Caregiver results list (sorted by distance)
- Caregiver cards (photo, name, bio, rate, distance, rating)
- Map view (optional - can defer to post-launch)

#### 5.2 Basic Filtering [T1]
**Priority**: HIGH
- Filter by service type (companionship only at T1)
- Filter by hourly rate range (slider)
- Filter by availability (day of week, time of day)
- Filter by gender (if requested by care receiver)
- Filter by DBS status (DBS verified badge)
- Sort by: distance, price (low-high, high-low), rating

**Filters NOT Available at Tier 1**:
- Medical condition experience (deferred to Tier 3)
- Care skills (deferred to Tier 2)
- Qualifications (deferred to Tier 2)

#### 5.3 Caregiver Profile View [T1]
**Priority**: CRITICAL
- Full caregiver profile page
- Photo, bio, experience description
- Service types offered (companionship only)
- Hourly rate
- Availability calendar
- Reviews and ratings
- "DBS Verified" badge (if applicable)
- "Request Booking" button

**Acceptance Criteria**:
- Care receiver searches by postcode and radius
- Results display caregivers within radius
- Care receiver filters by rate, availability, gender, DBS status
- Care receiver views caregiver profile
- Profile clearly shows "companionship services only"

---

### Phase 6: Booking System (Weeks 6-7)

**Goal**: Core economic loop - booking request and acceptance

#### 6.1 Booking Request Creation [T1]
**Priority**: CRITICAL
- Select caregiver from search or profile
- Choose booking type (hourly, daily, multi-day)
- Select date from caregiver availability calendar
- Select start time and duration (minimum 2 hours)
- Real-time price calculation (duration × rate + platform fee, e.g., 15%)
- Add special requests/notes (500 char limit)
- Add emergency contact details (auto-filled from profile)
- Payment authorization (card hold, NOT charged until acceptance)
- Cancellation policy displayed and accepted
- Send booking request to caregiver

**Data Collected**:
- Booking date, time, duration
- Special requests (text)
- Emergency contact (auto-populated)
- Location (care receiver postcode)

**Data NOT Collected at Tier 1**:
- Medical conditions (deferred to Tier 3)
- Care skills required (deferred to Tier 2)
- Risk assessment (deferred to Tier 3)
- Care plan attachment (deferred to Tier 3)

#### 6.2 Booking Request Review (Caregiver) [T1]
**Priority**: CRITICAL
- Email notification of new booking request
- In-app notification of new booking request
- View booking details:
  - Care receiver name (no last name until acceptance)
  - Date, time, duration
  - Location and distance
  - Special requests
  - Earnings breakdown (rate × duration - platform commission)
- 24-hour response window with countdown timer
- Accept or decline options
- Decline reasons (dropdown: scheduling conflict, too far, rate too low, other)
- Optional message to care receiver on decline

#### 6.3 Booking Acceptance & Payment Capture [T1]
**Priority**: CRITICAL
- Caregiver accepts booking
- Care receiver's card charged immediately
- Funds held in escrow by platform (Stripe Connect)
- Calendar automatically blocks time slot for caregiver
- Both parties notified via email and in-app
- Care receiver receives caregiver contact details (phone, full name)
- Caregiver receives care receiver address and emergency contact

#### 6.4 Booking Lifecycle Management [T1]
**Priority**: CRITICAL
- Booking statuses:
  - Requested (awaiting caregiver response)
  - Accepted (confirmed, payment captured)
  - In Progress (start time reached)
  - Completed (end time passed, caregiver marks complete)
  - Cancelled (either party cancelled before start)
  - Disputed (payment or service dispute)
- Booking completion workflow:
  - Caregiver marks booking complete
  - Care receiver receives completion notification
  - Funds released from escrow to caregiver within 2 business days
  - Review prompt sent to care receiver

#### 6.5 Booking Cancellation [T1]
**Priority**: HIGH
- Cancellation policy:
  - Cancel > 24 hours before: Full refund
  - Cancel < 24 hours before: 50% refund (or platform policy TBD)
  - No-show: No refund
- Cancellation workflow:
  - Either party can request cancellation
  - Cancellation reason capture
  - Refund processed automatically (if applicable)
  - Both parties notified

**Acceptance Criteria**:
- Care receiver creates booking request
- Caregiver receives notification
- Caregiver reviews and accepts booking
- Payment captured and held in escrow
- Both parties receive contact details
- Caregiver marks booking complete
- Funds released to caregiver
- Cancellation before 24 hours triggers full refund

---

### Phase 7: Messaging (Week 7)

**Goal**: Pre-booking and post-booking communication

#### 7.1 In-App Messaging [T1]
**Priority**: CRITICAL
- Threaded messaging between care receiver and caregiver
- Message list (all conversations)
- Message thread view
- Send text message (500 char limit)
- Real-time message delivery (WebSocket or polling)
- Email notification of new message (configurable)
- Unread message count

#### 7.2 Content Filtering & Moderation [T1]
**Priority**: CRITICAL (safeguarding requirement)
- Block phone numbers and email addresses in messages (prevent off-platform contact before booking)
- Profanity filter
- Keyword monitoring for safeguarding concerns:
  - "Pay me directly", "off platform", "cash payment"
  - Emergency keywords: "fallen", "bleeding", "unconscious"
  - Abuse keywords: "hurt", "threatened", "scared"
- Flagged messages alert admin immediately
- Messages cannot be deleted (audit trail)

#### 7.3 Message Reporting [T1]
**Priority**: HIGH
- "Report Conversation" button
- Report reasons: inappropriate language, off-platform payment request, harassment, safety concern, other
- Admin notification of reported message
- Admin review queue (24-hour SLA, immediate for safety concerns)

**Acceptance Criteria**:
- Care receiver and caregiver can message after booking request sent
- Messages delivered in real time
- Phone numbers and emails redacted automatically
- Safeguarding keywords flag admin
- User can report conversation
- Admin reviews flagged/reported messages

---

### Phase 8: Payment System (Weeks 8-9)

**Goal**: Secure payment processing and escrow

#### 8.1 Payment Setup (Care Receiver) [T1]
**Priority**: CRITICAL
- Credit/debit card via Stripe Payment Intents
- 3D Secure (SCA) authentication
- Save card for future bookings (PCI-compliant tokenization)
- Multiple cards supported (select at checkout)
- Default payment method selection

#### 8.2 Payment Authorization & Capture [T1]
**Priority**: CRITICAL
- Payment authorization on booking request (card hold)
- Payment capture on booking acceptance
- Funds held in escrow (Stripe Connect)
- Platform fee calculation (e.g., 15% of transaction)
- Funds released to caregiver after booking completion

#### 8.3 Caregiver Payout Setup [T1]
**Priority**: CRITICAL
- Stripe Connect onboarding (Express or Custom account)
- Bank account details (UK bank account)
- Verification (Stripe handles bank verification)
- Payout schedule (e.g., 2 business days after booking completion)

#### 8.4 Refund Processing [T1]
**Priority**: HIGH
- Automatic refunds for cancellations (per cancellation policy)
- Manual refunds for disputes (admin-initiated)
- Partial refunds supported
- Refund notification to care receiver

#### 8.5 Financial Reporting [T1]
**Priority**: MEDIUM
- Care receiver: Transaction history (bookings, payments, refunds)
- Caregiver: Earnings dashboard (total earnings, pending payouts, completed payouts)
- Admin: Financial reports (platform revenue, payout volume)

**Acceptance Criteria**:
- Care receiver adds payment card
- Payment authorized on booking request
- Payment captured on booking acceptance
- Funds held in escrow
- Caregiver receives payout 2 days after booking completion
- Cancellation triggers automatic refund
- Care receiver views transaction history
- Caregiver views earnings dashboard

---

### Phase 9: Reviews & Ratings (Week 9)

**Goal**: Trust and quality signals

#### 9.1 Post-Booking Reviews [T1]
**Priority**: CRITICAL
- Review prompt sent to care receiver 24 hours after booking completion
- Star rating (1-5 stars)
- Written review (500 char limit, optional)
- Review categories (punctuality, communication, quality, professionalism)
- Review submission

#### 9.2 Caregiver Ratings & Reputation [T1]
**Priority**: CRITICAL
- Overall rating (average of all reviews)
- Number of reviews
- Rating breakdown by category
- Recent reviews displayed on profile (most recent 10)

#### 9.3 Review Moderation [T1]
**Priority**: HIGH
- Admin review of submitted reviews (before publishing)
- Reject reviews: profanity, personal attacks, off-topic
- Approve reviews within 24 hours
- Notification to reviewer on approval/rejection

#### 9.4 Caregiver Response to Reviews [T1]
**Priority**: MEDIUM (can defer to post-launch)
- Caregiver can respond to reviews (500 char limit)
- Response displayed below review

**Acceptance Criteria**:
- Care receiver receives review prompt after booking
- Care receiver submits star rating and written review
- Admin reviews and approves review
- Review displays on caregiver profile
- Caregiver overall rating updates
- Caregiver can respond to review

---

### Phase 10: Safeguarding & Admin Operations (Weeks 9-10)

**Goal**: Safeguarding compliance and platform oversight

#### 10.1 Safeguarding Reporting System [T1]
**Priority**: CRITICAL
- "Report Concern" button on caregiver profile, booking, and message thread
- Safeguarding concern categories:
  - Suspected abuse or neglect
  - Financial exploitation
  - Safety concern
  - Unprofessional conduct
  - Other
- Details field (1000 char limit)
- Attach evidence (screenshots, photos - optional)
- Submit to admin

#### 10.2 Admin Safeguarding Dashboard [T1]
**Priority**: CRITICAL
- Safeguarding incidents queue
- Incident severity classification (low, medium, high, critical)
- Admin investigation workflow:
  - Review incident details
  - Contact reporter for more information
  - Contact involved parties (care receiver, caregiver)
  - Suspend user account (if necessary)
  - Escalate to Safeguarding Adults Board (if required)
  - Document outcome
- Incident status tracking (reported, investigating, escalated, resolved)
- Audit trail of all actions

#### 10.3 User Suspension & Ban System [T1]
**Priority**: CRITICAL
- Admin can suspend user account (temporary)
- Admin can ban user account (permanent)
- Suspension reasons: under investigation, policy violation, safety concern
- User notification of suspension/ban
- Suspended users cannot create bookings or send messages
- Banned users cannot log in

#### 10.4 Admin Operations Dashboard [T1]
**Priority**: HIGH
- User management (view all users, search, filter)
- Caregiver verification queue
- Booking oversight (view all bookings, filter by status)
- Payment oversight (view transactions, refunds, disputes)
- Review moderation queue
- Safeguarding incidents queue
- Audit logs (user actions, admin actions)

**Acceptance Criteria**:
- User can report safeguarding concern
- Admin receives notification of concern
- Admin investigates and takes action
- Admin can suspend or ban user
- Admin dashboard displays verification queue, bookings, reviews, incidents

---

### Phase 11: Compliance & Legal (Weeks 10-11)

**Goal**: Legal and regulatory compliance for launch

#### 11.1 Privacy Policy [T1]
**Priority**: CRITICAL (legal requirement)
- Draft privacy policy (GDPR-compliant)
- Legal counsel review
- Publish on website
- User consent during registration (checkbox)

#### 11.2 Terms of Service [T1]
**Priority**: CRITICAL (legal requirement)
- Care receiver terms (service description, liability, cancellation, refunds)
- Caregiver terms (self-employed status, commission, verification requirements, conduct)
- Legal counsel review
- Publish on website
- User acceptance during registration (checkbox)

#### 11.3 Cookie Consent [T1]
**Priority**: CRITICAL (PECR requirement)
- Cookie consent banner (first visit)
- Cookie categories (essential, analytics, marketing)
- User consent management
- Cookie policy page

#### 11.4 Safeguarding Policy [T1]
**Priority**: CRITICAL (Care Act 2014 requirement)
- Safeguarding policy document (companionship scope)
- Care Act 2014 alignment
- Reporting procedures
- Publish on website

#### 11.5 DPIA Completion [T1]
**Priority**: CRITICAL (GDPR requirement)
- Engage DPO or data protection consultant
- Complete Tier 1 DPIA (simplified, standard personal data only)
- Confirm no ICO prior consultation required
- Document DPIA and store securely

#### 11.6 ICO Registration [T1]
**Priority**: CRITICAL (legal requirement)
- Register as data controller with ICO
- Pay registration fee (40-60 GBP)
- Obtain ICO registration number

**Acceptance Criteria**:
- Privacy policy published and accepted during registration
- Terms of service published and accepted during registration
- Cookie consent banner displays on first visit
- Safeguarding policy published
- Tier 1 DPIA completed and signed off
- ICO registration obtained

---

### Phase 12: Launch Readiness (Week 11-12)

**Goal**: Pre-launch testing, polish, and preparation

#### 12.1 Quality Assurance Testing
- Functional testing (all user flows)
- Cross-browser testing (Chrome, Safari, Firefox, Edge)
- Mobile responsiveness testing
- Payment flow testing (test mode)
- Security testing (penetration testing recommended)
- Performance testing (load testing recommended)

#### 12.2 User Acceptance Testing (UAT)
- Recruit 5-10 test users (care receivers and caregivers)
- Run end-to-end scenarios
- Collect feedback
- Fix critical bugs

#### 12.3 Content & Copywriting
- Website copy (homepage, about, how it works, safety, pricing)
- Email templates (verification, booking confirmation, review prompts, etc.)
- In-app messaging (notifications, alerts, errors)
- FAQ page

#### 12.4 Launch Checklist
- [ ] All Tier 1 features implemented and tested
- [ ] Privacy policy and terms of service published
- [ ] DPIA completed and signed off
- [ ] ICO registration obtained
- [ ] Cookie consent mechanism implemented
- [ ] Safeguarding policy published
- [ ] Payment system tested (Stripe test mode and live mode)
- [ ] Admin dashboard functional
- [ ] UAT completed with real users
- [ ] Critical bugs fixed
- [ ] Monitoring and alerting set up (error tracking, uptime monitoring)
- [ ] Customer support plan in place (email, in-app help)

---

## Tier 1 Success Metrics (Launch to Tier 2 Gate)

**Goal**: Validate product-market fit before investing in Tier 2 compliance (personal care services).

| Metric | Target | Measurement Period |
|--------|--------|-------------------|
| **Monthly Active Users (Care Receivers)** | 500+ | Month 6 |
| **Completed Bookings** | 100+ per month | Month 6 |
| **Verified Caregivers** | 50+ | Month 6 |
| **Monthly Revenue** | 5,000+ GBP | Month 6 |
| **Net Promoter Score (NPS)** | 30+ | Month 6 |
| **Safeguarding Incidents** | Zero serious incidents | Months 1-6 |
| **Request Rate for Personal Care** | 20%+ of inquiries | Month 6 (validates Tier 2 demand) |

**Tier 2 Progression Gate**: If success metrics achieved at month 6, proceed with Tier 2 investment (personal care services, mandatory DBS, skill-based matching).

**See**: [Tiered Market Entry Roadmap](/docs/ROADMAP.md) for complete tier progression gates.

---

## Features Explicitly Deferred to Later Tiers

### Deferred to Tier 2 (Personal Care)
- Personal care services (washing, dressing, toileting)
- Care skills profile (caregiver)
- Care skills requirements (care receiver)
- Mandatory DBS verification (becomes required at Tier 2)
- Qualification verification (NVQ, Care Certificate)
- Insurance verification (Public Liability, Professional Indemnity)
- Reference checks
- Overnight care
- Medication prompting

### Deferred to Tier 3 (Condition-Specific Matching)
- Medical condition experience profile (caregiver)
- Medical condition profile (care receiver)
- Condition-specific matching algorithm
- Risk assessment & care plan upload
- Care complexity scoring
- Live-in care bookings
- Dementia-specific features
- End-of-life care features
- Clinical safety monitoring

### Deferred to Tier 4 (Care Coordination)
- Care plan management
- Multi-caregiver team coordination
- Care notes and handover system
- NHS/LA integration
- B2B features

### Deferred to Post-Launch (Optimizations)
- Multi-factor authentication (2FA) for non-admin users
- Intelligent matching algorithm (AI/ML)
- Saved searches and alerts
- Caregiver recommendations
- Recurring booking management (can manually rebook at launch)
- Live-in care specialized features
- Mobile app (can launch with responsive web)
- Advanced analytics and reporting

---

## Development Team Allocation (Suggested)

**Team Size**: 3-5 developers + 1 PM + 1 designer

| Role | Responsibilities |
|------|-----------------|
| **Full-Stack Developer 1** | User management, authentication, profiles |
| **Full-Stack Developer 2** | Discovery, search, booking system |
| **Full-Stack Developer 3** | Messaging, payments (Stripe integration), reviews |
| **Frontend Developer** | UI/UX implementation, responsiveness, accessibility |
| **Backend Developer** | API, database, infrastructure, security |
| **Product Manager** | Requirements, prioritization, UAT, launch coordination |
| **Designer** | UI/UX design, branding, website copy |
| **DPO/Consultant** | DPIA, privacy policy, legal review |

**Timeline**: 10-12 weeks (aggressive but achievable for experienced team)

---

## Technical Stack Recommendations (Platform Agnostic)

**Frontend**:
- React, Vue, or Angular (modern JavaScript framework)
- Responsive design (mobile-first)
- Accessibility (WCAG 2.1 AA compliance recommended)

**Backend**:
- Node.js, Python (Django/Flask), or Ruby on Rails
- PostgreSQL or MySQL database
- RESTful API or GraphQL

**Infrastructure**:
- AWS, Azure, or Google Cloud
- HTTPS throughout (SSL certificate)
- CDN for static assets
- Email service (SendGrid, AWS SES, Mailgun)
- SMS service (Twilio, AWS SNS)

**Third-Party Services**:
- Stripe (payment processing, identity verification, payouts)
- Mapbox or Google Maps (location search, distance calculation)
- Sentry or Rollbar (error tracking)
- Google Analytics or Mixpanel (user analytics)

---

## Risk Mitigation

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| **Tier 1 scope creep (adding personal care features)** | High | High | Strict adherence to Tier 1 scope; defer all personal care features to Tier 2 |
| **Low demand for companionship-only services** | Medium | High | Track "request rate for personal care" metric; if high, fast-track Tier 2 |
| **Regulatory challenge (CQC claims platform requires registration)** | Low | High | Legal opinion obtained confirming Introduction Agency status; document Tier 1 service limitations |
| **Payment fraud or disputes** | Medium | Medium | Stripe fraud detection; clear cancellation policy; admin dispute resolution |
| **Safeguarding incident at launch** | Low | Critical | Robust reporting mechanism; admin monitoring; Care Act 2014 compliance |
| **DPIA delays launch** | Medium | High | Engage DPO early (Week 1); Tier 1 DPIA is simplified (1-2 weeks) |
| **Caregiver supply shortage** | Medium | High | Pre-launch caregiver recruitment campaign; waitlist from Phase 0 |
| **Care receiver reluctance to use platform (trust issue)** | Medium | Medium | DBS Verified badge (voluntary); robust verification; transparent safeguarding policy |

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-02-01 | Product Director | Initial Tier 1 build sequence (FDR-003) |

---

**END OF DOCUMENT**
