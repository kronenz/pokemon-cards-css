<script lang="ts">
	import HolographicCardV2 from '$lib/components/_archived/HolographicCardV2.svelte';
	import { KBO_TEAMS } from '$lib/data/kboTeams';

	// Sample card data
	const sampleCards = [
		{
			id: 'lg-player-1',
			frontImage: '/images/sample-card.jpg',
			title: 'LG 트윈스 선수카드',
			teamId: 'lg-twins',
			cardType: 'player' as const,
			rarity: 'rare holo',
			subtypes: '내야수',
			supertype: 'player',
		},
		{
			id: 'doosan-stadium-1',
			frontImage: '/images/sample-card.jpg',
			title: '잠실야구장',
			teamId: 'doosan-bears',
			cardType: 'stadium' as const,
			rarity: 'rare holo',
			subtypes: '홈구장',
			supertype: 'stadium',
		},
		{
			id: 'kia-moment-1',
			frontImage: '/images/sample-card.jpg',
			title: '2017 한국시리즈 우승',
			teamId: 'kia-tigers',
			cardType: 'moment' as const,
			rarity: 'rare holo',
			subtypes: '역사적 순간',
			supertype: 'moment',
		},
		{
			id: 'samsung-achievement-1',
			frontImage: '/images/sample-card.jpg',
			title: '8회 우승 달성',
			teamId: 'samsung-lions',
			cardType: 'achievement' as const,
			rarity: 'rare holo',
			subtypes: '팀 기록',
			supertype: 'achievement',
		},
	];

	function handleCardClick(event: CustomEvent) {
		console.log('Card clicked:', event.detail);
	}

	function handleCardHover(event: CustomEvent) {
		console.log('Card hover:', event.detail);
	}
</script>

<svelte:head>
	<title>KBO 홀로그래픽 카드 테스트</title>
	<meta
		name="description"
		content="KBO 팀별 홀로그래픽 효과가 적용된 카드 컴포넌트 테스트 페이지"
	/>
</svelte:head>

<main class="test-page">
	<div class="page-header">
		<h1>KBO 홀로그래픽 카드 테스트</h1>
		<p>각 KBO 구단의 고유 컬러와 효과가 적용된 홀로그래픽 카드를 확인해보세요</p>
	</div>

	<div class="cards-section">
		<h2>팀별 홀로그래픽 효과</h2>
		<div class="cards-grid">
			{#each sampleCards as card}
				<div class="card-showcase">
					<div class="card-container">
						<HolographicCardV2
							frontImage={card.frontImage}
							title={card.title}
							teamId={card.teamId}
							cardType={card.cardType}
							rarity={card.rarity}
							subtypes={card.subtypes}
							supertype={card.supertype}
							enableFlip={true}
							on:click={handleCardClick}
							on:hover={handleCardHover}
						/>
					</div>
					<div class="card-info">
						<h3>{card.title}</h3>
						<p class="team-name">{KBO_TEAMS.find((t) => t.id === card.teamId)?.name}</p>
						<p class="card-type">{card.cardType} · {card.rarity}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<div class="all-teams-section">
		<h2>전체 KBO 구단 카드</h2>
		<div class="teams-grid">
			{#each KBO_TEAMS as team}
				<div class="team-card-showcase">
					<div class="team-header" style="background-color: {team.colors.primary}">
						<h3>{team.name}</h3>
						<p>{team.city} · {team.stadium}</p>
					</div>
					<div class="team-card-container">
						<HolographicCardV2
							frontImage="/images/sample-card.jpg"
							title="{team.name} 선수카드"
							teamId={team.id}
							cardType="player"
							rarity="rare holo"
							subtypes="선수"
							supertype="player"
							enableFlip={false}
							on:click={handleCardClick}
							on:hover={handleCardHover}
						/>
					</div>
					<div class="team-info">
						<div class="team-colors">
							<div
								class="color-swatch"
								style="background-color: {team.colors.primary}"
								title="Primary"
							></div>
							<div
								class="color-swatch"
								style="background-color: {team.colors.secondary}"
								title="Secondary"
							></div>
							{#if team.colors.accent}
								<div
									class="color-swatch"
									style="background-color: {team.colors.accent}"
									title="Accent"
								></div>
							{/if}
						</div>
						<p class="team-achievements">
							{#if team.achievements.championships > 0}
								🏆 {team.achievements.championships}회 우승
							{:else}
								우승 도전 중
							{/if}
						</p>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<div class="card-types-section">
		<h2>카드 타입별 효과</h2>
		<div class="types-grid">
			<div class="type-showcase">
				<h3>선수 카드 (Player)</h3>
				<div class="type-card-container">
					<HolographicCardV2
						frontImage="/images/sample-card.jpg"
						title="선수 카드"
						teamId="lg-twins"
						cardType="player"
						rarity="rare holo"
						enableFlip={false}
					/>
				</div>
				<p>선수 개인의 성과와 기록을 담은 카드</p>
			</div>

			<div class="type-showcase">
				<h3>구장 카드 (Stadium)</h3>
				<div class="type-card-container">
					<HolographicCardV2
						frontImage="/images/sample-card.jpg"
						title="구장 카드"
						teamId="doosan-bears"
						cardType="stadium"
						rarity="rare holo"
						enableFlip={false}
					/>
				</div>
				<p>야구장의 특별한 순간과 분위기를 담은 카드</p>
			</div>

			<div class="type-showcase">
				<h3>순간 카드 (Moment)</h3>
				<div class="type-card-container">
					<HolographicCardV2
						frontImage="/images/sample-card.jpg"
						title="순간 카드"
						teamId="kia-tigers"
						cardType="moment"
						rarity="rare holo"
						enableFlip={false}
					/>
				</div>
				<p>역사적인 순간과 감동적인 장면을 담은 카드</p>
			</div>

			<div class="type-showcase">
				<h3>업적 카드 (Achievement)</h3>
				<div class="type-card-container">
					<HolographicCardV2
						frontImage="/images/sample-card.jpg"
						title="업적 카드"
						teamId="samsung-lions"
						cardType="achievement"
						rarity="rare holo"
						enableFlip={false}
					/>
				</div>
				<p>팀과 선수의 위대한 업적을 기념하는 카드</p>
			</div>
		</div>
	</div>
</main>

<style>
	.test-page {
		min-height: 100vh;
		background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
		padding: 40px 20px;
	}

	.page-header {
		text-align: center;
		margin-bottom: 60px;
	}

	.page-header h1 {
		font-size: 36px;
		font-weight: 700;
		color: #1a1a1a;
		margin: 0 0 16px 0;
	}

	.page-header p {
		font-size: 18px;
		color: #6b7280;
		margin: 0;
		max-width: 600px;
		margin: 0 auto;
		line-height: 1.6;
	}

	.cards-section,
	.all-teams-section,
	.card-types-section {
		max-width: 1200px;
		margin: 0 auto 80px auto;
	}

	.cards-section h2,
	.all-teams-section h2,
	.card-types-section h2 {
		font-size: 28px;
		font-weight: 600;
		color: #1a1a1a;
		margin: 0 0 32px 0;
		text-align: center;
	}

	.cards-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 32px;
	}

	.card-showcase {
		background: white;
		border-radius: 16px;
		padding: 24px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
		text-align: center;
		transition: transform 0.2s ease;
	}

	.card-showcase:hover {
		transform: translateY(-4px);
	}

	.card-container {
		width: 200px;
		height: 280px;
		margin: 0 auto 20px auto;
	}

	.card-info h3 {
		font-size: 18px;
		font-weight: 600;
		color: #1a1a1a;
		margin: 0 0 8px 0;
	}

	.team-name {
		font-size: 16px;
		font-weight: 500;
		color: #3b82f6;
		margin: 0 0 4px 0;
	}

	.card-type {
		font-size: 14px;
		color: #6b7280;
		margin: 0;
	}

	.teams-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 24px;
	}

	.team-card-showcase {
		background: white;
		border-radius: 16px;
		overflow: hidden;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
		transition: transform 0.2s ease;
	}

	.team-card-showcase:hover {
		transform: translateY(-2px);
	}

	.team-header {
		padding: 16px;
		color: white;
		text-align: center;
	}

	.team-header h3 {
		font-size: 16px;
		font-weight: 600;
		margin: 0 0 4px 0;
	}

	.team-header p {
		font-size: 12px;
		margin: 0;
		opacity: 0.9;
	}

	.team-card-container {
		padding: 20px;
		display: flex;
		justify-content: center;
	}

	.team-card-container :global(.card) {
		width: 120px;
		height: 168px;
	}

	.team-info {
		padding: 16px;
		border-top: 1px solid #e5e7eb;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.team-colors {
		display: flex;
		gap: 4px;
	}

	.color-swatch {
		width: 16px;
		height: 16px;
		border-radius: 50%;
		border: 1px solid rgba(0, 0, 0, 0.1);
	}

	.team-achievements {
		font-size: 12px;
		color: #6b7280;
		margin: 0;
	}

	.types-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
		gap: 32px;
	}

	.type-showcase {
		background: white;
		border-radius: 16px;
		padding: 24px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
		text-align: center;
	}

	.type-showcase h3 {
		font-size: 18px;
		font-weight: 600;
		color: #1a1a1a;
		margin: 0 0 16px 0;
	}

	.type-card-container {
		width: 160px;
		height: 224px;
		margin: 0 auto 16px auto;
	}

	.type-showcase p {
		font-size: 14px;
		color: #6b7280;
		margin: 0;
		line-height: 1.5;
	}

	/* 반응형 디자인 */
	@media (max-width: 768px) {
		.test-page {
			padding: 20px 16px;
		}

		.page-header h1 {
			font-size: 28px;
		}

		.page-header p {
			font-size: 16px;
		}

		.cards-grid,
		.teams-grid,
		.types-grid {
			grid-template-columns: 1fr;
			gap: 20px;
		}

		.card-container {
			width: 160px;
			height: 224px;
		}

		.team-card-container :global(.card) {
			width: 100px;
			height: 140px;
		}

		.type-card-container {
			width: 140px;
			height: 196px;
		}
	}
</style>
