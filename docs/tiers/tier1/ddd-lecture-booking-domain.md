# Domain-Driven Design: A Theoretical Lecture

## The Booking Domain as a Lens Into DDD Thinking

> **Format**: University lecture style. Theory first, illustrated with one domain throughout.
>
> **Domain under study**: The iCare Booking bounded context — a 14-state lifecycle managing companionship sessions between care receivers and caregivers in a UK elderly care marketplace.
>
> **Companion documents**: [ddd-reference-guide.md](ddd-reference-guide.md) (patterns catalogue), [ddd-tutorial.md](ddd-tutorial.md) (hands-on exercises), [domain-analysis.md](domain-analysis.md) (full system domain model)

---

## Lecture 1: The Problem DDD Solves

### 1.1 Software Complexity Is Not Technical

Most software projects do not fail because of technology choices. They fail because the development team does not understand the problem they are solving. The database is fine. The framework is fine. The deployment pipeline is fine. But the software does the wrong thing, or does the right thing in the wrong way, because nobody properly understood the domain.

Consider the iCare booking system. At first glance, it seems simple: a care receiver picks a caregiver, picks a time, pays, and the session happens. A junior developer might model this as:

```
bookings table:
  id, care_receiver_id, caregiver_id, start_time, end_time, status, amount
```

With a service that does:

```
function createBooking(data) {
  insert into bookings (...) values (...);
  charge(data.paymentMethod, data.amount);
  sendEmail(data.caregiverId, "New booking!");
}
```

This will work for about two weeks. Then reality arrives:

- What happens when the caregiver doesn't respond within 24 hours?
- What if the care receiver cancels 3 hours before the session?
- What if the caregiver marks the session as complete but the care receiver disagrees?
- What if the payment authorisation succeeds but the capture fails 24 hours later?
- What if the caregiver cancels 3 times in 30 days?
- What is the refund amount if cancellation happens between 24 and 48 hours before the session?
- Who gets paid if there's a dispute that takes 7 days to resolve?

These are not technical questions. They are **domain questions**. The answers live in business rules, policies, and regulatory requirements — not in database schemas or API frameworks. DDD's thesis is that these domain questions should be the primary driver of your software design.

### 1.2 The Cost of Getting the Domain Wrong

In the iCare context, getting the booking domain wrong has concrete consequences:

| Mistake | Consequence |
|---------|-------------|
| Payment captured before caregiver accepts | Care receiver charged for a booking that never happens. Refund required. Customer trust destroyed. |
| No-show not detected within 30 minutes | Vulnerable elderly person left without arranged companionship. Safeguarding incident. Potential regulatory action. |
| Cancellation refund calculated incorrectly | Financial loss for care receiver or caregiver. FCA consumer protection issues. |
| Dispute resolution bypasses escrow hold | Caregiver paid before dispute is resolved. No leverage to enforce fair outcome. |
| State transition allows "completed" → "requested" | Booking lifecycle corrupted. Audit trail meaningless. Financial records inconsistent. |

Every one of these mistakes is a **domain modelling failure**, not a technical failure. The database was fast. The API returned 200. The code ran without exceptions. But the software did the wrong thing because the developer didn't understand the domain.

DDD exists to prevent this category of failure.

---

## Lecture 2: Ubiquitous Language — The Foundation

### 2.1 Language Shapes Thought

The Sapir-Whorf hypothesis in linguistics suggests that the language you speak influences how you think. DDD makes an analogous claim about software: **the language your team uses to discuss the domain directly shapes the software they build.**

If your team says "update the booking status" and your code has `booking.Status = "confirmed"`, the language and the code are aligned — but they're aligned around a CRUD mental model that misses all the domain richness.

If your team says "the caregiver accepts the booking" and your code has `booking.Accept(caregiverId)`, the language and the code are aligned around a **domain operation** with preconditions, postconditions, and business meaning.

### 2.2 Building the Booking Ubiquitous Language

Let's examine every term in the booking domain and define it precisely. These definitions are not documentation — they are **design decisions**.

**Booking**: A scheduled companionship session between a care receiver and a caregiver, governed by a lifecycle of states, financial obligations, and cancellation policies. A booking is NOT a calendar event. A booking is NOT a payment. A booking is NOT a message thread. It is a domain object with its own identity, rules, and lifecycle.

**Booking Request**: The initial act of a care receiver asking a specific caregiver for a session at a specific time. It is not yet a commitment — it is a proposal. The caregiver may accept, decline, or let it expire.

**Acceptance**: The caregiver's agreement to fulfil the booking. This is a binding commitment that triggers payment capture and calendar blocking. After acceptance, cancellation has financial consequences.

**The 24-Hour Window**: The period after a booking request during which the caregiver must respond. If this window expires without a response, the system auto-declines. This is not a soft deadline or a suggestion — it is a domain invariant. The system MUST enforce it.

**Escrow**: The pattern where payment is captured (charged to care receiver) but held by the platform until the service is confirmed as delivered. This protects both parties. The care receiver knows the caregiver is committed. The caregiver knows the funds exist.

**The 48-Hour Confirmation Window**: After the caregiver marks a session as complete, the care receiver has 48 hours to either confirm or dispute. If they do nothing, the system auto-confirms. This is not a UI feature — it is a domain rule that directly controls when money moves.

**Cancellation Policy**: A set of rules that determine the financial consequences of cancellation based on timing:

| Timing | Care Receiver Cancels | Caregiver Cancels |
|--------|----------------------|-------------------|
| 48+ hours before | 100% refund | 100% refund (no penalty) |
| 24-48 hours before | 50% refund | 100% refund + warning |
| < 24 hours before | 0% refund | 100% refund + warning flag |

This is not a configuration table. It is **core domain logic**. The rules encode business decisions about risk allocation, fairness, and incentive design.

**No-Show**: A fundamentally different concept from cancellation. A cancellation happens before the session. A no-show happens when the session was supposed to start but one party didn't appear. No-shows trigger safeguarding concerns (a vulnerable person was left without arranged care), financial consequences, and potential account suspension.

**Dispute**: A formal claim by the care receiver that the service was not delivered as agreed. A dispute is NOT a complaint. It has a structured lifecycle: initiation (with evidence), caregiver response (48 hours), admin investigation (7-day SLA), decision, and potential appeal (7 days, reviewed by senior admin).

### 2.3 Language Violations

A language violation is when code uses a term that doesn't match the ubiquitous language, or uses a generic technical term where a specific domain term exists.

| Code | Language Violation | Correct Term |
|------|-------------------|--------------|
| `booking.setStatus("confirmed")` | "Set status" is a CRUD operation, not a domain concept | `booking.Accept()` — acceptance is the domain concept |
| `processPayment(booking)` | "Process" is vague — process how? charge? refund? hold? | `authorisePayment(booking)` or `capturePayment(booking)` or `refundBooking(booking)` |
| `booking.isActive` | "Active" is ambiguous — does it mean requested? confirmed? in progress? | Use the specific status: `booking.Status == BookingStatus.Confirmed` |
| `handleCancellation(booking, user)` | "Handle" tells you nothing about the domain rules being applied | `booking.Cancel(cancelledBy, reason)` — the aggregate enforces the rules |
| `updateBookingStatus(id, "completed")` | Direct status manipulation bypasses all invariants | `booking.Complete()` — the aggregate validates the transition |
| `booking.refundAmount = calculateRefund(...)` | Refund is calculated externally and injected — the booking doesn't protect its own consistency | Refund calculation should be part of the `Cancel()` method — the aggregate knows the cancellation policy |

Every time you see generic words like "handle", "process", "update", "manage" in domain code, treat them as code smells. They indicate that the developer wrote plumbing code instead of domain code.

---

## Lecture 3: The Aggregate as a Consistency Boundary

### 3.1 What Problem Does the Aggregate Solve?

In any sufficiently complex domain, multiple objects need to change together to maintain consistency. In the booking domain:

- When a booking is cancelled, the status must change AND the cancellation details must be recorded AND the refund amount must be calculated AND a domain event must be raised — all atomically. You cannot have a booking in "cancelled" status without cancellation details. You cannot have cancellation details on a "confirmed" booking.

- When a booking moves to "in progress", the period must be checked (is it actually time for the session to start?) and the status must change — atomically.

The aggregate pattern solves this by drawing a boundary around objects that must be consistent with each other. Everything inside the boundary is guaranteed to be consistent after every operation. Everything outside the boundary is eventually consistent (via domain events).

### 3.2 The Booking Aggregate Boundary

```
┌─────────────────────────────────────────────────────────┐
│                  BOOKING AGGREGATE                       │
│                                                          │
│  ┌─────────────────────────────────────────────────┐     │
│  │ Booking (Aggregate Root)                         │     │
│  │                                                  │     │
│  │  BookingId ──────── identity                     │     │
│  │  Status ─────────── state machine (14 states)    │     │
│  │  CareReceiverId ─── reference to external agg    │     │
│  │  CaregiverId ────── reference to external agg    │     │
│  │  CreatedAt ──────── lifecycle timestamp           │     │
│  │                                                  │     │
│  │  ┌──────────────────────────┐                    │     │
│  │  │ BookingPeriod (VO)       │                    │     │
│  │  │  Start, End, Duration    │                    │     │
│  │  │  Invariants:             │                    │     │
│  │  │   - End > Start          │                    │     │
│  │  │   - Duration >= 1 hour   │                    │     │
│  │  │   - Duration <= 12 hours │                    │     │
│  │  └──────────────────────────┘                    │     │
│  │                                                  │     │
│  │  ┌──────────────────────────┐                    │     │
│  │  │ PricingSnapshot (VO)     │                    │     │
│  │  │  HourlyRate              │                    │     │
│  │  │  TotalAmount             │                    │     │
│  │  │  PlatformFee             │                    │     │
│  │  │  CaregiverPayout         │                    │     │
│  │  │  CommissionRate          │                    │     │
│  │  └──────────────────────────┘                    │     │
│  │                                                  │     │
│  │  ┌──────────────────────────┐                    │     │
│  │  │ CancellationDetails (VO) │  ← nullable       │     │
│  │  │  CancelledBy             │    (only exists    │     │
│  │  │  Reason                  │    if cancelled)   │     │
│  │  │  CancelledAt             │                    │     │
│  │  │  RefundAmount            │                    │     │
│  │  │  RefundPolicy            │                    │     │
│  │  └──────────────────────────┘                    │     │
│  │                                                  │     │
│  │  ┌──────────────────────────┐                    │     │
│  │  │ DisputeDetails (VO)      │  ← nullable       │     │
│  │  │  RaisedBy                │    (only exists    │     │
│  │  │  Reason                  │    if disputed)    │     │
│  │  │  CaregiverResponse       │                    │     │
│  │  │  AdminDecision           │                    │     │
│  │  │  RefundPercentage        │                    │     │
│  │  └──────────────────────────┘                    │     │
│  └─────────────────────────────────────────────────┘     │
│                                                          │
│  INVARIANTS (always true after every operation):         │
│  1. Status transitions follow the state machine          │
│  2. CancellationDetails exists IFF status is Cancelled   │
│  3. DisputeDetails exists IFF status is Disputed/Resolved│
│  4. Period.Start is always in the future at creation     │
│  5. PricingSnapshot is immutable after creation          │
│  6. RefundAmount <= TotalAmount                          │
│  7. Booking must be >= 24 hours in advance at creation   │
│                                                          │
│  DOMAIN EVENTS (raised by operations):                   │
│  - BookingRequestedEvent                                 │
│  - BookingAcceptedEvent                                  │
│  - BookingConfirmedEvent                                 │
│  - BookingStartedEvent                                   │
│  - BookingCompletedEvent                                 │
│  - BookingCancelledEvent                                 │
│  - BookingDisputedEvent                                  │
│  - BookingDisputeResolvedEvent                           │
│  - BookingNoShowEvent                                    │
│  - BookingExpiredEvent                                   │
└─────────────────────────────────────────────────────────┘
```

### 3.3 What Is OUTSIDE the Aggregate?

Equally important is what the Booking aggregate does NOT contain:

| Thing | Why it's outside |
|-------|-----------------|
| Care Receiver Profile | Different lifecycle, different bounded context (Identity). Referenced by `CareReceiverId` only. |
| Caregiver Profile | Same reasoning. Loading a full profile to check booking state is wasteful and creates coupling. |
| Payment Transaction | Payments have their own lifecycle (authorised, captured, refunded). The Booking knows its pricing snapshot, but the actual Stripe transaction is a separate aggregate in the Payment context. |
| Messages | The conversation between parties exists independently of any single booking. A care receiver might message a caregiver before making a booking. |
| Review | A review is written after the booking completes. It references the booking by ID but has its own lifecycle (submitted, published, responded-to). |
| Calendar | Availability is owned by CaregiverProfile. The booking doesn't "block" the calendar — it raises an event, and the Identity context reacts by updating availability. |

This is deliberate. Each exclusion is a design decision that keeps the aggregate small, focused, and independently modifiable.

### 3.4 The Invariant is the Aggregate's Reason for Existing

An invariant is a business rule that must be true at all times. The aggregate exists to enforce its invariants. If you cannot identify the invariants, you cannot justify the aggregate.

Let's examine the booking invariants deeply:

**Invariant 1: Status transitions follow the state machine.**

This is the most important invariant. The 14 states and their legal transitions encode the entire booking lifecycle. Consider what happens without this invariant:

```
// Without invariant enforcement:
booking.Status = "completed";  // Was it ever "in_progress"? Was it even "confirmed"?
booking.Status = "requested";  // Can you un-complete a booking? What happens to the payment?
```

The state machine prevents nonsensical transitions. You cannot complete a booking that was never confirmed. You cannot dispute a booking that hasn't happened yet. You cannot cancel a booking that's already in progress. Each of these constraints reflects a real business rule:

```
Requested → Accepted     (caregiver agrees to the session)
Requested → Expired      (24-hour window elapsed — automatic)
Requested → Cancelled    (either party backs out before acceptance)

Accepted → Confirmed     (payment captured successfully)
Accepted → Cancelled     (either party backs out after acceptance)

Confirmed → InProgress   (session start time reached)
Confirmed → Cancelled    (either party backs out before session)

InProgress → PendingCompletion  (caregiver marks session finished)
InProgress → NoShow             (one party didn't appear)

PendingCompletion → Completed   (care receiver confirms, or 48hr auto-confirm)
PendingCompletion → Disputed    (care receiver raises issue)

Completed → Disputed     (dispute raised within 48 hours of completion)

Disputed → DisputeResolved  (admin makes decision)

Cancelled → RefundIssued    (refund processed)
```

This is not just a technical constraint. It is the **formal specification of the booking lifecycle**. A domain expert can read this and validate it: "Yes, that's how our bookings work." A developer can read this and implement it. A tester can read this and write tests. The state machine IS the ubiquitous language, formalised.

**Invariant 2: CancellationDetails exists if and only if the booking is cancelled.**

This seems simple, but it prevents a subtle class of bugs. Without this invariant, you could have:
- A "confirmed" booking with cancellation details (confusing — is it cancelled or not?)
- A "cancelled" booking without cancellation details (missing — who cancelled? why? what's the refund?)

The invariant ensures that the data is always consistent with the state. In code, this means the `Cancel()` method is the ONLY way to create CancellationDetails, and it always sets the status to Cancelled at the same time.

**Invariant 5: PricingSnapshot is immutable after creation.**

Why can't we just read the caregiver's current rate when we need the booking price? Because the caregiver might change their rate between booking creation and session completion. If we read the current rate, we'd charge the care receiver a different amount than what they agreed to.

The pricing snapshot captures the financial terms at the moment of booking creation. It's a historical record: "At the time this booking was made, the rate was £18/hr, the total was £36, the platform fee was £5.40, and the caregiver payout was £30.60." These numbers never change, regardless of what happens to the caregiver's rate afterward.

This is a common DDD pattern called **temporal decoupling** — capturing a point-in-time snapshot of data that would otherwise change.

---

## Lecture 4: State Machines as Domain Models

### 4.1 Why State Machines?

Many domains have objects that go through a defined sequence of states. Orders, applications, incidents, bookings — anything with a lifecycle.

The state machine pattern makes the lifecycle **explicit, enforceable, and testable**:
- **Explicit**: Every possible state is enumerated. Every legal transition is listed.
- **Enforceable**: Illegal transitions throw exceptions. The aggregate refuses to enter an invalid state.
- **Testable**: You can write a test for every transition and every illegal transition.

### 4.2 State Machine Design Principles

**Principle 1: States should be named after domain concepts, not technical states.**

Bad: `PENDING`, `ACTIVE`, `INACTIVE`, `DONE`, `ERROR`

Good: `Requested`, `Accepted`, `Confirmed`, `InProgress`, `PendingCompletion`, `Completed`, `CancelledByReceiver`, `CancelledByCaregiver`, `Disputed`, `DisputeResolved`, `Expired`, `NoShow`, `RefundIssued`

The good names tell you what happened in the domain. "Inactive" tells you nothing — inactive how? cancelled? expired? completed? banned? The domain-specific name eliminates ambiguity.

**Principle 2: Each transition should correspond to a domain operation.**

Not `booking.SetStatus(BookingStatus.Accepted)` but `booking.Accept()`. The operation name IS the ubiquitous language. The method enforces the preconditions and raises the events.

**Principle 3: Side effects are triggered by transitions, not by states.**

When a booking transitions from Requested to Accepted, the system must:
- Capture the payment
- Block the caregiver's calendar
- Send notifications to both parties
- Share contact details

These side effects are triggered by the *transition*, not by the state. Simply being in the "Accepted" state doesn't mean notifications need to be sent — only entering the Accepted state from Requested does. This distinction matters for idempotency and error recovery.

**Principle 4: Terminal states should be truly terminal.**

`Completed`, `DisputeResolved`, `RefundIssued`, `Expired` — these are terminal states. No further transitions are possible. The booking's lifecycle is over. This simplifies reasoning: once a booking reaches a terminal state, no more domain events will fire, no more payments will move, and no more notifications will send.

### 4.3 The Hidden States Problem

Often, a domain appears to have fewer states than it actually does. The booking spec lists 14 states, but during design you might initially think there are only 5 (requested, confirmed, in-progress, completed, cancelled).

The hidden states emerge when you ask:
- "What happens if the caregiver doesn't respond?" → `Expired` (a state distinct from cancelled — no one chose to cancel; the window simply elapsed)
- "Who cancelled — the caregiver or the care receiver?" → Two distinct states (`CancelledByReceiver`, `CancelledByCaregiver`) because the financial and penalty consequences differ
- "What if there's a dispute?" → `Disputed` and `DisputeResolved` (a dispute is not a cancellation — the service happened but is contested)
- "What if someone doesn't show up?" → `NoShow` (fundamentally different from cancellation — triggers safeguarding concerns)
- "What about the 48-hour confirmation window?" → `PendingCompletion` (the session is over but not yet financially settled)

Each hidden state exists because the business treats it differently — different rules, different consequences, different user experience. Collapsing them into a single "cancelled" or "done" state would lose critical domain information.

### 4.4 State Machines and Eventual Consistency

The booking state machine raises domain events at each transition. These events trigger reactions in other bounded contexts. But these reactions are **eventually consistent**, not immediately consistent.

Consider the "Accept" transition:

```
1. Caregiver calls booking.Accept()
2. Booking status changes to Accepted
3. BookingAcceptedEvent is raised
4. Database transaction commits (booking saved)
5. Event dispatched to handlers:
   a. PaymentCaptureHandler → captures payment via Stripe
   b. CalendarBlockHandler → updates caregiver availability
   c. NotificationHandler → sends emails/push notifications
   d. ContactSharingHandler → shares details between parties
```

Steps 1-4 happen in one transaction (strong consistency). Steps 5a-5d happen in separate handlers (eventual consistency). This means there's a brief moment where the booking is "Accepted" but the payment hasn't been captured yet.

Is this a problem? Only if you conflate "accepted" with "paid". In the domain model, acceptance and payment are separate concepts:
- `Accepted` means the caregiver has committed
- `PaymentAuthorized` → `Confirmed` means the payment has been secured

The state machine makes this distinction explicit. If the payment capture fails after acceptance, the booking doesn't silently stay in "Accepted" forever — the payment handler transitions it to a failure state or retries. The state machine gives you the vocabulary to express these edge cases.

---

## Lecture 5: Value Objects — Modelling Domain Concepts Without Identity

### 5.1 The Overlooked Pattern

Value objects are the most underused DDD pattern. Most codebases are overwhelmingly composed of entities and services, with primitive types (`string`, `decimal`, `int`) carrying domain meaning. This is called **primitive obsession**, and it is the source of many bugs.

In the booking domain, consider the hourly rate. Without a value object:

```csharp
public decimal HourlyRate { get; set; }
```

This allows:
- `booking.HourlyRate = -50;` (negative rate)
- `booking.HourlyRate = 999999;` (absurd rate)
- `booking.HourlyRate = 10.12345m;` (too many decimal places)
- `var total = booking.HourlyRate * hours;` (multiplication doesn't know about currency)
- Accidentally mixing GBP and USD rates in a calculation

With a value object:

```csharp
public HourlyRate Rate { get; private set; }
```

Now:
- Invalid rates are unrepresentable (the constructor rejects them)
- Currency is always explicit
- Arithmetic operations are type-safe
- The domain concept has a name — `HourlyRate`, not "decimal field on the booking"

### 5.2 The PricingSnapshot — A Case Study in Temporal Value Objects

The `PricingSnapshot` is one of the most important value objects in the booking domain. Let's examine why it exists.

**The problem it solves**: A booking is created on Monday. The session happens on Friday. The caregiver changes their rate on Wednesday. What rate applies?

In a naive system, you'd look up the caregiver's current rate when calculating the payment. This means the care receiver agreed to one price but was charged another. In financial systems, this is unacceptable.

The PricingSnapshot captures the financial terms at booking creation time:

```
PricingSnapshot (captured at booking creation):
  HourlyRate:      £18.00/hr (caregiver's rate at time of booking)
  TotalAmount:     £36.00    (£18.00 x 2 hours)
  PlatformFee:     £5.40     (15% commission)
  CaregiverPayout: £30.60    (£36.00 - £5.40)
  CommissionRate:  0.15       (15% at time of booking)
```

This snapshot is immutable. Even if:
- The caregiver raises their rate to £25/hr on Wednesday → doesn't affect this booking
- The platform changes the commission rate to 20% on Thursday → doesn't affect this booking
- The care receiver's payment method expires on Friday → the snapshot still records what was agreed

The PricingSnapshot is a **point-in-time record of a financial agreement**. It is evidence. In the event of a dispute, it proves exactly what was agreed and when.

### 5.3 The CancellationDetails — Conditional Value Objects

Not all value objects exist at all times. `CancellationDetails` only exists when a booking has been cancelled. Before cancellation, it is null.

This creates an interesting invariant: **CancellationDetails exists if and only if the booking status is one of the cancelled states.**

In code, this invariant is enforced by making `CancellationDetails` assignable only through the `Cancel()` method:

```csharp
public void Cancel(UserId cancelledBy, string reason)
{
    // ... validate transition, calculate refund ...

    CancellationDetails = new CancellationDetails(
        cancelledBy, reason, DateTime.UtcNow, refundAmount, policy);

    Status = /* appropriate cancelled status */;
}
```

There is no setter for `CancellationDetails`. There is no way to create a booking with cancellation details already attached. The only path to having cancellation details is through the `Cancel()` domain operation. This is the aggregate protecting its invariants.

### 5.4 When To Use a Value Object vs an Entity

The decision rule is simple: **does this thing have an identity that matters?**

| Thing | Identity? | Why? | Model as |
|-------|-----------|------|----------|
| A booking | Yes | Booking #B-1234 is a specific booking, tracked over time | Entity |
| The booking's time period | No | "Friday 2pm-4pm" is just attributes — there's no meaningful difference between two "Friday 2pm-4pm" periods | Value Object |
| The booking's pricing | No | "£36 total at £18/hr" is just numbers — no identity needed | Value Object |
| The cancellation details | No | "Cancelled by Alice on Tuesday, £18 refund" is just facts about the cancellation | Value Object |
| A dispute | It depends | If disputes have their own lifecycle (opened, investigated, resolved, appealed), they might be entities within the aggregate. If they're just a description, they're a value object. | Value Object (in our model — dispute lifecycle is tracked via booking status) |

---

## Lecture 6: Why Aggregates Reference by Identity, Not by Object

### 6.1 The Rule

DDD prescribes that aggregates reference other aggregates by identity (ID) only, never by direct object reference.

The Booking aggregate has:
```csharp
public CareReceiverProfileId CareReceiverId { get; private set; }
public CaregiverProfileId CaregiverId { get; private set; }
```

Not:
```csharp
public CareReceiverProfile CareReceiver { get; set; }  // NO
public CaregiverProfile Caregiver { get; set; }         // NO
```

### 6.2 Why This Rule Exists

**Reason 1: Loading boundaries.**

If `Booking` holds a direct reference to `CaregiverProfile`, then loading a booking from the database also loads the full caregiver profile (including their availability slots, services offered, bio, photo URL, etc.). You asked for a booking; you got a booking plus a caregiver plus their entire availability schedule.

With ID-only references, loading a booking loads only the booking. If you need caregiver information, you explicitly load it through a separate repository. This keeps aggregate loading fast and predictable.

**Reason 2: Transactional boundaries.**

If `Booking` holds a reference to `CaregiverProfile`, what happens when you save the booking? Does it also save changes to the caregiver profile? If someone modified the caregiver's rate through the booking reference, does that rate change persist?

With ID-only references, saving a booking saves only the booking. The caregiver profile is a separate aggregate with its own repository and its own transaction. There is no ambiguity about what gets saved.

**Reason 3: Bounded context isolation.**

The `Booking` aggregate lives in the Booking bounded context. The `CaregiverProfile` lives in the Identity & Access bounded context. If the Booking holds a direct reference to CaregiverProfile, the two contexts are coupled at the code level — they share types, they share loading, they share transactions.

With ID-only references, the contexts are truly independent. The Booking context knows that caregivers exist (it has a `CaregiverProfileId`), but it knows nothing about how caregiver profiles are structured, validated, or stored.

**Reason 4: Evolution independence.**

If the Identity team decides to rename `CaregiverProfile` to `CompanionProvider`, or to split it into two aggregates, or to add 20 new fields — none of this affects the Booking context. The Booking context knows the ID. That's all it needs.

### 6.3 What If the Booking Needs Caregiver Data?

"But the booking needs to display the caregiver's name and rate!" True. But this is a **read concern**, not a write concern.

For writes (domain operations), the Booking aggregate only needs IDs. The `Accept()` method doesn't need to know the caregiver's name — it needs to know the caregiver's ID to validate that the correct caregiver is accepting.

For reads (display), you use a **read model** or **query** that joins data from multiple aggregates:

```sql
SELECT b.id, b.status, b.start_time, b.end_time,
       c.first_name as caregiver_name, c.photo_url,
       cr.first_name as care_receiver_name
FROM bookings b
JOIN caregiver_profiles c ON c.id = b.caregiver_id
JOIN care_receiver_profiles cr ON cr.id = b.care_receiver_id
WHERE b.id = @bookingId
```

This query is in the Application layer (or a CQRS read model), not in the Domain layer. The domain model stays clean; the read model is optimised for display.

---

## Lecture 7: Domain Events as the Connective Tissue

### 7.1 Events Replace Coupling

Without domain events, the booking system would look like this:

```csharp
public void AcceptBooking(BookingId id)
{
    var booking = _bookingRepo.GetById(id);
    booking.Accept();
    _bookingRepo.Save(booking);

    _paymentService.CapturePayment(booking);      // coupling to Payment context
    _calendarService.BlockSlot(booking);           // coupling to Identity context
    _messagingService.CreateConversation(booking); // coupling to Messaging context
    _notificationService.Notify(booking);          // coupling to Notification
    _auditService.Log(booking);                    // coupling to Admin context
}
```

The `AcceptBooking` method knows about payments, calendars, messaging, notifications, and auditing. It is coupled to five other contexts. If any of them changes, this method changes. If any of them fails, the whole operation fails.

With domain events:

```csharp
public void AcceptBooking(BookingId id)
{
    var booking = _bookingRepo.GetById(id);
    booking.Accept();                               // raises BookingAcceptedEvent
    _bookingRepo.Save(booking);                     // event dispatched after save
}
```

The booking context knows about... bookings. Nothing else. The side effects happen in independent event handlers that can fail, retry, and evolve independently.

### 7.2 The Event Flow for a Complete Booking Lifecycle

Let's trace every event through a booking's life:

```
Time 0: Care receiver requests a booking
  → BookingRequestedEvent
    → PaymentContext: Authorise payment (hold funds)
    → NotificationContext: Email caregiver
    → MessagingContext: Create conversation

Time +2h: Caregiver accepts
  → BookingAcceptedEvent
    → PaymentContext: Capture payment (charge card, move to escrow)
    → IdentityContext: Block caregiver's calendar slot
    → NotificationContext: Email both parties
    → IdentityContext: Share contact details

Time +3d: Session start time arrives
  → BookingStartedEvent (triggered by background job)
    → NotificationContext: Send "session starting" push notification

Time +3d +2h: Caregiver marks session complete
  → BookingPendingCompletionEvent
    → NotificationContext: Email care receiver "please confirm within 48 hours"
    → BackgroundJobs: Schedule 48-hour auto-confirm job

Time +3d +2h +48h: Care receiver confirms (or auto-confirm fires)
  → BookingCompletedEvent
    → PaymentContext: Release payment from escrow to caregiver
    → ReviewContext: Prompt care receiver to leave review
    → IdentityContext: Update caregiver's booking count

Time +3d +2h +72h: Care receiver leaves review
  → ReviewSubmittedEvent (from Review context, not Booking)
    → IdentityContext: Update caregiver's average rating
    → SearchContext: Update rating in search index
```

Notice that the Booking context raises events but never consumes its own events. Events flow outward. Other contexts react. This is the **Published Language** pattern — the Booking context publishes a well-defined set of events, and other contexts subscribe without coupling to Booking internals.

### 7.3 Events as Historical Facts

A critical property of domain events: **they represent things that have already happened.** They are facts about the past. This has implications:

1. **Events cannot be rejected.** If `BookingAcceptedEvent` is published, the booking HAS BEEN accepted. A handler cannot "reject" the acceptance. It can only react to it (perhaps by raising its own event if something goes wrong).

2. **Events are immutable.** Once published, the event data never changes. This is why events use `record` types in C#.

3. **Events form an audit trail.** The sequence of events for a booking IS the booking's history. You can reconstruct the booking's entire lifecycle by replaying its events in order.

4. **Events enable temporal queries.** "What was the state of this booking at 3pm on Tuesday?" — replay events up to that timestamp and you have the answer.

---

## Lecture 8: The Relationship Between Domain and Database

### 8.1 Two Schools of Thought

**Data-first (traditional)**: Design the database schema. Generate or write code to match it. The database is the source of truth.

**Domain-first (DDD)**: Design the domain model. Configure the ORM to map it to a database. The domain model is the source of truth.

In the iCare project, the database schema was designed first (23 tables in PostgreSQL). This means we need to reconcile the existing schema with the DDD domain model. This is common in real projects and is not a problem — it just requires awareness.

### 8.2 Where the Booking Schema Aligns with DDD

The existing `bookings` table:

```sql
CREATE TABLE bookings (
    id UUID PRIMARY KEY,
    care_receiver_id UUID REFERENCES care_receivers(id),
    caregiver_id UUID REFERENCES caregivers(id),
    status VARCHAR(50) NOT NULL,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    hourly_rate DECIMAL(10,2) NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    platform_fee DECIMAL(10,2),
    caregiver_payout DECIMAL(10,2),
    commission_rate DECIMAL(5,4),
    cancellation_reason TEXT,
    cancelled_at TIMESTAMP,
    cancelled_by UUID,
    refund_amount DECIMAL(10,2),
    refund_policy VARCHAR(20),
    special_requests TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    ...
);
```

This is a single wide table. In the domain model, we have:
- A `Booking` entity with scalar properties
- A `BookingPeriod` value object (`start_time`, `end_time`)
- A `PricingSnapshot` value object (`hourly_rate`, `total_amount`, `platform_fee`, `caregiver_payout`, `commission_rate`)
- A `CancellationDetails` value object (`cancellation_reason`, `cancelled_at`, `cancelled_by`, `refund_amount`, `refund_policy`)

The domain model has richer structure (grouped into value objects), but it maps to the same columns. EF Core's `OwnsOne` feature handles this mapping: each value object maps to columns within the `bookings` table, but in C# they are distinct types with their own validation and behaviour.

**This is the key insight**: the domain model and the database model do not have to be structurally identical. The domain model is organised for correctness and expressiveness. The database model is organised for storage and query performance. The ORM bridges the gap.

### 8.3 Where the Schema Conflicts with DDD

The `bookings` table has 30+ columns including pricing, cancellation, dispute, and session data — all in one table. In the domain model, these are conceptually separate value objects.

The conflict isn't structural (EF Core handles the mapping). The conflict is **conceptual**: a developer looking at the table might think "booking" means "everything in this table", while in DDD, "booking" means "the aggregate root with its value objects". The wide table invites primitive obsession; the domain model enforces structure.

The resolution: keep the table as-is for now (no migration needed), but ensure all access goes through the aggregate and repository. No raw SQL that sets `cancellation_reason` without going through `booking.Cancel()`.

---

## Lecture 9: Testing Domain Logic

### 9.1 Why Domain Tests Are the Most Valuable Tests

In a typical web application, you might write:
- **Unit tests**: Test individual functions in isolation
- **Integration tests**: Test database queries, API endpoints, external services
- **End-to-end tests**: Test the full system through the UI

DDD inverts the testing pyramid for domain-rich applications. The most valuable tests are **domain tests** — tests of aggregate behaviour, value object validation, and state machine transitions. These tests:

- Run in milliseconds (no database, no HTTP, no external services)
- Test the most important code (business rules, not plumbing)
- Are the most stable (domain rules change less often than UI or API structure)
- Provide the best documentation (each test describes a domain scenario)

### 9.2 Testing Strategy for the Booking Aggregate

**Category 1: Valid state transitions**

Test every legal transition. There are ~20 legal transitions in the booking state machine. Each gets a test:

```
Requested → Accepted (caregiver accepts within 24 hours)
Requested → Expired (24-hour window elapses)
Requested → CancelledByReceiver (care receiver cancels before acceptance)
Confirmed → InProgress (session start time reached)
PendingCompletion → Completed (care receiver confirms)
PendingCompletion → Completed (48-hour auto-confirm)
...
```

**Category 2: Invalid state transitions**

Test every illegal transition. There are ~170 illegal transitions (14 states x 14 states - 20 legal = 176 illegal). You don't need 176 tests, but you should test representative illegal transitions:

```
Completed → Requested (cannot go backwards)
Expired → Accepted (expired bookings cannot be accepted)
InProgress → Accepted (cannot re-accept during session)
CancelledByReceiver → Completed (cancelled bookings cannot complete)
```

**Category 3: Invariant violations**

Test that the aggregate rejects invalid operations:

```
Accept when 25 hours have passed → throws (24-hour window expired)
Cancel without a reason → throws (reason required)
Create booking for 30 minutes ago → throws (must be 24+ hours in advance)
Create booking for 15 hours → throws (max 12 hours)
Cancel a completed booking → throws (invalid transition)
```

**Category 4: Domain event assertions**

Test that the correct events are raised:

```
Request a booking → BookingRequestedEvent raised with correct IDs and period
Accept a booking → BookingAcceptedEvent raised
Cancel with >48h notice → BookingCancelledEvent with refund = total amount
Cancel with 25h notice → BookingCancelledEvent with refund = 50% of total
Cancel with 12h notice → BookingCancelledEvent with refund = £0
```

**Category 5: Value object validation**

Test that value objects reject invalid data:

```
BookingPeriod with end before start → throws
BookingPeriod with 30-minute duration → throws (min 1 hour)
BookingPeriod with 13-hour duration → throws (max 12 hours)
Money with negative amount → throws
HourlyRate of £5 → throws (min £10)
HourlyRate of £150 → throws (max £100)
```

### 9.3 The Confidence Pyramid

```
        /\
       /  \        Few E2E tests (slow, brittle, expensive)
      /    \       Tests that the whole system works together
     /------\
    /        \     Some integration tests (moderate speed)
   /          \    Tests that persistence and APIs work
  /------------\
 /              \  Many domain tests (fast, stable, cheap)
/                \ Tests that business rules are correct
/------------------\
```

In a DDD application, the base of the pyramid (domain tests) is where most of your testing effort goes. These tests give you confidence that **the system does the right thing**, not just that it runs without crashing.

---

## Lecture 10: The Bounded Context as an Organisational Unit

### 10.1 Conway's Law and Bounded Contexts

Conway's Law states: "Any organisation that designs a system will produce a design whose structure is a copy of the organisation's communication structure."

DDD embraces Conway's Law rather than fighting it. Bounded contexts often align with team boundaries. The team that owns the Booking context understands booking business rules. The team that owns the Payment context understands Stripe integration. They communicate through published events, not shared code.

For iCare (a small team), you likely won't have separate teams per context. But the **code boundaries** still matter. When the team grows, the bounded context structure provides natural seams along which to divide work.

### 10.2 The Booking Context's Relationship with Other Contexts

The Booking context sits at the centre of the domain. It interacts with every other context:

```
                    ┌───────────┐
                    │  Identity  │
                    │ (profiles) │
                    └─────┬─────┘
                          │ CaregiverProfileId
                          │ CareReceiverProfileId
          ┌───────────┐   │   ┌───────────┐
          │ Messaging  │←──┼──→│ Payment   │
          │ (convos)   │   │   │ (Stripe)  │
          └─────┬──────┘   │   └─────┬─────┘
                │          │         │
                │    ┌─────┴─────┐   │
                └───→│  BOOKING  │←──┘
                     │ (14-state │
                     │ lifecycle)│
                ┌───→│           │←──┐
                │    └─────┬─────┘   │
                │          │         │
          ┌─────┴──────┐   │   ┌─────┴──────┐
          │   Review   │   │   │ Safeguarding│
          │ (ratings)  │   │   │ (incidents) │
          └────────────┘   │   └─────────────┘
                           │
                    ┌──────┴──────┐
                    │    Admin    │
                    │ (moderation)│
                    └─────────────┘
```

Each arrow represents an **event-driven relationship**, not a code dependency. The Booking context publishes events. Other contexts subscribe. The Booking context never imports code from Payment, Messaging, or Review.

### 10.3 What the Booking Context Does NOT Know

This is as important as what it knows:

- It does not know **how** payments are processed (Stripe, PayPal, bank transfer — irrelevant to the booking lifecycle)
- It does not know **how** messages are delivered (WebSocket, polling, email — irrelevant)
- It does not know **how** reviews are structured (star ratings, text, categories — irrelevant)
- It does not know **how** safeguarding incidents are investigated (SLAs, evidence, escalation — irrelevant)
- It does not know **how** caregiver profiles are verified (DBS, ID, right-to-work — irrelevant)

It knows THAT these things happen (via event responses), but not HOW. This is the essence of bounded context isolation.

---

## Summary: The Booking Domain as a DDD Exemplar

The Booking context demonstrates every major DDD concept:

| DDD Concept | Booking Domain Example |
|-------------|----------------------|
| Ubiquitous Language | "Accept", "Cancel", "Dispute", "No-Show", "Escrow", "The 48-Hour Window" |
| Aggregate Root | `Booking` — the entry point for all booking operations |
| Value Objects | `BookingPeriod`, `PricingSnapshot`, `CancellationDetails`, `DisputeDetails` |
| Strongly-Typed IDs | `BookingId`, `CareReceiverId`, `CaregiverProfileId` |
| Invariants | State machine transitions, 24-hour advance booking, cancellation policy |
| Domain Events | `BookingRequestedEvent`, `BookingAcceptedEvent`, `BookingCancelledEvent`, etc. |
| State Machine | 14 states, ~20 legal transitions, business rules at every transition |
| Temporal Decoupling | `PricingSnapshot` captures rate at booking time, not current rate |
| Reference by ID | `CareReceiverId` and `CaregiverId` are IDs, not object references |
| Eventual Consistency | Payment capture, calendar blocking, notifications happen via events |
| Anti-Corruption Layer | Stripe integration wrapped behind `IPaymentGateway` interface |
| Domain Service | `IBookingOverlapChecker`, `IPricingCalculator` — cross-aggregate logic |
| Repository | `IBookingRepository` — domain-specific, not generic CRUD |

The Booking context is the core domain — the part of the system that makes iCare a business, not just a website. It deserves the fullest DDD treatment: rich aggregates, exhaustive invariants, comprehensive tests, and careful language.

Every other context in the system (Identity, Payment, Messaging, Review, Verification, Safeguarding, Admin) can be understood through the same lens, at varying levels of complexity. The Booking context is simply where the domain is richest and where DDD pays the greatest dividends.
