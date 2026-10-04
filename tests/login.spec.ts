import { test, expect } from '@playwright/test';
import { login } from './helpers/auth';
import { admin, agent } from './helpers/users';

test.describe('Login', () => {
  // Prediction: The title is "Qrius Lead Manager" and the heading reads "Lead Manager".
  test('login page has the correct title', async ({ page }) => {
    await page.goto('/login');
    await expect(page).toHaveTitle('Qrius Lead Manager');
    await expect(page.getByRole('heading', { name: 'Lead Manager', level: 2 })).toBeVisible();
  });

  // Prediction: The browser moves to /leads, the "Leads" heading is shown,and the role badge reads ADMIN.
  test('admin signs in and reaches the Leads page', async ({ page }) => {
    await login(page, admin);
    await expect(page.getByRole('heading', { name: 'Leads', exact: true })).toBeVisible();
  });

  // Prediction: The browser moves to /leads, the role badge reads AGENT.
  test('agent signs in and sees their role', async ({ page }) => {
    await login(page, agent);
    await expect(page.getByTestId('nav-role')).toHaveText(agent.role);
  });

  // Prediction: Prediction: The URL stays on /login and the message "Invalid username or password" is displayed.

  test('wrong password shows an error and stays on the login page', async ({ page }) => {
    await page.goto('/login');
    await page.getByTestId('username').fill(admin.username);
    await page.getByTestId('password').fill('Wrong@123');
    await page.getByRole('button', { name: 'Sign in' }).click();

    await expect(page.getByTestId('login-error')).toHaveText('Invalid username or password');
    await expect(page).toHaveURL(/\/login$/);
  });
});
