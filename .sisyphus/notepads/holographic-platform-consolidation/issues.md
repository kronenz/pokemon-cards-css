# Issues - Holographic Platform Consolidation

**Plan**: holographic-platform-consolidation
**Created**: 2026-01-26

---

## Known Issues

### Issue 1: Test Failures (207/336)
**Severity**: High
**Status**: Identified, fix planned in Track A4
**Description**: 207 tests failing out of 336 total (61% pass rate)
**Root Causes** (suspected):
- RAF-related failures (mocking may not be complete)
- Touch event simulation issues
- Import/module resolution errors
- Component rendering in test environment
**Plan**: Track A4 (Week 2-3) addresses this

---

### Issue 2: Route Proliferation
**Severity**: Medium
**Status**: Identified, fix planned in Track A1
**Description**: 54 routes with many demo/test pages mixed with production
**Impact**: 
- Confusing navigation
- Unclear what's production vs development
- Maintenance burden
**Plan**: Track A1 (Week 1) consolidates to 15 production routes

---

### Issue 3: Component Duplication
**Severity**: High
**Status**: Identified, fix planned in Track A2
**Description**: 10+ card component variants with overlapping functionality
**Components**:
- HolographicCard.svelte
- HolographicCardV2.svelte
- PrototypeHolographicCard.svelte
- UnifiedHolographicCard.svelte
- Card.svelte (design-system)
- Card2.svelte
- GachaCard.svelte
- Cards.svelte, Cards_5c.svelte
**Impact**:
- Inconsistent behavior
- Difficult to maintain
- Confusing for developers
**Plan**: Track A2 (Week 1-2) consolidates to single UnifiedHolographicCard

---

### Issue 4: Dual Backend Confusion
**Severity**: Medium
**Status**: Identified, decision pending
**Description**: Both PocketBase and Supabase implemented, unclear which to use
**Impact**:
- Developer confusion
- Potential bugs from using wrong backend
- Maintenance burden
**Plan**: Track A3 (Week 2) consolidates to single backend

---

### Issue 5: TypeScript Errors
**Severity**: Low
**Status**: Identified
**Files**:
- src/lib/services/supabaseAuthService.ts (4 errors)
- src/lib/config.ts (1 error)
- src/lib/holographic/__tests__/setup.ts (2 errors)
- src/lib/holographic/HolographicCard.svelte (1 error)
- src/routes/+page.svelte (1 error)
**Impact**: Build warnings, potential runtime issues
**Plan**: Fix during relevant track tasks

---

## Append New Issues Below

_Format: ## [TIMESTAMP] Issue: {issue-name}_
_Content: Description, severity, impact, workaround, fix plan_
