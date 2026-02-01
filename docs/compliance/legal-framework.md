# Legal & Regulatory Considerations - UK Elderly Care Marketplace

**Document Purpose**: Track legal requirements, regulatory compliance obligations, and open legal questions for the platform.

**Document Owner**: Product Team (requires legal counsel review)
**Last Updated**: 2026-02-01
**Status**: DRAFT - Requires Legal Review

**Recent Updates (2026-02-01)**:
- **PRICING MODEL PENDING**: Founder has deferred pricing decisions (FDR-008). Section 4 contains placeholder requirements; actual commission structure TBD.
- Added Section 4: Pricing Transparency & Commission Structure (placeholder - requires FDR-008 finalization)
- Added Section 5: Early Adopter Incentives - Legal & Regulatory Compliance (pending pricing strategy)
- Updated legal checklist items for pricing disclosure, Consumer Rights Act compliance, promotional pricing terms
- Added VAT considerations, Payment Services Regulations requirements, ASA pricing claims guidance

**IMPORTANT**: Sections 4 and 5 contain placeholder pricing assumptions (10% commission). These sections MUST be updated once FDR-008 (Pricing & Commission Structure) is finalized. See `/docs/governance/pricing-decisions-status.md` for pricing decision status and timeline.
- Added employment status risk mitigation for promotional incentives

---

## CRITICAL PRE-LAUNCH LEGAL DECISIONS

### 1. CQC (Care Quality Commission) Registration Requirement ✅ CONFIRMED

**Issue**: Does the platform require CQC registration?

**Founder Decision (FDR-002, 2026-02-01)**: Platform will NOT pursue CQC registration

**Legal Classification**: Introduction Agency Model (NOT a regulated care service provider)

**Legal Test** (Health and Social Care Act 2008):
CQC registration required if platform is:
1. Providing a **regulated activity**, OR
2. **Arranging** a regulated activity

**Platform's Legal Position**:
- Platform is a **technology marketplace** connecting self-employed independent professionals with service users (FDR-001)
- Platform does NOT provide care (caregivers are self-employed, NOT employees)
- Platform does NOT control care delivery (caregivers have full autonomy over methods, timing, approach)
- Platform does NOT create or manage clinical care plans (GP/family owns care planning)
- Platform provides marketplace infrastructure: discovery, booking, payment processing, quality signals (reviews), safeguarding reporting
- Platform is analogous to Uber, Airbnb, Bark.com (marketplace facilitators, NOT service providers)

**"Arranging" vs "Introducing"**:
- **Introducing**: Platform connects parties and steps back (NO ongoing involvement)
- **Arranging**: Platform controls service delivery, quality, staffing (YES ongoing involvement)
- **Platform Position**: Introduction Agency with safeguarding duties (Care Act 2014), NOT "arranging" regulated activities (Health and Social Care Act 2008)

**Platform Reality**: Platform has ongoing involvement (verification, payment processing, quality signals, safeguarding), BUT this does NOT constitute "arranging" because caregivers are self-employed with full control over care delivery.

**DECISION STATUS**: CONFIRMED by Founder (FDR-001 + FDR-002)

**Supporting Evidence**:
- **FDR-001** (2026-01-31): "Technology platform connecting independent professionals who are self-employed"
- **FDR-002** (2026-02-01): "We do not want to pursue CQC Registration"
- Platform provides tools and infrastructure, NOT care services
- Caregivers set own rates, control own availability, accept/decline bookings, substitute rights (genuine self-employment)

**Risk Mitigation Checklist**:
- [x] Decision documented in FDR-001 and FDR-002
- [x] Gating Decision GD-01 resolved (2026-02-01)
- [ ] Obtain formal legal opinion from regulatory solicitor confirming Introduction Agency status (defensive documentation) - Week 1-2
- [ ] Implement Care Act 2014 safeguarding policies (mandatory regardless of CQC status)
- [ ] Document legal rationale for Introduction Agency classification
- [ ] Monitor CQC guidance on digital care platforms for regulatory evolution
- [ ] Maintain "registration-ready" status: identify potential Registered Manager candidate (contingency if CQC challenges position)

**Regulations That STILL Apply** (No CQC registration, but compliance mandatory):
- **Care Act 2014**: Safeguarding duties, duty to report concerns to Safeguarding Adults Boards
- **GDPR / Data Protection Act 2018**: Data protection, DPIA, privacy
- **Mental Capacity Act 2005**: Capacity presumption, best interests, LPA recognition
- **Equality Act 2010**: Non-discrimination, reasonable adjustments
- **Consumer Rights Act 2015**: Clear service descriptions, cancellation rights, refunds
- **Immigration Act 2014**: Right to work verification
- **Safeguarding Vulnerable Groups Act 2006**: DBS disclosure requirements
- **Health and Safety at Work Act 1974**: Safe systems (limited scope for platform)

**If CQC Challenges Position in Future**:
- Legal opinion provides documented defense
- Voluntary CQC-aligned policies demonstrate quality commitment
- Registered Manager candidate reduces registration timeline from 6 months to 3 months
- Business model can be restructured if absolutely necessary

---

### 1A. Introduction Agency Model - Legal Foundation

**What is an Introduction Agency?**

An Introduction Agency is a business that connects service users with self-employed professionals who provide services independently. The agency facilitates the connection but does NOT:
- Employ the professionals
- Control how services are delivered
- Guarantee service quality or outcomes
- Operate as a regulated service provider

**Legal Precedents Supporting Introduction Agency Classification**:

1. **Uber BV v Aslam [2021] UKSC 5** (Supreme Court):
   - Uber drivers found to be "workers" due to excessive platform control
   - Platform control indicators: mandatory acceptance of jobs, performance ratings affecting continued engagement, no rate-setting autonomy
   - **Platform mitigation**: Ensure caregivers have full autonomy (rate-setting, booking acceptance/decline, substitution rights)

2. **Pimlico Plumbers Ltd v Smith [2018] UKSC 29**:
   - Self-employed plumber found to be "worker" due to control and mutuality of obligation
   - **Platform mitigation**: No mutuality of obligation (no guaranteed work, no obligation to accept bookings)

3. **Addison Lee Ltd v Gascoigne [2018] UKEAT 0289_17_0103**:
   - Control over work performance indicates employment relationship
   - **Platform mitigation**: Platform does NOT control care delivery methods

**Key Legal Tests for Introduction Agency Status**:

| Test | Introduction Agency (Platform) | Regulated Service Provider |
|------|-------------------------------|---------------------------|
| **Employment Status** | Professionals are self-employed | Professionals are employees/workers |
| **Control Over Service Delivery** | Professionals control methods, timing | Provider controls how service delivered |
| **Rate Setting** | Professionals set own rates | Provider sets rates |
| **Booking Acceptance** | Professionals can decline | Provider assigns work |
| **Substitution Rights** | Professionals can send substitutes | No substitution (personal service) |
| **Clinical Governance** | No clinical oversight | Clinical governance structure |
| **Care Plans** | GP/family owns care plans | Provider creates/manages care plans |
| **CQC Registration** | NOT required | Required for regulated activities |

**Platform Alignment with Introduction Agency Model**:
- ✓ Caregivers are self-employed (FDR-001)
- ✓ Caregivers set own hourly rates (within platform guidance)
- ✓ Caregivers control own availability
- ✓ Caregivers can accept/decline any booking request
- ✓ Caregivers can arrange qualified substitutes
- ✓ Platform does NOT create or manage clinical care plans
- ✓ Platform does NOT control care delivery methods
- ✓ Platform provides marketplace infrastructure only

---

### 1B. Self-Employed Caregiver Status - Legal Requirements

**Why Self-Employment Status Matters**:
- Determines tax obligations (PAYE vs self-assessment)
- Determines employment rights (workers/employees have rights; self-employed do not)
- Determines platform liabilities (vicarious liability, employment tribunal claims)
- Determines CQC registration requirements (employees trigger registration; self-employed do not)

**IR35 Compliance** (Off-Payroll Working Rules):

IR35 determines whether self-employed person is actually a "disguised employee" for tax purposes.

**Three Key Tests**:
1. **Control**: Who controls how, when, where work is done?
   - **Platform position**: Caregiver controls care delivery methods, timing, approach
   - **Evidence**: Rate-setting autonomy, booking acceptance/decline, availability control

2. **Substitution**: Can professional send a substitute?
   - **Platform position**: YES - caregiver can arrange qualified substitute (subject to verification)
   - **Evidence**: Substitution feature in product roadmap

3. **Mutuality of Obligation (MOO)**: Is there obligation to offer/accept work?
   - **Platform position**: NO - platform has no obligation to offer bookings; caregiver has no obligation to accept
   - **Evidence**: Booking request/acceptance workflow (caregiver can decline)

**Features That SUPPORT Self-Employed Status**:
- Caregiver sets own hourly rate
- Caregiver controls own availability calendar
- Caregiver can decline any booking request
- Caregiver can arrange qualified substitute
- Platform does NOT mandate care delivery methods
- Platform does NOT provide equipment, uniforms, or tools
- Platform does NOT offer employment benefits (holiday pay, sick pay, pension)
- Platform does NOT discipline caregivers for care quality (only for platform policy violations)

**Features That Would UNDERMINE Self-Employed Status** (MUST AVOID):
- Platform assigns bookings (no decline option)
- Platform mandates minimum hours or guaranteed work
- Platform controls care delivery methods (mandatory procedures, scripts)
- Platform provides mandatory uniforms or equipment
- Platform manages caregiver performance (care quality ratings affecting continued engagement)
- Platform prohibits substitution
- No control over rates (platform sets rates)

**Platform Terms of Service Requirements**:
- Explicit self-employment declaration by caregiver
- Statement that caregiver is NOT employee, worker, or agent of platform
- Caregiver's responsibilities as self-employed professional:
  - Own professional liability insurance
  - Own tax and National Insurance obligations (self-assessment)
  - Full control over care delivery methods
  - Right to accept/decline bookings
  - Right to set own rates
  - Right to arrange substitutes

---

### 2. Insurance Requirements & Liability (URGENT)

**Issue**: What insurance is required for caregivers and platform?

**Caregiver Insurance Requirements**:
- **Public Liability Insurance** (minimum £1M): Covers injury to care receiver or damage to property during care
  - Status: ✓ Mentioned in feature map (Section 10.7)
  - Required: YES (industry standard for self-employed care workers)

- **Professional Indemnity Insurance** (minimum £1M): Covers claims arising from professional negligence (e.g., improper transfer causing injury)
  - Status: ✗ NOT mentioned in feature map
  - Required: YES (likely required for personal care providers)

- **Employers Liability Insurance**: NOT applicable (caregivers are self-employed)

**Platform Insurance Requirements**:
- **Professional Indemnity Insurance** (£5M+): Platform's own liability for negligence in vetting caregivers, safeguarding failures
- **Cyber Liability Insurance**: Data breach, GDPR violations
- **Errors & Omissions Insurance**: Platform errors causing harm
- **Directors & Officers Insurance**: Protection for company directors

**Open Legal Questions**:
1. Is public liability insurance sufficient, or is professional indemnity also required?
2. What minimum coverage amounts are legally required vs. recommended?
3. Does platform have vicarious liability for caregiver actions?
4. Does escrow payment model create additional liability?

**Action Required**:
- [ ] Legal review of insurance requirements by healthcare law specialist
- [ ] Obtain insurance broker advice (specialist in care sector)
- [ ] Define mandatory insurance requirements for caregiver verification
- [ ] Obtain platform insurance policies BEFORE launch
- [ ] Document insurance requirements in caregiver terms of service

**Timeline**: Must resolve BEFORE MVP launch

---

### 3. Medication Assistance Legal Boundaries (CRITICAL)

**Issue**: What medication assistance can caregivers legally provide?

**Legal Framework**:
- **Medication prompting** (reminding someone to take medication): ✓ Legal, no training required
- **Handing medication to person** from pre-filled box: ✓ Legal (grey area, but generally accepted)
- **Administering medication** (giving medication directly, applying creams, etc.): Regulated activity, requires training

**Platform Feature** (Section 11.1):
- "Caregivers can prompt medication (non-clinical, not administer)"
- "Medication prompting logged in booking notes"

**Risk**: Caregiver crosses line into medication administration without realizing, causing harm (wrong medication, wrong dose, allergic reaction).

**Who is Liable?**:
- Caregiver (primary liability as self-employed)
- Care receiver/family (consented to arrangement)
- Platform (if failed to clarify boundaries, inadequate caregiver training)

**Action Required**:
- [ ] Define exact medication assistance boundaries in policy (CLEAR definitions)
- [ ] Mandatory caregiver training module on medication assistance limits
- [ ] Care receiver informed consent: "Caregiver will NOT administer medication"
- [ ] Warning in booking flow if care receiver requires medication administration
- [ ] Exclude medication administration from platform services (if not regulated properly)

**Clinical Governance**:
- Consider requiring caregivers offering medication assistance to complete specific training (e.g., RQF Level 2 Safe Handling of Medicines)
- Document medication assistance policy and get clinical review

**Timeline**: Must resolve BEFORE MVP launch

---

### 4. Mental Capacity Act 2005 Compliance (CRITICAL)

**Issue**: Platform will serve users with dementia, cognitive impairment, and other conditions affecting mental capacity. How does platform comply with Mental Capacity Act?

**Legal Principles** (Mental Capacity Act 2005):
1. **Presumption of capacity**: Assume person has capacity unless proven otherwise
2. **Right to make unwise decisions**: Capacity is decision-specific, not global
3. **Best interests**: Decisions for those lacking capacity must be in their best interests
4. **Least restrictive option**: Choose option that restricts rights and freedoms least
5. **Lasting Power of Attorney (LPA)**: Legal authority to make decisions on behalf of person lacking capacity

**Platform Scenarios**:
1. **Care receiver with dementia registers account**: Does care receiver have capacity to consent to care arrangements?
2. **Family member books care on behalf of cognitively impaired parent**: Does family member have legal authority? (LPA for health and welfare?)
3. **Care receiver with fluctuating capacity** (e.g., dementia): Capacity may vary day-to-day

**Current Gap in Feature Map**:
- Section 16.2 (Family Member Registration) captures "relationship to care receiver" but does NOT verify legal authority
- No mention of LPA verification
- No process for assessing mental capacity
- No best interests decision-making framework

**Action Required**:
- [ ] Add Mental Capacity Act compliance to legal framework
- [ ] Verify family member legal authority if care receiver has cognitive impairment:
  - Request LPA registration number (verify with Office of Public Guardian)
  - If no LPA, document that family member is acting informally (with care receiver's consent if they have capacity)
- [ ] Document best interests decision-making process for users lacking capacity
- [ ] Train admin team on Mental Capacity Act principles
- [ ] Add safeguarding alert if care receiver with cognitive impairment registers account (admin checks family oversight)

**Legal Risk**: Platform facilitates care arrangements for person lacking capacity without proper legal authority. Family member could be challenged by other family members or local authority.

**Timeline**: Must resolve BEFORE MVP launch (especially if targeting dementia care)

---

### 4A. Website-Specific Legal Considerations (TIER 1 LAUNCH)

**Issue**: Public-facing website launches alongside Tier 1 application. What legal requirements must be met?

**Regulatory Framework**:
- GDPR / Data Protection Act 2018: Privacy Policy, consent mechanisms
- PECR (Privacy and Electronic Communications Regulations): Cookie consent
- Consumer Rights Act 2015: Clear service descriptions, no misleading claims
- ASA (Advertising Standards Authority): Truthful, substantiated advertising claims
- Introduction Agency model disclosure requirements

**Website Legal Requirements** (Tier 1):

**1. Privacy Policy** (GDPR Article 13/14):
- [ ] Data controller information (company name, registration number, contact)
- [ ] What data is collected via website (contact forms, analytics cookies)
- [ ] Legal basis for processing (consent for newsletter, legitimate interest for inquiries)
- [ ] Data retention periods
- [ ] User rights (access, erasure, portability, withdraw consent)
- [ ] ICO registration number (once obtained)
- [ ] How to exercise rights (contact email)
- [ ] Third-party data processors (email service, analytics provider)
- [ ] Legal counsel review MANDATORY before publication

**2. Terms of Service** (Consumer Rights Act):
- [ ] Separate terms for care receivers and caregivers
- [ ] Introduction Agency model clearly explained (NOT a care provider)
- [ ] Caregiver self-employment status (NOT employees)
- [ ] Service scope limitations (companionship only at Tier 1)
- [ ] Platform liability limitations (within legal bounds)
- [ ] Cancellation and refund policies
- [ ] Governing law (English law) and jurisdiction
- [ ] Dispute resolution process
- [ ] Legal counsel review MANDATORY before publication

**3. Cookie Policy** (PECR):
- [ ] Explanation of cookies used (essential vs analytics vs marketing)
- [ ] Consent required for non-essential cookies
- [ ] How to manage cookie preferences
- [ ] Third-party cookies disclosed (Google Analytics, etc.)
- [ ] Cookie consent banner implemented (opt-in, not pre-ticked boxes)
- [ ] Legal counsel review RECOMMENDED

**4. Advertising Standards Compliance** (ASA):
- [ ] No unsubstantiated claims ("Best caregivers", "Guaranteed safety")
- [ ] No medical outcome promises
- [ ] No misleading CQC claims (platform is NOT CQC-registered per FDR-002)
- [ ] Voluntary DBS status clearly communicated (NOT mandatory at Tier 1)
- [ ] Introduction Agency status disclosed on multiple pages
- [ ] All claims truthful and substantiated

**5. Introduction Agency Disclosures** (Multiple Pages):
- [ ] Homepage: "Self-employed caregivers, not employees"
- [ ] How It Works: "Platform connects you with independent professionals"
- [ ] Trust & Safety: "Introduction Agency model" explained
- [ ] Terms of Service: Platform liability limitations clear
- [ ] About Us: Business model transparency

---

### 4. Pricing Transparency & Commission Structure (Consumer Rights Act 2015)

**Status**: PENDING - Awaiting FDR-008 (Pricing & Commission Structure decision)

**Placeholder Assumptions** (for legal analysis purposes only - NOT finalized):
- 10% commission on agreed transactions (PLACEHOLDER - actual rate TBD)
- Commission paid by caregiver (PLACEHOLDER - payer TBD)

**IMPORTANT**: This section uses placeholder assumptions for legal requirement analysis. Actual pricing model (commission percentage, who pays, minimum booking, early adopter program) is pending founder decision (FDR-008). See `/docs/governance/pricing-decisions-status.md` for decision timeline and status.

**Legal Requirements for Pricing Disclosure** (regardless of final pricing model):

**Consumer Rights Act 2015 - Clear Pricing Obligation**:
- [ ] Total price clearly stated before booking
- [ ] Breakdown of charges (caregiver rate vs platform commission vs service fees) transparent
- [ ] Who pays what must be unambiguous (caregiver pays commission vs care receiver pays service fee)
- [ ] No hidden fees (all charges disclosed upfront)
- [ ] Currency clearly stated (GBP)
- [ ] VAT status disclosed (if applicable)

**Recommended Implementation**:
1. **Caregiver-Paid Commission (RECOMMENDED)**:
   - Care receiver sees and pays caregiver's listed rate (e.g., £15/hour)
   - Platform deducts 10% commission from caregiver's earnings (caregiver receives £13.50/hour)
   - **Legal Advantage**: Simple, transparent pricing for care receivers (vulnerable adults benefit from clear costs)
   - **Consumer Rights Compliance**: Care receiver knows exact cost upfront (caregiver's listed rate)

2. **Care Receiver Service Fee (ALTERNATIVE)**:
   - Caregiver receives full rate (e.g., £15/hour)
   - Care receiver pays caregiver rate + platform service fee (e.g., £15 + 10% = £16.50/hour)
   - **Legal Requirement**: Must show total cost clearly before booking (£16.50/hour, not just £15/hour)
   - **Consumer Rights Risk**: Additional fee may appear as "hidden cost" if not prominently disclosed

**Terms of Service Requirements**:

**Caregiver Terms of Service**:
- [ ] Commission percentage stated clearly (10%)
- [ ] When commission is deducted (on booking completion)
- [ ] How commission is calculated (% of gross earnings)
- [ ] Examples provided (if caregiver charges £15/hour, receives £13.50/hour after 10% commission)
- [ ] Caregiver right to set own rates (within platform guidance)
- [ ] Platform right to adjust commission percentage with notice (e.g., 30 days)
- [ ] No commission on tips (if tipping feature implemented)

**Care Receiver Terms of Service**:
- [ ] Pricing structure explained (caregiver sets rate, care receiver pays listed rate)
- [ ] Platform does NOT set caregiver rates (caregivers are self-employed)
- [ ] Payment timing (when booking accepted, when funds released to caregiver)
- [ ] Cancellation and refund policy (>24 hours = full refund, <24 hours = no refund)
- [ ] Dispute resolution process (if payment disputes arise)

**Pricing Page Legal Requirements**:
- [ ] Headline: Clear statement of commission structure ("10% commission on completed bookings")
- [ ] Who pays: Unambiguous statement (caregiver pays 10%, care receiver pays caregiver's listed rate)
- [ ] What's included: Detailed list of services covered by commission (verification, payment processing, safeguarding, etc.)
- [ ] Examples: Real transaction breakdowns showing caregiver gross, commission, caregiver net, care receiver cost
- [ ] No hidden fees: Explicit statement ("No listing fees, no monthly fees, no withdrawal fees")
- [ ] Minimum booking: Stated clearly (e.g., "2-hour minimum booking")
- [ ] Cancellation policy: Clear terms (timeframes, refund amounts)

**Consumer Rights Act - Cancellation Rights**:
- [ ] Care receivers have right to cancel >24 hours before booking (full refund)
- [ ] Cancellations <24 hours may be non-refundable (to protect caregiver's time - this is lawful if clearly stated in terms)
- [ ] Exceptional circumstances policy (medical emergencies, family emergencies - platform discretion)
- [ ] Caregiver no-show: Full refund + caregiver account review

**VAT Considerations**:
- Platform commission: VAT may apply if platform VAT-registered (threshold: £90,000 annual revenue as of 2024)
- Caregiver services: Caregivers charge own rates; if VAT-registered, they add VAT to their rate (rare for individuals)
- **Legal Requirement**: If platform VAT-registered, commission + VAT must be disclosed (e.g., 10% commission + 20% VAT = 12% total deduction)
- **Founder Decision Needed**: Is platform VAT-registered or planning to register? (Update pricing accordingly)

**Payment Services Regulations 2017**:
- Platform uses Stripe for payment processing (Stripe is FCA-authorized payment institution)
- Platform holds funds in escrow between booking acceptance and completion (lawful under Payment Services Regulations)
- **Legal Requirement**: Terms of Service must explain escrow model and funds release timeline (2-3 business days)
- [ ] Caregiver terms: "Funds held securely and released 2-3 business days after booking completion"
- [ ] Care receiver terms: "Payment processed when caregiver accepts booking"

**Advertising Standards Authority (ASA) - Pricing Claims**:
- [ ] "Lowest commission in the industry" → Must be substantiated (compare to competitors: Care.com, Helpling, etc.)
- [ ] If claim made, document competitor pricing for ASA compliance
- [ ] Alternative phrasing: "One of the lowest commissions in the UK care marketplace" (softer claim, easier to defend)

**Open Legal Questions** (Require Legal Counsel Input):
1. **VAT Status**: Is platform VAT-registered or will it register when revenue exceeds £90k threshold? How does this affect commission disclosure?
2. **Commission Change Right**: What notice period is legally required if platform increases commission from 10% to (e.g.) 12%? Recommend 30 days minimum.
3. **Promotional Pricing**: If early adopter incentives offered (see below), must Terms of Service include expiration dates and reversion terms?

---

### 5. Early Adopter Incentives - Legal & Regulatory Compliance

**Founder Decision (2026-02-01)**: Open to considering early adopter incentives

**Recommended Incentive (From Marketing Roadmap)**: First 25 caregivers receive 5% commission (instead of 10%) for first 3 months

**Legal Requirements for Promotional Pricing**:

**Consumer Rights Act 2015 - Clear Terms**:
- [ ] Eligibility criteria stated clearly ("First 25 caregivers to complete verification")
- [ ] Duration stated clearly ("5% commission for first 3 months from approval date")
- [ ] Expiration clearly stated ("After 3 months, commission reverts to standard 10%")
- [ ] No bait-and-switch: Must honor promotional terms for eligible users
- [ ] Terms of Service must include promotional pricing section (if incentive approved)

**Advertising Standards Authority (ASA) - Promotional Claims**:
- [ ] "Limited time offer" → Must have genuine time limit or quantity limit (25 caregivers = quantity limit, lawful)
- [ ] "Founding Caregiver Program" → Descriptive, not misleading (lawful)
- [ ] Countdown timer ("X of 25 spots remaining") → Must be accurate and updated regularly (ASA requires truthfulness)

**Employment Status Risk - Promotional Incentives**:
- **Risk**: Preferential treatment of early caregivers could be interpreted as "employment benefit" (challenges self-employed status)
- **Mitigation**:
  - Frame as "limited-time market launch promotion" (not ongoing benefit)
  - Apply to all eligible caregivers equally (first 25, no discretion)
  - Time-limited (3 months only, reverts to standard 10%)
  - Document as marketing strategy, not employment benefit
  - Caregivers remain self-employed in all other respects (rate-setting, booking autonomy, substitution rights)

**Terms of Service Requirements for Promotional Pricing**:

**Caregiver Terms of Service - Promotional Pricing Section**:
- [ ] Eligibility: "First 25 caregivers to complete verification and receive admin approval between [start date] and [end date, if applicable]"
- [ ] Commission Rate: "5% commission on completed bookings (instead of standard 10%)"
- [ ] Duration: "Promotional rate applies for 3 months from date of admin approval"
- [ ] Expiration: "After 3 months, commission automatically reverts to standard 10% for all future bookings"
- [ ] Notice: "Platform will email you 30 days and 7 days before reversion to standard rate"
- [ ] No Retroactive Changes: "Bookings completed during promotional period are charged 5% commission (no retroactive increase)"
- [ ] Platform Right to Modify: "Platform reserves right to modify or terminate promotional offer with notice to remaining eligible caregivers"

**Website Disclosure Requirements**:
- [ ] Homepage banner: "Founding Caregiver Program - First 25 caregivers receive 5% commission for 3 months. [X] spots remaining."
- [ ] Caregiver signup page: Promotional terms displayed prominently before signup
- [ ] Pricing page: Promotional pricing section with eligibility and duration
- [ ] FAQ: "What is the Founding Caregiver Program?" with full terms
- [ ] Terms of Service: Full promotional pricing terms included

**Tax Implications for Promotional Pricing**:
- Caregivers receiving reduced commission (5% instead of 10%) earn MORE income during promotional period
- **Legal Requirement**: Caregivers are self-employed and responsible for declaring ALL earnings to HMRC
- Platform must provide accurate earnings statements including promotional period earnings
- [ ] Caregiver terms: "You are responsible for declaring all earnings to HMRC, including earnings during promotional periods"

**Equal Treatment / Non-Discrimination (Equality Act 2010)**:
- Promotional pricing must NOT discriminate based on protected characteristics (age, gender, race, disability, etc.)
- **Lawful Criteria**: "First 25 caregivers to sign up" is non-discriminatory (first-come, first-served)
- **Unlawful Criteria**: "First 25 female caregivers" or "First 25 caregivers under 30" would be discriminatory

**Competition Law (CMA - Competition and Markets Authority)**:
- Promotional pricing that undercuts competitors is lawful (predatory pricing only applies to dominant market positions)
- Platform is startup with no market dominance → No competition law concerns for promotional pricing

**Founding Member Badge - Compliance**:
- "Founding Caregiver 2026" badge is descriptive and factual (lawful)
- Badge must NOT imply superior quality or outcomes unless substantiated ("Founding Caregiver" = OK, "Premium Caregiver" without evidence = ASA risk)
- Badge can remain permanently on profile (no legal issue)

**Priority Support - Compliance**:
- Offering priority support to first 10-25 caregivers is lawful
- Must ensure standard support remains adequate for all users (no discriminatory denial of service)

**Search Priority Boost - Compliance**:
- Giving founding caregivers higher search ranking for 6 months is lawful (platform's commercial decision)
- Must disclose in Terms of Service: "Founding caregivers may receive priority placement in search results for first 6 months"
- Care receivers should be informed that search results may be influenced by founding status (transparency principle)

**Refund/Churn Risk - Legal Protection**:
- If caregiver completes 0 bookings during promotional period, no revenue loss to platform
- If caregiver churns after 3 months (when commission reverts to 10%), platform has gained market validation
- **Legal Protection**: Terms of Service should state no guaranteed work or earnings ("Self-employed, no obligation to provide bookings")

**Open Legal Questions** (Require Legal Counsel Input):
1. **Promotional Duration**: Is 3 months sufficient notice period, or should Terms of Service allow platform to extend if needed?
2. **Mid-Booking Expiration**: If a caregiver's promotional period expires mid-booking (e.g., booking accepted during Month 3, completed in Month 4), which rate applies? Recommend: Rate at time of booking acceptance.
3. **Referral Bonuses**: If implementing referral bonuses (e.g., £20 credit), are these taxable income for caregivers? Likely yes (legal counsel to confirm).

**Recommended Legal Counsel Review Topics**:
- [ ] Promotional pricing Terms of Service section (caregiver terms)
- [ ] ASA compliance for "limited spots remaining" countdown
- [ ] Tax treatment of promotional earnings (confirm caregiver self-assessment obligations)
- [ ] Employment status risk mitigation (confirm promotional pricing does not create "worker" status)

---

**Website Content Prohibited Claims** (Tier 1):
- ❌ "All caregivers DBS-checked" (DBS is voluntary at Tier 1, not mandatory)
- ❌ "CQC-registered platform" (platform NOT CQC-registered per FDR-002)
- ❌ "We provide care" (Introduction Agency does NOT provide care)
- ❌ "Guaranteed quality" or "Guaranteed safety" (no service can guarantee outcomes)
- ❌ "Best caregivers in the UK" (unsubstantiated superlative)
- ❌ Medical claims or health outcome promises

**Website Content Permitted Claims** (Tier 1):
- ✓ "ID-verified caregivers"
- ✓ "Admin-approved profiles"
- ✓ "Voluntary DBS verification available" (caregivers can upload existing DBS)
- ✓ "Care Act 2014 compliant safeguarding"
- ✓ "Introduction Agency connecting self-employed professionals"
- ✓ "Right to work verified"
- ✓ "Secure on-platform payments"

**Legal Review Checklist** (Website Launch):
- [ ] Legal counsel review of Privacy Policy, Terms of Service (both), Cookie Policy
- [ ] Legal counsel review of homepage claims and messaging
- [ ] Legal counsel review of Trust & Safety page
- [ ] Confirmation that Introduction Agency model is clearly disclosed
- [ ] Confirmation that no CQC-registration claims made (unless registered)
- [ ] Confirmation that voluntary DBS status is transparent
- [ ] ICO registration obtained before website launch
- [ ] Cookie consent mechanism PECR-compliant

**Timeline**: Legal review must complete within Week 1-3 of website build (4-week timeline). Legal sign-off MANDATORY before public launch.

**Risk Mitigation**:
- Obtain legal opinion confirming Introduction Agency status (defensive documentation)
- Monitor ASA complaints database for similar platforms
- Document legal rationale for all claims on website
- Update legal pages when service scope changes (each tier transition)

**Website Legal Maintenance** (Post-Launch):
- Update Privacy Policy when data processing changes (each tier)
- Update Terms of Service when service scope changes (each tier)
- Annual legal review of all legal pages regardless of changes
- Update Cookie Policy if analytics/marketing tools change

**Action Required**:
- [ ] Engage legal counsel for website legal page review (Week 1 of website build)
- [ ] Draft Privacy Policy (standard personal data only at Tier 1)
- [ ] Draft Terms of Service - Care Receivers (Introduction Agency model)
- [ ] Draft Terms of Service - Caregivers (self-employment status)
- [ ] Draft Cookie Policy (PECR-compliant)
- [ ] Legal counsel review and feedback (1-2 week turnaround)
- [ ] Implement legal feedback
- [ ] Final legal sign-off before website launch
- [ ] Obtain ICO registration (Week 3 of website build)

**Cost Estimate** (Legal Counsel - Website Only):
- Privacy Policy, Terms of Service (2 versions), Cookie Policy review: £2,000-£3,000
- Homepage and Trust & Safety page claims review: £500-£1,000 (optional but recommended)
- **Total**: £2,000-£4,000

**Dependencies**:
- Website build cannot launch without legal pages published
- Legal counsel must review BEFORE public launch (not after)
- ICO registration must be obtained before launch (or immediately after)

---

### 5. Deprivation of Liberty Safeguards (DoLS) - Live-In Care (CRITICAL IF LIVE-IN IN MVP)

**Issue**: Live-in care arrangements may constitute "deprivation of liberty" if care receiver lacks mental capacity.

**Legal Test** (Supreme Court "Cheshire West" judgment 2014):
Deprivation of liberty occurs if:
1. Person is under continuous supervision and control, AND
2. Person is not free to leave, AND
3. Person lacks capacity to consent to arrangements

**Live-In Care Risk**:
- Caregiver lives in care receiver's home (continuous supervision) ✓
- Care receiver may have dementia, limited mobility (not free to leave) ✓
- Care receiver may lack capacity to consent ✓

**Legal Requirement**:
If live-in care amounts to deprivation of liberty, and care receiver lacks capacity, DoLS authorization required from local authority.

**Platform Role**:
- Platform is not responsible for obtaining DoLS authorization (family's responsibility)
- BUT platform should:
  1. Warn families that DoLS may be required
  2. Require families to confirm care receiver consents OR has DoLS authorization
  3. Provide guidance on when DoLS is needed

**Action Required** (if live-in care in MVP):
- [ ] Legal review of live-in care arrangements and DoLS risk
- [ ] Add DoLS warning in live-in care booking flow
- [ ] Require family to confirm: "Care receiver consents to this arrangement, or appropriate legal authorization (DoLS) is in place"
- [ ] Provide DoLS guidance (link to local authority DoLS teams)
- [ ] Consider excluding live-in care from MVP until DoLS process defined

**Alternative**: Launch with hourly/daily care only, add live-in care post-MVP after DoLS process resolved.

**Timeline**: Must resolve BEFORE live-in care launched

---

### 6. Safeguarding Adults Boards (SABs) Liaison (REQUIRED)

**Issue**: Care Act 2014 requires collaboration with local authority Safeguarding Adults Boards. How does platform comply?

**Legal Requirement** (Care Act 2014, Section 43):
- Duty to report safeguarding concerns to local authority
- Duty to participate in safeguarding adult reviews (SARs) if serious case
- Duty to share information with SABs as appropriate (within GDPR limits)

**Current Feature Map**:
- Section 9.3 mentions "referral to local authority safeguarding team" ✓
- But: No specific process for SAB liaison

**Action Required**:
- [ ] Define SAB liaison procedures:
  - When to report safeguarding concerns to local authority (immediate danger, suspected abuse, neglect)
  - How to report (phone, email, online form - varies by local authority)
  - Information sharing protocols (balance safeguarding duty with GDPR confidentiality)
- [ ] Identify SAB contacts for each local authority in England (150+ local authorities)
- [ ] Document information sharing legal basis (GDPR Article 6(1)(d) - vital interests, or Article 9(2)(h) - health or social care)
- [ ] Train safeguarding team on SAB reporting
- [ ] Annual safeguarding report shared with relevant SABs (if requested)

**Timeline**: Must resolve BEFORE MVP launch

---

### 7. Right to Work Verification - Visa Restrictions (REQUIRED)

**Issue**: UKVI share code verification confirms visa exists, but NOT work restrictions (hours, job type). Platform liable if caregiver works illegally.

**Legal Requirement** (Immigration Act 2014):
- Employers (or platforms arranging work) must verify right to work
- Liability for civil penalty (up to £20,000 per illegal worker) if fail to verify
- Criminal liability if knowingly employ illegal worker

**Right to Work Check**:
- UK/Irish citizens: Passport or birth certificate (no restrictions)
- Settled status (ILR, EU settled status): No restrictions
- Visa holders: Check visa conditions (hours, job type, sponsor requirements)

**Visa Restrictions Example**:
- **Student visa**: 20 hours/week during term time, full-time during holidays
- **Graduate visa**: No restrictions (2-3 years)
- **Skilled Worker visa**: Can only work for sponsoring employer (NOT self-employed)
- **Health and Care Worker visa**: Can work in health/social care only

**Current Feature Map** (Section 10.3):
- "Share code entered, checked via UKVI service" ✓
- "Work restriction checks (full-time, part-time, hours limited)" ✓ Mentioned
- BUT: No detail on HOW restrictions are enforced

**Gap**: Caregiver on student visa works 40 hours/week. Platform facilitates illegal working.

**Action Required**:
- [ ] Manual admin review of visa conditions (not just automated share code check)
- [ ] Caregiver declares visa restrictions during registration:
  - Hours per week limit?
  - Job type restrictions?
  - Sponsor requirements?
- [ ] System tracks caregiver hours to prevent visa violations (if hours limit declared)
- [ ] Alert if caregiver approaches hours limit
- [ ] Annual re-verification of right to work (visa conditions may change)

**Timeline**: Must resolve BEFORE MVP launch

---

### 8. Data Protection Impact Assessment (DPIA) - MANDATORY

**Issue**: GDPR Article 35 requires DPIA for high-risk data processing. Platform triggers DPIA requirement.

**GDPR Article 35 Triggers** (DPIA required if processing involves):
1. Systematic monitoring of publicly accessible areas (e.g., CCTV)
2. Processing sensitive data (health data) on large scale ✓
3. Processing data of vulnerable individuals (elderly, children) ✓

**Platform triggers 2 and 3**: Processing health data (medical conditions) of vulnerable adults (elderly).

**DPIA is MANDATORY before launch.**

**DPIA Components**:
1. **Description of processing**: What data is collected, how, why, who has access
2. **Necessity and proportionality**: Why is processing necessary? Is it proportionate to purpose?
3. **Risk assessment**: What are risks to data subjects? (breach, discrimination, harm)
4. **Mitigation measures**: How are risks mitigated? (encryption, access controls, audit logs)
5. **Consultation**: Consult Data Protection Officer (DPO) or ICO if high risk

**Action Required**:
- [ ] Appoint Data Protection Officer (DPO) or data protection advisor
- [ ] Complete DPIA with DPO/advisor (2-4 weeks)
- [ ] Document DPIA and mitigation measures
- [ ] Submit to ICO if high residual risk identified (ICO may require changes before launch)
- [ ] Review DPIA annually or when processing changes

**Timeline**: Must complete BEFORE MVP launch (GDPR legal requirement)

---

### 9. Cookie Consent - PECR Compliance (REQUIRED)

**Issue**: Privacy and Electronic Communications Regulations (PECR) requires consent for non-essential cookies. Platform uses Google Analytics (tracking cookies).

**Legal Requirement** (PECR Regulation 6):
- **Essential cookies**: No consent required (authentication, security, user preferences)
- **Analytics cookies**: Consent required BEFORE placing cookie (Google Analytics, Mixpanel)
- **Marketing cookies**: Consent required

**Current Feature Map** (Section 13.2):
- "Cookie consent banner (analytics cookies require consent)" ✓ Mentioned
- Section 20.2 mentions Google Analytics and Mixpanel

**Compliant Cookie Consent**:
- Banner appears BEFORE analytics cookies placed
- Opt-in (not opt-out) - user must actively consent
- Clear explanation of cookie purposes
- Link to cookie policy
- Granular consent (accept all, reject all, customize)
- Easy to withdraw consent

**Action Required**:
- [ ] Implement PECR-compliant cookie consent banner (Cookiebot, OneTrust, or custom)
- [ ] Only place analytics cookies AFTER user consents (not on page load)
- [ ] Document essential vs. analytics vs. marketing cookies
- [ ] Publish cookie policy
- [ ] Respect user's cookie preferences across sessions

**Timeline**: Must implement BEFORE MVP launch (legal requirement)

---

### 10. Equality Act 2010 - Gender Preferences for Caregivers (SENSITIVE)

**Issue**: Platform allows care receivers to filter caregivers by gender (Section 4.2). Is this legal under Equality Act 2010?

**Equality Act 2010**:
- Prohibits discrimination based on protected characteristics (age, sex, race, religion, disability, etc.)
- Exceptions: Occupational requirements (Schedule 9)

**Occupational Requirement Exception**:
Gender preference may be lawful if:
1. Being a particular sex is an occupational requirement (genuine business need)
2. Requirement is proportionate means of achieving legitimate aim

**Examples**:
- **Lawful**: Muslim woman requires female caregiver for intimate personal care (religious/cultural reasons) ✓
- **Lawful**: Male care receiver with dementia prefers male caregiver for personal care (dignity, comfort) ✓
- **Unlawful**: Care receiver prefers female caregiver for companionship "because women are nicer" ✗ (discriminatory stereotype)

**Current Feature Map** (Section 4.2):
- "Filter by gender (if requested by care receiver for personal care)"

**This is reasonable**, but needs safeguards.

**Action Required**:
- [ ] Legal review of gender filtering feature by employment law specialist
- [ ] Require care receiver to justify gender preference:
  - Reason: Religious/cultural, dignity for personal care, dementia behavior, other
  - Only allow gender filter if justified reason provided
- [ ] Do NOT allow blanket gender preferences without justification
- [ ] Document legitimate reasons for gender preferences (policy)
- [ ] Caregiver terms of service: "Requests for specific genders may be made for personal care due to religious/cultural reasons or dignity considerations. This is lawful under Equality Act occupational requirement exception."

**Timeline**: Must resolve BEFORE MVP launch (gender filtering feature included)

---

## UK REGULATORY FRAMEWORK - SUMMARY

### Primary Legislation

1. **Health and Social Care Act 2008** (CQC registration, regulated activities)
2. **Care Act 2014** (safeguarding adults, wellbeing principle, duty to report)
3. **Mental Capacity Act 2005** (capacity, best interests, LPA, DoLS)
4. **Safeguarding Vulnerable Groups Act 2006** (DBS checks)
5. **Protection of Freedoms Act 2012** (DBS Update Service)
6. **GDPR / Data Protection Act 2018** (data protection, privacy, DPIA)
7. **Privacy and Electronic Communications Regulations 2003** (cookie consent)
8. **Immigration Act 2014** (right to work verification)
9. **Equality Act 2010** (non-discrimination, occupational requirements)
10. **Consumer Rights Act 2015** (clear service descriptions, cancellation, refunds)
11. **Payment Services Regulations 2017** (payment handling, escrow)
12. **Health and Safety at Work Act 1974** (duty of care, risk assessments)

### Regulatory Bodies

1. **CQC (Care Quality Commission)**: Healthcare regulator (if registration required)
2. **ICO (Information Commissioner's Office)**: Data protection regulator
3. **HMRC**: Tax compliance (self-employed caregivers, VAT if applicable)
4. **FCA (Financial Conduct Authority)**: If payment services regulated (Stripe handles this)
5. **Advertising Standards Authority (ASA)**: Marketing claims compliance
6. **Local Authority Safeguarding Adults Boards**: Safeguarding oversight (150+ local authorities)

---

## TIERED COMPLIANCE REQUIREMENTS (FDR-003)

**Strategic Decision**: The platform adopts a tiered market entry approach (FDR-003), with compliance requirements scaling to match service scope at each tier.

### Tier 1: Minimal (Launch) - Companionship Only

**Services Offered**: Companionship, light housework, shopping, meal preparation (no feeding assistance)

**Applicable Regulations**:

| Regulation | Requirement | Tier 1 Status |
|------------|-------------|---------------|
| **GDPR** | Standard personal data only | ✓ Applies |
| **GDPR Article 9** | Special category data | X Does NOT apply (no health data) |
| **PECR** | Cookie consent | ✓ Applies |
| **Care Act 2014** | Safeguarding duties (basic) | ✓ Applies |
| **Immigration Act 2014** | Right to work verification | ✓ Applies |
| **Equality Act 2010** | Non-discrimination | ✓ Applies |
| **Consumer Rights Act 2015** | Service descriptions, cancellations | ✓ Applies |
| **DBS Requirements** | Regulated activity checks | X NOT required (companionship is NOT regulated activity) |
| **Mental Capacity Act 2005** | Simplified approach | ✓ Applies (basic consent) |
| **CQC Registration** | Regulated service provider | X Does NOT apply (Introduction Agency) |

**Data Processing Scope (Tier 1)**:
- Name, email, phone, postcode (standard personal data)
- Generic service preferences (companionship, light assistance)
- Payment information (via Stripe - platform does not store)
- Review content
- NO medical conditions
- NO health-related care skills
- NO care plans or clinical documents

**DPIA Requirements**: Simplified DPIA for standard personal data + vulnerable persons processing (2,000-4,000 GBP, 1-2 weeks)

**DBS Position**: DBS checks are NOT legally required at Tier 1 because:
- Companionship is NOT a "regulated activity" under Safeguarding Vulnerable Groups Act 2006
- Personal care (washing, dressing, toileting) triggers regulated activity status
- Tier 1 does NOT offer personal care services
- Caregivers may voluntarily upload existing DBS certificates for "DBS Verified" badge (trust signal)
- Full DBS integration becomes mandatory at Tier 2 (personal care)

---

### Tier 2: Standard - Personal Care

**Services Added**: Personal care (washing, dressing, toileting), mobility assistance, medication prompting, overnight care

**Additional Regulations (Tier 2+)**:

| Regulation | Requirement | Tier 2 Status |
|------------|-------------|---------------|
| **DBS Requirements** | Enhanced DBS for regulated activity | ✓ NOW MANDATORY |
| **GDPR (skill-based data)** | May infer health status | ✓ Updated DPIA required |
| **Professional Insurance** | Public Liability + Professional Indemnity | ✓ Mandatory verification |
| **Qualification Verification** | NVQ Level 2, Care Certificate | ✓ Mandatory verification |
| **Care Act 2014** | Enhanced safeguarding protocols | ✓ Enhanced procedures |
| **Mental Capacity Act 2005** | Enhanced framework | ✓ Capacity assessment protocols |

**Data Processing Scope (Tier 2)**:
- Adds care skills data (may infer health by proxy - legal review required)
- Adds qualification documents
- Adds DBS certificate verification data
- Adds insurance verification data
- NO direct medical condition data (still deferred to Tier 3)

**DPIA Requirements**: Updated DPIA for skill-based data (3,000-5,000 GBP, 2-3 weeks)

**Legal Opinion Required**: Does "needs caregiver with dementia experience" constitute health data by inference under GDPR Article 9? This determines whether explicit consent mechanisms are required at Tier 2 or deferred to Tier 3.

---

### Tier 3: Enhanced - Condition-Specific Matching

**Services Added**: Live-in care, dementia-specific support, medical condition-specific matching, risk assessment

**Additional Regulations (Tier 3+)**:

| Regulation | Requirement | Tier 3 Status |
|------------|-------------|---------------|
| **GDPR Article 9** | Special category data (health) | ✓ NOW APPLIES |
| **GDPR Explicit Consent** | Article 9(2)(a) lawful basis | ✓ Mandatory consent mechanism |
| **Mental Capacity Act 2005** | Full MCA framework | ✓ Capacity assessment, LPA verification |
| **Deprivation of Liberty Safeguards (DoLS)** | Live-in care assessments | ✓ DoLS guidance framework |
| **Care Act 2014** | Safeguarding Adults Board liaison | ✓ SAB reporting procedures |
| **Data Security** | Enhanced security for health data | ✓ Security audit required |

**Data Processing Scope (Tier 3)**:
- Medical condition profiles (special category data)
- Care needs assessment data
- Risk assessment information
- Care plan documents (uploaded by family/GP)
- Care complexity indicators
- Emergency health information

**DPIA Requirements**: Full DPIA for special category data (8,000-15,000 GBP, 4-6 weeks)

**ICO Prior Consultation**: May be required if residual high risks identified (adds 4-8 weeks)

---

### Tier 4: Comprehensive - Care Coordination

**Services Added**: Care plan management, multi-caregiver coordination, NHS/LA integration

**Additional Regulations (Tier 4+)**:

| Regulation | Requirement | Tier 4 Status |
|------------|-------------|---------------|
| **NHS Data Security Toolkit** | For NHS integration | ✓ Required for NHS contracts |
| **ISO 27001** | Information security certification | ✓ Highly recommended |
| **Clinical Governance** | Registered Manager (if required) | ? CQC registration reassessment |
| **CQC Registration** | May be required at scale | ? Commercial decision point |

**DPIA Requirements**: Comprehensive DPIA for full health data and care coordination (15,000-25,000 GBP, 6-8 weeks)

**CQC Reassessment**: At Tier 4 scale, platform should reassess whether CQC registration provides commercial advantage (NHS/LA contracts often require it) vs. cost burden.

---

### Tier Progression Gates (Legal/Compliance)

| Gate | Legal Requirements | Timeline | Cost |
|------|-------------------|----------|------|
| **Tier 1 → Tier 2** | Updated DPIA, DBS integration, legal opinion on skill-based data | 2-3 weeks | 5,000-8,000 GBP |
| **Tier 2 → Tier 3** | Full DPIA, explicit consent mechanism, MCA/DoLS policies, SAB liaison | 4-6 weeks | 15,000-25,000 GBP |
| **Tier 3 → Tier 4** | NHS Data Security Toolkit, ISO 27001, CQC registration decision | 6-12 months | 50,000-100,000 GBP |

**See**: [Tiered Market Entry Roadmap](/docs/ROADMAP.md) for complete tier specifications and success metrics.

---

## OPEN LEGAL QUESTIONS (REQUIRE LEGAL COUNSEL)

### High Priority (Must Resolve Before MVP)

1. **CQC Registration**: Does platform require CQC registration? (URGENT - 3-6 month lead time)
2. **Insurance Requirements**: What insurance is required for caregivers and platform? (URGENT)
3. **Medication Assistance**: What boundaries for medication assistance? (CRITICAL - clinical governance)
4. **Mental Capacity Act**: How to verify family member legal authority (LPA)? (CRITICAL - dementia care)
5. **Deprivation of Liberty**: DoLS risk for live-in care? (CRITICAL if live-in in MVP)
6. **Safeguarding Adults Boards**: SAB liaison procedures? (REQUIRED)
7. **Right to Work**: How to enforce visa restrictions? (REQUIRED)
8. **DPIA**: Complete DPIA? (MANDATORY - GDPR)
9. **Cookie Consent**: Implement PECR-compliant consent? (REQUIRED)
10. **Gender Preferences**: Equality Act compliant gender filtering? (REQUIRED)

### Medium Priority (Resolve Pre-Launch or Early Post-Launch)

11. **VAT**: Is platform liable for VAT on care services? (Services exempt, but platform fee may be taxable)
12. **IR35**: Are caregivers genuinely self-employed? (Off-payroll working rules)
13. **Vicarious Liability**: Is platform liable for caregiver actions? (Tort law, employment status)
14. **Terms of Service**: Legal review of caregiver and care receiver terms?
15. **Complaints Procedure**: Legal requirements for complaints handling?
16. **Advertising**: ASA compliance for marketing claims (e.g., "verified caregivers")?

### Low Priority (Post-Launch)

17. **International Expansion**: If expanding beyond UK, what regulations apply? (EU, US, etc.)
18. **Partnerships**: Legal structure for partnerships with care agencies, NHS, local authorities?
19. **Telecare Integration**: If adding remote monitoring, what medical device regulations apply?

---

## LEGAL COUNSEL ENGAGEMENT PLAN

### Phase 1: Pre-MVP Legal Review (URGENT - 8-12 weeks)

**Scope**:
1. CQC registration requirement assessment
2. Insurance requirements review
3. Medication assistance boundaries (clinical governance review)
4. Mental Capacity Act compliance framework
5. Deprivation of Liberty risk assessment (if live-in care)
6. Safeguarding Adults Boards liaison procedures
7. Right to work verification process
8. DPIA completion (with DPO or data protection lawyer)
9. Cookie consent PECR compliance
10. Gender preferences Equality Act review

**Deliverables**:
- Legal opinion on CQC registration (written advice)
- Insurance requirements specification
- Medication assistance policy (clinical governance approved)
- Mental Capacity Act compliance procedures
- DoLS risk assessment and guidance (if live-in care)
- SAB liaison procedures
- Right to work verification process documentation
- Completed DPIA (signed by DPO)
- Cookie consent implementation specification
- Gender filtering policy (Equality Act compliant)

**Legal Counsel Required**:
- Healthcare law specialist (CQC, clinical governance, medication)
- Data protection lawyer or DPO (DPIA, GDPR, PECR)
- Employment law specialist (IR35, Equality Act, right to work)
- Insurance broker (specialist in care sector)

**Budget Estimate**: £15,000 - £30,000 (depending on complexity)

**Timeline**: 8-12 weeks (excluding CQC registration process if required)

---

### Phase 2: CQC Registration (IF REQUIRED - 3-6 months)

**Process**:
1. Submit CQC registration application
2. Appoint Registered Manager (named individual, qualifications required)
3. Prepare Statement of Purpose and Service User Guide
4. Submit policies and procedures (safeguarding, quality assurance, complaints, etc.)
5. CQC desktop review
6. CQC inspection (if required)
7. CQC registration granted

**Cost**: £3,500 - £5,000 (CQC registration fee + legal support)

**Timeline**: 3-6 months (CQC target: 4 months)

---

### Phase 3: Ongoing Legal Compliance (Post-Launch)

**Annual Legal Reviews**:
- Terms of Service review (annual)
- Privacy Policy review (annual or when GDPR guidance changes)
- Compliance audit (annual)
- DPIA review (annual or when processing changes)

**Ad-Hoc Legal Support**:
- Safeguarding incident legal advice (as needed)
- Dispute resolution legal support (as needed)
- Regulatory inquiries response (CQC, ICO, HMRC)

**Budget Estimate**: £5,000 - £10,000 per year (retainer + ad-hoc advice)

---

## COMPLIANCE CHECKLIST - MVP LAUNCH

**Cannot launch until ALL items checked**:

### Regulatory Compliance
- [ ] CQC registration obtained (if required) OR legal opinion confirming not required
- [ ] ICO data protection registration completed
- [ ] DPIA completed and signed
- [ ] Safeguarding Adults Boards liaison procedures documented

### Verification & Safety
- [ ] DBS partner organization contract signed (Trustid, UKCBC, etc.)
- [ ] Identity verification service integrated (Onfido, Stripe Identity, Yoti)
- [ ] Right to work verification process implemented (UKVI share code checks)
- [ ] Insurance requirements defined (public liability + professional indemnity)

### Legal Agreements
- [ ] Care receiver Terms of Service (legal review complete)
- [ ] Caregiver Terms of Service (legal review complete, self-employed status clear)
- [ ] Privacy Policy (GDPR compliant, legal review complete)
- [ ] Cookie Policy (PECR compliant)
- [ ] Acceptable Use Policy
- [ ] Safeguarding Policy (Care Act 2014 aligned)
- [ ] Complaints Policy
- [ ] Cancellation & Refund Policy (Consumer Rights Act compliant)

### Data Protection
- [ ] Cookie consent banner (PECR compliant, opt-in for analytics)
- [ ] Data subject rights interface ("Download My Data", "Delete My Account")
- [ ] Data retention policy documented
- [ ] Data processing agreements signed with third parties (Stripe, email provider, SMS)
- [ ] GDPR-compliant data storage (UK/EU servers)

### Mental Capacity & Safeguarding
- [ ] Mental Capacity Act compliance procedures (LPA verification)
- [ ] Medication assistance boundaries policy (clinical governance approved)
- [ ] Deprivation of Liberty risk assessment (if live-in care)
- [ ] Safeguarding incident reporting workflow
- [ ] Emergency escalation protocols

### Employment & Equality
- [ ] IR35 compliance (self-employed status clear in caregiver terms)
- [ ] Right to work verification (visa restrictions tracking)
- [ ] Gender preference policy (Equality Act compliant, occupational requirement justified)
- [ ] Accessibility compliance (WCAG 2.1 AA)

### Financial & Tax
- [ ] Payment Services Regulations compliance (escrow, refunds, dispute resolution)
- [ ] VAT assessment (exempt services vs taxable platform fee)
- [ ] Caregiver tax guidance (self-assessment, HMRC registration)
- [ ] Platform insurance obtained (professional indemnity, cyber liability)

---

## LEGAL RISK REGISTER

### Critical Risks (Cannot Launch Without Mitigation)

| Risk | Impact | Likelihood | Mitigation | Status |
|------|--------|------------|------------|--------|
| Launch without required CQC registration | Criminal prosecution, platform shutdown | High | Obtain legal opinion, register with CQC if required | OPEN |
| GDPR breach (no DPIA) | ICO fine (up to £17.5M or 4% revenue), reputational damage | High | Complete DPIA before launch | OPEN |
| Unqualified caregiver causes harm | Negligence claim, safeguarding failure, CQC action | Medium | Robust verification, qualification checks, skill matching | OPEN |
| Mental Capacity Act breach (family member no authority) | Legal challenge, safeguarding concern | Medium | LPA verification, Mental Capacity Act procedures | OPEN |
| Medication error causing harm | Negligence claim, caregiver liability, platform reputation | Medium | Clear medication boundaries, caregiver training | OPEN |

### High Risks (Mitigate Before Scale)

| Risk | Impact | Likelihood | Mitigation | Status |
|------|--------|------------|------------|--------|
| Caregiver not self-employed (IR35 challenge) | Back-taxes, NI contributions, employment rights | Medium | Clear self-employed terms, legal review | OPEN |
| Right to work breach (visa violations) | Civil penalty £20k per violation, criminal liability | Low | Visa restrictions tracking, admin review | OPEN |
| Cookie consent non-compliance (PECR) | ICO enforcement, fine up to £500k | Low | Implement opt-in cookie banner | OPEN |
| Gender preference discrimination claim | Equality tribunal, reputational damage | Low | Justified reasons only, legal review | OPEN |
| Deprivation of Liberty (live-in care) | MCA breach, safeguarding concern | Low | DoLS guidance, family confirmation | OPEN |

---

## TIER 1 LEGAL DOCUMENTS - COMPLETED ✅

**Date Completed**: 2026-02-01
**Status**: Draft documents completed by compliance specialist agent - **LEGAL COUNSEL REVIEW REQUIRED**

### Documents Created

The following legal documents have been drafted for Tier 1 launch:

| Document | Location | Word Count | Purpose |
|----------|----------|------------|---------|
| **Terms of Service - Care Receivers** | `/docs/tiers/tier1/website-content/legal/terms-care-receivers.md` | 7,500 | Legal contract for families booking care; Introduction Agency model; liability limitations |
| **Terms of Service - Caregivers** | `/docs/tiers/tier1/website-content/legal/terms-caregivers.md` | 8,500 | Legal contract for self-employed caregivers; IR35-compliant self-employment status |
| **Privacy Policy** | `/docs/tiers/tier1/website-content/legal/privacy-policy.md` | 6,000 | GDPR/Data Protection Act 2018 privacy notice (Tier 1 standard data only) |
| **Safeguarding Policy** | `/docs/tiers/tier1/website-content/legal/safeguarding-policy.md` | 7,000 | Care Act 2014 safeguarding policy; SAB liaison procedures |
| **Cookie Policy** | `/docs/tiers/tier1/website-content/legal/cookie-policy.md` | 3,500 | PECR cookie compliance; consent mechanism |
| **Legal Summary** | `/docs/tiers/tier1/website-content/legal/LEGAL_SUMMARY.md` | 5,500 | Overview of all documents; legal risks; review recommendations |

**Total**: ~38,000 words of legal documentation

### Key Legal Positions Documented

1. **Introduction Agency Model** (FDR-001, FDR-002):
   - Platform does NOT require CQC registration
   - Caregivers are self-employed (NOT employees)
   - Platform NOT liable for care quality
   - Platform provides marketplace infrastructure only

2. **IR35 Compliance** (Caregiver Self-Employment):
   - No mutuality of obligation
   - Caregiver control over work performance
   - Substitution rights
   - Rate-setting autonomy
   - Right to decline bookings

3. **GDPR Compliance** (Tier 1):
   - Standard personal data only (NO special category health data)
   - Lawful bases identified (contract, legitimate interest, legal obligation, vital interests)
   - Data retention periods (7 years for safeguarding/financial)
   - Data subject rights (access, rectification, erasure, portability)

4. **Care Act 2014 Safeguarding**:
   - Platform safeguarding duties
   - Section 42 escalation criteria
   - SAB liaison procedures
   - Safeguarding Lead requirements

5. **PECR Cookie Compliance**:
   - Essential vs. non-essential cookies
   - Consent mechanism requirements
   - Cookie inventory

### Critical Legal Reviews Required

| Review | Estimated Cost | Timeline | Priority |
|--------|----------------|----------|----------|
| **Introduction Agency Legal Opinion** | £3,000-5,000 | 1-2 weeks | CRITICAL |
| **IR35 Compliance Review** (Caregiver Terms) | £2,000-3,000 | 1 week | CRITICAL |
| **All Legal Documents Review** | £5,000-8,000 | 2-3 weeks | CRITICAL |
| **GDPR Compliance Audit** | £3,000-5,000 | 1-2 weeks | CRITICAL |
| **TOTAL PRE-LAUNCH LEGAL INVESTMENT** | **£13,000-21,000** | **3-4 weeks** | - |

### Placeholders to Replace Before Publication

All documents contain placeholders that MUST be replaced:
- `[COMPANY_NAME]`, `[PLATFORM_NAME]`, `[COMPANY_NUMBER]`, `[REGISTERED_ADDRESS]`
- `[ICO_NUMBER]` - **MUST obtain ICO registration before launch** (£40-60 annual fee)
- `[CONTACT_EMAIL]`, `[SUPPORT_EMAIL]`, `[SAFEGUARDING_EMAIL]`, `[DATA_PROTECTION_EMAIL]`
- `[SAFEGUARDING_LEAD_NAME]`, `[SAFEGUARDING_LEAD_EMAIL]`
- `[PLACEHOLDER: 10%]` - Commission percentage (PENDING FDR-008)
- `[EFFECTIVE_DATE]`, `[LAST_UPDATED_DATE]`

### Key Legal Risks Identified

**High-Severity** (MUST address before launch):
1. **CQC challenges Introduction Agency position** → Legal opinion required (£3,000-5,000)
2. **IR35 challenge to self-employment status** → Employment law specialist review (£2,000-3,000)
3. **Failure to escalate safeguarding to SAB** → Safeguarding Lead training, clear procedures
4. **Non-essential cookies set before consent** → Cookie consent banner implementation

**Medium-Severity**:
5. **Liability limitations unenforceable** → Legal review (Consumer Rights Act compliance)
6. **Mental Capacity Act compliance gaps** → LPA verification at Tier 2+, guidance for families
7. **GDPR lawful basis incorrectly identified** → GDPR compliance audit (£3,000-5,000)

### Pre-Launch Legal Checklist

- [ ] All 5 legal documents reviewed and finalized by qualified UK solicitor
- [ ] Legal opinion on Introduction Agency status obtained
- [ ] IR35 compliance confirmed by employment law specialist
- [ ] All placeholders replaced with actual company details
- [ ] ICO registration completed (Data Controller)
- [ ] Safeguarding Lead designated and trained (Level 3 Safeguarding Adults)
- [ ] Data Processing Agreements (DPAs) signed with Stripe and other third parties
- [ ] Cookie consent banner implemented and tested (PECR-compliant)
- [ ] Subject Access Request (SAR) procedure documented
- [ ] Data breach response plan documented and tested
- [ ] Safeguarding case management system implemented
- [ ] Staff training completed (GDPR, safeguarding, platform policies)
- [ ] Legal documents published on website with effective dates
- [ ] Terms acceptance flow implemented (checkboxes, electronic signature logging)

### Solicitor Specializations Required

- UK healthcare/social care law (Care Act 2014, CQC regulations)
- Employment law (IR35, self-employment classification)
- Data protection (GDPR, Data Protection Act 2018, PECR)
- Consumer law (Consumer Rights Act 2015)

**Recommended Firms**: National firms with healthcare and employment departments; specialist healthcare law firms (Hempsons, Capsticks, Bevan Brittan); data protection boutique firms

### Related Documents

- `/docs/tiers/tier1/website-content/legal/_index.md` - Directory index with review status
- `/docs/tiers/tier1/website-content/legal/LEGAL_SUMMARY.md` - Comprehensive summary and recommendations
- `/docs/governance/founder-decisions-responses.md` - FDR-001 (self-employed), FDR-002 (no CQC)
- `/docs/ROADMAP.md` - FDR-003 (tiered approach)
- `/docs/compliance/dpia.md` - Tier 1 DPIA (standard personal data only)

---

## NEXT STEPS

### Immediate Actions (Week 1-2)

1. **Engage legal counsel** (healthcare law specialist, employment law specialist, data protection lawyer) - ✅ **PRIORITY 1**
2. **Provide legal counsel with draft documents** and founder decisions (FDR-001, FDR-002, FDR-003)
3. **Introduction Agency legal opinion** (URGENT - supports FDR-002 CQC decision)
4. **Complete ICO registration** (Data Controller) - £40-60 annual fee - ✅ **PRIORITY 2**
5. **Designate Safeguarding Lead** and arrange Level 3 training - ✅ **PRIORITY 3**
6. **Resolve FDR-008** (Pricing & Commission Structure) to finalize Terms of Service
7. **Insurance requirements review** (contact specialist insurance broker)

### Short-Term Actions (Week 2-3)

8. **IR35 compliance review** (caregiver self-employment status)
9. **GDPR compliance audit** (data processing, lawful bases, third-party DPAs)
10. **Review and finalize all legal documents** based on legal counsel feedback
11. **Implement cookie consent banner** (PECR-compliant)
12. **Develop Subject Access Request (SAR) procedure**
13. **Develop data breach response plan**
14. **Sign Data Processing Agreements** with Stripe and other third parties

### Medium-Term Actions (Week 3-4)

15. **Replace all placeholders** with actual company details, ICO number, commission percentage
16. **Accessibility and plain English review** of finalized documents
17. **Publish legal documents** on website (with effective dates)
18. **Implement Terms acceptance flow** (checkboxes, electronic signature logging)
19. **Staff training** (GDPR, safeguarding, platform policies)
20. **Final legal sign-off** before launch

### Long-Term Actions (Post-Launch)

21. **Annual safeguarding policy review**
22. **Annual GDPR compliance audit**
23. **Terms of Service updates** (as needed for new features or regulatory changes)
24. **Monitor CQC guidance** on digital care platforms for regulatory evolution
25. **Maintain "registration-ready" status** (identify Registered Manager candidate if CQC challenges position)

---

**Document Status**: Legal framework updated with Tier 1 legal documents completion - Requires Legal Counsel Review

**Legal Disclaimer**: This document identifies legal considerations and open questions. The draft legal documents created are for legal counsel review and finalization. This document does NOT constitute legal advice. All legal matters must be reviewed by qualified legal counsel specializing in healthcare law, data protection, and employment law before launch.

---

**END OF DOCUMENT**
