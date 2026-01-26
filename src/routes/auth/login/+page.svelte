<script lang="ts">
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import UnifiedCard from '$lib/components/v2/UnifiedCard.svelte';
	import { authService } from '$lib/services/authService';

	let email = '';
	let password = '';
	let error = '';
	let loading = false;
	let rememberMe = false;

	async function handleSubmit() {
		error = '';
		loading = true;

		try {
			if (!email || !password) {
				throw new Error('이메일과 비밀번호를 입력하세요.');
			}

			const user = await authService.signInWithEmail(email, password);

			if (!user) {
				let errorMsg = '로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.';
				authService.error.subscribe((err) => {
					if (err) {
						errorMsg = err.message || errorMsg;
					}
				})();
				throw new Error(errorMsg);
			}

			if (rememberMe && browser) {
				localStorage.setItem('rememberMe', 'true');
			}

			goto('/');
		} catch (err: any) {
			console.error('Login error:', err);
			error = err.message || '로그인에 실패했습니다.';
		} finally {
			loading = false;
		}
	}

	async function handleOAuth(provider: 'google' | 'github') {
		error = '';
		loading = true;

		try {
			await authService.signInWithOAuth(provider);
		} catch (err: any) {
			error = `${provider} 로그인에 실패했습니다.`;
			loading = false;
		}
	}
</script>

<div class="login-page">
	<!-- Left: Holographic Card Animation -->
	<div class="card-showcase">
		<div class="showcase-content">
			<h1 class="brand-title">홀로그래픽 카드 플랫폼</h1>
			<p class="brand-subtitle">나만의 프리미엄 카드 컬렉션을 시작하세요</p>

			<div class="demo-card">
				<UnifiedCard
					title="홀로그래픽"
					subtitle="프리미엄 카드"
					number="001"
					team="lg"
					rarity="legendary"
					image="https://picsum.photos/400/560?random=login"
					size="large"
					effectType="rainbow"
				/>
			</div>

			<div class="features">
				<div class="feature-item">
					<span class="feature-icon">✨</span>
					<span class="feature-text">60fps 홀로그래픽 효과</span>
				</div>
				<div class="feature-item">
					<span class="feature-icon">⚾</span>
					<span class="feature-text">한국프로야구 공식 카드</span>
				</div>
				<div class="feature-item">
					<span class="feature-icon">🤝</span>
					<span class="feature-text">커뮤니티와 공유</span>
				</div>
			</div>
		</div>
	</div>

	<!-- Right: Login Form -->
	<div class="form-container">
		<div class="form-wrapper">
			<div class="form-header">
				<h2 class="form-title">로그인</h2>
				<p class="form-subtitle">계정에 로그인하세요</p>
			</div>

			<div class="form-content">
				<!-- OAuth Buttons -->
				<div class="oauth-section">
					<button
						type="button"
						class="oauth-button google"
						on:click={() => handleOAuth('google')}
						disabled={loading}
					>
						<svg class="oauth-icon" viewBox="0 0 24 24">
							<path
								fill="#4285F4"
								d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
							/>
							<path
								fill="#34A853"
								d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
							/>
							<path
								fill="#FBBC05"
								d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
							/>
							<path
								fill="#EA4335"
								d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
							/>
						</svg>
						<span>Google로 계속하기</span>
					</button>

					<button
						type="button"
						class="oauth-button github"
						on:click={() => handleOAuth('github')}
						disabled={loading}
					>
						<svg class="oauth-icon" viewBox="0 0 24 24" fill="currentColor">
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"
							/>
						</svg>
						<span>GitHub로 계속하기</span>
					</button>
				</div>

				<div class="divider">
					<span class="divider-text">또는 이메일로 로그인</span>
				</div>

				<!-- Email Login Form -->
				<form on:submit|preventDefault={handleSubmit}>
					<div class="form-fields">
						<div class="form-field">
							<label for="email" class="field-label">이메일</label>
							<input
								id="email"
								type="email"
								bind:value={email}
								placeholder="your@email.com"
								disabled={loading}
								class="field-input"
								autocomplete="email"
								required
							/>
						</div>

						<div class="form-field">
							<label for="password" class="field-label">
								<span>비밀번호</span>
								<a href="/forgot-password" class="forgot-link">비밀번호를 잊으셨나요?</a>
							</label>
							<input
								id="password"
								type="password"
								bind:value={password}
								placeholder="••••••••"
								disabled={loading}
								class="field-input"
								autocomplete="current-password"
								required
							/>
						</div>

						<div class="remember-field">
							<label class="remember-label">
								<input type="checkbox" bind:checked={rememberMe} disabled={loading} />
								<span>로그인 상태 유지</span>
							</label>
						</div>
					</div>

					{#if error}
						<div class="error-message">{error}</div>
					{/if}

					<button type="submit" class="submit-button" disabled={loading}>
						{#if loading}
							<span class="loading-spinner"></span>
							<span>로그인 중...</span>
						{:else}
							<span>로그인</span>
						{/if}
					</button>
				</form>
			</div>

			<div class="form-footer">
				<p class="footer-text">
					계정이 없으신가요?
					<a href="/register" class="footer-link">회원가입</a>
				</p>
			</div>
		</div>
	</div>
</div>

<style>
	.login-page {
		display: grid;
		grid-template-columns: 1fr 1fr;
		min-height: 100vh;
		background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
		overflow: hidden;
	}

	/* Left: Card Showcase */
	.card-showcase {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 60px;
		position: relative;
	}

	.showcase-content {
		max-width: 500px;
		text-align: center;
	}

	.brand-title {
		font-size: 48px;
		font-weight: 800;
		background: linear-gradient(135deg, #667eea, #764ba2, #f093fb);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		margin: 0 0 16px 0;
		line-height: 1.2;
	}

	.brand-subtitle {
		font-size: 20px;
		color: rgba(255, 255, 255, 0.7);
		margin: 0 0 60px 0;
	}

	.demo-card {
		margin: 0 auto 48px;
		display: flex;
		justify-content: center;
	}

	.features {
		display: flex;
		flex-direction: column;
		gap: 20px;
		margin-top: 48px;
	}

	.feature-item {
		display: flex;
		align-items: center;
		gap: 16px;
		padding: 16px 24px;
		background: rgba(255, 255, 255, 0.05);
		border-radius: 12px;
		backdrop-filter: blur(10px);
		border: 1px solid rgba(255, 255, 255, 0.1);
	}

	.feature-icon {
		font-size: 24px;
	}

	.feature-text {
		font-size: 16px;
		color: rgba(255, 255, 255, 0.8);
		font-weight: 600;
	}

	/* Right: Form Container */
	.form-container {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 60px;
		background: rgba(255, 255, 255, 0.02);
		backdrop-filter: blur(20px);
		border-left: 1px solid rgba(255, 255, 255, 0.1);
		overflow-y: auto;
	}

	.form-wrapper {
		width: 100%;
		max-width: 460px;
	}

	.form-header {
		text-align: center;
		margin-bottom: 40px;
	}

	.form-title {
		font-size: 36px;
		font-weight: 700;
		color: white;
		margin: 0 0 8px 0;
	}

	.form-subtitle {
		font-size: 16px;
		color: rgba(255, 255, 255, 0.6);
		margin: 0;
	}

	.form-content {
		animation: fadeIn 0.3s ease;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* OAuth Section */
	.oauth-section {
		display: flex;
		flex-direction: column;
		gap: 10px;
		margin-bottom: 24px;
	}

	.oauth-button {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
		padding: 12px 20px;
		border: 1px solid rgba(255, 255, 255, 0.15);
		border-radius: 10px;
		background: rgba(255, 255, 255, 0.08);
		color: white;
		font-size: 14px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s ease;
		backdrop-filter: blur(10px);
	}

	.oauth-button:hover:not(:disabled) {
		background: rgba(255, 255, 255, 0.12);
		border-color: rgba(255, 255, 255, 0.25);
		transform: translateY(-2px);
	}

	.oauth-button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.oauth-icon {
		width: 18px;
		height: 18px;
	}

	/* Divider */
	.divider {
		position: relative;
		text-align: center;
		margin: 24px 0;
	}

	.divider::before {
		content: '';
		position: absolute;
		top: 50%;
		left: 0;
		right: 0;
		height: 1px;
		background: rgba(255, 255, 255, 0.1);
	}

	.divider-text {
		position: relative;
		padding: 0 12px;
		background: rgba(255, 255, 255, 0.02);
		color: rgba(255, 255, 255, 0.5);
		font-size: 13px;
	}

	/* Form Fields */
	.form-fields {
		display: flex;
		flex-direction: column;
		gap: 18px;
		margin-bottom: 20px;
	}

	.form-field {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.field-label {
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 14px;
		font-weight: 600;
		color: rgba(255, 255, 255, 0.9);
	}

	.forgot-link {
		font-size: 13px;
		color: #667eea;
		text-decoration: none;
		font-weight: 600;
		transition: color 0.2s ease;
	}

	.forgot-link:hover {
		color: #764ba2;
		text-decoration: underline;
	}

	.field-input {
		padding: 12px 14px;
		background: rgba(255, 255, 255, 0.08);
		border: 1px solid rgba(255, 255, 255, 0.15);
		border-radius: 8px;
		color: white;
		font-size: 14px;
		transition: all 0.2s ease;
		backdrop-filter: blur(10px);
		font-family: inherit;
	}

	.field-input::placeholder {
		color: rgba(255, 255, 255, 0.4);
	}

	.field-input:focus {
		outline: none;
		background: rgba(255, 255, 255, 0.12);
		border-color: #667eea;
		box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
	}

	.field-input:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	/* Remember Me */
	.remember-field {
		margin-top: 4px;
	}

	.remember-label {
		display: flex;
		align-items: center;
		gap: 10px;
		cursor: pointer;
		font-size: 14px;
		color: rgba(255, 255, 255, 0.8);
	}

	.remember-label input[type='checkbox'] {
		width: 18px;
		height: 18px;
		cursor: pointer;
		accent-color: #667eea;
	}

	/* Error Message */
	.error-message {
		padding: 12px 16px;
		background: rgba(239, 68, 68, 0.1);
		border: 1px solid rgba(239, 68, 68, 0.3);
		border-radius: 8px;
		color: #fca5a5;
		font-size: 13px;
		text-align: center;
		margin-bottom: 16px;
	}

	/* Submit Button */
	.submit-button {
		width: 100%;
		padding: 14px 20px;
		border: none;
		border-radius: 10px;
		background: linear-gradient(135deg, #667eea, #764ba2);
		color: white;
		font-size: 15px;
		font-weight: 700;
		cursor: pointer;
		transition: all 0.2s ease;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3);
	}

	.submit-button:hover:not(:disabled) {
		transform: translateY(-2px);
		box-shadow: 0 6px 30px rgba(102, 126, 234, 0.4);
	}

	.submit-button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.loading-spinner {
		width: 16px;
		height: 16px;
		border: 2px solid rgba(255, 255, 255, 0.3);
		border-top-color: white;
		border-radius: 50%;
		animation: spin 0.6s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	/* Footer */
	.form-footer {
		margin-top: 32px;
		text-align: center;
	}

	.footer-text {
		font-size: 14px;
		color: rgba(255, 255, 255, 0.6);
		margin: 0;
	}

	.footer-link {
		color: #667eea;
		text-decoration: none;
		font-weight: 700;
		transition: color 0.2s ease;
	}

	.footer-link:hover {
		color: #764ba2;
		text-decoration: underline;
	}

	/* Responsive */
	@media (max-width: 1200px) {
		.login-page {
			grid-template-columns: 1fr;
		}

		.card-showcase {
			display: none;
		}

		.form-container {
			border-left: none;
			padding: 40px 24px;
		}
	}

	@media (max-width: 768px) {
		.form-title {
			font-size: 28px;
		}

		.oauth-section {
			gap: 8px;
		}

		.oauth-button {
			padding: 10px 16px;
			font-size: 13px;
		}
	}
</style>
