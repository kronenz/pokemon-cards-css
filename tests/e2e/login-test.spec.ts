/**
 * Login E2E Test
 * 테스트 계정 로그인 검증
 */

import { test, expect } from '@playwright/test';

test.describe('Login Functionality', () => {

  test('should login with test account', async ({ page }) => {
    // Go to login page
    await page.goto('/auth/login');
    await page.waitForTimeout(2000);

    // Take screenshot before login
    await page.screenshot({ path: 'test-results/login-before.png' });

    // Check if email input exists
    const emailInput = page.locator('input[type="email"], #email');
    const passwordInput = page.locator('input[type="password"], #password');

    console.log('Checking for email input...');
    const hasEmailInput = await emailInput.count();
    console.log('Email input count:', hasEmailInput);

    if (hasEmailInput > 0) {
      // Fill in credentials
      await emailInput.fill('baseball_fan_01@test.com');
      await passwordInput.fill('TestPass123!');

      // Take screenshot after filling
      await page.screenshot({ path: 'test-results/login-filled.png' });

      // Submit form
      const submitButton = page.locator('button[type="submit"], button:has-text("로그인")');
      await submitButton.click();

      // Wait for response
      await page.waitForTimeout(3000);

      // Take screenshot after submit
      await page.screenshot({ path: 'test-results/login-after.png' });

      // Check result - either redirected or error shown
      const currentUrl = page.url();
      console.log('Current URL after login:', currentUrl);

      // Check for error message
      const errorMessage = page.locator('.error-message, [class*="error"]');
      if (await errorMessage.isVisible()) {
        const errorText = await errorMessage.textContent();
        console.log('Error message:', errorText);
      }
    } else {
      console.log('No email input found - page may be OAuth only');
      await page.screenshot({ path: 'test-results/login-page.png' });
    }
  });

  test('should check PocketBase connection from browser', async ({ page }) => {
    // Navigate to app and check console for PocketBase URL
    await page.goto('/');
    await page.waitForTimeout(1000);

    // Execute script in browser context to check PocketBase URL
    const pbUrl = await page.evaluate(() => {
      // @ts-ignore
      return window.__POCKETBASE_URL__ || 'Not found in window';
    });
    console.log('PocketBase URL from browser:', pbUrl);

    // Try to fetch PocketBase health from browser
    const healthCheck = await page.evaluate(async () => {
      try {
        const response = await fetch('http://localhost:8090/api/health');
        return await response.json();
      } catch (e) {
        return { error: (e as Error).message };
      }
    });
    console.log('PocketBase health check:', healthCheck);
  });

  test('should verify test user exists via API', async ({ page }) => {
    // Direct API test
    const response = await page.request.post('http://localhost:8090/api/collections/users/auth-with-password', {
      data: {
        identity: 'baseball_fan_01@test.com',
        password: 'TestPass123!'
      }
    });

    const status = response.status();
    console.log('API Response status:', status);

    const body = await response.json();
    console.log('API Response:', JSON.stringify(body, null, 2).substring(0, 500));

    expect(status).toBe(200);
  });
});
