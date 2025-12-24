import { test, expect } from '@playwright/test';

test.describe('로그인 상태 반영 테스트', () => {
  test('로그인 후 네비게이션 바에 사용자 정보가 표시되어야 함', async ({ page }) => {
    // 네트워크 요청 캡처
    const requests: any[] = [];
    const responses: any[] = [];

    page.on('request', request => {
      if (request.url().includes('8090') || request.url().includes('pocketbase') || request.url().includes('pockethost')) {
        requests.push({
          url: request.url(),
          method: request.method()
        });
      }
    });

    page.on('response', response => {
      if (response.url().includes('8090') || response.url().includes('pocketbase') || response.url().includes('pockethost')) {
        responses.push({
          url: response.url(),
          status: response.status()
        });
      }
    });

    // 1. 로그인 페이지로 이동
    console.log('1. 로그인 페이지로 이동...');
    await page.goto('http://localhost:5173/auth/login');
    await page.waitForLoadState('networkidle');

    // 스크린샷 저장
    await page.screenshot({ path: 'test-results/01-login-page.png', fullPage: true });
    console.log('로그인 페이지 스크린샷 저장됨');

    // 2. 로그인 폼 확인
    const emailInput = page.locator('input[type="email"], input#email');
    const passwordInput = page.locator('input[type="password"], input#password');

    const emailVisible = await emailInput.isVisible().catch(() => false);
    const passwordVisible = await passwordInput.isVisible().catch(() => false);

    console.log(`이메일 입력 필드 존재: ${emailVisible}`);
    console.log(`비밀번호 입력 필드 존재: ${passwordVisible}`);

    if (!emailVisible || !passwordVisible) {
      console.log('페이지 HTML:', await page.content());
      throw new Error('로그인 폼을 찾을 수 없습니다');
    }

    // 3. 테스트 계정으로 로그인
    console.log('2. 테스트 계정으로 로그인...');
    await emailInput.fill('baseball_fan_01@test.com');
    await passwordInput.fill('TestPass123!');

    await page.screenshot({ path: 'test-results/02-filled-form.png', fullPage: true });

    // 4. 로그인 버튼 클릭
    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();

    // 5. 페이지 전환 대기
    console.log('3. 로그인 처리 대기...');
    await page.waitForTimeout(3000);

    await page.screenshot({ path: 'test-results/03-after-login.png', fullPage: true });

    // 현재 URL 확인
    const currentUrl = page.url();
    console.log(`현재 URL: ${currentUrl}`);

    // 6. 네트워크 요청 확인
    console.log('\n=== 캡처된 요청 ===');
    requests.forEach((req, i) => {
      console.log(`${i + 1}. ${req.method} ${req.url}`);
    });

    console.log('\n=== 캡처된 응답 ===');
    responses.forEach((res, i) => {
      console.log(`${i + 1}. ${res.status} ${res.url}`);
    });

    // 7. 홈 페이지로 이동하여 네비게이션 바 확인
    console.log('4. 홈 페이지에서 네비게이션 바 확인...');
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    await page.screenshot({ path: 'test-results/04-home-after-login.png', fullPage: true });

    // 8. 네비게이션 바에서 사용자 정보 확인
    const userProfile = page.locator('.user-profile, .user-name, [data-testid="user-profile"]');
    const loginButton = page.locator('.auth-buttons, .login-btn, a[href="/auth/login"]');

    const userProfileVisible = await userProfile.isVisible().catch(() => false);
    const loginButtonVisible = await loginButton.first().isVisible().catch(() => false);

    console.log(`사용자 프로필 표시: ${userProfileVisible}`);
    console.log(`로그인 버튼 표시: ${loginButtonVisible}`);

    // 네비게이션 바 HTML 확인
    const navActions = await page.locator('.nav-actions').innerHTML().catch(() => 'not found');
    console.log('\n네비게이션 액션 HTML:', navActions.substring(0, 500));

    // 9. localStorage 및 pb_auth 확인
    const authData = await page.evaluate(() => {
      return {
        localStorage: Object.keys(localStorage).filter(k => k.includes('pb') || k.includes('auth')),
        pbAuth: localStorage.getItem('pocketbase_auth'),
        cookies: document.cookie
      };
    });
    console.log('\n인증 데이터:', JSON.stringify(authData, null, 2));
  });

  test('signin 페이지 상태 확인', async ({ page }) => {
    console.log('signin 페이지 확인...');
    await page.goto('http://localhost:5173/auth/signin');
    await page.waitForLoadState('networkidle');

    await page.screenshot({ path: 'test-results/05-signin-page.png', fullPage: true });

    const pageContent = await page.content();
    console.log('페이지 제목:', await page.title());
    console.log('페이지 URL:', page.url());

    // 페이지에 있는 주요 요소들 확인
    const hasModal = pageContent.includes('SignInModal') || pageContent.includes('modal');
    const hasOAuth = pageContent.includes('OAuth') || pageContent.includes('google') || pageContent.includes('github');

    console.log(`모달 존재: ${hasModal}`);
    console.log(`OAuth 버튼 존재: ${hasOAuth}`);

    // 에러 메시지 확인
    const errorElements = await page.locator('.error, [class*="error"], [class*="Error"]').all();
    console.log(`에러 요소 수: ${errorElements.length}`);
  });
});
