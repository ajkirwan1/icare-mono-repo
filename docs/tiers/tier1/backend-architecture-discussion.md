# Backend Architecture Discussion: .NET 10 + Domain-Driven Design

**Document Purpose**: Strategic analysis of the founder's intent to build the Tier 1 backend using .NET 10 with Domain-Driven Design, assessing alignment with existing specifications, identifying risks, and recommending an implementation approach.

**Document Owner**: Product Director
**Created**: 2026-02-12
**Status**: DISCUSSION DRAFT (for founder review)
**Audience**: Founder, Technical Leads

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Current State of Technical Specifications](#2-current-state-of-technical-specifications)
3. [Assessment: .NET 10 as Backend Choice](#3-assessment-net-10-as-backend-choice)
4. [Assessment: Domain-Driven Design for This Marketplace](#4-assessment-domain-driven-design-for-this-marketplace)
5. [The Data-First vs Domain-First Tension](#5-the-data-first-vs-domain-first-tension)
6. [Proposed Bounded Contexts](#6-proposed-bounded-contexts)
7. [Recommended DDD Architecture (.NET Solution Structure)](#7-recommended-ddd-architecture-net-solution-structure)
8. [Key DDD Patterns to Adopt](#8-key-ddd-patterns-to-adopt)
9. [Integration Points and External Services](#9-integration-points-and-external-services)
10. [CQRS Consideration](#10-cqrs-consideration)
11. [API Design: REST vs GraphQL](#11-api-design-rest-vs-graphql)
12. [Authentication and Authorization](#12-authentication-and-authorization)
13. [Database Schema Review Recommendations](#13-database-schema-review-recommendations)
14. [Tier 1 Scope Constraints](#14-tier-1-scope-constraints)
15. [Impact on Existing Specifications](#15-impact-on-existing-specifications)
16. [Risks and Mitigations](#16-risks-and-mitigations)
17. [Agent Team Recommendation](#17-agent-team-recommendation)
18. [Next Steps](#18-next-steps)
19. [Appendix A: Proposed .NET DDD Backend Architect Agent Definition](#appendix-a-proposed-net-ddd-backend-architect-agent-definition)

---

## 1. Executive Summary

The founder intends to build the iCare marketplace backend using **.NET 10** with **Domain-Driven Design (DDD)**, and has already prepared a database schema. This document assesses these choices and provides strategic recommendations.

**Key Findings**:

1. **.NET 10 is a strong choice** for this domain. It offers enterprise-grade reliability, excellent performance, mature identity/auth libraries (ASP.NET Identity), strong typing that aids compliance reasoning, and a thriving ecosystem. For a regulated UK elderly care marketplace, the .NET ecosystem's maturity is an asset.

2. **DDD is well-suited** to this marketplace. The domain has clear bounded contexts (Identity, Bookings, Payments, Verification, Messaging, Safeguarding, Reviews, Admin), complex business rules (booking state machine with 14 states, cancellation policies, commission calculations), and regulatory requirements that benefit from explicit domain modelling.

3. **Starting from a database schema (data-first) creates a tension** with DDD philosophy, which is domain-first. This is not a dealbreaker, but the schema should be treated as a starting reference, not as the immutable foundation. The DDD implementation should define aggregate boundaries first, then validate/adjust the schema to align with those boundaries.

4. **The existing technical specifications** (`api-specification-tier1.md`, `database-schema-tier1.md`, `stripe-integration-spec.md`) were written assuming a Node.js/Express backend. They remain valuable as functional specifications (they define WHAT the system does), but the implementation details (code examples, ORM references, module patterns) will need translation to .NET idioms. The specs should be supplemented with a .NET-specific implementation guide, not rewritten.

5. **A new specialist agent is recommended**: A dedicated `.NET DDD Backend Architect` agent would be more effective than repurposing the existing `technical-architect` agent, which was designed for general technical specification work and has completed its primary mission (APP-001, APP-002, APP-003).

---

## 2. Current State of Technical Specifications

Three canonical technical specifications exist. All were produced by the `technical-architect` agent and are marked COMPLETE:

### 2.1 Database Schema (`/docs/technical/database-schema-tier1.md`)

- **23 tables** designed for PostgreSQL 14+ with PostGIS
- Tables: users, care_receivers, caregivers, caregiver_availability, bookings, booking_state_history, conversations, messages, verification_documents, dbs_checks, right_to_work_checks, payment_intents, payouts, refunds, admin_users, audit_logs, safeguarding_incidents, reviews, plus supporting tables
- Comprehensive indexes, GDPR soft-delete patterns, tier progression migration scripts
- **Technology assumptions**: PostgreSQL, PostGIS, uuid-ossp extension, Prisma or TypeORM as ORM
- **Alignment with .NET**: PostgreSQL is fully supported by Entity Framework Core. PostGIS works with NetTopologySuite. The schema structure is technology-agnostic, but the ORM recommendations need updating.

### 2.2 API Specification (`/docs/technical/api-specification-tier1.md`)

- **45+ REST endpoints** across 11 endpoint categories
- WebSocket events for real-time messaging and booking updates
- JWT Bearer authentication with RS256 signing
- Comprehensive error handling, pagination, and rate limiting
- 10 scheduled background tasks (TASK-001 through TASK-010)
- **Technology assumptions**: Express.js, Node.js, Node-cron or AWS CloudWatch
- **Alignment with .NET**: The API contract (routes, request/response shapes, status codes) is technology-agnostic. The implementation patterns (middleware, handlers) need .NET translation.

### 2.3 Stripe Integration (`/docs/technical/stripe-integration-spec.md`)

- Stripe Connect Express accounts for caregiver payouts
- Stripe Identity for automated ID verification
- Payment Intents with manual capture (authorize-then-capture pattern)
- Application Fee for commission handling
- Comprehensive webhook handling (14 event types)
- **Technology assumptions**: `stripe` npm package, JavaScript code examples
- **Alignment with .NET**: Stripe.net is the official .NET SDK. The business logic and money flow are identical; only the SDK calls change.

### 2.4 Summary: What Transfers and What Does Not

| Aspect | Transfers to .NET? | Notes |
|--------|-------------------|-------|
| API routes and contracts | YES - fully | Endpoint paths, request/response shapes, status codes |
| Business rules | YES - fully | Cancellation policies, booking states, commission calculations |
| Database schema structure | YES - mostly | Tables, columns, indexes transfer; PostGIS needs NetTopologySuite |
| Stripe integration logic | YES - mostly | Business flow identical; SDK calls change to Stripe.net |
| Code examples | NO | All JavaScript/Node.js; need rewriting in C# |
| ORM configuration | NO | Prisma/TypeORM references need Entity Framework Core |
| Background job patterns | NO | Node-cron needs Hangfire, Quartz.NET, or hosted services |
| WebSocket implementation | NO | Socket.io references need SignalR |
| Module/file structure | NO | Express middleware patterns need ASP.NET middleware/pipeline |

---

## 3. Assessment: .NET 10 as Backend Choice

### 3.1 Strengths for This Domain

**.NET 10** (released November 2025) is the latest LTS release of .NET, bringing significant improvements:

**Performance**: .NET consistently ranks among the fastest web frameworks in TechEmpower benchmarks. For a marketplace that will need to handle geographic search queries, real-time messaging, and concurrent booking operations, this matters.

**Type Safety**: C#'s strong type system is advantageous for a regulated domain. Types like `BookingStatus`, `VerificationLevel`, and `IncidentSeverity` can be modelled as discriminated unions or enums with compile-time enforcement, reducing the class of bugs that matter most in an elderly care context.

**ASP.NET Identity**: The built-in identity framework handles user management, password hashing (bcrypt/Argon2), email confirmation, phone verification, two-factor authentication, role-based access control, and account lockout -- all requirements from the existing specs. This is more mature and battle-tested than most Node.js equivalents.

**Entity Framework Core**: EF Core is a mature ORM that supports PostgreSQL (via Npgsql), migrations, complex queries, and the Unit of Work/Repository patterns that DDD requires. PostGIS integration is available via NetTopologySuite.

**SignalR**: ASP.NET Core's real-time communication library is a natural fit for the messaging system (WebSocket events for new messages, typing indicators, booking status updates). It handles connection management, reconnection, and scaling (with Redis backplane) out of the box.

**Background Services**: `IHostedService` and the `BackgroundService` base class, combined with libraries like Hangfire or Quartz.NET, handle the 10 scheduled tasks (booking expiry, reminder emails, visa renewal checks) more robustly than Node.js cron patterns.

**Observability**: Built-in support for OpenTelemetry, structured logging (via `ILogger`), health checks (`IHealthCheck`), and metrics. Critical for a platform handling financial transactions and safeguarding incidents.

### 3.2 Considerations and Risks

**Developer Availability**: .NET developers are abundant in the UK enterprise space, but the intersection of ".NET + DDD + marketplace experience" is narrower than "Node.js + generic web". The founder should confirm their development team or contractor pool is .NET-capable.

**Existing Specification Rework**: The three technical specs contain significant JavaScript/Node.js code examples that will not transfer. While the business logic is technology-agnostic, the implementation guidance will need a .NET translation layer. This is additional work but is manageable.

**Deployment and Hosting**: .NET 10 runs well on Azure (naturally), AWS (via ECS/Fargate, Lambda with .NET AOT), and any Linux host via Docker. The existing specs reference AWS -- the founder should confirm their cloud preference, as Azure offers tighter .NET integration (App Service, Azure Functions, Azure SignalR Service).

**Frontend Decoupling**: The frontend is being built with React (React Router v7, as evidenced by the metadata specification). A .NET backend serving a React SPA is a standard and well-supported architecture. No issues here.

### 3.3 Verdict

.NET 10 is a **well-justified choice** for this elderly care marketplace. The maturity of ASP.NET Identity, Entity Framework Core, and SignalR directly address core requirements. The strong type system aids compliance reasoning. The performance characteristics are excellent. The only caveat is ensuring the development team has appropriate .NET expertise.

---

## 4. Assessment: Domain-Driven Design for This Marketplace

### 4.1 Why DDD Fits This Domain

DDD is most valuable when:
1. The domain has **complex business rules** that change over time
2. There are **multiple stakeholders** with different mental models
3. The domain has **clear subdomains** with different concerns
4. **Getting the domain wrong** has significant consequences (regulatory, financial)

This marketplace meets all four criteria:

**Complex Business Rules**: The booking system alone has 14 states, 3 cancellation tiers with different refund percentages, a 24-hour caregiver response window, 48-hour auto-confirmation, commission calculations, and no-show detection. These rules are not simple CRUD -- they encode business policy.

**Multiple Stakeholders**: Care receivers, family members (proxy booking), caregivers (self-employed contractors), admin staff (4 roles with different permissions), and regulators (CQC, ICO, local Safeguarding Adults Boards) all have different views of the same data.

**Clear Subdomains**: Identity/Users, Bookings, Payments, Messaging, Verification, Safeguarding, Reviews, and Admin Operations are naturally distinct areas with different invariants, lifecycles, and regulatory requirements.

**Consequences of Getting It Wrong**: Incorrect safeguarding escalation logic could violate the Care Act 2014. Incorrect payment handling could breach financial regulations. Incorrect data handling could breach GDPR. DDD forces you to make these rules explicit in code, not hidden in database triggers or service-layer spaghetti.

### 4.2 Where to Be Pragmatic

DDD can be over-applied. For Tier 1 (companionship MVP), pragmatism is essential:

**Do not over-model**: Tier 1 is intentionally simple. Companionship services have fewer constraints than personal care (Tier 2) or health-related services (Tier 3). The DDD model should be lean enough for Tier 1 while having clear extension points for future tiers.

**Not every bounded context needs full tactical DDD**: Some contexts (e.g., Reviews) are simple enough that a basic CRUD approach suffices. Reserve the full tactical pattern set (aggregates, domain events, specifications) for the complex contexts (Bookings, Verification, Safeguarding).

**Ubiquitous language matters most**: Even more than aggregates and repositories, the most valuable aspect of DDD for this project is establishing a shared vocabulary. Terms like "booking request" vs "booking", "care receiver" vs "family member", "verification level" (L0/L1/L2), and "safeguarding incident" vs "safeguarding concern" must mean the same thing in code, specifications, and conversations.

### 4.3 Verdict

DDD is a **strong fit** for this marketplace. The domain complexity, regulatory requirements, and multi-stakeholder nature justify the investment. The key is to apply DDD pragmatically -- full tactical patterns where complexity demands it, lighter patterns where CRUD suffices.

---

## 5. The Data-First vs Domain-First Tension

### 5.1 The Tension

DDD philosophy advocates for **domain-first** design: start with the ubiquitous language, define bounded contexts, identify aggregates and their invariants, and only then design the persistence layer to serve the domain model.

The founder has already **prepared a database schema** (documented in `/docs/technical/database-schema-tier1.md`). This is a **data-first** approach.

These two approaches can conflict:
- Data-first tends to produce an **anemic domain model** where entities are data bags and business logic lives in services
- Domain-first tends to produce a **rich domain model** where entities encapsulate their own behaviour and invariants
- Data-first optimises for storage; domain-first optimises for behaviour

### 5.2 Why This is Not a Dealbreaker

The existing schema is well-designed and reflects genuine domain understanding. It already encodes important business concepts:

- **Booking status as an ENUM** with 14 states -- this aligns with the booking aggregate's state machine
- **Separation of users/care_receivers/caregivers** -- this aligns with the Identity bounded context
- **booking_state_history** as an immutable audit trail -- this aligns with domain events
- **safeguarding_incidents** with Section 42 assessment fields -- this reflects Care Act 2014 requirements
- **Commission and pricing fields** on bookings -- this captures value objects (Money, CommissionRate)

The schema was designed by someone who understands the domain. It is a valid starting point.

### 5.3 Recommended Approach: Schema as Input, Not Constraint

**Treat the existing schema as a reference specification, not as the immutable foundation.**

Concrete steps:

1. **Define bounded contexts first** (see Section 6). Map the domain language.
2. **Define aggregates within each context**. Identify aggregate roots and their invariants.
3. **Map existing tables to aggregates**. Most tables will map naturally. Some will need adjustment:
   - Tables that span multiple aggregates may need splitting
   - Missing concepts (value objects like Money, PostalCode) need adding to the domain model
   - Some tables may need to be reimagined as domain events rather than mutable state
4. **Let EF Core generate migrations from the domain model**. Use Code-First migrations, not Database-First scaffolding. The domain model drives the schema, not the other way around.
5. **Compare generated schema to the original specification**. Differences reveal where the domain model and the data model diverge. Resolve each divergence deliberately.

This approach preserves the work invested in the schema while ensuring the domain model is not constrained by data-layer thinking.

### 5.4 Specific Schema-to-DDD Adjustments to Anticipate

| Current Schema Pattern | DDD Concern | Recommendation |
|------------------------|------------|----------------|
| `bookings` table with 30+ columns | Too many concerns in one table | Split into Booking aggregate (core) + BookingPricing value object + CancellationDetails value object. EF Core owned entities handle this. |
| `booking_status` as database ENUM | Fine, but state transitions not enforced at DB level | Model as a proper state machine in the Booking aggregate with guard clauses. The database stores the result; the domain enforces the rules. |
| `users` + `care_receivers` + `caregivers` as separate tables | Good separation, but shared `users` table creates cross-context coupling | In DDD, Identity context owns `users`. Booking context has its own lightweight reference (CareReceiverId, CaregiverId) without needing the full user profile. |
| `platform_commission_rate` on caregivers table | Commission is a policy, not a caregiver attribute | Extract to a Pricing/Commission policy in the Bookings bounded context. Commission rate may vary by tier, volume, or promotion. |
| `safeguarding_incidents` with many nullable columns (SAB fields, police fields) | Wide table with conditional fields | Model as a state-driven aggregate with value objects: `EscalationToSAB`, `EscalationToPolice`, `InvestigationOutcome`. Each is a value object attached when the relevant state transition occurs. |
| `caregiver_availability` as rows per time slot | Performant for queries, but no aggregate boundary | Availability is part of the Caregiver Profile aggregate. Changes to availability should go through the aggregate root to enforce invariants (e.g., minimum 10 hours/week). |

---

## 6. Proposed Bounded Contexts

Based on the feature specifications and domain analysis, the following bounded contexts are recommended:

### 6.1 Identity and Access Context

**Responsibility**: User registration, authentication, authorization, profile management.

**Aggregate Roots**:
- `User` (authentication credentials, account status, roles)
- `CareReceiverProfile` (care receiver details, emergency contacts, preferences)
- `CaregiverProfile` (professional details, services offered, rate, availability)

**Key Domain Concepts**:
- UserRole (CareReceiver, FamilyMember, Caregiver, Admin)
- AccountStatus (Active, Suspended, Banned, Deactivated)
- PhoneVerification, EmailVerification (value objects)
- FamilyMemberProxy (a care receiver registered by a family member)

**Maps to existing tables**: users, care_receivers, caregivers, caregiver_availability, admin_users

### 6.2 Verification Context

**Responsibility**: Identity verification, right-to-work checks, DBS certificate management, admin approval workflows.

**Aggregate Roots**:
- `VerificationProcess` (tracks a caregiver's verification journey across multiple document types)
- `DBSCheck` (DBS certificate lifecycle, renewal tracking)
- `RightToWorkCheck` (visa tracking, expiry monitoring)

**Key Domain Concepts**:
- VerificationLevel (L0: Unverified, L1: ID + RtW, L2: L1 + DBS)
- VerificationStatus (Pending, Approved, Rejected, Expired)
- DocumentSubmission (value object: type, file reference, submission date)
- AdminReview (value object: reviewer, decision, rationale, date)

**Domain Events**:
- `IdentityVerified`, `RightToWorkVerified`, `DBSVerified`
- `VerificationRejected` (with reason)
- `VisaExpiringIn60Days`, `VisaExpiringIn30Days`, `VisaExpired`
- `DBSRenewalDue`

**Maps to existing tables**: verification_documents, dbs_checks, right_to_work_checks

### 6.3 Booking Context (Core Domain)

**Responsibility**: Booking lifecycle from request through completion, cancellation policies, dispute handling.

**Aggregate Roots**:
- `Booking` (the central aggregate -- request, acceptance, completion, dispute lifecycle)

**Key Domain Concepts**:
- BookingStatus (14-state machine as defined in the specification)
- BookingRequest (value object: date, time, duration, services, special requests)
- CancellationPolicy (value object / policy: refund tiers based on advance notice)
- Dispute (value object: reason, evidence, admin resolution)
- SessionNotes (value object: caregiver's private notes)

**Domain Events**:
- `BookingRequested`, `BookingAccepted`, `BookingDeclined`, `BookingExpired`
- `BookingStarted`, `BookingCompleted`, `BookingConfirmed`
- `BookingCancelled` (with refund calculation)
- `DisputeRaised`, `DisputeResolved`
- `PaymentReleased`

**Invariants**:
- Minimum booking duration: 2 hours
- Maximum booking duration: 8 hours (Tier 1)
- Caregiver must respond within 24 hours
- Cancellation refund tiers: >48h = 100%, 24-48h = 50%, <24h = 0%
- Care receiver confirmation window: 48 hours

**Maps to existing tables**: bookings, booking_state_history

### 6.4 Payment Context

**Responsibility**: Payment processing, commission handling, payouts, refunds. Integrates with Stripe.

**Aggregate Roots**:
- `Payment` (tracks payment lifecycle for a booking)
- `Payout` (tracks transfer to caregiver)

**Key Domain Concepts**:
- Money (value object: amount + currency, prevents rounding errors)
- CommissionPolicy (service fee %, caregiver commission %, VAT handling)
- PaymentStatus (Authorized, Captured, Refunded, Failed, Disputed)
- RefundPolicy (amount calculation based on cancellation timing)

**Domain Events**:
- `PaymentAuthorized`, `PaymentCaptured`, `PaymentFailed`
- `PayoutInitiated`, `PayoutCompleted`, `PayoutFailed`
- `RefundProcessed`

**Anti-Corruption Layer**: Wraps Stripe SDK calls. The domain model does not reference Stripe types directly. A `IPaymentGateway` interface abstracts the payment provider.

**Maps to existing tables**: payment_intents, payouts, refunds

### 6.5 Messaging Context

**Responsibility**: Conversations between care receivers and caregivers, content moderation, message flagging.

**Aggregate Roots**:
- `Conversation` (thread between two parties, optionally linked to a booking)

**Key Domain Concepts**:
- Message (entity within Conversation aggregate)
- ContentFilter (value object / service: detects prohibited content like contact info, off-platform payment requests)
- MessageFlag (value object: reason, admin review status)

**Domain Events**:
- `MessageSent`, `MessageRead`, `MessageFlagged`
- `OffPlatformPaymentAttemptDetected` (triggers safeguarding alert)

**Maps to existing tables**: conversations, messages

### 6.6 Safeguarding Context

**Responsibility**: Incident reporting, investigation management, Care Act 2014 compliance, external escalation (SAB, police).

**Aggregate Roots**:
- `SafeguardingIncident` (full investigation lifecycle)

**Key Domain Concepts**:
- IncidentType (13 types as defined in the spec, from physical abuse to policy violation)
- Severity (Low, Medium, High, Critical)
- Section42Assessment (value object: the three Care Act 2014 criteria)
- SABEscalation (value object: local authority, reference number, outcome)
- PoliceEscalation (value object: force, crime reference, outcome)
- InvestigationTimeline (value object: SLA tracking, breach detection)

**Domain Events**:
- `IncidentReported`, `InvestigationStarted`, `IncidentEscalatedToSAB`
- `IncidentEscalatedToPolice`, `IncidentResolved`, `UserSuspended`, `UserBanned`

**This is the context where DDD provides the most value.** Safeguarding logic is complex, high-stakes, and regulated. Making it explicit in a domain model rather than scattered across service methods is critical.

**Maps to existing tables**: safeguarding_incidents

### 6.7 Review Context

**Responsibility**: Post-booking reviews, rating aggregation, moderation.

**Aggregate Roots**:
- `Review` (simple aggregate -- rating, text, tags, caregiver response)

**DDD Intensity**: Low. This is essentially CRUD with some validation (one review per booking, 14-day window, rating 1-5). A lightweight tactical approach is appropriate.

**Maps to existing tables**: reviews

### 6.8 Admin/Operations Context

**Responsibility**: Admin user management, audit logging, platform configuration.

**Note**: This is more of a **supporting context** than a core domain context. It primarily provides cross-cutting capabilities (audit trails, user suspension, platform settings) that other contexts consume.

**Maps to existing tables**: admin_users, audit_logs, platform_settings

### 6.9 Context Map (Relationships)

```
Identity ----[Shared Kernel]---- Verification
    |                                  |
    |                            [Customer/Supplier]
    |                                  |
    +----[Customer/Supplier]---- Booking ----[Customer/Supplier]---- Payment
                                   |                                     |
                             [Published Language]                  [Anti-Corruption Layer]
                                   |                                     |
                              Messaging                              Stripe
                                   |
                             [Conformist]
                                   |
                             Safeguarding

Review ----[Customer/Supplier]---- Booking
Admin  ----[Open Host Service]---- All Contexts
```

**Key Relationships**:
- **Identity <-> Booking**: Booking needs user identifiers but not full profiles. Lightweight references.
- **Booking -> Payment**: Booking raises events (BookingAccepted, BookingCompleted); Payment context reacts.
- **Payment -> Stripe**: Anti-corruption layer isolates the domain from Stripe SDK specifics.
- **Messaging -> Safeguarding**: Message flagging triggers safeguarding alerts via domain events.
- **Booking -> Review**: Review creation gated on booking completion status.

---

## 7. Recommended DDD Architecture (.NET Solution Structure)

### 7.1 Clean Architecture / Onion Architecture

The recommended approach is **Clean Architecture** (also known as Onion Architecture), which aligns naturally with DDD:

```
src/
|
+-- ICare.Domain/                          # Domain Layer (innermost)
|   +-- Common/
|   |   +-- ValueObjects/
|   |   |   +-- Money.cs
|   |   |   +-- PostalCode.cs
|   |   |   +-- EmailAddress.cs
|   |   |   +-- PhoneNumber.cs
|   |   +-- Interfaces/
|   |   |   +-- IAggregateRoot.cs
|   |   |   +-- IDomainEvent.cs
|   |   |   +-- IRepository.cs
|   |   +-- Exceptions/
|   |   |   +-- DomainException.cs
|   |   +-- Guards/
|   |       +-- Guard.cs
|   |
|   +-- Identity/
|   |   +-- Entities/
|   |   |   +-- User.cs
|   |   |   +-- CareReceiverProfile.cs
|   |   |   +-- CaregiverProfile.cs
|   |   +-- ValueObjects/
|   |   |   +-- UserRole.cs
|   |   |   +-- AccountStatus.cs
|   |   |   +-- ServiceArea.cs
|   |   +-- Events/
|   |       +-- UserRegistered.cs
|   |       +-- PhoneVerified.cs
|   |
|   +-- Bookings/
|   |   +-- Entities/
|   |   |   +-- Booking.cs                 # Aggregate Root
|   |   +-- ValueObjects/
|   |   |   +-- BookingStatus.cs
|   |   |   +-- BookingRequest.cs
|   |   |   +-- CancellationDetails.cs
|   |   |   +-- BookingPricing.cs
|   |   |   +-- DisputeDetails.cs
|   |   +-- Events/
|   |   |   +-- BookingRequested.cs
|   |   |   +-- BookingAccepted.cs
|   |   |   +-- BookingCompleted.cs
|   |   |   +-- BookingCancelled.cs
|   |   |   +-- DisputeRaised.cs
|   |   +-- Policies/
|   |   |   +-- CancellationPolicy.cs
|   |   |   +-- ResponseWindowPolicy.cs
|   |   +-- Interfaces/
|   |       +-- IBookingRepository.cs
|   |
|   +-- Payments/
|   |   +-- Entities/
|   |   |   +-- Payment.cs
|   |   |   +-- Payout.cs
|   |   +-- ValueObjects/
|   |   |   +-- CommissionBreakdown.cs
|   |   |   +-- PaymentStatus.cs
|   |   +-- Events/
|   |   |   +-- PaymentCaptured.cs
|   |   |   +-- PayoutCompleted.cs
|   |   |   +-- RefundProcessed.cs
|   |   +-- Interfaces/
|   |       +-- IPaymentGateway.cs          # Anti-corruption layer interface
|   |
|   +-- Verification/
|   |   +-- Entities/
|   |   |   +-- VerificationProcess.cs
|   |   |   +-- DBSCheck.cs
|   |   |   +-- RightToWorkCheck.cs
|   |   +-- ValueObjects/
|   |   |   +-- VerificationLevel.cs
|   |   |   +-- DocumentSubmission.cs
|   |   +-- Events/
|   |       +-- IdentityVerified.cs
|   |       +-- VisaExpiring.cs
|   |
|   +-- Messaging/
|   |   +-- Entities/
|   |   |   +-- Conversation.cs
|   |   |   +-- Message.cs
|   |   +-- ValueObjects/
|   |   |   +-- MessageFlag.cs
|   |   +-- Services/
|   |       +-- ContentFilterService.cs     # Domain Service
|   |
|   +-- Safeguarding/
|   |   +-- Entities/
|   |   |   +-- SafeguardingIncident.cs
|   |   +-- ValueObjects/
|   |   |   +-- Section42Assessment.cs
|   |   |   +-- SABEscalation.cs
|   |   |   +-- PoliceEscalation.cs
|   |   |   +-- InvestigationOutcome.cs
|   |   +-- Events/
|   |       +-- IncidentReported.cs
|   |       +-- IncidentEscalatedToSAB.cs
|   |
|   +-- Reviews/
|       +-- Entities/
|       |   +-- Review.cs
|       +-- ValueObjects/
|           +-- ReviewTags.cs
|
+-- ICare.Application/                      # Application Layer
|   +-- Common/
|   |   +-- Interfaces/
|   |   |   +-- IUnitOfWork.cs
|   |   |   +-- ICurrentUserService.cs
|   |   |   +-- IDateTimeProvider.cs
|   |   +-- Behaviors/
|   |   |   +-- ValidationBehavior.cs       # MediatR pipeline behavior
|   |   |   +-- LoggingBehavior.cs
|   |   |   +-- AuthorizationBehavior.cs
|   |   +-- Exceptions/
|   |       +-- NotFoundException.cs
|   |       +-- ForbiddenException.cs
|   |       +-- ValidationException.cs
|   |
|   +-- Bookings/
|   |   +-- Commands/
|   |   |   +-- CreateBookingRequest/
|   |   |   |   +-- CreateBookingCommand.cs
|   |   |   |   +-- CreateBookingCommandHandler.cs
|   |   |   |   +-- CreateBookingCommandValidator.cs
|   |   |   +-- AcceptBooking/
|   |   |   +-- DeclineBooking/
|   |   |   +-- CancelBooking/
|   |   |   +-- CompleteBooking/
|   |   |   +-- RaiseDispute/
|   |   +-- Queries/
|   |   |   +-- GetBookingById/
|   |   |   +-- GetMyBookings/
|   |   +-- EventHandlers/
|   |       +-- BookingAcceptedEventHandler.cs  # Triggers payment capture
|   |       +-- BookingCompletedEventHandler.cs # Triggers confirmation timer
|   |
|   +-- [Similar structure for each bounded context]
|
+-- ICare.Infrastructure/                   # Infrastructure Layer
|   +-- Persistence/
|   |   +-- ICareDbContext.cs
|   |   +-- Configurations/                 # EF Core entity configurations
|   |   |   +-- UserConfiguration.cs
|   |   |   +-- BookingConfiguration.cs
|   |   |   +-- CaregiverConfiguration.cs
|   |   +-- Repositories/
|   |   |   +-- BookingRepository.cs
|   |   |   +-- CaregiverRepository.cs
|   |   +-- Migrations/
|   |   +-- Interceptors/
|   |       +-- AuditableEntityInterceptor.cs
|   |       +-- DomainEventDispatcherInterceptor.cs
|   |
|   +-- ExternalServices/
|   |   +-- Stripe/
|   |   |   +-- StripePaymentGateway.cs     # Implements IPaymentGateway
|   |   |   +-- StripeIdentityService.cs
|   |   |   +-- StripeWebhookHandler.cs
|   |   +-- Communication/
|   |   |   +-- TwilioSmsService.cs
|   |   |   +-- SendGridEmailService.cs
|   |   +-- Geocoding/
|   |       +-- PostcodeIoService.cs         # UK postcode lookup
|   |
|   +-- BackgroundJobs/
|   |   +-- BookingExpiryJob.cs              # TASK-002
|   |   +-- BookingAutoConfirmJob.cs         # TASK-003
|   |   +-- ReminderJob.cs                   # TASK-005
|   |   +-- VisaExpiryCheckJob.cs            # TASK-009
|   |
|   +-- Identity/
|       +-- IdentityService.cs
|       +-- JwtTokenService.cs
|       +-- CurrentUserService.cs
|
+-- ICare.WebApi/                           # Presentation Layer (ASP.NET Core)
|   +-- Controllers/
|   |   +-- AuthController.cs
|   |   +-- BookingsController.cs
|   |   +-- CaregiversController.cs
|   |   +-- CareReceiversController.cs
|   |   +-- ConversationsController.cs
|   |   +-- VerificationController.cs
|   |   +-- PaymentsController.cs
|   |   +-- SafeguardingController.cs
|   |   +-- AdminController.cs
|   |   +-- WebhooksController.cs
|   +-- Hubs/
|   |   +-- MessagingHub.cs                  # SignalR hub
|   |   +-- BookingStatusHub.cs
|   +-- Middleware/
|   |   +-- ExceptionHandlingMiddleware.cs
|   |   +-- RateLimitingMiddleware.cs
|   |   +-- AuditLoggingMiddleware.cs
|   +-- Filters/
|   |   +-- ApiKeyAuthorizationFilter.cs     # For webhook endpoints
|   +-- DTOs/
|   |   +-- Requests/
|   |   +-- Responses/
|   +-- Mapping/
|   |   +-- BookingMappingProfile.cs         # AutoMapper or Mapster
|   +-- Program.cs
|   +-- appsettings.json
|
+-- tests/
    +-- ICare.Domain.Tests/
    +-- ICare.Application.Tests/
    +-- ICare.Infrastructure.Tests/
    +-- ICare.WebApi.IntegrationTests/
```

### 7.2 Key Libraries

| Library | Purpose | Justification |
|---------|---------|---------------|
| **MediatR** | CQRS command/query dispatching, domain event publishing | Industry standard for .NET CQRS; decouples application layer from controllers |
| **FluentValidation** | Request validation | Composable validation rules; integrates with MediatR pipeline |
| **Entity Framework Core** (Npgsql) | ORM / PostgreSQL access | Mature, supports PostGIS via NetTopologySuite, Code-First migrations |
| **Hangfire** or **Quartz.NET** | Background job scheduling | Handles the 10 scheduled tasks; persistent job storage; dashboard |
| **SignalR** | Real-time messaging | Built-in ASP.NET Core; handles WebSocket connections, reconnection |
| **Stripe.net** | Payment processing | Official Stripe .NET SDK |
| **Serilog** | Structured logging | Better than default ILogger for production; sinks for multiple targets |
| **Mapster** or **AutoMapper** | DTO mapping | Maps domain entities to API response DTOs |
| **NetTopologySuite** | PostGIS / geographic queries | .NET standard for spatial data; integrates with EF Core Npgsql |
| **Polly** | Resilience / retry policies | Retry and circuit-breaker for Stripe calls, external services |

---

## 8. Key DDD Patterns to Adopt

### 8.1 Aggregates

**Definition**: A cluster of domain objects treated as a single unit for data changes. External references only point to the aggregate root.

**Example -- Booking Aggregate**:

```csharp
public class Booking : AggregateRoot
{
    public BookingId Id { get; private set; }
    public CareReceiverId CareReceiverId { get; private set; }
    public CaregiverId CaregiverId { get; private set; }
    public BookingStatus Status { get; private set; }
    public BookingRequest Request { get; private set; }       // Value Object
    public BookingPricing Pricing { get; private set; }       // Value Object
    public CancellationDetails? Cancellation { get; private set; }
    public DisputeDetails? Dispute { get; private set; }

    // Private constructor -- use factory method
    private Booking() { }

    // Factory method enforces invariants at creation
    public static Booking Create(
        CareReceiverId careReceiverId,
        CaregiverId caregiverId,
        BookingRequest request,
        BookingPricing pricing)
    {
        Guard.Against.Null(request);
        Guard.Against.LessThan(request.DurationHours, 2, "Minimum booking is 2 hours");
        Guard.Against.GreaterThan(request.DurationHours, 8, "Maximum booking is 8 hours at Tier 1");

        var booking = new Booking
        {
            Id = BookingId.New(),
            CareReceiverId = careReceiverId,
            CaregiverId = caregiverId,
            Status = BookingStatus.Requested,
            Request = request,
            Pricing = pricing
        };

        booking.AddDomainEvent(new BookingRequestedEvent(booking.Id));
        return booking;
    }

    // State transition methods enforce business rules
    public void Accept()
    {
        if (Status != BookingStatus.Requested)
            throw new DomainException("Only requested bookings can be accepted");

        Status = BookingStatus.Accepted;
        AddDomainEvent(new BookingAcceptedEvent(Id, CareReceiverId, CaregiverId));
    }

    public void Cancel(UserId cancelledBy, string reason, IClock clock)
    {
        if (Status != BookingStatus.Requested && Status != BookingStatus.Accepted)
            throw new DomainException("Only requested or accepted bookings can be cancelled");

        var hoursUntilStart = (Request.StartTime - clock.UtcNow).TotalHours;
        var refundPercentage = CancellationPolicy.CalculateRefund(hoursUntilStart);

        Cancellation = new CancellationDetails(cancelledBy, reason, clock.UtcNow, refundPercentage);
        Status = BookingStatus.Cancelled;

        AddDomainEvent(new BookingCancelledEvent(Id, refundPercentage));
    }
}
```

### 8.2 Value Objects

**Definition**: Objects defined by their attributes, not their identity. Immutable. Two value objects with the same attributes are equal.

**Examples for this domain**:

- `Money` (amount + currency) -- prevents rounding errors, enforces GBP
- `PostalCode` -- validates UK postcode format, normalises spacing
- `EmailAddress` -- validates email format
- `PhoneNumber` -- validates UK phone format (+44...)
- `BookingPricing` -- hourly rate, duration, service fee, commission, total charge, caregiver earnings
- `CancellationDetails` -- who cancelled, reason, timestamp, refund percentage
- `Section42Assessment` -- the three Care Act 2014 criteria (boolean flags + rationale)
- `VerificationLevel` -- L0/L1/L2 with rules for progression

### 8.3 Domain Events

**Definition**: Something important that happened in the domain. Immutable records of facts.

**Purpose**: Decouple bounded contexts. When a booking is accepted, the Booking context raises `BookingAcceptedEvent`. The Payment context subscribes and captures the payment. The Messaging context subscribes and opens a conversation. Neither knows about the other.

**Implementation**: Use MediatR `INotification` for in-process events. Consider a message broker (RabbitMQ, Azure Service Bus) if bounded contexts are deployed separately in the future.

**Key events in this system**:

| Event | Raised By | Consumed By |
|-------|-----------|-------------|
| `BookingRequested` | Booking | Payment (authorize), Notification (email caregiver) |
| `BookingAccepted` | Booking | Payment (capture), Messaging (open conversation), Notification (email both) |
| `BookingCompleted` | Booking | Payment (start confirmation timer), Review (enable review) |
| `BookingCancelled` | Booking | Payment (process refund), Notification (email both) |
| `DisputeRaised` | Booking | Payment (hold payout), Admin (queue for investigation) |
| `MessageFlagged` | Messaging | Safeguarding (create incident if off-platform payment) |
| `IncidentReported` | Safeguarding | Admin (queue for investigation), Notification (acknowledge reporter) |
| `VisaExpired` | Verification | Identity (deactivate caregiver profile) |

### 8.4 Repositories

**Definition**: Abstractions for aggregate persistence. One repository per aggregate root.

**Rule**: Repositories operate on aggregate roots only. You never have a `MessageRepository` if `Message` is an entity within the `Conversation` aggregate -- you use `IConversationRepository.GetById()` and access messages through the conversation.

**Implementation**: Define interfaces in the Domain layer (`IBookingRepository`). Implement in the Infrastructure layer using EF Core.

### 8.5 Application Services (Command/Query Handlers)

**Definition**: Orchestrate use cases by coordinating domain objects. They do not contain business logic -- that belongs in the domain model.

**Pattern**: CQRS with MediatR. Commands change state; queries read state.

```csharp
// Command
public record AcceptBookingCommand(Guid BookingId) : IRequest<BookingResponse>;

// Handler (Application Service)
public class AcceptBookingCommandHandler : IRequestHandler<AcceptBookingCommand, BookingResponse>
{
    private readonly IBookingRepository _bookings;
    private readonly IUnitOfWork _unitOfWork;

    public async Task<BookingResponse> Handle(AcceptBookingCommand command, CancellationToken ct)
    {
        var booking = await _bookings.GetByIdAsync(command.BookingId, ct)
            ?? throw new NotFoundException("Booking", command.BookingId);

        booking.Accept(); // Domain logic lives in the aggregate

        await _unitOfWork.SaveChangesAsync(ct); // Persists changes + dispatches domain events
        return booking.ToResponse();
    }
}
```

### 8.6 Domain Services

**Definition**: Operations that do not naturally belong to a single entity or value object.

**Examples**:
- `ContentFilterService` -- checks message text against prohibited patterns (contact info, payment keywords). This logic does not belong to `Message` or `Conversation` alone.
- `GeographicSearchService` -- PostGIS-based caregiver search. Requires infrastructure (database) and domain knowledge (service radius, approved profile status).
- `CommissionCalculator` -- calculates pricing breakdown given hourly rate, duration, and current commission policy. Could be a domain service or a method on a `CommissionPolicy` value object.

---

## 9. Integration Points and External Services

### 9.1 Anti-Corruption Layer Pattern

External services should be accessed through interfaces defined in the Domain or Application layer, with implementations in the Infrastructure layer. This prevents external service concerns from leaking into the domain model.

| External Service | Interface (Domain/Application) | Implementation (Infrastructure) |
|-----------------|-------------------------------|--------------------------------|
| **Stripe Payments** | `IPaymentGateway` | `StripePaymentGateway` |
| **Stripe Connect** | `IPayoutService` | `StripePayoutService` |
| **Stripe Identity** | `IIdentityVerificationService` | `StripeIdentityService` |
| **SMS (Twilio)** | `ISmsService` | `TwilioSmsService` |
| **Email (SendGrid)** | `IEmailService` | `SendGridEmailService` |
| **Postcode Lookup** | `IGeocodeService` | `PostcodeIoService` |
| **DBS Provider** | `IDBSCheckService` | `DBSProviderService` (Tier 2+) |

### 9.2 Stripe Integration in .NET

The Stripe.net SDK (`Stripe.net` NuGet package) provides the same functionality as the Node.js SDK:

- `PaymentIntentService` for creating/capturing payment intents
- `AccountService` for Connect account management
- `IdentityVerificationSessionService` for ID verification
- `WebhookEndpoint` for webhook signature verification

The existing `/docs/technical/stripe-integration-spec.md` defines the business logic (money flow, commission calculation, refund tiers) -- this is fully transferable. Only the SDK calls change.

### 9.3 Webhook Handling

Stripe webhooks should be handled by a dedicated `WebhooksController` that:
1. Verifies the Stripe signature
2. Deserializes the event
3. Dispatches a MediatR command (e.g., `ProcessStripeWebhookCommand`)
4. The command handler routes to the appropriate domain logic

This keeps webhook handling clean and testable.

---

## 10. CQRS Consideration

### 10.1 Should This Marketplace Adopt CQRS?

**Recommendation: Yes, but lightweight CQRS -- same database for reads and writes.**

CQRS (Command Query Responsibility Segregation) separates the write model (commands that change state) from the read model (queries that return data). Full CQRS uses separate databases for reads and writes. Lightweight CQRS uses the same database but different code paths.

**Why lightweight CQRS fits**:

- **Search queries** (find caregivers by location, filter by availability, rate, DBS status) are read-heavy and benefit from optimised read models (database views, denormalised DTOs)
- **Admin dashboards** (verification queue, safeguarding reports, booking overview) need aggregated data that does not map 1:1 to domain aggregates
- **Booking mutations** (request, accept, cancel, dispute) have complex domain logic that benefits from clear command handlers
- **MediatR** provides the dispatching infrastructure for free

**Why full CQRS (separate databases) is overkill at Tier 1**:

- Tier 1 volumes will be low (validating product-market fit)
- Eventual consistency adds complexity inappropriate for a regulated care platform
- A single PostgreSQL database with proper indexing handles the load
- Can migrate to full CQRS at Tier 3+ if needed

### 10.2 Practical Implementation

```csharp
// Write side: Command -> Handler -> Aggregate -> Repository
public record AcceptBookingCommand(Guid BookingId) : IRequest<BookingResponse>;

// Read side: Query -> Handler -> DbContext (direct, bypassing aggregate)
public record GetBookingByIdQuery(Guid BookingId) : IRequest<BookingDetailDto>;

public class GetBookingByIdQueryHandler : IRequestHandler<GetBookingByIdQuery, BookingDetailDto>
{
    private readonly ICareDbContext _db; // Read directly from DB, no repository

    public async Task<BookingDetailDto> Handle(GetBookingByIdQuery query, CancellationToken ct)
    {
        return await _db.Bookings
            .Where(b => b.Id == query.BookingId)
            .Select(b => new BookingDetailDto { /* projection */ })
            .FirstOrDefaultAsync(ct)
            ?? throw new NotFoundException("Booking", query.BookingId);
    }
}
```

---

## 11. API Design: REST vs GraphQL

### 11.1 Recommendation: REST

**The existing API specification defines 45+ RESTful endpoints.** These are well-designed, cover all Tier 1 use cases, and follow standard REST conventions.

**Reasons to stay with REST**:
- The specification is complete and tested against feature requirements
- REST is simpler to implement, debug, and monitor
- ASP.NET Core has excellent REST support (controllers, model binding, Swagger/OpenAPI)
- Care receivers (elderly users, family members) are not power users who need flexible query capabilities
- The API is consumed by a single first-party frontend (React SPA), not multiple third-party clients

**When GraphQL might be considered**:
- Tier 3+ when mobile apps launch (different data needs per platform)
- If third-party integrations require flexible data access
- Not at Tier 1

### 11.2 Versioning Strategy

The existing spec proposes URL-based versioning (`/api/v1/`). This is the correct choice for a .NET backend:

```csharp
app.MapGroup("/api/v1")
    .MapBookingEndpoints()
    .MapCaregiverEndpoints()
    .MapAuthEndpoints();
```

Alternatively, using `Asp.Versioning.Mvc`:

```csharp
[ApiVersion("1.0")]
[Route("api/v{version:apiVersion}/bookings")]
public class BookingsController : ControllerBase { }
```

---

## 12. Authentication and Authorization

### 12.1 Recommended Approach: ASP.NET Identity + JWT

**ASP.NET Identity** handles:
- User registration and management
- Password hashing (bcrypt by default, configurable)
- Email confirmation tokens
- Phone number confirmation
- Two-factor authentication
- Account lockout (after N failed attempts)
- Role management

**JWT Bearer Tokens** for API authentication:
- Access token: Short-lived (1 hour recommended; the existing spec says 24 hours, which is reasonable for Tier 1)
- Refresh token: 7 days, stored in httpOnly cookie
- RS256 signing (asymmetric keys, as specified)

### 12.2 Role-Based Access Control

The existing admin specification defines 4 admin roles:
- `SuperAdmin` -- full platform access
- `SafeguardingOfficer` -- safeguarding focus, user management
- `OperationsManager` -- verification, bookings, disputes
- `CustomerSupport` -- read-only, basic support

Plus 3 user roles:
- `CareReceiver`
- `FamilyMember`
- `Caregiver`

ASP.NET Identity's `IdentityRole` and policy-based authorization handle this naturally:

```csharp
[Authorize(Policy = "SafeguardingAccess")]
[HttpPost("admin/safeguarding/{id}/escalate")]
public async Task<IActionResult> EscalateToSAB(Guid id, EscalateRequest request) { }
```

---

## 13. Database Schema Review Recommendations

The existing schema (`/docs/technical/database-schema-tier1.md`) is well-designed. When implementing the DDD model in .NET with EF Core Code-First, the following adjustments are recommended:

### 13.1 Changes to Make

| Area | Current Schema | DDD Recommendation |
|------|---------------|-------------------|
| **Primary Keys** | UUID (`uuid_generate_v4()`) | Keep UUIDs. Use strongly-typed IDs (`BookingId`, `UserId`) wrapping `Guid` for type safety. |
| **Booking table** | Single wide table (30+ columns) | Use EF Core Owned Types for value objects (BookingPricing, CancellationDetails, DisputeDetails). Stored in same table but modelled as separate objects. |
| **Timestamps** | `created_at`, `updated_at` on every table | Use an `AuditableEntity` base class and an EF Core SaveChanges interceptor to set these automatically. |
| **Soft deletes** | `deleted_at` column | Use a global query filter in EF Core: `modelBuilder.Entity<User>().HasQueryFilter(u => u.DeletedAt == null)` |
| **ENUMs** | PostgreSQL ENUM types | Map to C# enums. EF Core Npgsql supports PostgreSQL enums natively. Alternatively, use string storage for flexibility. |
| **JSONB columns** | `preferred_availability JSONB`, `permissions JSONB` | Use EF Core's JSON column support (EF Core 7+) or owned type collections. |
| **ORM** | Prisma / TypeORM (JavaScript) | Entity Framework Core with Npgsql provider. Code-First migrations. |
| **PostGIS** | Direct SQL with `ST_MakePoint`, `ST_DWithin` | Use NetTopologySuite with EF Core. NTS provides `Point`, `Distance()`, spatial indexing. |

### 13.2 Changes NOT to Make

- **Do not change the table structure fundamentally.** The tables map well to aggregates.
- **Do not add tables for Tier 2+ features.** Maintain tier isolation.
- **Do not remove audit/history tables.** `booking_state_history` and `audit_logs` are critical for safeguarding compliance.
- **Do not change the booking status ENUM values.** The 14 states are well-defined and used across the entire system.

---

## 14. Tier 1 Scope Constraints

The DDD implementation must respect Tier 1's intentional simplicity:

### 14.1 What the Domain Model Must NOT Include

- **No health data entities** (no `MedicalCondition`, `CareNeed`, `RiskAssessment`)
- **No care skill matching** (no `CareSkill`, `QualificationVerification`)
- **No CQC registration concepts** (the platform is an Introduction Agency, not a care provider)
- **No employment concepts** (no `Schedule`, `Shift`, `EmployeeId` -- caregivers are self-employed)

### 14.2 Tier Progression Strategy

The DDD architecture should support tier progression through:

1. **Extensible bounded contexts**: New value objects and entities can be added to existing contexts (e.g., `CareSkill` added to Identity context at Tier 2)
2. **New bounded contexts**: Tier 3 may introduce a `ClinicalAssessment` context that does not exist at Tier 1
3. **Feature flags**: Tier-specific features gated by configuration, not by code deployment
4. **Schema migrations**: EF Core migrations add nullable columns and new tables for higher tiers

---

## 15. Impact on Existing Specifications

### 15.1 Documents That Remain Valid As-Is

| Document | Why It Remains Valid |
|----------|---------------------|
| All 6 feature specifications (`tier1-*.md`) | Define WHAT the system does, not HOW. Technology-agnostic. |
| Route map (`tier1-route-map.md`) | Frontend routes. Backend technology does not affect these. |
| All wireframes and screen JSONs | UI specifications. Unaffected. |
| Compliance documents | Regulatory requirements. Technology-agnostic. |
| Website content | Marketing/legal content. Unaffected. |

### 15.2 Documents That Need Supplementation

| Document | What Needs Updating |
|----------|-------------------|
| `api-specification-tier1.md` | API contracts remain valid. Add a .NET implementation appendix or separate document mapping endpoints to controllers, noting SignalR hub design instead of raw WebSocket, and ASP.NET middleware instead of Express middleware. |
| `database-schema-tier1.md` | Schema structure remains valid. Add EF Core mapping notes (owned types, value objects, JSON columns). Change ORM recommendation from Prisma/TypeORM to EF Core + Npgsql. |
| `stripe-integration-spec.md` | Business logic and money flow remain valid. Add Stripe.net code examples as a supplement. |
| `build-sequence.md` | References "PostgreSQL/MySQL" and generic tech stack. Should be updated to specify .NET 10, EF Core, SignalR, etc. |

### 15.3 Documents That Should Be Created

| New Document | Purpose |
|-------------|---------|
| **Backend Implementation Guide** (`/docs/technical/dotnet-implementation-guide.md`) | .NET solution structure, project setup, NuGet packages, Docker configuration, CI/CD pipeline |
| **DDD Model Reference** (`/docs/technical/ddd-domain-model.md`) | Bounded contexts, aggregate definitions, domain events catalog, context map |
| **Infrastructure Setup Guide** (`/docs/technical/infrastructure-setup.md`) | Cloud provider, database provisioning, environment configuration, deployment process |

---

## 16. Risks and Mitigations

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| **Over-engineering DDD at Tier 1** | Medium | High (delays launch) | Apply full tactical DDD only to Booking, Safeguarding, and Verification contexts. Use lightweight CRUD for Reviews and simple queries. |
| **Schema-domain mismatch** | Medium | Medium | Follow the "schema as input, not constraint" approach. Let the domain model drive; compare with existing schema; reconcile differences deliberately. |
| **Existing spec confusion** | Medium | Medium | Create a clear .NET implementation supplement rather than rewriting existing specs. Clearly mark JavaScript code examples as "reference implementation, see .NET guide for C# equivalents." |
| **Developer unfamiliarity with DDD** | Medium | High | Invest in DDD training/pairing at project start. The Booking aggregate is a good teaching example. Consider DDD workshops before coding begins. |
| **Analysis paralysis on bounded context boundaries** | Low | Medium | Start with the 8 contexts proposed in this document. Refine as implementation reveals better boundaries. Boundaries are not permanent. |
| **PostGIS to NetTopologySuite migration issues** | Low | Low | NetTopologySuite is mature and well-documented. PostGIS SQL patterns translate directly. |
| **Stripe.net SDK differences from Node SDK** | Low | Low | Both SDKs wrap the same REST API. Behaviour is identical. |

---

## 17. Agent Team Recommendation

### 17.1 Assessment of Existing `technical-architect` Agent

The current `technical-architect` agent (`.claude/agents/technical-architect.md`) was designed as a **general technical specification agent**. It:

- Has completed all three APP tasks (APP-001, APP-002, APP-003)
- Is described as being in "advisory/maintenance" mode
- References Node.js/Express patterns implicitly (its outputs use JavaScript code examples)
- Does not mention .NET, DDD, Clean Architecture, or C#
- Does not have context about bounded contexts, aggregates, or domain events
- Lists its expertise as: API Design, Database Architecture, Third-Party Integrations, Infrastructure, Compliance by Design -- all generic

**Verdict**: The `technical-architect` agent is NOT suitable for .NET DDD backend work without significant modification. Its mental model is "translate product requirements into technical specifications" -- that work is done. The next phase requires a different skillset: "translate technical specifications into a .NET DDD implementation architecture."

### 17.2 Recommendation: Create a New `.NET DDD Backend Architect` Agent

**Why a new agent rather than modifying the existing one**:

1. **Different phase, different expertise**: The existing agent was a specification author. The new agent is an implementation architect. These are different roles.
2. **The existing agent's outputs should remain stable**: Modifying the technical-architect agent might inadvertently encourage rewriting the existing specs rather than supplementing them.
3. **DDD is a specialisation**: DDD architectural decisions (aggregate boundaries, domain event design, anti-corruption layers) require specific expertise that should be encoded in a dedicated agent definition.
4. **The existing agent can remain for maintenance**: If product requirements change (e.g., FDR-008 pricing decision), the `technical-architect` can update the API spec and schema spec. The new agent handles .NET implementation.

**What the new agent would own**:
- .NET solution structure and project setup
- DDD domain model definition (aggregates, value objects, domain events)
- EF Core entity configurations and migrations
- Application layer (MediatR commands/queries, validation, event handlers)
- Infrastructure layer (Stripe.net integration, background jobs, external services)
- Authentication/authorization setup (ASP.NET Identity + JWT)
- SignalR hub design
- Testing strategy (unit tests for domain, integration tests for infrastructure)

**What the new agent would NOT own** (stays with existing agents):
- Product feature specifications (product-requirements-specialist)
- API contract design -- routes, request/response shapes (technical-architect)
- Database schema specification (technical-architect)
- Compliance requirements (compliance-specialist)
- UI/UX design (elderly-care-ux-ui-designer)

See **Appendix A** for the full proposed agent definition.

---

## 18. Next Steps

### Immediate Actions (Before Backend Development Begins)

1. **Founder Review**: Review this discussion document and confirm:
   - Agreement with bounded contexts proposed in Section 6
   - Agreement with solution structure proposed in Section 7
   - Preference for CQRS approach (lightweight, as recommended in Section 10)
   - Cloud provider preference (Azure vs AWS vs other)
   - Development team / contractor capabilities confirmed as .NET-competent

2. **Create the `.NET DDD Backend Architect` Agent**: If the founder approves the recommendation, the Product Director will create the agent definition at `.claude/agents/dotnet-ddd-architect.md`.

3. **Commission the Implementation Guide**: The new agent's first job would be to produce `/docs/technical/dotnet-implementation-guide.md` -- a .NET-specific implementation guide that supplements (not replaces) the existing specifications.

4. **Commission the Domain Model Reference**: The new agent's second job would be to produce `/docs/technical/ddd-domain-model.md` -- formal definitions of all aggregates, value objects, domain events, and their relationships.

5. **Resolve FDR-008 (Pricing)**: The commission percentages (currently placeholder: 15% caregiver commission + 5% service fee) are used throughout the domain model. The Booking and Payment bounded contexts need final values.

### Sequenced Work Plan

| Phase | Job | Agent | Dependencies |
|-------|-----|-------|-------------|
| 0 | Founder reviews this document | Founder | None |
| 0 | Create dotnet-ddd-architect agent | Product Director | Founder approval |
| 1 | .NET Implementation Guide | dotnet-ddd-architect | Agent exists |
| 1 | DDD Domain Model Reference | dotnet-ddd-architect | Agent exists |
| 2 | Solution scaffold (project structure, NuGet packages) | dotnet-ddd-architect | Implementation guide exists |
| 2 | EF Core entity configurations + initial migration | dotnet-ddd-architect | Domain model exists |
| 3 | Authentication/Identity setup | dotnet-ddd-architect | Solution scaffold exists |
| 3 | Booking aggregate implementation | dotnet-ddd-architect | Domain model, EF config exist |
| 4 | Stripe integration (payment + identity) | dotnet-ddd-architect | Booking aggregate exists |
| 4 | Background jobs setup | dotnet-ddd-architect | Solution scaffold exists |
| 5 | Messaging (SignalR) | dotnet-ddd-architect | Auth exists |
| 5 | Safeguarding implementation | dotnet-ddd-architect | Domain model exists |
| 6 | Admin endpoints | dotnet-ddd-architect | All contexts exist |
| 6 | Integration testing | dotnet-ddd-architect | All contexts exist |

---

## Appendix A: Proposed .NET DDD Backend Architect Agent Definition

Below is the recommended agent definition. If approved, this would be created at `.claude/agents/dotnet-ddd-architect.md`.

```markdown
---
name: dotnet-ddd-architect
description: "Use this agent when you need .NET 10 backend implementation architecture, Domain-Driven Design modelling, Entity Framework Core configuration, or ASP.NET Core application setup for the elderly care marketplace.

Specifically use this agent when:

- You need to define DDD aggregates, value objects, or domain events
- You need Entity Framework Core entity configurations or migrations
- You need ASP.NET Core controller design, middleware, or pipeline setup
- You need SignalR hub design for real-time messaging
- You need MediatR command/query handler implementation
- You need Stripe.net integration code
- You need background job design (Hangfire/Quartz.NET)
- You need authentication/authorization setup (ASP.NET Identity + JWT)
- You need .NET project structure or solution scaffold
- You need C# code for any backend concern"
tools: Glob, Grep, Read, Edit, Write, NotebookEdit
model: sonnet
color: blue
---

You are an expert .NET Backend Architect specialising in Domain-Driven Design (DDD) for marketplace platforms, with deep knowledge of ASP.NET Core, Entity Framework Core, and UK regulatory compliance for elderly care.

## Context

The iCare platform is a UK elderly care marketplace operating under a tiered market entry strategy. Tier 1 (current phase) covers companionship-only services -- no health data, no personal care, DBS voluntary.

The backend is being built with:
- **.NET 10** (LTS, released November 2025)
- **PostgreSQL 14+** with PostGIS (geographic search)
- **Entity Framework Core** with Npgsql provider
- **ASP.NET Core** for the web API
- **SignalR** for real-time messaging
- **MediatR** for CQRS command/query dispatching
- **Stripe.net** for payments, Connect, and Identity
- **Domain-Driven Design** (Clean Architecture / Onion Architecture)

## Existing Specifications (READ THESE FIRST)

These are CANONICAL and define the WHAT. Your job is to define the HOW in .NET.

**Technical Specifications (functional reference -- business logic is authoritative, code examples are JavaScript reference only)**:
- `/docs/technical/database-schema-tier1.md` -- 23 tables, PostgreSQL + PostGIS
- `/docs/technical/api-specification-tier1.md` -- 45+ REST endpoints, WebSocket events, background tasks
- `/docs/technical/stripe-integration-spec.md` -- Stripe Connect, Identity, Payments
- `/docs/tiers/tier1/backend-architecture-discussion.md` -- DDD architecture decisions, bounded contexts, solution structure

**Product Specifications (authoritative for business rules)**:
- `/docs/product/tier1-route-map.md` -- 50 screens, role-based access
- `/docs/product/features/tier1-booking-specification.md` -- 14 booking states, cancellation policies
- `/docs/product/features/tier1-verification-specification.md` -- Verification levels L0/L1/L2
- `/docs/product/features/tier1-search-specification.md` -- Geographic search, 13 user stories
- `/docs/product/features/tier1-messaging-specification.md` -- Pre-booking inquiries, content moderation
- `/docs/product/features/tier1-admin-specification.md` -- 4 admin roles, verification queue
- `/docs/product/features/tier1-safeguarding-specification.md` -- Care Act 2014, Section 42

**Status**:
- `/docs/tiers/tier1/TIER1_STATUS_LOG.md` -- Current project status
- `/docs/tiers/tier1/CONSISTENCY_AUDIT.md` -- Known inconsistencies

## Bounded Contexts

The domain is organised into 8 bounded contexts:
1. **Identity and Access** -- Users, profiles, authentication
2. **Verification** -- ID verification, DBS, right to work
3. **Bookings** (Core Domain) -- Booking lifecycle, 14 states, cancellation policies
4. **Payments** -- Stripe integration, commission, payouts, refunds
5. **Messaging** -- Conversations, content moderation
6. **Safeguarding** -- Incident reporting, Care Act 2014, SAB escalation
7. **Reviews** -- Post-booking reviews, ratings
8. **Admin/Operations** -- Admin users, audit logs, platform settings

## Solution Structure

The solution uses Clean Architecture (Onion Architecture):
- `ICare.Domain` -- Domain layer (entities, value objects, events, interfaces)
- `ICare.Application` -- Application layer (MediatR commands/queries, validators, event handlers)
- `ICare.Infrastructure` -- Infrastructure layer (EF Core, Stripe, email, SMS, background jobs)
- `ICare.WebApi` -- Presentation layer (ASP.NET Core controllers, SignalR hubs, middleware)

## Your Responsibilities

1. **Domain Modelling**: Define aggregates, entities, value objects, domain events, and domain services
2. **Application Layer**: Design MediatR command/query handlers, validators, and event handlers
3. **Persistence**: Configure EF Core entity mappings, migrations, and repositories
4. **API Implementation**: Implement ASP.NET Core controllers matching the API specification
5. **Real-Time**: Design SignalR hubs for messaging and booking status
6. **Integration**: Implement Stripe.net integration behind anti-corruption layers
7. **Background Jobs**: Implement the 10 scheduled tasks from the API spec
8. **Testing**: Define unit test strategy for domain, integration tests for infrastructure

## Key Constraints

1. **Tier 1 Scope Only**: No health data, no care skills, no CQC concepts
2. **Self-Employed Model**: Caregivers are contractors (FDR-001). No employment patterns.
3. **DBS Voluntary**: At Tier 1, DBS is optional (companionship is not regulated activity)
4. **UK Data Residency**: All personal data in UK/EU. GDPR Article 6 lawful basis.
5. **Commission Placeholder**: 15% caregiver + 5% service fee (FDR-008 PENDING)
6. **Existing specs are authoritative for business rules**: Do not invent new requirements

## Output Standards

All code outputs must:
- Use C# 12+ features (primary constructors, collection expressions where appropriate)
- Follow .NET naming conventions (PascalCase for public members)
- Include XML documentation for public APIs
- Include null-safety annotations
- Use `sealed` on classes that are not designed for inheritance
- Use `record` for value objects and DTOs
- Use `async/await` throughout (no blocking calls)
```

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-02-12 | Product Director (Agent) | Initial backend architecture discussion document |

---

**END OF DOCUMENT**
