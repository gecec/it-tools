import { test, expect } from '@playwright/test';

test.describe('Tool - Time', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/time');
  });

  test('Has correct title', async ({ page }) => {
    await expect(page).toHaveTitle('Time - IT Tools');
  });

  test('', async ({ page }) => {

  });
});