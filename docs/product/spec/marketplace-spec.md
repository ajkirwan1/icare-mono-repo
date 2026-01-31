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

**See:** `docs/marketing/pre-launch-website-content-architecture.md`

### Phase 1: MVP Marketplace

The full operational marketplace as defined in this document. MVP launch requires:

- All Fixed Scope / Core Assumptions implemented
- All Trust, Safety & Regulation requirements in place
- Core Economic Loop operational: Discovery → Booking → Payment → Care → Review
- Full compliance posture: GDPR, Care Act, CQC alignment, DBS verification

**MVP cannot launch until:**
1. Pre-Launch validation complete
2. All gating decisions resolved (see `docs/product/decisions/gating-decisions.md`)
3. DPIA completed and approved
4. Legal policies finalized (Terms of Service, Privacy Policy, Safeguarding Policy)

### Phase 2+: Post-MVP

Features classified as Post-MVP in `docs/product/planning/mvp-classification.md`. These include:
- Advanced analytics and optimization
- Marketing/growth features
- Enhanced convenience features
- Performance optimization
- Live-in care specialized enhancements

---

## Fixed Scope / Core Assumptions (Product Constitution)

These are **non-negotiable axioms**.

- **Region**: UK only  
- **Category**: elderly personal care + companionship + health-adjacent support  
- **Care receivers may have medical conditions** (e.g. Parkinson’s, dementia, stroke, MS, mobility impairment)  
- **Services may include personal care and live-in care**  
- **Supply**: independent individual caregivers (no agencies in MVP)  
- **Payments**: on-platform only  
- **Platform operates in a regulated care environment (CQC relevant)**  
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
- Can create public professional profile
- Can define care services offered
- Can list medical condition experience
- Can list care skills and certifications
- Can accept/decline bookings
- Can message matched users
- Can receive payouts
- Can receive reviews
- Must complete mandatory verification

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

Caregivers may offer one or more of:

### Service Types
- Companionship  
- Personal care (washing, dressing, toileting)  
- Mobility assistance  
- Meal preparation and feeding  
- Medication assistance (non-clinical)  
- Overnight care  
- Live-in care  
- Dementia support  
- End-of-life companionship (non-clinical)  

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

These are **MVP requirements**, not Phase 2.

### Mandatory for all caregivers:
- Government ID verification  
- DBS background check  
- Right to work verification  
- Insurance verification  
- Qualification uploads  
- Manual admin approval  

### Platform must support:
- Safeguarding incident reporting  
- Audit trails for all actions  
- Emergency escalation workflows  
- Behaviour monitoring  
- Re-verification cycles  
- CQC-aligned policies and logs  

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
- Funds held until completion  
- Platform acts as intermediary  
- Caregivers are self-employed professionals  
- Platform enforces insurance requirements  
- Platform retains safeguarding liability controls  

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
- **CQC-relevant environment**  
- **Healthcare-adjacent liability**  
- **Safeguarding Adults framework**  

This is **not a lifestyle marketplace**.  
It is a **regulated healthcare marketplace**.

---

## Product Principle (Non-Negotiable)

> This platform prioritises **clinical safety and safeguarding over growth, speed, and convenience**. Any feature, design, or system that compromises this principle is out of scope, regardless of commercial value.
