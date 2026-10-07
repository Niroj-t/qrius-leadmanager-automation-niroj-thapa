import { test, expect } from '@playwright/test';
import { LeadsPage } from '../pages/leadsPage';
import { loginAs } from '../test-data/auth';
import { admin, agent } from '../test-data/users';
import { seededLead, totalSeededLeads } from '../test-data/leads';

test.describe('Leads list', () => {
  test('the correct number of leads is shown after signing in', async ({ page }) => {
    // prediction: 12 data rows in the table, and "Sita Sharma" appears once with company "HimalKart"
    const leads = new LeadsPage(page);
    await loginAs(page, admin);

    await expect(leads.dataRows).toHaveCount(totalSeededLeads);

    const row = leads.dataRows.filter({ hasText: seededLead.name });
    await expect(row).toHaveCount(1);
    await expect(row.getByRole('cell', { name: seededLead.company, exact: true })).toBeVisible();
  });

  test('the role badge shows ADMIN for the admin', async ({ page }) => {
    // prediction: nav-role shows "ADMIN"
    const leads = new LeadsPage(page);
    await loginAs(page, admin);
    await expect(leads.navRole).toHaveText('ADMIN');
  });

  test('the role badge shows AGENT for the agent', async ({ page }) => {
    // prediction: nav-role shows "AGENT" and nav-user shows "agent.qrius"
    const leads = new LeadsPage(page);
    await loginAs(page, agent);
    await expect(leads.navRole).toHaveText('AGENT');
    await expect(leads.navUser).toHaveText(agent.username);
  });
});
