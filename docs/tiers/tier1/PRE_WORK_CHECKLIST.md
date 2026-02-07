# ⚠️ MANDATORY PRE-WORK CHECKLIST ⚠️

**Purpose**: Product Director agent MUST check this before starting ANY new work.

**Checked By**: product-director agent (automated)

**Last Auto-Check**: *[Agent updates this on each run]*

---

## 🔴 STEP 0: User Calendar Reminder (Manual - One-Time)

**⏰ USER ACTION REQUIRED (if not already set):**

Set a recurring calendar reminder:
- **Title**: "Weekly Consistency Check - Tier 1"
- **Date**: Every Friday at 3:00 PM
- **Recurring**: Weekly
- **Checklist**: `/docs/tiers/tier1/WEEKLY_CHECKLIST.md`

---

## ⚡ 30-Second Automated Status Checks

**Product Director Agent: Run these 3 checks BEFORE proceeding with delegation:**

---

### ✅ Check 1: Pending Updates Tracker

**File to Check**: `/docs/tiers/tier1/TIER1_STATUS_LOG.md` Section 8

**Agent Action**:
1. Read Section 8 "Current Pending Updates" table
2. Check if any deliverable has `Status: PENDING` AND age >7 days
3. If YES → Display CRITICAL WARNING and HALT delegation plan
4. If NO → PASS, continue

**Warning Template (if check fails)**:
```
🚨 CRITICAL: STALE DELIVERABLE DETECTED 🚨

Deliverable: [name]
Pending for: [X] days
Triggered by: [CB-XXX]
Assigned to: [agent-name]

ACTION REQUIRED IMMEDIATELY:
1. Execute update via [agent-name]
2. Mark complete in Pending Updates Tracker
3. Re-run this pre-work checklist

HALTING NEW WORK DELEGATION.
```

---

### ✅ Check 2: Weekly Consistency Check Status

**File to Check**: `/docs/tiers/tier1/WEEKLY_CHECKLIST.md`

**Agent Action**:
1. Read "Last Completed" date from top of file
2. Calculate days since last check (today - last completed)
3. If >10 days → Display WARNING and recommend running checklist
4. If 7-10 days → Display NOTICE that checklist is due soon
5. If <7 days → PASS, continue

**Warning Template (if >10 days)**:
```
⚠️ WARNING: WEEKLY CONSISTENCY CHECK OVERDUE

Last Check: [date]
Days Overdue: [X] days (>10 day threshold)

RECOMMENDED ACTION:
Run weekly consistency checklist before proceeding.
File: /docs/tiers/tier1/WEEKLY_CHECKLIST.md

You may proceed with current work, but schedule checklist completion today.
```

---

### ✅ Check 3: CB Decision Sync Status

**File to Check**: `/docs/tiers/tier1/decision-impact-log.md`

**Agent Action**:
1. Scan all CB decision entries
2. Check "Affected Deliverables" tables for any with status 🔄 PENDING
3. If ANY pending → Display WARNING and list what needs syncing
4. If all ✅ COMPLETE → PASS, continue

**Warning Template (if check fails)**:
```
🚨 CRITICAL: CB DECISION NOT FULLY SYNCED 🚨

Decision: [CB-XXX]
Pending Deliverables:
- [deliverable 1] - Assigned to: [agent]
- [deliverable 2] - Assigned to: [agent]

ACTION REQUIRED:
Sync all pending deliverables before new work.
See: /docs/tiers/tier1/decision-impact-log.md

HALTING NEW WORK DELEGATION.
```

---

## 🎯 Agent Workflow Integration

**Product Director Agent Instructions**:

When invoked for a new task delegation:

1. **FIRST**: Read this file (`PRE_WORK_CHECKLIST.md`)
2. **Execute all 3 checks above**
3. **If ANY check fails with CRITICAL** → Display warning, halt delegation, request user to resolve
4. **If ANY check fails with WARNING** → Display notice, allow user to decide whether to proceed
5. **If all checks PASS** → Proceed with normal delegation workflow
6. **Update "Last Auto-Check" date** at top of this file

---

## 📊 Check Results Log

| Date | Check 1 | Check 2 | Check 3 | Overall | Notes |
|------|---------|---------|---------|---------|-------|
| 2026-02-07 | ✅ PASS | ✅ PASS | ✅ PASS | ✅ ALL PASS | Initial checklist - no pending items |

---

## 🔗 Related Files

- `/docs/tiers/tier1/TIER1_STATUS_LOG.md` Section 8 - Pending Updates Tracker
- `/docs/tiers/tier1/WEEKLY_CHECKLIST.md` - Full 7-item consistency checklist
- `/docs/tiers/tier1/decision-impact-log.md` - CB decision tracking
- `/docs/tiers/tier1/PREVENTION_SYSTEM_SPEC.md` - Warning system specification

---

**END OF PRE-WORK CHECKLIST**
