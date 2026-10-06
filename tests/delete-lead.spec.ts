import { test, expect } from '@playwright/test';
import { login } from './helpers/auth';
import { admin, agent } from './helpers/users';

test.describe('Delete a lead', () => {
  // Prediction: An admin can delete a lead, and its row should disappear from the list; I expect this to pass because the delete button removes the lead without a confirmation dialog.
  test('admin can delete a lead and the row disappears', async ({ page }) => {
    await login(page, admin);

    // Create a lead to delete, so the seeded leads stay untouched.
    await page.getByTestId('add-lead-button').click();
    await page.getByTestId('name').fill('Delete Me');
    await page.getByTestId('email').fill('delete.me@example.com');
    await page.getByTestId('company').fill('Test Company');
    await page.getByTestId('save-button').click();

    const row = page.getByTestId('lead-row').filter({ hasText: 'Delete Me' });
    await expect(row).toBeVisible();

    await row.getByTestId('delete-button').click();

    await expect(row).toHaveCount(0);
  });

  // Prediction: An agent should not see any delete button; I expect this to pass because the page only renders the delete button for admins.
  test('agent does not see a delete button', async ({ page }) => {
    await login(page, agent);

    const rows = page.getByTestId('lead-row');

    // Wait for the rows first, otherwise "0 delete buttons" could pass before the list loads.
    await expect(rows.first()).toBeVisible();

    await expect(rows.getByTestId('delete-button')).toHaveCount(0);
  });
});