import { test, expect } from '@playwright/test';
import { login } from './helpers/auth';
import { admin, agent } from './helpers/users';

test.describe('Login', () => {
  // Prediction: PASS. index.html sets <title>Qrius Lead Manager</title>.
  // Result: PASS, as predicted.
  test('login page has the correct title', async ({ page }) => {
    await page.goto('/login');
    await expect(page).toHaveTitle('Qrius Lead Manager');
  });

  // Prediction: PASS. Valid credentials redirect to /leads.
  // Result: PASS, as predicted.
  test('admin signs in and reaches the Leads page', async ({ page }) => {
    await login(page, admin);
    await expect(page.getByRole('heading', { name: 'Leads', exact: true })).toBeVisible();
  });

  // Prediction: PASS. The navbar role badge shows the role from the API.
  // Result: PASS, as predicted.
  test('agent signs in and sees their role', async ({ page }) => {
    await login(page, agent);
    await expect(page.getByTestId('nav-role')).toHaveText(agent.role);
  });

  // Prediction: PASS. The API returns 401 "Invalid username or password",
  // and the page shows that message without navigating.
  // Result: PASS, as predicted.
  test('wrong password shows an error and stays on the login page', async ({ page }) => {
    await page.goto('/login');
    await page.getByTestId('username').fill(admin.username);
    await page.getByTestId('password').fill('Wrong@123');
    await page.getByRole('button', { name: 'Sign in' }).click();

    await expect(page.getByTestId('login-error')).toHaveText('Invalid username or password');
    await expect(page).toHaveURL(/\/login$/);
  });
});
