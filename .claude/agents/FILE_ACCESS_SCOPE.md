# Agent File Access Scope Matrix

**Last Updated:** 2026-02-01
**Purpose:** Define which agents should access which documentation folders

---

## Access Matrix

| Agent | Primary Access | Secondary Access | Read-Only |
|-------|---------------|------------------|-----------|
| **product-director** | docs/**, docs/tiers/** | .claude/agents/** | - |
| **product-requirements-specialist** | docs/tiers/common/spec/, docs/tiers/tier1-3/ | docs/compliance/, docs/tiers/common/planning/ | docs/governance/ |
| **route-map-architect** | docs/tiers/common/spec/, docs/tiers/tier1/planning/ | docs/tiers/common/website/ | docs/governance/ |
| **elderly-care-ui-designer** | docs/tiers/common/spec/ | docs/tiers/tier1/, docs/tiers/common/ | docs/governance/ |
| **content-architect** | docs/tiers/common/website/ | docs/tiers/common/spec/, docs/tiers/ | docs/compliance/, docs/governance/ |
| **compliance-specialist** | docs/compliance/ | docs/governance/, docs/tiers/*/compliance.md | docs/tiers/common/spec/ |
| **technical-architect** | docs/tiers/common/spec/ | docs/tiers/tier1/planning/ | docs/governance/ |

---

## Folder Purposes

### docs/governance/
**Owner:** Product Director
**Contains:** founder-decisions-responses.md, gating-decisions.md, product-decisions.md, pricing-decisions-status.md, founder-decisions-strategic-analysis.md
**Who Reads:** All agents for context
**Who Writes:** Product Director only

### docs/tiers/common/spec/
**Owner:** Product Requirements Specialist
**Contains:** marketplace-spec.md, feature-map.md, state-maps.md
**Who Reads:** All agents
**Who Writes:** Product Requirements Specialist

### docs/tiers/common/planning/
**Owner:** Product Requirements Specialist
**Contains:** mvp-classification.md
**Who Reads:** All agents
**Who Writes:** Product Requirements Specialist

### docs/tiers/common/website/
**Owner:** Content Architect
**Contains:** roadmap.md (tiered website roadmap)
**Who Reads:** All agents
**Who Writes:** Content Architect

### docs/tiers/tier1/planning/
**Owner:** Product Requirements Specialist
**Contains:** build-sequence.md, launch-checklist.md, r0-launch-scope.md
**Who Reads:** All agents
**Who Writes:** Product Requirements Specialist

### docs/tiers/tier1/status/
**Owner:** Product Director
**Contains:** implementation-status.md
**Who Reads:** All agents
**Who Writes:** Product Director

### docs/compliance/
**Owner:** Compliance Specialist
**Contains:** legal-framework.md, dpia.md, gap-registry.md, policies/
**Who Reads:** All agents
**Who Writes:** Compliance Specialist

### docs/_to_delete/
**Owner:** Product Director
**Contains:** Files marked for deletion after reorganization
**Who Reads:** Anyone needing historical context
**Who Writes:** Product Director only (for cleanup)

### docs/tiers/ (Reorganized Structure - 2026-02-01)
**Owner:** Product Director (structure), Specialist Agents (content)
**Contains:** Tier-specific and common documentation organized by tier
**Structure:**
```
docs/tiers/
├── _index.md                    # Navigation hub
├── GAPS_ANALYSIS.md             # Documentation gaps tracking
├── tier1/                       # Tier 1 (Companionship MVP) - ACTIVE
│   ├── _index.md
│   ├── planning/               # Tier 1 planning docs
│   │   ├── build-sequence.md
│   │   ├── launch-checklist.md
│   │   └── r0-launch-scope.md
│   ├── status/
│   │   └── implementation-status.md
│   ├── features.md             # Tier 1 feature list
│   └── compliance.md           # Tier 1 compliance requirements
├── tier2/                       # Tier 2 (Personal Care) - PLANNED
│   ├── _index.md
│   ├── scope.md
│   └── features.md
├── tier3/                       # Tier 3 (Condition-Specific) - FUTURE
│   ├── _index.md
│   ├── scope.md
│   └── features.md
└── common/                      # Shared across all tiers
    ├── _index.md
    ├── spec/                   # Core specifications
    │   ├── marketplace-spec.md
    │   ├── feature-map.md
    │   └── state-maps.md
    ├── planning/
    │   └── mvp-classification.md
    └── website/
        └── roadmap.md
```

**Access Rules:**
| Path | Owner | Who Writes |
|------|-------|------------|
| tiers/_index.md | product-director | product-director |
| tiers/GAPS_ANALYSIS.md | product-director | product-director |
| tiers/tier1/** | product-requirements-specialist | product-requirements-specialist |
| tiers/tier2/** | product-requirements-specialist | product-requirements-specialist |
| tiers/tier3/** | product-requirements-specialist | product-requirements-specialist |
| tiers/common/spec/** | product-requirements-specialist | product-requirements-specialist |
| tiers/common/planning/** | product-requirements-specialist | product-requirements-specialist |
| tiers/common/website/** | content-architect | content-architect |

---

## Agent Ownership Summary

| Agent | Owns These Artifacts |
|-------|---------------------|
| **product-director** | _index.md, governance/*, planning/*, decisions/*, _archive/*, tiers/_index.md, tiers/common/governance/*, agent-tasks/* |
| **product-requirements-specialist** | tiers/common/spec/*, tiers/common/backlog/*, tiers/tier1/**, tiers/tier2/**, tiers/tier3/** (except governance folders) |
| **route-map-architect** | tiers/common/ui/screen-inventory.md, tiers/common/ui/route-map.md |
| **elderly-care-ui-designer** | Wireframes (not in docs) |
| **content-architect** | marketing/* |
| **compliance-specialist** | compliance/*, tiers/*/compliance.md (advisory) |
| **technical-architect** | technical/* |

---

## Cross-Agent Workflows

### Feature Definition Flow
```
product-requirements-specialist
    |
    +-- Updates: spec/feature-map.md, backlog/backlog.yml
    |
    v
route-map-architect
    |
    +-- Updates: ui/screen-inventory.md
    |
    v
elderly-care-ui-designer
    |
    +-- Creates: Wireframes based on screen inventory
    |
    v
technical-architect
    |
    +-- Updates: technical/api-spec.md
```

### Compliance Review Flow
```
product-requirements-specialist
    |
    +-- Identifies compliance implications
    |
    v
compliance-specialist
    |
    +-- Reviews against legal-framework.md
    +-- Updates: gating-decisions.md, gap-registry.md
    |
    v
product-director
    |
    +-- Coordinates blockers, updates status
```

### Launch Preparation Flow
```
product-director
    |
    +-- Coordinates all agents
    |
    v
compliance-specialist          content-architect
    |                              |
    +-- Policies ready            +-- Marketing ready
    |                              |
    v                              v
technical-architect
    |
    +-- Technical specs ready
    |
    v
product-director
    |
    +-- Updates: tier1-implementation-status.md
```

---

## Permission Rules

1. **Read widely, write narrowly** - Agents can read any doc for context but should only modify their owned artifacts
2. **Strategy is read-only for specialists** - Only product-director modifies strategic documents
3. **Compliance review is advisory** - Compliance specialist can flag issues but product-director coordinates changes
4. **Cross-references allowed** - Agents can add cross-references to other docs without "owning" them
5. **Archive is append-only** - No agent should modify archived documents except to add archive header

---

## Document Modification Protocol

When an agent needs to modify a document they don't own:

1. **Flag the need** in their output
2. **Propose the change** with specific text
3. **Route to owner** for implementation
4. **Or escalate to product-director** for coordination

Example:
```
## Cross-Document Update Required

**Document:** docs/product/tiers/common/governance/gating-decisions.md
**Owner:** product-director
**Proposed Change:** Update GD-02 status to RESOLVED
**Reason:** DPIA tier 1 scope now defined

@product-director please review and implement this change
```

---

**END OF MATRIX**
