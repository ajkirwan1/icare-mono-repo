# Founder Decisions: Strategic Responses Tracker

**Document Purpose**: Track founder responses to the strategic questions identified in [founder-decisions-strategic-analysis.md](founder-decisions-strategic-analysis.md), document the strategic implications of each decision, and ensure cascading impacts are properly reflected across all product artifacts.

**Document Owner**: Product Director
**Created**: 2026-01-31
**Last Updated**: 2026-02-01
**Status**: Active - Collecting Responses

---

## How to Use This Document

1. **Record Responses**: When the founder provides a decision, document it in the appropriate section below
2. **Analyze Implications**: For each response, detail the strategic implications across all affected areas
3. **Track Cascading Updates**: Identify which artifacts need to be updated to reflect the decision
4. **Monitor Consistency**: Ensure all downstream documents remain aligned with founder decisions

---

## Response Summary Table

| # | Decision Area | Response Status | Response Date | Strategic Impact |
|---|--------------|----------------|---------------|------------------|
| 1 | Business Model Identity | ANSWERED | 2026-01-31 | Foundational |
| 2 | CQC Registration | ANSWERED | 2026-02-01 | Foundational |
| 3 | DPIA Engagement (Tiered Approach) | ANSWERED | 2026-02-01 | Foundational |
| 4 | Insurance Requirements | PENDING | - | Operational |
| 5 | DBS Provider Selection | PENDING | - | Technical |
| 6 | Identity Verification Provider | PENDING | - | Technical |
| 7 | Mental Capacity Act Compliance | PENDING | - | Legal/Operational |
| 8 | Pricing & Commission Structure | PENDING (Deferred) | 2026-02-01 | Commercial |

---

## FDR-001: Business Model Identity

### Question

> "Business Model Identity: Are you a technology platform connecting independent professionals (like Uber or Airbnb), or are you a care service provider responsible for care quality?"

**Source**: [founder-decisions-strategic-analysis.md](founder-decisions-strategic-analysis.md), Decision 1 (CQC Registration Status), Business Model Identity consideration

**Question Context**: This is the foundational question that determines the entire regulatory, legal, and operational framework of the marketplace. The answer shapes CQC registration requirements, liability allocation, caregiver employment status, and product architecture.

---

### Founder Response

**Response Date**: 2026-01-31

**Response Statement**:

> "We are a technology platform connecting independent professionals who are self-employed."

**Response Category**: Technology Platform / Introduction Agency Model

---

### Strategic Implications

#### 1. Regulatory and Compliance Impact

| Area | Implication | Required Action |
|------|-------------|-----------------|
| **CQC Registration** | Strongly supports "No CQC Registration Required" position. Platform is introducing self-employed professionals, not providing care directly. | Obtain formal legal opinion confirming Introduction Agency status. Document this founder decision as foundational basis for CQC position. |
| **Employment Law** | Caregivers are definitively self-employed, not employees or workers. IR35 considerations apply. | Terms of Service must clearly establish self-employed status with appropriate indicia (control, substitution, mutuality of obligation). |
| **Care Act 2014** | Platform retains safeguarding duties as an organization working with vulnerable adults, but these are separate from care provider duties. | Implement safeguarding policy aligned with Care Act requirements for non-care-providers. |
| **Health and Safety** | Platform has limited H&S duties (safe platform operation) but not care delivery H&S duties. | Caregivers responsible for their own risk assessments. Platform provides guidance but does not mandate care delivery methods. |
| **HMRC Classification** | Self-employed model must withstand HMRC scrutiny. Uber/Addison Lee case law applies. | Ensure platform does not exercise excessive control over caregivers (no mandatory uniforms, no set methods, no disciplinary control over how care is delivered). |

**Key Regulatory Documents to Update**:
- `/docs/compliance/legal-framework.md` - Confirm Introduction Agency classification
- `/docs/product/decisions/product-decisions.md` - DEC-002 now has founder confirmation
- `/docs/product/decisions/gating-decisions.md` - GD-01 can reference this decision

---

#### 2. Liability and Responsibility Model

| Liability Area | Platform Responsibility | Caregiver Responsibility | Care Receiver/Family Responsibility |
|----------------|------------------------|-------------------------|-------------------------------------|
| **Care Quality** | None - Platform does not control care delivery | Full - Caregiver determines and delivers care | Communicates needs, provides feedback |
| **Care Outcomes** | None - Platform does not guarantee outcomes | Professional responsibility for competent care | Responsible for own care decisions |
| **Safeguarding Incidents** | Reporting and escalation obligations | Duty to report, duty of care during visits | Alert platform/authorities to concerns |
| **Injury During Care** | Limited - negligent platform design only | Full - covered by Professional Indemnity insurance | Accepts risk of engaging self-employed professional |
| **Employment Claims** | None - no employment relationship | N/A | N/A |
| **Discrimination Claims** | Platform design enabling discrimination | Refusal to serve protected characteristics | Unjustified preference requests |
| **Data Protection** | Data controller for platform data | Data processor for care visit data | Data subject rights |
| **Payment Disputes** | Escrow operator duties | Deliver service as booked | Pay for services received |

**Liability Allocation Summary**:
The platform operates with a **marketplace facilitator liability model**, similar to Uber, Airbnb, and Bark.com. The platform:
- IS liable for: Platform safety, verification accuracy, data protection, payment processing, safeguarding reporting
- IS NOT liable for: Care quality, care outcomes, caregiver conduct during visits, care receiver satisfaction with care

**Required Legal Documents**:
- Caregiver Terms of Service (self-employment confirmation)
- Care Receiver Terms of Service (independent contractor acknowledgment)
- Platform Liability Limitations clause
- Indemnification provisions

---

#### 3. Product Architecture Implications

| Architecture Area | Design Requirement | Rationale |
|-------------------|-------------------|-----------|
| **Caregiver Profiles** | Emphasize self-employed professional status. No "employed by" language. Profile belongs to caregiver, not platform. | Supports employment classification |
| **Booking System** | Platform facilitates introduction and booking. Does not assign work or mandate acceptance. | Caregivers have full autonomy to accept/reject |
| **Payment System** | Escrow model - platform holds payment, releases to caregiver on completion. Platform is payment processor, not employer. | Payment facilitation, not wages |
| **Messaging System** | Platform provides communication tools. Does not monitor content for care instructions. | No control over care delivery |
| **Review System** | Care receiver reviews caregiver professional service. Platform does not rate/discipline for care quality. | Feedback mechanism, not performance management |
| **Verification System** | Platform verifies identity, background, qualifications. Does not supervise ongoing care. | Due diligence, not employment screening |
| **Care Plans** | Platform does NOT create, store, or manage care plans. Care receiver/family/GP owns care plan. | No clinical governance role |
| **Scheduling** | Caregiver sets own availability. Platform does not mandate hours. | Self-employed control over working time |
| **Pricing** | Caregiver sets own hourly rate. Platform may suggest ranges but does not mandate. | Self-employed control over rates |
| **Substitution** | Caregiver can send substitute (with appropriate verification). | Key self-employment indicator |

**Technical Specifications Affected**:
- `/docs/technical/api-spec.md` - Ensure API language reflects platform-as-facilitator
- `/docs/product/spec/feature-map.md` - Review all features for employment classification implications
- `/docs/product/spec/marketplace-spec.md` - Confirm alignment with Introduction Agency model

---

#### 4. Artifacts and Specifications Requiring Updates

The following documents must be reviewed and updated to reflect this founder decision:

**Immediate Updates Required**:

| Document | Path | Required Change | Priority |
|----------|------|-----------------|----------|
| Product Decisions | `/docs/product/decisions/product-decisions.md` | Add founder confirmation to DEC-002 rationale. Note that CQC position is now supported by explicit founder decision on business model. | HIGH |
| Gating Decisions | `/docs/product/decisions/gating-decisions.md` | GD-01 (CQC Registration) can reference this founder decision as supporting evidence for Introduction Agency position. | HIGH |
| Legal Framework | `/docs/compliance/legal-framework.md` | Document Introduction Agency model as foundational legal structure. | HIGH |
| Terms of Service | `/docs/compliance/policies/terms-of-service.md` | Ensure caregiver and care receiver terms clearly establish self-employment relationship. | HIGH |
| Marketplace Spec | `/docs/product/spec/marketplace-spec.md` | Confirm platform-as-facilitator language throughout. | MEDIUM |
| Feature Map | `/docs/product/spec/feature-map.md` | Review all feature descriptions for employment classification implications. | MEDIUM |

**Downstream Documents to Verify**:

| Document | Path | Verification Check |
|----------|------|-------------------|
| Privacy Policy | `/docs/compliance/policies/privacy-policy.md` | Data controller status for platform, processor relationship with caregivers |
| Safeguarding Policy | `/docs/compliance/policies/safeguarding-policy.md` | Non-care-provider safeguarding obligations |
| Gap Registry | `/docs/compliance/gap-registry.md` | Close or update gaps related to business model uncertainty |
| Screen Inventory | `/docs/product/ui/screen-inventory.md` | No "employee" language in UI copy |
| API Spec | `/docs/technical/api-spec.md` | No employment-implying endpoints |

---

#### 5. Dependencies on Other Product Decisions

This founder decision is **foundational** and affects all other strategic decisions:

| Related Decision | Dependency Type | Impact |
|-----------------|-----------------|--------|
| **CQC Registration (Decision 1)** | Strongly supports | Technology platform model supports Introduction Agency classification. Legal opinion should reference this founder decision. |
| **DPIA (Decision 2)** | Informs data roles | Platform is data controller for marketplace data. Caregivers are independent data controllers for care delivery data. DPIA must reflect this split. |
| **Insurance Requirements (Decision 3)** | Defines scope | Caregivers need own Public Liability and Professional Indemnity as self-employed professionals. Platform needs marketplace operator insurance, not care provider insurance. |
| **DBS Provider (Decision 4)** | No direct dependency | DBS checks proceed regardless of business model (due diligence is still required). |
| **ID Verification (Decision 5)** | No direct dependency | ID verification proceeds regardless of business model. |
| **MCA Compliance (Decision 6)** | Informs liability | Platform facilitates booking but does not take responsibility for capacity assessments. Family/care receiver responsible for lawful authority. Platform provides information and verification tools. |

---

#### 6. Risk Factors and Mitigations

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| **CQC challenges Introduction Agency position** | Medium | High | Obtain formal legal opinion. Implement CQC-aligned policies proactively. Identify potential Registered Manager. |
| **HMRC challenges self-employment classification** | Medium | High | Ensure Terms of Service reflect genuine self-employment (control, substitution, MOO). Avoid Uber-style excessive control. |
| **Care quality incident with no platform liability** | High (incidents will occur) | Medium | Clear Terms of Service. Robust verification. Safeguarding escalation. Reputation system. |
| **Caregiver claims employment rights** | Low-Medium | Medium | Watertight Terms of Service. No employment-like benefits. Legal review of all platform features. |
| **Regulatory evolution classifies platforms differently** | Medium (2-3 year horizon) | High | Monitor CQC guidance. Build compliance flexibility. Prepare registration pathway. |

---

#### 7. Implementation Checklist

**Immediate Actions (Week 1)**:
- [ ] Update DEC-002 in product-decisions.md with founder confirmation
- [ ] Brief legal counsel on founder decision for CQC legal opinion
- [ ] Review Terms of Service draft for self-employment language
- [ ] Confirm marketplace-spec.md reflects Introduction Agency model

**Short-Term Actions (Week 2-3)**:
- [ ] Complete legal review of all platform features for employment classification risk
- [ ] Update DPIA data controller/processor analysis
- [ ] Review insurance requirements with broker (marketplace operator scope)
- [ ] Update all UI copy to remove any employment-implying language

**Medium-Term Actions (Week 4+)**:
- [ ] Implement caregiver Terms of Service acceptance flow
- [ ] Build caregiver rate-setting feature (self-employed control)
- [ ] Implement availability management (caregiver controls schedule)
- [ ] Design substitution feature (key self-employment indicator)

---

### Decision Audit Trail

| Date | Action | Actor | Notes |
|------|--------|-------|-------|
| 2026-01-31 | Question raised | Product Director | Identified in strategic analysis |
| 2026-01-31 | Response received | Founder | "Technology platform connecting self-employed professionals" |
| 2026-01-31 | Implications documented | Product Director | This document created |

---

---

## FDR-002: CQC Registration Position

### Question

> "Given your business model decision, do you confirm the Introduction Agency position (no CQC registration required), or do you wish to pursue voluntary CQC registration?"

**Source**: [founder-decisions-strategic-analysis.md](founder-decisions-strategic-analysis.md), Decision 1 (CQC Registration Status)

**Question Context**: This decision determines the platform's regulatory classification under the Health and Social Care Act 2008. The CQC (Care Quality Commission) regulates providers of "regulated activities" including personal care and accommodation with nursing or personal care. The key question is whether digital marketplace platforms that connect self-employed caregivers with care receivers constitute "arranging" regulated activities, which would require CQC registration, or whether they operate as introduction agencies, which do not require registration.

**Dependencies**: Requires FDR-001 (Business Model Identity) - SATISFIED (Technology Platform / Introduction Agency Model)

---

### Founder Response

**Response Date**: 2026-02-01

**Response Statement**:

> "We do not want to pursue CQC Registration"

**Response Category**: Introduction Agency Model (No CQC Registration)

**Response Interpretation**: The founder confirms the platform will operate as an unregulated introduction agency under the Health and Social Care Act 2008. The platform will NOT register with the Care Quality Commission and will NOT operate as a regulated care service provider. This decision aligns with and reinforces FDR-001 (Technology Platform model).

---

### Strategic Implications

#### 1. Regulatory and Compliance Impact

| Area | Implication | Required Action |
|------|-------------|-----------------|
| **CQC Registration** | Platform confirmed as Introduction Agency. NOT a regulated care provider. No CQC registration, inspections, or Registered Manager required. | Obtain formal legal opinion documenting Introduction Agency status and defensibility of this position. |
| **Health and Social Care Act 2008** | Platform does NOT provide or arrange "regulated activities" within the meaning of the Act. Platform introduces self-employed professionals to service users. | Document legal rationale. Ensure all operational practices support Introduction Agency classification. |
| **Care Quality and Safety** | Platform has NO regulatory responsibility for care quality under CQC framework. Care quality is the responsibility of individual self-employed caregivers. | Implement voluntary quality mechanisms (reviews, verification, safeguarding) that do NOT create regulatory obligations. |
| **Safeguarding Duties** | Platform retains safeguarding duties under Care Act 2014 as an organization working with vulnerable adults. These are SEPARATE from CQC registration requirements. | Implement robust safeguarding policy. Establish SAB liaison procedures. Train staff on Care Act duties. |
| **Local Authority Engagement** | Platform can operate without notifying CQC. However, may need to engage with local authority safeguarding teams and Safeguarding Adults Boards. | Identify SAB contacts for operating areas. Document information sharing protocols. |
| **Regulatory Monitoring** | CQC guidance on digital care platforms is evolving. Current position may be challenged in future. | Monitor CQC guidance publications. Maintain compliance flexibility. Prepare contingency registration pathway. |

**Regulations That Still Apply** (No CQC registration required, but compliance still mandatory):

| Regulation | Requirement | Platform Obligation |
|------------|-------------|---------------------|
| **Care Act 2014** | Safeguarding duties, duty to report concerns | Safeguarding policy, SAB liaison, incident reporting |
| **GDPR / Data Protection Act 2018** | Data protection, DPIA, privacy | DPIA completion, Privacy Policy, ICO registration |
| **Mental Capacity Act 2005** | Capacity presumption, best interests, LPA recognition | MCA compliance framework, LPA verification |
| **Equality Act 2010** | Non-discrimination, reasonable adjustments | Gender preference policy, accessibility compliance |
| **Consumer Rights Act 2015** | Clear service descriptions, cancellation rights, refunds | Terms of Service, cancellation policy |
| **Immigration Act 2014** | Right to work verification | UKVI share code verification, visa restriction tracking |
| **Safeguarding Vulnerable Groups Act 2006** | DBS disclosure requirements | Enhanced DBS checks for caregivers |
| **Health and Safety at Work Act 1974** | Safe systems (limited scope for platform) | Platform infrastructure safety, no care delivery H&S duties |

---

#### 2. Relationship to FDR-001 (Technology Platform Decision)

**Reinforcement of FDR-001**: This decision directly confirms and operationalizes the Technology Platform model established in FDR-001.

| FDR-001 Principle | FDR-002 Confirmation |
|-------------------|----------------------|
| "Technology platform connecting independent professionals" | No CQC registration confirms platform is NOT a care service provider |
| Caregivers are self-employed, not employees | Self-employed professionals do not work for a regulated care provider |
| Platform does not control care delivery | No clinical governance obligations, no care plan ownership |
| Marketplace facilitator model (Uber/Airbnb) | Introduction Agency is the care sector equivalent of ride-sharing/accommodation platforms |
| Liability rests with caregivers and care receivers | No CQC duties to ensure care quality, safety, or outcomes |

**Combined Legal Position**: FDR-001 + FDR-002 together establish:
1. Platform is a technology marketplace, not a care provider
2. Caregivers are self-employed professionals, not employees or agency workers
3. Platform is not subject to CQC regulation
4. Platform retains limited duties under Care Act (safeguarding) and consumer law
5. Commercial model is commission-based facilitation, not care service provision

**Legal Defence Strategy**: If CQC challenges the Introduction Agency position, the combined FDR-001 and FDR-002 decisions provide foundational evidence of business model intent. The legal opinion should reference both decisions to establish the platform's consistent, documented position from inception.

---

#### 3. Product Architecture Implications

**Features ENABLED by No CQC Registration**:

| Feature Area | Implication | Design Principle |
|--------------|-------------|------------------|
| **Caregiver Autonomy** | Caregivers control their own rates, availability, methods, and service approach | Platform provides tools but does not mandate how care is delivered |
| **Substitution Rights** | Caregivers can send qualified substitutes (key self-employment indicator) | Build substitution feature with verification workflow |
| **Direct Relationships** | Care receivers and caregivers can develop ongoing relationships outside platform (after introduction) | No non-compete clauses preventing direct engagement |
| **Flexible Service Types** | Platform can offer range of services without CQC-defined service categories | Service types defined by marketplace demand, not regulatory categories |
| **Rapid Iteration** | Product changes do not require CQC notification or approval | Standard product development cycle without regulatory gates |
| **Geographic Expansion** | Can expand to new areas without CQC registration for each location | Single platform serving all UK geographies |

**Features CONSTRAINED by No CQC Registration**:

| Feature Area | Constraint | Mitigation |
|--------------|------------|------------|
| **Care Plans** | Platform MUST NOT create, store, or manage clinical care plans | Care receivers/families/GPs own care plans. Platform may store care preferences but not clinical plans. |
| **Clinical Assessments** | Platform MUST NOT conduct care needs assessments | Caregivers independently assess whether they can meet needs. Platform collects preferences, not clinical assessments. |
| **Quality Assurance** | Platform cannot conduct care quality inspections or audits | Use review system, incident reporting, and safeguarding as quality signals. No formal quality inspection program. |
| **Staff Supervision** | Platform cannot supervise or manage caregiver performance in care delivery | No performance management, no disciplinary action for care quality, no mandatory training for care delivery methods. |
| **Medication Management** | Platform cannot provide medication management or MAR charts | Medication prompting only. No clinical medication oversight. |
| **Clinical Governance** | No clinical governance structure (Medical Director, Clinical Lead) | Safeguarding lead only. No clinical decision-making authority. |
| **CQC Rating Display** | Cannot display CQC rating as trust signal | Build alternative trust signals (verification badges, reviews, years of experience, qualifications). |
| **NHS/LA Contracts** | May be excluded from some NHS or Local Authority contracts requiring CQC registration | Focus on private pay market. B2B partnerships with registered providers possible. |

**Architecture Decisions Required**:

| Decision Area | Requirement | Rationale |
|---------------|-------------|-----------|
| **Data Model** | No "care plan" entity in database schema | Clinical care plans are out of scope |
| **Terminology** | Use "care preferences" not "care plan" throughout UI and API | Avoid language implying clinical governance |
| **Booking Flow** | Caregiver accepts/declines based on own assessment | Platform does not match based on clinical criteria |
| **Training** | Optional caregiver training resources, no mandatory training for care methods | Mandatory training implies employment/control |
| **Incident Logging** | Safeguarding incident logging, not clinical incident reporting to CQC | Different regulatory framework |
| **Quality Metrics** | User satisfaction (reviews, ratings, rebooking) not clinical outcomes | No responsibility for care outcomes |

---

#### 4. Artifacts and Specifications Requiring Updates

**Immediate Updates Required**:

| Document | Path | Required Change | Priority |
|----------|------|-----------------|----------|
| **Gating Decisions** | `/docs/product/decisions/gating-decisions.md` | GD-01 can be marked RESOLVED. Document founder decision and legal opinion requirement. Note that CQC registration NOT required. | HIGH |
| **Legal Framework** | `/docs/compliance/legal-framework.md` | Section 1 (CQC Registration) update: Confirm Introduction Agency position with founder decision reference. Update risk mitigation checklist to reflect decision. | HIGH |
| **Product Decisions** | `/docs/product/decisions/product-decisions.md` | DEC-002 fully confirmed by founder. Remove "Pending Legal Confirmation" status. Add FDR-001 and FDR-002 as supporting rationale. | HIGH |
| **Marketplace Spec** | `/docs/product/spec/marketplace-spec.md` | Ensure no language implies CQC registration or regulated provider status. Confirm Introduction Agency language. | MEDIUM |
| **Feature Map** | `/docs/product/spec/feature-map.md` | Review all feature descriptions. Remove any features requiring CQC registration. Ensure no "care plan" features. | MEDIUM |
| **Gap Registry** | `/docs/compliance/gap-registry.md` | Close gaps related to CQC uncertainty. Add new gaps for legal opinion procurement. | MEDIUM |

**Downstream Documents to Verify**:

| Document | Path | Verification Check |
|----------|------|-------------------|
| **Terms of Service** | `/docs/compliance/policies/terms-of-service.md` | Confirm Introduction Agency language. No CQC-registered provider claims. Self-employed caregiver status clear. |
| **Privacy Policy** | `/docs/compliance/policies/privacy-policy.md` | Data processing purposes reflect marketplace model, not care provider model |
| **Safeguarding Policy** | `/docs/compliance/policies/safeguarding-policy.md` | Care Act 2014 compliance (not CQC safeguarding requirements). SAB liaison, not CQC notification. |
| **Screen Inventory** | `/docs/product/ui/screen-inventory.md` | No UI copy implying CQC registration or regulated provider status |
| **API Spec** | `/docs/technical/api-spec.md` | No endpoints for clinical care plans or CQC-required data |
| **Pre-Launch Website** | `/docs/marketing/pre-launch-website-content-architecture.md` | Marketing claims must not imply CQC registration or regulated status |

---

#### 5. Dependencies on Other Strategic Decisions

This decision is **foundational** and unblocks multiple downstream decisions:

| Related Decision | Dependency Type | Impact |
|-----------------|-----------------|--------|
| **DPIA (FDR-003)** | Informs | Data processing basis can be finalized. Platform is data controller for marketplace data, not clinical data controller. No CQC-mandated data retention requirements. |
| **Insurance Requirements (FDR-004)** | Enables | Insurance scope is marketplace operator, NOT regulated care provider. Caregivers need self-employed PI/PL. Platform needs marketplace operator insurance (lower cost than CQC-registered provider insurance). |
| **DBS Provider Selection (FDR-005)** | No dependency | Enhanced DBS checks still required (due diligence, not CQC requirement). Level of check unchanged. |
| **Identity Verification (FDR-006)** | No dependency | Verification requirements unchanged. |
| **MCA Compliance (FDR-007)** | Informs | Platform facilitates bookings but takes no clinical responsibility for capacity assessments. Family/care receiver responsible for lawful authority. Platform provides verification tools, not clinical assessment. |

**Decisions NOW Unblocked by FDR-002**:

1. **Insurance Broker Consultation**: Can now brief broker that platform is NOT CQC-registered. Different insurance products apply.
2. **Legal Opinion Scope**: Solicitor can now prepare legal opinion confirming Introduction Agency status (not evaluating whether to register).
3. **Safeguarding Framework**: Can now design safeguarding under Care Act 2014, not CQC Fundamental Standards.
4. **Terms of Service Drafting**: Can now finalize caregiver and care receiver terms with correct legal framework.
5. **Marketing Messaging**: Can now prepare messaging that does NOT claim CQC registration or regulated status.

---

#### 6. Risk Factors and Mitigations Specific to Operating Without CQC Registration

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| **CQC challenges Introduction Agency position** | Medium | High | Obtain formal legal opinion from regulatory solicitor (documented defence). Implement CQC-aligned policies voluntarily. Identify potential Registered Manager in advance. Maintain compliance flexibility for rapid registration if required. |
| **Competitor gains CQC registration as trust signal** | Medium | Medium | Build alternative trust signals (verified badge ecosystem, transparent reviews, qualification verification). Emphasize caregiver autonomy and choice as differentiator. |
| **Care quality incident with regulatory scrutiny** | Medium | High | Robust safeguarding policy. Clear Terms of Service allocating liability. Incident response procedures. SAB liaison. Insurance coverage. |
| **NHS/Local Authority excludes non-CQC providers** | Medium | Medium | Focus on private pay market (primary market). Partner with CQC-registered providers for B2B channel. Monitor commissioning requirements. |
| **Regulatory evolution captures digital platforms** | Medium (2-3 year horizon) | High | Monitor CQC guidance and consultations. Engage with industry bodies. Maintain "registration-ready" status (Registered Manager candidate, CQC-aligned policies). |
| **Family/care receiver expects regulated care** | Medium | Low | Clear Terms of Service. Pre-booking disclosures. Messaging emphasizes self-employed professional model. |
| **Caregiver misconduct with no CQC recourse** | Low-Medium | Medium | Robust verification. Safeguarding procedures. Platform can suspend/remove caregivers (marketplace rules, not CQC powers). |

**Specific Mitigations for Non-CQC Operation**:

1. **Legal Opinion (Immediate)**:
   - Commission written legal opinion from regulatory solicitor confirming Introduction Agency classification
   - Opinion should reference FDR-001 and FDR-002 as evidence of business model intent
   - Retain opinion as defence documentation if CQC challenges position
   - Cost: 3,000-5,000 GBP. Timeline: 1-2 weeks.

2. **CQC-Aligned Policies (Voluntary)**:
   - Implement safeguarding policy aligned with CQC Fundamental Standards (even though not required)
   - Implement incident reporting and management (voluntary, not CQC notification)
   - Implement complaints procedure meeting CQC expectations
   - Rationale: Demonstrates quality commitment, provides rapid compliance path if registration required

3. **Registered Manager Candidate (Contingency)**:
   - Identify a potential Registered Manager (person with care sector experience, appropriate qualifications)
   - Do NOT hire or appoint yet (no CQC registration planned)
   - Maintain relationship (advisor, consultant, board member)
   - Rationale: If CQC requires registration, reduces timeline from 6 months to 3 months

4. **Trust Signal Alternatives**:
   - Verified Caregiver badge (DBS, ID, qualifications)
   - Experience years displayed
   - Qualification certificates verified
   - Review/rating system with verified bookings
   - Rebooking rate as quality signal
   - Rationale: Compensates for lack of CQC rating as trust marker

5. **Regulatory Monitoring**:
   - Subscribe to CQC guidance updates
   - Monitor digital care platform regulatory developments
   - Participate in industry forums (UK Home Care Association, etc.)
   - Engage with CQC informally if guidance changes
   - Rationale: Early warning if regulatory position shifts

---

#### 7. Implementation Checklist

**Immediate Actions (Week 1)**:

- [ ] Engage regulatory solicitor to prepare legal opinion confirming Introduction Agency status
- [ ] Brief solicitor on FDR-001 and FDR-002 as foundational evidence
- [ ] Update GD-01 in gating-decisions.md to RESOLVED status
- [ ] Update DEC-002 in product-decisions.md with founder confirmation
- [ ] Review and update legal-framework.md Section 1
- [ ] Brief insurance broker that platform is NOT CQC-registered

**Short-Term Actions (Week 2-3)**:

- [ ] Receive and review legal opinion
- [ ] Distribute legal opinion to relevant stakeholders
- [ ] Update gap-registry.md with CQC position closure
- [ ] Review all marketing materials for CQC-related claims
- [ ] Ensure Terms of Service draft reflects Introduction Agency model
- [ ] Begin voluntary CQC-aligned policy drafting (safeguarding, complaints, incidents)

**Medium-Term Actions (Week 4-8)**:

- [ ] Complete voluntary CQC-aligned policy suite
- [ ] Identify Registered Manager candidate (contingency planning)
- [ ] Establish SAB liaison contacts for operating areas
- [ ] Review all UI copy for compliance with non-CQC positioning
- [ ] Finalize trust signal strategy (alternative to CQC rating)
- [ ] Complete legal review of caregiver and care receiver Terms of Service

**Ongoing Actions**:

- [ ] Monitor CQC guidance publications (quarterly review)
- [ ] Track competitor CQC registration status
- [ ] Review regulatory position annually or upon significant guidance changes
- [ ] Maintain Registered Manager relationship (contingency)
- [ ] Document all CQC-related decisions and rationale for audit trail

---

### Decision Audit Trail

| Date | Action | Actor | Notes |
|------|--------|-------|-------|
| 2026-01-31 | Question raised | Product Director | Identified in strategic analysis |
| 2026-01-31 | FDR-001 answered | Founder | Technology Platform model confirmed (prerequisite for FDR-002) |
| 2026-02-01 | Response received | Founder | "We do not want to pursue CQC Registration" |
| 2026-02-01 | Implications documented | Product Director | This document updated |

---

### Legal Disclaimer

This founder decision and its documented implications do NOT constitute legal advice. The decision to operate without CQC registration should be confirmed by formal legal opinion from a regulatory solicitor specializing in CQC matters. The platform must obtain such legal opinion before launch. If legal advice contradicts this decision, the matter should be escalated to the founder for reconsideration.

---

---

## FDR-003: DPIA Engagement - Strategic Questions for Founder

### Decision Context

**Decision Area**: DPIA (Data Protection Impact Assessment) Engagement
**Status**: PENDING - Awaiting Founder Input
**Priority**: URGENT - Legal Blocker for Launch
**Dependencies**: None (legal requirement regardless of business model)

---

### Founder's Strategic Direction on Data Collection

**Received Direction** (2026-02-01):

> "The founder does NOT want to store details of health conditions. Instead, they want to ask care receivers what they require as experience or skills in caregivers (e.g., 'dementia experience,' 'mobility assistance skills' rather than 'has dementia,' 'uses wheelchair')."

**Interpretation**: This represents a deliberate **data minimization strategy** - focusing on caregiver capability requirements rather than care receiver health disclosures. This has significant implications for GDPR compliance, DPIA scope, and product architecture.

---

### Strategic Analysis: Data Minimization Approach

#### Current Documentation vs Founder Direction

**Current Feature Map (Sections 3.1, 3.5) Proposes Collecting**:

| Data Point | Current Proposal | Founder Direction |
|------------|------------------|-------------------|
| Medical conditions (Parkinson's, dementia, stroke, etc.) | Store on care receiver profile | DO NOT store |
| Severity level (mild, moderate, severe) | Store on care receiver profile | DO NOT store |
| Specific symptoms and behaviors | Store on care receiver profile | DO NOT store |
| Medication regimen | Store (for context) | DO NOT store |
| Care skills required | Store (washing, dressing, etc.) | REFRAME as "caregiver skills needed" |
| Risk assessment flags | Store (falls risk, choking risk) | Unclear - needs clarification |
| Care plan summary | Optional upload | Unclear - needs clarification |

**Reframing Required**:

| Instead of Collecting... | Collect... |
|--------------------------|------------|
| "Has dementia" (health condition) | "Needs caregiver with dementia experience" (skill requirement) |
| "Uses wheelchair" (disability disclosure) | "Needs caregiver with mobility assistance skills" (skill requirement) |
| "Has Parkinson's severity: moderate" (health data) | "Needs caregiver experienced with movement disorders" (skill requirement) |
| "Incontinence issues" (health condition) | "Needs caregiver with continence care skills" (skill requirement) |

---

#### GDPR Classification Analysis

**GDPR Article 9: Special Category Data** includes:
- Data concerning health
- Data revealing racial or ethnic origin
- Genetic data
- Biometric data for identification

**Question**: Does the founder's reframing successfully avoid GDPR Article 9 special category data?

**Analysis**:

| Approach | GDPR Classification | Legal Basis Required |
|----------|---------------------|---------------------|
| "Care receiver has dementia" | Special category health data (Article 9) | Explicit consent + one of Article 9(2) exemptions |
| "Care receiver needs caregiver with dementia experience" | Potentially still health data by inference | May still require Article 9 basis |
| "Care receiver needs memory support assistance" | Less clearly health data, but inference possible | Stronger position, but not certain |

**Key Legal Question**: Does requesting "dementia experience" in a caregiver implicitly reveal that the care receiver has dementia? ICO guidance suggests that data which can reasonably infer health status may still constitute health data.

**ICO Position** (from ICO special category guidance):
> "Data which does not explicitly mention a health condition but from which such a condition can be reasonably inferred may be special category data."

**Implication**: The founder's approach **reduces but may not eliminate** special category data processing. Legal opinion required.

---

### Strategic Questions for Founder Decision

The following questions are structured to enable the founder to make informed decisions about DPIA engagement scope, timeline, and approach.

---

#### SECTION A: Data Collection Scope

**Q1: How strictly should the platform avoid ANY health-related inference?**

**Context**: The founder's direction to avoid storing health conditions is clear. However, even asking for "dementia experience" may implicitly reveal a health condition. The question is how far to push data minimization.

**GDPR Principle at Stake**: Data minimization (Article 5(1)(c)) - collect only data that is adequate, relevant, and limited to what is necessary.

**Product Architecture Impact**: This determines the entire care receiver profile data model and matching algorithm design.

**Options to Consider**:

| Option | Description | GDPR Risk | Product Impact |
|--------|-------------|-----------|----------------|
| **A1: Strict Minimization** | Collect ONLY generic service categories (e.g., "personal care," "companionship") - NO condition-specific skills | Lowest risk - no health inference possible | Significantly reduces matching precision; may not serve complex care needs effectively |
| **A2: Skill-Based (Founder Direction)** | Collect caregiver skill requirements (e.g., "dementia experience needed") - no direct health conditions | Medium risk - health inference possible but not explicit | Good matching capability; requires legal review of whether this still constitutes special category data |
| **A3: Tiered Disclosure** | Basic matching uses generic skills; detailed matching (optional) uses more specific requirements | Medium risk - explicit consent for detailed matching | Flexible; user controls disclosure level; more complex UX |
| **A4: Full Health Collection** | Collect health conditions directly (current feature map approach) | Highest risk - clearly special category data requiring explicit consent | Most precise matching; highest compliance burden |

**Question for Founder**: Which option aligns with your vision for the platform? Are you willing to accept reduced matching precision (Option A1) for maximum data minimization, or is the skill-based approach (Option A2) your intended position?

---

**Q2: What care requirement information IS essential for safe matching?**

**Context**: While avoiding health data storage, the platform must still ensure caregivers are appropriately qualified for the care needs. Some information about care requirements is necessary for safety.

**GDPR Principle at Stake**: Purpose limitation and necessity - data must be necessary for the legitimate purpose.

**Product Architecture Impact**: Determines minimum viable care needs profile structure.

**Examples Requiring Clarification**:

| Care Requirement | Safety Concern | Possible Skill-Based Phrasing | Founder Decision Needed |
|------------------|----------------|------------------------------|------------------------|
| **Falls risk** | Caregiver must be trained in falls prevention/response | "Needs caregiver with falls management experience" | Is this essential? |
| **Aggressive behavior** (dementia-related) | Caregiver safety concern | "Needs caregiver experienced with challenging behaviors" | Is this essential? |
| **Medication timing** | Risk of missed doses | "Needs caregiver with medication prompting experience" | Is this essential? |
| **Hoisting required** | Requires specific training/certification | "Needs caregiver with hoisting certification" | Is this essential? |
| **Dietary restrictions** (diabetes, allergies) | Safety risk if ignored | "Needs caregiver aware of dietary requirements" | Is this essential? |
| **Communication needs** (non-verbal, hearing impaired) | Effective care delivery | "Needs caregiver with communication adaptation skills" | Is this essential? |

**Question for Founder**: Please indicate which care requirements are:
- **ESSENTIAL** (must collect in some form for safety)
- **NICE-TO-HAVE** (improves matching but not safety-critical)
- **EXCLUDE** (do not collect at all)

---

**Q3: Should the platform store ANY care receiver profile information, or only caregiver search criteria?**

**Context**: There are two architectural approaches to the skill-based model:

**GDPR Principle at Stake**: Storage limitation - data should not be stored longer than necessary.

**Product Architecture Impact**: Fundamental database design decision.

**Options**:

| Approach | Description | GDPR Position | Product Impact |
|----------|-------------|---------------|----------------|
| **Stored Profile Model** | Care receiver creates a profile with their skill requirements, stored in database, used for matching and repeat bookings | Data stored persistently - must justify retention | Better UX for repeat bookings; profile can be shared with caregivers; requires data retention policy |
| **Session-Only Model** | Care receiver enters skill requirements at time of search/booking; not stored permanently; each booking starts fresh | Minimal data retention - strongest GDPR position | Worse UX for repeat users; no saved preferences; no profile for caregivers to review |
| **Hybrid Model** | Basic preferences stored (service type, location); detailed skill requirements entered per booking | Balanced - only essential data retained | Moderate UX; most detail not stored |

**Question for Founder**: Do you want care receiver profiles stored persistently, or should the platform minimize storage by collecting requirements only at booking time?

---

**Q4: What information should caregivers see about care receivers?**

**Context**: Even if the platform doesn't store health conditions, caregivers need enough information to assess whether they can appropriately serve a care receiver.

**GDPR Principle at Stake**: Transparency and data subject rights - both caregiver and care receiver have rights over their data.

**Product Architecture Impact**: Booking request data structure; caregiver view of care receiver.

**Current Feature Map (Section 5.3)** proposes caregivers see:
- Care receiver name and profile
- Care needs summary (medical conditions, care skills required)
- Special requests
- Risk assessment flags
- Earnings breakdown

**Under Founder Direction**, this would become:
- Care receiver name (necessary for service)
- Caregiver skills needed (reframed from health conditions)
- Special requests (text field - what goes here?)
- ??? Risk information - what should caregiver see?
- Earnings breakdown

**Question for Founder**:
1. Should caregivers see risk-related information (e.g., "challenging behaviors expected," "high falls risk")? This is important for caregiver safety and informed consent.
2. Should there be a free-text "special requests" field? Note: Users may voluntarily disclose health information in free text. Should this be filtered/restricted?

---

#### SECTION B: GDPR and Legal Basis

**Q5: What legal basis should the platform rely on for processing care requirement data?**

**Context**: GDPR requires a lawful basis for processing personal data. If any care requirement data constitutes health data (special category), an Article 9 exemption is also required.

**GDPR Principle at Stake**: Lawfulness of processing (Article 6 and potentially Article 9).

**Product Architecture Impact**: Consent flows, privacy policy, data subject rights implementation.

**Options for Standard Personal Data (Article 6)**:

| Legal Basis | Description | Suitability |
|-------------|-------------|-------------|
| **Consent (6(1)(a))** | User explicitly consents to processing | Strong but can be withdrawn; requires clear consent mechanism |
| **Contract (6(1)(b))** | Processing necessary for contract performance | Strong - platform service requires matching |
| **Legitimate Interest (6(1)(f))** | Platform has legitimate interest that doesn't override user rights | Requires balancing test; weaker for sensitive data |

**If Data Constitutes Special Category (Article 9)**:

| Legal Basis | Description | Suitability |
|-------------|-------------|-------------|
| **Explicit Consent (9(2)(a))** | Explicit, informed consent for health data processing | Strongest - user clearly agrees |
| **Vital Interests (9(2)(c))** | Necessary to protect life | Only in emergencies - not routine processing |
| **Health Care Provision (9(2)(h))** | Processing by health professional under confidentiality | Platform is NOT a health care provider; likely does not apply |

**Question for Founder**:
1. Are you comfortable with explicit consent as the primary legal basis? This requires a clear consent flow during registration.
2. If legal opinion determines skill-based data IS still special category, do you accept the explicit consent requirement, or would you prefer to minimize data further to avoid special category classification entirely?

---

**Q6: How should the platform handle users who voluntarily disclose health information?**

**Context**: Even with a skill-based model, users may voluntarily disclose health conditions in free-text fields (messages, special requests, reviews).

**GDPR Principle at Stake**: Purpose limitation - data collected for one purpose shouldn't be used for another without consent.

**Product Architecture Impact**: Message moderation, content filtering, data retention for free-text fields.

**Scenarios**:
- Care receiver writes in special requests: "My mother has severe dementia and sometimes doesn't recognize people"
- Care receiver messages caregiver: "Just so you know, I have Parkinson's and my hands shake"
- Care receiver writes review: "Perfect for someone with my mobility issues after my stroke"

**Options**:

| Approach | Description | GDPR Impact | UX Impact |
|----------|-------------|-------------|-----------|
| **No Intervention** | Allow users to disclose what they want in free text | Platform processes this data; may need to treat as health data | Natural UX; users share what they feel comfortable with |
| **Warning/Guidance** | Display guidance encouraging skill-based descriptions, not health disclosures | Encourages data minimization; doesn't force it | Slightly more friction; educational |
| **Filtering** | Automatically detect and redact health-related keywords from free text | Strongest data minimization | Intrusive; may block legitimate communication; technical challenge |
| **Review Process** | Admin reviews messages for health data disclosures | Manual data classification | Slow; privacy concerns about admin reading messages |

**Question for Founder**: If a care receiver voluntarily discloses health conditions in free text (messages, special requests), should the platform:
- Allow it (accepting that this becomes health data to manage)?
- Warn/educate users to use skill-based language?
- Actively filter/redact health mentions?

---

#### SECTION C: DPIA Scope and Complexity

**Q7: Does the founder's data minimization approach significantly reduce DPIA scope?**

**Context**: The DPIA scope and complexity depends on what data is processed and how.

**GDPR Principle at Stake**: DPIA is mandatory for high-risk processing (Article 35).

**Product Architecture Impact**: DPIA document structure, risk assessment scope.

**Analysis**:

| DPIA Trigger | Current Approach | Founder's Approach | Impact |
|--------------|------------------|-------------------|--------|
| Large-scale processing of special category (health) data | YES - explicit health conditions collected | MAYBE - depends on legal interpretation of skill-based data | May reduce but not eliminate |
| Processing data of vulnerable persons | YES - elderly, disabled | YES - unchanged | Unchanged - DPIA still required |
| Systematic monitoring | YES - care delivery tracking, messaging | YES - unchanged | Unchanged - DPIA still required |

**Key Finding**: Even with the founder's data minimization approach, **DPIA is still mandatory** because:
1. Platform processes data of vulnerable persons (elderly, disabled) - DPIA trigger
2. Platform involves systematic monitoring (booking tracking, message surveillance for safeguarding) - DPIA trigger
3. Skill-based data may still be classified as health data by inference - legal opinion needed

**However**, data minimization will:
- Reduce the **volume** of special category data
- Potentially reduce **risk level** in DPIA assessment
- Simplify **data retention** policies
- Reduce **data subject rights** request complexity

**Question for Founder**: Do you understand that DPIA is mandatory regardless of data minimization, but that your approach will simplify compliance? Are you prepared to proceed with DPIA engagement?

---

#### SECTION D: DPIA Engagement Options

**Q8: Should DPIA be completed in-house or with external consultant?**

**Context**: DPIA can be completed using ICO templates by internal staff or by engaging an external DPO/consultant.

**GDPR Principle at Stake**: Accountability - organization must demonstrate compliance.

**Product Architecture Impact**: None directly, but affects timeline and quality of data architecture decisions.

**Options**:

| Approach | Description | Cost | Timeline | Quality/Risk |
|----------|-------------|------|----------|--------------|
| **Internal (ICO Template)** | Use ICO DPIA template, completed by internal team | Minimal (staff time only) | 2-4 weeks | Risk of gaps; may miss legal nuances; acceptable for straightforward processing |
| **Fractional DPO** | Engage DPO service for ongoing compliance, starting with DPIA | 500-1,500 GBP/month ongoing | DPIA in 2-3 weeks | Expert input; ongoing support; may need additional specialist for health data |
| **Project-Based Consultant** | Engage GDPR consultant for DPIA only | 5,000-10,000 GBP one-time | 2-4 weeks | Focused expertise; no ongoing relationship; good for defined scope |
| **Specialist Law Firm** | Engage data protection practice at law firm | 10,000-20,000 GBP | 3-6 weeks | Highest authority; legal privilege; best for complex/high-risk scenarios |

**Factors Favoring External Consultant**:
- Processing vulnerable adult data (elderly, potentially disabled)
- Possible special category (health) data processing
- Complex consent chains (care receiver, family member, caregiver)
- Matching algorithm processing sensitive attributes
- No internal data protection expertise

**Question for Founder**: What is your preference for DPIA engagement?
1. Budget range you're comfortable with?
2. Preference for ongoing DPO relationship vs. one-time project?
3. Comfort level with complexity - do you want highest-authority legal firm opinion or is consultant sufficient?

---

**Q9: What is the acceptable timeline for DPIA completion?**

**Context**: DPIA must be completed before processing begins. This blocks launch.

**GDPR Principle at Stake**: Article 35 requires DPIA "prior to the processing."

**Product Architecture Impact**: Launch timeline.

**Timeline Options**:

| Scenario | DPIA Timeline | Launch Impact |
|----------|---------------|---------------|
| **Immediate Engagement** | Start this week, complete in 2-4 weeks | Minimal delay (within Phase 1 timeline) |
| **Delayed Engagement** | Start in 2-3 weeks, complete in 4-6 weeks | 2-4 week delay to launch |
| **ICO Prior Consultation Required** | If high residual risk identified, ICO must be consulted | Add 4-8 weeks (ICO response time) |

**Risk Factor**: If DPIA identifies high residual risk that cannot be mitigated, ICO prior consultation is mandatory. This adds 4-8 weeks. The founder's data minimization approach reduces this risk but does not eliminate it.

**Question for Founder**:
1. When do you want to engage DPO/consultant to begin DPIA? (Recommendation: Immediately)
2. Are you aware that ICO consultation may add 2 months if high risk is identified?
3. Is there a hard launch deadline that DPIA must fit within?

---

#### SECTION E: Cost and Resource Implications

**Q10: What is the budget for DPIA and ongoing data protection compliance?**

**Context**: DPIA is a one-time assessment, but ongoing data protection compliance requires resources.

**GDPR Principle at Stake**: Accountability and ongoing compliance obligations.

**Product Architecture Impact**: Staffing and budget planning.

**Cost Breakdown**:

| Item | One-Time Cost | Ongoing Annual Cost | Notes |
|------|---------------|---------------------|-------|
| **DPIA Completion** | 5,000-15,000 GBP | - | Consultant or law firm |
| **Privacy Policy Drafting** | 2,000-5,000 GBP | - | Legal review |
| **Cookie Policy & Consent** | 1,000-2,000 GBP | - | Legal + technical implementation |
| **Fractional DPO Service** | - | 6,000-18,000 GBP | Ongoing compliance support |
| **ICO Registration Fee** | 40-2,900 GBP | 40-2,900 GBP | Based on organization size and turnover |
| **Data Subject Request Handling** | - | Staff time | SAR, erasure, portability requests |
| **Annual DPIA Review** | - | 1,000-3,000 GBP | If processing changes significantly |

**Total Estimated Year 1 Cost**: 10,000-30,000 GBP (depending on approach)

**Question for Founder**:
1. What is your budget for initial DPIA and data protection setup?
2. Do you want to engage a fractional DPO for ongoing compliance, or handle data protection internally after DPIA?
3. Are you aware of ICO registration requirements and fees?

---

#### SECTION F: Dependencies and Sequencing

**Q11: How does DPIA relate to other founder decisions?**

**Context**: DPIA findings may affect other aspects of the product.

**GDPR Principle at Stake**: Integrated compliance approach.

**Product Architecture Impact**: Cross-decision dependencies.

**Dependencies**:

| Related Decision | Dependency with DPIA |
|------------------|---------------------|
| **FDR-001: Business Model** | RESOLVED - Platform is Introduction Agency. DPIA reflects that platform is data controller for marketplace data; caregivers are independent data controllers for care delivery. |
| **FDR-002: CQC Registration** | RESOLVED - No CQC registration. DPIA does not need to address CQC data requirements. |
| **FDR-004: Insurance** | No direct dependency. Insurance does not affect data processing. |
| **FDR-005: DBS Provider** | DPIA must address DBS data sharing with umbrella body. Data Processing Agreement required. |
| **FDR-006: ID Verification** | DPIA must address biometric data (selfies) and document images. Explicit consent required for biometric processing. |
| **FDR-007: MCA Compliance** | DPIA must address consent for data processing when care receiver lacks capacity. LPA holder consents on their behalf. |

**Key Dependency**: FDR-007 (Mental Capacity Act) affects DPIA because:
- If care receiver lacks capacity, who consents to data processing?
- LPA holder can consent for health and welfare decisions
- DPIA must document consent chain for incapacitated users

**Question for Founder**: Are you comfortable proceeding with DPIA now, with the understanding that FDR-007 (MCA Compliance) findings may require DPIA updates?

---

### Summary: Decision Points Requiring Founder Input

To proceed with DPIA engagement, the following decisions are needed:

| # | Decision Point | Options | Recommendation |
|---|----------------|---------|----------------|
| 1 | Data collection approach | A1 (strict), A2 (skill-based), A3 (tiered), A4 (full) | A2 (skill-based) - aligns with founder direction |
| 2 | Essential care requirements | List provided above | Founder to indicate essential vs nice-to-have |
| 3 | Profile storage model | Stored, session-only, or hybrid | Stored (better UX) with clear retention policy |
| 4 | Caregiver visibility into care needs | Full, limited, or minimal | Limited - skill requirements only, no risk flags unless safety-critical |
| 5 | Legal basis | Consent, contract, or legitimate interest | Explicit consent for any health-inferring data |
| 6 | Voluntary health disclosure handling | Allow, warn, or filter | Warn/educate (guidance without blocking) |
| 7 | DPIA approach | In-house, fractional DPO, consultant, or law firm | External consultant (5,000-10,000 GBP) - complexity warrants expertise |
| 8 | DPIA timeline | Immediate, delayed | Immediate (start Week 1) |
| 9 | Budget | Various ranges provided | 10,000-20,000 GBP for DPIA + privacy policy + year 1 DPO |
| 10 | MCA dependency | Proceed now or wait | Proceed now, update DPIA when FDR-007 resolved |

---

### Proposed Approach for Founder Consideration

**Data Architecture Recommendation** (aligning with founder direction):

1. **Care Receiver Profile** stores:
   - Name, contact details, location (standard personal data)
   - Emergency contact (standard personal data)
   - Service type preferences (companionship, personal care, live-in)
   - Caregiver skill requirements (reframed, not health conditions):
     - "Needs caregiver with dementia experience" (not "has dementia")
     - "Needs caregiver with mobility assistance skills" (not "uses wheelchair")
     - "Needs caregiver with continence care experience" (not "has incontinence")
   - Gender preference (if justified per Equality Act)
   - Language requirements

2. **Care Receiver Profile does NOT store**:
   - Medical diagnoses
   - Condition severity
   - Medication information
   - Clinical care plans
   - Specific health symptoms

3. **Caregiver sees on booking request**:
   - Care receiver first name (for communication)
   - Location (for travel planning)
   - Service type and duration
   - Caregiver skills required (the reframed requirements)
   - Special requests (guidance to use skill language, not health disclosures)
   - Earnings breakdown

4. **Risk Information**:
   - Safety-critical risks (falls, aggressive behavior) disclosed to caregiver with explicit care receiver consent
   - Framed as "caregiver should be prepared for..." rather than "care receiver has..."

5. **Free Text Fields**:
   - Guidance displayed encouraging skill-based descriptions
   - No automated filtering (too intrusive)
   - If health data disclosed, treated as user's voluntary disclosure with their consent

**DPIA Engagement Recommendation**:

1. **Engage external consultant** (5,000-10,000 GBP) - vulnerable adult data processing warrants expertise
2. **Start immediately** (Week 1) - DPIA is critical path blocker
3. **Use ICO DPIA template** - ensures ICO expectations met
4. **Document skill-based approach** as data minimization measure
5. **Seek legal opinion** on whether skill-based data constitutes special category (include in consultant scope)
6. **Consider fractional DPO** (500-1,000 GBP/month) for ongoing compliance after DPIA

---

### How to Respond

To provide your decisions on FDR-003, please respond to the following:

**1. Data Collection Approach**:
> "I confirm the skill-based approach (A2) for collecting care requirements, focusing on caregiver skills needed rather than care receiver health conditions."

OR specify alternative.

**2. Essential Care Requirements**:
> "The following care requirements are ESSENTIAL: [list]"
> "The following are NICE-TO-HAVE: [list]"
> "The following should be EXCLUDED: [list]"

**3. Profile Storage**:
> "Care receiver profiles should be stored persistently / stored minimally / session-only."

**4. Free Text Health Disclosures**:
> "If users voluntarily disclose health information in free text, the platform should: allow it / warn and guide / filter."

**5. DPIA Engagement**:
> "I approve engaging [internal / external consultant / law firm] for DPIA completion."
> "Budget approved: [amount]"
> "Preferred timeline: [start date]"

**6. Ongoing DPO**:
> "I want to engage a fractional DPO service / handle data protection internally after DPIA."

---

### Document Status

**Status**: PENDING FOUNDER INPUT
**Questions Prepared**: 2026-02-01
**Prepared By**: Product Director
**Next Action**: Founder review and response to decision points

---

### DPIA Complexity Tiers - Business Model Options

This section provides a strategic decision matrix to help the founder choose the appropriate DPIA complexity level. Each tier represents a distinct approach to data handling, with clear trade-offs between functionality, compliance burden, cost, and risk.

**Context for This Analysis**:
- FDR-001 CONFIRMED: Platform operates as an Introduction Agency (technology marketplace)
- FDR-002 CONFIRMED: No CQC registration (unregulated introduction service)
- Founder has expressed preference for data minimization (skill-based vs health conditions)
- Platform serves vulnerable adults (elderly, potentially disabled) - inherent higher risk category
- UK GDPR and ICO enforcement applies

---

#### Tier 1: Minimal

**Business Model Description**

A pure introduction platform that matches care receivers with caregivers based solely on generic service categories (e.g., "companionship," "personal care," "live-in care"), location, availability, and price. No care-specific skills or requirements are collected. The platform functions as a classified ads service with identity verification and payment processing.

**Data Collection Scope**

| Data Category | Collected | Notes |
|---------------|-----------|-------|
| Identity data (name, email, phone) | Yes | Standard account data |
| Location/address | Yes | For matching and service delivery |
| Payment details | Yes | Processed via payment provider |
| DBS check status | Yes | Safety verification |
| Generic service categories | Yes | "Personal care," "companionship," etc. |
| Specific care skills needed | No | Not collected |
| Health-related requirements | No | Not collected |
| Risk information | No | Not collected |
| Care receiver conditions | No | Not collected |
| Free-text care needs | No | Not available |

**GDPR Classification**

- **Special Category Data (Article 9)**: NO - No health data collected or inferable
- **Vulnerable Persons Data**: YES - Elderly users are inherently vulnerable
- **Standard Personal Data**: YES - Identity, contact, payment
- **Legal Basis**: Contract performance (Article 6(1)(b)) sufficient for all processing

**DPIA Requirements**

| Aspect | Assessment |
|--------|------------|
| DPIA Mandatory | YES - Processing data of vulnerable persons triggers DPIA |
| Complexity | LOW - No special category data; straightforward processing |
| Scope | Limited to identity verification, payments, basic matching |
| ICO Prior Consultation Risk | VERY LOW - Minimal residual risk expected |
| Estimated Completion Time | 2-3 weeks |
| Approach | ICO template with internal completion feasible |

**Financial Costs**

| Cost Item | One-Time | Annual Ongoing | Notes |
|-----------|----------|----------------|-------|
| DPIA Completion | 2,000-4,000 GBP | - | Can be done in-house with template or light consultant review |
| Privacy Policy | 1,500-2,500 GBP | - | Standard e-commerce style policy |
| Cookie/Consent Implementation | 500-1,000 GBP | - | Standard consent banner |
| Fractional DPO | - | 3,000-6,000 GBP | Optional - could be handled internally |
| ICO Registration | 40-60 GBP | 40-60 GBP | Tier 1 fee (micro organization) |
| Annual Compliance Review | - | 500-1,000 GBP | Light touch review |
| **TOTAL YEAR 1** | **4,000-8,000 GBP** | - | Excluding optional DPO |

**Regulatory Risk**

| Risk Factor | Level | Rationale |
|-------------|-------|-----------|
| ICO Enforcement Risk | LOW | No special category data; standard processing |
| Data Breach Impact | MODERATE | Vulnerable users, but no health data exposed |
| Complaint Risk | LOW | Limited personal data processing |
| Audit Complexity | LOW | Simple data flows, clear purposes |

**Product Functionality Impact**

| Capability | Status | Impact |
|------------|--------|--------|
| Basic caregiver search | ENABLED | By location, availability, service type |
| Skill-based matching | DISABLED | Cannot match on specific care skills |
| Care needs assessment | DISABLED | No care requirement collection |
| Caregiver suitability indication | LIMITED | Generic categories only |
| Safety matching (e.g., dementia experience) | DISABLED | Cannot ensure caregiver capability fit |
| Repeat booking optimization | LIMITED | No preference learning |
| Quality differentiation | LIMITED | Reviews and ratings only |

**Competitive Positioning**

- **Market Position**: Commodity marketplace; competing on price and convenience
- **Differentiation**: Very limited - similar to Gumtree/Facebook for care
- **User Expectations**: May frustrate care receivers with complex needs who cannot specify requirements
- **Trust Level**: Lower - platform cannot demonstrate understanding of care complexity
- **Professional Caregiver Attraction**: May attract less specialized caregivers; specialists may prefer platforms that showcase their skills

**Scalability**

| Factor | Assessment |
|--------|------------|
| Geographic Expansion (UK) | EASY - No regional data complexity |
| Geographic Expansion (EU) | EASY - Standard GDPR applies; no special category complications |
| Geographic Expansion (International) | MODERATE - Standard data protection considerations |
| User Volume Scaling | EASY - Simple data model scales well |
| Feature Expansion | CONSTRAINED - Adding care-specific features requires tier upgrade |

**Legal Opinion Required**

NO - Standard e-commerce data processing. Internal legal review or template-based approach sufficient. Consider brief legal review (500-1,000 GBP) for privacy policy if no internal capability.

---

#### Tier 2: Low

**Business Model Description**

An introduction platform that enables skill-based matching using carefully framed "caregiver capability requirements" rather than care receiver health conditions. Care receivers specify what skills and experience they need in a caregiver (e.g., "needs caregiver with dementia experience," "needs caregiver with mobility assistance skills") without disclosing their own conditions. This is the founder's preferred approach as expressed in the data minimization direction.

**Data Collection Scope**

| Data Category | Collected | Notes |
|---------------|-----------|-------|
| Identity data (name, email, phone) | Yes | Standard account data |
| Location/address | Yes | For matching and service delivery |
| Payment details | Yes | Processed via payment provider |
| DBS check status | Yes | Safety verification |
| Generic service categories | Yes | "Personal care," "companionship," etc. |
| Caregiver skill requirements | Yes | "Needs dementia experience," "needs mobility skills" |
| Caregiver certifications | Yes | Hoisting, medication, first aid |
| Health-related requirements | Indirect | Skill requirements may imply health status |
| Risk information | Limited | Safety-critical only (with explicit consent) |
| Care receiver conditions | No | Not directly collected |
| Free-text care needs | Yes | With guidance to use skill-based language |

**GDPR Classification**

- **Special Category Data (Article 9)**: UNCERTAIN - ICO guidance suggests data from which health status "can be reasonably inferred" may constitute health data. Requesting "dementia experience" likely implies care receiver has dementia.
- **Vulnerable Persons Data**: YES - Elderly users are inherently vulnerable
- **Standard Personal Data**: YES - Identity, contact, payment, preferences
- **Legal Basis**:
  - Contract performance (Article 6(1)(b)) for standard data
  - Explicit consent (Article 9(2)(a)) recommended as precaution for skill requirements that may infer health

**DPIA Requirements**

| Aspect | Assessment |
|--------|------------|
| DPIA Mandatory | YES - Vulnerable persons + possible special category inference |
| Complexity | LOW-MEDIUM - Uncertainty around health inference requires careful analysis |
| Scope | Identity, payments, matching algorithm, skill requirements, messaging |
| ICO Prior Consultation Risk | LOW - Data minimization approach should satisfy; document reasoning |
| Estimated Completion Time | 3-4 weeks |
| Approach | External consultant recommended for legal interpretation of inference question |

**Financial Costs**

| Cost Item | One-Time | Annual Ongoing | Notes |
|-----------|----------|----------------|-------|
| DPIA Completion | 5,000-8,000 GBP | - | External consultant recommended |
| Legal Opinion (Inference Question) | 2,000-4,000 GBP | - | Critical for classification certainty |
| Privacy Policy | 2,000-3,500 GBP | - | Requires care sector expertise |
| Cookie/Consent Implementation | 1,000-1,500 GBP | - | Layered consent for skill data |
| Fractional DPO | - | 6,000-12,000 GBP | Recommended - ongoing guidance |
| ICO Registration | 40-60 GBP | 40-60 GBP | Tier 1 fee initially |
| Annual Compliance Review | - | 2,000-3,000 GBP | Review of processing, policy updates |
| **TOTAL YEAR 1** | **16,000-30,000 GBP** | - | Including DPO |

**Regulatory Risk**

| Risk Factor | Level | Rationale |
|-------------|-------|-----------|
| ICO Enforcement Risk | LOW-MODERATE | Data minimization is positive; inference question creates some uncertainty |
| Data Breach Impact | MODERATE-HIGH | Skill requirements could reveal health status if breached |
| Complaint Risk | LOW-MODERATE | Users may not understand what data reveals about them |
| Audit Complexity | MODERATE | Must justify inference classification decision |

**Product Functionality Impact**

| Capability | Status | Impact |
|------------|--------|--------|
| Basic caregiver search | ENABLED | Full functionality |
| Skill-based matching | ENABLED | Core differentiator - match on caregiver capabilities |
| Care needs assessment | PARTIAL | Framed as "what skills do you need" not "what conditions do you have" |
| Caregiver suitability indication | ENABLED | Caregivers can indicate skill areas |
| Safety matching | ENABLED | Can match dementia, mobility, etc. via skill framing |
| Repeat booking optimization | ENABLED | Stored skill preferences enable optimization |
| Quality differentiation | ENABLED | Skill specialization visible |

**Competitive Positioning**

- **Market Position**: Differentiated care marketplace; competing on match quality
- **Differentiation**: Strong - skill-based matching is meaningful to care seekers
- **User Expectations**: Meets expectations for finding appropriately skilled caregivers
- **Trust Level**: Moderate-High - platform demonstrates care sector understanding
- **Professional Caregiver Attraction**: Attracts specialists who want to showcase expertise

**Scalability**

| Factor | Assessment |
|--------|------------|
| Geographic Expansion (UK) | EASY - Consistent approach across UK |
| Geographic Expansion (EU) | MODERATE - Same GDPR applies; inference interpretation may vary by DPA |
| Geographic Expansion (International) | MODERATE - Must assess local interpretation of health data inference |
| User Volume Scaling | EASY - Skill taxonomy scales well |
| Feature Expansion | FLEXIBLE - Can add more skills without tier change; health data would require Tier 3+ |

**Legal Opinion Required**

YES - Specifically needed on the question: "Does collecting caregiver skill requirements (e.g., 'dementia experience needed') constitute processing of special category health data under GDPR Article 9 because it allows inference of the care receiver's health status?"

This opinion will determine:
1. Whether Article 9 explicit consent is required
2. How the DPIA should classify this processing
3. What the privacy notice must disclose
4. Breach notification implications

Estimated cost: 2,000-4,000 GBP for focused legal opinion from data protection specialist.

---

#### Tier 3: Medium

**Business Model Description**

A care marketplace that collects structured care requirement data beyond skill framing, including specific care needs categories, care intensity levels, and optional health context. This enables more precise matching and care continuity features. Care receivers can optionally provide more detail about their situation to improve matching, with clear consent at each level.

**Data Collection Scope**

| Data Category | Collected | Notes |
|---------------|-----------|-------|
| Identity data (name, email, phone) | Yes | Standard account data |
| Location/address | Yes | For matching and service delivery |
| Payment details | Yes | Processed via payment provider |
| DBS check status | Yes | Safety verification |
| Generic service categories | Yes | "Personal care," "companionship," etc. |
| Caregiver skill requirements | Yes | Full skill taxonomy |
| Care needs categories | Yes | Structured (mobility, cognition, personal care, etc.) |
| Care intensity indicators | Yes | "Light support," "full assistance," etc. |
| Risk indicators | Yes | Falls risk, challenging behaviors, etc. |
| Emergency health info | Optional | Allergies, emergency conditions |
| Condition categories | Optional | With explicit consent (not required for matching) |
| Care plan summary | Optional | Upload capability with consent |
| Free-text care needs | Yes | Less restricted |

**GDPR Classification**

- **Special Category Data (Article 9)**: YES - Care intensity, risk indicators, and optional condition data are clearly health data
- **Vulnerable Persons Data**: YES - Elderly users are inherently vulnerable
- **Standard Personal Data**: YES - Identity, contact, payment, preferences
- **Legal Basis**:
  - Contract performance (Article 6(1)(b)) for standard data
  - Explicit consent (Article 9(2)(a)) required for all health-related fields
  - Consent must be granular, informed, and withdrawable

**DPIA Requirements**

| Aspect | Assessment |
|--------|------------|
| DPIA Mandatory | YES - Special category data + vulnerable persons + systematic profiling |
| Complexity | MEDIUM-HIGH - Multiple data categories; consent layering; data flows to caregivers |
| Scope | Full processing inventory; consent mechanisms; data sharing with caregivers; retention; breach procedures |
| ICO Prior Consultation Risk | MODERATE - Depends on residual risk after mitigations; may not be required if well-controlled |
| Estimated Completion Time | 4-6 weeks |
| Approach | External DPO/consultant essential; consider specialized health data consultancy |

**Financial Costs**

| Cost Item | One-Time | Annual Ongoing | Notes |
|-----------|----------|----------------|-------|
| DPIA Completion | 8,000-15,000 GBP | - | Specialized consultant required |
| Legal Opinion | 3,000-6,000 GBP | - | Health data processing confirmation |
| Privacy Policy | 3,500-5,000 GBP | - | Complex layered policy |
| Consent Architecture | 3,000-5,000 GBP | - | Granular consent UX implementation |
| Cookie/Consent Implementation | 1,500-2,500 GBP | - | Advanced consent management |
| Fractional DPO | - | 12,000-18,000 GBP | Essential - ongoing health data guidance |
| ICO Registration | 60-2,900 GBP | 60-2,900 GBP | Tier 2/3 depending on scale |
| Annual DPIA Review | - | 3,000-5,000 GBP | Required when processing changes |
| Data Subject Request Handling | - | 2,000-4,000 GBP | Higher volume expected |
| **TOTAL YEAR 1** | **35,000-60,000 GBP** | - | Including DPO and infrastructure |

**Regulatory Risk**

| Risk Factor | Level | Rationale |
|-------------|-------|-----------|
| ICO Enforcement Risk | MODERATE | Special category processing attracts scrutiny; must demonstrate robust controls |
| Data Breach Impact | HIGH | Health data breach requires ICO notification within 72 hours; reputational damage |
| Complaint Risk | MODERATE | Users may have concerns about health data handling |
| Audit Complexity | HIGH | Full data inventory, consent records, processing logs required |

**Product Functionality Impact**

| Capability | Status | Impact |
|------------|--------|--------|
| Basic caregiver search | ENABLED | Full functionality |
| Skill-based matching | ENABLED | Full functionality |
| Care needs assessment | ENABLED | Structured assessment with categories and intensity |
| Caregiver suitability indication | ENHANCED | Rich matching on care complexity |
| Safety matching | ENHANCED | Full risk factor matching |
| Repeat booking optimization | ENHANCED | Full preference and history learning |
| Quality differentiation | ENHANCED | Outcome tracking possible |
| Care continuity features | ENABLED | Handover notes, care preferences |
| Emergency information | ENABLED | Critical safety information available |

**Competitive Positioning**

- **Market Position**: Premium care marketplace; competing on quality, safety, and continuity
- **Differentiation**: Very strong - comprehensive matching rivals agency quality
- **User Expectations**: Exceeds expectations; professional-grade care coordination
- **Trust Level**: High - platform demonstrates serious commitment to care quality
- **Professional Caregiver Attraction**: Attracts high-quality caregivers who want rich context

**Scalability**

| Factor | Assessment |
|--------|------------|
| Geographic Expansion (UK) | MODERATE - Consistent but complex compliance |
| Geographic Expansion (EU) | COMPLEX - DPA variations in health data interpretation |
| Geographic Expansion (International) | COMPLEX - Health data laws vary significantly |
| User Volume Scaling | MODERATE - More data per user; consent management complexity |
| Feature Expansion | FLEXIBLE - Framework supports additional care features |

**Legal Opinion Required**

YES - Multiple opinions likely needed:
1. Special category data handling confirmation (2,000-4,000 GBP)
2. Consent architecture review (1,500-2,500 GBP)
3. Data sharing with caregivers (independent controllers) (1,500-2,500 GBP)
4. Data retention policy for care history (1,000-2,000 GBP)

Total legal investment: 6,000-11,000 GBP

---

#### Tier 4: High

**Business Model Description**

A comprehensive care platform that handles detailed health information, integrates with NHS/clinical systems, supports care planning, and provides care management features. This approaches (but does not cross into) regulated care provision. The platform becomes a care coordination hub, not just an introduction service.

**WARNING**: This tier significantly changes the business model and may trigger additional regulatory requirements beyond DPIA. CQC implications should be reassessed if this tier is selected.

**Data Collection Scope**

| Data Category | Collected | Notes |
|---------------|-----------|-------|
| All Tier 3 data | Yes | Full Tier 3 collection |
| Detailed health conditions | Yes | Named diagnoses with consent |
| Condition severity | Yes | Clinical severity indicators |
| Medication information | Yes | Current medications, times, dosages |
| Clinical care plan | Yes | Upload or structured entry |
| GP/Healthcare provider details | Yes | For coordination |
| Hospital discharge summaries | Optional | Post-discharge care coordination |
| Daily care logs | Yes | Care delivery documentation |
| Health observations | Yes | Weight, mood, incidents |
| Family/NOK health communications | Yes | Multi-party health discussions |

**GDPR Classification**

- **Special Category Data (Article 9)**: YES - Extensive health data processing at scale
- **Vulnerable Persons Data**: YES - Elderly users are inherently vulnerable
- **Standard Personal Data**: YES - Identity, contact, payment, preferences
- **Legal Basis**:
  - Explicit consent (Article 9(2)(a)) for all health data
  - Consider Article 9(2)(h) "health care provision" - but platform is NOT a health care provider
  - Data Processing Agreements with caregivers essential
  - Consider joint controller arrangements

**DPIA Requirements**

| Aspect | Assessment |
|--------|------------|
| DPIA Mandatory | YES - All triggers present |
| Complexity | HIGH - Extensive health data; multiple parties; care delivery tracking; clinical integrations |
| Scope | Full processing inventory; all data flows; caregiver obligations; retention; breach; access controls; encryption |
| ICO Prior Consultation Risk | HIGH - Likely required given scale and sensitivity of processing |
| Estimated Completion Time | 6-10 weeks (excluding ICO consultation) |
| ICO Consultation Time | 4-8 additional weeks if required |
| Approach | Specialist law firm recommended; health data governance expertise essential |

**Financial Costs**

| Cost Item | One-Time | Annual Ongoing | Notes |
|-----------|----------|----------------|-------|
| DPIA Completion | 15,000-25,000 GBP | - | Specialist law firm recommended |
| Legal Framework | 10,000-20,000 GBP | - | Contracts, DPAs, policies |
| Privacy Architecture | 8,000-12,000 GBP | - | Complex consent, access controls |
| Consent Management Platform | 5,000-10,000 GBP | 2,000-4,000 GBP | Enterprise consent tooling |
| Security Assessment | 5,000-10,000 GBP | 3,000-5,000 GBP | Penetration testing, audits |
| Fractional DPO | - | 18,000-30,000 GBP | Senior DPO required |
| ICO Registration | 2,900 GBP | 2,900 GBP | Tier 3 fee (health data) |
| ICO Prior Consultation | 0 GBP | - | No fee but significant time cost |
| Annual DPIA Review | - | 5,000-8,000 GBP | Required annually |
| Data Subject Requests | - | 5,000-10,000 GBP | Complex SAR handling |
| Incident Response Retainer | - | 3,000-5,000 GBP | Breach response capability |
| **TOTAL YEAR 1** | **80,000-140,000 GBP** | - | Full compliance infrastructure |

**Regulatory Risk**

| Risk Factor | Level | Rationale |
|-------------|-------|-----------|
| ICO Enforcement Risk | HIGH | Large-scale health data processing; regulatory spotlight on health tech |
| Data Breach Impact | VERY HIGH | Clinical data breach is serious; mandatory notification; likely media coverage |
| Complaint Risk | HIGH | Health data handling generates complaints |
| Audit Complexity | VERY HIGH | Full data governance framework required |
| CQC Trigger Risk | MODERATE | Extensive care coordination may trigger CQC scrutiny |

**Product Functionality Impact**

| Capability | Status | Impact |
|------------|--------|--------|
| All Tier 3 capabilities | ENABLED | Full Tier 3 functionality |
| Clinical care coordination | ENABLED | Full care plan support |
| Medication management | ENABLED | Prompts, tracking, documentation |
| Health monitoring | ENABLED | Observations, trends, alerts |
| Family portal | ENABLED | Multi-party care coordination |
| Care documentation | ENABLED | Daily logs, incidents, handovers |
| Clinical integrations | POSSIBLE | NHS API integration potential |
| Outcome tracking | ENABLED | Quality metrics, care outcomes |

**Competitive Positioning**

- **Market Position**: Care technology platform; competing with care management software
- **Differentiation**: Maximum - comprehensive care coordination rivals agency + care management
- **User Expectations**: Exceeds all expectations; enterprise-grade care platform
- **Trust Level**: Very High - platform positioned as care technology leader
- **Professional Caregiver Attraction**: Attracts caregivers seeking professional tools
- **Strategic Risk**: Blurs line between introduction agency and care provider

**Scalability**

| Factor | Assessment |
|--------|------------|
| Geographic Expansion (UK) | COMPLEX - Health data adds significant compliance overhead |
| Geographic Expansion (EU) | VERY COMPLEX - Health data regulations vary; some countries more restrictive |
| Geographic Expansion (International) | VERY COMPLEX - Many jurisdictions have specific health data laws |
| User Volume Scaling | COMPLEX - Data volume, consent management, access controls |
| Feature Expansion | OPEN - Full capability framework |

**Legal Opinion Required**

YES - Comprehensive legal framework required:
1. DPIA and compliance framework (included in law firm engagement)
2. Data controller/processor analysis for all parties
3. Data Processing Agreements suite
4. Cross-border data transfer assessment
5. Retention and destruction policies
6. Breach notification procedures
7. Subject access request procedures
8. CQC regulatory boundary analysis

Total legal investment: 20,000-40,000 GBP (integrated with DPIA)

---

### Strategic Decision Matrix Summary

| Factor | Tier 1: Minimal | Tier 2: Low | Tier 3: Medium | Tier 4: High |
|--------|-----------------|-------------|----------------|--------------|
| **Data Approach** | Generic categories only | Skill-based (founder direction) | Structured care needs | Full health data |
| **GDPR Article 9** | No | Uncertain (legal opinion) | Yes | Yes (extensive) |
| **DPIA Complexity** | Low | Low-Medium | Medium-High | High |
| **Year 1 Cost** | 4,000-8,000 GBP | 16,000-30,000 GBP | 35,000-60,000 GBP | 80,000-140,000 GBP |
| **ICO Consultation** | Very Unlikely | Unlikely | Possible | Likely |
| **Matching Quality** | Basic | Good | Excellent | Comprehensive |
| **Competitive Position** | Commodity | Differentiated | Premium | Platform/Leader |
| **Regulatory Risk** | Low | Low-Moderate | Moderate | High |
| **Legal Opinion** | Optional | Required | Required | Extensive |
| **Scaling Complexity** | Low | Low-Moderate | Moderate | High |

---

### Cost Breakdown: In-House vs External

This section provides practical guidance for founders making budget decisions about DPIA compliance. For each tier, we detail what work can realistically be done internally versus what requires professional expertise, where hybrid approaches can reduce costs, and critically, where attempting to save money creates unacceptable legal risk.

**Key Principles**:
- ICO provides free DPIA templates and extensive guidance - these are genuinely usable for simpler scenarios
- Founders with strong attention to detail CAN complete basic DPIAs internally
- Processing vulnerable adult data (elderly care) inherently increases complexity
- Legal opinions on GDPR classification should NEVER be done in-house
- The cost of getting it wrong (ICO enforcement, breach liability) far exceeds compliance investment

---

#### Tier 1 (Minimal): Cost Breakdown

**In-House Feasibility: HIGH**

This tier is the most suitable for founder-led compliance work. Generic service categories without health data inference create a straightforward DPIA scenario.

**In-House Costs**

| Task/Activity | Time Commitment | Skills Required | Feasibility |
|---------------|-----------------|-----------------|-------------|
| ICO DPIA template completion | 15-25 hours | Strong written English, attention to detail, ability to follow structured guidance | HIGH - Template is comprehensive and well-documented |
| Data mapping (what data, where stored, who accesses) | 8-12 hours | Understanding of own systems and data flows | HIGH - Founder knows own business |
| Risk assessment completion | 5-8 hours | Logical thinking, honest self-assessment | HIGH - ICO template guides this |
| Privacy policy first draft | 10-15 hours | Clear writing, legal template adaptation | MODERATE - Templates widely available |
| Cookie consent implementation | 5-10 hours (technical) | Basic web development or CMS skills | MODERATE - Many plug-and-play solutions |
| ICO registration | 1-2 hours | Online form completion | HIGH - Straightforward process |
| **TOTAL IN-HOUSE TIME** | **45-70 hours** | | |

**When In-House is Feasible**:
- Founder has 50+ hours available over 4-6 weeks
- Founder is comfortable reading and interpreting regulatory guidance
- No special category (health) data is processed
- Data flows are simple and well-understood
- Founder accepts responsibility for compliance accuracy

**When In-House is NOT Feasible**:
- Time-critical launch requiring faster completion
- Founder uncertainty about data classification
- Complex data flows involving multiple parties
- Any doubt about whether processing triggers Article 9

**External Costs**

| Service | Cost Range | When Required |
|---------|------------|---------------|
| DPIA consultant review (of founder-completed DPIA) | 1,000-2,000 GBP | RECOMMENDED - Expert validation reduces risk |
| Privacy policy legal review | 500-1,000 GBP | RECOMMENDED - Low cost for peace of mind |
| GDPR solicitor (full engagement) | 3,000-5,000 GBP | Only if founder cannot complete in-house |
| Fractional DPO (ongoing) | 250-500 GBP/month | OPTIONAL at this tier - can handle internally |
| ICO registration fee | 40-60 GBP | MANDATORY |
| Technical security assessment | 500-1,000 GBP | OPTIONAL - Standard web security practices sufficient |

**Hybrid Approach: Maximum Cost Savings**

| Founder Does | External Does | Cost Saved |
|--------------|---------------|------------|
| Complete DPIA using ICO template | Consultant reviews and validates | Save 2,000-3,000 GBP vs full external DPIA |
| Draft privacy policy from template | Solicitor reviews and finalizes | Save 1,000-1,500 GBP vs full drafting |
| Document data flows and purposes | Consultant validates completeness | Save 500-1,000 GBP on discovery |
| Implement cookie consent (technical) | External validates compliance | Save 500-1,000 GBP on implementation |

**Cost Summary Table: Tier 1**

| Approach | In-House Cost | External Cost | Total Cost | Founder Time |
|----------|---------------|---------------|------------|--------------|
| **Full In-House** | Staff time only | 40-60 GBP (ICO fee) | 40-60 GBP | 50-70 hours |
| **Hybrid (Recommended)** | Staff time | 1,500-3,000 GBP | 1,500-3,000 GBP | 45-60 hours |
| **Full External** | Minimal | 4,000-8,000 GBP | 4,000-8,000 GBP | 5-10 hours |

**Recommended Approach**: Hybrid - Founder completes DPIA using ICO template, engages consultant for 2-3 hour review session (500-1,000 GBP), solicitor reviews privacy policy (500-1,000 GBP). Total: 1,500-2,500 GBP plus founder time.

**Risk of Excessive In-House Work**: LOW at this tier. However, if ANY uncertainty exists about whether data could infer health status, escalate to Tier 2 approach immediately.

---

#### Tier 2 (Low): Cost Breakdown

**In-House Feasibility: MODERATE**

The skill-based approach (founder's preferred direction) creates uncertainty around GDPR Article 9 classification. This single factor changes the compliance picture significantly.

**Critical Constraint**: The legal question "Does requesting 'dementia experience' constitute health data by inference?" CANNOT be answered in-house. This requires professional legal opinion regardless of founder capability.

**In-House Costs**

| Task/Activity | Time Commitment | Skills Required | Feasibility |
|---------------|-----------------|-----------------|-------------|
| ICO DPIA template completion | 20-35 hours | Strong written English, attention to detail | MODERATE - More complex scenarios require more careful documentation |
| Data mapping | 10-15 hours | Understanding of own systems | HIGH - Founder knows own business |
| Skill taxonomy documentation | 8-12 hours | Care sector understanding | HIGH - Founder defines own categories |
| Risk assessment completion | 10-15 hours | Logical thinking, regulatory awareness | MODERATE - More judgment required |
| Consent flow documentation | 5-8 hours | UX understanding, legal awareness | MODERATE - Must understand layered consent |
| Privacy policy first draft | 12-18 hours | Clear writing, care sector awareness | MODERATE - More complex than Tier 1 |
| Cookie/consent implementation | 8-15 hours (technical) | Web development skills | MODERATE - Layered consent more complex |
| ICO registration | 1-2 hours | Online form completion | HIGH |
| **TOTAL IN-HOUSE TIME** | **75-120 hours** | | |

**When In-House is Feasible** (for components, not entire compliance):
- Founder can dedicate 80+ hours over 6-8 weeks
- Founder has care sector knowledge to define skill taxonomies
- Founder accepts that legal opinion is still mandatory
- Technical capability exists for consent implementation

**When In-House is NOT Feasible**:
- Legal classification opinion - NEVER in-house
- Assessment of ICO enforcement risk - requires expertise
- Data sharing agreements with caregivers - legal drafting required
- Any processing involving explicit health conditions

**External Costs**

| Service | Cost Range | When Required |
|---------|------------|---------------|
| **Legal opinion on inference question** | 2,000-4,000 GBP | **MANDATORY** - Cannot proceed without this |
| DPIA consultant (full engagement) | 5,000-8,000 GBP | RECOMMENDED - Complexity warrants expertise |
| DPIA consultant (review only) | 2,000-3,500 GBP | Alternative if founder completes template |
| Privacy policy drafting | 2,000-3,500 GBP | RECOMMENDED - Care sector specificity needed |
| Privacy policy review (of founder draft) | 1,000-1,500 GBP | Alternative - still needs legal input |
| Consent architecture design | 1,500-2,500 GBP | RECOMMENDED - Layered consent requires expertise |
| Fractional DPO | 500-1,000 GBP/month | RECOMMENDED - Ongoing guidance valuable |
| ICO registration fee | 40-60 GBP | MANDATORY |
| Technical security assessment | 1,000-2,000 GBP | RECOMMENDED - Vulnerable user data warrants review |

**Hybrid Approach: Cost Savings with Appropriate Expertise**

| Founder Does | External Does | Cost Saved | Risk Level |
|--------------|---------------|------------|------------|
| Complete DPIA template sections | Consultant reviews, completes complex sections | Save 2,000-4,000 GBP | LOW - Expertise applied where needed |
| Document all data flows thoroughly | Legal validates classification | Save 1,000-2,000 GBP on discovery | LOW |
| Draft privacy policy sections | Solicitor reviews and completes | Save 1,000-1,500 GBP | LOW |
| Design consent UX mockups | Legal validates consent language | Save 500-1,000 GBP | LOW |
| Research DPO providers | DPO advises on selection | Save 500 GBP | NONE |

**What NOT to Do In-House (Non-Negotiable)**

| Task | Why External Required | Risk of In-House |
|------|----------------------|------------------|
| Legal opinion on Article 9 classification | Requires qualified solicitor interpretation of ICO guidance and case law | ICO enforcement, invalid consent, breach liability |
| Assessment of inference risk | Requires data protection expertise and regulatory awareness | Under/over-estimation leads to non-compliance or over-engineering |
| Data Processing Agreement drafting | Legal document establishing controller relationships | Incorrect liability allocation, breach exposure |
| Consent validity assessment | Legal determination of informed consent requirements | Invalid consent = unlawful processing |

**Cost Summary Table: Tier 2**

| Approach | In-House Cost | External Cost | Total Cost | Founder Time |
|----------|---------------|---------------|------------|--------------|
| **Maximum In-House** | Staff time | 6,000-10,000 GBP (legal opinion + review) | 6,000-10,000 GBP | 80-120 hours |
| **Hybrid (Recommended)** | Staff time | 10,000-16,000 GBP | 10,000-16,000 GBP | 40-60 hours |
| **Full External** | Minimal | 16,000-30,000 GBP | 16,000-30,000 GBP | 10-15 hours |

**Recommended Approach**: Hybrid - Founder completes data mapping and DPIA template sections, documents skill taxonomy and business rationale. Engage legal counsel for opinion (2,500-3,500 GBP), DPIA consultant for review and completion (3,000-5,000 GBP), privacy policy legal review (1,500-2,000 GBP), fractional DPO for ongoing support (6,000-9,000 GBP/year). Total Year 1: 13,000-20,000 GBP.

**Risk of Excessive In-House Work**: MODERATE. The legal classification question creates a hard boundary. Attempting to self-assess whether skill-based data constitutes health data is not a cost-saving - it is a compliance failure waiting to happen. The 2,000-4,000 GBP legal opinion is mandatory, not optional.

---

#### Tier 3 (Medium): Cost Breakdown

**In-House Feasibility: LOW**

Once structured care needs data, risk indicators, and optional health context are collected, the compliance requirements exceed reasonable in-house capability for most startups.

**Critical Constraints**:
- Special category data (Article 9) is definitively processed
- Explicit consent architecture requires legal validation
- Multiple data categories require layered policies
- Caregiver data sharing requires formal agreements
- ICO prior consultation becomes possible

**In-House Costs**

| Task/Activity | Time Commitment | Skills Required | Feasibility |
|---------------|-----------------|-----------------|-------------|
| Data inventory documentation | 15-25 hours | Systematic documentation skills | HIGH - Founder knows own data |
| Business process documentation | 10-15 hours | Process mapping ability | HIGH |
| Risk register initial draft | 8-12 hours | Risk identification skills | MODERATE - Requires regulatory awareness |
| User journey documentation | 8-12 hours | UX documentation | HIGH |
| Consent flow wireframes | 10-15 hours | UX design capability | MODERATE |
| Policy drafts (very rough) | 15-20 hours | Writing skills | LOW VALUE - Will require substantial revision |
| Vendor/processor inventory | 5-8 hours | Knowledge of own suppliers | HIGH |
| **TOTAL IN-HOUSE TIME** | **70-105 hours** | | |

**When In-House is Feasible** (preparatory work only):
- Founder has 70+ hours available before consultant engagement
- Goal is to reduce consultant discovery time, not replace expertise
- Founder accepts all legal/compliance determinations require external validation

**When In-House is NOT Feasible** (most compliance work):
- DPIA completion - complexity requires specialist
- Legal basis determination - requires qualified opinion
- Consent architecture - requires legal validation
- Data sharing agreements - requires legal drafting
- Policy drafting - requires care sector legal expertise
- Risk assessment - requires regulatory expertise

**External Costs**

| Service | Cost Range | When Required |
|---------|------------|---------------|
| **DPIA specialist consultant** | 8,000-15,000 GBP | **MANDATORY** - Complexity requires expertise |
| **Legal opinion (health data)** | 3,000-6,000 GBP | **MANDATORY** - Article 9 confirmation |
| **Consent architecture legal review** | 1,500-2,500 GBP | **MANDATORY** - Consent validity critical |
| **Data sharing agreements suite** | 2,000-4,000 GBP | **MANDATORY** - Caregiver data sharing |
| Privacy policy drafting | 3,500-5,000 GBP | MANDATORY - Complex layered policy |
| Fractional DPO (senior) | 1,000-1,500 GBP/month | STRONGLY RECOMMENDED |
| ICO registration fee | 60-2,900 GBP | MANDATORY (tier depends on scale) |
| Technical security assessment | 2,000-4,000 GBP | RECOMMENDED - Health data warrants review |
| Penetration testing | 2,000-5,000 GBP | RECOMMENDED |
| Annual DPIA review budget | 3,000-5,000 GBP/year | MANDATORY if processing changes |

**Hybrid Approach: Reduce Consultant Time**

| Founder Does | External Does | Cost Saved | Risk Level |
|--------------|---------------|------------|------------|
| Complete data inventory before engagement | Consultant validates and analyzes | Save 1,500-3,000 GBP on discovery | LOW |
| Document all business processes | Consultant maps to GDPR requirements | Save 1,000-2,000 GBP | LOW |
| Create user journey documentation | Consultant identifies consent points | Save 500-1,000 GBP | LOW |
| Compile vendor/processor list | Consultant assesses agreements needed | Save 500-1,000 GBP | LOW |
| Draft FAQ responses | Legal refines for accuracy | Save 500 GBP | LOW |
| **Total Potential Savings** | | **4,000-7,500 GBP** | |

**What NOT to Do In-House (Firm Boundaries)**

| Task | Why External Required | Risk of In-House |
|------|----------------------|------------------|
| DPIA risk assessment | Requires regulatory expertise and precedent knowledge | Under-assessment leads to ICO consultation requirement being missed |
| Article 9 legal basis selection | Requires qualified legal opinion | Wrong basis = unlawful processing |
| Consent wording | Requires legal validation for informed consent | Invalid consent = unlawful processing |
| Data retention periods | Requires legal/regulatory justification | Over/under-retention both create liability |
| Breach notification procedures | Requires understanding of 72-hour ICO obligations | Failed notification = enforcement action |
| DPA drafting | Legal document with liability implications | Incorrect liability allocation |

**Cost Summary Table: Tier 3**

| Approach | In-House Cost | External Cost | Total Cost | Founder Time |
|----------|---------------|---------------|------------|--------------|
| **Maximum In-House Prep** | Staff time | 28,000-45,000 GBP | 28,000-45,000 GBP | 70-100 hours |
| **Standard External** | Minimal prep | 35,000-60,000 GBP | 35,000-60,000 GBP | 15-25 hours |

**Recommended Approach**: Maximum in-house preparation to reduce external costs. Founder invests 70-100 hours in documentation before engaging consultant. This reduces consultant discovery phase from 15-20 hours to 5-8 hours, saving approximately 3,000-6,000 GBP. Engage specialist DPIA consultant (10,000-13,000 GBP with prep discount), full legal suite (8,000-12,000 GBP), senior fractional DPO (12,000-18,000 GBP/year). Total Year 1: 30,000-45,000 GBP.

**Risk of Excessive In-House Work**: HIGH. At this tier, attempting to complete compliance work without appropriate expertise is not cost-saving - it is false economy. The cost of remediation after ICO inquiry or the liability from a health data breach far exceeds the professional fees. Budget should assume mandatory external engagement.

---

#### Tier 4 (High): Cost Breakdown

**In-House Feasibility: VERY LOW**

Comprehensive health data processing at scale requires enterprise-grade compliance infrastructure. This is not a startup DIY exercise.

**Critical Constraints**:
- Extensive special category data processing
- ICO prior consultation likely required
- Clinical-adjacent data handling
- Multiple controller/processor relationships
- Potential CQC boundary implications
- Enterprise security requirements

**In-House Costs**

| Task/Activity | Time Commitment | Skills Required | Feasibility |
|---------------|-----------------|-----------------|-------------|
| Comprehensive data inventory | 25-40 hours | Systematic documentation | HIGH - But this is prep work only |
| Business process documentation | 20-30 hours | Process mapping | HIGH - Prep work |
| Integration documentation | 15-25 hours | Technical understanding | HIGH - Prep work |
| Stakeholder mapping | 10-15 hours | Organizational knowledge | HIGH - Prep work |
| Historical decision documentation | 10-15 hours | Institutional knowledge | HIGH - Prep work |
| **TOTAL IN-HOUSE TIME** | **80-125 hours** | | Preparation only |

**When In-House is Feasible**: Only for preparatory documentation to support external engagement. No compliance determinations should be made internally at this tier.

**When In-House is NOT Feasible**: ALL compliance work. This tier requires specialist law firm engagement, not consultant-level support.

**External Costs**

| Service | Cost Range | When Required |
|---------|------------|---------------|
| **Specialist law firm (DPIA + framework)** | 15,000-25,000 GBP | **MANDATORY** |
| **Comprehensive legal framework** | 10,000-20,000 GBP | **MANDATORY** - Contracts, DPAs, policies |
| **Privacy architecture design** | 8,000-12,000 GBP | **MANDATORY** - Complex consent, access controls |
| **Consent management platform** | 5,000-10,000 GBP (setup) + 2,000-4,000 GBP/year | STRONGLY RECOMMENDED |
| **Security assessment (comprehensive)** | 5,000-10,000 GBP | **MANDATORY** - Health data requires it |
| **Penetration testing** | 3,000-6,000 GBP | **MANDATORY** |
| **Senior DPO** | 1,500-2,500 GBP/month | **MANDATORY** |
| ICO registration fee | 2,900 GBP | MANDATORY (Tier 3 fee) |
| ICO prior consultation preparation | Included in law firm | Likely required |
| Annual DPIA review | 5,000-8,000 GBP/year | MANDATORY |
| Incident response retainer | 3,000-5,000 GBP/year | STRONGLY RECOMMENDED |
| Annual security audit | 3,000-5,000 GBP/year | MANDATORY |

**Hybrid Approach: Limited Savings Possible**

| Founder Does | External Does | Cost Saved | Risk Level |
|--------------|---------------|------------|------------|
| Comprehensive data inventory | Law firm validates and classifies | Save 3,000-5,000 GBP on discovery | LOW |
| Process documentation | Law firm maps to requirements | Save 2,000-3,000 GBP | LOW |
| Integration documentation | Security team validates | Save 1,000-2,000 GBP | LOW |
| Vendor management | Legal reviews agreements | Save 1,000-2,000 GBP | LOW |
| **Total Potential Savings** | | **7,000-12,000 GBP** | |

**What NOT to Do In-House (Absolute Boundaries)**

At Tier 4, essentially ALL compliance decisions require external expertise. The only in-house value is documentation of your own business to reduce external discovery time. Do not attempt:
- Any DPIA sections beyond factual business description
- Any legal basis assessments
- Any risk assessments
- Any policy drafting
- Any security control decisions
- Any data retention determinations
- Any consent architecture design

**Cost Summary Table: Tier 4**

| Approach | In-House Cost | External Cost | Total Cost | Founder Time |
|----------|---------------|---------------|------------|--------------|
| **Maximum In-House Prep** | Staff time | 70,000-120,000 GBP | 70,000-120,000 GBP | 80-125 hours |
| **Standard External** | Minimal prep | 80,000-140,000 GBP | 80,000-140,000 GBP | 20-30 hours |

**Recommended Approach**: If selecting Tier 4, accept that this is an enterprise compliance exercise. Founder time is better spent on business development than attempting to reduce already-necessary external costs. Budget 80,000-120,000 GBP for Year 1 compliance infrastructure. Engage specialist law firm with health tech experience. This is not a startup-friendly cost structure - consider whether Tier 4 functionality is truly required before product-market fit is established.

**Risk of Excessive In-House Work**: VERY HIGH. At this tier, any attempt to reduce external costs through in-house work beyond basic documentation is likely to result in compliance failures. The potential liability from health data breaches, ICO enforcement, and regulatory non-compliance far exceeds the professional fees. If budget constraints make Tier 4 costs prohibitive, the answer is to select a lower tier, not to attempt Tier 4 compliance in-house.

---

#### DPO Options Across All Tiers

**Understanding DPO Requirements**

A Data Protection Officer (DPO) is mandatory under GDPR when:
- Processing is carried out by a public authority
- Core activities involve large-scale systematic monitoring
- Core activities involve large-scale processing of special category data

For an elderly care marketplace:
- **Tier 1**: DPO likely NOT mandatory (no special category data)
- **Tier 2**: DPO likely NOT mandatory (inference question, but not "large scale")
- **Tier 3**: DPO MAY be mandatory (special category data processing)
- **Tier 4**: DPO likely MANDATORY (large-scale health data processing)

**DPO Options Comparison**

| Option | Monthly Cost | Best For | Pros | Cons |
|--------|-------------|----------|------|------|
| **Internal (Founder)** | 0 GBP (time cost) | Tier 1 only | No cash cost | Time diversion; no expertise; independence questions |
| **Internal (Hired)** | 3,000-6,000 GBP | Tier 4 at scale | Full-time attention; deep business knowledge | High fixed cost; recruitment challenge; may lack breadth |
| **Fractional DPO (Basic)** | 250-500 GBP | Tier 1-2 | Low cost; professional expertise; independence | Limited hours; may not know business deeply |
| **Fractional DPO (Standard)** | 500-1,000 GBP | Tier 2-3 | Good balance; sufficient hours for most queries | May need additional support for complex issues |
| **Fractional DPO (Senior)** | 1,000-1,500 GBP | Tier 3 | Health sector expertise; regulatory relationships | Higher cost |
| **Fractional DPO (Specialist)** | 1,500-2,500 GBP | Tier 4 | Deep health data expertise; ICO experience | Significant cost; may still need legal support |

**When to Upgrade DPO Level**

| Trigger | Current Level | Upgrade To |
|---------|---------------|------------|
| First ICO inquiry | Basic | Standard or Senior |
| Data breach incident | Any | Senior (at least temporarily) |
| Adding health data collection | Basic/Standard | Senior |
| User base exceeds 10,000 | Basic | Standard |
| User base exceeds 50,000 | Standard | Senior or Internal |
| International expansion | Any | Senior with multi-jurisdiction experience |

---

#### Summary: Where Founders CAN and CANNOT Save Money

**Safe Cost Savings (Low Risk)**

| Activity | Tier Applicability | Savings Potential | How |
|----------|-------------------|-------------------|-----|
| Data inventory documentation | All tiers | 1,000-5,000 GBP | Thorough self-documentation before consultant engagement |
| Business process documentation | All tiers | 1,000-3,000 GBP | Clear process maps reduce discovery time |
| Privacy policy first draft | Tier 1-2 | 500-1,500 GBP | Use templates, get legal review only |
| Cookie consent implementation | Tier 1-2 | 500-1,000 GBP | Use established platforms (Cookiebot, OneTrust) |
| ICO template completion | Tier 1 only | 2,000-4,000 GBP | Full DIY with review |
| DPO provider research | All tiers | 500 GBP | Self-research, get recommendations |

**Dangerous Cost Savings (High Risk)**

| Activity | Why Dangerous | Potential Consequence |
|----------|---------------|----------------------|
| Self-assessing Article 9 classification | Legal interpretation required | Unlawful processing; ICO enforcement |
| Drafting consent wording without legal review | Consent validity is legal determination | Invalid consent = unlawful processing |
| Determining data retention periods | Requires legal/regulatory justification | Non-compliance with storage limitation |
| Skipping legal opinion on inference question | Central compliance question | Foundation of DPIA may be incorrect |
| DIY Data Processing Agreements | Legal contract with liability implications | Incorrect liability allocation |
| Underestimating tier complexity | Wishful thinking | Compliance failure discovered later |

**Decision Framework: When to Spend vs Save**

| Question | If Yes | If No |
|----------|--------|-------|
| Does this require interpreting GDPR/ICO guidance? | External required | May be in-house |
| Does this create legal liability? | External required | May be in-house |
| Does this involve special category data? | External required | May be in-house |
| Could getting this wrong result in ICO enforcement? | External required | May be in-house |
| Is this documenting facts about my own business? | In-house appropriate | N/A |
| Is this a legal document (contract, policy)? | External required | N/A |

---

### Recommendation: Tier 2 (Low) Aligns with Founder Decisions

Based on the founder's confirmed decisions and expressed preferences, **Tier 2 (Low)** is the recommended DPIA complexity level for the following reasons:

**Alignment with FDR-001 (Introduction Agency Model)**:
- Tier 2 maintains clear introduction agency positioning
- Does not require clinical data handling that might blur CQC boundaries
- Supports self-employed caregiver model with appropriate information sharing

**Alignment with FDR-002 (No CQC Registration)**:
- Tier 2 avoids care plan management and clinical documentation that could trigger CQC scrutiny
- Skill-based matching is clearly marketplace functionality, not care provision
- Risk indicators (if included) framed as caregiver preparation, not clinical assessment

**Alignment with Data Minimization Preference**:
- Tier 2 directly implements the founder's skill-based approach
- Avoids storing health conditions while enabling meaningful matching
- Represents deliberate data minimization that GDPR rewards

**Cost-Appropriate for Startup**:
- Year 1 investment of 16,000-30,000 GBP is reasonable for care sector startup
- Avoids Tier 3/4 costs that may be premature before product-market fit
- Legal opinion investment (2,000-4,000 GBP) provides clarity without over-engineering

**Competitive Viability**:
- Skill-based matching provides meaningful differentiation from classifieds
- Enables professional caregiver attraction through skill showcase
- Avoids commodity positioning of Tier 1

**Regulatory Pragmatism**:
- Data minimization is viewed favorably by ICO
- Uncertain Article 9 status is manageable with proper consent approach
- Low risk of ICO prior consultation requirement

**Scalability Preserved**:
- Clear upgrade path to Tier 3 if product-market fit proven
- UK expansion straightforward
- EU expansion feasible with consistent approach

**Recommended Next Steps for Tier 2**:

1. **Commission Legal Opinion** (Week 1-2): Engage data protection solicitor to opine on inference question. Budget: 2,000-4,000 GBP.

2. **Engage DPIA Consultant** (Week 2-3): Select consultant with care sector experience. Budget: 5,000-8,000 GBP.

3. **Complete DPIA** (Week 3-6): Document all processing, consent mechanisms, risk mitigations.

4. **Implement Consent Architecture** (Parallel): Design and build layered consent for skill requirements.

5. **Engage Fractional DPO** (Post-DPIA): Establish ongoing compliance support. Budget: 500-1,000 GBP/month.

6. **ICO Registration** (Pre-Launch): Register before processing begins. Fee: 40-60 GBP.

**Total Tier 2 Investment Estimate**: 20,000-28,000 GBP (Year 1, including ongoing DPO)

---

### Decision Required from Founder

Please confirm your preferred DPIA complexity tier:

**Option A**: Confirm Tier 2 (Low) as recommended
> "I confirm Tier 2 (skill-based approach with legal opinion on inference question) as the appropriate DPIA complexity level. Proceed with engaging legal counsel and DPIA consultant."

**Option B**: Select alternative tier with rationale
> "I prefer Tier [1/3/4] because [reason]. Please adjust the DPIA engagement plan accordingly."

**Option C**: Request additional analysis
> "Before deciding, I need clarification on [specific question]."

---

### Founder Response

**Response Date**: 2026-02-01

**Response Statement**:

> "Enter market via DPIA Tier 1 (Minimal) and progressively move through tiers as the business becomes financially viable."

**Response Category**: Tiered Progressive Entry - Start Minimal, Scale with Revenue

**Response Interpretation**: The founder has chosen a strategic phased approach:

1. **Start with Tier 1 (Minimal)**: Launch with companionship-only services, collecting no health-inferring data
2. **Progress through tiers as business validates**: Advance to higher tiers (more data collection, more features) as revenue and user metrics justify additional compliance investment
3. **Success-gated progression**: Each tier advancement requires meeting defined success metrics
4. **Minimum viable compliance**: At each tier, implement only the compliance requirements necessary for that tier's features

**Strategic Rationale Provided by Founder**:
- Reduces upfront investment risk before product-market fit validation
- Achieves faster time-to-market with Tier 1 compliance (4-6 weeks vs. 3-6 months)
- Aligns compliance investment with regulatory exposure (companionship < personal care < health data)
- Creates learning opportunities at each tier to inform subsequent investments
- Establishes market presence while building toward comprehensive offering

---

### Strategic Implications of Tiered Approach

#### 1. DPIA Scope by Tier

| Tier | Data Scope | DPIA Complexity | Estimated Cost | Timeline |
|------|------------|-----------------|----------------|----------|
| **Tier 1** | Standard personal data only | LOW | 2,000-4,000 GBP | 1-2 weeks |
| **Tier 2** | Skill-based data (inference possible) | MEDIUM | 5,000-8,000 GBP | 2-3 weeks |
| **Tier 3** | Special category with explicit consent | HIGH | 10,000-15,000 GBP | 4-6 weeks |
| **Tier 4** | Full health data and care plans | COMPREHENSIVE | 15,000-25,000 GBP | 6-8 weeks |

#### 2. Feature Availability by Tier

| Feature | Tier 1 | Tier 2 | Tier 3 | Tier 4 |
|---------|--------|--------|--------|--------|
| Companionship matching | Yes | Yes | Yes | Yes |
| Personal care services | No | Yes | Yes | Yes |
| Skill-based filtering | No | Yes | Yes | Yes |
| DBS verification | Voluntary | Mandatory | Mandatory | Mandatory |
| Condition-specific matching | No | No | Yes | Yes |
| Live-in care | No | No | Yes | Yes |
| Care coordination | No | No | No | Yes |

#### 3. Progression Criteria

**Tier 1 to Tier 2** (Month 6 Gate):
- 500+ Monthly Active Users
- 100+ Completed Bookings/month
- 5,000+ GBP Monthly Revenue
- 20%+ Demand for Personal Care

**Tier 2 to Tier 3** (Month 12 Gate):
- 2,000+ Monthly Active Users
- 20,000+ GBP Monthly Revenue
- 30%+ Demand for Condition-Specific Matching

**Tier 3 to Tier 4** (Month 18 Gate):
- 5,000+ Monthly Active Users
- 75,000+ GBP Monthly Revenue
- B2B/Commissioning Interest

---

### Immediate Actions (FDR-003)

**Week 1**:
- [ ] Create Tier 1 DPIA (internal or light consultant review)
- [ ] Draft Tier 1 Privacy Policy (standard personal data only)
- [ ] Update feature map to flag tier availability
- [ ] Update marketplace-spec.md with tier-based phases

**Week 2-3**:
- [ ] Complete Tier 1 legal document suite
- [ ] Implement cookie consent
- [ ] Register with ICO
- [ ] Update Terms of Service for Tier 1 service scope

**Ongoing**:
- [ ] Track metrics against Tier 2 progression criteria
- [ ] Monitor competitor compliance postures
- [ ] Prepare Tier 2 DPIA draft in background
- [ ] Maintain legal relationship for tier progression advice

---

### Artifacts Requiring Updates for Tiered Approach

| Document | Required Change | Priority |
|----------|-----------------|----------|
| `/docs/product/governance/tiered-market-entry-roadmap.md` | **CREATED** - Full tier strategy document | COMPLETE |
| `/docs/product/spec/marketplace-spec.md` | Add tier-based feature availability section | HIGH |
| `/docs/product/spec/feature-map.md` | Flag features by tier | HIGH |
| `/docs/product/planning/mvp-classification.md` | Redefine MVP as Tier 1 | HIGH |
| `/docs/compliance/dpia.md` | Structure as tiered DPIA | MEDIUM |
| `/docs/compliance/legal-framework.md` | Add tiered requirements | MEDIUM |
| `/docs/product/decisions/gating-decisions.md` | Update GD-02 with tiered approach | HIGH |

---

### Decision Audit Trail

| Date | Action | Actor | Notes |
|------|--------|-------|-------|
| 2026-02-01 | Question prepared | Product Director | DPIA tier options presented |
| 2026-02-01 | Response received | Founder | "Tier 1 (Minimal) with progressive advancement" |
| 2026-02-01 | Tiered roadmap created | Product Director | `/docs/product/governance/tiered-market-entry-roadmap.md` |
| 2026-02-01 | Implications documented | Product Director | This section added |

---

### Appendix: Legal References

**GDPR Article 4(15)** - Definition of "data concerning health":
> "'data concerning health' means personal data related to the physical or mental health of a natural person, including the provision of health care services, which reveal information about his or her health status"

**ICO Guidance on Special Category Data**:
> "Data which does not explicitly mention a health condition but from which such a condition can be reasonably inferred may be special category data. For example, purchase of certain medications, use of disability services, or requests for carers with specific medical experience may all reveal information about health status."

**GDPR Article 35(1)** - DPIA Requirement:
> "Where a type of processing in particular using new technologies, and taking into account the nature, scope, context and purposes of the processing, is likely to result in a high risk to the rights and freedoms of natural persons, the controller shall, prior to the processing, carry out an assessment of the impact of the envisaged processing operations on the protection of personal data."

**ICO DPIA Screening Checklist** - Mandatory DPIA triggers:
1. Systematic and extensive profiling with significant effects
2. Large scale processing of special category data
3. **Systematic monitoring of publicly accessible areas**
4. Use of new technologies
5. Decisions about access to services
6. **Large scale profiling**
7. Biometric data processing
8. Genetic data processing
9. Data matching
10. **Invisible processing**
11. **Tracking**
12. **Targeting vulnerable individuals**
13. Risk of physical harm

Platform triggers: #2 (potentially), #6, #12, #13

---

---

## FDR-004: Insurance Requirements Framework

### Question

> "What insurance requirements should caregivers meet, and what platform insurance should be procured?"

**Status**: PENDING

**Dependencies**: FDR-001 (Business Model Identity) - SATISFIED. Self-employed model means caregivers need own insurance.

**Notes**: Broker consultation should proceed with clear brief that caregivers are self-employed professionals.

---

## FDR-005: DBS Provider Selection

### Question

> "Which DBS umbrella body provider should the platform partner with?"

**Status**: PENDING

**Dependencies**: None (due diligence required regardless of business model)

**Notes**: Provider evaluation can proceed immediately.

---

## FDR-006: Identity Verification Provider Selection

### Question

> "Which identity verification provider should the platform integrate?"

**Status**: PENDING

**Dependencies**: None

**Notes**: Provider evaluation can proceed immediately. Stripe Identity recommended if platform uses Stripe for payments.

---

## FDR-007: Mental Capacity Act Compliance Framework

### Question

> "How should the platform handle bookings where the care receiver may lack capacity to consent?"

**Status**: PENDING

**Dependencies**: FDR-001 (Business Model Identity) - SATISFIED. Platform facilitates but does not take clinical responsibility.

**Notes**: Legal consultation should confirm platform's limited liability role while still providing verification tools for LPA holders.

---

## FDR-008: Pricing & Commission Structure

### Question

> "What pricing model and commission structure should the platform use?"

**Status**: PENDING (Deferred by founder on 2026-02-01)

**Dependencies**: None - can be resolved independently of other FDRs.

**Questions Requiring Resolution**:

| Question | Options | Impact |
|----------|---------|--------|
| **Who pays commission** | Care receiver, caregiver, or split | Revenue model, pricing transparency, competitive positioning |
| **Commission percentage** | 10%, 15%, 20%, 25% | Unit economics, caregiver take-home pay, care receiver total cost |
| **Minimum booking duration** | 1 hour, 2 hours, 3 hours | Transaction value, caregiver earnings, care receiver flexibility |
| **Early adopter program** | Free period, reduced commission, bonus incentives | User acquisition cost, early user retention, cash flow |

**Founder Direction (2026-02-01)**: Keep pricing decisions open for now and proceed with other aspects of implementation.

**Notes**:
- Pricing decisions do NOT block core development work
- Pricing DOES block Terms of Service legal review and public launch
- See `/docs/product/governance/pricing-decisions-status.md` for detailed tracking
- See `/docs/product/decisions/gating-decisions.md` GD-11 for launch blocking status

**Target Resolution**: Week 3 of Tier 1 development (before Terms of Service legal review)

---

---

## Cross-Reference: Strategic Analysis Document

All questions above are detailed in:
- **Document**: [founder-decisions-strategic-analysis.md](founder-decisions-strategic-analysis.md)
- **Sections**: Decision 1 through Decision 6
- **Analysis Includes**: Potential impacts, mitigation options, cost implications, timeline impacts

---

## Document Maintenance

**Review Frequency**: Update immediately upon receiving founder response

**Owner**: Product Director

**Approval**: Founder sign-off required for each response recorded

**Related Documents**:
- [founder-decisions-strategic-analysis.md](founder-decisions-strategic-analysis.md) - Strategic analysis of decisions
- [product-decisions.md](../decisions/product-decisions.md) - Binding product decisions
- [gating-decisions.md](../decisions/gating-decisions.md) - Launch-blocking decisions
- [next-steps.md](next-steps.md) - Action plan

---

---

## Recommended Specialist Agent Actions

**Generated**: 2026-02-01
**Based On**: FDR-001 (Technology Platform) + FDR-002 (No CQC Registration)
**Purpose**: Actionable delegation plan for updating all affected artifacts based on foundational decisions

---

### Context: What FDR-001 and FDR-002 Establish

The founder has made two foundational decisions that fundamentally shape the platform:

1. **FDR-001**: Platform is a "technology platform connecting independent professionals who are self-employed" (Introduction Agency model, NOT a care provider)

2. **FDR-002**: Platform will NOT pursue CQC registration (operates as unregulated introduction agency)

**Combined Effect**: These decisions establish that:
- Caregivers are self-employed professionals with full autonomy over how they deliver care
- Platform facilitates introductions and handles payments but does NOT control care delivery
- Platform is NOT responsible for care quality (that responsibility rests with individual caregivers)
- CQC-dependent features must be removed or reframed
- All documentation must consistently reflect the Introduction Agency model
- Marketing and UI must clearly communicate this model to avoid misunderstanding

---

### Priority 1: IMMEDIATE (Execute This Week)

These actions must happen first as they establish the foundation for all subsequent work.

---

#### Action 1.1: Update Feature Map - Remove CQC Dependencies

**Priority**: IMMEDIATE
**Agent**: `product-requirements-specialist`
**Agent Remit**: Maintain product requirements and feature backlog, ensuring regulatory compliance and safeguarding while categorizing features appropriately.

**Prompt for Agent**:

```
Read the following documents:
- /docs/product/spec/feature-map.md
- /docs/product/governance/founder-decisions-responses.md (FDR-001 and FDR-002 sections)
- /docs/compliance/legal-framework.md

The founder has confirmed:
1. Platform is a technology marketplace connecting self-employed professionals (Introduction Agency model)
2. Platform will NOT pursue CQC registration

Based on these foundational decisions, review and update the feature-map.md to:

1. REMOVE or REFRAME CQC-dependent features:
   - Remove any features requiring CQC registration
   - Remove clinical governance features (platform has no clinical governance role)
   - Remove care plan creation/management (clinical care plans are out of scope)
   - Reframe "Clinical Safety Monitoring" (Section 11) as "Care Quality Signals" (reviews, incident reporting for safeguarding, not clinical oversight)

2. REFRAME features to reflect Introduction Agency model:
   - Change language from "platform ensures care quality" to "platform provides verification and quality signals"
   - Emphasize caregiver autonomy in all capability descriptions
   - Ensure payment system language reflects "escrow facilitation" not "wage payment"

3. ADD explicit Introduction Agency features:
   - Caregiver rate-setting autonomy (caregiver controls rates, not platform)
   - Substitution rights (caregiver can send qualified substitute)
   - Caregiver-controlled availability (no platform-mandated schedules)

4. UPDATE regulatory compliance section:
   - Remove CQC compliance preparation (Section 13.6 needs significant revision)
   - Add Care Act 2014 safeguarding duties (these STILL apply)
   - Add Introduction Agency-specific compliance requirements

5. REVISE the "Platform Constitution" section to explicitly state:
   - Platform is an Introduction Agency, NOT a regulated care provider
   - CQC registration NOT required based on founder decision
   - Caregivers are self-employed with full autonomy

Create a change summary at the top of the document noting what was changed and why (reference FDR-001 and FDR-002).

Do NOT remove safeguarding features - these are STILL required under Care Act 2014 even without CQC registration.
```

**Why Critical**: The feature map is the source of truth for all development. Every downstream artifact (route map, screen inventory, backlog) derives from it. Until the feature map reflects the Introduction Agency model, all other documents will be inconsistent.

**Expected Outputs**:
- Updated `/docs/product/spec/feature-map.md` with CQC dependencies removed
- Change summary documenting all modifications
- No clinical governance or care plan features
- Clear Introduction Agency language throughout

**Dependencies**: None (this is foundational)

---

#### Action 1.2: Update Gating Decisions - Mark GD-01 Resolved

**Priority**: IMMEDIATE
**Agent**: `product-requirements-specialist`
**Agent Remit**: Maintain decision documentation and ensure consistency across product artifacts.

**Prompt for Agent**:

```
Read the following documents:
- /docs/product/decisions/gating-decisions.md
- /docs/product/governance/founder-decisions-responses.md (FDR-001 and FDR-002 sections)

Update gating-decisions.md to reflect the founder decisions:

1. UPDATE GD-01 (CQC Registration Requirement):
   - Change status from "BLOCKING LAUNCH" to "RESOLVED"
   - Document founder decision: "Platform will NOT pursue CQC registration"
   - Document decision date: 2026-02-01
   - Add resolution rationale: Introduction Agency model - platform connects self-employed professionals, does not control care delivery
   - Note REMAINING ACTION: Obtain formal legal opinion confirming Introduction Agency status (defensive documentation)
   - Update "Systems Affected" to note that CQC-dependent systems are now descoped

2. UPDATE GD-06 (DoLS Risk - Live-In Care):
   - Note that DoLS responsibility shifts to family/care receiver in Introduction Agency model
   - Platform provides guidance but does NOT take responsibility for DoLS authorization
   - Add booking flow requirement: Family must confirm appropriate consent/authorization

3. REVIEW all other gating decisions for consistency with Introduction Agency model:
   - GD-04 (Mental Capacity Act): Platform facilitates verification tools but clinical responsibility rests with caregiver/family
   - GD-05 (Medication Boundaries): Clearer now - platform does NOT have clinical governance role
   - GD-07 (SAB Liaison): Still required under Care Act 2014

4. UPDATE Summary Timeline Table to reflect GD-01 resolution

5. ADD new section: "Decisions Resolved by Founder Direction" listing FDR-001 and FDR-002
```

**Why Critical**: Gating decisions drive launch readiness. GD-01 was the "single biggest launch blocker" - resolving it unblocks the entire launch timeline.

**Expected Outputs**:
- Updated `/docs/product/decisions/gating-decisions.md` with GD-01 resolved
- Clear documentation of founder decision and rationale
- Remaining gating decisions reviewed for Introduction Agency consistency

**Dependencies**: None

---

#### Action 1.3: Update Legal Framework - Confirm Introduction Agency Status

**Priority**: IMMEDIATE
**Agent**: `product-requirements-specialist`
**Agent Remit**: Document regulatory compliance requirements and ensure legal considerations are properly captured.

**Prompt for Agent**:

```
Read the following documents:
- /docs/compliance/legal-framework.md
- /docs/product/governance/founder-decisions-responses.md (FDR-001 and FDR-002 sections)

Update legal-framework.md to reflect the confirmed Introduction Agency model:

1. UPDATE Section 1 (CQC Registration Requirement):
   - Change "DECISION (2026-01-31)" to reference BOTH FDR-001 and FDR-002
   - Update rationale to include full founder statement
   - Add explicit statement: "Founder has confirmed platform will NOT pursue CQC registration"
   - Update risk mitigation checklist with completed items

2. ADD new section: "Introduction Agency Model - Legal Foundation"
   - Define what Introduction Agency means legally
   - Reference FDR-001 (technology platform connecting self-employed professionals)
   - Reference FDR-002 (no CQC registration)
   - List legal precedents supporting Introduction Agency classification
   - Distinguish from "Arranging" regulated activities
   - Document key legal tests for Introduction Agency status

3. ADD section: "Self-Employed Caregiver Status"
   - IR35 compliance requirements
   - Key indicators of genuine self-employment (control, substitution, mutuality of obligation)
   - Features that SUPPORT self-employed status (rate-setting, availability control, substitution rights)
   - Features that would UNDERMINE self-employed status (mandatory uniforms, set schedules, performance management for care delivery)

4. UPDATE Section 10 (Equality Act) to note:
   - Platform role is facilitator - discrimination claims relate to platform design, not employment
   - Caregiver as self-employed professional chooses which bookings to accept

5. UPDATE all insurance references:
   - Caregiver needs own Public Liability and Professional Indemnity (self-employed)
   - Platform needs marketplace operator insurance, NOT care provider insurance
   - Remove references to platform having "employers liability" concerns

6. ADD explicit list: "Regulations That Apply Without CQC Registration"
   - Care Act 2014 (safeguarding duties)
   - GDPR/Data Protection Act 2018
   - Mental Capacity Act 2005
   - Consumer Rights Act 2015
   - Payment Services Regulations 2017
   - Equality Act 2010

7. REMOVE or REVISE outdated content that assumes CQC registration might be required
```

**Why Critical**: Legal framework is the compliance foundation. Inaccurate legal documentation creates regulatory risk. This must reflect the confirmed Introduction Agency status.

**Expected Outputs**:
- Updated `/docs/compliance/legal-framework.md` with Introduction Agency model confirmed
- New sections on self-employed status and applicable regulations
- Clear documentation of founder decisions

**Dependencies**: None

---

### Priority 2: HIGH (Execute Within 2 Weeks)

These actions depend on Priority 1 being complete. They cascade the foundational decisions into operational artifacts.

---

#### Action 2.1: Update Marketplace Spec - Introduction Agency Language

**Priority**: HIGH
**Agent**: `product-requirements-specialist`
**Agent Remit**: Maintain core product specifications ensuring regulatory alignment.

**Prompt for Agent**:

```
Read the following documents:
- /docs/product/spec/marketplace-spec.md
- /docs/product/governance/founder-decisions-responses.md (FDR-001 and FDR-002 sections)
- /docs/product/spec/feature-map.md (after Action 1.1 updates)

Update marketplace-spec.md to consistently reflect Introduction Agency model:

1. UPDATE "Product Summary" section:
   - Add explicit statement: "Platform operates as an Introduction Agency, connecting self-employed caregivers with families"
   - Add: "Platform is NOT a regulated care provider and does NOT require CQC registration"
   - Add: "Caregivers are self-employed professionals who control how they deliver care"

2. UPDATE "Fixed Scope / Core Assumptions (Product Constitution)":
   - CHANGE "Platform operates in a regulated care environment (CQC relevant)"
   - TO "Platform operates under Care Act 2014 safeguarding duties. CQC registration NOT required (Introduction Agency model)."
   - ADD: "Caregivers are self-employed independent professionals, NOT employees"
   - ADD: "Platform does NOT control care delivery methods"

3. UPDATE "User Roles - Caregiver (Professional)":
   - ADD: "Is a self-employed independent professional"
   - ADD: "Sets own rates within platform guidance"
   - ADD: "Controls own availability and schedule"
   - ADD: "Can decline any booking request"
   - ADD: "Can arrange qualified substitutes"

4. UPDATE "Trust, Safety & Regulation" section:
   - CHANGE "CQC-aligned policies and logs" to "Care Act 2014 safeguarding policies"
   - Ensure language reflects platform as "Introduction Agency with safeguarding duties"
   - NOT "regulated care provider"

5. UPDATE "Payments & Liability" section:
   - ADD: "Caregivers are self-employed and responsible for own professional liability"
   - ADD: "Platform liability limited to: platform safety, verification accuracy, payment processing, safeguarding reporting"
   - ADD: "Platform is NOT liable for: care quality, care outcomes, caregiver conduct during visits"

6. UPDATE "Regulatory Reality" section:
   - CHANGE "CQC-relevant environment" to "Care Act 2014 safeguarding environment"
   - ADD: "Introduction Agency model confirmed by founder (FDR-001, FDR-002)"
   - KEEP safeguarding emphasis but clarify platform role

7. ADD new section: "Introduction Agency Model"
   - What this means for families (choosing self-employed professionals, not employees)
   - What this means for caregivers (full professional autonomy)
   - What this means for platform (facilitation and safeguarding, not care provision)
```

**Why Critical**: The marketplace spec is referenced by engineering, design, and marketing. Inconsistent language creates misunderstanding about platform role and liability.

**Expected Outputs**:
- Updated `/docs/product/spec/marketplace-spec.md` with Introduction Agency language
- Clear liability boundaries
- Consistent self-employment language

**Dependencies**: Action 1.1 (Feature Map update)

---

#### Action 2.2: Update Route Map - Reflect Caregiver Autonomy

**Priority**: HIGH
**Agent**: `route-map-architect`
**Agent Remit**: Derive and maintain application route map from product documentation, ensuring all screens support documented capabilities.

**Prompt for Agent**:

```
Read the following documents:
- /docs/product/ui/route-map.md
- /docs/product/spec/feature-map.md (after updates)
- /docs/product/spec/marketplace-spec.md (after updates)
- /docs/product/governance/founder-decisions-responses.md (FDR-001 and FDR-002)

Update route-map.md to reflect Introduction Agency model:

1. ADD caregiver autonomy routes:
   - /caregiver/rates - Caregiver rate management (self-employed control)
   - /caregiver/availability - Caregiver availability settings (full control)
   - /caregiver/substitutes - Manage verified substitutes (key self-employment indicator)

2. REMOVE or FLAG routes requiring CQC registration:
   - Any clinical care plan routes
   - Any clinical governance routes
   - Any CQC reporting routes

3. ENSURE booking routes reflect Introduction Agency model:
   - Booking request goes to caregiver for acceptance (caregiver decides)
   - No platform assignment or mandatory acceptance

4. ADD Route Guards section documenting:
   - Which routes require caregiver to be "Verified" (DBS, ID, insurance)
   - Which routes require caregiver to have set rates (self-employed prerequisite)
   - Preconditions that reflect caregiver autonomy (not platform control)

5. DOCUMENT Purpose for each route including:
   - How it supports Introduction Agency model
   - What self-employed features it enables

6. FLAG as PRODUCT GAP any screens that would imply:
   - Platform controls caregiver schedules
   - Platform assigns bookings
   - Platform manages care quality
```

**Why Critical**: Route map drives engineering implementation. Routes must enable caregiver autonomy and not imply employment relationship.

**Expected Outputs**:
- Updated `/docs/product/ui/route-map.md` with caregiver autonomy routes
- Removal of CQC-dependent routes
- Clear documentation of Introduction Agency implications

**Dependencies**: Action 1.1 (Feature Map update)

---

#### Action 2.3: Update Pre-Launch Website Content Architecture

**Priority**: HIGH
**Agent**: `elderly-care-marketplace-content-architect`
**Agent Remit**: Define information architecture and content requirements for pre-launch website, ensuring trust, regulatory, and safeguarding content is accurate.

**Prompt for Agent**:

```
Read the following documents:
- /docs/marketing/pre-launch-website-content-architecture.md
- /docs/product/governance/founder-decisions-responses.md (FDR-001 and FDR-002)
- /docs/product/spec/marketplace-spec.md (after updates)

The founder has confirmed the platform is an Introduction Agency (NOT CQC-registered). Update pre-launch-website-content-architecture.md to accurately communicate this to families and caregivers:

1. UPDATE Section 3.6 (About Us - Our Approach):
   - ADD clear statement that platform is Introduction Agency connecting self-employed professionals
   - REMOVE any implication of CQC registration or regulated provider status
   - KEEP safeguarding commitment (Care Act 2014 duties still apply)

2. UPDATE Section 3.7 (Trust & Safety):
   - UPDATE "Regulatory Compliance" subsection:
     - REPLACE CQC ambiguity with clear statement: "Platform operates as an Introduction Agency under UK law, connecting families with verified self-employed caregivers. This model does not require CQC registration."
     - ADD: "Caregivers are self-employed professionals responsible for their own care delivery"
     - KEEP: Care Act 2014 alignment, safeguarding commitment
   - UPDATE verification descriptions to reflect due diligence, not employment screening

3. UPDATE Section 3.3 (How It Works - For Caregivers):
   - EMPHASIZE self-employed status more prominently
   - ADD explicit statement: "You are a self-employed professional, not an employee"
   - EMPHASIZE rate-setting autonomy, availability control, booking acceptance choice
   - REMOVE any language implying platform employment or direction

4. UPDATE Section 5 (Messaging Pillars):
   - For Caregivers Pillar 3 (Flexibility & Control): Strengthen self-employed messaging
   - ADD new key message: "Work as your own boss - you control rates, schedule, and which bookings you accept"

5. UPDATE Section 7.3 (CQC Compliance Considerations):
   - RESOLVE the PRODUCT GAP - CQC status is now determined
   - REPLACE with definitive statement: "Platform operates as Introduction Agency. CQC registration is not required. We facilitate connections between families and self-employed caregivers who control their own care delivery."
   - ADD: "Our safeguarding commitments are based on Care Act 2014 duties, not CQC requirements."

6. UPDATE FAQ Section 3.12:
   - UPDATE answer for "Is this service CQC-registered?":
     "No, CQC registration is not required for our Introduction Agency model. We connect families directly with verified self-employed caregivers who provide care as independent professionals. Our platform ensures rigorous verification (DBS, qualifications, insurance) and maintains Care Act 2014 safeguarding duties, but we do not provide or control care delivery ourselves."

7. REMOVE or RESOLVE all [PRODUCT GAP: CQC status TBD] markers - this is now decided

8. ADD new subsection in Trust & Safety: "Understanding Our Model"
   - What Introduction Agency means for families
   - What it means for caregivers
   - How verification and safeguarding work
   - Why this model benefits everyone (caregiver autonomy, family choice)
```

**Why Critical**: Pre-launch website is first contact with families and caregivers. Misrepresenting the business model creates legal risk and user expectation problems.

**Expected Outputs**:
- Updated `/docs/marketing/pre-launch-website-content-architecture.md`
- Clear Introduction Agency messaging
- Resolved CQC-related product gaps
- FAQ answer for CQC question

**Dependencies**: Action 2.1 (Marketplace Spec update)

---

### Priority 3: MEDIUM (Execute Within 4 Weeks)

These actions complete the cascade of updates across all documentation.

---

#### Action 3.1: Design Caregiver Autonomy UI Patterns

**Priority**: MEDIUM
**Agent**: `elderly-care-ui-designer`
**Agent Remit**: Translate product specifications into accessible UI/UX designs for elderly care marketplace.

**Prompt for Agent**:

```
Read the following documents:
- /docs/product/spec/marketplace-spec.md (updated version)
- /docs/product/spec/feature-map.md (updated version)
- /docs/product/governance/founder-decisions-responses.md (FDR-001 and FDR-002)
- /docs/product/ui/route-map.md (updated version)

Design UI patterns for key caregiver autonomy screens that reinforce the Introduction Agency / self-employed professional model:

1. CAREGIVER RATE SETTING SCREEN:
   - Design requirement: Caregiver SETS their own hourly rate (self-employed control)
   - Platform may show "suggested range" but caregiver has full control
   - UI must communicate: "You control your rates"
   - Avoid language implying platform sets or approves rates

2. CAREGIVER AVAILABILITY MANAGEMENT:
   - Design requirement: Caregiver has FULL control over availability
   - No platform-mandated minimum hours
   - UI must communicate: "You control your schedule"
   - Show available vs. booked time clearly
   - Enable bulk availability updates

3. BOOKING REQUEST REVIEW (Caregiver View):
   - Design requirement: Caregiver DECIDES whether to accept each booking
   - UI must show: Care needs, location, earnings, time commitment
   - Clear Accept / Decline options
   - Decline reasons (optional) - but no "penalty" implied
   - UI must communicate: "You choose which bookings to accept"

4. CAREGIVER SUBSTITUTION MANAGEMENT:
   - Design requirement: Caregiver can register verified substitutes
   - Key self-employment indicator
   - UI for adding substitutes (who must also be verified)
   - Process for notifying family if substitute sent

5. CAREGIVER ONBOARDING - SELF-EMPLOYMENT ACKNOWLEDGMENT:
   - Design requirement: Clear self-employment statement during onboarding
   - Checkbox: "I understand I am joining as a self-employed professional"
   - Brief explanation of what this means (control, responsibility, tax)
   - NOT an employment contract

For each screen:
- Provide wireframe or detailed layout description
- Note accessibility considerations (elderly family members may view)
- Identify any product gaps preventing complete design
- Ensure UI copy avoids employment-implying language
```

**Why Critical**: UI reinforces the business model. If UI implies employment (assigned shifts, performance ratings, etc.), it undermines the legal self-employed status.

**Expected Outputs**:
- UI patterns for caregiver autonomy screens
- Wireframes or detailed descriptions
- Accessibility annotations
- Product gaps identified

**Dependencies**: Actions 1.1, 2.2 (Feature Map and Route Map updates)

---

#### Action 3.2: Review Screen Inventory for Introduction Agency Compliance

**Priority**: MEDIUM
**Agent**: `route-map-architect`
**Agent Remit**: Maintain screen inventory ensuring all screens support documented product capabilities.

**Prompt for Agent**:

```
Read the following documents:
- /docs/product/ui/screen-inventory.md
- /docs/product/spec/feature-map.md (updated)
- /docs/product/governance/founder-decisions-responses.md (FDR-001 and FDR-002)

Review screen-inventory.md for Introduction Agency model compliance:

1. AUDIT all screens for language that implies:
   - Platform employs caregivers
   - Platform assigns or mandates bookings
   - Platform controls care delivery
   - Platform manages caregiver performance
   - CQC registration or regulated provider status

2. FLAG screens that need terminology updates:
   - Any screen using "employee" or "staff" language
   - Any screen with "assigned" booking language
   - Any screen with care plan management (clinical)
   - Any screen implying platform quality control (vs. safeguarding)

3. ADD screens required for self-employed model:
   - SCR-CG-RATES: Caregiver Rate Management
   - SCR-CG-SUBS: Caregiver Substitute Management
   - SCR-ONBOARD-SELF-EMP: Self-Employment Acknowledgment

4. REMOVE screens requiring CQC registration:
   - Any clinical care plan screens
   - Any CQC reporting screens
   - Any clinical governance dashboards

5. UPDATE screen purposes to reference:
   - Introduction Agency model
   - Caregiver autonomy where relevant
   - Care Act 2014 safeguarding (not CQC)

6. DOCUMENT preconditions that reflect self-employed status:
   - Caregiver must have set rates
   - Caregiver must have verified insurance (self-employed requirement)
```

**Why Critical**: Screen inventory is the QA-ready list. Every screen must be auditable for Introduction Agency compliance.

**Expected Outputs**:
- Updated `/docs/product/ui/screen-inventory.md`
- Flagged screens requiring terminology changes
- New screens for self-employed features
- Removed CQC-dependent screens

**Dependencies**: Actions 1.1, 2.2 (Feature Map and Route Map updates)

---

#### Action 3.3: Update Terms of Service Requirements

**Priority**: MEDIUM
**Agent**: `product-requirements-specialist`
**Agent Remit**: Document legal and compliance requirements for product policies.

**Prompt for Agent**:

```
Read the following documents:
- /docs/compliance/policies/terms-of-service.md
- /docs/product/governance/founder-decisions-responses.md (FDR-001 and FDR-002)
- /docs/compliance/legal-framework.md (updated)

Update terms-of-service.md to reflect Introduction Agency model requirements:

1. ADD or UPDATE Caregiver Terms section:
   - Explicit self-employment declaration
   - Statement that caregiver is NOT an employee, worker, or agent of platform
   - Caregiver's responsibilities as self-employed professional:
     - Own professional liability insurance
     - Own tax and National Insurance
     - Full control over care delivery methods
     - Right to accept/decline bookings
     - Right to set own rates
     - Right to arrange substitutes
   - Platform's role: facilitate introductions, process payments, provide safeguarding infrastructure
   - Platform does NOT control how care is delivered

2. ADD or UPDATE Care Receiver Terms section:
   - Acknowledgment that caregivers are self-employed professionals
   - Platform does NOT employ caregivers
   - Platform does NOT guarantee care quality (caregivers individually responsible)
   - Platform provides verification and safeguarding, NOT clinical governance
   - Care receiver/family responsible for:
     - Communicating care needs
     - Providing appropriate environment
     - Confirming lawful authority if booking on behalf of person lacking capacity

3. ADD liability limitations:
   - Platform IS liable for: Platform safety, verification accuracy, payment processing, safeguarding reporting
   - Platform IS NOT liable for: Care quality, care outcomes, caregiver conduct during visits

4. ADD IR35 / self-employment supporting language:
   - No mutuality of obligation (no guaranteed work, no obligation to accept)
   - No control over care delivery methods
   - Substitution rights permitted
   - Caregiver determines own schedule

5. REMOVE any language implying:
   - Platform employment of caregivers
   - Platform control over care delivery
   - CQC registration or regulated provider status
   - Platform responsibility for care quality

Note: This document specifies REQUIREMENTS for legal counsel to draft actual Terms of Service. Actual terms require legal review.
```

**Why Critical**: Terms of Service must legally establish self-employed status. Weak terms create IR35 and employment law risk.

**Expected Outputs**:
- Updated `/docs/compliance/policies/terms-of-service.md` with Introduction Agency requirements
- Clear self-employment language requirements
- Liability boundaries specified

**Dependencies**: Action 1.3 (Legal Framework update)

---

### Summary: Dependency Graph

```
FDR-001 (Technology Platform) + FDR-002 (No CQC Registration)
                    |
                    v
    +---------------+---------------+
    |               |               |
    v               v               v
Action 1.1      Action 1.2      Action 1.3
Feature Map     Gating Dec.     Legal Framework
    |               |               |
    +-------+-------+               |
            |                       |
            v                       |
      Action 2.1                    |
    Marketplace Spec                |
            |                       |
    +-------+-------+---------------+
    |               |
    v               v
Action 2.2      Action 2.3
Route Map       Pre-Launch Content
    |
    +-------+-------+
    |               |
    v               v
Action 3.1      Action 3.2      Action 3.3
UI Patterns     Screen Inv.     Terms of Service
```

---

### Execution Checklist

**IMMEDIATE (This Week)**:
- [ ] Action 1.1: Update Feature Map (product-requirements-specialist)
- [ ] Action 1.2: Update Gating Decisions (product-requirements-specialist)
- [ ] Action 1.3: Update Legal Framework (product-requirements-specialist)

**HIGH PRIORITY (Within 2 Weeks)**:
- [ ] Action 2.1: Update Marketplace Spec (product-requirements-specialist)
- [ ] Action 2.2: Update Route Map (route-map-architect)
- [ ] Action 2.3: Update Pre-Launch Website Content (elderly-care-marketplace-content-architect)

**MEDIUM PRIORITY (Within 4 Weeks)**:
- [ ] Action 3.1: Design Caregiver Autonomy UI (elderly-care-ui-designer)
- [ ] Action 3.2: Review Screen Inventory (route-map-architect)
- [ ] Action 3.3: Update Terms of Service Requirements (product-requirements-specialist)

---

### Agent Team Assessment

**Current Agents Available**:
- `product-requirements-specialist`: Covers Actions 1.1, 1.2, 1.3, 2.1, 3.3
- `route-map-architect`: Covers Actions 2.2, 3.2
- `elderly-care-ui-designer`: Covers Action 3.1
- `elderly-care-marketplace-content-architect`: Covers Action 2.3

**GAPS IDENTIFIED**:

1. **Compliance/Legal Specialist Agent**: No dedicated agent for legal documentation updates. The `product-requirements-specialist` is handling legal-adjacent work but may lack depth for:
   - IR35 compliance language
   - Self-employment legal tests
   - Liability allocation specifics

   **Recommendation**: Consider creating a `compliance-specialist` agent OR ensure legal counsel reviews all compliance documentation.

2. **Terms of Service Agent**: The `product-requirements-specialist` documents requirements but actual Terms of Service drafting requires legal expertise.

   **Recommendation**: All Terms of Service outputs are REQUIREMENTS for legal counsel, not final documents.

---

### Blockers and Open Questions

**BLOCKERS (Require Human Decision)**:

1. **Legal Opinion Procurement**: FDR-002 recommends obtaining formal legal opinion confirming Introduction Agency status. This requires:
   - Engaging regulatory solicitor (estimated cost: 3,000-5,000 GBP)
   - Timeline: 1-2 weeks once engaged
   - **Decision Needed From**: Founder - approve budget and engage solicitor

2. **Insurance Broker Brief**: Platform insurance requirements need to be confirmed with broker. The Introduction Agency model changes the insurance profile.
   - **Decision Needed From**: Founder - engage insurance broker with Introduction Agency brief

**OPEN QUESTIONS**:

1. **Substitution Feature Priority**: Substitution rights are a key self-employment indicator. Is this MVP or Phase 2?
   - Current classification unclear
   - **Recommendation**: Include in MVP to strengthen self-employed status

2. **Rate-Setting Boundaries**: Caregiver sets own rates, but does platform set minimum (National Living Wage compliance) or maximum (market positioning)?
   - **Decision Needed From**: Founder/Product

3. **Verification Failure Path**: If caregiver fails verification, what happens? In Introduction Agency model, platform has limited remedial options.
   - **Decision Needed From**: Product/Legal

---

**Document Status**: Complete
**Next Review**: After IMMEDIATE actions completed
**Owner**: Product Director

---

**END OF DOCUMENT**
