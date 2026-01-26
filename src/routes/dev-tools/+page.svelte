<script lang="ts">
	// Dev Tools Index Page
	// Provides navigation to all development and testing pages

	const demos = [
		{
			name: 'Advanced Editor',
			path: '/dev-tools/demos/advanced-editor-demo',
			description: 'Advanced card editor features',
		},
		{
			name: 'Apple Social',
			path: '/dev-tools/demos/apple-social-demo',
			description: 'Apple-style social interactions',
		},
		{ name: 'Auth', path: '/dev-tools/demos/auth-demo', description: 'Authentication flow demo' },
		{
			name: 'Community',
			path: '/dev-tools/demos/community-demo',
			description: 'Community features demo',
		},
		{ name: 'Demo', path: '/dev-tools/demos/demo', description: 'General demo page' },
		{
			name: 'Enhanced Card',
			path: '/dev-tools/demos/enhanced-card-demo',
			description: 'Enhanced card effects',
		},
		{
			name: 'Holographic V2',
			path: '/dev-tools/demos/holographic-v2-demo',
			description: 'Holographic card V2',
		},
		{ name: 'KBO', path: '/dev-tools/demos/kbo-demo', description: 'KBO baseball cards' },
		{
			name: 'KBO Glory',
			path: '/dev-tools/demos/kbo-glory-demo',
			description: 'KBO glory moments',
		},
		{
			name: 'Messaging',
			path: '/dev-tools/demos/messaging-demo',
			description: 'Real-time messaging',
		},
		{
			name: 'Notification',
			path: '/dev-tools/demos/notification-demo',
			description: 'Notification system',
		},
		{ name: 'OAuth', path: '/dev-tools/demos/oauth-demo', description: 'OAuth authentication' },
		{
			name: 'Prototype',
			path: '/dev-tools/demos/prototype-demo',
			description: 'Prototype features',
		},
		{
			name: 'Realtime Preview',
			path: '/dev-tools/demos/realtime-preview-demo',
			description: 'Real-time card preview',
		},
		{ name: 'Social', path: '/dev-tools/demos/social-demo', description: 'Social features' },
		{
			name: 'Touch Integration',
			path: '/dev-tools/demos/touch-integration-demo',
			description: 'Touch gesture integration',
		},
		{
			name: 'User Management',
			path: '/dev-tools/demos/user-management-demo',
			description: 'User management features',
		},
	];

	const tests = [
		{
			name: 'Back Holographic',
			path: '/dev-tools/tests/back-holographic-test',
			description: 'Card back holographic effect',
		},
		{
			name: 'Enhanced Card Integration',
			path: '/dev-tools/tests/enhanced-card-integration-test',
			description: 'Enhanced card integration',
		},
		{
			name: 'Enhanced Card',
			path: '/dev-tools/tests/enhanced-card-test',
			description: 'Enhanced card features',
		},
		{ name: 'Enhanced', path: '/dev-tools/tests/enhanced-test', description: 'Enhanced effects' },
		{ name: 'Flip', path: '/dev-tools/tests/flip-test', description: 'Card flip animation' },
		{
			name: 'Multimedia',
			path: '/dev-tools/tests/multimedia-test',
			description: 'Multimedia support',
		},
		{
			name: 'Performance',
			path: '/dev-tools/tests/performance-test',
			description: 'Performance benchmarks',
		},
		{ name: 'Test', path: '/dev-tools/tests/test', description: 'General test page' },
		{
			name: 'Touch Integration',
			path: '/dev-tools/tests/touch-integration-test',
			description: 'Touch event testing',
		},
		{
			name: 'Visual Feedback',
			path: '/dev-tools/tests/visual-feedback-test',
			description: 'Visual feedback effects',
		},
	];

	const archives = [
		{
			name: 'Test KBO Cards',
			path: '/dev-tools/archive/test-kbo-cards',
			description: 'Legacy KBO cards test',
		},
		{
			name: 'V2 Prototype',
			path: '/dev-tools/archive/v2-prototype',
			description: 'V2 prototype (archived)',
		},
	];
</script>

<svelte:head>
	<title>Dev Tools | Holographic Card Platform</title>
</svelte:head>

<div class="min-h-screen bg-gray-900 text-white p-8">
	<div class="max-w-6xl mx-auto">
		<header class="mb-12">
			<h1 class="text-4xl font-bold mb-2">Dev Tools</h1>
			<p class="text-gray-400">Development and testing pages for the Holographic Card Platform</p>
			<a href="/" class="text-blue-400 hover:text-blue-300 mt-4 inline-block">&larr; Back to Main</a
			>
		</header>

		<!-- Demos Section -->
		<section class="mb-12">
			<h2 class="text-2xl font-semibold mb-6 text-green-400">Demos ({demos.length})</h2>
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{#each demos as demo}
					<a
						href={demo.path}
						class="block p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors border border-gray-700 hover:border-green-500"
					>
						<h3 class="font-medium text-green-400">{demo.name}</h3>
						<p class="text-sm text-gray-400 mt-1">{demo.description}</p>
					</a>
				{/each}
			</div>
		</section>

		<!-- Tests Section -->
		<section class="mb-12">
			<h2 class="text-2xl font-semibold mb-6 text-yellow-400">Tests ({tests.length})</h2>
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{#each tests as test}
					<a
						href={test.path}
						class="block p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors border border-gray-700 hover:border-yellow-500"
					>
						<h3 class="font-medium text-yellow-400">{test.name}</h3>
						<p class="text-sm text-gray-400 mt-1">{test.description}</p>
					</a>
				{/each}
			</div>
		</section>

		<!-- Archives Section -->
		<section class="mb-12">
			<h2 class="text-2xl font-semibold mb-6 text-red-400">Archives ({archives.length})</h2>
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{#each archives as archive}
					<a
						href={archive.path}
						class="block p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors border border-gray-700 hover:border-red-500"
					>
						<h3 class="font-medium text-red-400">{archive.name}</h3>
						<p class="text-sm text-gray-400 mt-1">{archive.description}</p>
					</a>
				{/each}
			</div>
		</section>

		<!-- Stats -->
		<footer class="mt-12 pt-8 border-t border-gray-700">
			<div class="flex gap-8 text-sm text-gray-400">
				<span>Total Pages: {demos.length + tests.length + archives.length}</span>
				<span>Demos: {demos.length}</span>
				<span>Tests: {tests.length}</span>
				<span>Archives: {archives.length}</span>
			</div>
		</footer>
	</div>
</div>
