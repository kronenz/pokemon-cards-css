# Card Component Analysis & Feature Matrix

**Date**: 2026-01-26
**Status**: Analysis Complete
**Purpose**: Identify all card components, analyze features, design unified API

---

## 1. Card Component Inventory

### Total Components Found: 34

### Holographic Card Components (Primary - Need Consolidation)

| Component                         | Location                       | Status              | Key Features                                      |
| --------------------------------- | ------------------------------ | ------------------- | ------------------------------------------------- |
| `HolographicCard.svelte`          | `src/lib/holographic/`         | **Primary Phase 1** | how2code.md implementation, 60fps effects         |
| `UnifiedCard.svelte`              | `src/lib/components/v2/`       | **Primary V2**      | CardFront/CardBack, flip animation, size variants |
| `UnifiedHolographicCard.svelte`   | `src/lib/components/unified/`  | Integration attempt | Combines all features, context API                |
| `HolographicCard.svelte`          | `src/lib/components/`          | Legacy              | Old version                                       |
| `HolographicCardV2.svelte`        | `src/lib/components/`          | Legacy V2           | Outdated                                          |
| `PrototypeHolographicCard.svelte` | `src/lib/components/`          | Prototype           | Experimental                                      |
| `EnhancedCard.svelte`             | `src/lib/components/`          | Enhanced            | Additional features                               |
| `Card2.svelte`                    | `src/lib/components/`          | Variant             | Another iteration                                 |
| `EnhancedCardAdapter.svelte`      | `src/lib/components/adapters/` | Adapter             | Wraps other cards                                 |

### Supporting Card Components (Keep)

| Component                | Location                           | Purpose                |
| ------------------------ | ---------------------------------- | ---------------------- |
| `CardFront.svelte`       | `src/lib/components/v2/`           | Front face content     |
| `CardBack.svelte`        | `src/lib/components/v2/`           | Back face content      |
| `CardDetailModal.svelte` | `src/lib/components/unified/`      | Detail view modal      |
| `VirtualCardGrid.svelte` | `src/lib/components/unified/`      | Virtual scrolling grid |
| `CardEditor.svelte`      | `src/lib/components/pages/create/` | Card creation editor   |
| `CardPreview.svelte`     | `src/lib/components/pages/create/` | Preview in editor      |

### Domain-Specific Cards (Keep Separate)

| Component                  | Location                          | Purpose              |
| -------------------------- | --------------------------------- | -------------------- |
| `GachaCard.svelte`         | `src/lib/components/gacha/`       | Gacha animation      |
| `KBOStatsCard.svelte`      | `src/lib/components/`             | Player stats display |
| `UserProfileCard.svelte`   | `src/lib/components/auth/`        | User profile card    |
| `CommunityPostCard.svelte` | `src/lib/components/`             | Community post card  |
| `TemplateCard.svelte`      | `src/lib/components/marketplace/` | Template display     |
| `GradeProgressCard.svelte` | `src/lib/components/grade/`       | Grade progress       |

### UI Generic Cards (Keep)

| Component     | Location                            | Purpose            |
| ------------- | ----------------------------------- | ------------------ |
| `Card.svelte` | `src/lib/components/ui/`            | Generic UI card    |
| `Card.svelte` | `src/lib/components/design-system/` | Design system card |

---

## 2. Feature Comparison Matrix

### Core Holographic Features

| Feature                 | HolographicCard (lib/holographic)                    | UnifiedCard (v2)                    | UnifiedHolographicCard (unified) |
| ----------------------- | ---------------------------------------------------- | ----------------------------------- | -------------------------------- |
| **3D Rotation**         | rotateX/Y via transform                              | rotateX/Y via CSS vars              | rotateX/Y via CSS vars           |
| **Mouse Tracking**      | offsetX/Y calculation                                | clientX/Y calculation               | Pointer events (unified)         |
| **Touch Support**       | TouchEvent handling                                  | TouchEvent handling                 | Pointer events (unified)         |
| **Holographic Effect**  | CSS ::before/::after                                 | CardFront component                 | CSS with throttle                |
| **Card Flip**           | No                                                   | Yes (180deg Y-axis)                 | Yes (180deg Y-axis)              |
| **Effect Types**        | basic, cosmic, rainbow, aurora, neon, galaxy, secret | Via effectType prop                 | Via card.holographic.type        |
| **Performance Monitor** | Yes (showPerformance)                                | No                                  | No                               |
| **Accessibility**       | role="button", tabindex                              | role="button", tabindex, aria-label | role="button", keyboard nav      |
| **Size Variants**       | Fixed 300x420                                        | small, medium, large, featured      | small, medium, large, featured   |

### Props Comparison

| Prop                | HolographicCard | UnifiedCard | UnifiedHolographicCard |
| ------------------- | --------------- | ----------- | ---------------------- |
| `image`             | string          | string      | card.image.front       |
| `title`             | string          | string      | card.metadata.title    |
| `subtitle`          | string          | string      | card.metadata.subtitle |
| `rarity`            | string (stars)  | enum        | card.metadata.rarity   |
| `team`              | string          | TeamId enum | card.metadata.team     |
| `type/effectType`   | HolographicType | string      | card.holographic.type  |
| `size`              | -               | enum        | enum                   |
| `animated`          | boolean         | -           | -                      |
| `showPerformance`   | boolean         | -           | -                      |
| `interactive`       | -               | -           | boolean                |
| `showMetadata`      | -               | -           | boolean                |
| `enableHolographic` | -               | -           | boolean                |
| `enableFlip`        | -               | -           | boolean                |
| `context`           | -               | -           | CardContext            |

### Implementation Details

| Aspect                 | HolographicCard           | UnifiedCard              | UnifiedHolographicCard             |
| ---------------------- | ------------------------- | ------------------------ | ---------------------------------- |
| **Style Injection**    | Dynamic `<style>` in head | CSS variables on element | CSS variables on element           |
| **Effect Calculation** | how2code.md formulas      | Simple percentage        | Throttled pointer                  |
| **Animation Timing**   | setTimeout 2500ms         | CSS transition 0.6s      | card.holographic.animationDuration |
| **State Management**   | Local variables           | Local variables          | Svelte stores + context            |
| **Performance**        | 60fps target              | 60fps CSS transforms     | 60fps with throttle                |

---

## 3. Effect Types Reference

### Supported Effect Types (from how2code.md)

1. **basic** - Simple rainbow gradient with shimmer
2. **cosmic** - Galaxy effect with rotating conic gradients
3. **rainbow** - Full spectrum with radial overlays
4. **aurora** - Pastel northern lights effect
5. **neon** - Electric cyberpunk styling
6. **galaxy** - Deep space with star field
7. **secret** - Premium gold effect with patterns

---

## 4. Recommended Unified API

### Target: New `UnifiedHolographicCard` v2

```typescript
// Props Interface
interface UnifiedHolographicCardProps {
	// Required
	image: string;
	title: string;

	// Optional Content
	subtitle?: string;
	number?: string;
	team?: TeamId;
	rarity?: RarityType;

	// Holographic Settings
	effectType?: EffectType; // 'basic' | 'cosmic' | 'rainbow' | 'aurora' | 'neon' | 'galaxy' | 'secret'

	// Size & Display
	size?: 'small' | 'medium' | 'large' | 'featured';

	// Features
	enableFlip?: boolean; // default: true
	enableHolographic?: boolean; // default: true
	interactive?: boolean; // default: true
	animated?: boolean; // default: false (idle animation)

	// Metadata
	showMetadata?: boolean; // default: false
	showPerformance?: boolean; // default: false (dev only)

	// Events
	onflip?: (isFlipped: boolean) => void;
	onclick?: () => void;

	// Custom
	class?: string;
	backContent?: Snippet; // Custom back content
}

// Types
type TeamId =
	| 'lg'
	| 'doosan'
	| 'kt'
	| 'samsung'
	| 'nc'
	| 'kia'
	| 'lotte'
	| 'ssg'
	| 'hanwha'
	| 'kiwoom';
type RarityType = 'common' | 'rare' | 'epic' | 'legendary';
type EffectType = 'basic' | 'cosmic' | 'rainbow' | 'aurora' | 'neon' | 'galaxy' | 'secret';
type SizeType = 'small' | 'medium' | 'large' | 'featured';
```

### Size Configuration

```typescript
const SIZE_CONFIG = {
	small: { width: 200, height: 280 },
	medium: { width: 300, height: 420 },
	large: { width: 400, height: 560 },
	featured: { width: 600, height: 840 },
};
```

### Key Implementation Decisions

1. **Use how2code.md formulas** - Proven 60fps holographic math
2. **CSS Variables for 3D** - `--rx`, `--ry`, `--posx`, `--posy`
3. **Pointer Events API** - Unified mouse/touch handling
4. **Throttled updates** - 16ms throttle for 60fps
5. **Component composition** - CardFront/CardBack as children
6. **Context API** - For nested component communication
7. **Accessibility first** - WCAG 2.1 AA compliance

---

## 5. Migration Path

### Phase 1: Create New Unified Component

- Base: `src/lib/components/v2/UnifiedCard.svelte` structure
- Effects: `src/lib/holographic/HolographicCard.svelte` math
- API: New simplified props interface

### Phase 2: Migrate Pages

1. Gallery page (highest traffic)
2. Main page (user entry point)
3. Create page (core feature)
4. Community pages
5. Other pages

### Phase 3: Archive Old Components

- Move to `src/lib/components/_archived/`
- Keep for reference, remove from production

---

## 6. Files to Consolidate

### Primary (Merge into one)

- `src/lib/holographic/HolographicCard.svelte` - Effects logic
- `src/lib/components/v2/UnifiedCard.svelte` - Structure
- `src/lib/components/unified/UnifiedHolographicCard.svelte` - Context API

### Archive (Move to \_archived)

- `src/lib/components/HolographicCard.svelte`
- `src/lib/components/HolographicCardV2.svelte`
- `src/lib/components/PrototypeHolographicCard.svelte`
- `src/lib/components/EnhancedCard.svelte`
- `src/lib/components/Card2.svelte`
- `src/lib/components/CardProxy.svelte`
- `src/lib/components/CardProxy2.svelte`
- `src/lib/components/Cards.svelte`
- `src/lib/components/Cards_5c.svelte`

### Keep (Specialized)

- `src/lib/components/v2/CardFront.svelte`
- `src/lib/components/v2/CardBack.svelte`
- `src/lib/components/adapters/EnhancedCardAdapter.svelte`
- All domain-specific cards (gacha, stats, profile, etc.)

---

**END OF ANALYSIS**
