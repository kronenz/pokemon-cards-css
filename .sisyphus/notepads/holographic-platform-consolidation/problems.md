# Problems - Holographic Platform Consolidation

**Plan**: holographic-platform-consolidation
**Created**: 2026-01-26

---

## Unresolved Problems

### Problem 1: Backend Decision Pending
**Status**: Awaiting stakeholder decision
**Description**: Need to choose between PocketBase, Supabase, or both
**Blocking**: Track A3 (Backend consolidation)
**Recommendation**: Keep PocketBase for MVP
**Next Steps**: 
- Present recommendation to stakeholders
- Make decision by end of Week 1
- Proceed with Track A3 based on decision

---

### Problem 2: Test Failure Root Cause Unknown
**Status**: Requires investigation
**Description**: 207 test failures, root causes not fully analyzed
**Blocking**: Track A4 (Test infrastructure fix)
**Suspected Causes**:
- RAF mocking incomplete
- Touch event simulation issues
- Import resolution problems
- Component rendering in jsdom
**Next Steps**:
- Run test suite with verbose output
- Categorize failures by type
- Fix highest-impact categories first

---

### Problem 3: Visual Regression Testing Setup
**Status**: Not yet implemented
**Description**: Need visual regression tests before component migration
**Blocking**: Track A2 (Component consolidation) - safety requirement
**Options**:
- Percy (already in package.json)
- Playwright screenshots
- Manual testing
**Next Steps**:
- Choose visual regression tool
- Set up baseline screenshots
- Integrate into CI/CD

---

## Append New Problems Below

_Format: ## [TIMESTAMP] Problem: {problem-name}_
_Content: Description, blocking what, options considered, next steps_
