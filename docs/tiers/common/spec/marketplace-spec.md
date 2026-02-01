# UK Elderly Care Marketplace — Product Spec

## Product Summary

A UK-only two-sided marketplace connecting elderly individuals (or their families) with independent professional caregivers offering companionship, personal care, and support for individuals with medical conditions. The platform enables discovery, booking, messaging, and on-platform payments, with strong emphasis on clinical safety, regulatory compliance, safeguarding, and trust.

The platform supports both short-term and long-term care, including live-in care, for vulnerable adults with physical, cognitive, or neurological conditions.

---

## Product Phases

This product is delivered in distinct phases. Each phase has different scope, compliance requirements, and success criteria.

### Phase 0: Pre-Launch Website

A marketing and lead capture website that:

- Validates market demand before building the full marketplace
- Captures qualified leads from care receivers/families AND caregivers
- Communicates the platform value proposition and safety commitments
- Collects minimal data: contact info, care need categories, caregiver qualifications
- Does NOT process bookings, payments, or health data
- Does NOT display caregiver profiles or enable matching
- Does NOT require CQC registration (no regulated activity)

**Pre-Launch is NOT the MVP.** It is a validation and lead generation phase that precedes MVP development.

**Compliance scope (Pre-Launch only):**
- GDPR consent for email collection
- PECR cookie consent
- Basic Terms of Use and Privacy Policy
- No special category health data processing

**See:** [Tiered Website Roadmap](../website/roadmap.md)

### Phase 1: MVP Marketplace

The full operational marketplace as defined in this document. MVP launch requires:

- All Fixed Scope / Core Assumptions implemented
- All Trust, Safety & Regulation requirements in place
- Core Economic Loop operational: Discovery → Booking → Payment → Care → Review
- Full compliance posture: GDPR, Care Act, CQC alignment, DBS verification

**MVP cannot launch until:**
1. Pre-Launch validation complete
2. All gating decisions resolved (see `docs/governance/gating-decisions.md`)
3. DPIA completed and approved
4. Legal policies finalized (Terms of Service, Privacy Policy, Safeguarding Policy)

### Phase 2+: Post-MVP

Features classified as Post-MVP in `docs/tiers/common/planning/mvp-classification.md`. These include:
- Advanced analytics and optimization
- Marketing/growth features
- Enhanced convenience features
- Performance optimization
- Live-in care specialized enhancements

---

## Tiered Compliance and Feature Delivery

**Strategic Decision**: The platform will enter the market via a tiered approach, progressively expanding features and compliance scope as the business validates product-market fit and achieves financial viability (FDR-003, 2026-02-01).

### Tier Overview

The platform operates across four compliance and feature tiers:

| Tier | Name | Services Enabled | Data Scope | Timeline |
|------|------|-----------------|------------|----------|
| **Tier 1** | Minimal (Launch) | Companionship only | Standard personal data | Months 1-6 |
| **Tier 2** | Standard | Personal care | Skill-based matching | Months 6-12 |
| **Tier 3** | Enhanced | Live-in, condition-specific | Health-inferring with consent | Months 12-18 |
| **Tier 4** | Comprehensive | Care coordination | Full health data | Months 18+ |

### Tier Philosophy

**Key Principle**: Each tier represents the **minimum legally viable** compliance posture for the features enabled at that tier. The platform does not over-invest in compliance before business validation, but never under-complies with mandatory requirements.

**Progression Gates**: Movement from one tier to the next is triggered by achieving specific success metrics (users, revenue, safety performance) and completing incremental compliance requirements.

**Full Documentation**: See [Tiered Market Entry Roadmap](../../../ROADMAP.md) for complete tier definitions, compliance requirements, success metrics, and cost projections.

### Tier 1: Launch Scope (Companionship Only)

**Tier 1 represents the initial market entry**. This tier enables:

**Services**:
- Companionship
- Light housework
- Shopping and errands
- Meal preparation (no feeding assistance)

**Data Collection** (Standard personal data only):
- Name, email, phone, postcode
- Generic service preferences
- Payment information (via Stripe)
- NO medical conditions
- NO health-inferring data
- NO care skills data

**Verification Requirements**:
- Government ID verification (mandatory)
- Right to work verification (mandatory)
- Phone and email verification (mandatory)
- DBS check (voluntary - caregivers may upload existing certificates for "DBS Verified" badge)
- Manual admin approval (mandatory)

**Regulatory Compliance**:
- Simplified DPIA (standard personal data only)
- GDPR (no Article 9 special category data)
- PECR (cookie consent)
- Basic safeguarding policy (companionship scope)
- Introduction Agency model confirmed

**What Tier 1 Does NOT Include**:
- Personal care services (washing, dressing, toileting)
- Skill-based matching
- Medical condition profiles
- Mandatory DBS verification
- Qualification verification
- Live-in care
- Clinical safety monitoring

### Tier 2+: Progressive Expansion

**Tier 2** (Personal Care): Adds personal care services, mandatory DBS verification, skill-based matching, qualification verification, and insurance requirements.

**Tier 3** (Condition-Specific): Adds medical condition matching with explicit consent, live-in care, risk assessment, and clinical safety monitoring.

**Tier 4** (Care Coordination): Adds care plan management, multi-caregiver coordination, and potential NHS/LA integration.

See [Tiered Market Entry Roadmap](../../../ROADMAP.md) for complete tier specifications.

---

## Fixed Scope / Core Assumptions (Product Constitution)

These are **non-negotiable axioms**.

- **Region**: UK only
- **Category**: elderly personal care + companionship + health-adjacent support
- **Care receivers may have medical conditions** (e.g. Parkinson's, dementia, stroke, MS, mobility impairment)
- **Services may include personal care and live-in care**
- **Supply**: independent individual caregivers (self-employed professionals, NOT employees)
- **Payments**: on-platform only
- **Platform Model**: Introduction Agency connecting self-employed professionals (FDR-001, FDR-002)
- **CQC Registration**: NOT required - platform is NOT a regulated care service provider (FDR-002, 2026-02-01)
- **Regulatory Framework**: Care Act 2014 safeguarding duties (NOT CQC requirements)
- **Market Entry**: Tier 1 (Minimal) compliance, progressing through tiers as business validates (FDR-003, 2026-02-01)
- **GDPR + UK data protection required**
- **Safeguarding vulnerable adults is the primary product constraint**
- **Clinical safety > growth > UX convenience**  

---

## User Roles

### Care Receiver / Family Booker
- Can search caregivers
- Can filter by medical conditions and care skills
- Can request bookings (hourly, daily, live-in)
- Can message after match
- Can pay for care
- Can leave reviews
- Can report safeguarding concerns

### Caregiver (Professional)
- **Is a self-employed independent professional** (NOT an employee or worker)
- Can create public professional profile
- Can define care services offered
- Can list medical condition experience
- Can list care skills and certifications
- **Sets own hourly rate** (within platform guidance)
- **Controls own availability and schedule**
- **Can accept/decline any booking request** (no obligation to accept)
- **Can arrange qualified substitutes**
- Can message matched users
- Can receive payouts (self-employed earnings, NOT wages)
- Can receive reviews
- Must complete mandatory verification (DBS, identity, qualifications, insurance)

### Admin (Safeguarding & Operations)
- User moderation
- Caregiver verification and approval
- Booking oversight
- Payment oversight
- Dispute handling
- Safeguarding incident management
- Regulatory compliance monitoring

---

## Care Services Supported

Caregivers may offer one or more of the following services, **subject to tier availability**:

### Service Types (by Tier)

**Tier 1 Services** (Launch - Companionship Only):
- Companionship [T1]
- Light housework [T1]
- Shopping and errands [T1]
- Meal preparation (no feeding assistance) [T1]

**Tier 2+ Services** (Personal Care):
- Personal care (washing, dressing, toileting) [T2]
- Mobility assistance [T2]
- Feeding assistance [T2]
- Medication assistance (non-clinical prompting) [T2]
- Overnight care [T2]

**Tier 3+ Services** (Complex Care):
- Live-in care [T3]
- Dementia-specific support [T3]
- End-of-life companionship (non-clinical) [T3]

**Note**: At launch (Tier 1), the platform operates with companionship services only. Personal care and complex care services are added in subsequent tiers as compliance requirements are met. See "Tiered Compliance and Feature Delivery" section above.  

---

## Caregiver Capability Model (Core to Product)

Every caregiver profile must define:

### 1. Medical Condition Experience
Examples:
- Parkinson’s  
- Dementia / Alzheimer’s  
- Stroke recovery  
- MS  
- Arthritis  
- Diabetes  
- Visual impairment  
- Hearing impairment  

### 2. Care Skills
Examples:
- Personal hygiene support  
- Mobility and transfers  
- Hoisting  
- Feeding assistance  
- Medication prompting  
- Catheter care  
- Incontinence care  
- Behavioural support  

### 3. Qualifications & Training
Examples:
- Care Certificate  
- NVQ Level 2/3 Health & Social Care  
- Nursing background  
- Dementia training  
- First aid  
- Safeguarding adults training  

### 4. Experience
- Years of experience per category  
- Previous roles (care home, private care, hospital)  

All of the above must be:
- Public on caregiver profiles  
- Searchable and filterable  
- Subject to verification  

---

## Discovery & Search (Foundational Capability)

Care receivers must be able to search caregivers by:

- Postcode + radius  
- Service type (e.g. live-in)  
- Medical condition experience  
- Care skills  
- Qualifications  
- Availability  
- Price  

This is no longer a “nice to have”.  
This is **core safety infrastructure**.

---

## Trust, Safety & Regulation (First-Class Product Features)

These are **MVP requirements**, not Phase 2. However, verification requirements are tiered based on service scope.

### Verification Requirements (by Tier)

**Tier 1 (Launch - Mandatory)**:
- Government ID verification [T1]
- Right to work verification [T1]
- Phone and email verification [T1]
- Manual admin approval [T1]
- DBS background check [T1 - VOLUNTARY ONLY]

**Note on Tier 1 DBS**: At Tier 1 (companionship only), DBS checks are NOT legally required as companionship is not a "regulated activity" under the Safeguarding Vulnerable Groups Act 2006. Caregivers may voluntarily upload existing DBS certificates for verification and display of "DBS Verified" badge. This provides trust signal without mandatory compliance cost.

**Tier 2+ (Mandatory Additions)**:
- DBS background check [T2 - NOW MANDATORY for personal care]
- Professional liability insurance verification [T2]
- Qualification uploads and verification [T2]

**Tier 3+ (Mandatory Additions)**:
- Condition-specific training verification [T3]
- Enhanced reference checks [T3]

### Platform must support (All Tiers):
- Safeguarding incident reporting (Care Act 2014 duties) [T1]
- Audit trails for all actions [T1]
- Emergency escalation workflows [T1]
- Behaviour monitoring [T1]
- Re-verification cycles [T2+]
- **Care Act 2014 safeguarding policies** [T1] (NOT CQC requirements, but voluntary CQC-alignment recommended)  

---

## Booking Model

The platform must support:

### Booking Types
- Hourly sessions  
- Daily care  
- Multi-day bookings  
- Live-in care (weekly / monthly)  

### Booking must capture:
- Care needs  
- Medical conditions  
- Required skills  
- Emergency contacts  
- Risk flags  

---

## Payments & Liability

- All payments processed on-platform
- Funds held in escrow until care completion
- Platform acts as payment facilitator (NOT employer)
- **Caregivers are self-employed professionals** (NOT employees or workers)
- Platform enforces insurance requirements (caregivers must have own Professional Indemnity and Public Liability insurance)
- **Platform Liability**: Limited to platform safety, verification accuracy, payment processing, safeguarding reporting
- **Platform is NOT liable for**: Care quality, care outcomes, caregiver conduct during visits, care receiver satisfaction with care
- **Caregiver Liability**: Full professional responsibility for care delivery and outcomes
- **Care Receiver/Family Liability**: Accepts risk of engaging self-employed professional; responsible for own care decisions  

---

## Safeguarding & Risk Profile

Primary risks:

- Abuse or neglect of vulnerable adults  
- Financial exploitation  
- Inadequate medical competence  
- Medication errors  
- Physical injury  
- Cognitive impairment users  

Mitigations (mandatory):

- Full identity verification  
- DBS  
- Skill-based matching  
- Emergency reporting  
- Admin oversight  
- Audit logs  
- Insurance requirements  
- Professional qualification checks  

---

## Regulatory Reality

This product operates in:

- **UK regulated care sector**
- **Introduction Agency model** (NOT CQC-registered care provider) - FDR-002
- **Care Act 2014 safeguarding environment** (NOT CQC regulatory environment)
- **Marketplace facilitator connecting self-employed professionals** (NOT service provider)
- **Healthcare-adjacent liability** (platform liability is limited; caregiver liability is primary)
- **Safeguarding Adults framework** (Care Act 2014 duties apply regardless of CQC status)

This is **not a lifestyle marketplace**.
It is a **regulated care marketplace connecting independent professionals**.

**Key Distinction**:
- Platform is NOT a care provider (does not control care delivery)
- Platform IS a marketplace facilitator (connects, verifies, processes payments, monitors safeguarding)

---

## Product Principle (Non-Negotiable)

> This platform prioritises **clinical safety and safeguarding over growth, speed, and convenience**. Any feature, design, or system that compromises this principle is out of scope, regardless of commercial value.
