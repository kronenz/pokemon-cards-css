<script lang="ts">
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import UnifiedCard from '$lib/components/v2/UnifiedCard.svelte';
	import { authService } from '$lib/services/authService';
	import { scrollFadeUp, scrollFadeLeft, scrollScale } from '$lib/transitions/scroll-animations';

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

	// Step management
	let currentStep = 1;
	const totalSteps = 3;

	// Form data
	let name = '';
	let email = '';
	let password = '';
	let passwordConfirm = '';
	let agreedToTerms = false;
	let agreedToPrivacy = false;
	let agreedToMarketing = false;

	// Optional profile data
	let favoriteTeam: TeamId | null = null;
	let bio = '';
	let profileImage: string | null = null;

	// State
	let error = '';
	let loading = false;

	// Password strength
	let passwordStrength: 'weak' | 'medium' | 'strong' = 'weak';

	// Teams data
	const teams: { id: TeamId; name: string; color: string }[] = [
		{ id: 'lg', name: 'LG 트윈스', color: '#C30452' },
		{ id: 'doosan', name: '두산 베어스', color: '#131230' },
		{ id: 'kt', name: 'KT 위즈', color: '#000000' },
		{ id: 'samsung', name: '삼성 라이온즈', color: '#074CA1' },
		{ id: 'nc', name: 'NC 다이노스', color: '#315288' },
		{ id: 'kia', name: 'KIA 타이거즈', color: '#EA0029' },
		{ id: 'lotte', name: '롯데 자이언츠', color: '#041E42' },
		{ id: 'ssg', name: 'SSG 랜더스', color: '#CE0E2D' },
		{ id: 'hanwha', name: '한화 이글스', color: '#FF6600' },
		{ id: 'kiwoom', name: '키움 히어로즈', color: '#570514' },
	];

	// Password strength calculation
	$: {
		if (password.length < 8) {
			passwordStrength = 'weak';
		} else if (password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password)) {
			if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
				passwordStrength = 'strong';
			} else {
				passwordStrength = 'medium';
			}
		} else {
			passwordStrength = 'weak';
		}
	}

	function validateStep1(): boolean {
		if (!name || name.length < 2) {
			error = '이름은 2자 이상 입력해주세요.';
			return false;
		}
		if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			error = '올바른 이메일 주소를 입력해주세요.';
			return false;
		}
		if (!password || password.length < 8) {
			error = '비밀번호는 8자 이상이어야 합니다.';
			return false;
		}
		if (password !== passwordConfirm) {
			error = '비밀번호가 일치하지 않습니다.';
			return false;
		}
		if (passwordStrength === 'weak') {
			error = '비밀번호가 너무 약합니다. 대소문자, 숫자, 특수문자를 조합하세요.';
			return false;
		}
		error = '';
		return true;
	}

	function validateStep3(): boolean {
		if (!agreedToTerms) {
			error = '이용약관에 동의해주세요.';
			return false;
		}
		if (!agreedToPrivacy) {
			error = '개인정보처리방침에 동의해주세요.';
			return false;
		}
		error = '';
		return true;
	}

	function nextStep() {
		if (currentStep === 1) {
			if (!validateStep1()) return;
		}
		if (currentStep < totalSteps) {
			currentStep++;
		}
	}

	function prevStep() {
		if (currentStep > 1) {
			currentStep--;
			error = '';
		}
	}

	function handleFileUpload(event: Event) {
		const target = event.target as HTMLInputElement;
		const file = target.files?.[0];
		if (!file) return;

		if (file.size > 5 * 1024 * 1024) {
			error = '파일 크기는 5MB를 초과할 수 없습니다.';
			return;
		}

		const reader = new FileReader();
		reader.onload = (e) => {
			profileImage = e.target?.result as string;
		};
		reader.readAsDataURL(file);
	}

	async function handleSubmit() {
		if (!validateStep3()) return;

		error = '';
		loading = true;

		try {
			const user = await authService.signUpWithEmail(email, password, name);

			if (!user) {
				let errorMsg = '회원가입에 실패했습니다.';
				authService.error.subscribe((err) => {
					if (err) {
						errorMsg = err.message || errorMsg;
					}
				})();
				throw new Error(errorMsg);
			}

			// Update profile with optional data
			if (favoriteTeam || bio) {
				try {
					await new Promise((resolve) => setTimeout(resolve, 500));
					const selectedTeam = teams.find((t) => t.id === favoriteTeam);
					await authService.updateProfile({
						bio: bio || undefined,
						favoriteTeam: selectedTeam
							? {
									id: selectedTeam.id,
									name: selectedTeam.name,
									englishName: selectedTeam.name,
									city: '',
									stadium: '',
									founded: 0,
									colors: { primary: selectedTeam.color, secondary: selectedTeam.color },
									mascot: '',
									fanClubName: '',
									cheers: [],
									achievements: { championships: 0 },
								}
							: undefined,
					});
				} catch (updateError: any) {
					console.error('Failed to update profile:', updateError);
				}
			}

			goto('/');
		} catch (err: any) {
			console.error('Signup error:', err);
			error = err.message || '회원가입에 실패했습니다.';
			currentStep = 1;
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
			error = `${provider} 회원가입에 실패했습니다.`;
			loading = false;
		}
	}
</script>

<div class="register-page">
	<!-- Left: Holographic Card Animation -->
	<div class="card-showcase">
		<div class="showcase-content">
			<h1 class="brand-title" use:scrollFadeUp={{ duration: 700 }}>홀로그래픽 카드 플랫폼</h1>
			<p class="brand-subtitle" use:scrollFadeUp={{ duration: 600, delay: 100 }}>
				지금 바로 시작하세요
			</p>

			<div class="demo-card" use:scrollScale={{ duration: 800, delay: 200 }}>
				<UnifiedCard
					title="환영합니다"
					subtitle="새로운 여정의 시작"
					number="001"
					team="kia"
					rarity="epic"
					image="https://picsum.photos/400/560?random=register"
					size="large"
					effectType="cosmic"
				/>
			</div>

			<div class="step-progress" use:scrollFadeUp={{ duration: 500, delay: 300 }}>
				<div class="progress-bar">
					<div class="progress-fill" style="width: {(currentStep / totalSteps) * 100}%"></div>
				</div>
				<p class="progress-text">단계 {currentStep} / {totalSteps}</p>
			</div>
		</div>
	</div>

	<!-- Right: Registration Form -->
	<div class="form-container">
		<div class="form-wrapper">
			<div class="form-header" use:scrollFadeLeft={{ duration: 600 }}>
				<h2 class="form-title">회원가입</h2>
				<p class="form-subtitle">홀로그래픽 카드와 함께하세요</p>
			</div>

			{#if currentStep === 1}
				<!-- Step 1: Basic Information -->
				<div class="form-step">
					<div class="step-title">기본 정보</div>

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
							<span>Google로 빠른 가입</span>
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
							<span>GitHub로 빠른 가입</span>
						</button>
					</div>

					<div class="divider">
						<span class="divider-text">또는 이메일로 가입</span>
					</div>

					<div class="form-fields">
						<div class="form-field">
							<label for="name" class="field-label">이름 (닉네임)</label>
							<input
								id="name"
								type="text"
								bind:value={name}
								placeholder="홍길동"
								disabled={loading}
								class="field-input"
							/>
						</div>

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
							/>
						</div>

						<div class="form-field">
							<label for="password" class="field-label">비밀번호</label>
							<input
								id="password"
								type="password"
								bind:value={password}
								placeholder="••••••••"
								disabled={loading}
								class="field-input"
								autocomplete="new-password"
							/>
							{#if password}
								<div class="password-strength">
									<div class="strength-bar">
										<div
											class="strength-fill"
											class:weak={passwordStrength === 'weak'}
											class:medium={passwordStrength === 'medium'}
											class:strong={passwordStrength === 'strong'}
										></div>
									</div>
									<span class="strength-label">
										{passwordStrength === 'weak'
											? '약함'
											: passwordStrength === 'medium'
												? '보통'
												: '강함'}
									</span>
								</div>
							{/if}
						</div>

						<div class="form-field">
							<label for="passwordConfirm" class="field-label">비밀번호 확인</label>
							<input
								id="passwordConfirm"
								type="password"
								bind:value={passwordConfirm}
								placeholder="••••••••"
								disabled={loading}
								class="field-input"
								autocomplete="new-password"
							/>
						</div>
					</div>

					{#if error}
						<div class="error-message">{error}</div>
					{/if}

					<button type="button" class="next-button" on:click={nextStep} disabled={loading}>
						다음 단계
					</button>
				</div>
			{:else if currentStep === 2}
				<!-- Step 2: Profile (Optional) -->
				<div class="form-step">
					<div class="step-title">프로필 설정 (선택사항)</div>

					<div class="form-fields">
						<div class="form-field">
							<label class="field-label">프로필 사진</label>
							<div class="profile-upload">
								{#if profileImage}
									<img src={profileImage} alt="Profile" class="profile-preview" />
								{:else}
									<div class="profile-placeholder">
										<span>📸</span>
									</div>
								{/if}
								<input
									type="file"
									accept="image/*"
									on:change={handleFileUpload}
									class="file-input"
									id="profile-image"
								/>
								<label for="profile-image" class="upload-label">
									{profileImage ? '사진 변경' : '사진 업로드'}
								</label>
							</div>
						</div>

						<div class="form-field">
							<label class="field-label">좋아하는 팀</label>
							<div class="team-grid">
								{#each teams as team}
									<button
										type="button"
										class="team-button"
										class:selected={favoriteTeam === team.id}
										style="--team-color: {team.color}"
										on:click={() => (favoriteTeam = team.id)}
									>
										{team.name}
									</button>
								{/each}
							</div>
						</div>

						<div class="form-field">
							<label for="bio" class="field-label">자기소개</label>
							<textarea
								id="bio"
								bind:value={bio}
								placeholder="간단한 자기소개를 입력하세요 (선택사항)"
								class="field-textarea"
								rows="3"
							></textarea>
						</div>
					</div>

					{#if error}
						<div class="error-message">{error}</div>
					{/if}

					<div class="button-group">
						<button type="button" class="back-button" on:click={prevStep} disabled={loading}>
							이전
						</button>
						<button type="button" class="next-button" on:click={nextStep} disabled={loading}>
							다음 단계
						</button>
					</div>
				</div>
			{:else if currentStep === 3}
				<!-- Step 3: Terms & Agreements -->
				<div class="form-step">
					<div class="step-title">약관 동의</div>

					<div class="terms-section">
						<label class="terms-item" class:required={true}>
							<input
								type="checkbox"
								bind:checked={agreedToTerms}
								disabled={loading}
								class="terms-checkbox"
							/>
							<span class="terms-text">
								<a href="/terms" target="_blank" class="terms-link">이용약관</a>에 동의합니다
								<span class="required-badge">필수</span>
							</span>
						</label>

						<label class="terms-item" class:required={true}>
							<input
								type="checkbox"
								bind:checked={agreedToPrivacy}
								disabled={loading}
								class="terms-checkbox"
							/>
							<span class="terms-text">
								<a href="/privacy" target="_blank" class="terms-link">개인정보처리방침</a>에
								동의합니다
								<span class="required-badge">필수</span>
							</span>
						</label>

						<label class="terms-item">
							<input
								type="checkbox"
								bind:checked={agreedToMarketing}
								disabled={loading}
								class="terms-checkbox"
							/>
							<span class="terms-text">
								마케팅 정보 수신에 동의합니다
								<span class="optional-badge">선택</span>
							</span>
						</label>
					</div>

					{#if error}
						<div class="error-message">{error}</div>
					{/if}

					<div class="button-group">
						<button type="button" class="back-button" on:click={prevStep} disabled={loading}>
							이전
						</button>
						<button type="button" class="submit-button" on:click={handleSubmit} disabled={loading}>
							{#if loading}
								<span class="loading-spinner"></span>
								<span>가입 중...</span>
							{:else}
								<span>가입 완료</span>
							{/if}
						</button>
					</div>
				</div>
			{/if}

			<div class="form-footer">
				<p class="footer-text">
					이미 계정이 있으신가요?
					<a href="/login" class="footer-link">로그인</a>
				</p>
			</div>
		</div>
	</div>
</div>

<style>
	.register-page {
		display: grid;
		grid-template-columns: 1fr 1fr;
		min-height: 100vh;
		background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
		overflow-x: hidden;
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

	.step-progress {
		margin-top: 32px;
	}

	.progress-bar {
		height: 6px;
		background: rgba(255, 255, 255, 0.1);
		border-radius: 10px;
		overflow: hidden;
		margin-bottom: 12px;
	}

	.progress-fill {
		height: 100%;
		background: linear-gradient(90deg, #667eea, #764ba2);
		transition: width 0.3s ease;
	}

	.progress-text {
		font-size: 14px;
		color: rgba(255, 255, 255, 0.6);
		margin: 0;
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

	.form-step {
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

	.step-title {
		font-size: 20px;
		font-weight: 700;
		color: white;
		margin-bottom: 24px;
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

	.oauth-button.kakao {
		background: #fee500;
		color: #000000;
		border-color: #fee500;
	}

	.oauth-button.kakao:hover:not(:disabled) {
		background: #fada0a;
	}

	.oauth-button.naver {
		background: #03c75a;
		color: white;
		border-color: #03c75a;
	}

	.oauth-button.naver:hover:not(:disabled) {
		background: #02b350;
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
		font-size: 14px;
		font-weight: 600;
		color: rgba(255, 255, 255, 0.9);
	}

	.field-input,
	.field-textarea {
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

	.field-input::placeholder,
	.field-textarea::placeholder {
		color: rgba(255, 255, 255, 0.4);
	}

	.field-input:focus,
	.field-textarea:focus {
		outline: none;
		background: rgba(255, 255, 255, 0.12);
		border-color: #667eea;
		box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
	}

	.field-input:disabled,
	.field-textarea:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	/* Password Strength */
	.password-strength {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.strength-bar {
		flex: 1;
		height: 4px;
		background: rgba(255, 255, 255, 0.1);
		border-radius: 10px;
		overflow: hidden;
	}

	.strength-fill {
		height: 100%;
		transition: all 0.3s ease;
	}

	.strength-fill.weak {
		width: 33%;
		background: #ef4444;
	}

	.strength-fill.medium {
		width: 66%;
		background: #f59e0b;
	}

	.strength-fill.strong {
		width: 100%;
		background: #10b981;
	}

	.strength-label {
		font-size: 12px;
		color: rgba(255, 255, 255, 0.6);
		min-width: 40px;
	}

	/* Profile Upload */
	.profile-upload {
		display: flex;
		align-items: center;
		gap: 16px;
	}

	.profile-preview,
	.profile-placeholder {
		width: 80px;
		height: 80px;
		border-radius: 50%;
		object-fit: cover;
	}

	.profile-placeholder {
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(255, 255, 255, 0.08);
		font-size: 32px;
	}

	.file-input {
		display: none;
	}

	.upload-label {
		padding: 10px 20px;
		background: rgba(255, 255, 255, 0.08);
		border: 1px solid rgba(255, 255, 255, 0.15);
		border-radius: 8px;
		color: white;
		font-size: 14px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.upload-label:hover {
		background: rgba(255, 255, 255, 0.12);
		border-color: rgba(255, 255, 255, 0.25);
	}

	/* Team Grid */
	.team-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 10px;
	}

	.team-button {
		padding: 12px;
		background: rgba(255, 255, 255, 0.08);
		border: 2px solid rgba(255, 255, 255, 0.15);
		border-radius: 8px;
		color: white;
		font-size: 13px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.team-button:hover {
		background: rgba(255, 255, 255, 0.12);
	}

	.team-button.selected {
		background: var(--team-color);
		border-color: var(--team-color);
		box-shadow: 0 0 20px rgba(102, 126, 234, 0.3);
	}

	/* Terms Section */
	.terms-section {
		display: flex;
		flex-direction: column;
		gap: 16px;
		margin-bottom: 24px;
		padding: 20px;
		background: rgba(255, 255, 255, 0.03);
		border-radius: 12px;
		border: 1px solid rgba(255, 255, 255, 0.08);
	}

	.terms-item {
		display: flex;
		align-items: flex-start;
		gap: 12px;
		cursor: pointer;
	}

	.terms-checkbox {
		width: 20px;
		height: 20px;
		margin-top: 2px;
		cursor: pointer;
		accent-color: #667eea;
	}

	.terms-text {
		flex: 1;
		font-size: 14px;
		color: rgba(255, 255, 255, 0.8);
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.terms-link {
		color: #667eea;
		text-decoration: underline;
	}

	.required-badge,
	.optional-badge {
		padding: 2px 8px;
		border-radius: 4px;
		font-size: 11px;
		font-weight: 700;
	}

	.required-badge {
		background: rgba(239, 68, 68, 0.2);
		color: #fca5a5;
	}

	.optional-badge {
		background: rgba(156, 163, 175, 0.2);
		color: #d1d5db;
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

	/* Buttons */
	.button-group {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 12px;
	}

	.next-button,
	.submit-button,
	.back-button {
		padding: 14px 20px;
		border: none;
		border-radius: 10px;
		font-size: 15px;
		font-weight: 700;
		cursor: pointer;
		transition: all 0.2s ease;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
	}

	.next-button,
	.submit-button {
		background: linear-gradient(135deg, #667eea, #764ba2);
		color: white;
		box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3);
	}

	.next-button:hover:not(:disabled),
	.submit-button:hover:not(:disabled) {
		transform: translateY(-2px);
		box-shadow: 0 6px 30px rgba(102, 126, 234, 0.4);
	}

	.back-button {
		background: rgba(255, 255, 255, 0.08);
		color: white;
		border: 1px solid rgba(255, 255, 255, 0.15);
	}

	.back-button:hover:not(:disabled) {
		background: rgba(255, 255, 255, 0.12);
	}

	.next-button:disabled,
	.submit-button:disabled,
	.back-button:disabled {
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
		.register-page {
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

		.team-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
