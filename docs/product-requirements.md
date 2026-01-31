# Product Requirements Document
## Elderly Companionship Marketplace

**Last Updated**: 2026-01-30
**Document Owner**: Product Team
**Version**: 1.0

---

## Overview

This document defines the product requirements for an elderly companionship marketplace that connects care receivers (elderly individuals) and their families with individual caregivers in the UK. All requirements prioritize vulnerable adult protection, UK regulatory compliance, and user trust.

---

## Table of Contents

1. [User Roles](#user-roles)
2. [MVP Features](#mvp-features)
3. [Phase 2 Features](#phase-2-features)

---

## User Roles

### Primary Roles

1. **Care Receiver**: Elderly individual receiving companionship services
2. **Family Member**: Relative or designated representative managing care arrangements
3. **Caregiver**: Individual providing companionship services
4. **Admin**: Platform administrator managing operations and safeguarding

---

## MVP Features

### 1. Family Shared Accounts

**Classification**: MVP
**Priority**: Critical

**User Story**:
As a family member, I want to share account access with other family members so that we can collaboratively manage elderly care, coordinate caregiver arrangements, and maintain oversight of our loved one's wellbeing without duplicating efforts or creating confusion.

**Description**:
Family Shared Accounts enable multiple family members to access and manage a single care receiver's account, facilitating collaborative decision-making, shared visibility into care arrangements, and distributed responsibility for elderly care management. This feature recognizes that elderly care is typically a family effort requiring coordination across multiple stakeholders while maintaining appropriate safeguarding controls.

**Acceptance Criteria**:
- [ ] Primary account holder (care receiver or designated primary family member) can invite additional family members via email
- [ ] Invited family members receive secure invitation links with email verification
- [ ] Each family member has their own login credentials (no shared passwords)
- [ ] Primary account holder can assign role-based permissions to each family member (view-only, standard, administrator)
- [ ] All family members with appropriate permissions can view caregiver profiles, bookings, and messages
- [ ] Family members with standard or administrator permissions can communicate with caregivers
- [ ] Family members with administrator permissions can make and modify bookings
- [ ] Activity log records which family member performed each action (audit trail for safeguarding)
- [ ] Primary account holder can revoke access for any family member at any time
- [ ] System sends notifications to all relevant family members for key events (new booking, caregiver message, cancellation)
- [ ] Care receiver's personal information is visible to all family members (with appropriate consent documented)
- [ ] Family members can see who else has account access at any time
- [ ] Maximum of 5 family members per account (to maintain manageable coordination)
- [ ] Each family member must complete identity verification before gaining access
- [ ] System prevents family members from performing conflicting actions (e.g., simultaneous booking modifications)

**User Journey**:

**Setup Flow (Primary Account Holder)**:
1. Primary account holder navigates to Account Settings > Family Access
2. Clicks "Invite Family Member" button
3. Enters family member's name, email, relationship to care receiver, and desired permission level
4. Reviews family access permissions matrix explaining each role
5. Confirms invitation
6. System sends invitation email to family member
7. Primary account holder sees pending invitation in family access list

**Acceptance Flow (Invited Family Member)**:
1. Invited family member receives email with secure invitation link
2. Clicks link and is directed to registration page pre-populated with email
3. Creates individual password meeting security requirements
4. Completes identity verification (document upload or third-party verification)
5. Reviews and accepts terms regarding data access and privacy
6. Reviews care receiver's profile and current care arrangements
7. Receives confirmation and is granted access based on assigned permissions
8. All existing family members receive notification of new member addition

**Daily Usage Flow (Family Member)**:
1. Family member logs in with their own credentials
2. Lands on shared dashboard showing care receiver's upcoming bookings and recent activity
3. Views which other family members are currently active or recently active
4. Accesses caregiver profiles, messages, and booking history according to permissions
5. Performs actions within permission scope (view, message, book)
6. Actions are logged with family member's identity for audit trail

**Management Flow (Primary Account Holder)**:
1. Primary account holder reviews family access list regularly
2. Can modify permissions for existing family members
3. Can revoke access immediately if needed (e.g., family dispute, safeguarding concern)
4. Reviews audit log of all family member actions
5. Receives alerts if unusual activity patterns detected

**Safeguarding Considerations**:
- **Identity Verification**: Each family member must complete identity verification before access is granted to prevent unauthorized individuals posing as family members
- **Audit Trail**: Comprehensive activity logging tracks which family member performed each action, critical for investigating concerns or disputes
- **Access Revocation**: Immediate access removal capability protects vulnerable adults if family relationships become contentious or safeguarding concerns arise
- **Consent Documentation**: Care receiver's consent (or legal authority via Power of Attorney) for family access must be documented and verifiable
- **Conflicting Actions Prevention**: System prevents family members from making contradictory decisions simultaneously (e.g., two members trying to book different caregivers for the same time slot)
- **Sensitive Information Protection**: Some information (e.g., financial details, certain medical information) may require elevated permissions or care receiver's explicit consent
- **Abuse Detection**: System monitors for patterns suggesting financial exploitation or coercion (e.g., sudden changes in booking patterns, unusual message content)
- **Dispute Resolution**: Clear escalation path when family members disagree on care decisions
- **Capacity Considerations**: Process for updating permissions if care receiver's mental capacity changes and legal authority transfers

**Compliance Requirements**:
- **GDPR (Data Protection)**: Family members are data processors with documented roles; care receiver (data subject) must provide informed consent for data sharing with each family member
- **Mental Capacity Act 2005**: System must accommodate different scenarios (care receiver with capacity making own decisions, Lasting Power of Attorney, Court-appointed deputies)
- **Care Act 2014**: Family access supports the care planning and coordination requirements under the Care Act
- **Safeguarding Adults**: Access controls and audit trails support safeguarding investigations if concerns arise about family member behavior
- **ICO Guidance**: Transparency about who has access to data, purpose of access, and ability to revoke access aligns with ICO requirements for vulnerable adults
- **Equality Act 2010**: Reasonable adjustments for care receivers with different capacities or communication needs

**Dependencies**:
- **Technical**:
  - User authentication and authorization system supporting multiple users per account
  - Role-based access control (RBAC) system with granular permissions
  - Identity verification integration (document verification or third-party service)
  - Real-time activity logging and audit trail infrastructure
  - Notification system for multi-recipient alerts
  - Conflict detection and resolution mechanisms
- **Feature**:
  - Core account registration and authentication
  - User profile management
  - Booking system
  - Messaging system
- **Regulatory**:
  - Consent management framework
  - Legal review of family access terms and conditions
  - Data processing agreements for family members as processors
- **Operational**:
  - Customer support processes for family disputes
  - Safeguarding escalation procedures for concerning family behavior

**Success Metrics**:
- **Adoption Rate**: Percentage of care receiver accounts with 2+ family members (target: 60% within 6 months post-launch)
- **Active Family Engagement**: Percentage of family members logging in at least once per week (target: 75%)
- **Task Distribution**: Percentage of bookings/messages created by non-primary family members (indicating shared responsibility; target: 40%)
- **User Satisfaction**: Family member satisfaction score regarding coordination ease (target: 4.2/5.0)
- **Support Ticket Reduction**: Reduction in support tickets related to "can't see booking" or "need to share with family" (target: 50% reduction)
- **Safeguarding Effectiveness**: Time to detect and respond to concerning family behavior patterns (target: <24 hours for automated alerts)
- **Access Revocation Usage**: Number of access revocations and reasons (monitor for safeguarding issues)
- **Identity Verification Completion**: Percentage of invited family members completing identity verification (target: 85%)

**Open Questions**:
- **Consent Mechanism**: Should care receiver re-confirm family access periodically (e.g., every 6 months) or only at initial setup? Consider capacity changes over time.
- **Financial Permissions**: Should payment method visibility and booking payment authority be separate permission levels? Higher risk of financial exploitation.
- **Caregiver Visibility**: Should caregivers know which family member they're communicating with, or is all communication under care receiver's name? Consider caregiver comfort and accountability.
- **Family Member Limits**: Is 5 family members sufficient for typical UK families? Should this be configurable or fixed?
- **Power of Attorney Verification**: How do we verify legal authority for family members claiming POA? Integration with Office of the Public Guardian database?
- **Notification Overload**: With multiple family members, could notification volume become overwhelming? Should notifications be configurable per family member?
- **Temporary Access**: Should there be option for temporary family access (e.g., while primary family member on holiday) with automatic expiration?
- **Emergency Access**: Should there be expedited family access process for emergency situations (e.g., care receiver hospitalized)?
- **Care Receiver Override**: If care receiver has capacity, should they be able to see/approve family member actions before they take effect?
- **Historical Data Access**: When family member added, do they see full historical data or only data from their access date forward?

**MVP Rationale**:
This feature is classified as MVP (rather than Phase 2) for the following critical reasons:

1. **Core Value Proposition**: Elderly care is fundamentally a family endeavor in the UK. Research shows 70% of elderly care decisions involve multiple family members. Without this feature, the platform would force unnatural workarounds (shared passwords, phone tag, duplicated communication) that undermine trust and safety.

2. **Trust and Safety**: Family oversight is a key safeguarding mechanism. Multiple family members monitoring care arrangements provide natural checks against caregiver misconduct or exploitation. Single-user accounts create dangerous information silos.

3. **Market Differentiation**: Competitors offering family access gain significant advantage. This feature directly addresses one of the top pain points families express: "difficult to coordinate care across siblings."

4. **User Experience**: Without family access, the platform creates friction in the natural care coordination process. Primary users may abandon platform if they must relay information manually to other family members.

5. **Regulatory Alignment**: Care Act 2014 emphasizes family involvement in care planning. Single-user accounts work against statutory guidance regarding family participation.

6. **Risk of Workarounds**: If not provided, users will share passwords (security risk) or create duplicate accounts (data integrity issues, confusing caregivers, safeguarding gaps).

---

## Phase 2 Features

Phase 2 features to be documented based on MVP learnings and user feedback.

---

## Document History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0 | 2026-01-30 | Initial document creation with Family Shared Accounts feature | Product Team |

---

## Appendix

### Permission Levels Matrix

| Capability | View-Only | Standard | Administrator | Primary Account Holder |
|-----------|-----------|----------|---------------|----------------------|
| View caregiver profiles | ✓ | ✓ | ✓ | ✓ |
| View bookings | ✓ | ✓ | ✓ | ✓ |
| View messages | ✓ | ✓ | ✓ | ✓ |
| Send messages to caregivers | ✗ | ✓ | ✓ | ✓ |
| Create bookings | ✗ | ✗ | ✓ | ✓ |
| Modify bookings | ✗ | ✗ | ✓ | ✓ |
| Cancel bookings | ✗ | ✗ | ✓ | ✓ |
| View payment information | ✗ | ✗ | ✓ | ✓ |
| Modify payment methods | ✗ | ✗ | ✗ | ✓ |
| Invite family members | ✗ | ✗ | ✗ | ✓ |
| Modify family permissions | ✗ | ✗ | ✗ | ✓ |
| Revoke family access | ✗ | ✗ | ✗ | ✓ |
| View audit log | ✗ | ✗ | ✓ | ✓ |
| Modify care receiver profile | ✗ | ✗ | ✓ | ✓ |
| Close account | ✗ | ✗ | ✗ | ✓ |

### Family Access Use Cases

**Use Case 1: Sibling Coordination**
- Adult children (3 siblings) living in different cities coordinate care for widowed mother
- Primary family member (eldest sibling) sets up account with mother's consent
- Invites two siblings with Standard permissions
- All siblings can view bookings and communicate with caregivers
- Primary family member makes final booking decisions but consults with siblings via platform messages
- When mother has medical appointment, siblings can see caregiver schedule and ensure coverage

**Use Case 2: Spouse with Adult Child Oversight**
- Elderly couple, husband is primary caregiver for wife with dementia
- Husband is primary account holder
- Adult daughter invited with View-Only access to monitor care from distance
- Daughter receives notifications of new bookings and can alert if she notices concerns
- Husband maintains primary decision-making while daughter has peace of mind

**Use Case 3: Power of Attorney Scenario**
- Care receiver (elderly father) has granted Lasting Power of Attorney to son
- Son is primary account holder (verified via LPA documentation)
- Invites two siblings with Standard permissions
- Son has final authority but maintains transparency with siblings
- Audit trail provides documentation of care decisions for legal/financial purposes

**Use Case 4: Temporary Support**
- Primary family member (daughter) going on 2-week holiday
- Temporarily elevates sister's permissions from Standard to Administrator
- Sister can make booking changes if needed during holiday period
- After return, daughter reduces sister's permissions back to Standard
- (Note: Temporary permission changes are Phase 2 enhancement; MVP requires manual permission updates)
