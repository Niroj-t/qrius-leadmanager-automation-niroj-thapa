import { test, expect } from '@playwright/test';
import { login } from './helpers/auth';
import { admin, agent, SEEDED_LEAD_COUNT } from './helpers/users';

test.describe('Leads list', () => {
  // Prediction: after signing in, the correct number of leads is shown.
  test('shows all seeded leads after signing in', async ({ page }) => {
    await login(page, admin);
    await expect(page.getByTestId('lead-row')).toHaveCount(SEEDED_LEAD_COUNT);
  });

  // Prediction: The role badge shows the signed-in user's role (ADMIN)
  test('role badge shows ADMIN for the admin user', async ({ page }) => {
    await login(page, admin);
    await expect(page.getByTestId('nav-role')).toHaveText('ADMIN');
  });

  // Prediction: The role badge shows the signed-in user's role (AGENT)
  test('role badge shows AGENT for the agent user', async ({ page }) => {
    await login(page, agent);
    await expect(page.getByTestId('nav-role')).toHaveText('AGENT');
  });
});
