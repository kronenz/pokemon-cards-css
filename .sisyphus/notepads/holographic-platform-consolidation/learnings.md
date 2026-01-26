# Learnings - Holographic Platform Consolidation

**Plan**: holographic-platform-consolidation
**Created**: 2026-01-26

---

## Conventions & Patterns

### Project Structure
- 54 routes total: 15 core production, 25+ demo/test pages
- 100+ components with significant duplication
- Dual backend architecture (PocketBase + Supabase)

### Testing Infrastructure
- Vitest with jsdom environment
- RAF and Touch events already mocked in setup.ts
- Playwright configured for cross-browser testing (Chrome, Firefox, Safari, Edge)
- Mobile testing configured (Pixel 5, iPhone 12, iPad)

### Backend Architecture
- **PocketBase**: Deployed at 10.254.0.96:18090, authService.ts (390 lines)
- **Supabase**: Local development, supabaseAuthService.ts (671 lines)
- Both fully implemented with OAuth support

### Component Patterns
- Multiple card component variants exist
- UnifiedHolographicCard intended as single source of truth
- Holographic effects use CSS-based 60fps engine

---

## Successful Approaches

### Remote Backend Deployment
- Successfully deployed PocketBase, MinIO, Redis to remote server
- Docker Compose with port mapping to avoid conflicts
- Environment-specific configuration files (.env.remote, .env.local)

### Test Setup
- Comprehensive mocking in setup.ts:
  - requestAnimationFrame/cancelAnimationFrame
  - TouchEvent class
  - ResizeObserver, IntersectionObserver
  - CSS.supports for blend modes
  - Navigator APIs (deviceMemory, hardwareConcurrency, vibrate)

---

## What Works Well

1. **Holographic Engine**: 60fps CSS-based implementation is solid
2. **Test Infrastructure**: Mocking setup is comprehensive
3. **Backend Deployment**: Remote PocketBase deployment successful
4. **Component Library**: Design system components well-structured

---

## Append New Learnings Below

_Format: ## [TIMESTAMP] Task: {task-id}_
_Content: What you learned, patterns discovered, conventions to follow_
