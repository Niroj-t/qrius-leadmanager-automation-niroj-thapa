import { test, expect } from '@playwright/test';
import { login } from './helpers/auth';
import { admin, SEEDED_LEAD_COUNT } from './helpers/users';

test.describe('Search', () => {
  test.beforeEach(async ({ page }) => {
    await login(page, admin);
    await expect(page.getByTestId('lead-row')).toHaveCount(SEEDED_LEAD_COUNT);
  });

  // Prediction: Searching by a lead's name should narrow the list to the matching lead.
  test('searching by lead name narrows the list', async ({ page }) => {
    await page.getByTestId('search-input').fill('Sita');

    await expect(page.getByTestId('lead-row')).toHaveCount(1);
    await expect(
      page.getByTestId('lead-row').filter({ hasText: 'Sita Sharma' }),
    ).toBeVisible();
  });

  // Prediction: Searching by a company name should narrow the list to the lead associated with that company.
  test('searching by company name narrows the list', async ({ page }) => {
    await page.getByTestId('search-input').fill('Daraz');

    await expect(page.getByTestId('lead-row')).toHaveCount(1);
    await expect(
      page.getByTestId('lead-row').filter({ hasText: 'Bikash Shrestha' }),
    ).toBeVisible();
  });

  // Prediction: Searching for a non-existing name or company should display the "No leads found." empty state and show no lead rows.
  test('searching for something that does not exist shows the empty state', async ({ page }) => {
    await page.getByTestId('search-input').fill('zzzz-no-match');

    await expect(page.getByTestId('empty-state')).toHaveText('No leads found.');
    await expect(page.getByTestId('lead-row')).toHaveCount(0);
  });

  // Prediction: The lead count should update to reflect the number of leads displayed after applying the search.
  test('count text reflects how many leads are shown after a search', async ({ page }) => {
    await page.getByTestId('search-input').fill('Sita');

    await expect(page.getByTestId('lead-row')).toHaveCount(1);
    await expect(page.getByTestId('lead-count')).toHaveText('Showing 1 of 12 leads');
  });
});
