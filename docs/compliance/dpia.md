# Data Protection Impact Assessment (DPIA)

**Document Purpose**: Assess risks to individuals' rights and freedoms from personal data processing, as required by GDPR Article 35.

**Document Owner**: Data Protection Officer / Legal Team
**Last Updated**: 2026-02-01
**Status**: TIER 1 - IN PROGRESS

---

## Tiered DPIA Approach (FDR-003)

**Strategic Decision**: The platform adopts a tiered approach to DPIA, with scope expanding as features and data processing increase across tiers (FDR-003).

### DPIA Tier Structure

| Tier | Data Scope | DPIA Complexity | Cost | Timeline | Status |
|------|------------|-----------------|------|----------|--------|
| **Tier 1** | Standard personal data only | Simplified | 2,000-4,000 GBP | 1-2 weeks | IN PROGRESS |
| **Tier 2** | Skill-based data (inference possible) | Updated | 3,000-5,000 GBP | 2-3 weeks | Future |
| **Tier 3** | Special category with explicit consent | Full | 8,000-15,000 GBP | 4-6 weeks | Future |
| **Tier 4** | Full health data and care coordination | Comprehensive | 15,000-25,000 GBP | 6-8 weeks | Future |

**Approach**: Platform completes Tier 1 DPIA before launch, then updates DPIA at each tier progression to reflect expanded data processing.

**See**: [Tiered Market Entry Roadmap](/docs/ROADMAP.md) for complete tier definitions and progression gates.

---

## Tier 1 DPIA: Companionship Services (Standard Personal Data)

### Document Status

**Current Tier**: Tier 1 (Minimal - Companionship Only)
**Tier 1 DPIA Status**: Pending Completion
**Target Completion**: Week 2
**DPO/Consultant**: [To be engaged]

### 1. Description of Processing

#### Data Controller

**Name**: [Platform Name]
**Legal Entity**: [Company Registration Number]
**Contact**: [Data Protection Contact]
**ICO Registration**: [ICO Registration Number - to be obtained]

#### Data Processing Purpose

Operate a two-sided marketplace connecting elderly care receivers (or their families) with self-employed companion caregivers for companionship and light assistance services (NOT personal care).

#### Data Categories Processed

**Care Receiver Data**:
- Name, email, phone, postcode (account creation, communication, location-based search)
- Age verification (65+ or documented care needs)
- Emergency contact details (safeguarding)
- Generic service preferences (companionship, light housework, shopping)
- Booking request details (date, time, duration, special requests)
- Payment card data (processed by Stripe, NOT stored by platform)
- Review content (service quality feedback)

**Caregiver Data**:
- Name, email, phone, postcode (account creation, profile)
- Professional profile (photo, bio, experience description)
- Service types offered (companionship, light housework, shopping, meal preparation)
- Hourly rate (self-set by caregiver)
- Availability calendar
- Government ID verification data (Stripe Identity)
- Right to work verification data
- Bank account details (Stripe Connect, NOT stored by platform)
- Review content (service quality feedback)
- DBS certificate data (VOLUNTARY ONLY at Tier 1)

**Family Member Data**:
- Name, email, phone (proxy account registration)
- Relationship to care receiver

**Data NOT Processed at Tier 1**:
- Medical conditions
- Health-related care needs
- Care skills requirements
- Qualification documents
- Risk assessments
- Care plans
- Clinical documents
- Mandatory DBS verification data

#### Data Sources

- Directly from data subjects (registration forms, booking requests, reviews)
- Stripe Identity (ID verification)
- UK Visas and Immigration (right to work verification)
- Voluntary DBS certificate uploads (caregiver-initiated)

#### Data Recipients

- Care receivers (view caregiver profiles, receive contact details after booking)
- Caregivers (view care receiver profiles, receive booking details)
- Stripe (payment processing)
- Platform admin team (verification, safeguarding, dispute resolution)
- Safeguarding Adults Boards (if safeguarding concern reported)
- ICO (if data breach or subject access request)
- Law enforcement (if criminal investigation)

#### Data Retention

- Active user accounts: Retained while account active + 7 years (legal claims period)
- Deleted accounts: Pseudonymized after 30 days, deleted after 7 years
- Safeguarding incident reports: 7 years minimum (Care Act 2014 requirement)
- Payment transaction records: 6 years (HMRC requirement)
- Audit logs: 3 years (GDPR accountability)

#### International Transfers

- NO international transfers (UK-only platform, UK-based infrastructure)
- Stripe (payment processor) may process in EEA with adequacy decision

---

### 2. Necessity and Proportionality Assessment

#### Lawful Basis for Processing

| Data Category | Lawful Basis (GDPR Article 6) | Justification |
|---------------|------------------------------|---------------|
| Account creation data | Article 6(1)(b) - Contract performance | Cannot provide marketplace service without user accounts |
| Location data (postcode) | Article 6(1)(b) - Contract performance | Necessary for location-based caregiver search |
| Payment data | Article 6(1)(b) - Contract performance | Necessary to facilitate transactions |
| Emergency contacts | Article 6(1)(d) - Vital interests | Necessary to protect vulnerable adults in emergencies |
| Safeguarding reports | Article 6(1)(e) - Public interest + Article 9(2)(i) for special category data if involved | Care Act 2014 legal obligation to report concerns |
| ID verification data | Article 6(1)(f) - Legitimate interest | Safeguarding vulnerable adults requires identity verification |
| Right to work data | Article 6(1)(c) - Legal obligation | Immigration Act 2014 requirement |

**No special category data (Article 9)** is processed at Tier 1.

#### Data Minimization Assessment

**Tier 1 Data Minimization Strategy**:
- Platform collects ONLY standard personal data (no health data)
- Generic service preferences (companionship, light assistance) do NOT infer health status
- No medical condition profiling
- No care skills matching (deferred to Tier 2)
- DBS verification is VOLUNTARY (companionship is not a regulated activity)

This approach minimizes compliance burden while validating product-market fit.

---

### 3. Risk Assessment

#### High-Level Risks (Tier 1)

| Risk | Likelihood | Impact | Residual Risk (after mitigation) |
|------|------------|--------|----------------------------------|
| **Unauthorized access to vulnerable adult data** | Medium | High | Low |
| **Financial exploitation** | Low | High | Low |
| **Identity theft** | Low | Medium | Low |
| **Data breach exposing personal data** | Low | High | Low |
| **Inadequate caregiver verification** | Medium | Medium | Low |
| **Platform used for off-platform contact (avoiding safeguards)** | Medium | Low | Low |

**Vulnerable Persons Trigger**: Processing elderly and potentially disabled individuals' data triggers DPIA requirement even for standard personal data (ICO guidance).

#### Risk Mitigation Measures

**Technical Measures**:
- End-to-end encryption for messaging
- Data encryption at rest (AES-256)
- HTTPS throughout platform
- Role-based access control (RBAC)
- Audit logging of all data access
- Multi-factor authentication for admin accounts
- Regular security testing and vulnerability scanning

**Organizational Measures**:
- Privacy by Design approach
- Data Protection Officer (DPO) appointed
- Staff training on data protection and vulnerable adult safeguarding
- Incident response plan for data breaches
- Regular DPIA reviews
- Privacy policy reviewed by legal counsel
- Cookie consent mechanism (PECR compliance)

**Safeguarding Measures**:
- ID verification (Stripe Identity)
- Right to work verification
- Phone and email verification
- Voluntary DBS verification (trust signal)
- Manual admin approval of caregivers
- Message content monitoring for safeguarding keywords
- Safeguarding reporting mechanism
- Emergency escalation workflow

---

### 4. Consultation and Sign-Off

#### Consultation Requirements

- [ ] Internal stakeholders consulted (Product, Engineering, Legal)
- [ ] DPO or data protection consultant engaged
- [ ] ICO prior consultation required? (To be confirmed by DPO)

**ICO Prior Consultation Trigger**: Required if residual high risk after mitigation. For Tier 1 (standard personal data, vulnerable persons), prior consultation is **unlikely required** but must be confirmed by DPO.

#### Sign-Off

- [ ] DPIA completed by: [Name, Role, Date]
- [ ] Reviewed by DPO: [Name, Date]
- [ ] Approved by: [Accountable Executive, Date]
- [ ] ICO prior consultation completed (if required): [Date]

---

### 5. Related Documents

- [Tiered Market Entry Roadmap](../product/governance/tiered-market-entry-roadmap.md)
- [Legal Framework](legal-framework.md)
- [Privacy Policy](policies/privacy-policy.md)
- [Feature Map](../product/spec/feature-map.md)
- [Gating Decisions](../product/decisions/gating-decisions.md) - GD-02

---

## Tier 2 DPIA: Personal Care Services (Future)

**Trigger**: When platform adds personal care services (washing, dressing, toileting) and skill-based matching.

**Additional Data Categories**:
- Care skills requirements (may infer health status by proxy - legal review required)
- Qualification documents
- DBS certificate data (NOW MANDATORY)
- Insurance verification data

**Additional Risks**:
- Health data inference from skill requirements
- Inadequate skill matching leading to harm
- DBS verification process failures

**Legal Opinion Required**: Does "needs caregiver with dementia experience" constitute health data by inference under GDPR Article 9?

**DPIA Update Timeline**: 2-3 weeks before Tier 2 launch
**Estimated Cost**: 3,000-5,000 GBP

---

## Tier 3 DPIA: Condition-Specific Matching (Future)

**Trigger**: When platform adds medical condition profiles and live-in care.

**Additional Data Categories**:
- Medical condition data (special category - Article 9)
- Risk assessment information
- Care plan documents
- Care complexity indicators

**Lawful Basis for Special Category Data**: Article 9(2)(a) - Explicit consent

**Additional Risks**:
- Special category data breach
- Inadequate consent mechanisms
- Live-in care Deprivation of Liberty risks
- Mental Capacity Act compliance failures

**ICO Prior Consultation**: Likely required (special category data + vulnerable persons)

**DPIA Update Timeline**: 4-6 weeks before Tier 3 launch
**Estimated Cost**: 8,000-15,000 GBP

---

## Tier 4 DPIA: Care Coordination (Future)

**Trigger**: When platform adds care plan management and NHS/LA integration.

**Additional Data Categories**:
- Care coordination documents
- Multi-professional care notes
- NHS/LA referral data
- Outcome measurements

**Additional Compliance**: NHS Data Security Toolkit, ISO 27001

**DPIA Update Timeline**: 6-8 weeks before Tier 4 launch
**Estimated Cost**: 15,000-25,000 GBP

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-02-01 | Product Director | Structured DPIA with tiered approach (FDR-003) |

---

**END OF DOCUMENT**
