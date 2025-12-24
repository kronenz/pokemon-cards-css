/**
 * Login Debug E2E Test
 * 로그인 요청 상세 분석
 */

import { test, expect } from '@playwright/test';

test.describe('Login Debug', () => {

  test('should capture network requests during login', async ({ page }) => {
    // Collect all requests
    const requests: any[] = [];

    page.on('request', request => {
      if (request.url().includes('8090') || request.url().includes('auth')) {
        requests.push({
          url: request.url(),
          method: request.method(),
          postData: request.postData()
        });
      }
    });

    page.on('response', async response => {
      if (response.url().includes('8090') || response.url().includes('auth')) {
        try {
          const body = await response.text();
          console.log('Response:', response.url(), response.status(), body.substring(0, 500));
        } catch (e) {
          console.log('Response:', response.url(), response.status());
        }
      }
    });

    // Go to login page
    await page.goto('/auth/login');
    await page.waitForTimeout(2000);

    // Fill in credentials
    const emailInput = page.locator('input[type="email"], #email');
    const passwordInput = page.locator('input[type="password"], #password');

    await emailInput.fill('baseball_fan_01@test.com');
    await passwordInput.fill('TestPass123!');

    console.log('\\n=== Submitting login form ===');

    // Submit form
    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();

    // Wait for network
    await page.waitForTimeout(5000);

    console.log('\\n=== Captured Requests ===');
    requests.forEach((req, i) => {
      console.log(`${i + 1}. ${req.method} ${req.url}`);
      if (req.postData) {
        console.log('   Post data:', req.postData);
      }
    });

    // Check console errors
    page.on('console', msg => {
      if (msg.type() === 'error') {
        console.log('Console error:', msg.text());
      }
    });
  });

  test('should check what URL PocketBase SDK uses', async ({ page }) => {
    await page.goto('/auth/login');
    await page.waitForTimeout(1000);

    // Check the actual PocketBase URL being used
    const pbConfig = await page.evaluate(() => {
      // Look for PocketBase instance or config
      const scripts = Array.from(document.querySelectorAll('script'));
      const configData: any = {};

      // Check various places where config might be stored
      // @ts-ignore
      if (window.__sveltekit_1l2qr4j) {
        configData.sveltekit = 'found';
      }

      // Try to find environment variables in the page
      const htmlContent = document.documentElement.innerHTML;
      const apiUrlMatch = htmlContent.match(/PUBLIC_API_URL['":\s]+([^'"]+)/);
      if (apiUrlMatch) {
        configData.apiUrl = apiUrlMatch[1];
      }

      return configData;
    });

    console.log('Config from page:', pbConfig);

    // Check what's in the network when page loads
    const resources = await page.evaluate(() => {
      return performance.getEntriesByType('resource')
        .filter((r: any) => r.name.includes('8090') || r.name.includes('pocketbase'))
        .map((r: any) => r.name);
    });

    console.log('PocketBase related resources:', resources);
  });
});
