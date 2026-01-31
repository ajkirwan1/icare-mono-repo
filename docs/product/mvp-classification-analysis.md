# MVP vs Post-MVP System Classification Analysis

**Document Purpose**: Classify each system from the Complete Feature Map as MVP or Post-MVP based on UK regulatory compliance, safeguarding requirements, core economic loop, and minimum operational viability.

**Analysis Date**: 2026-01-31
**Methodology**: Real-world legitimacy and safety optimization only
**Document Owner**: Product Team

---

## Classification Criteria

A system is **MVP** if it meets **ANY** of these criteria:

1. **UK Regulatory Compliance** - Required by law or regulation to operate legally
2. **Safeguarding of Vulnerable Adults** - Protects elderly users from harm (non-negotiable)
3. **Core Economic Loop** - Discovery → Booking → Payment → Care → Review cannot function without it
4. **Minimum Operational Viability** - Platform cannot function without this system

---

## MVP SYSTEMS

### 1. User Management & Authentication (MVP)

**Classification Rationale**:
- **Core Economic Loop**: ✓ Users cannot register, login, or manage accounts without this
- **Safeguarding**: ✓ Secure authentication prevents unauthorized access to vulnerable adult data
- **Regulatory Compliance**: ✓ GDPR requires secure identity management and consent tracking
- **Operational Viability**: ✓ Platform cannot function without user accounts

**MVP Components**:
- 1.1 Care Receiver Registration - Core economic loop
- 1.2 Family Member Registration - Safeguarding (proxy oversight)
- 1.3 Caregiver Registration - Core economic loop (supply side)
- 1.4 Phone Verification - Identity verification requirement
- 1.5 Session Management - Security requirement
- 1.6 Password Management - Security requirement
- 1.8 Role-Based Access Control - Safeguarding (prevents unauthorized actions)

**Post-MVP Components**:
- 1.7 Multi-Factor Authentication (2FA) - Enhanced security, not legally required for non-admin users in MVP

**Without This System**: Cannot register users, authenticate actions, or secure vulnerable adult data. **Platform cannot exist.**

**UK Regulations**: GDPR (data controller obligations), Care Act 2014 (safeguarding duties require user identity)

---

### 2. Caregiver Capability & Verification System (MVP)

**Classification Rationale**:
- **Safeguarding**: ✓ CRITICAL - Prevents unqualified caregivers from offering services they cannot safely provide
- **Regulatory Compliance**: ✓ CQC alignment requires documented caregiver competencies
- **Core Economic Loop**: ✓ Discovery depends on matching care needs to caregiver capabilities
- **Operational Viability**: ✓ Cannot match vulnerable adults to caregivers without this

**MVP Components**:
- 2.1 Medical Condition Experience Profile - Safeguarding (condition-specific matching)
- 2.2 Care Skills Profile - Safeguarding (skill-based matching prevents dangerous mismatches)
- 2.3 Qualifications & Training Registry - Regulatory compliance (evidence of competence)
- 2.5 Service Type Definition - Safeguarding (personal care requires enhanced verification)
- 2.6 Capability Verification Workflow - Safeguarding (admin validation prevents fraud)
- 2.7 Capability-Based Search Indexing - Core economic loop (discovery mechanism)

**Post-MVP Components**:
- 2.4 Employment History & Experience - Nice-to-have, not safety-critical for MVP

**Without This System**: No way to verify caregiver competence. Vulnerable adults matched with unqualified caregivers. **Immediate safeguarding failure. Cannot launch legally.**

**UK Regulations**: Care Act 2014 (duty to ensure care quality), CQC fundamental standards (person-centred care requires appropriate skills), Health & Safety at Work Act (competency verification)

---

### 3. Medical Condition & Care Skills Matching (MVP)

**Classification Rationale**:
- **Safeguarding**: ✓ CRITICAL - Prevents vulnerable adults from booking caregivers unqualified to handle their medical conditions
- **Core Economic Loop**: ✓ Discovery and booking depends on this matching
- **Operational Viability**: ✓ Core value proposition is condition-specific caregiver matching

**MVP Components**:
- 3.1 Care Receiver Care Needs Profile - Safeguarding (documents what caregiver must handle)
- 3.2 Medical Condition Matching Engine - Safeguarding (condition-specific caregiver selection)
- 3.3 Care Skills Matching Engine - Safeguarding (prevents skill mismatches)
- 3.4 Qualification Requirement Enforcement - Safeguarding (blocks bookings if qualifications not met)

**Post-MVP Components**:
- 3.5 Risk Assessment & Care Plan Upload - Enhanced safeguarding, but basic matching works without this
- 3.6 Care Complexity Scoring - Optimization feature, not critical for MVP

**Without This System**: Parkinson's patient could book a caregiver with no neurological condition experience. **Immediate safeguarding crisis. Cannot launch.**

**UK Regulations**: Care Act 2014 (wellbeing principle requires appropriate care), CQC (safe care requires competent staff), Equality Act 2010 (reasonable adjustments for disabilities require understanding of conditions)

---

### 4. Discovery & Advanced Search (MVP)

**Classification Rationale**:
- **Core Economic Loop**: ✓ Discovery is the entry point to the entire marketplace
- **Safeguarding**: ✓ Filtering by qualifications and DBS status protects vulnerable adults
- **Operational Viability**: ✓ Cannot connect supply and demand without search

**MVP Components**:
- 4.1 Basic Location-Based Search - Core economic loop (discovery mechanism)
- 4.2 Advanced Filtering - Safeguarding (filter by medical condition experience, qualifications, DBS status)
- 4.4 Caregiver Profile Visibility Rules - Safeguarding (hide unqualified or unverified caregivers)

**Post-MVP Components**:
- 4.3 Intelligent Matching Algorithm - Optimization, basic search works without AI
- 4.5 Saved Searches & Alerts - Convenience feature
- 4.6 Caregiver Recommendations - Growth feature, not safety-critical

**Without This System**: Care receivers cannot discover caregivers. **Core economic loop broken. Platform non-functional.**

**UK Regulations**: Consumer Rights Act (clear service descriptions required), Care Act 2014 (information and advice duty)

---

### 5. Booking System (Hourly, Daily, Live-In) (MVP)

**Classification Rationale**:
- **Core Economic Loop**: ✓ Booking is the core transaction
- **Safeguarding**: ✓ Booking must capture care needs, emergency contacts, risk flags
- **Operational Viability**: ✓ Entire platform exists to facilitate bookings

**MVP Components**:
- 5.1 Booking Types - Core economic loop (defines service delivery models)
- 5.2 Booking Request Creation - Core economic loop (demand side action)
- 5.3 Booking Request Review (Caregiver) - Core economic loop (supply side action)
- 5.4 Booking Acceptance & Payment Capture - Core economic loop (transaction confirmation)
- 5.5 Booking Lifecycle & Status Management - Operational viability (track booking states)
- 5.6 Booking Completion Workflow - Core economic loop (confirms service delivered)
- 5.7 Booking Cancellation Policies - Regulatory compliance (Consumer Rights Act), financial integrity
- 5.10 No-Show Management - Financial integrity, safeguarding (track reliability)

**Post-MVP Components**:
- 5.8 Live-In Care Booking Special Features - Can launch with hourly/daily only, add live-in later
- 5.9 Recurring Booking Management - Convenience feature, manual rebooking works for MVP

**Without This System**: No way to request or confirm care services. **Core economic loop broken. Platform non-functional.**

**UK Regulations**: Consumer Rights Act (clear booking terms), Distance Selling Regulations (14-day cooling-off where applicable), Contract law (booking is a service contract)

---

### 6. Messaging & Communication (MVP)

**Classification Rationale**:
- **Core Economic Loop**: ✓ Communication required to clarify care needs before booking
- **Safeguarding**: ✓ Content filtering prevents off-platform payments and abuse
- **Operational Viability**: ✓ Care receivers need to discuss care details with caregivers

**MVP Components**:
- 6.1 In-App Messaging - Core economic loop (care planning communication)
- 6.2 Content Filtering & Moderation - Safeguarding (prevents financial exploitation, detects abuse keywords)
- 6.3 Message Reporting - Safeguarding (escalation mechanism)

**Post-MVP Components**:
- 6.4 Notification Preferences - Convenience, default email notifications work for MVP
- 6.5 Message Templates - Efficiency feature for caregivers
- 6.6 Admin Messaging Capability - Admin can use email for MVP communications

**Without This System**: No way to clarify care requirements, discuss logistics, or coordinate care. **Off-platform communication increases exploitation risk. Booking system breaks down.**

**UK Regulations**: Care Act 2014 (safeguarding duty requires monitoring for abuse), Consumer Rights Act (clear communication of services)

---

### 7. Payment System & Escrow (MVP)

**Classification Rationale**:
- **Core Economic Loop**: ✓ Payment is the completion of the transaction
- **Safeguarding**: ✓ On-platform payments prevent financial exploitation
- **Regulatory Compliance**: ✓ Payment Services Regulations require secure payment handling
- **Operational Viability**: ✓ Platform revenue depends on payment processing

**MVP Components**:
- 7.1 Care Receiver Payment Setup - Core economic loop (demand side payment method)
- 7.2 Payment Authorization & Capture Flow - Core economic loop (transaction processing)
- 7.3 Platform Fee Structure - Operational viability (platform revenue)
- 7.4 Caregiver Payout Setup - Core economic loop (supply side compensation)
- 7.5 Payout Management - Core economic loop (caregiver earnings visibility)
- 7.6 Refund Processing - Regulatory compliance (Consumer Rights Act)
- 7.7 Dispute Resolution & Payment Holds - Safeguarding (fraud prevention)
- 7.11 Payment Security & Compliance - Regulatory compliance (Payment Services Regulations, AML)

**Post-MVP Components**:
- 7.8 Chargeback Handling - Stripe handles automatically, manual admin review acceptable for MVP
- 7.9 Financial Reporting (Care Receiver) - Nice-to-have, basic receipts via email work for MVP
- 7.10 Financial Reporting (Caregiver) - Nice-to-have, basic payout emails work for MVP

**Without This System**: No way to pay caregivers. Off-platform payments create financial exploitation risk. **Core economic loop broken. Safeguarding failure.**

**UK Regulations**: Payment Services Regulations 2017, Consumer Rights Act, Money Laundering Regulations, HMRC tax reporting

---

### 8. Reviews, Ratings & Reputation (MVP)

**Classification Rationale**:
- **Safeguarding**: ✓ Reviews identify low-quality or dangerous caregivers
- **Core Economic Loop**: ✓ Reviews close the feedback loop (Discovery → Booking → Payment → Care → **Review**)
- **Operational Viability**: ✓ Trust mechanism for two-sided marketplace

**MVP Components**:
- 8.1 Post-Booking Reviews (Care Receiver → Caregiver) - Core economic loop, safeguarding (quality signal)
- 8.4 Caregiver Ratings & Reputation Score - Core economic loop (trust signal)
- 8.6 Low Rating Escalation - Safeguarding (admin review of quality concerns)

**Post-MVP Components**:
- 8.2 Caregiver Response to Reviews - Nice-to-have, not safety-critical
- 8.3 Review Moderation - Important but manual admin review works for MVP
- 8.5 Care Receiver Reviews (Caregiver → Care Receiver) - Private ratings, less critical
- 8.7 Verified Reviews Badge - Trust enhancement, not critical
- 8.8 Review Prompts & Timing - Optimization feature

**Without This System**: No feedback mechanism to identify dangerous caregivers. Future care receivers have no quality information. **Safeguarding failure over time.**

**UK Regulations**: CQC expects quality monitoring, Consumer Rights Act (accurate service descriptions require reviews)

---

### 9. Safeguarding & Incident Management (MVP)

**Classification Rationale**:
- **Safeguarding**: ✓ CRITICAL - Legal duty to respond to safeguarding concerns
- **Regulatory Compliance**: ✓ Care Act 2014 requires safeguarding reporting and response
- **Operational Viability**: ✓ Cannot operate with vulnerable adults without this

**MVP Components**:
- 9.1 Safeguarding Reporting System - Safeguarding (reporting mechanism)
- 9.2 Safeguarding Incident Management Workflow - Safeguarding (investigation and response)
- 9.3 Safeguarding Escalation & External Referral - Safeguarding (emergency services, local authority liaison)
- 9.5 User Suspension & Ban System - Safeguarding (remove dangerous users)
- 9.9 Safeguarding Documentation & Audit Trail - Regulatory compliance (Care Act 2014 requires documentation)
- 9.10 Safeguarding Training & Policy - Regulatory compliance (Care Act 2014, caregivers must understand safeguarding)

**Post-MVP Components**:
- 9.4 Safeguarding Team Structure - Can start with small team, scale later
- 9.6 Behavioral Monitoring & Pattern Detection - Automated monitoring is enhancement, manual review works for MVP
- 9.7 Vulnerable Adult Protection Measures - Enhanced features, basic safeguarding works for MVP
- 9.8 Financial Exploitation Prevention - Message filtering (covered in messaging) is sufficient for MVP

**Without This System**: No way to report or respond to abuse, neglect, or exploitation. **Legal duty breached. Cannot operate. CQC-relevant risk.**

**UK Regulations**: Care Act 2014 (safeguarding duty), CQC fundamental standards (safe care), Mental Capacity Act 2005, Protection of Freedoms Act 2012

---

### 10. Identity & Background Verification (MVP)

**Classification Rationale**:
- **Safeguarding**: ✓ CRITICAL - Prevents criminals and fraudsters from accessing vulnerable adults
- **Regulatory Compliance**: ✓ DBS checks required for regulated care activities
- **Operational Viability**: ✓ Trust mechanism essential for marketplace with vulnerable adults

**MVP Components**:
- 10.1 Care Receiver Identity Verification - Safeguarding (prevent fraud), GDPR (confirm user identity)
- 10.2 Caregiver Enhanced Identity Verification - Safeguarding (know who has access to vulnerable adults)
- 10.3 Right to Work Verification - Regulatory compliance (Immigration Act)
- 10.4 DBS (Disclosure and Barring Service) Checks - Safeguarding (criminal record checks)
- 10.5 Qualification Verification - Safeguarding (confirm competence)
- 10.10 Verification Badge System - Transparency (care receivers see verification status)

**Post-MVP Components**:
- 10.6 Professional Reference Checks - Enhanced due diligence, DBS is primary safeguarding mechanism
- 10.7 Insurance Verification - Important but can launch with insurance requirement documented, verification can be phased
- 10.8 Health & Immunization Verification - Recommended, not legally required for MVP
- 10.9 Ongoing Verification & Re-Verification - Important but annual cycle can be implemented post-launch

**Without This System**: Unknown individuals with potential criminal records access vulnerable adults. **Immediate safeguarding crisis. Cannot launch.**

**UK Regulations**: Safeguarding Vulnerable Groups Act 2006, Protection of Freedoms Act 2012 (DBS), Immigration Act 2014 (right to work), CQC (safe care requires checked staff)

---

### 11. Clinical Safety Monitoring (MVP - PARTIALLY)

**Classification Rationale**:
- **Safeguarding**: ✓ Incident reporting is critical for vulnerable adult protection
- **Regulatory Compliance**: ✓ CQC expects incident management
- **Operational Viability**: ✓ Platform needs to respond to safety events

**MVP Components**:
- 11.2 Falls & Injury Reporting - Safeguarding (immediate incidents require reporting)
- 11.6 Emergency Situation Handling - Safeguarding (active booking emergencies)
- 11.7 Medical Emergency Protocol - Safeguarding (life-threatening situations)
- 11.9 Clinical Incident Audit Trail - Regulatory compliance (CQC requires incident logging)

**Post-MVP Components**:
- 11.1 Medication Assistance Monitoring - Nice-to-have, caregivers can log manually
- 11.3 Behavioral Change Monitoring - Proactive monitoring, not critical for MVP
- 11.4 Care Receiver Welfare Check-Ins - Ongoing support feature
- 11.5 Caregiver Wellness & Burnout Monitoring - Caregiver support, not immediate safety requirement
- 11.8 End-of-Life Care Support - Specialized support, can add later

**Without MVP Components**: No way to respond to emergencies or document safety incidents. **Safeguarding failure. CQC non-compliance.**

**UK Regulations**: Care Act 2014 (duty to respond to safety concerns), CQC (safe care standard), Health & Safety at Work Act

---

### 12. Admin Operations & Oversight (MVP - CORE FUNCTIONS ONLY)

**Classification Rationale**:
- **Safeguarding**: ✓ Admin oversight required to manage reports, verify caregivers, handle disputes
- **Operational Viability**: ✓ Platform requires human oversight for safety and quality
- **Regulatory Compliance**: ✓ Human review required for verification, safeguarding, complaints

**MVP Components**:
- 12.1 Admin Dashboard - Operational viability (central oversight interface)
- 12.2 User Management Interface - Operational viability (manage accounts, investigate issues)
- 12.3 Caregiver Application Review - Safeguarding (manual approval prevents fraud)
- 12.4 Verification Management - Safeguarding (approve verification documents)
- 12.5 Booking Oversight - Operational viability (resolve booking issues)
- 12.6 Dispute Resolution Interface - Operational viability (handle payment disputes)
- 12.7 Report Management - Safeguarding (respond to safeguarding reports)
- 12.10 Admin Audit Log - Regulatory compliance (admin actions must be logged)
- 12.11 Admin User Management - Security (control admin access)

**Post-MVP Components**:
- 12.8 Payment & Financial Oversight - Nice-to-have, Stripe dashboard works for MVP
- 12.9 Communication Tools (Admin → Users) - Can use email for MVP
- 12.12 Content Moderation Tools - Manual review works for MVP

**Without MVP Components**: No way to verify caregivers, respond to reports, or resolve disputes. **Platform non-functional.**

**UK Regulations**: Care Act 2014 (safeguarding oversight), GDPR (data controller responsibilities), Consumer Rights Act (complaints handling)

---

### 13. Compliance & Audit System (MVP)

**Classification Rationale**:
- **Regulatory Compliance**: ✓ GDPR, Care Act, CQC all require audit trails and compliance systems
- **Safeguarding**: ✓ Audit trail essential for investigating incidents
- **Operational Viability**: ✓ Cannot operate legally without compliance infrastructure

**MVP Components**:
- 13.1 Audit Trail & Logging - Regulatory compliance (all actions must be logged)
- 13.2 GDPR Compliance - Regulatory compliance (legal requirement)
- 13.3 Data Retention Policies - Regulatory compliance (GDPR, HMRC requirements)
- 13.4 Data Subject Rights Interface - Regulatory compliance (GDPR rights)
- 13.5 ICO (Information Commissioner's Office) Compliance - Regulatory compliance (data protection registration)
- 13.7 Care Act 2014 Compliance - Regulatory compliance (safeguarding duties)
- 13.8 Employment Law Compliance - Regulatory compliance (self-employed status, right to work)
- 13.9 Payment Services Regulations Compliance - Regulatory compliance (payment handling)
- 13.10 Consumer Rights Act Compliance - Regulatory compliance (cancellation, refunds)
- 13.11 Equality Act 2010 Compliance - Regulatory compliance (non-discrimination)
- 13.13 Terms of Service & Legal Agreements - Regulatory compliance (contractual basis)

**Post-MVP Components**:
- 13.6 CQC Compliance Preparation - Important but CQC registration may not be required for MVP (depends on legal assessment)
- 13.12 Compliance Reporting & Audits - Important but can be manual for MVP

**Without This System**: GDPR breach, Care Act non-compliance, no audit trail for incidents. **Cannot operate legally.**

**UK Regulations**: GDPR, Care Act 2014, ICO requirements, Payment Services Regulations 2017, Consumer Rights Act 2015, Equality Act 2010, Employment law

---

### 14. Emergency Escalation & Response (MVP)

**Classification Rationale**:
- **Safeguarding**: ✓ CRITICAL - Must respond to emergencies involving vulnerable adults
- **Operational Viability**: ✓ Care services involve medical risk; emergency response required

**MVP Components**:
- 14.1 Emergency Contact System - Safeguarding (notify family in emergencies)
- 14.2 Emergency Button (In-App) - Safeguarding (caregiver can call for help during booking)
- 14.4 Emergency Services Coordination - Safeguarding (work with 999 services)
- 14.5 Emergency Escalation Matrix - Safeguarding (clear response protocols)
- 14.7 Emergency Preparedness Training - Safeguarding (caregivers must know protocols)

**Post-MVP Components**:
- 14.3 24/7 Safeguarding Hotline - Ideal but can start with on-call admin for emergencies
- 14.6 Post-Emergency Support - Important but can be added after launch

**Without This System**: No way to respond when care receiver has medical emergency or caregiver needs urgent help. **Safeguarding failure. Potential fatalities.**

**UK Regulations**: Care Act 2014 (duty to respond to urgent needs), Health & Safety at Work Act, CQC (safe care requires emergency protocols)

---

### 15. Calendar & Availability Management (MVP)

**Classification Rationale**:
- **Core Economic Loop**: ✓ Booking requires knowing caregiver availability
- **Operational Viability**: ✓ Double-booking prevention essential

**MVP Components**:
- 15.1 Caregiver Availability Configuration - Core economic loop (caregivers set when available)
- 15.3 Real-Time Availability Sync - Core economic loop (prevent double-booking)
- 15.4 Care Receiver Calendar View - Core economic loop (see bookings)
- 15.5 Caregiver Calendar View - Core economic loop (manage availability and bookings)

**Post-MVP Components**:
- 15.2 Availability Status Dashboard - Nice-to-have analytics
- 15.6 Calendar Reminders & Notifications - Important but email reminders work for MVP
- 15.7 Timezone Handling - UK-only platform, BST/GMT only for MVP

**Without This System**: Caregivers cannot indicate when they're available. Double-bookings occur. **Core economic loop broken.**

**UK Regulations**: None specific, but contractual clarity required (Consumer Rights Act)

---

### 16. Family & Multi-User Accounts (MVP - BASIC VERSION)

**Classification Rationale**:
- **Safeguarding**: ✓ Family oversight reduces coercion and exploitation risk
- **Operational Viability**: ✓ Many elderly users need family help to use platform

**MVP Components**:
- 16.1 Family Account Structure - Safeguarding (family oversight)
- 16.2 Family Member Invitation System - Operational viability (add family members)
- 16.3 Role-Based Permissions (Family Members) - Safeguarding (control access levels)

**Post-MVP Components**:
- 16.4 Activity & Visibility - Transparency feature, not critical
- 16.5 Communication Management - Nice-to-have, basic messaging works
- 16.6 Payment Method Management - Can be simplified for MVP
- 16.7 Family Member Removal - Can be manual admin action for MVP
- 16.8 Identity Verification (Family Members) - Enhanced security, basic email verification works for MVP
- 16.9 Caregiver Visibility into Family Structure - Nice-to-have
- 16.10 Family Account Safeguarding - Enhanced monitoring

**Without MVP Components**: Cognitively impaired or digitally illiterate elderly users cannot use platform. No family oversight increases exploitation risk. **Safeguarding and accessibility failure.**

**UK Regulations**: Mental Capacity Act 2005 (family may act on behalf of user), Equality Act 2010 (reasonable adjustments for disabled users)

---

### 17. Caregiver Dashboard & Management (MVP - CORE ONLY)

**Classification Rationale**:
- **Core Economic Loop**: ✓ Caregivers need interface to manage bookings and earnings
- **Operational Viability**: ✓ Supply side must have functional dashboard

**MVP Components**:
- 17.1 Dashboard Overview - Core economic loop (caregiver home screen)
- 17.2 Booking Request Management - Core economic loop (accept/decline bookings)
- 17.3 Upcoming Bookings Management - Core economic loop (view and manage bookings)
- 17.4 Earnings Dashboard - Core economic loop (see earnings and payouts)
- 17.5 Calendar Management - Core economic loop (manage availability)
- 17.6 Profile Management - Core economic loop (update profile, upload qualifications)
- 17.7 Message Center - Core economic loop (communicate with care receivers)

**Post-MVP Components**:
- 17.8 Reviews & Ratings - Important but can be basic view for MVP
- 17.9 Performance Insights - Nice-to-have analytics
- 17.10 Verification & Compliance Center - Can be basic document upload for MVP
- 17.11 Settings - Basic settings work for MVP

**Without MVP Components**: Caregivers cannot manage bookings or earnings. **Supply side broken.**

**UK Regulations**: Employment law (self-employed contractors need earnings transparency)

---

### 18. Care Receiver Dashboard (MVP - CORE ONLY)

**Classification Rationale**:
- **Core Economic Loop**: ✓ Care receivers need interface to search, book, and manage care
- **Operational Viability**: ✓ Demand side must have functional dashboard

**MVP Components**:
- 18.1 Dashboard Overview - Core economic loop (care receiver home screen)
- 18.2 Care Needs Profile Management - Safeguarding (define care requirements for matching)
- 18.3 Caregiver Search & Discovery - Core economic loop (find caregivers)
- 18.4 Booking Management - Core economic loop (view and manage bookings)
- 18.5 Message Center - Core economic loop (communicate with caregivers)
- 18.6 Payment & Transaction History - Core economic loop (manage payments)

**Post-MVP Components**:
- 18.7 Reviews Management - Basic review flow works for MVP
- 18.8 Family Account Management - Simplified for MVP
- 18.9 Settings - Basic settings work for MVP

**Without MVP Components**: Care receivers cannot search, book, or pay for care. **Demand side broken.**

**UK Regulations**: Consumer Rights Act (clear service information)

---

### 19. Notifications & Alerts (MVP - EMAIL ONLY)

**Classification Rationale**:
- **Core Economic Loop**: ✓ Users must be notified of booking status changes
- **Safeguarding**: ✓ Emergency alerts required
- **Operational Viability**: ✓ Asynchronous platform requires notifications

**MVP Components**:
- 19.1 Email Notifications (Transactional) - Core economic loop (booking confirmations, payment receipts)
- 19.3 In-App Notifications - Core economic loop (real-time booking requests)

**Post-MVP Components**:
- 19.2 Email Notifications (Engagement) - Marketing feature
- 19.4 SMS Notifications - Nice-to-have, email works for MVP
- 19.5 Push Notifications (Mobile App) - No mobile app in MVP
- 19.6 Notification Preferences - Basic preferences work for MVP
- 19.7 Notification Delivery System - Basic email sending works for MVP

**Without MVP Components**: Users don't know booking status, miss bookings, don't receive payment confirmations. **Core economic loop broken.**

**UK Regulations**: Consumer Rights Act (clear communication of booking status), Distance Selling Regulations (confirmation required)

---

### 20. Analytics & Reporting (POST-MVP - BASIC METRICS ONLY)

**Classification Rationale**:
- **Operational Viability**: Basic metrics needed for operations, but advanced analytics not critical for launch

**MVP Components**:
- 20.1 Platform Metrics Dashboard (Admin) - BASIC ONLY: User counts, booking counts, revenue, safeguarding reports

**Post-MVP Components**:
- All other analytics (user behavior, cohort analysis, A/B testing, etc.) - Optimization features

**Without MVP Components**: Cannot monitor platform health, but can operate with basic database queries initially.

**UK Regulations**: None specific, but CQC may expect quality reporting

---

### 21. Content Management & Education (POST-MVP)

**Classification Rationale**:
- **Operational Viability**: Website content needed but can be static pages initially

**MVP Components**:
- 21.1 Public Website Content - BASIC ONLY: Homepage, How It Works, Pricing, FAQs, Terms, Privacy Policy
- 21.7 Policy & Legal Documents - Regulatory compliance (Terms, Privacy Policy, Safeguarding Policy required)

**Post-MVP Components**:
- 21.2 SEO Optimization - Marketing feature
- 21.3 Educational Resources - Nice-to-have
- 21.4 Caregiver Training Resources - Can use third-party resources for MVP
- 21.5 Help Center - Basic FAQs work for MVP
- 21.6 Community Guidelines - Can be part of Terms of Service for MVP
- 21.8 Blog & Content Marketing - Marketing feature
- 21.9 Platform Announcements - Can use email for MVP
- 21.10 Feedback & Surveys - Nice-to-have

**Without MVP Components**: Users don't understand how platform works or legal terms. **Regulatory compliance failure.**

**UK Regulations**: Consumer Rights Act (clear service descriptions), GDPR (Privacy Policy required)

---

### 22. Technical Infrastructure (MVP - CORE ONLY)

**Classification Rationale**:
- **Operational Viability**: ✓ Platform cannot function without technical infrastructure
- **Regulatory Compliance**: ✓ Security and data protection required

**MVP Components**:
- 22.1 Database Architecture - Operational viability
- 22.2 API Architecture - Operational viability
- 22.3 Authentication & Security - Regulatory compliance (GDPR, data protection)
- 22.4 File Storage - Operational viability (qualification uploads, profile photos)
- 22.5 Email Service - Core economic loop (transactional emails)
- 22.7 Payment Processing - Core economic loop (Stripe)
- 22.8 Geolocation Services - Core economic loop (location-based search)
- 22.13 Hosting & Infrastructure - Operational viability
- 22.16 Accessibility & Internationalization - WCAG 2.1 AA (Equality Act 2010)
- 22.17 Mobile Responsiveness - Operational viability (elderly users often use mobile/tablets)

**Post-MVP Components**:
- 22.6 SMS Service - Can add later
- 22.9 Real-Time Messaging Infrastructure - Can use polling for MVP, WebSockets later
- 22.10 Monitoring & Logging - Basic monitoring works for MVP
- 22.11 Background Job Processing - Can be simplified for MVP
- 22.12 Caching & Performance - Optimization feature
- 22.14 CI/CD Pipeline - Best practice but manual deployment works for MVP
- 22.15 Development & Testing Environments - Best practice but can be simplified
- 22.18 Third-Party Integrations - Only payment, email, maps critical for MVP

**Without MVP Components**: Platform does not function. **Complete operational failure.**

**UK Regulations**: GDPR (data security), Payment Services Regulations (secure payment processing), Equality Act 2010 (accessibility)

---

## POST-MVP SYSTEMS

### Enhanced Features (Not Critical for Launch)

1. **Advanced Analytics & Reporting** (System 20, mostly)
   - User behavior tracking, cohort analysis, A/B testing
   - **Why Post-MVP**: Optimization features, not required for operation
   - **Launch Without**: Use basic metrics and database queries

2. **Content Marketing & SEO** (System 21, mostly)
   - Blog, educational resources, SEO optimization
   - **Why Post-MVP**: Growth features, not operational requirements
   - **Launch Without**: Basic website content sufficient for MVP

3. **Advanced Notification Features** (System 19, enhanced)
   - SMS notifications, push notifications, digest modes
   - **Why Post-MVP**: Email notifications sufficient for MVP
   - **Launch Without**: Email and in-app notifications cover core needs

4. **Performance Optimization** (System 22, enhanced)
   - Caching, CDN, real-time WebSockets, advanced monitoring
   - **Why Post-MVP**: Optimization features, not critical for small user base
   - **Launch Without**: Basic infrastructure handles MVP scale

5. **Enhanced Caregiver Features**
   - Performance insights, message templates, recurring bookings automation
   - **Why Post-MVP**: Convenience features, manual processes work for MVP
   - **Launch Without**: Core booking and earnings management sufficient

6. **Enhanced Safeguarding** (System 9, advanced features)
   - Automated behavioral monitoring, pattern detection, proactive outreach
   - **Why Post-MVP**: Enhancement features, manual admin review works for MVP
   - **Launch Without**: Basic reporting and response sufficient

7. **Clinical Monitoring Enhancements** (System 11, proactive features)
   - Medication assistance tracking, behavioral change monitoring, welfare check-ins
   - **Why Post-MVP**: Proactive features, incident response covers critical needs
   - **Launch Without**: Caregivers can log manually, families can monitor

8. **Live-In Care Enhancements** (System 5.8)
   - Specialized live-in booking features, daily rate negotiation, break schedules
   - **Why Post-MVP**: Can launch with hourly/daily bookings first
   - **Launch Without**: Add live-in care after proving hourly/daily model

---

## REGULATORY GAPS & CONCERNS IDENTIFIED

### 1. CQC Registration Requirement (CRITICAL - NEEDS LEGAL ASSESSMENT)

**Issue**: Complete Feature Map mentions CQC compliance throughout, but CQC registration decision is in Section 13.6 as "preparation."

**Risk**: If platform is providing or arranging "regulated activities" under Health and Social Care Act 2008, CQC registration is **mandatory**, not optional.

**Action Required BEFORE MVP**:
- Obtain legal opinion on whether platform requires CQC registration
- If YES: CQC registration process must begin immediately (takes 3-6 months)
- If NO: Document legal rationale in case CQC challenges later

**Regulated Activities** that may trigger CQC:
- Personal care (washing, dressing, toileting) ✓ Platform supports this
- Accommodation with nursing or personal care ✓ Live-in care may trigger this
- Arranging regulated activities ✓ Platform arranges personal care

**Conclusion**: HIGH PROBABILITY CQC registration required. **MUST RESOLVE BEFORE LAUNCH.**

---

### 2. Insurance Requirements (NOT FULLY SPECIFIED)

**Issue**: Platform requires caregivers to have insurance (Section 10.7) but specifics unclear.

**Required Insurance**:
- **Public Liability Insurance** (minimum £1M) - ✓ Mentioned
- **Professional Indemnity Insurance** - NOT mentioned but likely required
- **Employers Liability Insurance** - NOT applicable (self-employed)

**Gap**: Professional indemnity insurance for personal care providers should be mandatory, especially if caregiver injures care receiver during transfers, hoisting, etc.

**Action Required**:
- Legal review of insurance requirements
- Define minimum coverage amounts
- Specify policy types required
- Document platform's own liability insurance

---

### 3. Medication Assistance Boundaries (NEEDS CLINICAL GOVERNANCE)

**Issue**: Platform allows "medication prompting (non-clinical)" but boundaries unclear.

**Legal Reality**:
- Prompting medication = OK (no training required)
- Handing medication to person = GREY AREA
- Administering medication = REGULATED ACTIVITY (requires training/qualification)

**Risk**: Caregiver crosses line into medication administration, causing harm. Who is liable?

**Action Required**:
- Define exact boundaries in policy
- Caregiver training on medication assistance limits
- Care receiver informed consent that caregiver will NOT administer medication
- Clear warnings in booking flow

---

### 4. Mental Capacity Act Compliance (NOT ADDRESSED)

**Issue**: Platform will serve users with dementia, cognitive impairment, and other conditions affecting mental capacity.

**Legal Requirement**: Mental Capacity Act 2005 requires:
- Presumption of capacity unless proven otherwise
- Best interests decisions for those lacking capacity
- Lasting Power of Attorney (LPA) recognition
- Deprivation of Liberty Safeguards (DoLS) awareness

**Gap**: Complete Feature Map does not address:
- How platform verifies family member has legal authority to book on behalf of cognitively impaired person
- How platform handles users lacking mental capacity
- Whether platform recognizes LPA holders

**Action Required**:
- Add Mental Capacity Act compliance to legal framework
- Verify family member legal authority if care receiver has cognitive impairment
- Document best interests decision-making process

---

### 5. Deprivation of Liberty Risk (LIVE-IN CARE)

**Issue**: Live-in care arrangements could constitute "deprivation of liberty" under Mental Capacity Act if care receiver lacks capacity to consent.

**Legal Requirement**: DoLS authorization required from local authority if:
- Person lacks capacity to consent to care arrangements
- Arrangements amount to deprivation of liberty (constant supervision, restricted movement)

**Risk**: Platform facilitates live-in care for dementia patients without DoLS authorization.

**Action Required**:
- Legal review of live-in care arrangements
- Possibly exclude live-in care from MVP until DoLS process defined
- Require family to confirm care receiver consents or has DoLS authorization

---

### 6. Safeguarding Adults Boards Liaison (NOT SPECIFIED)

**Issue**: Care Act 2014 requires collaboration with local authority Safeguarding Adults Boards (SABs).

**Legal Requirement**:
- Report safeguarding concerns to local authority
- Participate in safeguarding adult reviews (SARs)
- Share information with SABs as appropriate

**Gap**: Complete Feature Map mentions external referral (Section 9.3) but doesn't specify SAB liaison process.

**Action Required**:
- Define SAB liaison procedures
- Identify SAB contacts for each local authority
- Document information sharing protocols
- Train safeguarding team on SAB reporting

---

### 7. Right to Work Verification Limitations

**Issue**: UKVI share code verification (Section 10.3) only checks visa status, not actual right to work.

**Legal Reality**:
- Share code confirms visa exists
- Does NOT confirm hours restrictions, work type restrictions
- Employer (or platform) liable if person works beyond visa restrictions

**Risk**: Caregiver on student visa (20 hours/week limit) works full-time. Platform liable for illegal working.

**Action Required**:
- Manual admin review of visa conditions (not just share code)
- Track caregiver hours to prevent visa violations
- Require caregivers to declare visa restrictions

---

### 8. Data Protection Impact Assessment (DPIA) Required

**Issue**: Section 13.5 mentions DPIA but doesn't confirm it's completed.

**Legal Requirement**: GDPR Article 35 requires DPIA for:
- Systematic monitoring
- Processing sensitive data (health data) on large scale
- Processing vulnerable individuals' data

**Platform triggers ALL THREE**. DPIA is **mandatory before launch**.

**Action Required**:
- Complete DPIA with data protection officer or legal advisor
- Submit to ICO if high risk identified
- Document DPIA and mitigations

---

### 9. Cookie Consent & Analytics (PECR Compliance)

**Issue**: Section 13.2 mentions cookie consent but doesn't specify PECR compliance.

**Legal Requirement**: Privacy and Electronic Communications Regulations (PECR) requires:
- Consent BEFORE placing analytics cookies (Google Analytics, Mixpanel)
- Clear cookie policy
- Opt-out mechanism

**Gap**: Complete Feature Map mentions Google Analytics (Section 20.2) but doesn't confirm PECR-compliant consent.

**Action Required**:
- Implement cookie consent banner (opt-in for analytics)
- Document essential vs. analytics cookies
- Cookie policy published

---

### 10. Equality Act - Caregiver Gender Preferences

**Issue**: Section 4.2 allows filtering by caregiver gender "if requested by care receiver for personal care."

**Legal Risk**: Equality Act 2010 prohibits discrimination based on sex. Gender preference may be:
- **Lawful**: If occupational requirement (e.g., intimate personal care for Muslim woman requires female caregiver)
- **Unlawful**: If preference is discriminatory without justification

**Action Required**:
- Legal review of gender filtering feature
- Require care receiver to justify gender preference (e.g., religious or cultural reasons)
- Document legitimate reasons for gender preferences
- Do NOT allow blanket gender preferences without justification

---

## SUMMARY: MVP SYSTEM CLASSIFICATION

### MVP SYSTEMS (CANNOT LAUNCH WITHOUT)

1. User Management & Authentication (minus 2FA for non-admins)
2. Caregiver Capability & Verification System (minus employment history)
3. Medical Condition & Care Skills Matching (minus care plan uploads and complexity scoring)
4. Discovery & Advanced Search (minus AI matching and saved searches)
5. Booking System (minus live-in enhancements and recurring automation)
6. Messaging & Communication (minus templates and admin messaging)
7. Payment System & Escrow (minus advanced reporting)
8. Reviews, Ratings & Reputation (core only)
9. Safeguarding & Incident Management (core only)
10. Identity & Background Verification (minus insurance verification for MVP)
11. Clinical Safety Monitoring (incident reporting and emergency response only)
12. Admin Operations & Oversight (core functions only)
13. Compliance & Audit System (full system required)
14. Emergency Escalation & Response (core only)
15. Calendar & Availability Management (core only)
16. Family & Multi-User Accounts (basic only)
17. Caregiver Dashboard (core only)
18. Care Receiver Dashboard (core only)
19. Notifications & Alerts (email and in-app only)
20. Analytics & Reporting (basic metrics only)
21. Content Management (legal documents and basic website only)
22. Technical Infrastructure (core only)

### POST-MVP SYSTEMS

- Advanced analytics and optimization features
- Marketing and growth features (SEO, blog, content)
- Enhanced convenience features (SMS, push notifications, message templates)
- Performance optimization (caching, CDN, WebSockets)
- Automated monitoring and pattern detection
- Live-in care specialized features
- Proactive clinical monitoring

---

## CRITICAL PRE-LAUNCH ACTIONS

1. **CQC Registration Legal Opinion** (URGENT) - May require 3-6 months
2. **Data Protection Impact Assessment** (MANDATORY) - 2-4 weeks
3. **Insurance Requirements Legal Review** (URGENT) - 1 week
4. **Mental Capacity Act Compliance Policy** (CRITICAL) - 2 weeks
5. **Safeguarding Adults Board Liaison Procedures** (REQUIRED) - 2 weeks
6. **Medication Assistance Boundaries Clinical Governance** (CRITICAL) - 1 week
7. **Deprivation of Liberty Risk Assessment** (if live-in care in MVP) - 2 weeks
8. **Right to Work Verification Process** (REQUIRED) - 1 week
9. **Cookie Consent PECR Compliance** (REQUIRED) - 1 week
10. **Equality Act Gender Preference Legal Review** (REQUIRED) - 1 week

**Total Pre-Launch Legal/Compliance Work**: 8-12 weeks (excluding CQC registration if required)

---

**Document Status**: Complete
**Next Steps**:
1. Legal review of regulatory gaps
2. CQC registration decision
3. DPIA completion
4. Update marketplace-spec.md and backlog.yml with MVP classification
5. Create technical architecture document for MVP systems only

---

**END OF ANALYSIS**
