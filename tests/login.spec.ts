import { test, expect } from '@playwright/test';

test.describe('Login page', () => {
  test('has the correct page title', async ({ page }) => {
    
    await page.goto('/login');
    await expect(page).toHaveTitle('Qrius Lead Manager');
  });
});