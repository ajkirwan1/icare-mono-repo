# Tiered Market Entry Strategy: DPIA-Based Phased Launch Roadmap

**Document Purpose**: Define the strategic approach for entering the UK elderly care marketplace via progressively increasing compliance tiers, starting with DPIA Tier 1 (Minimal) to achieve rapid market entry with lowest cost and risk, then advancing through tiers as business validates.

**Document Owner**: Product Director
**Created**: 2026-02-01
**Last Updated**: 2026-02-01
**Status**: APPROVED (Founder Decision FDR-003)

---

## Executive Summary

The founder has made a strategic decision to enter the market via **DPIA Tier 1 (Minimal)** compliance, progressively moving through higher tiers as the business becomes financially viable. This approach:

- **Minimizes upfront investment** while validating product-market fit
- **Reduces time-to-market** by deferring non-essential compliance work
- **Creates clear success gates** for tier progression
- **Maintains legal compliance** at every stage (no "cutting corners" on mandatory requirements)
- **Builds compliance infrastructure incrementally** as revenue justifies investment

**Key Principle**: Each tier represents the **minimum legally viable** compliance posture for the features enabled at that tier. We do not over-invest in compliance before business validation, but we never under-comply.

---

## Tier Overview

| Tier | Name | Data Collected | Features Enabled | Estimated Timeline | Total Investment |
|------|------|----------------|------------------|-------------------|------------------|
| **Tier 1** | Minimal | Contact info, generic service preferences | Lead capture, caregiver waitlist, basic marketplace (companionship only) | Months 1-6 | 15,000-25,000 GBP |
| **Tier 2** | Standard | Skill requirements (inference-possible), basic verification | Personal care matching, enhanced verification, booking system | Months 6-12 | 40,000-60,000 GBP (cumulative) |
| **Tier 3** | Enhanced | Health-inferring data with explicit consent | Condition-specific matching, clinical safety monitoring, live-in care | Months 12-18 | 80,000-120,000 GBP (cumulative) |
| **Tier 4** | Comprehensive | Full health data, complex care coordination | Advanced care planning, multi-caregiver coordination, NHS/LA integration | Months 18+ | 150,000+ GBP (cumulative) |

---

## Tier 1: Minimal (Launch Tier)

### Overview

**Timeline**: Months 1-6
**Objective**: Validate market demand with minimum viable compliance
**Business Model**: Lead capture and companionship-only marketplace

### Data Collection Scope

**What We CAN Collect** (No special category data):

| Data Type | Purpose | Legal Basis | GDPR Classification |
|-----------|---------|-------------|---------------------|
| Name, email, phone | Account creation, communication | Contract performance | Standard personal data |
| Postcode | Location-based search | Contract performance | Standard personal data |
| Generic service preferences ("companionship", "light assistance") | Basic matching | Legitimate interest | Standard personal data |
| Caregiver professional details | Profile creation | Contract performance | Standard personal data |
| Payment information | Transaction processing | Contract performance | Standard personal data (via Stripe) |

**What We CANNOT Collect** (Tier 1 restrictions):

| Data Type | Why Restricted | Available From |
|-----------|----------------|----------------|
| Medical conditions | Special category (Article 9) | Tier 3+ |
| Health-related care skills (dementia experience, etc.) | May infer health status | Tier 2+ |
| Care plans or clinical documents | Special category health data | Tier 4 |
| Risk assessments | Health data by inference | Tier 3+ |
| Severity/complexity ratings | Health data by inference | Tier 3+ |

### Features Enabled

**Tier 1 MVP Features**:

1. **Care Receiver Side**:
   - Account registration (basic profile)
   - Caregiver search by location and availability
   - Filter by generic service type (companionship, light housework, shopping assistance)
   - View caregiver profiles (non-health experience)
   - Request bookings for companionship services only
   - In-app messaging
   - Payment processing (escrow model)
   - Basic reviews and ratings

2. **Caregiver Side**:
   - Professional profile creation
   - Service type selection (companionship only initially)
   - Availability calendar
   - Booking request management (accept/decline)
   - Earnings dashboard
   - Basic verification (ID, right to work)

3. **Admin Side**:
   - User management
   - Basic caregiver verification (ID, right to work)
   - Booking oversight
   - Dispute resolution
   - Basic safeguarding reporting

**Features NOT Available at Tier 1**:

- Medical condition-specific matching
- Personal care services (washing, dressing, toileting)
- Care skills-based filtering
- Live-in care bookings
- DBS verification (deferred - see rationale below)
- Qualification verification
- Clinical safety monitoring
- Medication assistance tracking

### Regulatory Requirements (Minimum to Proceed)

| Requirement | Status | Cost | Timeline |
|-------------|--------|------|----------|
| **DPIA (Simplified)** | Required | 2,000-4,000 GBP (consultant) | 1-2 weeks |
| **Privacy Policy** | Required | 1,000-2,000 GBP (legal review) | 1 week |
| **Terms of Service** | Required | 2,000-3,000 GBP (legal review) | 1 week |
| **Cookie Consent (PECR)** | Required | 500-1,000 GBP (implementation) | 1 week |
| **ICO Registration** | Required | 40-60 GBP | 1 day |
| **CQC Registration** | NOT Required | N/A | N/A |
| **DBS Integration** | Deferred to Tier 2 | N/A | N/A |
| **Full Safeguarding Policy** | Simplified version | Included in legal review | 1 week |
| **Legal Opinion (Introduction Agency)** | Strongly Recommended | 3,000-5,000 GBP | 1-2 weeks |

**Tier 1 DPIA Scope** (Simplified):
- Standard personal data processing only
- No special category data
- No systematic monitoring of health status
- Processing of vulnerable adults (companionship only)
- ICO prior consultation: **Unlikely required** (low risk if no health data)

### Cost Summary (Tier 1)

| Category | In-House | External | Total Range |
|----------|----------|----------|-------------|
| **Legal Setup** | Staff time | 6,000-10,000 GBP | 6,000-10,000 GBP |
| **DPIA** | Staff time | 2,000-4,000 GBP | 2,000-4,000 GBP |
| **Technical Implementation** | Development | 0 (existing platform) | Variable |
| **Insurance (Platform)** | N/A | 3,000-6,000 GBP/year | 3,000-6,000 GBP |
| **ICO Registration** | N/A | 40-60 GBP | 40-60 GBP |
| **Contingency (20%)** | N/A | N/A | 2,000-4,000 GBP |
| **TOTAL TIER 1** | - | - | **15,000-25,000 GBP** |

### Success Metrics to Progress to Tier 2

| Metric | Target | Rationale |
|--------|--------|-----------|
| **Monthly Active Users** | 500+ care receivers | Validates demand |
| **Completed Bookings** | 100+ per month | Validates core transaction loop |
| **Caregiver Supply** | 50+ verified caregivers | Validates supply-side value proposition |
| **Monthly Revenue** | 5,000+ GBP | Validates willingness to pay |
| **Net Promoter Score** | 30+ | Validates product-market fit |
| **Time in Market** | 3+ months | Allows patterns to emerge |
| **Safeguarding Incidents** | Zero serious incidents | Validates safety posture |
| **Request Rate for Personal Care** | 20%+ of inquiries | Validates demand for Tier 2 features |

### Risks of Operating at Tier 1

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| **Limited market appeal** (companionship only) | Medium | Medium | Clear messaging about roadmap; capture personal care demand as waitlist |
| **Competitor offers more services** | Medium | Medium | Speed to Tier 2; differentiate on trust/quality |
| **Care receiver expects personal care** | Medium | Low | Clear service scope in booking flow; redirect to waitlist |
| **Caregiver frustration** (limited services) | Low | Low | Roadmap visibility; prioritize Tier 2 development |
| **DBS not required creates perception issue** | Medium | Medium | Voluntary DBS submission; "DBS verified" badge available |
| **Safeguarding incident without full verification** | Low | High | Enhanced identity verification; mandatory references; clear service limits |

### DBS Verification Rationale (Tier 1 Deferral)

**Legal Position**: DBS checks are NOT legally mandatory for companionship-only services where no personal care is provided. The Safeguarding Vulnerable Groups Act 2006 requires DBS for "regulated activity" which includes personal care but not general companionship.

**Risk-Based Approach**:
- Tier 1 services (companionship, light housework, shopping) are NOT regulated activities
- Platform performs ID verification and right to work checks
- Caregivers can voluntarily submit existing DBS certificates for profile display
- "DBS Verified" badge available but not mandatory at Tier 1
- Full DBS integration mandatory from Tier 2 (personal care services)

**Voluntary DBS at Tier 1**:
- Caregivers with existing DBS certificates can upload for verification
- Admin reviews and displays "DBS Verified" badge if valid
- Care receivers can filter by "DBS Verified" if desired
- This provides trust signal without mandatory compliance cost

---

## Tier 2: Standard (Growth Tier)

### Overview

**Timeline**: Months 6-12 (triggered by Tier 1 success metrics)
**Objective**: Enable personal care services with appropriate verification
**Business Model**: Full marketplace with personal care matching

### Data Collection Scope

**New Data Collected at Tier 2**:

| Data Type | Purpose | Legal Basis | GDPR Classification |
|-----------|---------|-------------|---------------------|
| Care skill requirements | Personal care matching | Explicit consent | Potentially special category (inference) |
| Caregiver care skills | Matching and verification | Contract + consent | Standard personal data |
| DBS certificate data | Safeguarding | Legal obligation + consent | Criminal conviction data (Article 10) |
| Qualification documents | Skill verification | Contract performance | Standard personal data |
| Insurance certificates | Liability verification | Contract performance | Standard personal data |

**Tier 2 Data Approach** (Skill-Based, Not Health-Based):

Instead of collecting: "Care receiver has dementia"
We collect: "Care receiver needs caregiver with dementia experience"

This approach:
- Reduces (but may not eliminate) special category classification
- Focuses on caregiver capability rather than care receiver condition
- Requires legal review of ICO guidance on inference

**Legal Opinion Required**: Does "needs caregiver with dementia experience" constitute health data by inference? Legal counsel should provide written opinion before Tier 2 launch.

### Features Enabled

**New Features at Tier 2**:

1. **Care Receiver Side**:
   - Personal care service requests (washing, dressing, toileting assistance)
   - Care skill requirement specification
   - Filter caregivers by verified skills
   - View caregiver qualifications and DBS status
   - Enhanced booking with care needs summary

2. **Caregiver Side**:
   - Personal care services enabled
   - Care skills profile (mandatory for personal care)
   - Qualification uploads and verification
   - DBS submission and verification flow
   - Insurance upload and verification
   - Skill-based matching visibility

3. **Admin Side**:
   - DBS verification workflow (via umbrella body integration)
   - Qualification verification process
   - Insurance verification and expiry tracking
   - Enhanced safeguarding reporting
   - Skill verification audit trail

### Regulatory Requirements (Tier 2)

| Requirement | Status | Cost | Timeline |
|-------------|--------|------|----------|
| **DPIA Update** | Required | 3,000-5,000 GBP | 2-3 weeks |
| **Legal Opinion (Skill-Based Data)** | Required | 2,000-3,000 GBP | 1-2 weeks |
| **DBS Umbrella Body Contract** | Required | 30-50 GBP/check + setup | 2-4 weeks |
| **Enhanced Safeguarding Policy** | Required | 1,500-2,500 GBP | 1-2 weeks |
| **Caregiver Terms of Service Update** | Required | 1,000-1,500 GBP | 1 week |
| **Insurance Requirements Definition** | Required | Legal review cost | 1 week |
| **CQC Registration** | Still NOT Required | N/A | N/A |

### Cost Summary (Tier 2 - Incremental)

| Category | In-House | External | Total Range |
|----------|----------|----------|-------------|
| **Legal Updates** | Staff time | 4,000-6,000 GBP | 4,000-6,000 GBP |
| **DPIA Update** | Staff time | 3,000-5,000 GBP | 3,000-5,000 GBP |
| **DBS Integration** | Development time | 2,000-4,000 GBP (setup + ongoing) | Variable |
| **Insurance Verification System** | Development time | Internal | Variable |
| **Ongoing DBS Costs** | N/A | 40-60 GBP per caregiver | Passed to caregivers |
| **Fractional DPO Service** | N/A | 6,000-12,000 GBP/year | 6,000-12,000 GBP |
| **Contingency (20%)** | N/A | N/A | 3,000-5,000 GBP |
| **TIER 2 INCREMENTAL** | - | - | **25,000-35,000 GBP** |
| **CUMULATIVE (Tier 1+2)** | - | - | **40,000-60,000 GBP** |

### Success Metrics to Progress to Tier 3

| Metric | Target | Rationale |
|--------|--------|-----------|
| **Monthly Active Users** | 2,000+ care receivers | Validates scaled demand |
| **Personal Care Bookings** | 300+ per month | Validates personal care market |
| **Verified Caregivers** | 200+ with DBS and qualifications | Validates supply-side investment |
| **Monthly Revenue** | 20,000+ GBP | Validates sustainable business |
| **Repeat Booking Rate** | 40%+ | Validates care receiver satisfaction |
| **Caregiver Retention** | 80%+ after 6 months | Validates caregiver value proposition |
| **Demand for Condition-Specific Matching** | 30%+ of care receivers | Validates need for Tier 3 features |
| **Live-In Care Inquiries** | 10%+ of inquiries | Validates need for Tier 3 features |

### Risks of Operating at Tier 2

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| **Skill-based data classified as health data** | Medium | High | Obtain legal opinion before launch; prepare for explicit consent if needed |
| **DBS check delays affect onboarding** | Medium | Medium | Pre-launch DBS drive for existing caregivers; communicate timelines |
| **Insurance verification creates friction** | Medium | Low | Platform group insurance scheme option |
| **Qualification fraud** | Low | High | Manual admin verification; document authenticity checks |
| **Personal care incident** | Low | High | Enhanced verification; clear Terms of Service; platform insurance |

---

## Tier 3: Enhanced (Maturity Tier)

### Overview

**Timeline**: Months 12-18 (triggered by Tier 2 success metrics)
**Objective**: Enable condition-specific matching and advanced care services
**Business Model**: Full-featured marketplace with clinical safety features

### Data Collection Scope

**New Data Collected at Tier 3**:

| Data Type | Purpose | Legal Basis | GDPR Classification |
|-----------|---------|-------------|---------------------|
| Health-inferring skill requirements (explicit) | Condition-specific matching | Explicit consent (Article 9(2)(a)) | Special category data |
| Risk assessment information | Caregiver preparation, safeguarding | Explicit consent | Special category data |
| Care complexity indicators | Matching, pricing, safeguarding | Explicit consent | Special category data |
| Emergency health information | Caregiver safety, emergency response | Vital interests + consent | Special category data |

**Tier 3 Data Approach** (Explicit Consent for Health Data):

At Tier 3, we accept that condition-specific matching requires processing special category data. We implement:

- Explicit, informed consent flow for health data
- Granular consent (which conditions to disclose)
- Easy withdrawal mechanism
- Clear data retention and deletion policies
- Enhanced security for health data

### Features Enabled

**New Features at Tier 3**:

1. **Care Receiver Side**:
   - Medical condition profile (explicit consent)
   - Condition-specific caregiver matching
   - Risk assessment capture
   - Care complexity indication
   - Live-in care bookings
   - Emergency information storage

2. **Caregiver Side**:
   - Medical condition experience profile
   - Condition-specific training verification
   - Live-in care availability
   - Enhanced profile visibility for condition expertise
   - Clinical safety logging

3. **Admin Side**:
   - Clinical safety monitoring dashboard
   - Condition-specific safeguarding protocols
   - Live-in care DoLS guidance workflow
   - Enhanced incident categorization
   - Safeguarding Adults Board liaison tools

4. **Clinical Safety Features**:
   - Medication prompting logging
   - Falls and injury reporting
   - Behavioral change flags
   - Emergency escalation workflows
   - Post-booking welfare checks

### Regulatory Requirements (Tier 3)

| Requirement | Status | Cost | Timeline |
|-------------|--------|------|----------|
| **Full DPIA (Special Category)** | Required | 8,000-15,000 GBP | 4-6 weeks |
| **ICO Prior Consultation** | Possibly Required | Included in DPIA | 4-8 weeks |
| **Explicit Consent Mechanism** | Required | Development cost | 2 weeks |
| **Enhanced Data Security** | Required | Development + audit | 4-6 weeks |
| **DoLS Guidance Framework** | Required (live-in) | 2,000-3,000 GBP | 2-3 weeks |
| **Mental Capacity Act Policy** | Required | 2,000-3,000 GBP | 2-3 weeks |
| **SAB Liaison Procedures** | Required | Staff time + training | 2-4 weeks |
| **CQC Registration** | Still NOT Required (but monitor guidance) | N/A | N/A |

### Cost Summary (Tier 3 - Incremental)

| Category | In-House | External | Total Range |
|----------|----------|----------|-------------|
| **Full DPIA** | Staff time | 8,000-15,000 GBP | 8,000-15,000 GBP |
| **Legal Policies (MCA, DoLS)** | Staff time | 4,000-6,000 GBP | 4,000-6,000 GBP |
| **Data Security Audit** | Staff time | 5,000-10,000 GBP | 5,000-10,000 GBP |
| **Clinical Safety Features Dev** | Development time | Internal | Variable |
| **SAB Liaison Setup** | Staff time | Training costs | 2,000-3,000 GBP |
| **Ongoing DPO Service** | N/A | 12,000-18,000 GBP/year | 12,000-18,000 GBP |
| **Contingency (20%)** | N/A | N/A | 5,000-10,000 GBP |
| **TIER 3 INCREMENTAL** | - | - | **40,000-60,000 GBP** |
| **CUMULATIVE (Tier 1+2+3)** | - | - | **80,000-120,000 GBP** |

### Success Metrics to Progress to Tier 4

| Metric | Target | Rationale |
|--------|--------|-----------|
| **Monthly Active Users** | 5,000+ care receivers | Validates market scale |
| **Condition-Matched Bookings** | 500+ per month | Validates condition-specific value |
| **Live-In Care Bookings** | 50+ per month | Validates live-in care model |
| **Monthly Revenue** | 75,000+ GBP | Validates profitability trajectory |
| **Clinical Safety Incidents** | <1% of bookings | Validates safety features |
| **NHS/LA Inquiry Rate** | Inbound interest from commissioners | Validates B2B potential |
| **Complex Care Demand** | 20%+ want multi-caregiver/care plan features | Validates Tier 4 need |

### Risks of Operating at Tier 3

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| **ICO prior consultation delays launch** | Medium | High | Begin DPIA early; engage ICO proactively |
| **Health data breach** | Low | Critical | Enhanced security; breach response plan; cyber insurance |
| **Live-in care DoLS incident** | Low | High | DoLS guidance mandatory; family attestation |
| **Condition-specific matching liability** | Low | Medium | Clear Terms of Service; caregiver liability |
| **CQC challenges platform model** | Medium | High | Legal opinion; voluntary CQC alignment; registration-ready status |

---

## Tier 4: Comprehensive (Scale Tier)

### Overview

**Timeline**: Months 18+ (triggered by Tier 3 success metrics)
**Objective**: Full care coordination platform with NHS/LA integration potential
**Business Model**: Full marketplace plus B2B/commissioning revenue streams

### Data Collection Scope

**New Data Collected at Tier 4**:

| Data Type | Purpose | Legal Basis | GDPR Classification |
|-----------|---------|-------------|---------------------|
| Care plan documents | Care coordination | Explicit consent | Special category + clinical |
| Multi-professional notes | Team communication | Explicit consent | Special category |
| Outcome measurements | Quality assurance | Explicit consent | Special category |
| NHS/LA referral data | Commissioning integration | Legal obligation + consent | Special category |

### Features Enabled

**New Features at Tier 4**:

1. **Care Coordination**:
   - Care plan storage and sharing
   - Multi-caregiver team coordination
   - Care notes and handover system
   - Outcome tracking and reporting

2. **B2B Integration**:
   - NHS referral pathways
   - Local Authority commissioning integration
   - Care agency partnerships
   - Bulk booking and management

3. **Advanced Analytics**:
   - Population health insights
   - Quality outcome reporting
   - Predictive care needs analysis
   - Commissioning reports

### Regulatory Requirements (Tier 4)

| Requirement | Status | Cost | Timeline |
|-------------|--------|------|----------|
| **Comprehensive DPIA** | Required | 15,000-25,000 GBP | 6-8 weeks |
| **NHS Data Security Toolkit** | Required for NHS integration | 10,000-20,000 GBP | 8-12 weeks |
| **ISO 27001 Certification** | Highly Recommended | 20,000-40,000 GBP | 6-12 months |
| **CQC Registration** | Likely Required at this scale | 50,000-100,000 GBP/year | 3-6 months |
| **Clinical Governance Structure** | Required | Salary + overhead | Ongoing |
| **NHS/LA Contract Compliance** | Contract-specific | Variable | Variable |

### Cost Summary (Tier 4 - Incremental)

| Category | In-House | External | Total Range |
|----------|----------|----------|-------------|
| **Comprehensive DPIA** | Staff time | 15,000-25,000 GBP | 15,000-25,000 GBP |
| **NHS Data Security** | Staff time | 10,000-20,000 GBP | 10,000-20,000 GBP |
| **ISO 27001** | Staff time | 20,000-40,000 GBP | 20,000-40,000 GBP |
| **CQC Registration** (if required) | Staff time | 50,000-100,000 GBP/year | 50,000-100,000 GBP |
| **Clinical Governance** | N/A | Registered Manager salary | 45,000-60,000 GBP/year |
| **TIER 4 INCREMENTAL** | - | - | **70,000+ GBP** |
| **CUMULATIVE** | - | - | **150,000+ GBP** |

### CQC Registration Decision Point

**At Tier 4, reassess CQC registration**:

Factors favoring registration:
- NHS/LA contracts often require CQC
- Scale of operation may trigger CQC scrutiny
- Care coordination features blur Introduction Agency lines
- Competitive advantage vs. unregistered platforms

Factors against registration:
- Significant ongoing cost
- Operational constraints
- Inspection burden
- May not be legally required even at scale

**Recommendation**: Maintain "registration-ready" status throughout. At Tier 4, make commercial decision based on market demand for CQC-registered platform vs. cost of registration.

---

## Overall Roadmap: Phase Gates and Progression

### Visual Timeline

```
YEAR 1                                    YEAR 2
|-------- Q1 --------|-------- Q2 --------|-------- Q3 --------|-------- Q4 --------|
|                    |                    |                    |                    |
|<-- TIER 1 -------->|<-- TIER 2 -------->|<-- TIER 3 -------->|<-- TIER 4 -------->|
|   (Months 1-6)     |   (Months 6-12)    |   (Months 12-18)   |   (Months 18+)     |
|                    |                    |                    |                    |
|  Companionship     |  Personal Care     |  Condition Match   |  Care Coordination |
|  Basic Matching    |  DBS/Verification  |  Live-In Care      |  NHS/LA Integration|
|  Lead Validation   |  Skill Matching    |  Clinical Safety   |  B2B Revenue       |
|                    |                    |                    |                    |
|  15-25k GBP        |  40-60k GBP        |  80-120k GBP       |  150k+ GBP         |
|  (cumulative)      |  (cumulative)      |  (cumulative)      |  (cumulative)      |
```

### Phase Gate Requirements

**Gate 1: Tier 1 to Tier 2** (Month 6 Review)

Prerequisites to proceed:
- [ ] All Tier 1 success metrics achieved
- [ ] Legal opinion obtained on skill-based data classification
- [ ] DBS umbrella body contract signed
- [ ] Tier 2 DPIA drafted
- [ ] Insurance requirements defined
- [ ] Caregiver Terms of Service updated
- [ ] Funding secured for Tier 2 investment (25-35k GBP)

**Gate 2: Tier 2 to Tier 3** (Month 12 Review)

Prerequisites to proceed:
- [ ] All Tier 2 success metrics achieved
- [ ] DPIA for special category data completed
- [ ] ICO prior consultation completed (if required)
- [ ] Explicit consent mechanism built and tested
- [ ] Enhanced data security audit passed
- [ ] MCA and DoLS policies finalized
- [ ] SAB liaison procedures established
- [ ] Funding secured for Tier 3 investment (40-60k GBP)

**Gate 3: Tier 3 to Tier 4** (Month 18 Review)

Prerequisites to proceed:
- [ ] All Tier 3 success metrics achieved
- [ ] NHS Data Security Toolkit assessment started
- [ ] CQC registration decision made (register or not)
- [ ] B2B partnership pipeline established
- [ ] Care coordination features designed
- [ ] Funding secured for Tier 4 investment (70k+ GBP)

### Revenue/User Thresholds for Progression

| Gate | Users | Revenue | Rationale |
|------|-------|---------|-----------|
| **Gate 1** | 500+ MAU | 5,000+ GBP/month | Validates basic product-market fit |
| **Gate 2** | 2,000+ MAU | 20,000+ GBP/month | Validates sustainable unit economics |
| **Gate 3** | 5,000+ MAU | 75,000+ GBP/month | Validates path to profitability |

### Regulatory Checkpoints

| Checkpoint | When | Action |
|------------|------|--------|
| **DPIA Review** | Each tier transition | Update DPIA for new data processing |
| **ICO Registration Update** | Each tier transition | Update registration if processing changes |
| **Legal Opinion Update** | Tier 2, Tier 4 | Confirm Introduction Agency status still valid |
| **CQC Guidance Review** | Quarterly | Monitor for regulatory changes affecting platforms |
| **Insurance Review** | Annually + tier transition | Update coverage for new services |
| **Security Audit** | Tier 3, Tier 4 | External penetration testing and security review |

### Total Investment Projection

| Timeline | Tier | Cumulative Investment | Monthly Revenue Target | Months to Breakeven |
|----------|------|----------------------|------------------------|---------------------|
| Month 6 | Tier 1 Complete | 15,000-25,000 GBP | 5,000 GBP/month | 3-5 months |
| Month 12 | Tier 2 Complete | 40,000-60,000 GBP | 20,000 GBP/month | 2-3 months |
| Month 18 | Tier 3 Complete | 80,000-120,000 GBP | 75,000 GBP/month | 1-2 months |
| Month 24+ | Tier 4 Ongoing | 150,000+ GBP | 150,000+ GBP/month | Profitable |

---

## Founder Decision Record: FDR-003

### Decision Statement

**Date**: 2026-02-01
**Decision**: Enter market via DPIA Tier 1 (Minimal) and progressively advance through tiers as business becomes financially viable.

### Strategic Rationale

1. **Risk Mitigation**: Tiered approach reduces upfront investment risk before product-market fit is validated.

2. **Speed to Market**: Tier 1 compliance can be achieved in 4-6 weeks vs. 3-6 months for comprehensive compliance.

3. **Capital Efficiency**: Initial investment of 15-25k GBP vs. 80-120k GBP for full compliance.

4. **Learning Opportunity**: Each tier provides data to inform subsequent tier investments.

5. **Regulatory Alignment**: Compliance investment scales with regulatory exposure (companionship < personal care < health data).

6. **Competitive Positioning**: Fast market entry establishes presence while building toward comprehensive offering.

### Implications

This decision affects:
- Feature map (tier-based feature availability)
- MVP classification (what is "minimum" at Tier 1)
- Development roadmap (tier-gated features)
- Compliance investments (phased approach)
- Marketing messaging (service limitations at each tier)
- Caregiver onboarding (phased verification requirements)

### Cascading Updates Required

| Document | Required Update |
|----------|-----------------|
| `/docs/product/spec/marketplace-spec.md` | Add tier-based feature availability section |
| `/docs/product/spec/feature-map.md` | Flag features by tier availability |
| `/docs/product/planning/mvp-classification.md` | Redefine MVP as Tier 1 feature set |
| `/docs/compliance/dpia.md` | Structure as tiered DPIA with scope per tier |
| `/docs/compliance/legal-framework.md` | Add tiered compliance requirements section |
| `/docs/product/decisions/gating-decisions.md` | Update GD-02 (DPIA) with tiered approach |
| `/docs/product/governance/founder-decisions-responses.md` | Document FDR-003 |

---

## Appendix A: Tier 1 Minimum Viable Compliance Checklist

**Legal Documents**:
- [ ] Privacy Policy (standard personal data only)
- [ ] Terms of Service (Introduction Agency model)
- [ ] Cookie Policy (PECR compliant)
- [ ] Caregiver Terms (self-employed status)

**Regulatory Submissions**:
- [ ] ICO Registration (Data Controller)
- [ ] Simplified DPIA (documented internally)

**Verification Processes**:
- [ ] ID verification (Stripe Identity or equivalent)
- [ ] Right to work verification (UKVI share code)
- [ ] Phone verification (SMS OTP)
- [ ] Email verification

**Safeguarding**:
- [ ] Basic safeguarding reporting mechanism
- [ ] Emergency contact capture
- [ ] Admin oversight dashboard
- [ ] Safeguarding policy (companionship-scope)

**Technical**:
- [ ] Cookie consent banner
- [ ] HTTPS throughout
- [ ] Basic audit logging
- [ ] Data encryption at rest

---

## Appendix B: Service Type Availability by Tier

| Service Type | Tier 1 | Tier 2 | Tier 3 | Tier 4 |
|--------------|--------|--------|--------|--------|
| Companionship | Yes | Yes | Yes | Yes |
| Light housework | Yes | Yes | Yes | Yes |
| Shopping/errands | Yes | Yes | Yes | Yes |
| Meal preparation | Yes | Yes | Yes | Yes |
| Personal care (washing) | No | Yes | Yes | Yes |
| Personal care (dressing) | No | Yes | Yes | Yes |
| Personal care (toileting) | No | Yes | Yes | Yes |
| Mobility assistance | No | Yes | Yes | Yes |
| Medication prompting | No | Yes | Yes | Yes |
| Overnight care | No | Yes | Yes | Yes |
| Live-in care | No | No | Yes | Yes |
| Dementia-specific care | No | No | Yes | Yes |
| End-of-life support | No | No | Yes | Yes |
| Care coordination | No | No | No | Yes |
| Multi-caregiver teams | No | No | No | Yes |

---

## Appendix C: Verification Requirements by Tier

| Verification Type | Tier 1 | Tier 2 | Tier 3 | Tier 4 |
|-------------------|--------|--------|--------|--------|
| ID verification | Mandatory | Mandatory | Mandatory | Mandatory |
| Right to work | Mandatory | Mandatory | Mandatory | Mandatory |
| Phone verification | Mandatory | Mandatory | Mandatory | Mandatory |
| Email verification | Mandatory | Mandatory | Mandatory | Mandatory |
| DBS check | Voluntary | Mandatory | Mandatory | Mandatory |
| Qualification verification | Not required | Mandatory (personal care) | Mandatory | Mandatory |
| Insurance verification | Not required | Mandatory | Mandatory | Mandatory |
| Reference checks | Not required | Recommended | Mandatory | Mandatory |
| Condition-specific training | Not required | Not required | Mandatory | Mandatory |
| Clinical governance approval | Not required | Not required | Not required | Mandatory |

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-02-01 | Product Director | Initial document created based on FDR-003 |

---

**END OF DOCUMENT**
