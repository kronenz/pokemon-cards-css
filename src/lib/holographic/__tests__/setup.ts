/**
 * Vitest 테스트 설정
 * Task 1.4 Implementation
 */

import { vi } from 'vitest';

// DOM 환경 설정
Object.defineProperty(window, 'matchMedia', {
	writable: true,
	value: vi.fn().mockImplementation((query) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: vi.fn(),
		removeListener: vi.fn(),
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		dispatchEvent: vi.fn(),
	})),
});

// ResizeObserver Mock
global.ResizeObserver = vi.fn().mockImplementation(() => ({
	observe: vi.fn(),
	unobserve: vi.fn(),
	disconnect: vi.fn(),
}));

// IntersectionObserver Mock
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
	observe: vi.fn(),
	unobserve: vi.fn(),
	disconnect: vi.fn(),
}));

// CSS.supports Mock - writable so tests can override
Object.defineProperty(window, 'CSS', {
	value: {
		supports: vi.fn((property: string, value: string) => {
			const supportedProperties = [
				'transform',
				'filter',
				'backdrop-filter',
				'mix-blend-mode',
				'animation',
				'background',
				'opacity',
			];

			const supportedBlendModes = [
				'normal',
				'multiply',
				'screen',
				'overlay',
				'color-dodge',
				'plus-lighter',
			];

			if (property === 'mix-blend-mode') {
				return supportedBlendModes.includes(value);
			}

			return supportedProperties.some((prop) => property.includes(prop));
		}),
	},
	writable: true,
	configurable: true,
});

// Also on global for tests that use global.CSS
(global as any).CSS = (window as any).CSS;

// Performance API Mock
Object.defineProperty(window, 'performance', {
	value: {
		now: vi.fn(() => Date.now()),
	},
});

// RequestAnimationFrame Mock - track IDs for proper cleanup
let rafId = 0;
const rafCallbacks = new Map<number, ReturnType<typeof setTimeout>>();

global.requestAnimationFrame = vi.fn((cb: FrameRequestCallback) => {
	const id = ++rafId;
	const timeoutId = setTimeout(() => {
		rafCallbacks.delete(id);
		cb(performance.now());
	}, 16);
	rafCallbacks.set(id, timeoutId);
	return id;
});

global.cancelAnimationFrame = vi.fn((id: number) => {
	const timeoutId = rafCallbacks.get(id);
	if (timeoutId) {
		clearTimeout(timeoutId);
		rafCallbacks.delete(id);
	}
});

// Also define on window for jsdom compatibility
Object.defineProperty(window, 'requestAnimationFrame', {
	value: global.requestAnimationFrame,
	writable: true,
	configurable: true,
});

Object.defineProperty(window, 'cancelAnimationFrame', {
	value: global.cancelAnimationFrame,
	writable: true,
	configurable: true,
});

// Navigator Mock
Object.defineProperty(navigator, 'deviceMemory', {
	value: 4,
	configurable: true,
});

Object.defineProperty(navigator, 'hardwareConcurrency', {
	value: 4,
	configurable: true,
});

Object.defineProperty(navigator, 'vibrate', {
	value: vi.fn(),
	configurable: true,
});

// Touch Events Mock
global.TouchEvent = class TouchEvent extends Event {
	touches: Touch[];
	changedTouches: Touch[];

	constructor(type: string, eventInitDict?: TouchEventInit) {
		super(type, eventInitDict);
		this.touches = eventInitDict?.touches || [];
		this.changedTouches = eventInitDict?.changedTouches || [];
	}
} as any;

// Touch detection - use global to avoid jsdom teardown issues with window properties
// jsdom tries to delete window properties on teardown, causing errors if not configurable
(global as any).isTouchDevice = true;
(global as any).maxTouchPoints = 5;

// Console 경고 억제 (테스트 중 불필요한 로그 제거)
const originalWarn = console.warn;
console.warn = (...args) => {
	if (args[0]?.includes?.('SvelteKit') || args[0]?.includes?.('Svelte')) {
		return;
	}
	originalWarn(...args);
};

// 테스트 환경에서 에러 처리
process.on('unhandledRejection', (reason, promise) => {
	console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

beforeEach(() => {
	document.body.innerHTML = '';
	document.head.innerHTML = '';
	vi.clearAllMocks();
});

afterEach(() => {
	rafCallbacks.forEach((timeoutId) => clearTimeout(timeoutId));
	rafCallbacks.clear();
	rafId = 0;
});
