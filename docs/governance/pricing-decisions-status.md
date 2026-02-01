# Pricing Decisions Status & Implementation Strategy

**Document Purpose**: Track pricing model decisions and their impact on Tier 1 implementation.

**Created**: 2026-02-01
**Owner**: Founder & Product Director
**Status**: PRICING PENDING - IMPLEMENTATION PROCEEDING

---

## Executive Summary

The founder has decided to **keep pricing decisions open for now** and **proceed with other aspects of Tier 1 implementation**. This document tracks:

1. What pricing decisions are pending
2. What work can proceed without pricing decisions
3. What work is blocked by pricing decisions
4. When pricing decisions MUST be finalized
5. Recommended approach for resolving pricing questions

---

## Pricing Decisions Pending

### FDR-008: Pricing & Commission Structure

**Note**: Pricing is tracked as FDR-008 to avoid conflict with FDR-004 (Insurance Requirements) in the founder decisions registry at `/docs/governance/founder-decisions-responses.md`.

**Status**: PENDING (Deferred by founder on 2026-02-01)

**Questions Requiring Resolution**:

| Question | Options | Impact |
|----------|---------|--------|
| **Who pays commission** | Care receiver, caregiver, or split | Revenue model, pricing transparency, competitive positioning |
| **Commission percentage** | 10%, 15%, 20%, 25% | Unit economics, caregiver take-home pay, care receiver total cost |
| **Minimum booking duration** | 1 hour, 2 hours, 3 hours | Transaction value, caregiver earnings, care receiver flexibility |
| **Early adopter program** | Free period, reduced commission, bonus incentives | User acquisition cost, early user retention, cash flow |

---

## What Can Proceed Without Pricing Decisions

**The following Tier 1 implementation work is NOT blocked by pricing decisions and can proceed immediately:**

### Technical Development (Weeks 1-6)

**Infrastructure & Authentication**
- Database schema design (Tier 1 data only)
- Authentication system (registration, login, password management)
- Email and phone verification
- Role-based access control
- Session management

**User Profiles**
- Caregiver profile system (with placeholder commission)
- Care receiver profile system
- Family member proxy registration
- Emergency contact capture

**Verification System**
- ID verification (Stripe Identity integration)
- Right to work verification workflow
- Voluntary DBS certificate upload
- Admin approval workflow
- Verification status tracking

**Discovery & Search**
- Location-based search (postcode + radius)
- Caregiver results display
- Filtering (availability, rate range, DBS verified)
- Caregiver profile cards

**Booking System (Partial)**
- Booking request creation workflow
- Date/time selection
- Service type confirmation (companionship only)
- Caregiver accept/decline workflow
- Booking lifecycle management (pending, confirmed, in-progress, completed, cancelled)
- Cancellation workflow
- No-show management

**Messaging**
- In-app messaging (care receiver ↔ caregiver)
- Message history
- Email notifications
- Content filtering (safeguarding keywords)
- Message reporting

**Reviews & Ratings**
- Post-booking review prompt
- 5-star rating system
- Written review submission
- Review display on profiles
- Average rating calculation

**Safeguarding**
- Incident reporting form
- Incident categorization
- Admin incident dashboard
- Escalation workflow
- Emergency escalation (999 guidance)
- SAB contact management

**Admin Dashboard**
- User management (view, suspend, delete)
- Verification queue
- Booking oversight
- Dispute resolution tools
- Incident management
- Basic analytics (with placeholder revenue)

---

### Legal & Compliance (Weeks 1-3)

**Can Proceed Immediately**
- Tier 1 DPIA (simplified, standard personal data only)
- Privacy Policy drafting and legal review
- Safeguarding Policy drafting and legal review
- Cookie Policy drafting and implementation
- ICO registration (Data Controller)
- Legal opinion on Introduction Agency status (CQC position)
- Platform insurance procurement (Public Liability, Cyber, PI)
- Insurance broker consultation (caregiver insurance requirements)

**Partially Blocked**
- Terms of Service drafting (can draft with placeholder commission)
- Terms of Service legal review (BLOCKED until commission finalized)

---

### Marketing & Content (Weeks 2-4)

**Can Proceed Immediately**
- Homepage
- "How It Works" pages (care receivers and caregivers)
- Privacy Policy page
- Cookie Policy page
- Safeguarding page
- Contact page
- FAQ page
- About Us page
- Caregiver recruitment landing page (value proposition)
- Care receiver landing page (value proposition)

**Blocked**
- Pricing page (BLOCKED until commission finalized)
- Caregiver onboarding materials (payout structure unclear)
- Terms of Service page (BLOCKED until legal review)

---

## What's Blocked by Pricing Decisions

**The following work CANNOT be completed without pricing decisions:**

### Legal Finalization (Week 3)

1. **Caregiver Terms of Service Legal Review**
   - Blocker: Commission structure must be disclosed
   - Workaround: Draft with [PLACEHOLDER: Commission Structure], review after decision
   - Deadline: Week 3 (before launch)

2. **Care Receiver Terms of Service Legal Review**
   - Blocker: Pricing transparency required (total cost disclosure)
   - Workaround: Draft with placeholder, review after decision
   - Deadline: Week 3 (before launch)

3. **Terms of Service Publication**
   - Blocker: Cannot publish until legal review complete
   - Deadline: Before launch

---

### Marketing & Recruitment (Weeks 3-6)

4. **Pricing Page Content**
   - Blocker: Cannot publish unknown pricing
   - Workaround: Use "Coming Soon" placeholder or "Contact for Details"
   - Deadline: Before public launch (soft launch can use placeholder)

5. **Caregiver Onboarding Materials**
   - Blocker: Payout structure unclear (how much caregivers earn)
   - Impact: Cannot recruit caregivers without clear earnings communication
   - Deadline: Before caregiver recruitment begins (Week 4-5)

6. **Caregiver Recruitment Ads**
   - Blocker: Cannot advertise earnings without commission clarity
   - Workaround: Focus on "set your own rate" messaging, defer payout specifics
   - Deadline: Before paid caregiver recruitment

---

### Technical Finalization (Week 5-6)

7. **Stripe Commission Configuration**
   - Blocker: Commission rate and payer (care receiver, caregiver, split)
   - Workaround: Configure in Stripe test mode with placeholder, update before live mode
   - Deadline: Before first live transaction

8. **Payment Processing Live Mode**
   - Blocker: Stripe requires published Terms of Service to go live
   - Dependency: Terms of Service → Commission Decision
   - Deadline: Before first live transaction

---

### Financial Planning (Ongoing)

9. **Revenue Projections**
   - Blocker: Cannot model revenue without commission rate
   - Workaround: Create scenario models (10%, 15%, 20%, 25%)
   - Impact: Fundraising, cash flow planning, profitability analysis

10. **Caregiver Earnings Calculator**
    - Blocker: Cannot show caregivers estimated earnings without commission
    - Workaround: Provide gross rate calculator, defer net earnings display
    - Impact: Caregiver recruitment transparency

---

## Recommended Pricing Decision Timeline

### Week 1-2: Scenario Analysis

**Action**: Develop pricing scenario models

**Questions to analyze**:
1. What commission rates do competitors charge? (care.com, Elder, Cera)
2. What is caregiver take-home pay at different commission rates?
   - If caregiver sets £15/hour rate:
     - 10% commission: Caregiver earns £13.50/hour
     - 15% commission: Caregiver earns £12.75/hour
     - 20% commission: Caregiver earns £12.00/hour
     - 25% commission: Caregiver earns £11.25/hour
3. What is care receiver total cost?
   - Direct: Care receiver pays caregiver rate + commission
   - Indirect: Caregiver sets rate higher to cover commission
4. What are unit economics at different commission rates?
   - Average booking: 3 hours × £15/hour = £45
   - 10% commission: £4.50 per booking
   - 15% commission: £6.75 per booking
   - 20% commission: £9.00 per booking
   - 25% commission: £11.25 per booking
5. What are revenue projections at Tier 1 success metrics?
   - 100 bookings/month × £6.75 (15%) = £675/month revenue
   - 100 bookings/month × £9.00 (20%) = £900/month revenue

**Owner**: Founder + Product Director
**Timeline**: 3-5 days
**Output**: Scenario analysis document with recommendations

---

### Week 2-3: Competitor Analysis

**Action**: Research competitor pricing models

**Competitors to analyze**:
- care.com (commission-based marketplace)
- Elder (caregiver agency, fixed pricing)
- Cera (care provider, fixed pricing)
- Hometouch (marketplace)
- SuperCarers (marketplace)

**Questions**:
1. Who pays commission (care receiver, caregiver, or split)?
2. What percentage commission?
3. Minimum booking durations?
4. Early adopter incentives?
5. Pricing transparency (publicly disclosed or hidden)?

**Owner**: Product Director + Market Research
**Timeline**: 3-5 days
**Output**: Competitor pricing analysis

---

### Week 3: Final Decision Workshop

**Action**: Founder decision workshop to finalize pricing

**Agenda**:
1. Review scenario analysis (caregiver earnings, care receiver cost, unit economics)
2. Review competitor analysis (market positioning)
3. Discuss early adopter strategy (free period, reduced commission, bonuses)
4. Finalize commission structure
5. Document decision in FDR-008

**Attendees**: Founder, Product Director, Finance Lead (if applicable)
**Timeline**: 1 session (2-3 hours)
**Output**: Finalized pricing decisions, FDR-008 documented

**Deadline**: End of Week 3 (before Terms of Service legal review Week 4)

---

## Workaround Strategy (Until Pricing Finalized)

### Development Workarounds

1. **Placeholder Commission Rate**
   - Use 15% as placeholder in all development work
   - Make commission configurable (environment variable or admin setting)
   - No hardcoded commission values in code

2. **Caregiver Rate Setting UI**
   - Display: "You set your rate. Platform fee applies."
   - Do NOT display specific commission percentage until finalized
   - Caregiver can set rate; platform applies commission at payment processing

3. **Care Receiver Booking UI**
   - Display total cost as: "Caregiver Rate + Platform Fee"
   - Calculate total at booking confirmation
   - Transparent breakdown at payment

4. **Stripe Integration**
   - Configure Stripe Connect with placeholder commission
   - Use Stripe test mode during development
   - Update commission rate in Stripe before going live

---

### Legal Workarounds

5. **Terms of Service Drafting**
   - Draft complete Terms of Service
   - Insert [PLACEHOLDER: Commission Structure] for commission disclosure section
   - Mark section for update once pricing finalized
   - Delay legal review until pricing finalized

6. **Privacy Policy**
   - No dependency on pricing - proceed with drafting and legal review
   - Can be finalized and published before pricing decision

7. **Safeguarding Policy**
   - No dependency on pricing - proceed with drafting and legal review
   - Can be finalized and published before pricing decision

---

### Marketing Workarounds

8. **Pricing Page**
   - Publish placeholder page: "Pricing details coming soon. Join our waitlist."
   - Or: "Contact us for pricing information"
   - Update page when pricing finalized

9. **Caregiver Recruitment Messaging**
   - Focus on: "Set your own hourly rate"
   - Focus on: "Flexible schedule, choose your clients"
   - Avoid specific payout percentages until finalized

10. **Care Receiver Messaging**
    - Focus on: "Transparent pricing, set by caregivers"
    - Focus on: "No hidden fees"
    - Avoid specific commission disclosure until finalized

---

## Impact Analysis

### Critical Path Impact

**Pricing decisions do NOT block critical path for Weeks 1-2:**
- Infrastructure setup ✓
- Authentication ✓
- Profile systems ✓
- Search and discovery ✓
- Messaging ✓
- Booking workflow ✓
- Safeguarding ✓
- Admin dashboard ✓

**Pricing decisions DO block critical path for Week 3:**
- Terms of Service legal review ✗ (Week 3-4)
- Caregiver onboarding materials ✗ (Week 4-5)
- Public pricing page ✗ (Week 5-6)
- Stripe live mode ✗ (Week 6-7)

**Recommendation**: Finalize pricing by end of Week 3 to avoid delaying launch.

---

### Launch Impact

**Soft Launch (Weeks 7-8)**:
- Can proceed with placeholder pricing for beta users
- Can use "invite-only" or "early access" messaging
- Can test product-market fit before public pricing announcement

**Public Launch (Weeks 9+)**:
- REQUIRES finalized pricing (Terms of Service published)
- REQUIRES public pricing page
- REQUIRES caregiver recruitment messaging with clear earnings

**Recommendation**: Soft launch can proceed with pricing pending; public launch requires pricing finalized.

---

## Risk Register

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| **Pricing decision delayed past Week 3** | Medium | Medium | Use placeholder values, delay legal review, delay public launch |
| **Pricing changes after launch** | Low | High | Grandfather early users, provide notice period, update Terms |
| **Commission rate uncompetitive** | Medium | High | Market research, competitor analysis, caregiver feedback |
| **Care receivers find pricing unclear** | Medium | Medium | Transparent pricing page, booking confirmation breakdown |
| **Caregivers find payout structure unfair** | Medium | High | Clear payout disclosure, competitive analysis, caregiver input |
| **Early adopters expect pricing locked** | Low | Medium | Terms of Service: "Pricing subject to change with notice" |

---

## Recommended Approach

### Phase 1: Analysis (Week 1-2)

1. **Scenario Modeling**
   - Model caregiver earnings at 10%, 15%, 20%, 25% commission
   - Model care receiver total cost
   - Model platform revenue at Tier 1 success metrics (100 bookings/month)
   - Model unit economics and break-even

2. **Competitor Research**
   - Analyze 5-7 competitor pricing models
   - Document who pays, commission rates, transparency
   - Identify market positioning opportunities

3. **Stakeholder Input** (Optional)
   - Survey potential caregivers (if beta group exists)
   - Survey potential care receivers (if waitlist exists)
   - Gather feedback on pricing preferences

---

### Phase 2: Decision Workshop (Week 3)

4. **Founder Decision Workshop**
   - Review scenario analysis
   - Review competitor analysis
   - Discuss early adopter strategy
   - Finalize commission structure
   - Finalize minimum booking duration
   - Finalize early adopter incentives

5. **Document Decision**
   - Create FDR-008 entry in Founder Decisions Responses
   - Document rationale, implications, cascading updates
   - Update gating-decisions.md (mark GD-11 as RESOLVED)

---

### Phase 3: Implementation (Week 3-4)

6. **Update Terms of Service**
   - Replace [PLACEHOLDER: Commission Structure] with finalized rates
   - Engage solicitor for legal review
   - Finalize Caregiver and Care Receiver Terms

7. **Update Marketing Materials**
   - Publish pricing page
   - Update caregiver onboarding materials
   - Update recruitment messaging

8. **Configure Stripe**
   - Update commission rate in Stripe Connect configuration
   - Test commission calculation
   - Prepare for live mode

9. **Prepare for Launch**
   - Publish Terms of Service
   - Activate Stripe live mode
   - Begin caregiver recruitment with clear payout structure

---

## Tracking & Monitoring

**Owner**: Founder & Product Director

**Review Schedule**:
- Daily check-in (Weeks 1-3): Pricing decision progress
- Weekly review: Impact on launch timeline

**Decision Deadline**: End of Week 3 (before Terms of Service legal review)

**Launch Blocker**: Pricing must be finalized before public launch (Week 9+), but NOT required for soft launch (Week 7-8)

---

## Document Control

**Version History**:

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-02-01 | Product Director | Initial pricing decisions status document |

**Next Review**: Weekly (Weeks 1-3), then as needed

**Owner**: Founder & Product Director

---

**END OF DOCUMENT**
