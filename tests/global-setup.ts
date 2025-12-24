/**
 * Global Setup for Playwright Tests
 *
 * Feature: 004-production-service-integration
 *
 * Purpose: Setup test environment before running tests
 */

import { chromium, type FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  console.log('🚀 Setting up test environment...');

  // Start browser for setup
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    // Wait for development server to be ready
    const baseURL = process.env.BASE_URL || 'http://localhost:5173';
    console.log(`📡 Checking server at ${baseURL}...`);

    // Just verify server responds, don't check for specific elements
    const response = await page.goto(baseURL, {
      waitUntil: 'domcontentloaded',
      timeout: 30000
    });

    if (response && response.ok()) {
      console.log('✅ Server is ready (status: ' + response.status() + ')');
    } else {
      console.log('⚠️ Server responded with status: ' + (response?.status() || 'unknown'));
    }

    // Wait a bit for any client-side rendering
    await page.waitForTimeout(1000);

    // Verify page has some content
    const bodyContent = await page.locator('body').innerHTML();
    if (bodyContent && bodyContent.length > 100) {
      console.log('✅ Page content loaded successfully');
    } else {
      console.log('⚠️ Page content may be minimal');
    }

  } catch (error) {
    console.error('❌ Setup warning:', error);
    // Don't throw - let tests run anyway and fail individually if needed
    console.log('⚠️ Continuing with tests despite setup issues...');
  } finally {
    await browser.close();
  }

  console.log('🎉 Test environment setup complete');
}

export default globalSetup;
