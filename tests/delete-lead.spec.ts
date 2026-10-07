import { test, expect } from '@playwright/test';
import { login } from './helpers/auth';
import { admin, agent } from './helpers/users';

test.describe('Delete a lead', () => {
  // Prediction: An admin can delete Ram Thapa, and her row should disappear from the list; I expect this to pass because the delete button removes the lead without a confirmation dialog.
  test('admin can delete Sita Sharma and the row disappears', async ({ page }) => {
    await login(page, admin);

    const row = page.getByTestId('lead-row').filter({ hasText: 'Ram Thapa' });
    await expect(row).toHaveCount(1);

    await row.getByTestId('delete-button').click();

    await expect(row).toHaveCount(0);
    await expect(page.getByTestId('lead-row')).toHaveCount(11);

  });

  // Prediction: An agent should not see any delete button; I expect this to pass because the page only renders the delete button for admins.
  test('agent does not see a delete button', async ({ page }) => {
    await login(page, agent);

    await expect(page.getByTestId('nav-role')).toHaveText('AGENT');
    await expect(page.getByTestId('lead-row')).toHaveCount(11);

    await expect(page.getByTestId('delete-button')).toHaveCount(0);
    
  });
});