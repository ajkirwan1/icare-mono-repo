# Tier 1 Prevention System Specification

**Document Purpose**: Define automated warning and prompt systems to prevent deliverable staleness and inconsistencies.

**Owner**: Product Director
**Created**: 2026-02-07
**Status**: SPECIFICATION (Implementation Required)

---

## 1. Overview

### 1.1 Problem Statement

**Root Cause of QA Issues (2026-02-07)**:
- CB decisions (CB-001, CB-002, CB-005, CB-006) changed R0 scope from 26 to 30 screens
- r0-launch-scope.md was updated to reflect decisions
- tier1-route-map.md, screen-inventory.md, and FIGMA_PRODUCTION_PLAN.md were NOT updated
- Result: Stale deliverables with incorrect screen counts and classifications

**Why This Occurred**:
1. No automated dependency tracking between documents
2. No prompt/reminder when CB decisions were made
3. No weekly consistency check routine
4. Agents created outputs BEFORE CB decisions, never re-run after decisions changed upstream requirements

### 1.2 Solution Components

This specification defines THREE prevention systems:

1. **Weekly Consistency Check Prompt** - Automated weekly reminder with checklist
2. **Decision Impact Log Update Prompt** - Triggered when CB decisions are made
3. **Terminal Warning System** - Visual alerts when checks are overdue or unfulfilled

---

## 2. Weekly Consistency Check Prompt

### 2.1 Trigger Condition

**Frequency**: Every 7 days from last check
**Initial Trigger**: 2026-02-14 (7 days from 2026-02-07)

**Check Method**:
- Calculate days since last "Consistency Check Completed" entry in TIER1_STATUS_LOG.md
- If ≥7 days, display prompt at session start

### 2.2 Prompt Format

```
┌─────────────────────────────────────────────────────────────┐
│ ⏰ WEEKLY CONSISTENCY CHECK DUE                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ Last Check: 2026-02-07 (7 days ago)                        │
│                                                             │
│ Please complete the consistency checklist:                 │
│                                                             │
│ [ ] Review decision-impact-log.md for new CB decisions     │
│ [ ] Check Pending Updates Tracker (STATUS_LOG Section 8)   │
│ [ ] Validate route map vs r0-launch-scope.md (counts)      │
│ [ ] Validate screen-inventory.md vs route map              │
│ [ ] Check cross-references in FIGMA_PRODUCTION_PLAN.md     │
│ [ ] Verify all agent definitions are current               │
│ [ ] Update STATUS_LOG Section 8 with any new pending items │
│                                                             │
│ Mark complete: Add entry to STATUS_LOG.md Change Log       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 2.3 Checklist Items (Detailed)

#### Item 1: Review decision-impact-log.md
- **Path**: `/docs/tiers/tier1/decision-impact-log.md`
- **Action**: Check if new CB decisions were added in last 7 days
- **Pass Criteria**: All decisions have status ✅ COMPLETE for affected deliverables

#### Item 2: Check Pending Updates Tracker
- **Path**: `/docs/tiers/tier1/TIER1_STATUS_LOG.md` Section 8
- **Action**: Review "Current Pending Updates" table
- **Pass Criteria**: No items >7 days old; all items have assigned owners

#### Item 3: Validate route map vs r0-launch-scope
- **Compare**: `/docs/product/tier1-route-map.md` Section 1.3 vs `/docs/tiers/tier1/planning/r0-launch-scope.md` screen count
- **Action**: Verify R0 screen count matches (currently 30)
- **Pass Criteria**: Counts match exactly

#### Item 4: Validate screen-inventory vs route map
- **Compare**: `/docs/tiers/tier1/draft-design-specs/screen-inventory.md` ToC vs route map
- **Action**: Verify Care Receiver/Caregiver screen counts match
- **Pass Criteria**: Counts consistent (CR: 8, CG: 8, Admin: 7, Public: 7)

#### Item 5: Check FIGMA_PRODUCTION_PLAN cross-references
- **Path**: `/docs/tiers/tier1/FIGMA_PRODUCTION_PLAN.md`
- **Action**: Verify all screen IDs referenced exist in route map
- **Pass Criteria**: No broken references (e.g., SCR-CG-020 when should be SCR-CG-015)

#### Item 6: Verify agent definitions
- **Path**: `/.claude/agents/*.md`
- **Action**: Check that agent instructions reference current completion status, correct paths, CB decisions
- **Pass Criteria**: No references to outdated statuses (e.g., "APP-004 not started" when complete)

#### Item 7: Update STATUS_LOG Section 8
- **Path**: `/docs/tiers/tier1/TIER1_STATUS_LOG.md` Section 8
- **Action**: Add any newly identified stale deliverables to Pending Updates table
- **Pass Criteria**: All inconsistencies tracked

### 2.4 Completion Recording

After checklist complete, add to STATUS_LOG.md Section 5 (Change Log):

```markdown
### YYYY-MM-DD: Weekly Consistency Check Completed

**Checklist Results**:
- ✅ All CB decisions synced
- ✅ No pending updates >7 days old
- ✅ Route map aligned with r0-launch-scope.md
- ✅ Screen inventory counts consistent
- ✅ FIGMA plan cross-references valid
- ✅ Agent definitions current
- ✅ No new pending updates identified

**Issues Found**: [None | List any issues]
**Actions Taken**: [None | Describe fixes applied]
```

---

## 3. Decision Impact Log Update Prompt

### 3.1 Trigger Condition

**When**: A CB decision is made (gating decision, scope change, requirement change)

**Detection Method** (Manual):
- User explicitly states: "I've made a decision on [topic]"
- User updates r0-launch-scope.md or r1-launch-scope.md with new screen classifications
- User adds/modifies a CB-XXX decision in planning documents

**Prompt Display**: Immediately after decision is communicated/documented

### 3.2 Prompt Format

```
┌─────────────────────────────────────────────────────────────┐
│ 📋 CRITICAL BLOCKER DECISION DETECTED                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ A CB decision has been made. IMMEDIATELY:                  │
│                                                             │
│ 1. Update decision-impact-log.md with:                     │
│    - Decision ID (CB-XXX)                                  │
│    - Decision description                                  │
│    - Rationale                                             │
│    - Date                                                  │
│                                                             │
│ 2. Identify ALL affected deliverables:                     │
│    - Which documents reference this decision area?         │
│    - Which screens/routes are affected?                    │
│    - Which agents created outputs before this decision?    │
│                                                             │
│ 3. Add affected deliverables to:                           │
│    /docs/tiers/tier1/TIER1_STATUS_LOG.md Section 8         │
│    (Pending Updates Tracker)                               │
│                                                             │
│ 4. Assign update responsibility:                           │
│    - Which agent owns each affected artifact?              │
│    - Set priority (CRITICAL/HIGH/MEDIUM)                   │
│                                                             │
│ 5. Execute synchronization:                                │
│    - Run agents to update stale deliverables               │
│    - OR manually update documents                          │
│                                                             │
│ DO NOT PROCEED WITH NEW WORK until sync complete.          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 3.3 Example: CB Decision Made

**Scenario**: User decides to elevate SCR-CR-001 from R1 to R0

**Actions Required**:

1. **Update decision-impact-log.md**:
   ```markdown
   ### CB-001: Dashboard Screens Elevated to R0 (Care Receiver)

   **Date**: 2026-02-06
   **Decision**: Care Receiver Dashboard (SCR-CR-001) elevated from R1 to R0
   **Rationale**: Critical user onboarding context
   **Source**: `/docs/tiers/tier1/planning/r0-launch-scope.md` (v1.2)

   **Affected Deliverables**:
   | Deliverable | Path | Change Required | Status | Updated Date |
   |-------------|------|----------------|--------|--------------|
   | tier1-route-map.md | `/docs/product/tier1-route-map.md` | Change SCR-CR-001 from R1 to R0 | 🔄 PENDING | - |
   | r0-launch-scope.md | `/docs/tiers/tier1/planning/r0-launch-scope.md` | Update R0 count | 🔄 PENDING | - |
   | screen-inventory.md | `/docs/tiers/tier1/draft-design-specs/screen-inventory.md` | Update counts | 🔄 PENDING | - |
   ```

2. **Update TIER1_STATUS_LOG.md Section 8**:
   ```markdown
   | Deliverable | Reason for Update | Triggered By | Priority | Status | Assigned To |
   |-------------|-------------------|--------------|----------|--------|-------------|
   | tier1-route-map.md | CB-001 changed R0 scope | CB-001 | CRITICAL | PENDING | route-map-architect |
   | r0-launch-scope.md | CB-001 changed R0 count | CB-001 | CRITICAL | PENDING | product-requirements-specialist |
   | screen-inventory.md | CB-001 changed R0 counts | CB-001 | HIGH | PENDING | route-map-architect |
   ```

3. **Execute Updates**: Run agents or manually update

4. **Mark Complete**: Update decision-impact-log.md statuses to ✅ COMPLETE

---

## 4. Terminal Warning System

### 4.1 Warning Triggers

**Trigger 1: Stale Pending Update** (>7 days old)
- **Condition**: Any item in STATUS_LOG Section 8 "Current Pending Updates" has been pending >7 days
- **Severity**: CRITICAL

**Trigger 2: Consistency Check Overdue** (>10 days since last check)
- **Condition**: No "Weekly Consistency Check Completed" entry in STATUS_LOG Change Log within last 10 days
- **Severity**: HIGH

**Trigger 3: CB Decision Not Logged** (decision made but not in decision-impact-log.md)
- **Condition**: User made CB decision (detected via r0/r1-launch-scope.md changes) but no corresponding entry in decision-impact-log.md
- **Severity**: CRITICAL
- **Detection**: Compare last modified dates of r0-launch-scope.md vs decision-impact-log.md

### 4.2 Warning Display Format

#### CRITICAL Warning (Stale Pending Update)

```
╔═════════════════════════════════════════════════════════════╗
║ 🚨 CRITICAL: STALE DELIVERABLE DETECTED 🚨                  ║
╠═════════════════════════════════════════════════════════════╣
║                                                             ║
║ Deliverable: tier1-route-map.md                            ║
║ Status: PENDING for 8 days                                 ║
║ Triggered By: CB-001                                        ║
║ Priority: CRITICAL                                          ║
║                                                             ║
║ ACTION REQUIRED:                                            ║
║ 1. Review: /docs/tiers/tier1/TIER1_STATUS_LOG.md Section 8 ║
║ 2. Execute update via route-map-architect agent            ║
║ 3. Mark complete in Pending Updates Tracker                ║
║                                                             ║
║ DO NOT PROCEED WITH NEW WORK UNTIL RESOLVED.                ║
║                                                             ║
╚═════════════════════════════════════════════════════════════╝
```

#### HIGH Warning (Consistency Check Overdue)

```
┌─────────────────────────────────────────────────────────────┐
│ ⚠️  WARNING: CONSISTENCY CHECK OVERDUE                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ Last Check: 2026-02-07 (12 days ago)                       │
│ Due: 2026-02-14 (2 days overdue)                           │
│                                                             │
│ ACTION REQUIRED:                                            │
│ Complete weekly consistency checklist immediately.         │
│                                                             │
│ See: /docs/tiers/tier1/PREVENTION_SYSTEM_SPEC.md Section 2 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

#### CRITICAL Warning (CB Decision Not Logged)

```
╔═════════════════════════════════════════════════════════════╗
║ 🚨 CRITICAL: CB DECISION NOT LOGGED 🚨                      ║
╠═════════════════════════════════════════════════════════════╣
║                                                             ║
║ r0-launch-scope.md modified: 2026-02-06 14:32              ║
║ decision-impact-log.md last updated: 2026-02-05 10:15      ║
║                                                             ║
║ CB decision detected but NOT logged in impact tracker.     ║
║                                                             ║
║ ACTION REQUIRED:                                            ║
║ 1. Update: /docs/tiers/tier1/decision-impact-log.md        ║
║ 2. Identify affected deliverables                          ║
║ 3. Add to Pending Updates Tracker (STATUS_LOG Section 8)   ║
║                                                             ║
║ DO NOT PROCEED WITH NEW WORK UNTIL COMPLETE.                ║
║                                                             ║
╚═════════════════════════════════════════════════════════════╝
```

### 4.3 Warning Display Timing

**Session Start**: Display all active warnings immediately when CLI session starts

**Periodic**: Re-display CRITICAL warnings every 30 minutes during active session

**Suppression**: Warnings are suppressed ONLY when:
- Pending update is completed and moved to "Completed Updates" table
- Consistency check is completed and logged
- CB decision is logged in decision-impact-log.md with all affected deliverables identified

---

## 5. Implementation Requirements

### 5.1 Technical Requirements

**File Monitoring**:
- Monitor `/docs/tiers/tier1/TIER1_STATUS_LOG.md` Section 8 for pending updates >7 days
- Monitor `/docs/tiers/tier1/TIER1_STATUS_LOG.md` Section 5 (Change Log) for last consistency check date
- Monitor `/docs/tiers/tier1/planning/r0-launch-scope.md` and `r1-launch-scope.md` modification timestamps
- Monitor `/docs/tiers/tier1/decision-impact-log.md` modification timestamps

**Date/Time Calculations**:
- Calculate days since last consistency check
- Calculate days since pending update was added
- Compare modification timestamps between scope docs and decision log

**Display Integration**:
- CLI session startup hooks
- Terminal output formatting (colored ASCII boxes)
- Persistent reminders (every 30 min for CRITICAL warnings)

### 5.2 Configuration

**File Paths** (configurable):
```json
{
  "statusLogPath": "/docs/tiers/tier1/TIER1_STATUS_LOG.md",
  "decisionLogPath": "/docs/tiers/tier1/decision-impact-log.md",
  "r0ScopePath": "/docs/tiers/tier1/planning/r0-launch-scope.md",
  "r1ScopePath": "/docs/tiers/tier1/planning/r1-launch-scope.md"
}
```

**Thresholds** (configurable):
```json
{
  "consistencyCheckDueDays": 7,
  "consistencyCheckOverdueDays": 10,
  "stalePendingUpdateDays": 7,
  "warningRepeatIntervalMinutes": 30
}
```

### 5.3 Manual Workaround (Until Automated)

**Weekly Reminder** (Manual):
- Set calendar reminder for every Friday at 3pm
- When reminder fires, manually review:
  1. `/docs/tiers/tier1/TIER1_STATUS_LOG.md` Section 8
  2. `/docs/tiers/tier1/decision-impact-log.md`
  3. Complete consistency checklist (Section 2.3 above)

**CB Decision Reminder** (Manual):
- When making CB decision, immediately add note to decision-impact-log.md
- Create GitHub issue: "Sync deliverables for CB-XXX"
- Do not close issue until all affected artifacts updated

---

## 6. Validation

### 6.1 Test Scenarios

**Test 1: Stale Pending Update Detection**
- **Setup**: Add item to STATUS_LOG Section 8 with date 8 days ago
- **Expected**: CRITICAL warning displayed at session start
- **Pass Criteria**: Warning shows deliverable name, days pending, required action

**Test 2: Consistency Check Reminder**
- **Setup**: Remove all "Weekly Consistency Check Completed" entries from Change Log OR make last entry 12 days old
- **Expected**: HIGH warning displayed at session start
- **Pass Criteria**: Warning shows last check date, days overdue, checklist link

**Test 3: CB Decision Logging Detection**
- **Setup**: Modify r0-launch-scope.md with CB decision, do NOT update decision-impact-log.md
- **Expected**: CRITICAL warning displayed at session start
- **Pass Criteria**: Warning shows both file modification dates, required action

**Test 4: Warning Suppression**
- **Setup**: Complete pending update, move to "Completed Updates" table
- **Expected**: Warning no longer displayed
- **Pass Criteria**: Session starts with no warnings

### 6.2 Success Metrics

**Metric 1: Stale Deliverable Prevention**
- **Target**: Zero pending updates >7 days old
- **Measurement**: Weekly audit of STATUS_LOG Section 8

**Metric 2: Consistency Check Compliance**
- **Target**: Consistency check completed within 10 days of last check
- **Measurement**: Count of Change Log entries vs weeks elapsed

**Metric 3: CB Decision Logging Compliance**
- **Target**: 100% of CB decisions logged in decision-impact-log.md within 24 hours
- **Measurement**: Compare CB decision dates in r0/r1-launch-scope.md vs decision-impact-log.md

---

## 7. Maintenance

### 7.1 Review Cycle

**Quarterly**: Review this specification for effectiveness
- Are warnings triggering correctly?
- Are thresholds appropriate (7 days, 10 days)?
- Are checklist items still relevant?

**Updates**: Version this document when changes are made

---

## 8. Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-02-07 | Product Director (Agent) | Initial specification: weekly consistency check prompt, CB decision logging prompt, terminal warning system with 3 trigger conditions and detailed implementation requirements |

---

## Appendix A: Quick Reference Card

**Weekly Consistency Check** (Every 7 days):
```
✓ Review decision-impact-log.md
✓ Check Pending Updates (STATUS_LOG Section 8)
✓ Validate route map vs r0-launch-scope (counts)
✓ Validate screen-inventory vs route map
✓ Check FIGMA plan cross-references
✓ Verify agent definitions current
✓ Update STATUS_LOG with new pending items
✓ Log completion in Change Log
```

**CB Decision Made** (Immediate):
```
✓ Add to decision-impact-log.md (ID, description, date, rationale)
✓ Identify ALL affected deliverables
✓ Add to Pending Updates Tracker (STATUS_LOG Section 8)
✓ Assign update responsibility (which agent?)
✓ Execute synchronization (run agents or manual updates)
✓ Mark complete in decision-impact-log.md
```

**Warning Triggers**:
```
🚨 CRITICAL: Pending update >7 days old
⚠️  HIGH: Consistency check >10 days overdue
🚨 CRITICAL: CB decision not logged in decision-impact-log.md
```

---

**END OF SPECIFICATION**
