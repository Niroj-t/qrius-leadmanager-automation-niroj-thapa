import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { LeadsPage } from '../pages/leadsPage';
import { loginAs } from '../test-data/auth';
import { admin, agent, wrongPasswordUser } from '../test-data/users';
import { totalSeededLeads } from '../test-data/leads';

test.describe('Login', () => {
  test('login page has the correct title', async ({ page }) => {
    // prediction: tab title is "Qrius Lead Manager" and an h2 "Lead Manager" is visible
    const login = new LoginPage(page);
    await login.goto();
    await expect(page).toHaveTitle('Qrius Lead Manager');
    await expect(login.heading).toBeVisible();
  });

  test('admin can sign in and reaches the Leads page', async ({ page }) => {
    // prediction: URL becomes /leads, nav-role shows "ADMIN", 12 lead rows are visible
    const leads = new LeadsPage(page);
    await loginAs(page, admin);
    await expect(page).toHaveURL(/\/leads/);
    await expect(leads.navRole).toHaveText('ADMIN');
    await expect(leads.rows).toHaveCount(totalSeededLeads);
  });

  test('agent can sign in and sees their role', async ({ page }) => {
    // prediction: URL becomes /leads, nav-user shows "agent.qrius", nav-role shows "AGENT"
    const leads = new LeadsPage(page);
    await loginAs(page, agent);
    await expect(page).toHaveURL(/\/leads/);
    await expect(leads.navUser).toHaveText(agent.username);
    await expect(leads.navRole).toHaveText('AGENT');
  });

  test('wrong password shows an error and stays on the login page', async ({ page }) => {
    // prediction: URL stays on /login and the message "Invalid username or password" is visible
    const login = new LoginPage(page);
    await loginAs(page, wrongPasswordUser);
    await expect(page).toHaveURL(/\/login/);
    await expect(login.errorMessage).toHaveText('Invalid username or password');
  });
});
