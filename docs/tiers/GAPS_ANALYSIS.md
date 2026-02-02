# Gaps Analysis: Tiered Documentation Structure

**Document Purpose**: Identify documentation gaps, inconsistencies, and missing content across the tiered structure.

**Status**: ACTIVE
**Last Updated**: 2026-02-01
**Owner**: Product Director

---

## 1. Missing Documentation

### Tier 1 Gaps (HIGH PRIORITY - Launch Blockers)

| Gap | Document Needed | Priority | Assigned Agent | Task |
|-----|-----------------|----------|----------------|------|
| Privacy Policy | GDPR-compliant privacy policy | **BLOCKER** | compliance-specialist | TASK-001 |
| Safeguarding Policy | Care Act 2014 policy | **BLOCKER** | compliance-specialist | TASK-002 |
| API Specification | RESTful API endpoints | HIGH | technical-architect | TASK-003 |
| Integration Specs | Stripe, Twilio, SendGrid | HIGH | technical-architect | TASK-004 |
| Database Schema | Tier 1 data model | HIGH | technical-architect | TASK-007 |

### Tier 2 Gaps (MEDIUM PRIORITY - Post-Tier 1)

| Gap | Document Needed | Priority | Assigned Agent | Task |
|-----|-----------------|----------|----------------|------|
| Full Scope Document | Tier 2 scope with user stories | MEDIUM | product-requirements-specialist | TASK-008 |
| Build Sequence | Tier 2 development phases | MEDIUM | product-requirements-specialist | TASK-009 |
| DBS Integration Spec | DBS umbrella body integration | MEDIUM | technical-architect | TBD |
| Skill-Based Data Opinion | Legal opinion on health data inference | MEDIUM | compliance-specialist | TBD |

### Tier 3 Gaps (LOW PRIORITY - Future)

| Gap | Document Needed | Priority | Assigned Agent | Task |
|-----|-----------------|----------|----------------|------|
| Full Scope Document | Tier 3 scope with user stories | LOW | product-requirements-specialist | TBD |
| DPIA (Full) | Special category data DPIA | LOW | compliance-specialist | TBD |
| Mental Capacity Policy | MCA compliance framework | LOW | compliance-specialist | TBD |
| DoLS Guidance | Live-in care DoLS framework | LOW | compliance-specialist | TBD |

### Common Gaps

| Gap | Document Needed | Priority | Assigned Agent | Task |
|-----|-----------------|----------|----------------|------|
| Testing Strategy | QA test plans and UAT | MEDIUM | TBD (qa-specialist recommended) | TBD |
| Deployment Runbook | Launch day procedures | MEDIUM | technical-architect | TBD |
| Incident Response Plan | Data breach, safeguarding, technical | HIGH | product-director | TBD |

---

## 2. Content Inconsistencies

### Date Inconsistencies

| File | Date | Expected |
|------|------|----------|
| r0-launch-scope.md | 2026-01-31 | 2026-02-01 |

**Action**: Update all files to 2026-02-01 for consistency.

### Tier Tagging Inconsistencies

| Issue | Location | Resolution |
|-------|----------|------------|
| Some features not tier-tagged | feature-map.md | Review and tag all features |
| Duplicate status reports | Root and governance folders | Consolidate to tiers/tier1/status/ |

---

## 3. Structural Issues

### Old Files in _to_delete/

Files that have been moved to the new structure are in `docs/_to_delete/`:
- `/docs/_to_delete/tier1-implementation-status.md`
- `/docs/_to_delete/tiered-implementation-instructions.md`
- `/docs/_to_delete/screen-inventory.md`
- `/docs/_to_delete/route-map.md`
- `/docs/_to_delete/backlog.yml`
- `/docs/_to_delete/pre-launch-website-content-architecture.md`

**Status**: Can be deleted after confirming all content has been migrated to the new structure.

### Missing Subfolders

| Tier | Missing | Should Contain |
|------|---------|----------------|
| Tier 2 | planning/ | Build sequence, launch checklist |
| Tier 2 | status/ | Implementation status |
| Tier 3 | planning/ | Build sequence, launch checklist |
| Tier 3 | status/ | Implementation status |

**Note**: These can be created when Tier 2/3 become active.

---

## 4. Agent Configuration Gaps

### Missing Agent

| Agent Needed | Responsibility | Justification |
|--------------|----------------|---------------|
| qa-specialist | Test plans, UAT, security testing | Launch checklist includes extensive testing with no agent ownership |

### Agent Access Updates Needed

**Status**: COMPLETE (2026-02-01)

All agent system prompts have been updated to reference the new tier structure paths. See: `/.claude/agents/FILE_ACCESS_SCOPE.md`

Updated agents:
- product-requirements-specialist.md
- route-map-architect.md
- compliance-specialist.md
- technical-architect.md
- content-architect.md
- FILE_ACCESS_SCOPE.md

---

## 5. Recommended Missing Agents

Based on the tiered structure analysis, the following new agents are recommended:

### qa-specialist

**Responsibility**: Test case definition, UAT planning, security testing scope, accessibility compliance verification

**Artifacts Owned**:
- `/docs/testing/` (new folder)
- Test plans
- Test cases
- UAT scripts

**Justification**: Launch checklist includes extensive testing requirements with no current agent ownership.

---

## 6. Open Questions

### Requiring Founder Decision

| Question | Impact | Deadline |
|----------|--------|----------|
| Pricing model (commission %, who pays) | Terms of Service, Stripe config | Week 3 |
| Insurance minimums (PL, PI amounts) | Caregiver ToS, verification | Week 2 |
| Geographic scope (limited vs nationwide) | Caregiver recruitment, support | Pre-launch |
| Early adopter incentives | Marketing, pricing page | Pre-launch |

### Requiring Legal Opinion

| Question | Impact | Deadline |
|----------|--------|----------|
| CQC Introduction Agency status | Launch legality | Week 2 |
| Skill-based data as health data inference | Tier 2 DPIA scope | Pre-Tier 2 |

---

## 7. Prioritized Gap Closure Sequence

### Immediate (This Week)

1. **TASK-001**: Privacy Policy (compliance-specialist)
2. **TASK-002**: Safeguarding Policy (compliance-specialist)
3. **TASK-003**: API Specification (technical-architect)
4. **TASK-007**: Database Schema (technical-architect)

### Week 2

5. **TASK-004**: Integration Specifications (technical-architect)
6. Create Incident Response Plan (product-director)
7. Legal opinion on CQC status (external solicitor)

### Week 3-4

8. **TASK-008**: Tier 2 Scope (product-requirements-specialist)
9. **TASK-009**: Tier 2 Build Sequence (product-requirements-specialist)
10. Update all date inconsistencies

---

## 8. Validation Checklist

Before considering documentation "complete" for Tier 1 launch:

### Content Completeness
- [ ] All BLOCKER tasks from agent-tasks/ completed
- [ ] Privacy Policy legally reviewed and published
- [ ] Terms of Service legally reviewed and published
- [ ] Safeguarding Policy published
- [ ] All GD (Gating Decisions) with BLOCKER status resolved

### Structural Integrity
- [ ] All tier1/ documents consistent with common/ specifications
- [ ] All cross-references valid (no broken links)
- [ ] All date stamps updated to current date
- [ ] FILE_ACCESS_SCOPE.md reflects actual structure

### Agent Readiness
- [ ] All agent system prompts updated with tier paths
- [ ] All agent tasks have clear assignments
- [ ] FILE_ACCESS_SCOPE.md access rules verified

---

**Last Updated**: 2026-02-01
