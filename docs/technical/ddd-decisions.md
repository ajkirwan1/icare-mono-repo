# DDD Design Decisions Register

**Owner:** dotnet-ddd-architect
**Status:** CANONICAL - All agents MUST read this before making domain model decisions
**Last Updated:** 2026-02-14

---

## How This File Works

This file records **locked design decisions** for the DDD domain model. Once a decision has status `DECIDED`, no agent may contradict it. If new evidence suggests a decision should change, the decision must be formally revisited by updating its status to `UNDER REVIEW` with a rationale.

Agents MUST:
1. Read this file before producing any domain model output
2. Conform to all `DECIDED` entries
3. Propose new decisions as `PROPOSED` and flag for founder approval
4. Never silently contradict a decided entry

---

## Decisions

### DEC-001: Identity & Access Aggregate Boundaries

**Status:** DECIDED
**Date:** 2026-02-14
**Decided By:** Founder

**Decision:** The Identity & Access bounded context has **3 separate aggregate roots**:
1. `User` — authentication credentials, account status, roles
2. `CareReceiverProfile` — care receiver details, emergency contacts, preferences
3. `CaregiverProfile` — professional details, services offered, rate, availability

**Rationale:**
- Independent change frequency (caregiver updates availability 10x more than password resets)
- Different invariants (User enforces auth rules; CaregiverProfile enforces rate bounds, minimum hours)
- Better concurrency (admin suspending a User doesn't conflict with caregiver updating availability)
- Smaller transactions (no need to load auth credentials to change an hourly rate)

**Alternatives Rejected:**
- Single `User` aggregate with CareReceiverProfile and CaregiverProfile as embedded entities — rejected because it creates a God Aggregate that loads unnecessary data and increases contention

**Cross-aggregate rules:**
- CareReceiverProfile and CaregiverProfile reference User by `UserId` (ID only, no navigation property)
- Creating a profile requires a valid User to exist (enforced at application layer, not aggregate level)
- Suspending a User raises `UserSuspendedEvent`; profile contexts react via domain events

---

### DEC-002: Bounded Context Count and Classification

**Status:** DECIDED
**Date:** 2026-02-14
**Decided By:** Founder

**Decision:** 8 bounded contexts:

| # | Context | Classification | Rationale |
|---|---------|---------------|-----------|
| 1 | Identity & Access | Supporting | Standard auth patterns (ASP.NET Identity handles most) |
| 2 | Verification | Core | Complex state machines, compliance requirements, multi-step verification |
| 3 | Booking | Core | 14-state machine, cancellation policies, financial calculations — primary business logic |
| 4 | Payments | Core | Stripe integration, commission splits, refunds, payouts — financial correctness critical |
| 5 | Messaging | Supporting | Standard chat with content moderation — well-solved problem |
| 6 | Safeguarding | Compliance-Critical | Care Act 2014 Section 42, legally mandated, special category data |
| 7 | Reviews | Supporting | Simple CRUD with rating constraints |
| 8 | Admin/Operations | Supporting | Moderation tools, audit logs, platform settings |

**DDD Investment Level:**
- Core + Compliance-Critical: Full tactical DDD (aggregates, events, rich behaviour, exhaustive tests)
- Supporting: Lighter DDD (entities, value objects, simpler structure)

---

### DEC-003: Solution Structure

**Status:** DECIDED
**Date:** 2026-02-14
**Decided By:** Founder

**Decision:** Clean Architecture (Onion Architecture) with 4 projects:
- `ICare.Domain` — Domain layer (entities, value objects, events, interfaces). **Zero external dependencies.**
- `ICare.Application` — Application layer (MediatR commands/queries, validators, event handlers)
- `ICare.Infrastructure` — Infrastructure layer (EF Core, Stripe, email, SMS, background jobs)
- `ICare.WebApi` — Presentation layer (ASP.NET Core controllers, SignalR hubs, middleware)

**Dependency Rule:** Domain ← Application ← Infrastructure ← WebApi. Domain depends on nothing.

**Namespace Convention:** Each bounded context gets a namespace folder within each project:
```
ICare.Domain/Identity/
ICare.Domain/Bookings/
ICare.Domain/Payments/
...
```

---

### DEC-004: CQRS Approach

**Status:** DECIDED
**Date:** 2026-02-14
**Decided By:** Founder

**Decision:** Lightweight CQRS:
- Same database for reads and writes
- Writes go through EF Core + aggregates (rich domain model)
- Reads use Dapper or EF Core projections (no aggregate loading)
- MediatR separates commands and queries in code

**Rationale:** Full CQRS (separate read/write databases, event sourcing) is operationally complex and unjustified for Tier 1 traffic volumes.

---

### DEC-005: Domain Event Dispatch Strategy

**Status:** DECIDED
**Date:** 2026-02-14
**Decided By:** Founder

**Decision:** In-process domain events via MediatR:
- Aggregates collect domain events during operations
- `SaveChangesAsync` override in `AppDbContext` dispatches events after successful persistence
- All event handlers run in the same process
- No external message broker at Tier 1

**Future:** If contexts are split into separate services (Tier 2+), replace MediatR with RabbitMQ/Azure Service Bus at context boundaries.

---

### DEC-006: Technology Stack

**Status:** DECIDED
**Date:** 2026-02-14
**Decided By:** Founder

**Decision:**
| Concern | Technology |
|---------|-----------|
| Runtime | .NET 10 (LTS, released November 2025) |
| Database | PostgreSQL 14+ with PostGIS |
| ORM | Entity Framework Core with Npgsql |
| API | ASP.NET Core (REST) |
| Real-time | SignalR |
| CQRS dispatch | MediatR |
| Validation | FluentValidation |
| Payments | Stripe.net (Connect, Identity, Payments) |
| Auth | ASP.NET Identity + JWT |
| Background jobs | Hangfire or Quartz.NET (TBD) |
| Testing | xUnit + FluentAssertions + NSubstitute |

---

### DEC-007: Strongly-Typed IDs

**Status:** DECIDED
**Date:** 2026-02-14
**Decided By:** Founder

**Decision:** All aggregate root IDs use `readonly record struct` wrappers:
```csharp
public readonly record struct UserId(Guid Value);
public readonly record struct BookingId(Guid Value);
public readonly record struct CaregiverId(Guid Value);
```

**Rationale:** Compile-time prevention of passing wrong ID types (e.g., `UserId` where `BookingId` is expected). EF Core value converters handle database mapping.

---

### DEC-008: Commission Rate Handling

**Status:** DECIDED
**Date:** 2026-02-14
**Decided By:** Founder

**Decision:** Commission rate is NOT hardcoded in domain entities. It is stored in a `PlatformSettings` aggregate in the Admin context and injected into the Booking/Payment contexts via a domain service (`IPricingCalculator`).

**Rationale:** FDR-008 (final commission rate) is still pending. The domain model must be configurable. Current placeholder: 15% caregiver commission + 5% service fee.

---

### DEC-009: Backend Project Location

**Status:** DECIDED
**Date:** 2026-02-14
**Decided By:** Founder

**Decision:** The .NET solution lives at `backend/` in the repo root, separate from the `packages/` JavaScript workspace:
```
icare-mono-repo/
├── packages/     ← JS/TS (unchanged)
├── backend/      ← .NET 10 solution
│   ├── ICare.sln
│   ├── src/
│   └── tests/
├── docker/
└── docs/
```

**Rationale:** .NET is not a Node workspace package. Keeping it in `packages/` would confuse npm/Lerna.

---

## Template for New Decisions

```markdown
### DEC-NNN: [Title]

**Status:** PROPOSED | DECIDED | UNDER REVIEW | SUPERSEDED
**Date:** YYYY-MM-DD
**Decided By:** [Founder | Agent Name]

**Decision:** [Clear statement of what was decided]

**Rationale:** [Why this decision was made]

**Alternatives Rejected:** [What else was considered and why it was rejected]
```
