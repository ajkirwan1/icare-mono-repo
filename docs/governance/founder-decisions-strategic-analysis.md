# Strategic Analysis: Immediate Founder Decisions

**Date:** 2026-01-31
**Status:** Active
**Owner:** Founder
**Source:** Product Director Analysis

---

## Executive Summary

The six decisions identified below represent the foundational regulatory and compliance choices that will determine the legal viability, operational model, and timeline for the UK elderly care marketplace. Each decision has cascading implications across product architecture, legal exposure, development timeline, and cost structure. This analysis provides the strategic context necessary for informed decision-making.

---

## Decision 1: CQC Registration Status

### Nature of the Consideration

This is the single most consequential decision for the platform. It determines whether the business operates as a **regulated healthcare provider** or as an **unregulated marketplace facilitator**. The current documentation shows a decision has been made (DEC-002 in [product-decisions.md](../decisions/product-decisions.md)) to operate under the "Introduction Agency Model" without CQC registration, but this decision is marked as "Pending Legal Confirmation."

**Why it matters strategically:**

The CQC question is not merely a compliance checkbox. It fundamentally shapes:

1. **Business Model Identity**: Are you a technology platform connecting independent professionals (like Uber or Airbnb), or are you a care service provider responsible for care quality?

2. **Liability Profile**: Under CQC registration, the platform has direct accountability for care quality, safeguarding failures, and clinical outcomes. Without registration, liability rests primarily with the self-employed caregivers.

3. **Operational Burden**: CQC registration requires a named Registered Manager, ongoing inspections, compliance with CQC fundamental standards, and comprehensive incident reporting. This is an ongoing operational cost, not a one-time setup.

4. **Market Positioning**: CQC registration could be a competitive advantage (demonstrating quality commitment) or a constraint (limiting operational flexibility and increasing costs).

5. **Regulatory Evolution Risk**: Digital care platforms are a relatively new category. The CQC's interpretation of "arranging" care is evolving. Today's Introduction Agency position may not hold in 2-3 years.

### Potential Impacts

**If the decision is "No CQC Registration Required" (Current Position):**

Positive:
- Launch timeline accelerated by 3-6 months (no registration wait)
- Lower ongoing compliance burden (no inspections, no Registered Manager salary)
- Operational flexibility in how the marketplace operates
- Cost savings of approximately 50,000 GBP or more annually (compliance staff, inspections, reporting)

Negative:
- Regulatory uncertainty remains - CQC could challenge this position at any time
- Reputational risk if competitors gain CQC registration as a trust signal
- Limited ability to expand into regulated activities (clinical assessments, care planning)
- If CQC later requires registration, forced shutdown or urgent compliance scramble

**If the decision is "CQC Registration Required":**

Positive:
- Regulatory certainty - operating within clear legal boundaries
- Trust signal for families seeking verified quality
- Ability to expand into more comprehensive care services
- Proactive approach may be viewed favourably by regulators

Negative:
- 3-6 month delay to launch (CQC registration process)
- Ongoing compliance costs (Registered Manager: 45,000-60,000 GBP salary, annual inspections, compliance team)
- Operational constraints (CQC fundamental standards compliance)
- Potential inspection failures could damage reputation

**If the decision is delayed:**

- All development work proceeds with uncertainty
- Documents remain inconsistent (GD-01 open vs DEC-002 closed)
- Legal and compliance work cannot be properly scoped
- MVP timeline at risk - a 6-month delay discovered post-development would be catastrophic

### Options for Mitigating

1. **Formal Legal Opinion (Immediate)**: Commission a written legal opinion from a regulatory solicitor specializing in CQC matters. This provides documented justification for the Introduction Agency position and forms the basis of a defense if CQC challenges later. Cost: approximately 3,000-5,000 GBP. Timeline: 1-2 weeks.

2. **CQC Informal Guidance (Week 2-3)**: Contact CQC directly for informal guidance on the platform model. This is non-binding but provides valuable insight into CQC's current thinking and demonstrates good faith engagement. No cost. Timeline: 2-4 weeks.

3. **CQC-Aligned Policies (Parallel Track)**: Implement CQC-style policies (safeguarding, quality assurance, incident management, complaints) regardless of registration status. This demonstrates commitment to quality and provides rapid compliance path if registration later required. The documents at [product-decisions.md](../decisions/product-decisions.md) already recommend this approach.

4. **Registered Manager Candidate Identification**: Identify a potential Registered Manager in advance (someone with care sector experience and appropriate qualifications). This reduces the timeline from 6 months to approximately 3 months if registration becomes necessary.

5. **Hybrid Launch Strategy**: Launch with companionship services only (lower regulatory risk), then add personal care services after regulatory position confirmed. This reduces early exposure while building operational experience.

### Additional Considerations

**Dependencies:**
- DEC-002 status affects all downstream compliance work
- Insurance requirements (Decision 3) depend on CQC position
- Marketing messaging for Pre-Launch site cannot reference "regulated" or "CQC-aligned" without clarity
- Caregiver terms of service (self-employed status) must align with chosen model

**Hidden Risks:**
- A competitor incident could trigger CQC review of all similar platforms
- CQC guidance documents are updated periodically - the Introduction Agency interpretation could narrow
- Local authority safeguarding teams may question platform's status during SAB liaison

**Cost Implications:**
- Legal opinion: 3,000-5,000 GBP (one-time)
- CQC registration fee: approximately 3,500 GBP (if required)
- Registered Manager salary: 45,000-60,000 GBP per annum (if registered)
- Compliance team: minimum 1 FTE at 35,000-45,000 GBP (ongoing)
- Annual CQC inspection preparation: approximately 10,000-20,000 GBP consultant fees

**Timeline Impacts:**
- If CQC registration required: Add 3-6 months to MVP launch
- If legal opinion confirms Introduction Agency: No delay, but ongoing monitoring required
- If CQC challenges post-launch: Potential forced service suspension while registration pursued

---

## Decision 2: DPIA Engagement

### Nature of the Consideration

The Data Protection Impact Assessment is not optional. Under GDPR Article 35, a DPIA is **legally mandatory** before the platform can process any personal data. The platform triggers all three high-risk processing criteria:

1. **Systematic monitoring** - Care delivery tracking, messaging surveillance
2. **Large-scale processing of sensitive data** - Health conditions, medical needs, care requirements
3. **Processing data of vulnerable individuals** - Elderly adults, those with cognitive impairment

This decision is about **when and how** to engage a Data Protection Officer or consultant, not whether to do so.

**Why it matters strategically:**

1. **Legal Gatekeeper**: No DPIA means no legal basis to process personal data. The platform cannot launch without it.

2. **ICO Enforcement Risk**: The Information Commissioner's Office has increased enforcement on health-related data processing. Fines can reach 17.5 million GBP or 4% of annual turnover. For a startup, even an investigation (without fine) could be reputationally fatal.

3. **Architecture Validation**: The DPIA process forces systematic review of data flows, retention periods, access controls, and risk mitigations. This often reveals architectural issues that are cheaper to fix before development.

4. **Third-Party Trust**: B2B partnerships (NHS, local authorities, care agencies) will require evidence of DPIA completion before engagement.

5. **Insurance Requirement**: Cyber liability insurance often requires documented data protection compliance, including DPIA.

### Potential Impacts

**If DPIA is engaged this week (recommended):**

Positive:
- DPIA completion in 2-4 weeks (depending on consultant availability)
- Privacy Policy can be drafted in parallel
- Legal basis for data processing established before development deepens
- ICO registration can proceed with documented compliance
- Enables Phase 2 work (technical specs, integrations) to proceed with clarity

Negative:
- Consultant costs: 5,000-15,000 GBP depending on scope
- Requires product/technical resources to participate (data flow documentation)
- May identify issues requiring architecture changes

**If DPIA is delayed:**

- Every day of data processing without DPIA is a GDPR violation
- Pre-Launch website that collects any data beyond basic contact requires DPIA
- MVP development proceeds without validated data architecture
- ICO complaint (from any user) could trigger enforcement action
- Launch becomes legally impossible until completed

**If DPIA identifies high residual risk:**

- Must submit to ICO for review before processing
- ICO review takes 4-8 weeks
- ICO may require changes before approving processing
- This could add 2+ months to timeline

### Options for Mitigating

1. **Immediate DPO/Consultant Engagement**: Engage a qualified Data Protection Officer or GDPR consultant this week. Options include:
   - Fractional DPO services (ongoing, approximately 500-1,500 GBP monthly)
   - Project-based DPIA completion (one-time, approximately 5,000-15,000 GBP)
   - Law firm data protection practice (higher cost, higher authority)

2. **Use ICO DPIA Template**: The ICO provides a free DPIA template that structures the required analysis. This reduces consultant time and ensures compliance with ICO expectations.

3. **Scope Limitation for Pre-Launch**: The Pre-Launch website collects minimal data (email, care need category, location). A simplified DPIA for Pre-Launch only could be completed in 1 week, allowing lead capture to proceed while full DPIA progresses.

4. **Parallel Privacy Policy Drafting**: Once DPIA scope is understood, Privacy Policy drafting can begin immediately. This is required for both Pre-Launch and MVP.

5. **Data Flow Mapping Preparation**: Before consultant engagement, prepare data flow diagrams showing what data is collected, where it's stored, who accesses it, and how long it's retained. The documents at [feature-map.md](../spec/feature-map.md) (Section 22) provide technical infrastructure context for this.

### Additional Considerations

**Dependencies:**
- DPIA completion is prerequisite for Privacy Policy finalization
- DPIA informs technical architecture (encryption requirements, access controls)
- DPIA identifies which third-party integrations require Data Processing Agreements
- DPIA may require Mental Capacity Act (Decision 6) resolution if processing data of those who cannot consent

**Hidden Risks:**
- Health data processed in UK must remain in UK/EU data centres
- Stripe Identity verification involves data transfer to Stripe (US company) - adequacy decision implications
- Caregiver data (self-employed) has different legal basis than care receiver data (vulnerable individual)
- Family member data access creates complex consent chains

**Cost Implications:**
- DPO/consultant: 5,000-15,000 GBP (DPIA completion)
- Ongoing DPO service: 500-1,500 GBP monthly
- ICO registration fee: 40-2,900 GBP depending on organization size
- Potential architectural changes: variable (could be minimal or significant)

**Timeline Impacts:**
- DPIA completion: 2-4 weeks with engaged consultant
- ICO prior consultation (if required): additional 4-8 weeks
- If DPIA not completed: launch blocked indefinitely

---

## Decision 3: Insurance Requirements

### Nature of the Consideration

Insurance is both a **risk transfer mechanism** and a **verification requirement**. The decision involves two distinct questions:

1. **Platform Insurance**: What insurance does the company itself need (Professional Indemnity, Cyber Liability, Directors & Officers)?

2. **Caregiver Insurance Requirements**: What insurance must caregivers carry to be listed on the platform (Public Liability, Professional Indemnity)?

The gating decision GD-09 in [gating-decisions.md](../decisions/gating-decisions.md) flags this as unresolved, and it directly affects caregiver onboarding, Terms of Service, and verification workflows.

**Why it matters strategically:**

1. **Liability Allocation**: Insurance requirements define who bears financial risk when harm occurs. Without clarity, the platform may face claims it cannot defend or fund.

2. **Caregiver Supply Constraint**: Overly stringent insurance requirements (high minimums, obscure coverage types) reduce the caregiver supply pool. Self-employed caregivers earning 15-25 GBP per hour may balk at 1,000+ GBP annual premiums.

3. **Family Trust Signal**: Visible insurance verification ("Insured" badge) is a significant trust factor for families entrusting vulnerable relatives to strangers.

4. **Terms of Service Foundation**: The caregiver Terms of Service must specify insurance requirements. This cannot be finalized until the decision is made.

5. **Platform Insurance is Investor Requirement**: Investors and potential acquirers will require evidence of appropriate platform insurance coverage.

### Potential Impacts

**If insurance requirements are set appropriately:**

Positive:
- Clear onboarding requirements for caregivers
- Risk transfer to insured parties where appropriate
- Verification workflow can be designed and built
- Terms of Service can be finalized
- Platform protected from vicarious liability claims

Negative:
- Cost to caregivers (typically 200-400 GBP annually for combined PL/PI)
- Administrative burden (insurance certificate verification, expiry tracking)
- Some potential caregivers may be excluded if uninsured

**If requirements are too stringent:**

- Reduced caregiver supply (fewer can afford or obtain insurance)
- Higher hourly rates (caregivers pass insurance costs to care receivers)
- Longer onboarding time (insurance procurement takes 1-2 weeks)
- Market competitiveness reduced if competitors require less

**If requirements are too lax:**

- Platform exposed to claims when uninsured caregiver causes harm
- Family complaints if care receiver injured and no recourse
- Regulatory criticism (CQC or local authority review)
- Insurance may become evidence in negligence claim against platform

**If decision is delayed:**

- Caregiver verification flow cannot be finalized
- Terms of Service remain incomplete
- Development of document upload/verification features blocked
- MVP timeline affected

### Options for Mitigating

1. **Insurance Broker Consultation (Immediate)**: Contact a specialist broker (care sector focus) for:
   - Industry standard requirements for self-employed care workers
   - Platform insurance recommendations (PI, Cyber, D&O)
   - Group scheme options for caregivers (platform-negotiated rates)

   Cost: Free consultation (broker earns commission on policies). Timeline: 1 week.

2. **Platform Group Insurance Scheme**: Negotiate a group insurance arrangement where caregivers can purchase coverage through the platform at reduced rates. This:
   - Reduces cost barrier for caregivers
   - Simplifies verification (platform receives policy confirmations directly)
   - Creates platform revenue opportunity (commission on premiums)
   - Ensures coverage meets platform requirements

3. **Tiered Insurance Requirements**: Different requirements based on service type:
   - Companionship only: Public Liability 1M GBP minimum
   - Personal care: Public Liability 1M GBP + Professional Indemnity 1M GBP
   - Live-in care: Enhanced requirements + platform approval

   This reduces barrier for lower-risk services while maintaining protection for high-risk activities.

4. **Platform Indemnity (Backstop)**: Platform maintains excess liability coverage that activates if caregiver insurance is insufficient or voided. This protects care receivers without increasing caregiver burden.

5. **Insurance Verification Partnership**: Partner with an insurtech that provides real-time insurance verification (like digital certificates that update automatically). This reduces admin burden and ensures lapsed policies are immediately flagged.

### Additional Considerations

**Dependencies:**
- CQC position (Decision 1) affects whether platform needs care-specific insurance
- Caregiver employment status (self-employed) affects insurance types available
- Service types offered (personal care vs companionship) affect risk profile
- Payment model (escrow) may affect payment protection insurance needs

**Hidden Risks:**
- Insurance exclusions: Many policies exclude claims arising from regulated activities (if caregiver performs tasks outside their competence)
- Certificate fraud: Caregivers may upload fake or expired certificates
- Premium shock: If insurance market hardens, caregiver costs rise unexpectedly
- Claims history: Caregivers with claims history may face premium increases or coverage denial

**Cost Implications:**
- Platform Professional Indemnity: 5,000-20,000 GBP annually (depending on coverage level)
- Platform Cyber Liability: 2,000-10,000 GBP annually
- Platform D&O: 3,000-8,000 GBP annually
- Caregiver insurance: 200-400 GBP annually (passed to caregivers, but may affect supply)
- Insurance verification system: Development cost for document upload, expiry tracking, admin review

**Timeline Impacts:**
- Broker consultation: 1 week
- Platform insurance procurement: 2-4 weeks
- Verification feature development: Dependent on requirements clarity
- If unresolved: Caregiver onboarding blocked

---

## Decision 4: DBS Provider Selection

### Nature of the Consideration

DBS (Disclosure and Barring Service) checks are the foundation of caregiver trust and safety. The platform cannot conduct DBS checks directly - it must partner with a registered umbrella body. This decision selects that partner.

The choice between providers is not merely operational - it affects:
- Caregiver onboarding experience (time to approval)
- Ongoing compliance capability (DBS Update Service integration)
- Cost structure (per-check fees)
- Technical integration complexity

**Why it matters strategically:**

1. **Safety Foundation**: DBS checks are the primary mechanism for screening out individuals barred from working with vulnerable adults. Failure here has catastrophic consequences.

2. **Caregiver Experience**: A slow or cumbersome DBS process creates friction in caregiver acquisition. Competitors with faster onboarding will capture supply.

3. **Update Service Integration**: The DBS Update Service allows ongoing monitoring without repeated checks. Providers with strong Update Service integration enable continuous compliance rather than point-in-time verification.

4. **Scalability**: As caregiver numbers grow, the DBS process must scale. Provider choice affects whether this becomes a bottleneck.

5. **Technical Debt**: Switching DBS providers post-launch is disruptive (API changes, caregiver re-verification). The initial choice should be durable.

### Potential Impacts

**If a strong provider is selected promptly:**

Positive:
- Technical integration specification can proceed immediately
- Caregiver onboarding flow can be designed with confidence
- Verification feature development can begin
- Marketing can reference "DBS checked" with defined process
- Scalable foundation for growth

Negative:
- Commitment to provider (typically 12-month minimum terms)
- Per-check costs become fixed (30-60 GBP per enhanced check)
- Dependency on provider reliability

**If provider selection is delayed:**

- Integration specification blocked
- Caregiver onboarding flow cannot be finalized
- Development of verification features delayed
- MVP timeline at risk

**If wrong provider selected:**

- Poor caregiver experience (slow checks, poor communication)
- Technical integration issues (unreliable API, poor documentation)
- Cost overruns (hidden fees, minimum commitments)
- Potential provider switch required (significant rework)

### Options for Mitigating

1. **Evaluate Top Providers (This Week)**: Focus on the primary options:

   **Trustid**:
   - Pros: Strong API, good care sector experience, Update Service integration
   - Cons: Mid-range pricing
   - Suitability: High for marketplace model

   **UKCBC (UK Criminal Bureau Check)**:
   - Pros: Large provider, established reputation
   - Cons: Less API-focused, more manual processes
   - Suitability: Medium for digital-first platform

   **Atlantic Data**:
   - Pros: Competitive pricing, API available
   - Cons: Less care sector specialization
   - Suitability: Medium

   **Direct DBS (via employer registration)**:
   - Pros: Lowest cost
   - Cons: Requires being a registered body (complex, platform may not qualify)
   - Suitability: Low for marketplace model

2. **Prioritize Update Service Integration**: The DBS Update Service allows a single check to remain valid for ongoing monitoring (caregiver subscribes for 13 GBP annually). Providers with strong Update Service integration enable:
   - Lower ongoing verification costs
   - Real-time status checking
   - Continuous compliance rather than 3-year rechecks

3. **Request API Documentation Before Selection**: Evaluate integration complexity before committing. Key questions:
   - Is the API RESTful with JSON responses?
   - What is typical API latency and reliability?
   - How are status updates communicated (webhooks, polling)?
   - What sandbox/testing environment is available?

4. **Negotiate Volume Pricing**: Even with modest initial volumes, negotiate pricing tiers. DBS providers expect growth and may offer favourable initial rates for platform partnerships.

5. **Dual-Provider Strategy (Risk Mitigation)**: Integrate two providers initially, with one as primary and one as backup. This adds development cost but reduces dependency risk.

### Additional Considerations

**Dependencies:**
- Identity verification provider (Decision 5) may offer bundled DBS services
- CQC position (Decision 1) affects whether Enhanced vs Basic DBS required
- Caregiver Terms of Service must specify DBS requirements and who pays

**Hidden Risks:**
- DBS check delays (currently 2-8 weeks depending on complexity) affect caregiver onboarding time
- Overseas caregivers require separate overseas criminal record checks (not covered by UK DBS)
- DBS checks are point-in-time - convictions after check are not automatically detected
- Provider data breaches could expose sensitive caregiver information

**Cost Implications:**
- Basic DBS: 18 GBP per check
- Enhanced DBS: 38 GBP per check
- Enhanced with Barred Lists: 38 GBP per check (same as enhanced)
- Umbrella body admin fee: 10-25 GBP per check on top of DBS fee
- DBS Update Service: 13 GBP annual subscription (paid by caregiver)
- Integration development: 2-4 weeks engineering time

**Timeline Impacts:**
- Provider selection: Can be completed this week
- Contract negotiation: 1-2 weeks
- Integration specification: 1 week after selection
- Integration development: 2-4 weeks
- DBS check processing time: 2-8 weeks per caregiver (ongoing operational timeline)

---

## Decision 5: Identity Verification Provider

### Nature of the Consideration

Identity verification ensures that users are who they claim to be. This is particularly critical for:
- **Caregivers**: Preventing fraudulent profiles, false identity claims
- **Care Receivers/Families**: Ensuring account ownership, preventing unauthorized access
- **Regulatory Compliance**: Right to work verification, KYC requirements for payments

The decision selects a provider for automated document verification and liveness checks.

**Why it matters strategically:**

1. **Trust Foundation**: Identity verification is the first layer of trust. If this fails, subsequent verification (DBS, qualifications) is meaningless.

2. **Fraud Prevention**: Fake caregiver accounts are a catastrophic risk (safeguarding failure, regulatory consequences, reputational damage).

3. **Regulatory Intersection**: Identity verification overlaps with right-to-work checks (UKVI share code) and payment KYC (Stripe Connect requirements).

4. **User Experience**: Modern identity verification (document photo + selfie) takes 2-5 minutes. Clunky processes lose users.

5. **Conversion Impact**: Verification friction affects caregiver onboarding completion rates. Industry data suggests every additional step loses 10-20% of applicants.

### Potential Impacts

**If a strong provider is selected promptly:**

Positive:
- Verification flow can be designed and developed
- Caregiver and care receiver onboarding can proceed
- Right-to-work verification can be integrated
- Stripe Connect KYC may be streamlined (Stripe Identity specifically)
- High verification success rates (less manual review needed)

Negative:
- Per-verification costs (1-5 GBP depending on provider and volume)
- Dependency on provider accuracy (false positives/negatives)
- Data processing implications (provider handles sensitive documents)

**If the wrong provider is selected:**

- High failure rates requiring manual review (operational cost)
- Poor user experience (abandoned onboarding)
- Integration difficulties (poor API, unreliable service)
- Fraud incidents due to inadequate verification

**If decision is delayed:**

- User registration flows cannot be finalized
- Development of onboarding features blocked
- MVP timeline at risk

### Options for Mitigating

1. **Evaluate Primary Options (This Week)**:

   **Onfido**:
   - Pros: Industry leader, excellent accuracy, UK-optimized, comprehensive document support
   - Cons: Premium pricing (approximately 2-5 GBP per verification)
   - Best for: Maximum accuracy and trust

   **Stripe Identity**:
   - Pros: Native Stripe integration (already using Stripe for payments), competitive pricing, good accuracy
   - Cons: Newer product, fewer document types than Onfido
   - Best for: Simplicity if deep in Stripe ecosystem

   **Yoti**:
   - Pros: UK company, privacy-focused, digital ID option for returning users
   - Cons: Less market penetration, API less mature
   - Best for: Privacy-conscious positioning

   **Jumio**:
   - Pros: Enterprise-grade, global coverage
   - Cons: Higher pricing, may be overkill for MVP scale
   - Best for: International expansion plans

2. **Consider Stripe Identity Specifically**: If the platform is already committed to Stripe for payments, Stripe Identity offers:
   - Single provider relationship
   - Unified dashboard and reporting
   - Automatic KYC satisfaction for Stripe Connect
   - Competitive pricing
   - Simpler integration (one SDK)

3. **Test Verification Flows Before Committing**: Request sandbox access and test with real documents (your own). Evaluate:
   - Time to verification decision
   - Accuracy (does it correctly accept valid documents?)
   - False rejection rate (does it wrongly reject valid documents?)
   - User experience quality
   - API response speed and reliability

4. **Plan for Manual Review Fallback**: Even the best automated verification fails sometimes (damaged documents, unusual formats). Design a manual review queue with SLA:
   - Target: 80%+ automated verification success
   - Manual review SLA: 24-48 hours
   - Manual review staffing: Plan for 20% of verifications initially

5. **Data Processing Agreement**: All providers will process sensitive personal data (passport photos, selfies). Ensure:
   - Provider has appropriate certifications (ISO 27001, SOC 2)
   - Data Processing Agreement is GDPR-compliant
   - Data retention policy aligns with platform requirements
   - Data storage location is UK/EU

### Additional Considerations

**Dependencies:**
- DBS provider (Decision 4) may offer bundled identity verification
- Right-to-work verification (UKVI share codes) may require separate integration
- Payment provider (Stripe) has its own KYC requirements - Stripe Identity satisfies these automatically

**Hidden Risks:**
- Biometric data (selfies) creates additional GDPR obligations (explicit consent required)
- Document expiry: Verified identity today may be invalid tomorrow (visa expiry, name change)
- Liveness check circumvention: Sophisticated fraud can defeat some liveness checks
- Provider outages affect all onboarding

**Cost Implications:**
- Per-verification cost: 1-5 GBP (volume-dependent)
- Annual minimum commitment: Some providers require minimums
- Integration development: 1-2 weeks engineering time
- Manual review staffing: 0.25-0.5 FTE initially (assuming 20% manual review rate)

**Timeline Impacts:**
- Provider selection: Can be completed this week
- Integration specification: 1 week after selection
- Integration development: 1-2 weeks
- Testing and refinement: 1 week

---

## Decision 6: Mental Capacity Act Compliance

### Nature of the Consideration

The Mental Capacity Act 2005 establishes the legal framework for decisions made on behalf of adults who lack capacity to make those decisions themselves. This is directly relevant because:

- **Dementia** is a primary care need served by the platform
- **Family booking flows** involve one person booking care for another
- **LPA (Lasting Power of Attorney)** is the legal mechanism for decision authority

The decision is not whether to comply (compliance is mandatory), but how to implement compliance in product flows.

**Why it matters strategically:**

1. **Market Segment Access**: Dementia care is a significant and growing market segment. If the platform cannot safely serve families booking on behalf of cognitively impaired relatives, a major portion of the addressable market is excluded.

2. **Legal Exposure**: Booking care for someone who objects (but lacks capacity to consent) without proper legal authority is potentially:
   - False imprisonment (confining someone against their will)
   - Assault (touching without consent)
   - Deprivation of Liberty (if live-in or constant supervision)

   The platform could be complicit in facilitating these acts.

3. **Safeguarding Integration**: MCA compliance intersects with safeguarding. A care receiver who resists care may be exercising their rights (MCA says we presume capacity) or may be at risk and need protection. The platform must handle this carefully.

4. **Operational Complexity**: LPA verification is manual, document-based, and time-consuming. This affects family onboarding UX and operational staffing.

5. **Family Conflict Risk**: Multiple family members may have different views on care. Without clear legal authority verification, the platform could be caught in family disputes.

### Potential Impacts

**If MCA compliance framework is established:**

Positive:
- Dementia care market segment accessible with appropriate safeguards
- Legal exposure reduced through documented verification processes
- Family booking flows can be designed with clarity
- Safeguarding integration strengthened
- Terms of Service can specify authority requirements

Negative:
- Operational complexity (LPA verification is manual)
- Longer onboarding for family accounts
- Some families may be deterred by verification requirements
- Edge cases remain complex (fluctuating capacity, disputed authority)

**If MCA compliance is inadequate or absent:**

- Platform facilitates potentially unlawful care arrangements
- Safeguarding failures when care receiver objects
- Family dispute escalations with platform caught in the middle
- Regulatory criticism (local authority safeguarding, CQC if registered)
- Legal liability for facilitated false imprisonment or assault

**If decision is delayed:**

- Family booking flow cannot be designed
- Dementia-related care matching cannot be safely enabled
- Safeguarding procedures remain incomplete
- MVP launch risky for cognitive impairment users

### Options for Mitigating

1. **Legal Consultation (Schedule This Week)**: Engage a solicitor with MCA expertise (often elder law or Court of Protection specialists) to advise on:
   - When LPA verification is required vs optional
   - What self-declaration is acceptable
   - Platform liability when family member claims authority
   - Edge cases (no LPA, informal care arrangements, multiple family members)

   Cost: approximately 1,500-3,000 GBP for opinion and framework. Timeline: 2-3 weeks.

2. **Tiered Authority Verification**:

   **Tier 1 - Care Receiver Books Directly**: No additional verification (presumption of capacity applies).

   **Tier 2 - Family Books, Care Receiver Has Capacity**: Care receiver consent confirmation (in-app or signed document).

   **Tier 3 - Family Books, Care Receiver Lacks Capacity**:
   - LPA for Health and Welfare required
   - LPA certificate upload and verification
   - Check with Office of Public Guardian registry (if possible)

   This creates a graduated system that balances UX with protection.

3. **Capacity Self-Declaration**: Ask families to declare whether care receiver has capacity:
   - "Does [Care Receiver] understand and agree to this care arrangement?"
   - If "Yes" - Tier 2 (care receiver consent)
   - If "No" or "Unsure" - Tier 3 (LPA verification)

   Self-declaration shifts some liability to the declaring family member.

4. **LPA Verification Process**: Design a manual verification workflow:
   - Family uploads LPA certificate
   - Admin reviews document (check name, scope, registration status)
   - If Health and Welfare LPA: Approved
   - If Property and Finance LPA only: Not sufficient for care decisions
   - If no LPA: Cannot proceed without care receiver consent

   This requires trained admin staff and documented procedures.

5. **Safeguarding Integration**: Link MCA compliance to safeguarding flows:
   - If care receiver expresses objection to care: Pause booking, escalate to safeguarding
   - If caregiver reports resistance or distress: Admin review, contact family
   - Document all capacity-related concerns in safeguarding records

6. **Exclude Live-In Care for Incapacitated Users (MVP)**: Live-in care for someone lacking capacity creates Deprivation of Liberty risks (GD-06). Consider:
   - Live-in care only available if care receiver has capacity, OR
   - Live-in care requires DoLS authorization confirmation from family
   - This reduces risk while MVP proves operational capability

### Additional Considerations

**Dependencies:**
- DPIA (Decision 2) must address consent for data processing when care receiver lacks capacity (LPA holder consents on their behalf)
- Family account system design depends on MCA compliance framework
- Safeguarding policy must incorporate MCA principles
- Booking flow design cannot be finalized without MCA compliance clarity

**Hidden Risks:**
- LPA registration backlog: Office of Public Guardian has processing delays - some families have LPAs not yet registered
- LPA scope: Some LPAs restrict authority to specific decisions (may not cover care arrangements)
- Multiple attorneys: LPA may name multiple family members who must act jointly - creates complexity
- Revoked LPAs: Donor may have revoked LPA but family still holds certificate
- Fluctuating capacity: Care receiver may have capacity some days and not others

**Cost Implications:**
- Legal consultation: 1,500-3,000 GBP
- LPA verification staffing: Admin time per verification (20-30 minutes)
- Office of Public Guardian checks: If API access available, integration cost; otherwise manual
- Training for safeguarding/admin team: Approximately 1 day MCA training per person

**Timeline Impacts:**
- Legal consultation: 2-3 weeks
- Framework design: 1-2 weeks after legal advice
- Family booking flow development: Dependent on framework
- If not resolved: Dementia care market inaccessible at MVP launch

---

## Cross-Decision Dependencies

The six decisions are not independent. Key interdependencies:

| Decision | Depends On | Affects |
|----------|------------|---------|
| 1. CQC Registration | None | Insurance (scope), DPIA (processing basis), All Terms of Service |
| 2. DPIA | MCA (consent basis) | Privacy Policy, Technical Architecture, Integration decisions |
| 3. Insurance | CQC (scope) | Terms of Service, Caregiver Onboarding, Cost Model |
| 4. DBS Provider | CQC (check level) | Technical Integration, Onboarding Flow, Timeline |
| 5. ID Verification | DPIA (data processing) | Technical Integration, Onboarding Flow, KYC |
| 6. MCA Compliance | None | Family Booking Flow, Safeguarding Policy, DPIA (consent) |

**Critical Path**: Decisions 1 (CQC) and 6 (MCA) have no dependencies and should be prioritized first. They unlock downstream decisions and enable parallel work.

**Parallel Tracks Possible**:
- DBS Provider (4) and ID Verification (5) can proceed in parallel once CQC position is confirmed
- DPIA (2) can begin immediately but will incorporate MCA compliance findings
- Insurance (3) can be researched immediately but final requirements depend on CQC position

---

## Recommended Decision Timeline

| Week | Decisions | Actions |
|------|-----------|---------|
| **Week 1** | 1, 2, 6 | Engage regulatory solicitor (CQC), engage DPO/consultant (DPIA), schedule MCA consultation |
| **Week 1** | 4, 5 | Evaluate providers, request API documentation and sandbox access |
| **Week 1** | 3 | Contact insurance broker for consultation |
| **Week 2** | 1 | Receive CQC legal opinion |
| **Week 2** | 4, 5 | Select providers, begin contract negotiation |
| **Week 2** | 3 | Receive insurance requirements recommendation |
| **Week 2-3** | 6 | Receive MCA legal opinion |
| **Week 3** | All | Finalize all decisions, begin integration specifications |

---

## Financial Summary

### One-Time Costs (Professional Advice & Setup)

| Item | Cost Range (GBP) | Timeline |
|------|------------------|----------|
| CQC legal opinion | 3,000-5,000 | 1-2 weeks |
| DPIA consultant | 5,000-15,000 | 2-4 weeks |
| MCA legal consultation | 1,500-3,000 | 2-3 weeks |
| Insurance broker (free) | 0 | 1 week |
| DBS provider contract negotiation | 0 | 1-2 weeks |
| ID verification provider setup | 0 | 1-2 weeks |
| **Total Professional Advice** | **9,500-23,000** | **3-4 weeks** |

### Ongoing Annual Costs (Operating Expenses)

| Item | Cost Range (GBP) | Dependency |
|------|------------------|------------|
| Registered Manager salary | 45,000-60,000 | Only if CQC registration required |
| Compliance team | 35,000-45,000 | Only if CQC registration required |
| DPO service (fractional) | 6,000-18,000 | All scenarios |
| Platform Professional Indemnity | 5,000-20,000 | All scenarios |
| Platform Cyber Liability | 2,000-10,000 | All scenarios |
| Platform D&O | 3,000-8,000 | All scenarios |
| CQC inspection prep | 10,000-20,000 | Only if CQC registration required |
| **Total (No CQC)** | **16,000-56,000** | Per annum |
| **Total (With CQC)** | **106,000-181,000** | Per annum |

### Per-Transaction Costs (Variable with Volume)

| Item | Cost per Transaction (GBP) | Who Bears Cost |
|------|---------------------------|----------------|
| Identity verification | 1-5 | Platform |
| Enhanced DBS check | 38 + 10-25 admin = 48-63 | Platform or Caregiver |
| DBS Update Service subscription | 13 annually | Caregiver |
| Caregiver Public Liability insurance | 200-400 annually | Caregiver |
| Caregiver Professional Indemnity | Included above | Caregiver |

### Timeline Impact Costs

| Scenario | Timeline Impact | Opportunity Cost |
|----------|----------------|------------------|
| All decisions resolved Week 1-3 | No delay | Baseline |
| DPIA delayed or requires ICO review | +6-10 weeks | Launch delay, lost lead capture |
| CQC registration required | +3-6 months | Significant launch delay |
| Wrong provider selection (switching cost) | +4-8 weeks | Re-integration, caregiver re-verification |

---

## Strategic Recommendations

### Priority 1: Week 1 Actions (Immediate)

1. **Engage three professional advisors**:
   - Regulatory solicitor for CQC opinion (highest strategic impact)
   - DPO/GDPR consultant for DPIA (legal blocker)
   - MCA specialist solicitor (market access)

2. **Begin provider evaluation**:
   - Request DBS provider API documentation and pricing from Trustid, UKCBC, Atlantic Data
   - Request identity verification sandbox access from Stripe Identity, Onfido, Yoti
   - Contact insurance broker for care sector insurance consultation

### Priority 2: Week 2-3 Actions (Resolution)

1. **Receive and review legal opinions**:
   - CQC position finalized (enables all downstream work)
   - MCA framework defined (enables family booking flows)
   - DPIA in progress or complete (enables Privacy Policy drafting)

2. **Select providers**:
   - DBS provider selected and contract negotiated
   - Identity verification provider selected
   - Insurance requirements defined

3. **Document decisions**:
   - Update [product-decisions.md](../decisions/product-decisions.md) with all six decision outcomes
   - Update [gating-decisions.md](../decisions/gating-decisions.md) to close resolved items
   - Update [gap-registry.md](../../compliance/gap-registry.md) based on findings

### Priority 3: Week 4+ (Implementation)

1. **Technical specifications**:
   - DBS integration specification
   - Identity verification integration specification
   - Data architecture refinement based on DPIA findings

2. **Legal documentation**:
   - Privacy Policy drafting (requires DPIA completion)
   - Terms of Service finalization (requires insurance and MCA clarity)
   - Caregiver Terms of Service (requires all decisions)

3. **Phase 1 stabilization work**:
   - Begin agent work outlined in [next-steps.md](next-steps.md)
   - Compliance artifact creation
   - Document reconciliation

---

## Risk Assessment

### High-Risk Scenarios

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| CQC later requires registration | Medium | Catastrophic (forced shutdown or 6-month compliance scramble) | Obtain formal legal opinion, implement CQC-style policies proactively |
| DPIA identifies high residual risk requiring ICO review | Low-Medium | Major (2+ month delay) | Engage experienced DPO, prepare comprehensive data architecture documentation |
| MCA non-compliance leads to safeguarding incident | Medium | Catastrophic (regulatory action, reputational damage) | Implement tiered verification, obtain legal framework, train staff |
| Wrong provider selection forces switch | Low-Medium | Moderate (4-8 week delay, re-integration cost) | Thorough evaluation, test sandbox environments, check references |
| Insurance gap creates uninsured liability | Medium | Major (financial exposure, claim defensibility issues) | Specialist broker consultation, comprehensive coverage review |
| Delayed decisions block development | High | Moderate (timeline slippage, wasted development) | Immediate professional engagement, parallel work where possible |

### Low-Risk Scenarios (Acceptable)

- **Incremental cost increases**: Insurance premiums or provider fees rise moderately - budget 10-20% contingency
- **Process refinement**: Initial verification processes require optimization - expected and manageable
- **Edge case handling**: Unusual situations (e.g., overseas LPA) require manual review - acceptable if <5% of cases

---

## Success Criteria

The six decisions will be considered successfully resolved when:

1. **CQC Position Documented**: Written legal opinion obtained and decision formally recorded in [product-decisions.md](../decisions/product-decisions.md)

2. **DPIA Completed**: ICO-compliant DPIA document produced, residual risks identified, and no ICO prior consultation required (or consultation complete if required)

3. **Insurance Framework Defined**: Platform insurance procured, caregiver insurance requirements specified in writing, verification process designed

4. **DBS Provider Contracted**: Provider selected, contract signed, API documentation received, integration timeline confirmed

5. **Identity Verification Provider Contracted**: Provider selected, contract signed, sandbox environment available, integration timeline confirmed

6. **MCA Framework Documented**: Legal opinion received, tiered verification process designed, LPA verification workflow specified, family booking flows can proceed

**Overall Success**: All six criteria met within 3 weeks, enabling Phase 1 agent work to begin in Week 4 with no blocking unknowns.

---

## Document References

| Document | Path | Relevance |
|----------|------|-----------|
| This Document | `docs/product/governance/founder-decisions-strategic-analysis.md` | Strategic analysis |
| Action Plan | [next-steps.md](next-steps.md) | Immediate actions |
| Audit Findings | [audit-findings.md](audit-findings.md) | System state analysis |
| Product Decisions | [product-decisions.md](../decisions/product-decisions.md) | Decision registry (DEC-002) |
| Gating Decisions | [gating-decisions.md](../decisions/gating-decisions.md) | Launch blockers (GD-01 through GD-10) |
| Marketplace Spec | [marketplace-spec.md](../spec/marketplace-spec.md) | Constitutional baseline |
| Legal Framework | [legal-framework.md](../../compliance/legal-framework.md) | Regulatory context |
| Gap Registry | [gap-registry.md](../../compliance/gap-registry.md) | Compliance gaps |

---

**Last Updated:** 2026-01-31
**Next Review:** After Week 3 (all decisions resolved)
**Owner:** Founder
**Status:** Active - Awaiting Decisions
