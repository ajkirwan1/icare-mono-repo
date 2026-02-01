# Gating Decisions for Platform Launch

**Document Purpose**: Catalog all regulatory, legal, and policy decisions that MUST be resolved before platform launch. Each decision blocks critical systems and presents legal or safeguarding risk if unresolved.

**Document Owner**: Product & Legal Teams
**Last Updated**: 2026-02-01
**Status**: TIER 1 LAUNCH - PRICING PENDING (FDR-008 DEFERRED)

---

## Tiered Approach Impact (FDR-003)

The founder has adopted a tiered market entry strategy (FDR-003). This significantly changes which gating decisions block launch:

### Gating Decisions by Tier Impact

| Decision | Tier 1 (Launch) | Tier 2+ | Status |
|----------|-----------------|---------|--------|
| **GD-01: CQC Registration** | Not required | Not required | ✅ RESOLVED |
| **GD-02: DPIA** | Simplified DPIA (standard data) | Updated DPIA per tier | ✅ RESOLVED (Tiered) |
| **GD-03: Insurance** | Simplified (companionship) | Full requirements (personal care) | OPEN (T1 can proceed with basic requirements) |
| **GD-04: Mental Capacity Act** | Simplified approach | Full MCA framework | OPEN (Can defer to T3) |
| **GD-05: Medication Assistance** | NOT offered at T1 | Required at T2 | OPEN (Can defer to T2) |
| **GD-06: DoLS (Live-In Care)** | NOT offered at T1 | Required at T3 | OPEN (Can defer to T3) |
| **GD-07: SAB Liaison** | Basic safeguarding | Enhanced procedures | OPEN (Basic at T1, enhanced at T2+) |
| **GD-08: Right to Work** | Required at T1 | Required all tiers | OPEN (T1 blocker) |
| **GD-09: Cookie Consent** | Required at T1 | Required all tiers | OPEN (T1 blocker) |
| **GD-10: Equality Act** | Required at T1 | Required all tiers | OPEN (T1 blocker) |

**Key Insight**: Tier 1 launch requires resolution of GD-01, GD-02, GD-08, GD-09, GD-10 only. GD-03 to GD-07 can be simplified or deferred to later tiers.

**Pricing Decisions (FDR-008)**: Founder has deferred pricing model decisions (commission structure, minimum booking, early adopter program) to allow other implementation work to proceed. These decisions are required before Terms of Service legal review and public launch, but do NOT block core development work.

**Note**: Pricing is tracked as FDR-008 to avoid conflict with FDR-004 (Insurance Requirements) in the FDR registry.

**See**: [Tiered Market Entry Roadmap](/docs/ROADMAP.md) for complete tier definitions and progression gates.

---

## Pricing Model Decisions [PENDING - FDR-008]

### GD-11: Pricing & Commission Structure ⏳ PENDING (Non-Blocking)

**Decision Status**: PENDING (2026-02-01)

**Founder Direction**: Keep pricing decisions open for now and proceed with other aspects of implementation.

**Decision Needed**: Define pricing model and commission structure.

**Questions to Resolve**:
1. **Who pays commission**: Care receiver, caregiver, or split?
2. **Commission percentage**: 10%, 15%, 20%, 25%?
3. **Minimum booking duration**: 1 hour, 2 hours, 3 hours?
4. **Early adopter program**: Free period, reduced commission, bonus incentives for first users?

**Systems Affected**:
- SYS-07: Payment & Financial System (commission deduction logic)
- Caregiver Terms of Service (commission disclosure required)
- Care Receiver Terms of Service (pricing transparency required)
- Pricing page content (public disclosure)
- Caregiver onboarding materials (payout structure communication)
- Financial projections (revenue modeling)

**What CAN Proceed Without This Decision**:
- All core development (use placeholder commission rate)
- Infrastructure setup
- User authentication
- Profile systems
- Search and discovery
- Messaging
- Booking workflow (placeholder commission)
- Reviews and ratings
- Safeguarding and incident management
- Admin dashboard
- Most legal documents (Privacy Policy, Safeguarding Policy, Cookie Policy)

**What CANNOT Proceed Without This Decision**:
- Terms of Service legal review (commission must be disclosed)
- Pricing page publication (cannot publish unknown pricing)
- Caregiver onboarding materials finalization (payout structure must be clear)
- Stripe live mode configuration (commission rate must be configured)
- First live transaction (pricing must be finalized)

**Workaround Strategy**:
- Use placeholder commission rate (e.g., 15%) for development
- Draft Terms of Service with [PLACEHOLDER: Commission Structure] marker
- Delay Terms of Service legal review until pricing finalized
- Build all features with configurable commission (can be changed without code changes)

**Recommended Decision Timeline**: Finalize by Week 3 (before Terms of Service legal review)

**Timeline Impact**: Does NOT block core development. DOES block legal finalization and public launch.

**Cost Impact**: No direct cost impact. Affects revenue projections and unit economics.

**Recommended Action**:
1. Develop scenario models (10%, 15%, 20%, 25% commission)
2. Analyze competitor pricing (care.com, Elder, Cera)
3. Model caregiver take-home pay and care receiver total cost
4. Consider early adopter incentives (free period vs. reduced commission vs. bonuses)
5. Finalize pricing strategy by Week 3
6. Document decision in FDR-008 (Founder Decisions Responses)

**Resolution Date**: TBD (Target: Week 3)

---

## Critical Gating Decisions

### GD-01: CQC Registration Requirement ✅ RESOLVED

**Decision Status**: RESOLVED (2026-02-01)

**Founder Decision**: Platform will NOT pursue CQC registration (FDR-002)

**Rationale**: Platform operates as an Introduction Agency connecting self-employed independent professionals (FDR-001). This model does NOT require CQC registration under the Health and Social Care Act 2008 because:
- Caregivers are self-employed professionals, NOT employees or agency workers
- Platform does NOT control how care is delivered (caregiver autonomy over methods)
- Platform does NOT provide clinical care plans (GP/family owns care planning)
- Platform provides marketplace infrastructure (discovery, booking, payment, quality signals)
- Safeguarding duties under Care Act 2014 are separate from CQC registration requirements

**Regulated Activities That May Trigger CQC**:
- Personal care (washing, dressing, toileting) - ✓ Platform supports this
- Accommodation with nursing or personal care - ✓ Live-in care may trigger this
- Arranging regulated activities - ✓ Platform arranges personal care between parties

**Legal Opinion Requirement**:
While founder decision is confirmed, formal legal opinion from regulatory solicitor is STILL RECOMMENDED as defensive documentation if CQC challenges the Introduction Agency position in future.

**Remaining Actions**:
- [ ] Obtain formal legal opinion confirming Introduction Agency status (Week 1-2)
- [ ] Document legal rationale in detail (reference FDR-001 and FDR-002)
- [ ] Implement Care Act 2014 safeguarding policies (separate from CQC requirements)
- [ ] Monitor CQC guidance on digital care platforms for regulatory evolution

**Systems Previously Affected** (now unblocked):
- All systems can proceed with Introduction Agency model
- CQC-dependent features removed from feature map (see Action 1.1)
- Care Act 2014 safeguarding duties still apply (NOT CQC duties)

**Timeline Impact**: Launch timeline NO LONGER BLOCKED by CQC decision
**Resolution Date**: 2026-02-01

---

### GD-02: Data Protection Impact Assessment (DPIA) Completion ✅ RESOLVED (Tiered Approach)

**Decision Status**: RESOLVED (2026-02-01)

**Founder Decision**: Tiered DPIA approach matching market entry strategy (FDR-003)

**Approach**:
- **Tier 1 Launch**: Simplified DPIA for standard personal data only (2,000-4,000 GBP, 1-2 weeks)
- **Tier 2 Expansion**: Updated DPIA for skill-based data (3,000-5,000 GBP, 2-3 weeks)
- **Tier 3 Expansion**: Full DPIA for special category data (8,000-15,000 GBP, 4-6 weeks)
- **Tier 4 Expansion**: Comprehensive DPIA for full health data (15,000-25,000 GBP, 6-8 weeks)

### Tier 1 DPIA Scope (Launch - URGENT)

**Data Processing at Tier 1**:
- Name, email, phone, postcode (account creation)
- Generic service preferences (companionship, light assistance)
- Payment information (via Stripe - platform does not store card data)
- Review content (user-generated)
- NO medical conditions
- NO health-related care requirements
- NO care skills data
- NO clinical documents

**GDPR Article 35 Assessment for Tier 1**:
- Systematic monitoring: Limited (basic platform usage, not health monitoring)
- Special category data: NO (standard personal data only)
- Vulnerable individuals: YES (elderly users trigger DPIA requirement)
- ICO prior consultation: Unlikely required (low risk without special category data)

**Tier 1 DPIA Complexity**: SIMPLIFIED
- Can be completed in-house using ICO template with consultant review
- Does NOT trigger Article 9 special category requirements
- Does NOT require explicit consent for health data (no health data collected)
- Likely does NOT require ICO prior consultation (subject to DPO/consultant confirmation)

**Systems NOW Unblocked for Tier 1**:
- SYS-01: User Management (basic registration) [T1]
- SYS-04: Discovery (location-based search) [T1]
- SYS-05: Booking (companionship only) [T1]
- SYS-06: Messaging (basic communication) [T1]
- SYS-07: Payments (escrow processing) [T1]
- SYS-08: Reviews (basic ratings) [T1]
- SYS-09: Safeguarding (incident reporting) [T1]
- SYS-10: Verification (ID, right to work - NOT DBS at T1) [T1]
- SYS-12: Admin Operations [T1]
- SYS-13: Compliance & Audit (basic audit trails) [T1]
- SYS-14: Emergency Escalation [T1]

**Systems Still Blocked Until Tier 2**:
- SYS-02: Caregiver Capability (skill-based profiles) [T2]
- SYS-03: Medical Condition Matching [T3]
- SYS-10: DBS Integration (mandatory verification) [T2]
- SYS-11: Clinical Safety Monitoring [T3]

**Tier Impact Column** (see summary table below):
- GD-02: Tier 1 DPIA required for launch
- GD-03: Insurance requirements simplified at T1 (companionship only)
- GD-04: MCA compliance can be simplified at T1 (no condition-specific matching)
- GD-05: Medication assistance NOT offered at T1 (deferred to T2)
- GD-06: DoLS only required for T3 (live-in care)
- GD-07: DBS mandatory from T2 onwards (voluntary at T1)

**Recommended Action (Tier 1)**:
1. Engage DPO or data protection consultant for Tier 1 DPIA review (Week 1)
2. Complete simplified DPIA using ICO template (Week 1-2)
3. Confirm no ICO prior consultation required (consultant confirmation)
4. Document Tier 1 data minimization approach
5. Plan Tier 2 DPIA update trigger (when moving to personal care services)

**Timeline Impact**: Tier 1 DPIA can be completed in 1-2 weeks (vs. 4-6 weeks for full DPIA)
**Cost Impact**: 2,000-4,000 GBP for Tier 1 (vs. 10,000-15,000 GBP for full DPIA)
**Resolution Date**: 2026-02-01
**Decision Deadline (Tier 1 DPIA completion)**: Week 2

---

### GD-03: Insurance Requirements for Caregivers

**Decision Needed**: Define mandatory insurance types, minimum coverage amounts, and verification process for caregivers.

**Owner**: Legal + Risk Management

**Why It Blocks Launch**:
- Caregivers without adequate insurance create liability risk for platform
- If caregiver injures care receiver (e.g., during transfer, hoisting), who pays?
- Platform may be liable if we allowed uninsured caregiver to operate
- Insurance verification is part of caregiver onboarding (SYS-10)

**Required Insurance Types (Need Confirmation)**:
- Public Liability Insurance (minimum £1M) - ✓ Likely required
- Professional Indemnity Insurance (minimum £?M) - ✓ Likely required for personal care
- Personal Accident Insurance - ? Depends on self-employed status
- Employers Liability Insurance - X Not applicable (self-employed)

**Systems Affected**:
- SYS-02: Caregiver Capability & Verification System (insurance as capability requirement)
- SYS-10: Identity & Background Verification (insurance verification workflow)
- SYS-12: Admin Operations (admin verifies insurance certificates)
- SYS-17: Caregiver Dashboard (upload insurance documents)

**Recommended Action**:
1. Legal review of insurance requirements (1 week)
2. Consult insurance broker for typical care sector requirements
3. Define minimum coverage amounts for each policy type
4. Specify verification process (upload certificate, admin review, expiry tracking)
5. Document platform's own liability insurance (PI, cyber, D&O)

**Timeline Criticality**: HIGH
**Decision Deadline**: Week 3
**Impact If Delayed**: Cannot onboard caregivers; supply side blocked

---

### GD-04: Mental Capacity Act Compliance Framework

**Decision Needed**: How does platform verify family member has legal authority to book care on behalf of cognitively impaired care receiver? How does platform recognize Lasting Power of Attorney (LPA)?

**Owner**: Legal + Safeguarding Lead

**Why It Blocks Launch**:
- Mental Capacity Act 2005 requires:
  - Presumption of capacity unless proven otherwise
  - Best interests decisions for those lacking capacity
  - LPA holders have legal authority; family members without LPA do NOT
- Risk: Family member without legal authority books care for dementia patient who objects
- Risk: Platform facilitates care against person's wishes (false imprisonment, assault)
- Platform MUST verify legal authority if care receiver lacks capacity

**Key Questions**:
1. Does platform require family members to declare whether care receiver has capacity?
2. If care receiver lacks capacity, must family member upload LPA certificate?
3. Does platform require care receiver consent for family account creation?
4. How does platform handle conflicting instructions from care receiver vs. family member?

**Systems Affected**:
- SYS-16: Family & Multi-User Accounts (legal authority verification)
- SYS-01: User Management (consent tracking)
- SYS-03: Medical Condition Matching (cognitive impairment flags)
- SYS-09: Safeguarding & Incident Management (capacity concerns)
- SYS-13: Compliance & Audit System (MCA compliance documentation)

**Recommended Action**:
1. Legal opinion on MCA compliance requirements (1-2 weeks)
2. Define capacity assessment process (self-declaration vs. professional assessment)
3. Create LPA verification workflow (upload certificate, admin review)
4. Document best interests decision-making framework
5. Train safeguarding team on MCA principles

**Timeline Criticality**: URGENT
**Decision Deadline**: Week 2
**Impact If Delayed**: Cannot safely serve dementia/cognitive impairment users; major market segment blocked

---

### GD-05: Medication Assistance Boundaries

**Decision Needed**: Define exact legal boundaries for caregiver medication assistance. What is permitted vs. prohibited? What constitutes "administration" vs. "prompting"?

**Owner**: Clinical Governance Lead + Legal

**Why It Blocks Launch**:
- Unclear boundaries = caregivers cross line into medication administration
- Medication administration without qualification = unlawful, dangerous
- If caregiver gives wrong medication or dose, who is liable?
- Care receivers may expect caregivers to administer medication (platform must set expectations)

**Legal Boundaries (Need Confirmation)**:
- ✓ Prompting/reminding to take medication - LAWFUL (no training required)
- ? Handing medication to person - GREY AREA (depends on person's capacity)
- X Administering medication - UNLAWFUL without qualification/training
- X Crushing tablets, measuring liquid doses - UNLAWFUL without training

**Systems Affected**:
- SYS-02: Caregiver Capability & Verification (medication assistance as skill)
- SYS-03: Medical Condition Matching (medication prompting flagged)
- SYS-05: Booking System (medication assistance requests)
- SYS-11: Clinical Safety Monitoring (medication incidents)
- SYS-21: Content Management (caregiver training resources)

**Recommended Action**:
1. Clinical governance review of medication assistance boundaries (1 week)
2. Legal review of liability (1 week)
3. Define permitted vs. prohibited actions in policy
4. Create caregiver training module on medication assistance limits
5. Add warnings to booking flow when medication assistance requested
6. Require care receiver informed consent that caregiver will NOT administer medication

**Timeline Criticality**: HIGH
**Decision Deadline**: Week 3
**Impact If Delayed**: Cannot support medication assistance requests; care matching limited

---

### GD-06: Deprivation of Liberty Risk (Live-In Care)

**Decision Needed**: Does live-in care create deprivation of liberty risk? Should live-in care be excluded from MVP until DoLS process defined?

**Owner**: Legal + Safeguarding Lead

**Introduction Agency Model Impact**: Under FDR-001 and FDR-002, platform is Introduction Agency facilitating connections between self-employed caregivers and families. DoLS responsibility rests with family/care receiver, NOT platform. However, platform must provide guidance and verification tools.

**Why It Still Requires Resolution**:
- Live-in care for dementia patients may constitute "deprivation of liberty" if:
  - Person lacks capacity to consent to care arrangements
  - Arrangements involve constant supervision, restricted movement, no freedom to leave
- DoLS authorization required from local authority BEFORE care begins (family responsibility)
- Platform must ensure families understand their DoLS obligations
- Care Act 2014 safeguarding duty applies to platform

**Key Questions** (Updated for Introduction Agency model):
1. Should live-in care be included in MVP at all?
2. If yes, must family confirm care receiver consents OR has DoLS authorization?
3. Does platform provide DoLS guidance to families booking live-in care?
4. What safeguards prevent platform facilitating unlawful arrangements?

**Systems Affected**:
- SYS-05: Booking System (live-in care booking type)
- SYS-09: Safeguarding & Incident Management (DoLS monitoring)
- SYS-16: Family & Multi-User Accounts (DoLS consent verification)
- SYS-13: Compliance & Audit System (DoLS documentation)

**Recommended Action**:
1. Legal opinion on DoLS risk for live-in care (1 week)
2. **RECOMMENDED**: Exclude live-in care from MVP; launch with hourly/daily only
3. If live-in care in MVP: Require DoLS consent verification workflow
4. Document DoLS reporting procedures to local authority

**Timeline Criticality**: HIGH (if live-in care in MVP)
**Decision Deadline**: Week 2
**Impact If Delayed**: Live-in care feature blocked; potentially entire MVP blocked if live-in required

---

### GD-07: Safeguarding Adults Board Liaison Procedures

**Decision Needed**: Define procedures for reporting safeguarding concerns to local authority Safeguarding Adults Boards (SABs). Identify SAB contacts for each local authority.

**Owner**: Safeguarding Lead + Legal

**Why It Blocks Launch**:
- Care Act 2014 requires collaboration with local authority SABs
- Platform must report safeguarding concerns to SABs (statutory duty)
- Platform must participate in safeguarding adult reviews (SARs) if requested
- Operating without SAB liaison = Care Act non-compliance
- Cannot respond to safeguarding incidents without SAB contact procedures

**Key Questions**:
1. Which local authorities will platform operate in at launch? (Defines SAB list)
2. What threshold triggers SAB referral? (Immediate danger? All concerns?)
3. How does platform share information with SABs while respecting GDPR?
4. Who is authorized to make SAB referrals on behalf of platform?

**Systems Affected**:
- SYS-09: Safeguarding & Incident Management (external referral workflow)
- SYS-12: Admin Operations (admin initiates SAB referrals)
- SYS-13: Compliance & Audit System (SAB referral audit trail)
- SYS-14: Emergency Escalation (SAB may be emergency contact)

**Recommended Action**:
1. Define geographic scope of MVP (which local authorities)
2. Identify SAB contact for each local authority (1 week research)
3. Document SAB referral procedure (who, when, how)
4. Create information sharing protocol (GDPR-compliant)
5. Train safeguarding team on SAB liaison

**Timeline Criticality**: HIGH
**Decision Deadline**: Week 4
**Impact If Delayed**: Cannot respond to safeguarding incidents; Care Act breach

---

### GD-08: Right to Work Verification Process

**Decision Needed**: Define process for verifying caregiver right to work in UK, including manual review of visa conditions (not just share code check).

**Owner**: Compliance Lead + Legal

**Why It Blocks Launch**:
- Immigration Act 2014 requires employers to verify right to work
- Platform may be "employer" or "introducer" (legal status unclear - see GD-01)
- UKVI share code confirms visa exists but NOT work restrictions:
  - Student visa: 20 hours/week limit
  - Skilled Worker visa: Specific employer/role restrictions
  - Visitor visa: No work permitted
- Platform liable if caregiver works beyond visa restrictions (£20,000 fine per illegal worker)

**Key Questions**:
1. Is platform "employer" or "introducer" for right to work purposes?
2. Must platform track caregiver hours to prevent visa violations?
3. What process verifies visa conditions beyond share code?
4. Does platform require caregivers to self-declare visa restrictions?

**Systems Affected**:
- SYS-10: Identity & Background Verification (right to work verification)
- SYS-12: Admin Operations (admin reviews visa conditions)
- SYS-17: Caregiver Dashboard (caregiver declares visa restrictions)
- SYS-15: Calendar & Availability (track hours for visa compliance)

**Recommended Action**:
1. Legal opinion on platform's right to work obligations (1 week)
2. Define verification process: share code + manual admin review of visa conditions
3. Require caregivers to declare visa restrictions during onboarding
4. Track caregiver booking hours if visa limits apply
5. Block caregivers from accepting bookings if visa limit reached

**Timeline Criticality**: HIGH
**Decision Deadline**: Week 3
**Impact If Delayed**: Cannot onboard non-UK caregivers; supply side limited

---

### GD-09: Cookie Consent & PECR Compliance

**Decision Needed**: Implement PECR-compliant cookie consent banner (opt-in for analytics cookies before placement).

**Owner**: Engineering + Legal

**Why It Blocks Launch**:
- Privacy and Electronic Communications Regulations (PECR) requires:
  - Consent BEFORE placing non-essential cookies (analytics, marketing)
  - Clear cookie policy
  - Opt-out mechanism
- Analytics tools like Google Analytics cannot be used without prior consent
- ICO enforcement action for PECR breaches (£500,000 fines possible)

**Systems Affected**:
- SYS-20: Analytics & Reporting (Google Analytics, Mixpanel)
- SYS-21: Content Management (cookie policy page)
- SYS-22: Technical Infrastructure (cookie consent banner)

**Recommended Action**:
1. Implement cookie consent banner with opt-in for analytics (1 week)
2. Separate essential cookies (authentication) from analytics cookies
3. Publish cookie policy page
4. Test that analytics scripts only load after consent

**Timeline Criticality**: MEDIUM
**Decision Deadline**: Week 6
**Impact If Delayed**: Cannot use analytics tools; must launch without user tracking

---

### GD-10: Equality Act - Caregiver Gender Preferences

**Decision Needed**: Define legal basis for allowing care receivers to filter caregivers by gender. When is gender preference lawful vs. discriminatory?

**Owner**: Legal + Product

**Why It Blocks Launch**:
- Equality Act 2010 prohibits discrimination based on sex
- Gender preference for caregivers may be:
  - **Lawful**: Occupational requirement (e.g., intimate personal care for Muslim woman requires female caregiver)
  - **Unlawful**: Discriminatory preference without justification
- Platform enabling unlawful discrimination = platform liable
- Must balance care receiver dignity/cultural needs vs. caregiver discrimination

**Key Questions**:
1. Does platform allow blanket gender filtering or only for personal care bookings?
2. Must care receiver justify gender preference (religious/cultural reasons)?
3. Does platform require evidence of legitimate need (e.g., religious affiliation)?
4. Are male caregivers disadvantaged by gender filtering feature?

**Systems Affected**:
- SYS-04: Discovery & Advanced Search (gender filtering)
- SYS-03: Medical Condition Matching (personal care requires gender match)
- SYS-05: Booking System (gender preference on booking request)

**Recommended Action**:
1. Legal review of Equality Act gender preference case law (1 week)
2. Define legitimate reasons for gender preferences (religious, cultural, intimate care)
3. Require care receiver to justify gender preference (not default filter)
4. Document occupational requirement exception
5. Allow caregivers to challenge discriminatory preferences

**Timeline Criticality**: MEDIUM
**Decision Deadline**: Week 5
**Impact If Delayed**: Gender filtering feature blocked; personal care matching limited

---

## Summary: Gating Decision Timeline

| Decision | Owner | Criticality | Status | Deadline | MVP Systems Blocked |
|----------|-------|-------------|--------|----------|---------------------|
| GD-01: CQC Registration | Legal | URGENT | ✅ RESOLVED | Completed | NONE (unblocked 2026-02-01) |
| GD-02: DPIA Completion | Legal/DPO | URGENT | OPEN | Week 2 | SYS-01, 03, 06, 09, 11, 13, 18 |
| GD-03: Insurance Requirements | Legal/Risk | HIGH | OPEN | Week 3 | SYS-02, 10, 12, 17 |
| GD-04: Mental Capacity Act | Legal/Safeguarding | URGENT | OPEN | Week 2 | SYS-01, 03, 09, 13, 16 |
| GD-05: Medication Boundaries | Clinical/Legal | HIGH | OPEN | Week 3 | SYS-02, 03, 05, 11, 21 |
| GD-06: DoLS Risk (Live-In) | Legal/Safeguarding | HIGH | OPEN | Week 2 | SYS-05, 09, 13, 16 |
| GD-07: SAB Liaison | Safeguarding/Legal | HIGH | OPEN | Week 4 | SYS-09, 12, 13, 14 |
| GD-08: Right to Work | Compliance/Legal | HIGH | OPEN | Week 3 | SYS-10, 12, 15, 17 |
| GD-09: Cookie Consent | Engineering/Legal | MEDIUM | OPEN | Week 6 | SYS-20, 21, 22 |
| GD-10: Gender Preferences | Legal/Product | MEDIUM | OPEN | Week 5 | SYS-03, 04, 05 |

**Critical Path Update**: GD-01 (CQC Registration) RESOLVED. Critical path now: GD-02 (DPIA) and GD-04 (Mental Capacity Act).

**Immediate Actions (Week 1)**:
1. Engage regulatory solicitor for CQC opinion (GD-01)
2. Engage DPO for DPIA (GD-02)
3. Legal review of Mental Capacity Act requirements (GD-04)

**Contingency Plans**:
- If CQC registration required: Delay launch 6 months OR restructure as "introduction agency" to avoid CQC
- If live-in care creates DoLS risk: Remove live-in care from MVP
- If insurance requirements too onerous: Provide platform-level insurance to caregivers (increases costs)

---

**Document Status**: Complete
**Next Review**: Weekly until all decisions resolved
**Escalation**: Any decision delayed beyond deadline escalates to CEO/Board
