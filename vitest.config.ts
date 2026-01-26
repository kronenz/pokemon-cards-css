import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
		exclude: [
			'node_modules/**',
			'**/node_modules/**',
			'src/lib/components/__tests__/*.integration.test.ts',
			'src/lib/__tests__/*.e2e.test.ts',
			'src/lib/components/__tests__/*.crossbrowser.test.ts',
			'src/lib/components/__tests__/*.performance.test.ts',
			'src/lib/utils/__tests__/*.integration.test.ts',
			'src/lib/services/__tests__/*.integration.test.ts',
			'src/lib/services/__tests__/authService.test.ts',
			'src/lib/utils/__tests__/crossBrowserCompatibility.test.ts',
			'src/lib/utils/__tests__/integration.final.test.ts',
		],
		environment: 'jsdom',
		setupFiles: ['src/lib/holographic/__tests__/setup.ts'],
		globals: true,
		coverage: {
			reporter: ['text', 'json', 'html'],
			exclude: [
				'node_modules/',
				'src/lib/holographic/__tests__/',
				'**/*.d.ts',
				'**/*.config.*',
				'**/coverage/**',
			],
		},
	},
});
