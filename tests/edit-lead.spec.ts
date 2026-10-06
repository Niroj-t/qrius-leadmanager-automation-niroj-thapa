import { test, expect } from '@playwright/test';
import { login } from './helpers/auth';
import { admin } from './helpers/users';

test.describe('Edit a lead', () => {
  test.beforeEach(async ({ page }) => {
    await login(page, admin);
  });

  // Prediction: Editing Hari Koirala's status from "New" to "Qualified" should update the status shown in the list, and I expect this to pass because the backend saves the status on update.
  test('editing a lead status updates it in the list', async ({ page }) => {
    // Starting state from the seed data.
    const row = page.getByTestId('lead-row').filter({ hasText: 'Hari Koirala' });
    
    await expect(row.getByTestId('lead-status'),).toHaveText('New');
    
    await row.getByTestId('edit-button').click();
    await page.getByTestId('status').selectOption('Qualified');
    await page.getByTestId('save-button').click();

    await expect(page.getByTestId('lead-modal')).toBeHidden();
    await expect(row.getByTestId('lead-status'),).toHaveText('Qualified');
  });
});