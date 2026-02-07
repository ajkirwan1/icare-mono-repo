# Weekly Consistency Checklist

**Purpose**: Manual checklist for weekly consistency verification (until automated system implemented).

**Frequency**: Every 7 days (recommended: Friday 3pm)

**Last Completed**: 2026-02-07 ✅

**Next Due**: 2026-02-14

---

## ⏰ DUE DATE CALCULATOR

**Last Check**: 2026-02-07
**+7 Days**: 2026-02-14 ← **NEXT CHECK DUE**
**+14 Days**: 2026-02-21
**+21 Days**: 2026-02-28

**⚠️ If today's date > Next Due Date, this check is OVERDUE.**

---

## Consistency Check Tasks

### ☐ Task 1: Review Decision Impact Log

**File**: `/docs/tiers/tier1/decision-impact-log.md`

**Actions**:
- [ ] Check if new CB decisions added since last check
- [ ] Verify all CB decisions show ✅ COMPLETE status for all affected deliverables
- [ ] If any show 🔄 PENDING, escalate as BLOCKER

**Pass Criteria**: All decisions fully synchronized

---

### ☐ Task 2: Check Pending Updates Tracker

**File**: `/docs/tiers/tier1/TIER1_STATUS_LOG.md` Section 8

**Actions**:
- [ ] Review "Current Pending Updates" table
- [ ] Check if any items are >7 days old
- [ ] Verify all items have assigned owners
- [ ] Verify priority is set (CRITICAL/HIGH/MEDIUM)

**🚨 CRITICAL WARNING**: If any item is >7 days old, stop new work and resolve immediately.

**Pass Criteria**:
- No items >7 days old
- All items have owners and priorities
- "Current Pending Updates" table is empty (ideal) or all items are <7 days old

---

### ☐ Task 3: Validate Route Map vs R0 Launch Scope

**Files to Compare**:
- `/docs/product/tier1-route-map.md` Section 1.3 (screen count table)
- `/docs/tiers/tier1/planning/r0-launch-scope.md` (R0 screens list)

**Actions**:
- [ ] Route map shows R0 = 30 screens
- [ ] r0-launch-scope.md lists exactly 30 screens
- [ ] Screen classifications match (CR-001 is R0, not R1)

**Current Expected Values** (as of 2026-02-07):
- R0: 30 screens
- R1: 47 screens

**Pass Criteria**: Screen counts match exactly

---

### ☐ Task 4: Validate Screen Inventory vs Route Map

**Files to Compare**:
- `/docs/tiers/tier1/draft-design-specs/screen-inventory.md` (Table of Contents)
- `/docs/product/tier1-route-map.md`

**Actions**:
- [ ] Care Receiver Flows: screen-inventory ToC matches route map count
- [ ] Caregiver Flows: screen-inventory ToC matches route map count
- [ ] Admin Screens: counts consistent
- [ ] Public Screens: counts consistent

**Current Expected Values** (as of 2026-02-07):
- Care Receiver: 8 screens (R0)
- Caregiver: 8 screens (R0)
- Admin: 7 screens (R0)
- Public: 7 screens (R0)
- Total R0: 30 screens

**Pass Criteria**: All counts consistent between documents

---

### ☐ Task 5: Check FIGMA Production Plan Cross-References

**File**: `/docs/tiers/tier1/FIGMA_PRODUCTION_PLAN.md`

**Actions**:
- [ ] Verify all screen IDs referenced exist in tier1-route-map.md
- [ ] Check navigation references are correct (e.g., "View Full Earnings" → SCR-CG-015, not SCR-CG-020)
- [ ] Verify dashboard specs reference correct screens (CR-001, CG-001, ADM-001)

**Common Errors to Check**:
- ❌ SCR-CG-020 referenced for earnings (should be SCR-CG-015)
- ❌ Old screen counts (26 instead of 30)
- ❌ Screen IDs that don't exist in route map

**Pass Criteria**: No broken references, all IDs valid

---

### ☐ Task 6: Verify Agent Definitions Are Current

**Files**: `/.claude/agents/*.md`

**Agents to Check**:
- [ ] route-map-architect.md
- [ ] elderly-care-ux-ui-designer.md
- [ ] product-requirements-specialist.md
- [ ] compliance-specialist.md
- [ ] technical-architect.md
- [ ] content-architect.md
- [ ] product-director.md

**Actions**:
- [ ] Check "Current Status" sections reference correct completion status
- [ ] Verify paths are correct (e.g., tier1-route-map.md at `/docs/product/`, not `/docs/tiers/tier1/draft-design-specs/`)
- [ ] Check that CB decisions are reflected (R0 = 30 screens, not 26)

**Pass Criteria**: No outdated status references, all paths correct

---

### ☐ Task 7: Update STATUS_LOG Section 8 with New Issues

**File**: `/docs/tiers/tier1/TIER1_STATUS_LOG.md` Section 8

**Actions**:
- [ ] If any inconsistencies found above, add to "Current Pending Updates" table
- [ ] Include: Deliverable name, reason, triggered by, priority, status, assigned to
- [ ] Set priority: CRITICAL (blocks work), HIGH (affects deliverables), MEDIUM (nice to fix)

**Pass Criteria**: All newly discovered inconsistencies are tracked

---

## Completion Recording

After completing all 7 tasks above, record completion:

**File**: `/docs/tiers/tier1/TIER1_STATUS_LOG.md` Section 5 (Change Log)

**Add Entry**:
```markdown
### YYYY-MM-DD: Weekly Consistency Check Completed

**Checklist Results**:
- ✅ All CB decisions synced
- ✅ No pending updates >7 days old
- ✅ Route map aligned with r0-launch-scope.md (R0 = 30)
- ✅ Screen inventory counts consistent
- ✅ FIGMA plan cross-references valid
- ✅ Agent definitions current
- ✅ No new pending updates identified

**Issues Found**: [None | List any issues]
**Actions Taken**: [None | Describe fixes applied]
```

**Update This File**:
- Change "Last Completed" date at top of this file
- Calculate "Next Due" (+7 days)

---

## 🚨 Critical Warnings

**If you find ANY of these, STOP and resolve immediately**:

1. **Stale Pending Update (>7 days)**: Item in STATUS_LOG Section 8 is >7 days old
   - **Action**: Escalate as blocker, assign to agent, execute update immediately

2. **CB Decision Not Logged**: r0/r1-launch-scope.md modified but no entry in decision-impact-log.md
   - **Action**: Add to decision-impact-log.md immediately, identify affected deliverables

3. **Screen Count Mismatch**: Route map shows different R0/R1 counts than r0/r1-launch-scope.md
   - **Action**: Determine which is correct (r0/r1-launch-scope is source of truth), sync route map

4. **Broken References**: FIGMA plan references screen IDs that don't exist
   - **Action**: Fix references immediately (blocks design work)

---

## Quick Status Check (30 seconds)

**Before starting ANY new work**, quickly check:

1. `/docs/tiers/tier1/TIER1_STATUS_LOG.md` Section 8 → Any items in "Current Pending Updates"?
   - If YES and >7 days old → STOP, resolve first
2. This file's "Last Completed" date → >10 days ago?
   - If YES → Run full checklist before proceeding
3. `/docs/tiers/tier1/decision-impact-log.md` → Any decisions show 🔄 PENDING?
   - If YES → Sync those deliverables before new work

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-02-07 | Product Director (Agent) | Initial weekly checklist for manual consistency verification |

---

**END OF CHECKLIST**
