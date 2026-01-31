# Family Shared Accounts Feature Summary

**Feature**: Family Shared Accounts
**Classification**: MVP (Critical Priority)
**Date**: 2026-01-30

---

## What is Family Shared Accounts?

Family Shared Accounts allows multiple family members to collaboratively manage a care receiver's account on the elderly companionship marketplace. Each family member gets their own secure login and role-based permissions, enabling coordinated care management while maintaining robust safeguarding controls.

---

## Why MVP?

This feature is classified as MVP (not Phase 2) because:

1. **Reflects Reality**: 70% of elderly care decisions in the UK involve multiple family members
2. **Prevents Dangerous Workarounds**: Without it, users will share passwords (security risk) or create confusion with duplicate accounts
3. **Enables Safeguarding**: Multiple family members provide natural oversight and checks against exploitation
4. **Core User Need**: Addresses the #1 pain point: "difficult to coordinate care across siblings"
5. **Regulatory Alignment**: Care Act 2014 emphasizes family involvement in care planning

---

## MVP Scope - What's Included

### Core Functionality

**Account Access**:
- Primary account holder can invite up to 5 family members
- Each family member has individual login credentials (no shared passwords)
- Secure email invitation with identity verification required
- Immediate access revocation capability

**Three Permission Levels**:
1. **View-Only**: See bookings, caregivers, and messages (no actions)
2. **Standard**: View + send messages to caregivers
3. **Administrator**: View + message + create/modify bookings + view payments

**Safeguarding Controls**:
- Comprehensive audit trail (who did what, when)
- Identity verification for all family members
- Documented consent from care receiver
- Conflict prevention (two members can't book simultaneously)
- Immediate access revocation by primary account holder

**Transparency**:
- All family members see who else has access
- Activity notifications to relevant family members
- Audit log visible to administrator-level users

### User Journey Example

**Sarah's Story**:
Sarah is caring for her 82-year-old mother in Manchester. Her brother Tom lives in London, and her sister Emma lives in Edinburgh. Here's how Family Shared Accounts helps:

1. **Setup**: Sarah (primary account holder) invites Tom and Emma via email
2. **Verification**: Tom and Emma each create passwords and verify identity with driving license photo
3. **Permissions**: Sarah gives Tom Administrator access (he often makes bookings) and Emma Standard access (she wants visibility and can message caregivers)
4. **Daily Use**:
   - Emma checks platform each morning to see upcoming bookings
   - Tom books a caregiver for their mother's hospital transport next week
   - Sarah receives notification of Tom's booking and approves
   - All three can message the caregiver with questions
5. **Coordination**: When caregiver messages about mother's appointment, all three see it and Tom responds since he's available
6. **Audit Trail**: If any questions arise, Sarah can review who took which actions

---

## What's NOT in MVP (Future Enhancements)

- Temporary permission elevation (e.g., promote user for 2 weeks then auto-demote)
- Family member-specific notification preferences (all members get same notifications in MVP)
- In-platform family messaging (family members communicate via email/phone in MVP)
- Configurable family member limits (fixed at 5 in MVP)
- Automated capacity assessment reminders
- Integration with Office of the Public Guardian for POA verification (manual document review in MVP)

---

## Key Safeguarding Features

### Protection Against:

1. **Unauthorized Access**:
   - Identity verification for all family members
   - Primary account holder controls who has access
   - Immediate revocation capability

2. **Financial Exploitation**:
   - Payment method changes restricted to primary account holder
   - Audit trail of all booking actions
   - Monitoring for unusual booking pattern changes

3. **Family Disputes**:
   - Clear permission hierarchy
   - Audit trail for accountability
   - Support escalation process

4. **Coercion/Abuse**:
   - Care receiver consent documented
   - Activity pattern monitoring
   - Separate login credentials prevent impersonation

---

## Compliance Coverage

- **GDPR**: Documented consent, family members as data processors, clear data access controls
- **Mental Capacity Act 2005**: Supports scenarios with capacity, LPA, or Court-appointed deputies
- **Care Act 2014**: Enables family involvement in care planning
- **Safeguarding Adults**: Audit trails and access controls support investigations
- **ICO Guidance**: Transparent data access, revocation capability

---

## Success Metrics

| Metric | Target | Rationale |
|--------|--------|-----------|
| Adoption Rate | 60% of accounts have 2+ family members within 6 months | Validates core value proposition |
| Active Engagement | 75% of family members log in weekly | Indicates useful feature, not just setup-and-forget |
| Task Distribution | 40% of actions by non-primary members | Shows genuine shared responsibility |
| User Satisfaction | 4.2/5.0 rating | Validates coordination ease improvement |
| Support Ticket Reduction | 50% reduction in "can't see booking" tickets | Quantifies operational efficiency gain |
| Identity Verification Completion | 85% of invited members complete | Validates process isn't too burdensome |

---

## Technical Dependencies

**Must Have Before Development**:
- [ ] Role-based access control (RBAC) system
- [ ] Identity verification integration (e.g., Onfido, Yoti)
- [ ] Multi-user authentication infrastructure
- [ ] Activity logging and audit trail system
- [ ] Real-time notification system supporting multiple recipients
- [ ] Conflict detection mechanisms
- [ ] Consent management framework

**Builds On**:
- [ ] Core user authentication
- [ ] User profile management
- [ ] Booking system
- [ ] Messaging system

---

## Open Questions Requiring Decision

1. **Consent Frequency**: Should care receiver re-confirm family access every 6 months or only at setup?
   - *Safeguarding perspective*: Periodic re-confirmation protects against capacity changes
   - *UX perspective*: Frequent re-confirmation may frustrate users
   - *Recommendation*: Annual re-confirmation with triggered re-confirmation if capacity concerns flagged

2. **Caregiver Visibility**: Should caregivers see which specific family member they're communicating with?
   - *Transparency argument*: Caregivers should know their conversation partner
   - *Simplicity argument*: All communication appears from "care receiver's family"
   - *Recommendation*: Show family member first name + relationship (e.g., "Tom (son)") for accountability

3. **Financial Permissions**: Should payment viewing and booking creation be split into separate permission levels?
   - *Risk perspective*: Payment info exposure increases exploitation risk
   - *Practical perspective*: Can't book without knowing payment status
   - *Recommendation*: Administrator level includes payment viewing but NOT payment method changes (primary account holder only)

4. **Power of Attorney Verification**: How to verify LPA documentation?
   - *Option A*: Manual document review by support team
   - *Option B*: Integration with Office of the Public Guardian API
   - *MVP Recommendation*: Manual review (Option A) with API integration in Phase 2

5. **Notification Volume**: With multiple family members, could notifications become overwhelming?
   - *Issue*: 3 family members = 3x notification volume
   - *MVP Approach*: All members get same notifications, individual preferences in Phase 2
   - *Mitigation*: Clear notification settings during family member onboarding

---

## Implementation Recommendation

### Phase 1 (MVP Launch):
- Core family invitation and access management
- Three permission levels (View-Only, Standard, Administrator)
- Identity verification requirement
- Basic audit trail
- Standard notification approach (all members get key notifications)

### Phase 2 (Post-MVP Enhancements):
- Temporary permission changes
- Granular notification preferences per family member
- In-platform family coordination tools
- OPG API integration for automated LPA verification
- Advanced analytics on family coordination patterns
- Configurable family member limits

### Phase 3 (Advanced Features):
- Automated capacity change detection and alerts
- Family decision-making workflow (e.g., booking requires 2 family member approvals)
- Integration with local authority social services
- Care plan shared editing with version control

---

## Risk Mitigation

### Primary Risks:

**Risk 1: Family Exploitation**
- *Mitigation*: Identity verification, audit trails, access revocation, financial permission restrictions

**Risk 2: Technical Conflicts**
- *Mitigation*: Conflict detection system, clear permission hierarchy, activity notifications

**Risk 3: Compliance Breach**
- *Mitigation*: Legal review of terms, documented consent process, GDPR-compliant data processing agreements

**Risk 4: User Confusion**
- *Mitigation*: Clear permission matrix, in-product guidance, support resources, onboarding walkthrough

**Risk 5: Support Burden**
- *Mitigation*: Family dispute escalation process, clear documentation, in-product help

---

## Next Steps

1. **Legal Review**: Have legal counsel review family access terms, data processing agreements, and consent documentation (Est. 2 weeks)

2. **Technical Architecture**: Finalize RBAC system design and audit trail infrastructure (Est. 3 weeks)

3. **Identity Verification Partner**: Select and integrate identity verification service (Est. 4 weeks)

4. **User Testing**: Conduct usability testing with 5-10 family groups on wireframes (Est. 2 weeks)

5. **Safeguarding Review**: Review with safeguarding expert to validate controls (Est. 1 week)

6. **Development**: Implement feature (Est. 6-8 weeks)

7. **Beta Testing**: Limited release to 20-30 families for feedback (Est. 4 weeks)

8. **Full Launch**: Roll out to all users with monitoring

**Estimated Total Time to Launch**: 5-6 months

---

## Contact

For questions about this feature specification, contact the Product Team.

**Full Documentation**: See `/docs/product-requirements.md` for complete feature specification with detailed acceptance criteria and user journeys.
